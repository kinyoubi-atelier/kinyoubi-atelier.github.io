import type { Metadata } from 'next'
import { inter, playfair, notoSerifJP, jetbrainsMono } from './fonts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StructuredData } from './structured-data'
import { UmamiAnalytics, CrispChat } from '@/components/scripts/Analytics'
import { CookieConsent } from '@/components/ui/CookieConsent'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  keywords: ['software development', 'technical consulting', 'web applications', 'regulatory research'],
  authors: [{ name: SITE.founder }],
  creator: SITE.founder,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  metadataBase: new URL(SITE.url),
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        playfair.variable,
        notoSerifJP.variable,
        jetbrainsMono.variable
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className="flex flex-col min-h-screen">
        <a
          href="#main-content"
          className={cn(
            'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
            'focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-white',
            'focus:rounded-lg focus:text-sm'
          )}
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>

        <Footer />

        {/* Third-party scripts — loaded after interactive */}
        <UmamiAnalytics />
        <CrispChat />
        <CookieConsent />
      </body>
    </html>
  )
}
