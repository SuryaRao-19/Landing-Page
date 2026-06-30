'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Globe2, HeartHandshake, Award, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'

const REASONS = [
  { icon: Award,         title: 'Certified Excellence',     desc: 'ISO 27001, CMMi Level 5, and 150+ cloud & security certifications across our expert teams.' },
  { icon: Zap,           title: 'Agile Delivery',           desc: 'Sprint-based delivery with daily updates, weekly demos, and full transparency throughout every project.' },
  { icon: Globe2,        title: 'Global Reach, Local Depth', desc: 'Offices in Bengaluru, Mumbai, Hyderabad, and Dubai. Delivery teams aligned with your time zone.' },
  { icon: Shield,        title: 'Security-First Mindset',   desc: 'Security is embedded in every delivery — not bolted on. From architecture to deployment.' },
  { icon: HeartHandshake,'title': 'Long-Term Partnership',  desc: '78% of our revenue comes from repeat clients. We build relationships, not just projects.' },
  { icon: Clock,         title: '24×7 Support',             desc: 'Round-the-clock monitoring, SLA-backed incident response, and proactive maintenance.' },
]

const STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '150+', label: 'Domain Experts' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '24×7', label: 'Support Coverage' },
]

export function WhyUsSection() {
  return (
    <section className="section bg-slate-50" aria-label="Why choose NexGen">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionHeader
              label="Why NexGen"
              title="A Team of World-Class Experts"
              highlight="Dedicated to Your Success"
              subtitle="We combine the technical depth of a global systems integrator with the agility and client-centricity of a boutique consultancy."
              className="mb-10"
            />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .1 }}
                >
                  <p className="font-extrabold text-3xl text-grad">{s.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Reasons */}
          <div className="grid sm:grid-cols-2 gap-4">
            {REASONS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .08 }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
