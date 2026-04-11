import type { Metadata } from 'next'
import BfsiMisContent from './BfsiMisContent'

export const metadata: Metadata = {
  title: 'Case study: Compliance-first MIS platform for a regulated Indian financial institution — Kinyoubi Atelier & Co.',
  description:
    'How Kinyoubi Atelier & Co. designed the secure data foundation, offline-first capture layer, and AI-assisted insight engine for a multi-site Management Information System — engineered from day one for RBI alignment and DPDP Act readiness.',
}

export default function BfsiMisPage() {
  return <BfsiMisContent />
}
