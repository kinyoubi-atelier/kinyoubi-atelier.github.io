import { SITE } from '@/lib/constants'

/**
 * JSON-LD Structured Data for SEO
 * Renders Organization, ProfessionalService, and WebSite schemas
 */

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logos/logo-transparent.svg`,
  description: SITE.description,
  founder: {
    '@type': 'Person',
    name: SITE.founder,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jeypore',
    addressRegion: 'Odisha',
    addressCountry: 'IN',
  },
  email: SITE.email,
  sameAs: [],
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jeypore',
    addressRegion: 'Odisha',
    addressCountry: 'IN',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Software Development',
          description: 'Web applications, backend systems, APIs, and automation workflows built with modern stacks.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Technical Consulting',
          description: 'Architecture reviews, system design, and hands-on implementation support.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Powered Workflow Development',
          description: 'Multi-agent orchestration systems, document processing pipelines, and AI-assisted workflows.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Regulatory Research & Contract Analysis',
          description: 'Compliance navigation, contract analysis, and research workflows.',
        },
      },
    ],
  },
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: {
    '@type': 'Organization',
    name: SITE.name,
  },
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  )
}
