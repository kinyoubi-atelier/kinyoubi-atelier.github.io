import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact — Kinyoubi Atelier & Co.',
  description: 'Get in touch with Kinyoubi Atelier & Co. We respond within 48 hours.',
}

export default function ContactPage() {
  return <ContactContent />
}
