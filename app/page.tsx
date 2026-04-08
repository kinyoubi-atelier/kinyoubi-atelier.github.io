import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import HomeContent from './HomeContent'

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    type: 'website',
  },
}

export default function HomePage() {
  return <HomeContent />
}
