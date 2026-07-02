'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowRight, Search } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'

const QUICK_LINKS = [
  { label: 'Services',    href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About Us',    href: '/about' },
  { label: 'Contact',     href: '/contact' },
]

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-25" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(37,99,235,.05) 0%,transparent 60%)' }}
        aria-hidden
      />

      <div className="container relative z-10 max-w-xl py-32 text-center">
        {/* Number */}
        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
          className="relative mb-2"
        >
          <span
            className="font-extrabold text-[#F1F5F9] select-none pointer-events-none"
            style={{ fontSize: 'clamp(8rem,22vw,14rem)', lineHeight: 1, letterSpacing: '-8px', display: 'block' }}
            aria-hidden
          >
            404
          </span>
          {/* Layered glow */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              className="w-40 h-40 rounded-full"
              style={{ background: 'radial-gradient(circle,rgba(37,99,235,.12),transparent 70%)' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, delay: .2, ease: [.22, 1, .36, 1] }}
          className="-mt-6"
        >
          <h1 className="display-md text-[#0A0F1C] mb-3">Page Not Found</h1>
          <p className="text-[#64748B] text-[.9375rem] leading-relaxed mb-8">
            This page has moved, been removed, or never existed.
            Let&apos;s get you back to somewhere useful.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <ButtonLink href="/" variant="primary" size="lg" icon={<Home size={15} />}>
              Back to Home
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Contact Us
            </ButtonLink>
          </div>

          {/* Quick nav */}
          <div className="border-t border-[#F1F5F9] pt-8">
            <p className="text-[11px] text-[#CBD5E1] uppercase tracking-[.2em] font-semibold mb-4">
              Quick navigation
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#475569] hover:text-[#2563EB] px-3.5 py-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:bg-[#EFF6FF] transition-all"
                >
                  {l.label}
                  <ArrowRight size={11} />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
