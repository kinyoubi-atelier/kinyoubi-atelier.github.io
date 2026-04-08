'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  bordered?: boolean
  hoverable?: boolean
}

export function Card({
  children,
  className,
  bordered = false,
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-card rounded-card p-6 md:p-8 shadow-card',
        bordered ? 'border border-text-primary/10' : '',
        hoverable ? 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300' : '',
        className
      )}
    >
      {children}
    </div>
  )
}
