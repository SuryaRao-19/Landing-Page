'use client'

import { motion } from 'framer-motion'
import { HOME_STATS } from '@/lib/data'

const LOGO_NAMES = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'HCL Tech', 'Zoho', 'Cognizant', 'Freshworks']

export function TrustBar() {
  return (
    <section className="bg-[#0A1628] py-16" aria-label="Trust signals">
      <div className="container">
        <motion.p
          className="text-center text-slate-400 text-sm font-semibold uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by industry leaders across India &amp; worldwide
        </motion.p>

        {/* Logo strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-14 opacity-40 grayscale">
          {LOGO_NAMES.map((name) => (
            <span key={name} className="text-white font-bold text-lg tracking-tight">{name}</span>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/8 rounded-2xl overflow-hidden">
          {HOME_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-[#0D1F3C] px-6 py-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .08 }}
            >
              <p className="font-extrabold text-3xl text-white">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-slate-400 text-xs mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
