'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Home, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

export default function NotFound() {
  return (
    <section className="min-h-[88vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

      {/* Subtle grid background (same as hero) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid-404" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-404)" />
      </svg>

      <div className="relative z-10 max-w-lg mx-auto">

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-heading text-[8rem] md:text-[10rem] leading-none text-gold/15 select-none mb-0 tabular-nums">
            404
          </p>
        </motion.div>

        {/* Icon + headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
          className="-mt-6 md:-mt-10"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <AlertCircle className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-sm font-medium text-gold uppercase tracking-widest">Page not found</p>
          </div>

          <h1 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
            This path doesn't exist.
          </h1>

          <p className="text-text-secondary text-lg leading-relaxed max-w-sm mx-auto mb-10">
            The page you're looking for was moved, removed, or never existed.
            Let's get you back to solid ground.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/" variant="primary" size="lg">
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Start a conversation
          </Button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xs text-text-tertiary mt-12"
        >
          {SITE.name} · {SITE.url.replace('https://', '')}
        </motion.p>

      </div>
    </section>
  )
}
