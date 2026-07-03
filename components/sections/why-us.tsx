'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Globe2, HeartHandshake, Award, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'

const REASONS = [
  { icon: Shield,         title: 'Enterprise-Grade Security',  desc: 'ISO 27001, SOC 2, CMMi Level 5 certified. Your data and systems protected 24/7 with zero-trust architecture.' },
  { icon: Zap,            title: 'Speed to Market',            desc: 'Agile squads ship 40% faster without compromising on quality, test coverage, or code standards.' },
  { icon: Globe2,         title: 'Global Delivery',            desc: 'On-site, offshore, and hybrid models covering IST, EST, PST, and CET time zones seamlessly.' },
  { icon: HeartHandshake, title: 'Long-term Partnership',      desc: 'Average client relationship of 6+ years. We grow as strategic partners, not transactional vendors.' },
  { icon: Award,          title: 'Award-Winning Team',         desc: '500+ certified engineers across AWS, Azure, GCP, Kubernetes, and 40+ enterprise technologies.' },
  { icon: Clock,          title: '99.9% SLA Uptime',           desc: 'Round-the-clock NOC monitoring, instant escalation, and guaranteed response times written into every contract.' },
]

const BIG_STATS = [
  { value: '₹140Cr+', label: 'Saved for clients annually',  color: '#2563EB', bg: '#EFF6FF',   border: '#BFDBFE'  },
  { value: '40%',     label: 'Faster time-to-market',       color: '#0D9488', bg: '#F0FDFA',   border: '#99F6E4'  },
  { value: '6+ yrs',  label: 'Average client tenure',       color: '#7C3AED', bg: '#F5F3FF',   border: '#DDD6FE'  },
  { value: '4.9/5',   label: 'CSAT score',                  color: '#D97706', bg: '#FFFBEB',   border: '#FDE68A'  },
]

const ease = [0.22, 1, 0.36, 1] as const

/* Mini operations center SVG */
function OpsCenter() {
  return (
    <div className="relative w-full mt-8 select-none" aria-hidden>
      <div
        className="absolute inset-0 rounded-[24px]"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,.07) 0%, transparent 70%)' }}
      />
      <svg viewBox="0 0 480 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-95">
        <defs>
          <linearGradient id="wg-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1D4ED8"/><stop offset="100%" stopColor="#2563EB"/></linearGradient>
          <linearGradient id="wg-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0D9488"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient>
          <linearGradient id="wg-v" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#A78BFA"/></linearGradient>
          <linearGradient id="wg-p" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0F172A"/><stop offset="100%" stopColor="#1E293B"/></linearGradient>
        </defs>

        {/* Main monitor */}
        <rect x="80" y="20" width="320" height="190" rx="16" fill="url(#wg-p)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
        {/* Traffic dots */}
        <circle cx="100" cy="38" r="4" fill="rgba(255,255,255,.15)"/>
        <circle cx="113" cy="38" r="4" fill="rgba(255,255,255,.08)"/>
        <circle cx="126" cy="38" r="4" fill="rgba(255,255,255,.08)"/>

        {/* Title bar */}
        <rect x="95" y="52" width="80" height="5" rx="2.5" fill="rgba(255,255,255,.12)"/>
        <rect x="95" y="61" width="50" height="3.5" rx="1.75" fill="rgba(255,255,255,.06)"/>

        {/* LIVE badge */}
        <rect x="346" y="50" width="42" height="16" rx="5" fill="rgba(16,185,129,.2)" stroke="rgba(16,185,129,.3)" strokeWidth="1"/>
        <circle cx="356" cy="58" r="2.5" fill="#10B981"/>
        <text x="362" y="62" fill="#10B981" fontSize="6.5" fontWeight="700" fontFamily="system-ui">LIVE</text>

        {/* KPI cards */}
        {[0,1,2].map((i) => {
          const x = 95 + i * 98
          const [c, v, l] = [['#06B6D4','99.9%','Uptime'],['#10B981','₹140Cr','Saved'],['#A78BFA','1,000+','Projects']][i]!
          return (
            <g key={i} transform={`translate(${x},78)`}>
              <rect width="88" height="46" rx="9" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
              <rect x="8" y="10" width="18" height="2.5" rx="1.25" fill={c} opacity=".5"/>
              <text x="8" y="28" fill={c} fontSize="13" fontWeight="800" fontFamily="system-ui">{v}</text>
              <text x="8" y="39" fill="rgba(255,255,255,.3)" fontSize="7" fontFamily="system-ui">{l}</text>
            </g>
          )
        })}

        {/* Chart area */}
        <rect x="95" y="134" width="290" height="62" rx="9" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
        {[0,1,2].map((i) => <line key={i} x1="95" y1={148+i*16} x2="385" y2={148+i*16} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>)}
        {[28,42,34,56,46,38,60,52,46,68,58,65].map((h,i) => (
          <rect key={i} x={99+i*24} y={192-h} width="19" height={h} rx="4" fill="url(#wg-b)" opacity={0.3+i*0.04}/>
        ))}
        <polyline
          points="109,176 133,166 157,170 181,156 205,160 229,148 253,154 277,140 301,145 325,132 349,138 373,128"
          fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity=".95"
        />
        <circle cx="373" cy="128" r="3.5" fill="#06B6D4" stroke="#0F172A" strokeWidth="1.5"/>

        {/* Stand */}
        <rect x="220" y="210" width="40" height="8" rx="4" fill="rgba(255,255,255,.06)"/>
        <rect x="196" y="218" width="88" height="6" rx="3" fill="rgba(255,255,255,.04)"/>

        {/* Floating chip left */}
        <g transform="translate(8,90)">
          <rect width="66" height="40" rx="11" fill="white" stroke="rgba(37,99,235,.12)" strokeWidth="1"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.08))' }}/>
          <text x="10" y="15" fill="#94A3B8" fontSize="7" fontWeight="600">RESPONSE</text>
          <text x="10" y="30" fill="#0A0F1C" fontSize="14" fontWeight="800" fontFamily="system-ui">2ms</text>
        </g>

        {/* Floating chip right */}
        <g transform="translate(408,100)">
          <rect width="64" height="40" rx="11" fill="white" stroke="rgba(16,185,129,.2)" strokeWidth="1"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.08))' }}/>
          <text x="10" y="15" fill="#94A3B8" fontSize="7" fontWeight="600">EXPERTS</text>
          <text x="10" y="30" fill="#0A0F1C" fontSize="14" fontWeight="800" fontFamily="system-ui">500+</text>
        </g>

        {/* Person silhouettes at bottom */}
        {[120, 160, 200, 240, 280, 320, 360].map((x, i) => (
          <g key={i} transform={`translate(${x},232)`} opacity={0.5+i*0.05}>
            <circle cx="8" cy="6" r="5" fill={['#2563EB','#7C3AED','#0D9488','#06B6D4','#10B981','#2563EB','#7C3AED'][i]}/>
            <rect x="2" y="12" width="12" height="10" rx="3" fill={['#2563EB','#7C3AED','#0D9488','#06B6D4','#10B981','#2563EB','#7C3AED'][i]} opacity=".6"/>
          </g>
        ))}
        <text x="240" y="258" textAnchor="middle" fill="rgba(148,163,184,.5)" fontSize="7.5" fontWeight="600" fontFamily="system-ui">150+ EXPERT ENGINEERS</text>
      </svg>
    </div>
  )
}

