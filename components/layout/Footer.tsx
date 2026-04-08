import Link from 'next/link'
import { SITE, NAV_LINKS, LEGAL_LINKS } from '@/lib/constants'
import { BrandLockup } from '@/components/ui/BrandLockup'

export function Footer() {
  return (
    <footer className="bg-surface-dark text-text-on-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <BrandLockup variant="dark" size="lg" className="items-start" />
            <p className="text-sm text-text-on-dark/70 max-w-xs leading-relaxed">
              {SITE.tagline}
            </p>
            <address className="text-sm not-italic text-text-on-dark/60">
              {SITE.location}
            </address>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-on-dark/40 mb-4">
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-on-dark/80 hover:text-gold-bright transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal & Contact */}
          <div className="flex flex-col gap-6">
            <nav aria-label="Legal links">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-on-dark/40 mb-4">
                Legal
              </h4>
              <ul className="flex flex-col gap-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-on-dark/80 hover:text-gold-bright transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-text-on-dark/80 hover:text-gold-bright transition-colors"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-text-on-dark/10 px-6 md:px-12 py-6">
        <p className="text-center text-xs text-text-on-dark/50">
          {SITE.copyright}
        </p>
      </div>
    </footer>
  )
}
