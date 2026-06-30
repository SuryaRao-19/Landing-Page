import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/ui/badge'

interface SectionHeaderProps {
  label?: string
  title: string
  highlight?: string
  subtitle?: string
  center?: boolean
  dark?: boolean
  className?: string
}

export function SectionHeader({
  label, title, highlight, subtitle, center, dark, className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center && 'text-center', className)}>
      {label && (
        <SectionLabel className={cn('mb-4', dark && 'bg-white/10 text-blue-200 border-white/20')}>
          {label}
        </SectionLabel>
      )}
      <h2
        className={cn(
          'font-extrabold leading-tight tracking-tight',
          'text-3xl sm:text-4xl lg:text-5xl',
          dark ? 'text-white' : 'text-slate-900',
        )}
      >
        {title}{' '}
        {highlight && (
          <span className={cn(dark ? 'text-cyan-400' : 'text-grad')}>
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed max-w-2xl',
            center && 'mx-auto',
            dark ? 'text-slate-300' : 'text-slate-500',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
