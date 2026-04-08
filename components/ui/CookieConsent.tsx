'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/**
 * DPDP Act 2023 Compliant Cookie Consent Banner
 *
 * Lightweight, zero-dependency cookie consent.
 * Stores consent in a cookie (not localStorage) so it persists.
 * Defaults to "necessary only" — no tracking until accepted.
 */

const CONSENT_COOKIE = 'kinyoubi_cookie_consent'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show banner only if consent hasn't been given
    const consent = getCookie(CONSENT_COOKIE)
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = (level: 'all' | 'necessary') => {
    setCookie(CONSENT_COOKIE, level, 365)
    setVisible(false)

    // If full consent, fire analytics event
    if (level === 'all' && typeof window !== 'undefined') {
      // Umami respects the consent — it only tracks after this
      window.dispatchEvent(new CustomEvent('cookie-consent', { detail: level }))
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-surface-card border border-text-primary/10 rounded-xl shadow-card-hover p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-text-primary font-medium mb-1">
                  We respect your privacy
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  We use essential cookies for site functionality and optional analytics to improve your experience.
                  Your data is processed in accordance with the{' '}
                  <Link href="/legal/privacy" className="text-gold hover:underline">
                    DPDP Act 2023
                  </Link>
                  .
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => accept('necessary')}
                  className="text-xs font-medium text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg border border-text-primary/10 hover:border-text-primary/20 transition-colors"
                >
                  Necessary only
                </button>
                <button
                  onClick={() => accept('all')}
                  className="text-xs font-medium text-white bg-gold hover:bg-gold/90 px-4 py-2 rounded-lg transition-colors"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
