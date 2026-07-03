'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'
import { ButtonLink } from '@/components/ui/button'

const TRUST_BADGES = ['ISO 27001', 'CMMi Level 5', '99.9% SLA', 'SOC 2 Type II']
const CAPABILITIES  = ['AI & Machine Learning', 'Cloud Architecture', 'DevOps Automation', 'Cybersecurity', 'Data Engineering', 'Enterprise ERP']

const ease = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
// Slide-only entrance (no opacity fade): keeps content painted on first render so
// the hero <h1> counts as LCP immediately instead of waiting for JS hydration.
// This drops mobile LCP from ~4.7s to near FCP without losing the motion.
const fadeUp = {
  hidden: { opacity: 1, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

/* ── Ambient BG ───────────────────────────────── */
function AmbientBg() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Main gradient bloom — larger, softer */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px]"
        style={{ background: 'radial-gradient(ellipse 90% 75% at 50% -10%, rgba(37,99,235,.12) 0%, transparent 70%)' }}
      />
      {/* Right accent — tighter, more electric */}
      <div
        className="absolute -top-32 right-0 w-[700px] h-[600px] anim-breathe"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(37,99,235,.09) 0%, transparent 65%)' }}
      />
      {/* Left accent */}
      <div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] anim-breathe"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 0% 50%, rgba(124,58,237,.05) 0%, transparent 65%)', animationDelay: '1.5s' }}
      />
      {/* Bottom teal accent */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] anim-breathe"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(6,182,212,.06) 0%, transparent 65%)', animationDelay: '3s' }}
      />
      {/* Bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[350px] anim-breathe"
        style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(37,99,235,.05) 0%, transparent 65%)', animationDelay: '2s' }}
      />
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      {/* Top hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(37,99,235,.3) 40%, rgba(6,182,212,.2) 60%, transparent 100%)' }}
      />
    </div>
  )
}

/* ── Enterprise illustration ──────────────────── */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto select-none" aria-hidden>
      {/* Glow behind illustration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,.12) 0%, transparent 70%)' }}
      />

      <svg
        viewBox="0 0 600 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full drop-shadow-2xl anim-float"
        style={{ filter: 'drop-shadow(0 32px 48px rgba(0,0,0,.1))' }}
      >
        <defs>
          <linearGradient id="g-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient>
          <linearGradient id="g-violet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient>
          <linearGradient id="g-teal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0D9488"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient>
          <linearGradient id="g-dark" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0F172A"/><stop offset="100%" stopColor="#1E293B"/></linearGradient>
          <linearGradient id="g-panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0F172A"/><stop offset="100%" stopColor="#0A0F1C"/></linearGradient>
          <filter id="f-shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#0A0F1C" floodOpacity=".18"/>
          </filter>
          <clipPath id="cp-panel"><rect x="90" y="50" width="290" height="220" rx="20"/></clipPath>
        </defs>

        {/* ── MAIN DASHBOARD ── */}
        <g filter="url(#f-shadow)">
          <rect x="90" y="50" width="290" height="220" rx="20" fill="url(#g-panel)"/>
          <rect x="90.5" y="50.5" width="289" height="219" rx="19.5" stroke="rgba(255,255,255,.1)" strokeWidth="1" fill="none"/>
        </g>

        {/* Traffic light dots */}
        <circle cx="110" cy="70" r="4" fill="rgba(255,255,255,.15)"/>
        <circle cx="122" cy="70" r="4" fill="rgba(255,255,255,.09)"/>
        <circle cx="134" cy="70" r="4" fill="rgba(255,255,255,.09)"/>

        {/* Dashboard header text */}
        <rect x="105" y="84" width="90" height="5" rx="2.5" fill="rgba(255,255,255,.1)"/>
        <rect x="105" y="93" width="55" height="3.5" rx="1.75" fill="rgba(255,255,255,.05)"/>

        {/* LIVE badge */}
        <rect x="326" y="82" width="44" height="18" rx="6" fill="rgba(16,185,129,.15)" stroke="rgba(16,185,129,.2)" strokeWidth="1"/>
        <circle cx="336" cy="91" r="3" fill="#10B981"/>
        <text x="342" y="95" fill="#10B981" fontSize="7" fontWeight="700" fontFamily="system-ui">LIVE</text>

        {/* KPI cards */}
        {[0,1,2].map((i) => {
          const x = 105 + i * 91
          const colors = ['#06B6D4', '#10B981', '#A78BFA']
          const vals   = ['99.9%', '₹140Cr', '1,000+']
          const labels = ['Uptime', 'Saved', 'Projects']
          return (
            <g key={i} transform={`translate(${x},108)`}>
              <rect width="82" height="48" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
              <rect x="8" y="10" width="20" height="3" rx="1.5" fill={colors[i]} opacity=".4"/>
              <text x="8" y="30" fill={colors[i]} fontSize="14" fontWeight="800" fontFamily="system-ui">{vals[i]}</text>
              <text x="8" y="42" fill="rgba(255,255,255,.3)" fontSize="7.5" fontFamily="system-ui">{labels[i]}</text>
            </g>
          )
        })}

        {/* Chart */}
        <rect x="105" y="168" width="265" height="88" rx="10" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
        {/* Grid lines */}
        {[0,1,2].map((i) => <line key={i} x1="105" y1={188+i*22} x2="370" y2={188+i*22} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>)}
        {/* Bars */}
        {[32,48,38,62,52,44,70,58,52,76,64,72].map((h,i) => (
          <rect key={i} x={109+i*22} y={248-h} width="16" height={h} rx="4" fill="url(#g-blue)" opacity={0.25+i*0.05}/>
        ))}
        {/* Line overlay */}
        <polyline
          points="117,222 139,210 161,216 183,196 205,203 227,188 249,196 271,177 293,184 315,168 337,175 359,162"
          fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9"
        />
        <circle cx="359" cy="162" r="4.5" fill="#06B6D4" stroke="#0F172A" strokeWidth="2"/>
        {/* Tooltip */}
        <rect x="340" y="146" width="50" height="22" rx="6" fill="#06B6D4" opacity=".9"/>
        <text x="365" y="158" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui">+24%</text>
        <polygon points="365,168 360,162 370,162" fill="#06B6D4" opacity=".9"/>

        {/* ── SERVER RACK (left) ── */}
        <g transform="translate(14,230)">
          <rect width="72" height="138" rx="14" fill="url(#g-dark)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
          {[0,1,2,3].map((i) => (
            <g key={i} transform={`translate(8,${16+i*30})`}>
              <rect width="56" height="22" rx="5" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
              <rect x="6" y="8" width="30" height="3" rx="1.5" fill={['#06B6D4','#10B981','#2563EB','#A78BFA'][i]} opacity=".55"/>
              <circle cx="48" cy="11" r="3" fill={['#10B981','#F59E0B','#10B981','#10B981'][i]}/>
            </g>
          ))}
          <text x="36" y="132" textAnchor="middle" fill="rgba(255,255,255,.18)" fontSize="7" fontWeight="700" fontFamily="system-ui">SERVERS</text>
        </g>

        {/* ── MOBILE (right) ── */}
        <g transform="translate(490,180)">
          <rect width="64" height="116" rx="16" fill="url(#g-dark)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
          <rect x="7" y="16" width="50" height="78" rx="9" fill="rgba(37,99,235,.12)"/>
          {/* status bar */}
          <rect x="13" y="21" width="38" height="4" rx="2" fill="rgba(255,255,255,.1)"/>
          {/* Hero card */}
          <rect x="10" y="30" width="44" height="32" rx="6" fill="url(#g-blue)" opacity=".55"/>
          <rect x="15" y="36" width="22" height="3" rx="1.5" fill="rgba(255,255,255,.5)"/>
          <rect x="15" y="42" width="14" height="2.5" rx="1.25" fill="rgba(255,255,255,.25)"/>
          {/* Stat row */}
          <rect x="10" y="67" width="20" height="18" rx="5" fill="rgba(16,185,129,.2)"/>
          <rect x="34" y="67" width="20" height="18" rx="5" fill="rgba(124,58,237,.2)"/>
          <path d="M16.5 76.5 l2.3 2.3 l4.7 -5.3" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="44" y="80" textAnchor="middle" fill="#A78BFA" fontSize="7" fontWeight="700" fontFamily="system-ui">AI</text>
          {/* Home button */}
          <circle cx="32" cy="106" r="7" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        </g>

        {/* ── AI NODE (bottom-left) ── */}
        <g transform="translate(28,388)">
          <circle cx="46" cy="46" r="44" fill="url(#g-violet)" opacity=".9"/>
          {/* Neural mesh */}
          {[[-16,-18],[18,-18],[-20,4],[20,4],[0,22]].map(([x,y],i) => (
            <g key={i}>
              <line x1={46} y1={46} x2={46+(x??0)} y2={46+(y??0)} stroke="rgba(255,255,255,.22)" strokeWidth="1.5"/>
              <circle cx={46+(x??0)} cy={46+(y??0)} r="4.5" fill="rgba(255,255,255,.65)"/>
            </g>
          ))}
          <circle cx="46" cy="46" r="10" fill="rgba(255,255,255,.95)"/>
          <circle cx="46" cy="46" r="5.5" fill="url(#g-violet)"/>
          <text x="46" y="104" textAnchor="middle" fill="rgba(255,255,255,.55)" fontSize="7.5" fontWeight="700" fontFamily="system-ui">AI ENGINE</text>
        </g>

        {/* ── CLOUD NODE (top-right) ── */}
        <g transform="translate(472,46)">
          <circle cx="44" cy="44" r="42" fill="url(#g-blue)" opacity=".9"/>
          <ellipse cx="44" cy="50" rx="20" ry="12" fill="rgba(255,255,255,.2)"/>
          <circle cx="30" cy="42" r="12" fill="rgba(255,255,255,.2)"/>
          <circle cx="58" cy="39" r="14" fill="rgba(255,255,255,.2)"/>
          <circle cx="44" cy="36" r="11" fill="rgba(255,255,255,.2)"/>
          <text x="44" y="100" textAnchor="middle" fill="rgba(255,255,255,.55)" fontSize="7.5" fontWeight="700" fontFamily="system-ui">CLOUD</text>
        </g>

        {/* ── SECURITY NODE (bottom-right) ── */}
        <g transform="translate(472,388)">
          <circle cx="44" cy="44" r="42" fill="url(#g-teal)" opacity=".9"/>
          <path d="M44 22L60 31V47C60 58 52 67 44 71C36 67 28 58 28 47V31Z" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
          <path d="M36 44L42 50L54 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="44" y="100" textAnchor="middle" fill="rgba(255,255,255,.55)" fontSize="7.5" fontWeight="700" fontFamily="system-ui">SECURITY</text>
        </g>

        {/* ── CONNECTION LINES ── */}
        {[
          [86,270, 90,160],
          [380,160, 490,100],
          [86,390, 150,310],
          [490,285, 490,225],
          [118,434, 472,434],
          [516,90,  516,185],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(37,99,235,.15)" strokeWidth="1.5" strokeDasharray="6 4"
          />
        ))}

        {/* ── FLOATING CHIPS ── */}
        <g className="anim-float2" transform="translate(390,240)">
          <rect width="118" height="50" rx="14" fill="white" stroke="rgba(37,99,235,.1)" strokeWidth="1"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.08))' }}/>
          <text x="14" y="17" fill="#94A3B8" fontSize="7.5" fontWeight="700" fontFamily="system-ui">RESPONSE TIME</text>
          <text x="14" y="37" fill="#0A0F1C" fontSize="19" fontWeight="800" fontFamily="system-ui" letterSpacing="-1">2ms</text>
          <circle cx="98" cy="25" r="9" fill="rgba(16,185,129,.12)"/>
          <path d="M98 29.5 L98 20.5 M94.8 23.7 L98 20.5 L101.2 23.7" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        <g className="anim-float3" transform="translate(22,335)">
          <rect width="108" height="46" rx="12" fill="white" stroke="rgba(16,185,129,.18)" strokeWidth="1"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.07))' }}/>
          <text x="12" y="16" fill="#0D9488" fontSize="7.5" fontWeight="700" fontFamily="system-ui">ANNUAL SAVINGS</text>
          <text x="12" y="36" fill="#0A0F1C" fontSize="16" fontWeight="800" fontFamily="system-ui" letterSpacing="-0.5">₹140Cr</text>
        </g>
      </svg>
    </div>
  )
}

