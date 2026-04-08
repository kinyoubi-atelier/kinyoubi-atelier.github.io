'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Animated counter that counts up when scrolled into view.
 * Handles numeric values with optional suffix (e.g., "7+", "48h", "95+").
 */

interface AnimatedCounterProps {
  value: string
  label: string
  duration?: number
}

function parseValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { num: 0, prefix: '', suffix: value }
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
  }
}

export function AnimatedCounter({ value, label, duration = 1.8 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayNum, setDisplayNum] = useState(0)
  const { num, prefix, suffix } = parseValue(value)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const startTime = performance.now()
    const step = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * num)

      setDisplayNum(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isInView, num, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-heading text-text-primary mb-2">
        {prefix}
        {isInView ? displayNum : 0}
        {suffix}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </motion.div>
  )
}
