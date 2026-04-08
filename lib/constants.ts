export const SITE = {
  name: 'Kinyoubi Atelier & Co.',
  tagline: 'Software that ships. Complexity, handled.',
  description: 'Software development, technical consulting, and regulatory research — delivered with precision and speed.',
  url: 'https://kinyoubi.com',
  email: 'kinyoubi.atelier@outlook.com',
  location: 'Jeypore, Odisha, India',
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
  { label: 'Copyright', href: '/legal/copyright' },
] as const
