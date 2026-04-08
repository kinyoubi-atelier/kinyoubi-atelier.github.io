'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CalEmbed } from '@/components/ui/CalEmbed'
import { SITE } from '@/lib/constants'

/**
 * Contact Page — Smart Form + Cal.com Scheduling
 *
 * Form integration options:
 * 1. Formspree (recommended): Set NEXT_PUBLIC_FORMSPREE_ID in .env.local
 *    Sign up at https://formspree.io — 50 submissions/month free
 * 2. Web3Forms: Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local
 *    Sign up at https://web3forms.com — 250 submissions/month free
 * 3. Fallback: Shows success state without backend (current behavior)
 *
 * Data collection (runs in parallel, independent of form backend):
 * - Google Sheets: Set NEXT_PUBLIC_GOOGLE_SHEETS_URL in .env.local
 *   See GOOGLE-SHEETS-SETUP.md for Apps Script webhook setup
 */

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

type ProjectType = '' | 'software' | 'consulting' | 'ai-workflow' | 'research' | 'other'

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projectType, setProjectType] = useState<ProjectType>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      // ─── Form Backend (picks the first configured one) ───
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error('Failed to submit')
      } else if (WEB3FORMS_KEY) {
        formData.append('access_key', WEB3FORMS_KEY)
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        })
        if (!res.ok) throw new Error('Failed to submit')
      } else {
        // Fallback: simulate submission
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // ─── Google Sheets logging (fire-and-forget, never blocks UX) ───
      if (GOOGLE_SHEETS_URL) {
        const sheetData: Record<string, string> = {}
        formData.forEach((value, key) => {
          if (key !== 'access_key') sheetData[key] = value.toString()
        })
        fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetData),
        }).catch(() => {
          // Silent fail — sheet logging is best-effort
        })
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        form.reset()
        setProjectType('')
      }, 4000)
    } catch {
      setError('Something went wrong. Please email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyles = 'bg-surface-card border border-text-primary/10 rounded-lg px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors w-full'
  const selectStyles = `${inputStyles} appearance-none cursor-pointer`

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Contact</p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 tracking-tight">
              Start a conversation
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              Tell us about your project. We'll tell you how we'd approach it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Sidebar */}
      <section className="pb-24 md:pb-36 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={inputStyles}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={inputStyles}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Project Type — conditional field trigger */}
                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-text-primary mb-2">
                    What do you need help with?
                  </label>
                  <select
                    id="project-type"
                    name="project_type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className={selectStyles}
                  >
                    <option value="">Select a service area</option>
                    <option value="software">Software Development</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="ai-workflow">AI-Powered Workflow</option>
                    <option value="research">Regulatory Research / Contract Analysis</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                {/* Conditional: Budget range for software projects */}
                {(projectType === 'software' || projectType === 'ai-workflow') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="budget" className="block text-sm font-medium text-text-primary mb-2">
                      Approximate budget range
                    </label>
                    <select id="budget" name="budget" className={selectStyles}>
                      <option value="">Prefer not to say</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-25k">$10,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                    </select>
                  </motion.div>
                )}

                {/* Conditional: Timeline for consulting */}
                {projectType === 'consulting' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="timeline" className="block text-sm font-medium text-text-primary mb-2">
                      When do you need this?
                    </label>
                    <select id="timeline" name="timeline" className={selectStyles}>
                      <option value="">No rush</option>
                      <option value="asap">As soon as possible</option>
                      <option value="2-weeks">Within 2 weeks</option>
                      <option value="1-month">Within a month</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </motion.div>
                )}

                {/* Conditional: Jurisdiction for research */}
                {projectType === 'research' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="jurisdiction" className="block text-sm font-medium text-text-primary mb-2">
                      Primary jurisdiction
                    </label>
                    <input
                      type="text"
                      id="jurisdiction"
                      name="jurisdiction"
                      className={inputStyles}
                      placeholder="e.g., India, United States, EU"
                    />
                  </motion.div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={`${inputStyles} resize-none`}
                    placeholder="What are you building? What problem are you solving? Any constraints we should know about?"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </Button>
                </div>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-success/10 border border-success/30 rounded-lg"
                  >
                    <p className="text-sm text-success">
                      Message received. We'll be in touch within 48 hours.
                    </p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-error/10 border border-error/30 rounded-lg"
                  >
                    <p className="text-sm text-error">
                      {error} —{' '}
                      <a href={`mailto:${SITE.email}`} className="underline">
                        {SITE.email}
                      </a>
                    </p>
                  </motion.div>
                )}

                <p className="text-xs text-text-tertiary leading-relaxed pt-4 border-t border-text-primary/5">
                  By submitting this form, you consent to the collection and processing of your personal data in accordance with our Privacy Policy and the Digital Personal Data Protection Act 2023. Your data will be retained for 24 months and used solely to respond to your enquiry.
                </p>
              </form>
            </motion.div>

            {/* Right sidebar: Contact info + Cal.com */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact details */}
              <div>
                <p className="text-sm font-medium text-gold uppercase tracking-widest mb-6">
                  Reach us
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-text-tertiary mb-1">Email</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-lg text-text-primary hover:text-gold transition-colors"
                    >
                      {SITE.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-text-tertiary mb-1">Location</p>
                    <p className="text-lg text-text-primary">{SITE.location}</p>
                  </div>
                </div>
              </div>

              {/* Response note */}
              <div className="p-5 bg-background-alt border border-text-primary/5 rounded-card">
                <p className="text-sm text-text-secondary leading-relaxed">
                  <span className="font-semibold text-gold">Async-first.</span>{' '}
                  We typically respond within 48 hours.
                </p>
              </div>

              {/* Cal.com scheduling embed */}
              <CalEmbed variant="card" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
