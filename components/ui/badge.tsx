import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'subtle'
}

export function Badge({ children, className, variant = 'subtle' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full text-xs font-700 tracking-wide',
        variant === 'subtle'  && 'bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1',
        variant === 'outline' && 'border border-current px-3 py-1',
        variant === 'default' && 'bg-blue-600 text-white px-3 py-1',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest',
      'bg-blue-50 text-blue-700 border border-blue-100',
      className,
    )}>
      {children}
    </div>
  )
}
