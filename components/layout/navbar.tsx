'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, Zap, Cloud, Code2, Shield, Database, Cpu, Globe, Smartphone, BarChart3, Settings, Lightbulb, Repeat2, Brain, Server, Landmark, HeartPulse, Factory, ShoppingBag, GraduationCap, Truck, Radio, Building2, Users, Briefcase, FileText, Star, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/data'

/* ── Logo ─────────────────────────────────────── */
function NexGenLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="NexGen — Home">
      <div className="relative">
        <div
          className={cn(
            'w-8 h-8 rounded-[10px] flex items-center justify-center transition-all duration-300',
            'bg-[#2563EB]',
            'shadow-[0_2px_8px_rgba(37,99,235,.4)]',
            'group-hover:shadow-[0_4px_16px_rgba(37,99,235,.5)]',
            'group-hover:scale-105',
          )}
        >
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" fill="rgba(255,255,255,.18)" stroke="white" strokeWidth="1.2"/>
            <path d="M9 5L12.5 7V11L9 13L5.5 11V7L9 5Z" fill="white"/>
          </svg>
        </div>
      </div>
      <span className={cn(
        'font-extrabold text-[1.1rem] tracking-[-0.03em] transition-colors duration-300',
        scrolled ? 'text-[#0A0F1C]' : 'text-[#0A0F1C]',
      )}>
        Nex<span className="text-[#2563EB]">Gen</span>
      </span>
    </Link>
  )
}

/* ── Service icon map ─────────────────────────── */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'Artificial Intelligence':  <Brain size={14} />,
  'Cloud Solutions':          <Cloud size={14} />,
  'Software Development':     <Code2 size={14} />,
  'Web Development':          <Globe size={14} />,
  'Mobile Apps':              <Smartphone size={14} />,
  'Cybersecurity':            <Shield size={14} />,
  'Enterprise ERP':           <Settings size={14} />,
  'DevOps':                   <Repeat2 size={14} />,
  'Data Engineering':         <Database size={14} />,
  'UI/UX Design':             <Zap size={14} />,
  'Business Automation':      <Cpu size={14} />,
  'IT Consulting':            <Lightbulb size={14} />,
  'Digital Transformation':   <Repeat2 size={14} />,
  'AI & Machine Learning':    <Brain size={14} />,
  'Cloud Migration':          <Cloud size={14} />,
  'Enterprise Automation':    <Settings size={14} />,
  'About Us':                 <Building2 size={14} />,
  'Leadership':               <Users size={14} />,
  'Clients':                  <Star size={14} />,
  'Blog':                     <FileText size={14} />,
  'Careers':                  <Briefcase size={14} />,
  'Portfolio':                <FolderOpen size={14} />,
  'Banking & Finance':        <Landmark size={14} />,
  'Healthcare':               <HeartPulse size={14} />,
  'Manufacturing':            <Factory size={14} />,
  'Retail & E-Commerce':      <ShoppingBag size={14} />,
  'Education':                <GraduationCap size={14} />,
  'Government':               <Landmark size={14} />,
  'Logistics':                <Truck size={14} />,
  'Telecommunications':       <Radio size={14} />,
  'Analytics & BI':           <BarChart3 size={14} />,
  'Infrastructure':           <Server size={14} />,
}

