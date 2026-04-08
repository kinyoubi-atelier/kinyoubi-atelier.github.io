import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import CapabilitiesContent from './CapabilitiesContent'

export const metadata: Metadata = {
  title: `Capabilities — ${SITE.name}`,
  description: 'Our frameworks for software architecture, development pipelines, regulatory research, and risk management.',
  openGraph: {
    title: `Capabilities — ${SITE.name}`,
    description: 'Frameworks, not formulas. Each engagement adapts these approaches to your specific terrain.',
    url: `${SITE.url}/capabilities`,
    type: 'website',
  },
}

export default function CapabilitiesPage() {
  return <CapabilitiesContent />
}
