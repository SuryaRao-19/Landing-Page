'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

interface CTASectionProps {
  title?: string
  subtitle?: string
}

export function CTASection({
  title = "Let's Build Your Digital Future Together",
  subtitle = 'Join 500+ enterprise clients who trust NexGen to power their most critical technology initiatives. Your transformation starts with a conversation.',
}: CTASectionProps) {
  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1B4FD8 100%)' }}
      aria-label="Call to action"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />
        <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
        <div className="absolute inset-0 bg-dots opacity-30" />
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
        >
          <h2
            className="font-extrabold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-1px' }}
          >
            {title}
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{subtitle}</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl text-sm sm:text-base"
            >
              Book Consultation
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/918045678900"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-200 text-sm sm:text-base"
            >
              <MessageCircle size={16} />
              Talk to Our Experts
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-blue-300">
            {['Free consultation, no commitment', '24-hour response guaranteed', 'NDA available on request', 'Fixed-price or T&M models'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-blue-400 rounded-full" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
