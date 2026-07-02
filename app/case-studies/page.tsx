import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Case Studies — Enterprise Success Stories',
  description: "Explore how NexGen has delivered measurable business outcomes for enterprise clients across banking, healthcare, manufacturing, and more.",
}

const GRADIENTS = [
  'from-blue-600 to-cyan-500',
  'from-teal-600 to-emerald-500',
  'from-violet-600 to-purple-500',
]

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Proven Results for"
        highlight="Enterprise Clients"
        subtitle="Explore how NexGen has delivered transformative technology outcomes across industries, geographies, and business challenges."
        breadcrumbs={[{ label: 'Case Studies' }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-5">
            {CASE_STUDIES.map((cs, i) => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="group block">
                <article className="h-full bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:border-[#CBD5E1] hover:-translate-y-1 transition-all duration-300">
                  {/* Gradient header */}
                  <div className={`h-44 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} relative flex items-end p-5`}>
                    <div className="absolute top-4 right-4 opacity-20 text-6xl font-black text-white select-none" aria-hidden>{i + 1}</div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/15 border border-white/25 rounded-full px-3 py-1">
                      {cs.industry}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="font-bold text-[#0A0F1C] text-[.9375rem] mt-1 mb-2 group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                      {cs.title}
                    </h2>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-2">{cs.challenge}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-[#F1F5F9]">
                      {cs.results.slice(0, 3).map((r) => {
                        const m = r.match(/^([\d.₹%+×Cr]+)/i)
                        return (
                          <div key={r}>
                            <p className="font-extrabold text-[#2563EB] text-sm leading-none">{m?.[0] ?? '✓'}</p>
                            <p className="text-[10px] text-[#94A3B8] mt-1 leading-snug">{r.replace(/^[\d.₹%+×Cr]+\s*/i, '')}</p>
                          </div>
                        )
                      })}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] group-hover:gap-2.5 transition-all">
                      Read full story <ArrowRight size={11} />
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
