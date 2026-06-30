'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TECHNOLOGIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Languages', 'Frontend', 'Backend', 'Mobile', 'Cloud', 'DevOps', 'AI/ML', 'Databases']

export function TechStackSection() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((t) => t.category === active)

  return (
    <section className="section" aria-label="Technology stack">
      <div className="container">
        <SectionHeader
          label="Technology Stack"
          title="Built With World-Class"
          highlight="Technologies"
          subtitle="We work with the most powerful and proven technologies to deliver scalable, future-ready solutions."
          center
          className="mb-10"
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Technology categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                active === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {filtered.map((tech, i) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: .9 }}
              transition={{ delay: i * .03 }}
              className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center gap-2.5 text-center hover:border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white"
                style={{ background: tech.color }}
              >
                {tech.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">{tech.name}</span>
              <span className="text-[10px] text-slate-400">{tech.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
