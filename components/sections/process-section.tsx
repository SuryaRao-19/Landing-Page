'use client'

import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

export function ProcessSection() {
  return (
    <section className="section" aria-label="Our development process">
      <div className="container">
        <SectionHeader
          label="Our Process"
          title="From Discovery to Delivery —"
          highlight="Our Proven Methodology"
          subtitle="A battle-tested 8-step delivery framework that ensures quality, transparency, and measurable results at every milestone."
          center
          className="mb-16"
        />

        {/* Mobile: vertical list */}
        <div className="lg:hidden space-y-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              className="flex gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .06 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {step.step}
                </div>
                {i < PROCESS_STEPS.length - 1 && <div className="w-px flex-1 bg-blue-100 mt-2" />}
              </div>
              <div className="pb-6">
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: horizontal track */}
        <div className="hidden lg:block relative">
          {/* Track line */}
          <div
            className="absolute top-[44px] left-[5%] right-[5%] h-0.5"
            style={{ background: 'linear-gradient(90deg,#1B4FD8,#06B6D4)' }}
            aria-hidden
          />

          <div className="grid grid-cols-8 gap-2">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .08 }}
              >
                {/* Node */}
                <div
                  className="w-[88px] h-[88px] rounded-full bg-white border-2 border-slate-100 flex flex-col items-center justify-center mb-4 shadow-md transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-xl group-hover:shadow-blue-100 relative z-10"
                >
                  <span className="font-extrabold text-lg text-grad">{step.step}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-[11px] text-slate-400 leading-snug">{step.desc.slice(0, 60)}…</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
