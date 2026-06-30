'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/data'
import { Button } from '@/components/ui/button'

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="NexGen Technologies Home">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#1B4FD8,#06B6D4)' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" fill="white" fillOpacity=".9"/>
          <path d="M10 6L14 8.5V12.5L10 15L6 12.5V8.5L10 6Z" fill="white"/>
        </svg>
      </div>
      <span className="font-extrabold text-xl text-slate-900 tracking-tight">
        Nex<span className="text-grad">Gen</span>
      </span>
    </Link>
  )
}

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu,   setOpenMenu]   = useState<string | null>(null)
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setOpenMenu(null) }, [pathname])

  const openDropdown  = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150)
  }

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <nav
          className="container-lg flex items-center justify-between h-[72px]"
          aria-label="Main navigation"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && openDropdown(item.label)}
                onMouseLeave={() => item.children && scheduleClose()}
              >
                {item.children ? (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      openMenu === item.label
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                    )}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn('transition-transform duration-200', openMenu === item.label && 'rotate-180')}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Mega dropdown */}
                {item.children && openMenu === item.label && (
                  <div
                    className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50',
                      'bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/60',
                      'min-w-[240px] p-2 animate-in fade-in-0 slide-in-from-top-2 duration-150',
                    )}
                    role="menu"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        role="menuitem"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918045678900"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Call us"
            >
              <Phone size={14} />
              <span>+91 80 4567 8900</span>
            </a>
            <Link href="/contact">
              <Button size="sm">Schedule Consultation</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <nav
            className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="p-4 space-y-1" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer list-none">
                        {item.label}
                        <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
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
                        'block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50',
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-slate-100">
              <Link href="/contact" className="block">
                <Button className="w-full" size="md">Schedule Consultation</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
