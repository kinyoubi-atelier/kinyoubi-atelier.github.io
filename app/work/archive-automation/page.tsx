import type { Metadata } from 'next'
import ArchiveAutomationContent from './ArchiveAutomationContent'

export const metadata: Metadata = {
  title: 'Case study: Consumer archive automation — Kinyoubi Atelier & Co.',
  description:
    'A Python automation pipeline that reconciled a 4,000-record consumer database against a flat image archive, normalised 116 fuzzy-duplicate locality names, and rebuilt the archive as a searchable, link-backed index.',
}

export default function ArchiveAutomationPage() {
  return <ArchiveAutomationContent />
}
