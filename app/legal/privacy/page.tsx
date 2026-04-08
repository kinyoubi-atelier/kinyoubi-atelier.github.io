import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy — Kinyoubi Atelier & Co.',
  description: 'Privacy policy for Kinyoubi Atelier & Co. website. DPDP Act 2023 compliant.',
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      {children}
    </div>
  )
}

function HighlightLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-gold">{children}</span>
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link href="/legal/terms" className="text-sm text-gold hover:underline mb-6 inline-block">
            ← All legal pages
          </Link>
          <h1 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-tertiary">Last updated: 9 April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <LegalSection title="Introduction">
            <p className="text-text-secondary leading-relaxed">
              Kinyoubi Atelier & Co. is committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information, and is compliant with the Digital Personal Data Protection Act 2023 (DPDP Act 2023) of India.
            </p>
          </LegalSection>

          <LegalSection title="1. Information We Collect">
            <p className="text-text-secondary leading-relaxed">
              <HighlightLabel>Contact Form Data:</HighlightLabel> When you submit the contact form, we collect your name, email address, subject line (optional), and message content. This information is necessary for us to respond to your enquiry.
            </p>
            <p className="text-text-secondary leading-relaxed">
              <HighlightLabel>Website Analytics:</HighlightLabel> We may collect anonymized, aggregated data about your interaction with our website to improve user experience. This data does not identify you personally.
            </p>
          </LegalSection>

          <LegalSection title="2. Purpose of Collection">
            <p className="text-text-secondary leading-relaxed">
              We collect your personal data for the following purposes:
            </p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li>Responding to your enquiries and communication requests</li>
              <li>Improving and enhancing our website functionality and user experience</li>
              <li>Complying with legal and regulatory obligations</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Data Retention">
            <p className="text-text-secondary leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:
            </p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li><HighlightLabel>Contact Form Data:</HighlightLabel> Retained for 24 months from submission, after which it is securely deleted</li>
              <li><HighlightLabel>Analytics Data:</HighlightLabel> Retained for 12 months, after which it is aggregated and anonymized</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Your Rights Under DPDP Act 2023">
            <p className="text-text-secondary leading-relaxed">
              As a Data Principal under the Digital Personal Data Protection Act 2023, you have the following rights:
            </p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li><HighlightLabel>Right to Access:</HighlightLabel> You may request access to the personal data we hold about you</li>
              <li><HighlightLabel>Right to Correction:</HighlightLabel> You may request correction of inaccurate or incomplete personal data</li>
              <li><HighlightLabel>Right to Erasure:</HighlightLabel> You may request deletion of your personal data, subject to legal obligations</li>
              <li><HighlightLabel>Right to Data Portability:</HighlightLabel> You may request a copy of your personal data in a portable format</li>
              <li><HighlightLabel>Right to Withdraw Consent:</HighlightLabel> You may withdraw consent for data processing at any time</li>
              <li><HighlightLabel>Right to Grievance Redressal:</HighlightLabel> You may lodge a complaint regarding our data processing practices</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              To exercise any of these rights, please contact us at{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a>
            </p>
          </LegalSection>

          <LegalSection title="5. Data Sharing">
            <p className="text-text-secondary leading-relaxed">
              We do not sell, trade, or transfer your personal data to third parties. We do not share your contact information with any external parties except as required by law or to fulfill your explicit request.
            </p>
          </LegalSection>

          <LegalSection title="6. Cookies and Tracking">
            <p className="text-text-secondary leading-relaxed">
              Our website uses minimal cookies. We only use essential cookies required for the website to function properly. We do not use tracking cookies, analytics cookies, or marketing cookies by default. All cookies are subject to your consent as required by applicable law.
            </p>
          </LegalSection>

          <LegalSection title="7. Data Security">
            <p className="text-text-secondary leading-relaxed">
              We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </LegalSection>

          <LegalSection title="8. Governing Law">
            <p className="text-text-secondary leading-relaxed">
              This Privacy Policy is governed by the Digital Personal Data Protection Act 2023, the Information Technology Act 2000 (particularly Section 43A), and other applicable laws of India. Any disputes relating to privacy or data protection shall be resolved under the jurisdiction of the competent courts in Koraput District, Odisha, India.
            </p>
          </LegalSection>

          <LegalSection title="9. Contact for Data Concerns">
            <p className="text-text-secondary leading-relaxed">
              If you have any concerns regarding your personal data, privacy practices, or would like to exercise your rights as a Data Principal, please contact us at{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a>.
              We will respond to your request within 30 days or as required by law.
            </p>
          </LegalSection>

          <LegalSection title="10. Changes to This Policy">
            <p className="text-text-secondary leading-relaxed">
              Kinyoubi Atelier & Co. reserves the right to update this Privacy Policy at any time. We will notify you of significant changes by updating the &ldquo;Last updated&rdquo; date at the top of this page.
            </p>
          </LegalSection>

          {/* Navigation */}
          <div className="pt-10 border-t border-text-primary/5 flex flex-wrap gap-6">
            <Link href="/legal/terms" className="text-sm text-gold hover:underline">Terms of Use →</Link>
            <Link href="/legal/copyright" className="text-sm text-gold hover:underline">Copyright Notice →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
