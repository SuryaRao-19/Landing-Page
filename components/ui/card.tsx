import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export function Card({ children, className, hover, glass }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-100',
        glass
          ? 'bg-white/70 backdrop-blur-xl border-white/40'
          : 'bg-white',
        hover && [
          'transition-all duration-300 cursor-pointer',
          'hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 hover:border-blue-100',
        ],
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6', className)}>{children}</div>
}
