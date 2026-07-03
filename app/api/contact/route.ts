import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'

// Handle the form submission server-side. Runs on the Node.js runtime so the
// Resend API key is never exposed to the browser.
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    // Missing configuration is an operator error, not a user error.
    console.error('[contact] Missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL env vars')
    return NextResponse.json({ error: 'The contact form is not configured yet. Please email us directly.' }, { status: 500 })
  }

  const d = parsed.data
  const lines = [
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    `Company: ${d.company}`,
    `Phone:   ${d.phone || '—'}`,
    `Service: ${d.service}`,
    `Budget:  ${d.budget || '—'}`,
    '',
    d.message,
  ].join('\n')

  const html = `
    <h2 style="margin:0 0 12px;font-family:sans-serif">New enquiry from the NexGen website</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#64748B">Name</td><td><strong>${escapeHtml(d.name)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#64748B">Email</td><td>${escapeHtml(d.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#64748B">Company</td><td>${escapeHtml(d.company)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#64748B">Phone</td><td>${escapeHtml(d.phone || '—')}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#64748B">Service</td><td>${escapeHtml(d.service)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#64748B">Budget</td><td>${escapeHtml(d.budget || '—')}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(d.message)}</p>
  `

  let res: Response
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: `New enquiry — ${d.service} — ${d.company}`,
        text: lines,
        html,
      }),
    })
  } catch (err) {
    console.error('[contact] Network error calling Resend', err)
    return NextResponse.json({ error: 'Could not reach the email service. Please try again.' }, { status: 502 })
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('[contact] Resend responded', res.status, detail)
    return NextResponse.json({ error: 'Failed to send your message. Please try again in a moment.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
