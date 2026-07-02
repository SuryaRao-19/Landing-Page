'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Map, Palette, Code2, TestTube, Rocket, Wrench } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

const STEP_ICONS = [Search, FileText, Map, Palette, Code2, TestTube, Rocket, Wrench]

const STEP_COLORS = [
  '#2563EB', '#7C3AED', '#0D9488', '#F59E0B',
  '#06B6D4', '#10B981', '#EF4444', '#6366F1',
]

const ease = [0.22, 1, 0.36, 1] as const

export function ProcessSection() {
  return (
    <section className="section bg-white" id="process">
      <div className="container">
        <SectionHeader
          label="How We Work"
          title="A Proven Process for"
          highlight="Every Engagement"
          subtitle="Eight disciplined steps that transform business requirements into production-grade software."
          center
          className="mb-16"
        />

        {/* Desktop: horizontal track */}
        <div className="hidden lg:block relative">
          {/* Background track */}
          <div className="absolute top-7 left-[52px] right-[52px] h-px bg-[#E2E8F0]" aria-hidden />
          {/* Animated progress line */}
          <motion.div
            className="absolute top-7 left-[52px] h-px"
            style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
            initial={{ width: 0 }}
            whileInView={{ width: 'calc(100% - 104px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease, delay: 0.35 }}
            aria-hidden
          />

          <div className="grid grid-cols-8 gap-1">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i]
              const color = STEP_COLORS[i]
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.45, ease }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Node */}
                  <div className="relative mb-5 z-10">
                    <div
                      className="w-14 h-14 rounded-[16px] bg-white border border-[#E2E8F0] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,.06)] group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(0,0,0,.1)] transition-all duration-300 cursor-default"
                      style={{ '--c': color } as React.CSSProperties}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold shadow-[0_0_0_2px_white] z-10"
                      style={{ fontSize: '9px', background: color }}
                      aria-hidden
                    >
                      {i + 1}
                    </div>
                  </div>

                  <p className="font-semibold text-[0.8125rem] text-[#0A0F1C] leading-snug mb-1.5 px-0.5">
                    {step.title}
                  </p>
                  <p className="text-[0.75rem] text-[#64748B] leading-[1.6] px-0.5 line-clamp-3">
                    {step.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-14">
          <div
            className="absolute left-5 top-3 bottom-3 w-px opacity-20"
            style={{ background: 'linear-gradient(to bottom, #2563EB, #06B6D4)' }}
            aria-hidden
          />

          <div className="space-y-5">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i]
              const color = STEP_COLORS[i]
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease }}
                  className="relative"
                >
                  {/* Circle on timeline */}
                  <div
                    className="absolute -left-[52px] top-3.5 w-10 h-10 rounded-[12px] bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm"
                  >
                    <Icon size={17} style={{ color }} />
                  </div>

                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[10px] font-bold rounded-full px-2 py-0.5 text-white"
                        style={{ background: color }}
                      >
                        {i + 1}
                      </span>
                      <p className="font-semibold text-[0.875rem] text-[#0A0F1C]">{step.title}</p>
                    </div>
                    <p className="text-[0.8125rem] text-[#64748B] leading-[1.65]">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
