'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const CLIENTS = [
  'Infosys', 'TCS', 'Wipro', 'HCL', 'Tech Mahindra',
  'Reliance', 'Adani', 'HDFC', 'ICICI', 'Bajaj',
  'Flipkart', 'Zomato', 'Paytm', 'PhonePe', 'Jio',
  'TATA', 'Airtel', 'Mahindra', 'Godrej', 'L&T',
]

const STATS = [
  { value: 500,  suffix: '+',   label: 'Enterprise Clients',  color: '#2563EB' },
  { value: 15,   suffix: '+',   label: 'Years of Excellence', color: '#0D9488' },
  { value: 1000, suffix: '+',   label: 'Projects Delivered',  color: '#7C3AED' },
  { value: 25,   suffix: '+',   label: 'Countries Served',    color: '#0E7490' },
  { value: 99.9, suffix: '%',   label: 'Service Availability',color: '#B45309' },
]

const ease = [0.22, 1, 0.36, 1] as const

function AnimatedCounter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    const isDecimal = target % 1 !== 0

    const step = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      const current = isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.round(eased * target)
      setCount(current)
      if (elapsed < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  const display = target % 1 !== 0 ? count.toFixed(1) : count >= 1000 ? `${(count / 1000).toFixed(0)},${String(count % 1000).padStart(3, '0')}` : String(count)

  return (
    <span ref={ref} className="font-extrabold text-[2.5rem] leading-none tracking-[-0.05em]" style={{ color }}>
      {display}{suffix}
    </span>
  )
}

export function TrustBar() {
  return (
    <section className="py-14 bg-white border-y border-[#F1F5F9]" aria-label="Trusted by leading companies">
      <div className="container">

        {/* Label */}
        <p className="text-center text-[0.6875rem] text-[#64748B] uppercase tracking-widest font-bold mb-8">
          Trusted by 500+ enterprises across India &amp; 25+ countries worldwide
        </p>

        {/* Logo ticker */}
        <div className="overflow-hidden relative mb-12">
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, white 0%, transparent 100%)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, white 0%, transparent 100%)' }}
          />

          <motion.div
            className="flex gap-12 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            aria-hidden
          >
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((name, i) => (
              <div key={i} className="shrink-0 flex items-center gap-2 select-none">
                <div className="w-5 h-5 rounded-full bg-[#E2E8F0]" />
                <span className="font-bold text-[0.875rem] tracking-[-0.02em] text-[#64748B]">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {STATS.map(({ value, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease }}
              className="bg-white border border-[#E8EEF4] hover:shadow-[0_6px_28px_rgba(0,0,0,.07)] hover:border-[#E2E8F0] hover:-translate-y-1 transition-all duration-300"
              style={{ borderRadius: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.04)' }}
            >
              <div className="text-center" style={{ padding: '28px' }}>
                <AnimatedCounter target={value} suffix={suffix} color={color} />
                <p className="text-[0.875rem] text-[#64748B] mt-2.5 font-medium">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
