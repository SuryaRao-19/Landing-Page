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

  const d = parsed.data
  const ip = clientIp(request)

  const supabase = getSupabaseAdmin()
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY

  // At least one sink must be configured, otherwise the submission would just
  // vanish — that's an operator misconfiguration, not a user error.
  if (!supabase && !accessKey) {
    console.error('[contact] No sink configured: set SUPABASE_* and/or WEB3FORMS_ACCESS_KEY')
    return NextResponse.json(
      { error: 'The contact form is not configured yet. Please email us directly.' },
      { status: 500 },
    )
  }

  // ── Primary sink: persist to Supabase ─────────────────────────────────
  // Storage is the source of truth (viewable at /admin/submissions). A stored
  // submission counts as a success even if the email notification later fails.
  let stored = false
  if (supabase) {
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: d.name,
        email: d.email,
        company: d.company,
        phone: d.phone || null,
        service: d.service,
        budget: d.budget || null,
        message: d.message,
        ip,
      })
      if (error) console.error('[contact] Supabase insert failed', error.message)
      else stored = true
    } catch (err) {
      console.error('[contact] Supabase insert threw', err)
    }
  }

  // ── Best-effort notification: email via Web3Forms ─────────────────────
  // Attempted only when a key is set. Web3Forms (https://web3forms.com) emails
  // the submission to the inbox tied to the access key (kept server-side). A
  // failure here never fails the request as long as the submission was stored.
  let emailed = false
  if (accessKey) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
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
      const result = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null
      if (res.ok && result?.success) emailed = true
      else console.error('[contact] Web3Forms responded', res.status, result?.message ?? '')
    } catch (err) {
      console.error('[contact] Network error calling Web3Forms', err)
    }
  }

  // Success as long as the enquiry landed in at least one sink. Only when every
  // configured sink failed do we ask the visitor to retry.
  if (!stored && !emailed) {
    return NextResponse.json(
      { error: 'We could not process your message right now. Please try again in a moment.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
