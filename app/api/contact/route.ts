import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// Handle the form submission server-side: validate, rate-limit, honeypot, and
// persist to Supabase (the source of truth). Runs on the Node.js runtime for
// the service-role Supabase client. Email is sent separately from the browser
// via Web3Forms — its free plan rejects server-side API calls (403).
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
  // Email is delivered by the browser (Web3Forms' free plan blocks server-side
  // calls), so the server only needs to know whether email is configured to
  // decide if the submission has any sink at all. NEXT_PUBLIC_* is readable
  // here too.
  const emailConfigured = !!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

  // At least one sink must exist, otherwise the submission would just vanish —
  // that's an operator misconfiguration, not a user error.
  if (!supabase && !emailConfigured) {
    console.error('[contact] No sink configured: set SUPABASE_* and/or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY')
    return NextResponse.json(
      { error: 'The contact form is not configured yet. Please email us directly.' },
      { status: 500 },
    )
  }

  // ── Primary sink: persist to Supabase ─────────────────────────────────
  // Storage is the source of truth (viewable at /admin/submissions).
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

  // If Supabase was the only sink and it failed, ask the visitor to retry. When
  // email is configured the browser still delivers it, so a storage miss alone
  // isn't fatal.
  if (!stored && !emailConfigured) {
    return NextResponse.json(
      { error: 'We could not process your message right now. Please try again in a moment.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
