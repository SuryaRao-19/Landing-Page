import { cn } from '@/lib/utils'

interface CardProps { children: React.ReactNode; className?: string; variant?: 'default' | 'flat' | 'glass' | 'dark' | 'bordered' }

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div className={cn(
      'rounded-[20px]',
      variant === 'default'  && 'bg-white border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,.06),0_1px_3px_rgba(0,0,0,.04)]',
      variant === 'flat'     && 'bg-[#F8FAFC] border border-[#E2E8F0]',
      variant === 'glass'    && 'bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,.06)]',
      variant === 'dark'     && 'bg-[#0A0F1C] border border-white/8',
      variant === 'bordered' && 'bg-white border-2 border-[#E2E8F0]',
      className,
    )}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6 sm:p-8', className)}>{children}</div>
}

export function HoverCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      'bg-white border border-[#E2E8F0] rounded-[20px]',
      'shadow-[0_2px_8px_rgba(0,0,0,.06),0_1px_3px_rgba(0,0,0,.04)]',
      'transition-all duration-300 ease-out',
      'hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,.10),0_4px_12px_rgba(0,0,0,.05)] hover:border-[#CBD5E1]',
      className,
    )}>
      {children}
    </div>
  )
}
