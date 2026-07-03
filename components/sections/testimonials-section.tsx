'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

const AVATAR_COLORS = ['#2563EB', '#7C3AED', '#0D9488', '#D97706', '#DC2626', '#059669']

const METRICS: Record<number, { value: string; label: string }> = {
  0: { value: '3× ROI',    label: 'within 12 months' },
  1: { value: '60% cost',  label: 'reduction achieved' },
  2: { value: '4.9 / 5',   label: 'CSAT score' },
  3: { value: '99.9%',     label: 'uptime delivered' },
  4: { value: '40% faster',label: 'time-to-market' },
  5: { value: '₹140Cr+',   label: 'annual savings' },
}

const ease = [0.22, 1, 0.36, 1] as const

export function TestimonialsSection() {
  return (
    <section className="section bg-[#F8FAFC]" id="testimonials">
      <div className="container">
        <SectionHeader
          label="Client Stories"
          title="Don't Take Our"
          highlight="Word for It"
          subtitle="Real results from real enterprise clients across India and globally."
          center
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => {
            const metric = METRICS[i]
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="group bg-white border border-[#E8EEF4] flex flex-col hover:shadow-[0_12px_48px_rgba(0,0,0,.10)] hover:border-[#CBD5E1] hover:-translate-y-2 transition-all duration-300"
                style={{ borderRadius: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.05)' }}
              >
                <div className="flex flex-col flex-1" style={{ padding: '32px' }}>
                  {/* Top row: stars + metric chip */}
                  <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {metric && (
                      <div className="inline-flex flex-col items-end bg-[#EFF6FF] border border-[#BFDBFE] rounded-[10px] px-3 py-1.5">
                        <span className="text-[12px] font-extrabold text-[#2563EB] leading-tight">{metric.value}</span>
                        <span className="text-[10px] text-[#93C5FD] leading-tight">{metric.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Quote icon */}
                  <Quote size={18} className="text-[#E2E8F0] shrink-0" style={{ marginBottom: '12px' }} aria-hidden />

                  {/* Quote */}
                  <blockquote className="text-[1rem] text-[#475569] leading-[1.8] flex-1" style={{ marginBottom: '20px' }}>
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3.5 pt-5 border-t border-[#F1F5F9]">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-white shadow-[0_0_0_1px_rgba(0,0,0,.06)]"
                      style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                      aria-hidden
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[0.9375rem] text-[#0A0F1C] truncate">{t.name}</p>
                      <p className="text-[0.8125rem] text-[#64748B] truncate">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom aggregate */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <div className="flex -space-x-2">
            {AVATAR_COLORS.map((c, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                style={{ background: c, zIndex: 6 - i }}
                aria-hidden
              />
            ))}
          </div>
          <div className="text-left">
            <p className="font-semibold text-[0.9375rem] text-[#0A0F1C]">
              500+ enterprises trust NexGen
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-[0.8125rem] text-[#64748B] ml-1">4.9 / 5 average CSAT across 500+ clients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
