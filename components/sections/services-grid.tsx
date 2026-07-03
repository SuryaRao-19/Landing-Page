'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; glow: string; gradFrom: string; gradTo: string }> = {
  blue:   { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE', glow: 'rgba(37,99,235,.13)',   gradFrom: '#2563EB', gradTo: '#60A5FA' },
  purple: { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE', glow: 'rgba(124,58,237,.13)', gradFrom: '#7C3AED', gradTo: '#A78BFA' },
  teal:   { bg: '#F0FDFA', text: '#0D9488', border: '#99F6E4', glow: 'rgba(13,148,136,.13)', gradFrom: '#0D9488', gradTo: '#2DD4BF' },
  green:  { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0', glow: 'rgba(5,150,105,.13)',  gradFrom: '#059669', gradTo: '#34D399' },
  orange: { bg: '#FFF7ED', text: '#EA580C', border: '#FED7AA', glow: 'rgba(234,88,12,.13)',  gradFrom: '#EA580C', gradTo: '#FB923C' },
  red:    { bg: '#FFF1F2', text: '#E11D48', border: '#FECDD3', glow: 'rgba(225,29,72,.13)',  gradFrom: '#E11D48', gradTo: '#FB7185' },
  indigo: { bg: '#EEF2FF', text: '#4F46E5', border: '#C7D2FE', glow: 'rgba(79,70,229,.13)',  gradFrom: '#4F46E5', gradTo: '#818CF8' },
  cyan:   { bg: '#ECFEFF', text: '#0891B2', border: '#A5F3FC', glow: 'rgba(8,145,178,.13)',  gradFrom: '#0891B2', gradTo: '#22D3EE' },
  violet: { bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE', glow: 'rgba(109,40,217,.13)', gradFrom: '#6D28D9', gradTo: '#8B5CF6' },
  amber:  { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', glow: 'rgba(217,119,6,.13)',  gradFrom: '#D97706', gradTo: '#FBBF24' },
  sky:    { bg: '#F0F9FF', text: '#0284C7', border: '#BAE6FD', glow: 'rgba(2,132,199,.13)',  gradFrom: '#0284C7', gradTo: '#38BDF8' },
}

const ease = [0.22, 1, 0.36, 1] as const

export function ServicesGrid() {
  return (
    <section className="section bg-white" id="services">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeader
            label="What We Do"
            title="End-to-End IT Services"
            highlight="Built for Scale"
            subtitle="From AI implementation to cloud migration — we cover the full technology lifecycle with deep expertise."
          />
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[#2563EB] hover:gap-3 transition-all shrink-0 whitespace-nowrap"
          >
            View all services
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Grid — 3 cols on lg, 2 on md, 1 on sm */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => {
            const Icon  = svc.icon
            const color = COLOR_MAP[svc.color] ?? COLOR_MAP.blue
            return (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.045, duration: 0.55, ease }}
              >
                <Link
                  href={`/services/${svc.slug}`}
                  className="group flex flex-col h-full bg-white border border-[#E8EEF4] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                  style={{
                    borderRadius: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.05)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = `0 4px 20px rgba(0,0,0,.06), 0 24px 64px ${color.glow}, 0 1px 3px rgba(0,0,0,.03)`
                    el.style.borderColor = color.border
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = '0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.05)'
                    el.style.borderColor = ''
                  }}
                >
                  {/* Top gradient accent line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${color.gradFrom}, ${color.gradTo})` }}
                    aria-hidden
                  />

                  {/* Inner padding wrapper — padding on <a> is ignored in this render env */}
                  <div className="flex flex-col flex-1" style={{ padding: '32px' }}>
                    {/* Icon */}
                    <div
                      className="rounded-[16px] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0"
                      style={{ width: '56px', height: '56px', background: color.bg, color: color.text, border: `1.5px solid ${color.border}`, marginBottom: '24px' }}
                    >
                      <Icon size={24} aria-hidden />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-[1.25rem] text-[#0A0F1C] leading-snug tracking-[-0.02em] transition-colors duration-200 group-hover:text-[#2563EB]"
                      style={{ marginBottom: '12px' }}
                    >
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[0.9375rem] text-[#64748B] leading-[1.72] line-clamp-3 flex-1"
                      style={{ marginBottom: '24px' }}
                    >
                      {svc.shortDesc}
                    </p>

                    {/* CTA arrow */}
                    <span
                      className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold mt-auto transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                      style={{ color: color.text }}
                    >
                      Learn more <ArrowRight size={13} />
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
