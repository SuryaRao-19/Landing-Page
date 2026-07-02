'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

const GRAD_MAP = [
  'from-blue-600 to-cyan-500',
  'from-violet-600 to-blue-600',
  'from-teal-600 to-emerald-500',
]

function extractMetric(impact: string): { value: string; label: string } | null {
  const m = impact.match(/(\d[\d%+Cr₹xX,.]+(?:\s*(?:%|Cr|\+|x))?)/i)
  if (!m) return null
  return { value: m[1]!, label: impact.replace(m[1]!, '').trim().slice(0, 30) }
}

export function CaseStudiesPreview() {
  return (
    <section className="section bg-white" id="case-studies">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Case Studies"
            title="Real Work."
            highlight="Real Results."
            subtitle="A sample of the transformations we&apos;ve delivered for enterprise clients."
          />
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:gap-3 transition-all shrink-0"
          >
            See all case studies <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {CASE_STUDIES.slice(0, 3).map((cs, i) => {
            const metric = cs.results[0] ? extractMetric(cs.results[0]) : null
            return (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .1, duration: .5, ease: [.22, 1, .36, 1] }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group block h-full bg-white border border-[#E8EEF4] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,.10)] hover:border-[#CBD5E1] hover:-translate-y-2 transition-all duration-300"
                  style={{ borderRadius: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.05)' }}
                >
                  {/* Gradient header */}
                  <div className={`h-48 bg-gradient-to-br ${GRAD_MAP[i] ?? GRAD_MAP[0]} relative flex flex-col justify-between`} style={{ padding: '28px' }}>
                    {/* Subtle grid overlay */}
                    <div className="absolute inset-0 bg-grid opacity-[.08]" aria-hidden />
                    {/* Industry pill */}
                    <span className="relative inline-flex items-center self-start px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                      {cs.industry}
                    </span>

                    {/* Metric */}
                    {metric && (
                      <div className="relative flex items-end gap-2">
                        <TrendingUp size={16} className="text-white/70 shrink-0 mb-1" />
                        <span className="font-extrabold text-[2rem] text-white leading-none tracking-[-0.03em]">{metric.value}</span>
                        {metric.label && <span className="text-white/75 text-[0.8125rem] mb-1 leading-tight">{metric.label}</span>}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ padding: '28px' }}>
                    <p className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider mb-2">{cs.industry}</p>
                    <h3 className="font-bold text-[1.125rem] text-[#0A0F1C] leading-snug mb-3.5 group-hover:text-[#2563EB] transition-colors line-clamp-2 tracking-[-0.015em]">
                      {cs.title}
                    </h3>
                    <p className="text-[0.9375rem] text-[#64748B] leading-[1.72] line-clamp-2 mb-5">{cs.challenge}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cs.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-[11.5px] font-medium text-[#475569] bg-[#F1F5F9] rounded-full border border-[#E2E8F0]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-[#2563EB] group-hover:gap-3 transition-all">
                      Read case study <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
