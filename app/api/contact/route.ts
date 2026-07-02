import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'

// Handle the form submission server-side. Runs on the Node.js runtime so the
// Resend API key is never exposed to the browser.
export const runtime = 'nodejs'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
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
