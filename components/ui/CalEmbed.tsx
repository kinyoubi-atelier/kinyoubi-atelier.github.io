'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ExternalLink } from 'lucide-react'

/**
 * Cal.com Scheduling Embed
 *
 * Renders an inline Cal.com booking widget.
 * Set your Cal.com username in .env.local:
 * NEXT_PUBLIC_CAL_USERNAME=your-username
 *
 * Cal.com free tier: unlimited bookings, 1 event type, 1 calendar connection.
 * Sign up at https://cal.com
 */

const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME

interface CalEmbedProps {
  /** Cal.com event type slug (e.g., "30min", "discovery") */
  eventType?: string
  /** Display variant */
  variant?: 'inline' | 'card'
  className?: string
}

export function CalEmbed({ eventType = '30min', variant = 'card', className = '' }: CalEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const calUrl = CAL_USERNAME
    ? `https://cal.com/${CAL_USERNAME}/${eventType}`
    : null

  // If no Cal.com username configured, show a placeholder
  if (!calUrl) {
    return (
      <div className={`bg-background-alt rounded-card p-6 md:p-8 border border-text-primary/5 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Schedule a call</p>
            <p className="text-xs text-text-tertiary">Book a time that works for you</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          We'll discuss your project requirements, timeline, and how we can help. No commitment, no pressure — just a conversation.
        </p>
        <p className="text-xs text-text-tertiary italic">
          Scheduling widget will appear here once configured.
        </p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`relative ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background-alt rounded-card">
            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <Calendar className="h-4 w-4 animate-pulse" />
              Loading scheduler...
            </div>
          </div>
        )}
        <iframe
          src={`${calUrl}?embed=true&theme=light`}
          className="w-full min-h-[600px] border-0 rounded-card"
          onLoad={() => setLoaded(true)}
          title="Schedule a call with Kinyoubi Atelier"
        />
      </div>
    )
  }

  // Card variant — shows a styled card with a link to Cal.com
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`bg-background-alt rounded-card p-6 md:p-8 border border-text-primary/5 hover:border-gold/20 transition-colors ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Prefer to talk live?</p>
          <p className="text-xs text-text-tertiary">Book a 30-minute discovery call</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed mb-5">
        We'll discuss your project, timeline, and approach. No commitment — just a conversation to see if there's a fit.
      </p>
      <a
        href={calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
      >
        Pick a time <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  )
}
