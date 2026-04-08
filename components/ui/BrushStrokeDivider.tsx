'use client'

import { cn } from '@/lib/utils'

const variants = [
  '/brushstrokes/brush-stroke-1.svg',
  '/brushstrokes/brush-stroke-2.svg',
  '/brushstrokes/brush-stroke-3.svg',
]

interface BrushStrokeDividerProps {
  className?: string
  variant?: 0 | 1 | 2
  opacity?: number
  width?: string  // Tailwind width class like 'w-3/5'
}

export function BrushStrokeDivider({
  className,
  variant,
  opacity = 0.85,
  width = 'w-3/5 md:w-2/5',
}: BrushStrokeDividerProps) {
  // Use deterministic variant based on position if not specified
  const index = variant ?? Math.floor(Math.random() * 3)

  return (
    <div className={cn('flex justify-center py-8', className)} role="separator" aria-hidden="true">
      <img
        src={variants[index]}
        alt=""
        className={cn('h-auto', width)}
        style={{ opacity }}
        loading="lazy"
      />
    </div>
  )
}
