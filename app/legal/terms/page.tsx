import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Use — Kinyoubi Atelier & Co.',
  description: 'Terms of use for Kinyoubi Atelier & Co. website and services.',
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      {children}
    </div>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link href="/legal/privacy" className="text-sm text-gold hover:underline mb-6 inline-block">
            ← All legal pages
          </Link>
          <h1 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-3">
            Terms of Use
          </h1>
          <p className="text-sm text-text-tertiary">Last updated: 9 April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <LegalSection title="1. Acceptance of Terms">
            <p className="text-text-secondary leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </LegalSection>

          <LegalSection title="2. Intellectual Property">
            <p className="text-text-secondary leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, code, diagrams, design systems, frameworks, and methodologies, is the proprietary intellectual property of Kinyoubi Atelier & Co. All content is protected under the Copyright Act 1957 of India and international copyright conventions.
            </p>
            <p className="text-text-secondary leading-relaxed">
              The design, layout, arrangement of content, and any other original works of authorship contained herein are protected intellectual property. Kinyoubi Atelier & Co. retains all rights, title, and interest in all such content.
            </p>
          </LegalSection>

          <LegalSection title="3. Prohibited Uses">
            <p className="text-text-secondary leading-relaxed">
              You may not, without the prior written consent of Kinyoubi Atelier & Co.:
            </p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li>Reproduce, distribute, or transmit any content from this website</li>
              <li>Modify, adapt, translate, or create derivative works from any content</li>
              <li>Publicly display or perform any content without authorization</li>
              <li>Use any content to train, fine-tune, or otherwise inform machine learning models</li>
              <li>Engage in automated scraping, crawling, or harvesting of content</li>
              <li>Use content for any commercial purpose without written permission</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Limitation of Liability">
            <p className="text-text-secondary leading-relaxed">
              The information, content, and materials provided on this website are provided on an &ldquo;as is&rdquo; basis without warranties of any kind, express or implied. Kinyoubi Atelier & Co. makes no representations regarding the accuracy, completeness, or reliability of any content.
            </p>
            <p className="text-text-secondary leading-relaxed">
              The content on this website is not professional legal, financial, or investment advice. Any reliance you place on such information is strictly at your own risk. We recommend consulting with qualified professionals before making any significant decisions based on information from this website.
            </p>
          </LegalSection>

          <LegalSection title="5. Governing Law and Jurisdiction">
            <p className="text-text-secondary leading-relaxed">
              These terms of use shall be governed by and construed in accordance with the laws of India, without regard to its conflicts of law principles. Any legal action or proceeding relating to your access to or use of this website shall be brought exclusively in the competent courts of Koraput District, Odisha, India, and you irrevocably consent to the jurisdiction of such courts.
            </p>
          </LegalSection>

          <LegalSection title="6. Changes to Terms">
            <p className="text-text-secondary leading-relaxed">
              Kinyoubi Atelier & Co. reserves the right to modify these terms of use at any time without prior notice. Your continued use of the website following the posting of revised terms means that you accept and agree to the changes.
            </p>
          </LegalSection>

          <LegalSection title="7. Contact Information">
            <p className="text-text-secondary leading-relaxed">
              For questions about these terms of use, please contact us at{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
                {SITE.email}
              </a>
            </p>
          </LegalSection>

          {/* Navigation to other legal pages */}
          <div className="pt-10 border-t border-text-primary/5 flex flex-wrap gap-6">
            <Link href="/legal/privacy" className="text-sm text-gold hover:underline">Privacy Policy →</Link>
            <Link href="/legal/copyright" className="text-sm text-gold hover:underline">Copyright Notice →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
