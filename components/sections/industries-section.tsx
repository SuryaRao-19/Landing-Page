'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { INDUSTRIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

const INDUSTRY_COLORS: Record<string, { from: string; to: string; badge: string }> = {
  'banking-finance':   { from: '#1D4ED8', to: '#2563EB', badge: 'rgba(37,99,235,.12)'  },
  'healthcare':        { from: '#059669', to: '#10B981', badge: 'rgba(5,150,105,.12)'   },
  'manufacturing':     { from: '#7C3AED', to: '#8B5CF6', badge: 'rgba(124,58,237,.12)' },
  'retail':            { from: '#EA580C', to: '#F97316', badge: 'rgba(234,88,12,.12)'  },
  'education':         { from: '#0891B2', to: '#06B6D4', badge: 'rgba(8,145,178,.12)'  },
  'logistics':         { from: '#D97706', to: '#F59E0B', badge: 'rgba(217,119,6,.12)'  },
  'government':        { from: '#0D9488', to: '#14B8A6', badge: 'rgba(13,148,136,.12)' },
  'real-estate':       { from: '#DC2626', to: '#EF4444', badge: 'rgba(220,38,38,.12)'  },
  'telecommunications':{ from: '#2563EB', to: '#6366F1', badge: 'rgba(99,102,241,.12)' },
  'travel':            { from: '#7C3AED', to: '#A855F7', badge: 'rgba(168,85,247,.12)' },
}

const ease = [0.22, 1, 0.36, 1] as const

export function IndustriesSection() {
  return (
    <section className="section bg-[#F8FAFC]" id="industries">
      <div className="container">
        <SectionHeader
          label="Industries"
          title="Deep Expertise in"
          highlight="Every Sector"
          subtitle="From banking and healthcare to manufacturing and government — we bring vertical domain knowledge to every engagement."
          center
          className="mb-12"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {INDUSTRIES.map((industry, i) => {
            const colors = INDUSTRY_COLORS[industry.slug]
            return (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease }}
              >
                <Link
                  href="/industries"
                  className="group block text-center p-6 bg-white border border-[#E8EEF4] rounded-[20px] hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 14px rgba(0,0,0,.05)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = colors
                      ? `0 8px 32px ${colors.badge}, 0 1px 4px rgba(0,0,0,.04)`
                      : 'var(--sh-card-hover)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = colors ? `${colors.from}30` : ''
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = ''
                    ;(e.currentTarget as HTMLElement).style.borderColor = ''
                  }}
                >
                  {/* Gradient accent top */}
                  {colors && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, ${colors.from}, ${colors.to})` }}
                      aria-hidden
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="text-3xl mb-3 inline-flex items-center justify-center w-12 h-12 rounded-[14px] transition-transform duration-300 group-hover:scale-110"
                    style={colors ? { background: colors.badge } : { background: '#F1F5F9' }}
                    aria-hidden
                  >
                    {industry.icon}
                  </div>

                  <p className="font-semibold text-[0.9375rem] text-[#334155] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {industry.title}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-[#2563EB] hover:gap-3 transition-all group"
          >
            Explore all industries
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
