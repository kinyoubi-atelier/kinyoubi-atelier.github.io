import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: `Services — ${SITE.name}`,
  description: 'Software development, technical consulting, AI workflow development, and regulatory research services.',
  openGraph: {
    title: `Services — ${SITE.name}`,
    description: 'Software, consulting, and research — delivered with engineering precision.',
    url: `${SITE.url}/services`,
    type: 'website',
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
