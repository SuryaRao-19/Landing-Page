import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Case Studies — Enterprise Success Stories',
  description: "Explore how NexGen has delivered measurable business outcomes for enterprise clients across banking, healthcare, manufacturing, and more.",
}

const GRADIENTS = ['from-[#0A1628] to-[#1B4FD8]','from-[#064E3B] to-[#0D9488]','from-[#3B0764] to-[#7C3AED]']
const ICONS = ['💳','🏥','⚙️']

export default function CaseStudiesPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Case Studies"
            title="Proven Results for"
            highlight="Enterprise Clients"
            subtitle="Explore how NexGen has delivered transformative technology outcomes across industries, geographies, and business challenges."
            center
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs, i) => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="group block">
                <article className="h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                  <div className={`h-44 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center`}>
                    <span className="text-5xl">{ICONS[i % ICONS.length]}</span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-3 py-1">{cs.industry}</span>
                    <h2 className="font-bold text-slate-900 text-lg mt-4 mb-3 group-hover:text-blue-700 transition-colors leading-snug">{cs.title}</h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{cs.challenge.slice(0, 120)}…</p>
                    <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-slate-100">
                      {cs.results.slice(0, 3).map((r) => {
                        const m = r.match(/^([\d.₹%+×Cr]+)/i)
                        return (
                          <div key={r}>
                            <p className="font-extrabold text-blue-600">{m?.[0] ?? '✓'}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{r.replace(/^[\d.₹%+×Cr]+\s*/i, '')}</p>
                          </div>
                        )
                      })}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
                      Read full story <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
