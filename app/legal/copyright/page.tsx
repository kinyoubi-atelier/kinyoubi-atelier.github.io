import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Copyright — Kinyoubi Atelier & Co.',
  description: 'Copyright notice and intellectual property information for Kinyoubi Atelier & Co.',
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

export default function CopyrightPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link href="/legal/terms" className="text-sm text-gold hover:underline mb-6 inline-block">
            ← All legal pages
          </Link>
          <h1 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-3">
            Copyright Notice
          </h1>
          <p className="text-sm text-text-tertiary">Last updated: 9 April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Declaration */}
          <div className="space-y-4">
            <p className="font-heading text-xl text-text-primary">
              © 2026 Kinyoubi Atelier & Co. All rights reserved.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Kinyoubi Atelier & Co. is a sole proprietorship owned by Ankit Sahu, located in Jeypore, Koraput District, Odisha, India.
            </p>
          </div>

          <LegalSection title="1. Proprietary Intellectual Property">
            <p className="text-text-secondary leading-relaxed">
              All content contained on this website and associated services, including but not limited to the following, is the exclusive proprietary intellectual property of Kinyoubi Atelier & Co.:
            </p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li>Written text, articles, and documentation</li>
              <li>Graphics, illustrations, photographs, and visual designs</li>
              <li>Logos, trademarks, and brand identity materials (including the design mark)</li>
              <li>Computer code, scripts, and software</li>
              <li>Diagrams, flowcharts, system architectures, and visual frameworks</li>
              <li>Design systems, design patterns, and component libraries</li>
              <li>Methodologies, frameworks, processes, and analytical tools</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              All such content is protected under the Copyright Act 1957 of India and international copyright treaties and conventions.
            </p>
          </LegalSection>

          <LegalSection title="2. Machine Learning and AI Model Training">
            <div className="p-4 rounded-card bg-background-alt border border-gold/10">
              <p className="text-text-secondary leading-relaxed">
                <HighlightLabel>Prohibition on ML/AI Use:</HighlightLabel> No part of this website, its content, code, designs, systems, frameworks, or methodologies may be used to train, fine-tune, or otherwise inform any machine learning models, artificial intelligence systems, large language models, neural networks, or similar computational systems without the prior written consent of Kinyoubi Atelier & Co.
              </p>
            </div>
            <p className="text-text-secondary leading-relaxed">This includes but is not limited to:</p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li>Feeding content to generative AI systems or language models</li>
              <li>Using content as training data for custom models or fine-tuning</li>
              <li>Extracting or harvesting content for machine learning purposes</li>
              <li>Using designs or systems as reference material for AI model development</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Restrictions on Use">
            <p className="text-text-secondary leading-relaxed">
              Without the prior written permission of Kinyoubi Atelier & Co., you may not:
            </p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li>Reproduce, copy, or duplicate any content in whole or in part</li>
              <li>Distribute, publish, or transmit any content to third parties</li>
              <li>Modify, adapt, translate, or create derivative works based on any content</li>
              <li>Publicly display, perform, or broadcast any content</li>
              <li>Use content for any commercial purpose or commercial benefit</li>
              <li>Remove, obscure, or alter any proprietary notices or copyright markings</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Limited License">
            <p className="text-text-secondary leading-relaxed">
              You are granted a limited, non-exclusive, non-transferable, revocable license to view the content on this website for personal, non-commercial purposes only.
            </p>
          </LegalSection>

          <LegalSection title="5. Trademarks and Branding">
            <p className="text-text-secondary leading-relaxed">
              The Kinyoubi Atelier & Co. name, design mark, and all associated marks and designs are trademarks and service marks of Kinyoubi Atelier & Co. You may not use these marks without express written permission. All goodwill associated with such marks is the exclusive property of Kinyoubi Atelier & Co.
            </p>
          </LegalSection>

          <LegalSection title="6. Infringement Complaint Procedure">
            <p className="text-text-secondary leading-relaxed">
              If you believe that any content on this website infringes upon intellectual property rights, or if you have identified unauthorized use of our intellectual property, please contact us at{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a> with a description of the allegedly infringing content, its location, and your contact information.
            </p>
          </LegalSection>

          <LegalSection title="7. Legal References">
            <p className="text-text-secondary leading-relaxed">This copyright notice is issued under the authority of:</p>
            <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
              <li><HighlightLabel>Copyright Act 1957</HighlightLabel> of India</li>
              <li><HighlightLabel>Information Technology Act 2000,</HighlightLabel> particularly Section 79 (Safe Harbor Provision)</li>
              <li>Applicable international copyright conventions and treaties</li>
            </ul>
          </LegalSection>

          <LegalSection title="8. Jurisdiction">
            <p className="text-text-secondary leading-relaxed">
              Any disputes, claims, or proceedings relating to intellectual property rights, copyright infringement, or this copyright notice shall be governed by the laws of India and shall be exclusively resolved in the competent courts of Koraput District, Odisha, India.
            </p>
          </LegalSection>

          {/* Footer */}
          <div className="pt-10 border-t border-text-primary/5">
            <p className="text-sm text-text-tertiary italic mb-6">
              For licensing inquiries, permissions, or authorized use of Kinyoubi Atelier & Co. intellectual property, please contact{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a>
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/legal/terms" className="text-sm text-gold hover:underline">Terms of Use →</Link>
              <Link href="/legal/privacy" className="text-sm text-gold hover:underline">Privacy Policy →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
