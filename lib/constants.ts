export const SITE = {
  name: 'Kinyoubi Atelier & Co.',
  tagline: 'Software that ships. Complexity, handled.',
  description: 'Software development, technical consulting, and regulatory research — delivered with precision and speed.',
  url: 'https://kinyoubi-atelier.github.io',
  email: 'kinyoubi.atelier@outlook.com',
  // Public-facing location string. Used in the footer and About panel.
  // The full registered address (Jeypore, Koraput District, Odisha, India)
  // is disclosed on the Contact page and in legal/copyright — kept off
  // every other surface because enterprise buyers scan for jurisdiction
  // and "Remote-first" signals delivery posture more accurately than
  // a pin on a specific town.
  location: 'Remote-first · Serving North America & EMEA',
  founder: 'Ankit Sahu',
  copyright: `© ${new Date().getFullYear()} Kinyoubi Atelier & Co. All rights reserved.`,
} as const

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Contact', href: '/contact' },
] as const

export const LEGAL_LINKS = [
  { label: 'Terms of Use', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Security', href: '/security' },
  { label: 'Copyright', href: '/legal/copyright' },
] as const
