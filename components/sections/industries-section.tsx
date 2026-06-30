'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { INDUSTRIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

export function IndustriesSection() {
  return (
    <section className="section" aria-label="Industries we serve">
      <div className="container">
        <SectionHeader
          label="Industries"
          title="Domain Expertise Across"
          highlight="Key Sectors"
          subtitle="Deep vertical knowledge combined with technology excellence to deliver transformative outcomes in every industry."
          center
          className="mb-14"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, scale: .95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * .06 }}
            >
              <Link href="/industries">
                <div
                  className="group flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-white text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full"
                  style={{ '--ind-color': ind.color } as React.CSSProperties}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}20` }}
                  >
                    {ind.icon}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-blue-700 transition-colors">
                    {ind.title}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
