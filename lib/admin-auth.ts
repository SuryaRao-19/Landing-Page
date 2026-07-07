import { timingSafeEqual } from 'node:crypto'

/**
 * HTTP Basic Auth gate for the `/admin` area.
 *
 * Credentials come from env: `ADMIN_USER` (defaults to "admin") and
 * `ADMIN_PASSWORD`. If `ADMIN_PASSWORD` is unset the admin area is locked down
 * entirely — every request is denied — so an un-configured deploy can never
 * expose stored submissions. Secure by default.
 *
 * Used from both `proxy.ts` (to issue the 401 challenge before the route
 * renders) and the admin page itself (defense in depth). Both run on the
 * Node.js runtime, so `node:crypto` is available.
 */

export const ADMIN_REALM = 'NexGen Admin'

// Length-guarded constant-time compare. `timingSafeEqual` throws on unequal
// lengths; the length of a credential isn't secret, so bailing early is fine.
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export function isAdminAuthorized(authHeader: string | null | undefined): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false // locked until configured
  const user = process.env.ADMIN_USER || 'admin'

  if (!authHeader?.startsWith('Basic ')) return false

  let decoded: string
  try {
    decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf8')
  } catch {
    return false
  }

  const sep = decoded.indexOf(':')
  if (sep === -1) return false

  // Evaluate both halves without short-circuiting so a wrong username and a
  // wrong password are indistinguishable by timing.
  const userOk = safeEqual(decoded.slice(0, sep), user)
  const passOk = safeEqual(decoded.slice(sep + 1), password)
  return userOk && passOk
}
