import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  highlight?: string
  titleAfter?: string
  subtitle?: string
  center?: boolean
  dark?: boolean
  large?: boolean
  className?: string
}

export function SectionHeader({
  label, title, highlight, titleAfter, subtitle, center, dark, large, className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center && 'flex flex-col items-center', className)}>
      {label && (
        <div className={cn('pill mb-6', dark && 'pill-dark', center && 'text-center')}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-70" aria-hidden />
          {label}
        </div>
      )}
      <h2
        className={cn(
          'font-extrabold',
          large ? 'display-xl' : 'display-lg',
          dark ? 'text-white' : 'text-[#0A0F1C]',
          center && 'text-center',
        )}
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-grad">{highlight}</span>
          </>
        )}
        {titleAfter && <> {titleAfter}</>}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-6 text-[1.125rem] leading-[1.82]',
            center ? 'text-center max-w-2xl mx-auto' : 'max-w-xl',
            dark ? 'text-slate-400' : 'text-[#64748B]',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
