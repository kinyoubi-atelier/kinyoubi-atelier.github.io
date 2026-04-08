import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About — Kinyoubi Atelier & Co.',
  description: 'How we think about building software. The philosophy and multidisciplinary edge of Kinyoubi Atelier & Co.',
}

export default function AboutPage() {
  return <AboutContent />
}
