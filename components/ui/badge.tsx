import { cn } from '@/lib/utils'

interface BadgeProps { children: React.ReactNode; className?: string; variant?: 'blue' | 'dark' | 'teal' | 'violet' | 'neutral' }

export function Badge({ children, className, variant = 'blue' }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-semibold text-[11px] tracking-wide uppercase px-3 py-1',
      variant === 'blue'    && 'bg-blue-50 text-blue-700 border border-blue-100',
      variant === 'dark'    && 'bg-white/8 text-white/80 border border-white/12',
      variant === 'teal'    && 'bg-teal-50 text-teal-700 border border-teal-100',
      variant === 'violet'  && 'bg-violet-50 text-violet-700 border border-violet-100',
      variant === 'neutral' && 'bg-slate-100 text-slate-600 border border-slate-200',
      className,
    )}>
      {children}
    </span>
  )
}

export function SectionLabel({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={cn('pill mb-5 w-fit', dark && 'pill-dark', className)}>
      {children}
    </div>
  )
}
