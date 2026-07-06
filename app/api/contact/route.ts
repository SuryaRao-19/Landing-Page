import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// Handle the form submission server-side. Runs on the Node.js runtime so the
// Web3Forms access key is never exposed to the browser.
export const runtime = 'nodejs'

// ── Basic abuse protection ─────────────────────────────────────────────
// In-memory sliding-window rate limit, keyed by client IP. NOTE: this is
// best-effort only — serverless instances don't share memory and reset on cold
// start, so it deters casual floods but is not a hard guarantee. For strong,
// distributed limiting move this to Upstash Redis / Vercel KV.
const RATE_LIMIT = 5 // max submissions…
const WINDOW_MS = 10 * 60 * 1000 // …per 10 minutes per IP
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // Opportunistic prune so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > RATE_LIMIT
}

function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    )
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: `website` is a hidden field that real users never see or fill.
  // If it has a value, the sender is almost certainly a bot — accept silently
  // (return success without sending) so the bot gets no signal.
  const honeypot = (raw as { website?: unknown })?.website
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    // Missing configuration is an operator error, not a user error.
    console.error('[contact] Missing WEB3FORMS_ACCESS_KEY env var')
    return NextResponse.json({ error: 'The contact form is not configured yet. Please email us directly.' }, { status: 500 })
  }

  const d = parsed.data

  // Persist the submission to Supabase (optional). Best-effort: if Supabase
  // isn't configured this is skipped, and a DB error never blocks the email —
  // Web3Forms remains the primary notification path.
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { error } = await supabase.from('contact_submissions').insert({
      name: d.name,
      email: d.email,
      company: d.company,
      phone: d.phone || null,
      service: d.service,
      budget: d.budget || null,
      message: d.message,
      ip: clientIp(request),
    })
    if (error) console.error('[contact] Supabase insert failed', error.message)
  }

  // Forward to Web3Forms (https://web3forms.com) — it emails the submission to
  // the inbox tied to the access key. The key stays server-side.
  let res: Response
  try {
    res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry — ${d.service} — ${d.company}`,
        from_name: 'NexGen Website',
        replyto: d.email,
        // Submission fields (Web3Forms renders these into the email):
        name: d.name,
        email: d.email,
        company: d.company,
        phone: d.phone || '—',
        service: d.service,
        budget: d.budget || '—',
        message: d.message,
      }),
    })
  } catch (err) {
    console.error('[contact] Network error calling Web3Forms', err)
    return NextResponse.json({ error: 'Could not reach the email service. Please try again.' }, { status: 502 })
  }

  const result = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null
  if (!res.ok || !result?.success) {
    console.error('[contact] Web3Forms responded', res.status, result?.message ?? '')
    return NextResponse.json({ error: 'Failed to send your message. Please try again in a moment.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
