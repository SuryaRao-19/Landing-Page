import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the **service-role** key.
 *
 * The service-role key bypasses Row Level Security, so this module must never be
 * imported into client code — the `server-only` import above turns any such
 * import into a build error, and the env vars deliberately avoid the
 * `NEXT_PUBLIC_` prefix so they are never bundled for the browser.
 *
 * Supabase is *optional*: if the env vars are absent, `getSupabaseAdmin()`
 * returns `null` and callers should degrade gracefully (the contact form still
 * emails via Web3Forms without it).
 */
let client: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) return null

  // Reuse a single client instance across warm invocations.
  client ??= createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
