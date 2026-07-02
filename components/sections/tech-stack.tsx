'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TECHNOLOGIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

const ALL_CATEGORIES = ['All', 'Languages', 'Frontend', 'Backend', 'Mobile', 'Cloud', 'DevOps', 'AI/ML', 'Databases']

/* Brand color map for clean pill backgrounds */
const BRAND_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Python':        { bg: '#FEF9C3', color: '#854D0E', border: '#FDE68A' },
  'TypeScript':    { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'Java':          { bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
  'Go':            { bg: '#ECFEFF', color: '#0E7490', border: '#A5F3FC' },
  'Rust':          { bg: '#FFF7ED', color: '#9A3412', border: '#FDBA74' },
  'React':         { bg: '#ECFEFF', color: '#0E7490', border: '#A5F3FC' },
  'Next.js':       { bg: '#F8FAFC', color: '#0F172A', border: '#E2E8F0' },
  'Angular':       { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3' },
  'Vue.js':        { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  'Node.js':       { bg: '#F0FDF4', color: '#166534', border: '#86EFAC' },
  'GraphQL':       { bg: '#FDF4FF', color: '#7E22CE', border: '#E9D5FF' },
  'Flutter':       { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' },
  'React Native':  { bg: '#ECFEFF', color: '#0E7490', border: '#A5F3FC' },
  'AWS':           { bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
  'Azure':         { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'GCP':           { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3' },
  'Docker':        { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' },
  'Kubernetes':    { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'Terraform':     { bg: '#F5F3FF', color: '#5B21B6', border: '#DDD6FE' },
  'Jenkins':       { bg: '#FFF7ED', color: '#9A3412', border: '#FED7AA' },
  'TensorFlow':    { bg: '#FFF7ED', color: '#B45309', border: '#FDE68A' },
  'PyTorch':       { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3' },
  'PostgreSQL':    { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' },
  'MongoDB':       { bg: '#F0FDF4', color: '#166534', border: '#86EFAC' },
  'Redis':         { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3' },
  'Kafka':         { bg: '#F8FAFC', color: '#334155', border: '#CBD5E1' },
}

/* Technology initials / short labels for the badges */
const TECH_SHORT: Record<string, string> = {
  'Python': 'PY', 'TypeScript': 'TS', 'Java': 'JV', 'Go': 'GO', 'Rust': 'RS',
  'React': 'RE', 'Next.js': 'NX', 'Angular': 'NG', 'Vue.js': 'VU', 'Node.js': 'ND',
  'GraphQL': 'GQ', 'Flutter': 'FL', 'React Native': 'RN', 'AWS': 'AWS', 'Azure': 'AZ',
  'GCP': 'GCP', 'Docker': 'DK', 'Kubernetes': 'K8s', 'Terraform': 'TF', 'Jenkins': 'JN',
  'TensorFlow': 'TF', 'PyTorch': 'PT', 'PostgreSQL': 'PG', 'MongoDB': 'MG', 'Redis': 'RD',
  'Kafka': 'KF',
}

export function TechStack() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((t) => t.category === active)

  return (
    <section className="section bg-[#F8FAFC]" id="technologies">
      <div className="container">
        <SectionHeader
          label="Technology Stack"
          title="40+ Technologies,"
          highlight="One Team"
          subtitle="Deep expertise across every layer of the modern technology stack — from AI frameworks to cloud platforms."
          center
          className="mb-12"
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4.5 py-2 rounded-full text-[0.8125rem] font-semibold transition-all duration-200 ${
                active === cat
                  ? 'bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,.35)]'
                  : 'bg-white text-[#64748B] border border-[#E8EEF4] hover:border-[#93C5FD] hover:text-[#2563EB] shadow-[0_1px_3px_rgba(0,0,0,.04)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
          >
            {filtered.map((tech, i) => {
              const brand = BRAND_COLORS[tech.name]
              const short = TECH_SHORT[tech.name] ?? tech.name.slice(0, 2).toUpperCase()
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.025, duration: 0.3 }}
                  className="group bg-white border border-[#E8EEF4] rounded-[16px] p-3.5 text-center flex flex-col items-center gap-2.5 hover:border-[#93C5FD] hover:shadow-[0_6px_24px_rgba(37,99,235,.12)] hover:-translate-y-1.5 transition-all duration-200 cursor-default"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,.04), 0 2px 8px rgba(0,0,0,.04)' }}
                >
                  {/* Brand badge */}
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center font-bold text-[11px] tracking-tight border transition-transform duration-200 group-hover:scale-110"
                    style={brand
                      ? { background: brand.bg, color: brand.color, borderColor: brand.border }
                      : { background: '#F1F5F9', color: '#475569', borderColor: '#E2E8F0' }
                    }
                  >
                    {short}
                  </div>
                  <span className="font-semibold text-[12px] text-[#334155] leading-tight text-center group-hover:text-[#2563EB] transition-colors duration-200">
                    {tech.name}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom tagline */}
        <p className="text-center text-[0.8125rem] text-[#64748B] mt-10">
          And 15+ more — we pick the right tool for your specific challenge.
        </p>
      </div>
    </section>
  )
}
