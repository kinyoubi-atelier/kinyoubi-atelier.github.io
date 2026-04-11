import type { Metadata } from 'next'
import SecurityContent from './SecurityContent'

export const metadata: Metadata = {
  title: 'Security & data protection — Kinyoubi Atelier & Co.',
  description:
    'How Kinyoubi Atelier & Co. handles GDPR and DPDP alignment, hosting, data at rest and in transit, incident response, sub-processors, DPA availability, and published Core Web Vitals.',
}

export default function SecurityPage() {
  return <SecurityContent />
}
