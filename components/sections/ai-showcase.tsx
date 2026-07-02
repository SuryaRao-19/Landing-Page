'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Cpu, BarChart3, Layers, Zap, Shield } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { SectionHeader } from '@/components/shared/section-header'

const CAPABILITIES = [
  { icon: Brain,    title: 'Generative AI',        desc: 'LLM integration, RAG pipelines, AI copilots for enterprise workflows' },
  { icon: BarChart3,title: 'Predictive Analytics', desc: 'Demand forecasting, churn prediction, fraud detection at scale' },
  { icon: Cpu,      title: 'Computer Vision',       desc: 'Quality inspection, document processing, real-time video analytics' },
  { icon: Layers,   title: 'MLOps & Deployment',   desc: 'Automated model training, versioning, monitoring and A/B testing' },
  { icon: Zap,      title: 'NLP & Automation',      desc: 'Intelligent document processing, chatbots, sentiment analysis' },
  { icon: Shield,   title: 'Responsible AI',        desc: 'Explainability, bias detection, compliance-ready AI governance' },
]

/* Animated AI SVG illustration */
function AIIllustration() {
  return (
    <svg viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[460px]" aria-hidden>
      <defs>
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity=".35"/>
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="ai-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
        <linearGradient id="ai-v" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED"/>
          <stop offset="100%" stopColor="#2563EB"/>
        </linearGradient>
      </defs>

      {/* Ambient */}
      <ellipse cx="230" cy="180" rx="180" ry="140" fill="url(#ai-glow)"/>

      {/* Orbit rings */}
      <circle cx="230" cy="180" r="130" stroke="rgba(37,99,235,.12)" strokeWidth="1" strokeDasharray="4 6"/>
      <circle cx="230" cy="180" r="100" stroke="rgba(37,99,235,.08)" strokeWidth="1" strokeDasharray="4 6"/>

      {/* Central brain */}
      <circle cx="230" cy="180" r="48" fill="url(#ai-b)" opacity=".95"/>
      <circle cx="230" cy="180" r="48" fill="url(#ai-b)" opacity=".2" style={{filter:'blur(12px)'}}/>
      {/* Brain paths */}
      <path d="M220 165c-5-2-12-1-14 7s3 12 8 12M220 165c2-7 8-10 14-6M234 159c5-1 12 2 12 10s-5 12-11 11M220 184c-3 4-2 11 5 12s13-3 12-10M234 184c2 5 9 8 14 4s4-11-2-14" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".85"/>
      <circle cx="230" cy="180" r="4" fill="white" opacity=".9"/>

      {/* Satellite nodes */}
      {[
        [230,50,'📊'],[360,130,'💻'],[360,230,'🔒'],[230,310,'🌐'],[100,230,'☁️'],[100,130,'🤖'],
      ].map(([cx,cy,icon],i) => (
        <g key={i}>
          <line x1={230} y1={180} x2={cx as number} y2={cy as number}
            stroke="rgba(37,99,235,.2)" strokeWidth="1.2" strokeDasharray="3 4"/>
          <circle cx={cx as number} cy={cy as number} r="24" fill="rgba(10,15,28,.85)" stroke="rgba(37,99,235,.35)" strokeWidth="1.5"/>
          <text x={cx as number} y={(cy as number)+5} textAnchor="middle" fontSize="14">{icon as string}</text>
        </g>
      ))}

      {/* Floating metrics */}
      <g transform="translate(10,60)">
        <rect width="100" height="38" rx="10" fill="rgba(16,185,129,.12)" stroke="rgba(16,185,129,.3)" strokeWidth="1"/>
        <text x="12" y="16" fill="rgba(255,255,255,.6)" fontSize="7.5" fontWeight="600">ACCURACY</text>
        <text x="12" y="30" fill="#10B981" fontSize="13" fontWeight="800">98.7%</text>
      </g>
      <g transform="translate(346,280)">
        <rect width="104" height="38" rx="10" fill="rgba(37,99,235,.15)" stroke="rgba(37,99,235,.35)" strokeWidth="1"/>
        <text x="12" y="16" fill="rgba(255,255,255,.6)" fontSize="7.5" fontWeight="600">INFERENCE</text>
        <text x="12" y="30" fill="#60A5FA" fontSize="13" fontWeight="800">2ms avg</text>
      </g>
    </svg>
  )
}

export function AIShowcase() {
  return (
    <section className="section bg-dark-mesh" id="ai">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left: illustration */}
          <motion.div
            initial={{ opacity: 0, scale: .95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
            className="order-last lg:order-first"
          >
            <AIIllustration />
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
          >
            <SectionHeader
              label="AI & Machine Learning"
              title="Intelligence at the"
              highlight="Core"
              titleAfter="of Everything"
              subtitle="We embed AI into your workflows, products, and decision-making — moving you from reactive to predictive to autonomous."
              dark
            />

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .08, duration: .4 }}
                  className="bg-white/[.05] border border-white/[.09] rounded-[18px] p-5 hover:bg-white/[.09] hover:border-white/[.16] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <cap.icon size={20} className="text-[#60A5FA] mb-3" />
                  <p className="font-semibold text-[0.9375rem] text-white mb-1.5 tracking-[-0.01em]">{cap.title}</p>
                  <p className="text-[0.8125rem] text-slate-400 leading-[1.65]">{cap.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <ButtonLink href="/services/artificial-intelligence" variant="primary" size="md" iconRight={<ArrowRight size={14} />}>
                Explore AI Services
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30">
                Talk to an AI Expert
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
