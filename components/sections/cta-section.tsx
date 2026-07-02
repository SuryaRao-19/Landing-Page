'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, MessageCircle } from 'lucide-react'

const TRUST = ['No commitment required', 'Response within 2 hours', 'Senior architect on the call']

const ease = [0.22, 1, 0.36, 1] as const

export function CTASection() {
  return (
    <section className="section-sm" aria-label="Call to action">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease }}
          className="relative overflow-hidden rounded-[28px]"
          style={{ background: 'linear-gradient(135deg, #1B4FD8 0%, #2563EB 45%, #0891B2 100%)' }}
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-grid opacity-[.08]" aria-hidden />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 0%, rgba(255,255,255,.07) 0%, transparent 65%)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,.25), transparent 70%)' }}
            aria-hidden
          />
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)' }}
            aria-hidden
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 md:px-16 md:py-20 text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              <span className="text-[0.6875rem] font-bold text-white/75 uppercase tracking-widest">
                Now accepting new clients for Q3 2026
              </span>
            </div>

            {/* Heading */}
            <h2 className="display-xl text-white mb-5 max-w-3xl mx-auto">
              Ready to Transform<br className="hidden sm:block" /> Your Business?
            </h2>

            {/* Sub */}
            <p className="text-blue-100/80 text-[1.0625rem] leading-[1.8] max-w-xl mx-auto mb-11">
              Book a free 60-minute consultation with a senior architect. We&apos;ll map your goals, identify quick wins, and outline a roadmap — at no cost.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3.5 mb-10">
              <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-[14px] bg-white text-[#1D4ED8] font-semibold text-[0.9375rem] tracking-[-0.01em] hover:bg-blue-50 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,.22),0_1px_4px_rgba(0,0,0,.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,.28)] hover:-translate-y-1">
                <Calendar size={16} />
                Book Free Consultation
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-[14px] border border-white/20 bg-white/[.08] text-white font-semibold text-[0.9375rem] tracking-[-0.01em] hover:bg-white/[.15] hover:border-white/35 transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm">
                <MessageCircle size={16} />
                Chat with Sales
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2.5">
              {TRUST.map((t) => (
                <span key={t} className="flex items-center gap-2 text-[0.8125rem] text-blue-100/70">
                  <CheckCircle2 size={13} className="text-emerald-300/80 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
