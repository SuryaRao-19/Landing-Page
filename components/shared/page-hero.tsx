'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Breadcrumb { label: string; href?: string }

interface PageHeroProps {
  eyebrow?: string
  title: string
  highlight?: string
  titleAfter?: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center'
  children?: React.ReactNode
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const

export function PageHero({
  eyebrow, title, highlight, titleAfter, subtitle,
  breadcrumbs, dark, size = 'md', align = 'center',
  children, className,
}: PageHeroProps) {
  const padTop = size === 'lg' ? 'pt-44 pb-28' : size === 'sm' ? 'pt-32 pb-14' : 'pt-40 pb-20'
  const headingClass = size === 'sm' ? 'display-md' : size === 'lg' ? 'display-xl' : 'display-lg'

  return (
    <section
      data-hero-theme={dark ? 'dark' : 'light'}
      className={cn(
        padTop, 'relative overflow-hidden',
        dark ? 'bg-dark-mesh' : 'bg-[#F8FAFC]',
        className,
      )}
    >
      {/* Grid texture */}
      <div
        className={cn('absolute inset-0', dark ? 'bg-dots opacity-[.05]' : 'bg-grid opacity-25')}
        aria-hidden
      />

      {/* Ambient glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none"
        style={{
          background: dark
            ? 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(37,99,235,.28) 0%, transparent 65%)'
            : 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(37,99,235,.08) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      {/* Side glow (dark mode) */}
      {dark && (
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at right, rgba(124,58,237,.1) 0%, transparent 65%)' }}
          aria-hidden
        />
      )}

      {/* Subtle bottom fade for light mode */}
      {!dark && (
        <div
          className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #F8FAFC)' }}
          aria-hidden
        />
      )}

      <div className={cn('container relative z-10', align === 'center' && 'text-center')}>

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            aria-label="Breadcrumb"
            className={cn('mb-7', align === 'center' && 'flex justify-center')}
          >
            <ol className="flex items-center flex-wrap gap-1.5 text-[0.8125rem]">
              <li>
                <Link
                  href="/"
                  className={cn(
                    'flex items-center gap-1 transition-colors',
                    dark ? 'text-white/35 hover:text-white/65' : 'text-[#94A3B8] hover:text-[#64748B]',
                  )}
                >
                  <Home size={11} />
                  <span>Home</span>
                </Link>
              </li>
              {breadcrumbs.map((bc, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={11} className={dark ? 'text-white/15' : 'text-[#CBD5E1]'} />
                  {bc.href && i < breadcrumbs.length - 1 ? (
                    <Link
                      href={bc.href}
                      className={cn(
                        'transition-colors',
                        dark ? 'text-white/35 hover:text-white/65' : 'text-[#94A3B8] hover:text-[#64748B]',
                      )}
                    >
                      {bc.label}
                    </Link>
                  ) : (
                    <span className={cn('font-medium', dark ? 'text-white/65' : 'text-[#475569]')}>
                      {bc.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease }}
            className={cn('mb-5', align === 'center' && 'flex justify-center')}
          >
            <div className={cn('pill', dark && 'pill-dark')}>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-70" aria-hidden />
              {eyebrow}
            </div>
          </motion.div>
        )}

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className={cn(
            headingClass, 'font-extrabold',
            dark ? 'text-white' : 'text-[#0A0F1C]',
            align === 'center' ? 'mx-auto max-w-4xl' : 'max-w-3xl',
          )}
        >
          {title}
          {highlight && (
            <>
              {' '}
              <span className="text-grad">{highlight}</span>
            </>
          )}
          {titleAfter && (
            <>
              {' '}
              {titleAfter}
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
            className={cn(
              'mt-5 text-[1.0625rem] leading-[1.75]',
              dark ? 'text-[#64748B]' : 'text-[#64748B]',
              align === 'center' ? 'max-w-[520px] mx-auto' : 'max-w-lg',
            )}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Children slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
