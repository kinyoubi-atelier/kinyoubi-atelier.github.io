'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

/**
 * Testimonials Section (Hidden / Ready to Activate)
 *
 * This component is ready to drop into the homepage once you have
 * 2-3 client testimonials. Just uncomment it in HomeContent.tsx
 * and populate the data below.
 *
 * Set SHOW_TESTIMONIALS=true to make it visible, or just import
 * and render it directly.
 */

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

// ─── Replace with real testimonials when ready ───
const testimonials: Testimonial[] = [
  // {
  //   quote: 'Placeholder — replace with a real testimonial.',
  //   name: 'Client Name',
  //   role: 'CTO',
  //   company: 'Company Name',
  // },
]

export function Testimonials() {
  // Don't render if no testimonials
  if (testimonials.length === 0) return null

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">What clients say</p>
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight">
            Built on trust
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-surface-card border border-text-primary/5 rounded-card p-6 md:p-8"
            >
              <Quote className="h-5 w-5 text-gold/40 mb-4" />
              <p className="text-text-primary leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-tertiary">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