export function WhyUs() {
  return (
    <section className="section bg-[#F8FAFC]" id="why-us">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 xl:gap-24 items-start">

          {/* Left: sticky header + stats + ops center */}
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              label="Why NexGen"
              title="The IT Partner You"
              highlight="Actually Want"
              subtitle="We don't just deliver projects — we build technology capabilities that compound over time."
              className="mb-10"
            />

            <div className="grid grid-cols-2 gap-3.5">
              {BIG_STATS.map(({ value, label, color, bg, border }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.5, ease }}
                  className="rounded-[18px] p-5 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,.06)]"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <p className="font-extrabold text-[1.875rem] leading-none tracking-[-0.04em] mb-1.5" style={{ color }}>
                    {value}
                  </p>
                  <p className="text-[0.75rem] font-medium leading-snug text-[#475569]">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Cert badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['ISO 27001', 'CMMi Level 5', 'SOC 2 Type II', 'AWS Partner', 'Azure Expert'].map((cert) => (
                <span
                  key={cert}
                  className="text-[10.5px] font-semibold text-[#64748B] bg-white border border-[#E2E8F0] rounded-full px-3 py-1.5"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Mini ops center illustration */}
            <OpsCenter />
          </div>

          {/* Right: reason cards */}
          <div className="space-y-3">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
                className="group bg-white border border-[#E8EEF4] hover:border-[rgba(37,99,235,.2)] hover:shadow-[0_6px_28px_rgba(37,99,235,.08)] transition-all duration-300"
                style={{ borderRadius: '20px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.04)' }}
              >
                <div className="flex gap-5" style={{ padding: '24px' }}>
                  <div className="rounded-[14px] flex items-center justify-center bg-[#EFF6FF] border border-[#BFDBFE] transition-all duration-300 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:shadow-[0_4px_16px_rgba(37,99,235,.35)]" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                    <reason.icon size={20} className="text-[#2563EB] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[1.125rem] text-[#0A0F1C] leading-snug tracking-[-0.015em]" style={{ marginBottom: '8px' }}>{reason.title}</p>
                    <p className="text-[0.9375rem] text-[#64748B] leading-[1.72]">{reason.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bottom CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease }}
              className="pt-4 flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {['#2563EB','#7C3AED','#0D9488','#D97706'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ background: c, zIndex: 4 - i }}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="text-[0.8125rem] text-[#64748B]">
                <span className="font-semibold text-[#0A0F1C]">150+ senior engineers</span> ready to join your project
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