/* ── Dropdown ─────────────────────────────────── */
function DropdownMenu({
  label,
  items,
  onClose,
}: {
  label: string
  items: NonNullable<(typeof NAV_ITEMS)[0]['children']>
  onClose: () => void
}) {
  const isLarge = items.length > 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'absolute top-full mt-3 left-1/2 -translate-x-1/2 z-50',
        'bg-white rounded-[20px] p-1.5',
        'border border-[#E2E8F0]',
        'shadow-[0_8px_16px_rgba(0,0,0,.06),0_24px_64px_rgba(0,0,0,.1)]',
        isLarge ? 'w-[580px]' : 'w-56',
      )}
      role="menu"
    >
      {/* Category header for large dropdowns */}
      {isLarge && (
        <div className="px-3 pt-2 pb-1.5 mb-1 border-b border-[#F1F5F9]">
          <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{label}</p>
        </div>
      )}

      <div className={cn(isLarge && 'grid grid-cols-2 gap-px')}>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            role="menuitem"
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-[12px]',
              'text-[0.8125rem] font-medium text-[#334155]',
              'hover:text-[#2563EB] hover:bg-[#F5F8FF]',
              'transition-all duration-150 group',
            )}
          >
            <span
              className={cn(
                'w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 transition-all duration-150',
                'bg-[#F8FAFC] border border-[#E2E8F0]',
                'text-[#64748B]',
                'group-hover:bg-[#EEF4FF] group-hover:border-[#C7D7FD] group-hover:text-[#2563EB]',
              )}
              aria-hidden
            >
              {SERVICE_ICONS[item.label] ?? <span className="text-[10px] font-bold">✦</span>}
            </span>
            <span className="flex-1 leading-tight">{item.label}</span>
            <ArrowRight
              size={10}
              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 text-[#2563EB]"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Main Navbar ──────────────────────────────── */
export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu,   setOpenMenu]   = useState<string | null>(null)
  const pathname = usePathname()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setOpenMenu(null) }, [pathname])

  const open  = useCallback((l: string) => { if (timerRef.current) clearTimeout(timerRef.current); setOpenMenu(l) }, [])
  const close = useCallback(() => { timerRef.current = setTimeout(() => setOpenMenu(null), 180) }, [])
  const keep  = useCallback(() => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/96 backdrop-blur-2xl border-b border-[#E2E8F0]/80 shadow-[0_1px_0_rgba(0,0,0,.03),0_4px_16px_rgba(0,0,0,.04)]'
            : 'bg-transparent',
        )}
      >
        <nav
          className="container-lg flex items-center h-[72px] gap-6"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <NexGenLogo scrolled={scrolled} />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="list">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href ? pathname === item.href : false
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && open(item.label)}
                  onMouseLeave={() => item.children && close()}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl',
                        'text-[0.84rem] font-medium tracking-[-0.01em]',
                        'transition-all duration-150',
                        openMenu === item.label
                          ? 'text-[#2563EB] bg-[#F0F5FF]'
                          : 'text-[#374151] hover:text-[#0A0F1C] hover:bg-[#F8FAFC]',
                      )}
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      aria-haspopup="menu"
                      aria-expanded={openMenu === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        className={cn(
                          'text-[#94A3B8] transition-transform duration-200',
                          openMenu === item.label ? 'rotate-180 text-[#2563EB]' : '',
                        )}
                        aria-hidden
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'inline-flex items-center px-3.5 py-2 rounded-xl',
                        'text-[0.84rem] font-medium tracking-[-0.01em]',
                        'transition-all duration-150',
                        isActive
                          ? 'text-[#2563EB] bg-[#F0F5FF]'
                          : 'text-[#374151] hover:text-[#0A0F1C] hover:bg-[#F8FAFC]',
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {item.children && openMenu === item.label && (
                      <DropdownMenu
                        label={item.label}
                        items={item.children}
                        onClose={() => setOpenMenu(null)}
                      />
                    )}
                  </AnimatePresence>

                  {/* Bridge zone to keep hover alive */}
                  {item.children && openMenu === item.label && (
                    <div className="absolute top-full left-0 right-0 h-4" onMouseEnter={keep} aria-hidden />
                  )}
                </li>
              )
            })}
          </ul>

          {/* CTA row */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/contact" className={cn(
              'inline-flex items-center px-4 py-2 rounded-xl text-[0.84rem] font-medium tracking-[-0.01em]',
              'text-[#374151] hover:text-[#0A0F1C] hover:bg-[#F8FAFC]',
              'transition-all duration-150',
            )}>
              Contact
            </Link>
            <Link href="/contact" className={cn(
              'group inline-flex items-center gap-2 px-4 py-2 rounded-xl',
              'text-[0.84rem] font-semibold text-white tracking-[-0.01em]',
              'bg-[#2563EB] hover:bg-[#1D4ED8]',
              'shadow-[0_1px_3px_rgba(37,99,235,.4),0_4px_12px_rgba(37,99,235,.25)]',
              'hover:shadow-[0_2px_6px_rgba(37,99,235,.5),0_8px_20px_rgba(37,99,235,.3)]',
              'transition-all duration-200 hover:-translate-y-0.5',
            )}>
              Free Consultation
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            className={cn(
              'lg:hidden ml-auto p-2 rounded-xl transition-colors',
              'text-[#64748B] hover:text-[#0A0F1C] hover:bg-[#F1F5F9]',
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-40 bg-[#0A0F1C]/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320, mass: 0.8 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[320px] z-50 bg-white shadow-2xl flex flex-col"
              aria-label="Mobile navigation"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-[#F1F5F9]">
                <NexGenLogo scrolled />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors text-[#64748B]"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-0.5" role="list">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      {item.children ? (
                        <details className="group">
                          <summary className={cn(
                            'flex items-center justify-between px-3.5 py-2.5 rounded-[12px]',
                            'text-[0.875rem] font-medium text-[#374151]',
                            'hover:text-[#0A0F1C] hover:bg-[#F8FAFC]',
                            'cursor-pointer list-none transition-colors',
                          )}>
                            {item.label}
                            <ChevronDown size={13} className="group-open:rotate-180 transition-transform text-[#94A3B8]" />
                          </summary>
                          <ul className="pl-3 mt-0.5 space-y-0.5 pb-1">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'flex items-center gap-2.5 px-3.5 py-2 rounded-[10px]',
                                    'text-[0.8125rem] text-[#64748B]',
                                    'hover:text-[#2563EB] hover:bg-[#F0F5FF]',
                                    'transition-colors',
                                  )}
                                >
                                  <span className="w-5 h-5 flex items-center justify-center text-[#94A3B8] shrink-0" aria-hidden>
                                    {SERVICE_ICONS[child.label] ?? null}
                                  </span>
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            'block px-3.5 py-2.5 rounded-[12px]',
                            'text-[0.875rem] font-medium transition-colors',
                            pathname === item.href
                              ? 'text-[#2563EB] bg-[#F0F5FF]'
                              : 'text-[#374151] hover:text-[#0A0F1C] hover:bg-[#F8FAFC]',
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer CTAs */}
              <div className="p-4 border-t border-[#F1F5F9] space-y-2.5">
                <Link href="/contact" className="block text-center w-full py-3 rounded-[12px] bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-colors shadow-[0_2px_8px_rgba(37,99,235,.35)]">
                  Schedule Free Consultation
                </Link>
                <Link href="/contact" className="block text-center w-full py-3 rounded-[12px] border border-[#E2E8F0] text-[#374151] font-medium text-sm hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors">
                  Contact Sales
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