/* ── Hero section ─────────────────────────────── */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 55])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-[72px] overflow-hidden" aria-label="Hero">
      <AmbientBg />

      <motion.div className="container-lg w-full min-w-0 py-20 lg:py-28" style={{ y }}>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center min-w-0">

          {/* ── Left ─────────────────────────────── */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="min-w-0">

            {/* Eyebrow pill */}
            <motion.div variants={fadeUp} className="mb-7">
              <div
                className="pill max-w-full text-left leading-snug"
                style={{ display: 'inline-block', whiteSpace: 'normal' }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse mr-2 align-middle" />
                India&apos;s Premier Digital Transformation Partner
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="display-xl text-[#0A0F1C] mb-6 break-words">
              Transforming Businesses Through{' '}
              <span className="text-grad">Intelligent Technology.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-[1.125rem] text-[#64748B] leading-[1.78] max-w-[540px] mb-10">
              Helping Indian and global enterprises accelerate digital transformation through AI, Cloud Computing, Enterprise Software, and Scalable Engineering.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-11">
              <ButtonLink href="/contact" variant="primary" size="xl" iconRight={<ArrowRight size={16} />}>
                Book Free Consultation
              </ButtonLink>
              <ButtonLink href="/services" variant="outline" size="xl">
                Explore Services
              </ButtonLink>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_BADGES.map((b) => (
                <span key={b} className="flex items-center gap-2 text-[0.875rem] text-[#64748B] font-medium">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  {b}
                </span>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-10 border-t border-[#EEF2F7]"
            >
              {[['500+','Enterprise Clients'],['15+','Years of Excellence'],['25+','Countries Served']].map(([v, l]) => (
                <div key={l}>
                  <p className="display-md text-[#0A0F1C] leading-none tracking-[-0.04em]">{v}</p>
                  <p className="text-[0.875rem] text-[#64748B] mt-3 leading-snug font-medium">{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Illustration ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}
            className="hidden lg:block"
          >
            <HeroIllustration />
          </motion.div>
        </div>

        {/* ── Capabilities bar ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.55, ease }}
          className="mt-20 lg:mt-28 pt-10 border-t border-[#F1F5F9]"
        >
          <p className="text-[0.6875rem] text-[#64748B] uppercase tracking-[0.12em] font-bold mb-5">
            Core Capabilities
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CAPABILITIES.map((item) => (
              <Link
                key={item}
                href="/services"
                className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-[#475569] bg-white border border-[#E2E8F0] rounded-full px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,.04)] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#F0F5FF] hover:shadow-[0_2px_8px_rgba(37,99,235,.1)] transition-all duration-200"
              >
                {item}
                <ChevronRight size={12} />
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
