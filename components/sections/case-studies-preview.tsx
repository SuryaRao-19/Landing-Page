'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

const CARD_GRADIENTS = [
  'from-[#0A1628] to-[#1B4FD8]',
  'from-[#064E3B] to-[#0D9488]',
  'from-[#3B0764] to-[#7C3AED]',
]

export function CaseStudiesPreview() {
  return (
    <section className="section bg-slate-50" aria-label="Case studies">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <SectionHeader
            label="Case Studies"
            title="Delivering Measurable Results"
            highlight="for Enterprises"
            subtitle="Real transformations, real outcomes."
          />
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap shrink-0"
          >
            View all case studies <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .12 }}
            >
              <Link href={`/case-studies/${cs.slug}`} className="block h-full group">
                <article className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 h-full">
                  {/* Visual header */}
                  <div className={`h-40 bg-gradient-to-br ${CARD_GRADIENTS[i]} flex items-center justify-center p-6`}>
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">
                        {['💳', '🏥', '⚙️'][i]}
                      </span>
                      <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">{cs.industry}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-3 py-1 mb-3">{cs.industry}</span>
                    <h3 className="font-bold text-slate-900 text-base mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">{cs.challenge}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {cs.results.slice(0, 3).map((result) => {
                        const match = result.match(/^([\d.₹%+×Cr]+)/i)
                        return (
                          <div key={result} className="text-center">
                            <p className="font-extrabold text-blue-600 text-sm">{match?.[0] ?? '✓'}</p>
                            <p className="text-[10px] text-slate-400 leading-snug mt-0.5">{result.replace(/^[\d.₹%+×Cr]+\s*/i, '').slice(0, 24)}</p>
                          </div>
                        )
                      })}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] font-medium bg-slate-100 text-slate-600 rounded-full px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
