'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:   'bg-gradient-to-r from-[#1B4FD8] to-[#06B6D4] text-white shadow-lg shadow-blue-500/30 hover:opacity-90 hover:-translate-y-0.5',
  secondary: 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-purple-500/25 hover:opacity-90 hover:-translate-y-0.5',
  outline:   'border-2 border-[#1B4FD8] text-[#1B4FD8] hover:bg-[#1B4FD8] hover:text-white',
  ghost:     'text-[#64748B] hover:text-[#0A1628] hover:bg-slate-100',
  white:     'bg-white text-[#1B4FD8] shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'transition-all duration-200 cursor-pointer select-none',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B4FD8] focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      )}
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
