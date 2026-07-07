import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isAdminAuthorized } from '@/lib/admin-auth'

// Contains PII — never index, never cache. Always render fresh on the server.
export const metadata: Metadata = { title: 'Contact Submissions', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type Submission = {
  id: string
  created_at: string
  name: string
  email: string
  company: string
  phone: string | null
  service: string
  budget: string | null
  message: string
  ip: string | null
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="section bg-[#F8FAFC] min-h-[60vh]">
      <div className="container">{children}</div>
    </section>
  )
}

export default async function AdminSubmissionsPage() {
  // Defense in depth: proxy.ts already gates /admin, but re-verify here so the
  // page can never leak data if the proxy matcher is ever misconfigured.
  if (!isAdminAuthorized((await headers()).get('authorization'))) {
    return (
      <Shell>
        <h1 className="font-extrabold text-[#0A0F1C] text-xl tracking-tight">Unauthorized</h1>
        <p className="text-sm text-[#64748B] mt-2">You are not authorized to view this page.</p>
      </Shell>
    )
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return (
      <Shell>
        <h1 className="font-extrabold text-[#0A0F1C] text-xl tracking-tight">Submissions unavailable</h1>
        <p className="text-sm text-[#64748B] mt-2 max-w-lg">
          Supabase is not configured. Set <code className="text-[#0A0F1C] font-mono text-[13px]">SUPABASE_URL</code> and{' '}
          <code className="text-[#0A0F1C] font-mono text-[13px]">SUPABASE_SERVICE_ROLE_KEY</code> to store and view
          contact submissions.
        </p>
      </Shell>
    )
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    return (
      <Shell>
        <h1 className="font-extrabold text-[#0A0F1C] text-xl tracking-tight">Could not load submissions</h1>
        <p className="text-sm text-red-600 mt-2 font-mono">{error.message}</p>
      </Shell>
    )
  }

  const rows = (data ?? []) as Submission[]

  return (
    <Shell>
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
        <h1 className="font-extrabold text-[#0A0F1C] text-2xl tracking-tight">Contact Submissions</h1>
        <span className="text-sm text-[#64748B]">
          {rows.length === 0 ? 'No submissions yet' : `${rows.length} most recent${rows.length === 200 ? ' (capped)' : ''}`}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-10 text-center text-sm text-[#64748B]">
          Submissions sent through the contact form will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[16px] border border-[#E2E8F0] bg-white shadow-[0_4px_24px_rgba(0,0,0,.04)]">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] uppercase tracking-wide text-[#64748B]">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Received</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Budget</th>
                <th className="px-4 py-3 font-semibold">Message</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-[#F1F5F9] align-top last:border-0 hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3 whitespace-nowrap text-[#64748B]">{fmtDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#0A0F1C]">{r.name}</div>
                    <a href={`mailto:${r.email}`} className="text-[#2563EB] hover:underline">{r.email}</a>
                    {r.phone && <div className="text-[#64748B] mt-0.5">{r.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-[#475569]">{r.company}</td>
                  <td className="px-4 py-3 text-[#475569] whitespace-nowrap">{r.service}</td>
                  <td className="px-4 py-3 text-[#475569] whitespace-nowrap">{r.budget || '—'}</td>
                  <td className="px-4 py-3 text-[#475569] max-w-md">
                    <p className="whitespace-pre-wrap break-words">{r.message}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  )
}
