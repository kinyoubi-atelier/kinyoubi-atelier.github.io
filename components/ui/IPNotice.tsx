'use client'

import { cn } from '@/lib/utils'

interface IPNoticeProps {
  className?: string
}

export function IPNotice({ className }: IPNoticeProps) {
  return (
    <p className={cn(
      'text-xs text-text-tertiary mt-4 text-center',
      className
    )}>
      Proprietary framework. © 2026 Kinyoubi Atelier & Co. Viewing permitted. Reproduction prohibited.
    </p>
  )
}
