'use client'

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'destructive'
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
}

const base =
  'inline-flex items-center justify-center font-semibold tracking-[-0.01em] ' +
  'transition-all duration-200 cursor-pointer select-none ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB] focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:!translate-y-0 disabled:!shadow-none ' +
  'active:scale-[.98]'

/** Shared button styling — use for links that should look like buttons. */
export function buttonClasses({ variant = 'primary', size = 'md', className }: {
  variant?: Variant; size?: Size; className?: string
} = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[#2563EB] text-white ' +
    'shadow-[0_1px_2px_rgba(0,0,0,.08),0_3px_12px_rgba(37,99,235,.32)] ' +
    'hover:bg-[#1D4ED8] hover:shadow-[0_2px_6px_rgba(0,0,0,.1),0_8px_24px_rgba(37,99,235,.45)] ' +
    'hover:-translate-y-[3px] active:translate-y-0 active:shadow-[0_1px_2px_rgba(0,0,0,.08)]',
  secondary:
    'bg-[#0A0F1C] text-white ' +
    'shadow-[0_1px_2px_rgba(0,0,0,.12),0_3px_10px_rgba(0,0,0,.2)] ' +
    'hover:bg-[#162032] hover:shadow-[0_2px_6px_rgba(0,0,0,.16),0_8px_22px_rgba(0,0,0,.24)] ' +
    'hover:-translate-y-[3px] active:translate-y-0',
  outline:
    'border border-[#E2E8F0] text-[#0F172A] bg-white ' +
    'shadow-[0_1px_2px_rgba(0,0,0,.04),0_2px_6px_rgba(0,0,0,.04)] ' +
    'hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:shadow-[0_2px_8px_rgba(0,0,0,.07)] hover:-translate-y-[2px]',
  ghost:
    'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] hover:-translate-y-[1px]',
  white:
    'bg-white text-[#1D4ED8] font-bold ' +
    'shadow-[0_2px_8px_rgba(0,0,0,.1),0_1px_2px_rgba(0,0,0,.06)] ' +
    'hover:bg-[#F8FAFC] hover:shadow-[0_4px_20px_rgba(0,0,0,.14)] ' +
    'hover:-translate-y-[3px] active:translate-y-0',
  destructive:
    'bg-[#EF4444] text-white ' +
    'shadow-[0_1px_2px_rgba(0,0,0,.08),0_2px_8px_rgba(239,68,68,.25)] ' +
    'hover:bg-[#DC2626] hover:shadow-[0_3px_10px_rgba(239,68,68,.4)] hover:-translate-y-[2px]',
}

const sizes: Record<Size, string> = {
  xs: 'px-3.5 py-1.5 text-[0.75rem] gap-1.5 rounded-[8px]',
  sm: 'px-4.5 py-2.5 text-[0.8125rem] gap-2 rounded-[10px]',
  md: 'px-5 py-2.5 text-[0.875rem] gap-2 rounded-[12px]',
  lg: 'px-6 py-3 text-[0.9375rem] gap-2.5 rounded-[12px]',
  xl: 'px-7 py-3.5 text-[0.9375rem] gap-2.5 rounded-[13px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, iconRight, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </button>
  ),
)

Button.displayName = 'Button'

/* ── ButtonLink ───────────────────────────────────
   Renders a Next <Link> that looks like a Button.
   Use instead of <Link><Button/></Link> so we never
   nest a <button> inside an <a> (invalid HTML). */
interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  size?: Size
  icon?: React.ReactNode
  iconRight?: React.ReactNode
}

export function ButtonLink({
  href, variant = 'primary', size = 'md', icon, iconRight, className, children, ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </Link>
  )
}
