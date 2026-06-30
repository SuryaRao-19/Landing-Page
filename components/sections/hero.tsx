'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TRUST_ITEMS = ['ISO 27001 Certified', 'CMMi Level 5', '99.9% SLA', '15+ Years']

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
      aria-label="Hero"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(27,79,216,.07) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(13,148,136,.06) 0%, transparent 70%)',
          }}
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl anim-float" style={{ background: 'radial-gradient(circle, #1B4FD8, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 rounded-full opacity-15 blur-3xl anim-float2" style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />
        <div className="absolute top-1/2 right-1/6 w-40 h-40 rounded-full opacity-15 blur-2xl anim-float3" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
      </div>

      <div className="container-lg py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: .12 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700 tracking-wide uppercase mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" aria-hidden />
                India&apos;s Premier Digital Transformation Partner
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-extrabold text-slate-900 leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', letterSpacing: '-1.5px', lineHeight: 1.08 }}
            >
              Transforming Businesses Through{' '}
              <span className="text-grad">Intelligent Technology.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-slate-500 leading-relaxed max-w-lg mb-8">
              Helping Indian and global businesses accelerate digital transformation through AI, Cloud Computing, Enterprise Software, Automation, and Scalable IT Solutions.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Book Free Consultation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              {TRUST_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <CheckCircle2 size={14} className="text-teal-500" />
                  {item}
                </div>
              ))}
            </motion.div>

            {/* Stats bar */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-100"
            >
              {[['500+', 'Enterprise Clients'], ['15+', 'Years'], ['25+', 'Countries']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-extrabold text-2xl text-slate-900">{val}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{lbl}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: SVG hero illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8, delay: .3 }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[560px]">
      <svg
        viewBox="0 0 560 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full anim-float"
        aria-label="Enterprise technology ecosystem illustration"
      >
        <defs>
          <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1B4FD8"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
          <linearGradient id="hg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB"/>
            <stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
          <linearGradient id="hg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0D9488"/>
            <stop offset="100%" stopColor="#2563EB"/>
          </linearGradient>
          <linearGradient id="hg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A1628" stopOpacity=".95"/>
            <stop offset="100%" stopColor="#1B4FD8" stopOpacity=".9"/>
          </linearGradient>
          <filter id="hs1"><feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1B4FD8" floodOpacity=".18"/></filter>
        </defs>

        {/* Background glow */}
        <ellipse cx="280" cy="260" rx="200" ry="160" fill="url(#hg1)" opacity=".06"/>

        {/* Central Dashboard Panel */}
        <g transform="translate(100,80)" filter="url(#hs1)">
          <rect width="240" height="160" rx="16" fill="url(#hg4)"/>
          <rect x="1" y="1" width="238" height="158" rx="15" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
          {/* Header bar */}
          <rect x="16" y="16" width="208" height="4" rx="2" fill="rgba(255,255,255,.08)"/>
          {/* Metric cards */}
          <rect x="16" y="30" width="62" height="36" rx="8" fill="rgba(6,182,212,.15)" stroke="rgba(6,182,212,.3)" strokeWidth="1"/>
          <text x="47" y="46" textAnchor="middle" fill="#06B6D4" fontSize="10" fontWeight="700">99.9%</text>
          <text x="47" y="58" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="7">Uptime</text>
          <rect x="89" y="30" width="62" height="36" rx="8" fill="rgba(16,185,129,.15)" stroke="rgba(16,185,129,.3)" strokeWidth="1"/>
          <text x="120" y="46" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="700">+94%</text>
          <text x="120" y="58" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="7">CSAT</text>
          <rect x="162" y="30" width="62" height="36" rx="8" fill="rgba(124,58,237,.15)" stroke="rgba(124,58,237,.3)" strokeWidth="1"/>
          <text x="193" y="46" textAnchor="middle" fill="#A78BFA" fontSize="10" fontWeight="700">500+</text>
          <text x="193" y="58" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="7">Clients</text>
          {/* Chart area */}
          <rect x="16" y="78" width="208" height="70" rx="8" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
          {/* Line chart */}
          <polyline points="28,128 50,115 72,120 94,100 116,108 138,88 160,96 182,76 204,84 220,72" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="28,138 50,130 72,132 94,120 116,125 138,112 160,118 182,102 204,110 220,98" fill="none" stroke="rgba(27,79,216,.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Chart labels */}
          <text x="16" y="156" fill="rgba(255,255,255,.2)" fontSize="6">Performance Metrics — Q1 to Q4 2025</text>
        </g>

        {/* Server nodes left */}
        <g transform="translate(30,150)">
          <rect width="80" height="120" rx="10" fill="url(#hg4)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
          {[0,1,2].map((i) => (
            <g key={i} transform={`translate(10,${16 + i * 32})`}>
              <rect width="60" height="22" rx="4" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
              <rect x="4" y="6" width="30" height="4" rx="2" fill={['#06B6D4','#10B981','#7C3AED'][i]} opacity=".7"/>
              <circle cx="52" cy="11" r="4" fill={['#10B981','#F59E0B','#06B6D4'][i]}/>
            </g>
          ))}
          <text x="40" y="115" textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize="7">Data Center</text>
        </g>

        {/* Mobile device right */}
        <g transform="translate(450,120)">
          <rect width="56" height="100" rx="12" fill="url(#hg4)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
          <rect x="6" y="12" width="44" height="68" rx="6" fill="rgba(27,79,216,.2)"/>
          <rect x="10" y="16" width="36" height="4" rx="2" fill="rgba(255,255,255,.15)"/>
          <rect x="10" y="24" width="24" height="3" rx="1" fill="rgba(255,255,255,.1)"/>
          <rect x="10" y="32" width="36" height="24" rx="4" fill="url(#hg1)" opacity=".6"/>
          <text x="28" y="48" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">App</text>
          <rect x="10" y="60" width="16" height="10" rx="2" fill="rgba(16,185,129,.3)"/>
          <rect x="30" y="60" width="16" height="10" rx="2" fill="rgba(124,58,237,.3)"/>
          <circle cx="28" cy="92" r="6" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
        </g>

        {/* Cloud node top right */}
        <g transform="translate(400,50)">
          <circle cx="40" cy="40" r="38" fill="url(#hg1)" opacity=".9"/>
          <ellipse cx="40" cy="44" rx="18" ry="10" fill="rgba(255,255,255,.2)"/>
          <circle cx="28" cy="38" r="10" fill="rgba(255,255,255,.2)"/>
          <circle cx="52" cy="36" r="12" fill="rgba(255,255,255,.2)"/>
          <circle cx="40" cy="32" r="9" fill="rgba(255,255,255,.2)"/>
          <text x="40" y="68" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="8" fontWeight="600">Cloud</text>
        </g>

        {/* AI brain node bottom left */}
        <g transform="translate(40,360)">
          <circle cx="38" cy="38" r="36" fill="url(#hg2)" opacity=".9"/>
          {/* Neural nodes */}
          {[[-10,-12],[10,-12],[-15,3],[15,3],[0,15]].map(([x,y],i) => (
            <g key={i}>
              <line x1="38" y1="38" x2={38+x} y2={38+y} stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
              <circle cx={38+x} cy={38+y} r="4" fill="rgba(255,255,255,.6)"/>
            </g>
          ))}
          <circle cx="38" cy="38" r="8" fill="white" opacity=".9"/>
          <text x="38" y="88" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="8" fontWeight="600">AI Engine</text>
        </g>

        {/* Security shield bottom right */}
        <g transform="translate(440,360)">
          <circle cx="38" cy="38" r="36" fill="url(#hg3)" opacity=".9"/>
          <path d="M38 20 L52 27 L52 40 C52 50 44 58 38 62 C32 58 24 50 24 40 L24 27 Z" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/>
          <path d="M31 38 L36 43 L46 33" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="38" y="88" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="8" fontWeight="600">Security</text>
        </g>

        {/* Connecting lines */}
        {[
          ['110,210','120,160'],['350,160','400,90'],
          ['112,360','174,240'],['440,270','454,158'],
          ['114,400','152,398'],['408,396','444,396'],
        ].map(([a,b],i) => (
          <line key={i} x1={a.split(',')[0]} y1={a.split(',')[1]} x2={b.split(',')[0]} y2={b.split(',')[1]}
            stroke="rgba(27,79,216,.15)" strokeWidth="1.5" strokeDasharray="4,4"/>
        ))}

        {/* Floating stat chips */}
        <g transform="translate(360,220)" className="anim-float2">
          <rect width="120" height="44" rx="10" fill="white" stroke="rgba(27,79,216,.12)" strokeWidth="1"/>
          <rect width="120" height="44" rx="10" fill="rgba(255,255,255,.7)" style={{backdropFilter:'blur(10px)'}}/>
          <text x="14" y="17" fill="#64748B" fontSize="8" fontWeight="700">PROJECTS LIVE</text>
          <text x="14" y="34" fill="#0A1628" fontSize="16" fontWeight="800" fontFamily="system-ui">1000+</text>
        </g>

        <g transform="translate(30,280)" className="anim-float3">
          <rect width="100" height="40" rx="10" fill="white" stroke="rgba(16,185,129,.2)" strokeWidth="1"/>
          <text x="14" y="16" fill="#0D9488" fontSize="8" fontWeight="700">SATISFACTION</text>
          <text x="14" y="32" fill="#0A1628" fontSize="14" fontWeight="800">98%</text>
        </g>
      </svg>
    </div>
  )
}
