'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  showDivider?: boolean
  id?: string
  dark?: boolean
}

export function Section({
  children,
  className,
  title,
  subtitle,
  showDivider = false,
  id,
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-28 px-6 md:px-12',
        dark ? 'bg-surface-dark text-text-on-dark' : '',
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <div className="mb-12">
            <h2 className={cn(
              'text-display-sm md:text-display font-heading tracking-tight',
              dark ? 'text-text-on-dark' : 'text-text-primary'
            )}>
              {title}
            </h2>
            {subtitle && (
              <p className={cn(
                'mt-4 text-lg max-w-2xl',
                dark ? 'text-text-on-dark/70' : 'text-text-secondary'
              )}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
