'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseScrollRevealOptions {
  once?: boolean
  margin?: string
}

export function useScrollReveal(options?: UseScrollRevealOptions) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? '-100px') as any,
  })
  return { ref, isInView }
}
