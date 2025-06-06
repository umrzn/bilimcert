import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  locale?: string
  alternateLanguages?: Record<string, string>
  structuredData?: object
  noIndex?: boolean
  noFollow?: boolean
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface ArticleStructuredData {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  publisher: {
    name: string
    logo: string
  }
}

/**
 * Generate comprehensive metadata for Next.js pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    twitterCard = 'summary_large_image',
    locale = 'kk-KZ',
    alternateLanguages = {},
    noIndex = false,
    noFollow = false
  } = config

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : undefined
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  const metadata: Metadata = {
    title: {
      default: title,
      template: '%s | BilimCert'
    },
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'BilimCert Team' }],
    creator: 'BilimCert',
    publisher: 'BilimCert',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullCanonical,
      languages: {
        'kk-KZ': '/kz',
        'ru-RU': '/ru',
        'en-US': '/en',
        ...alternateLanguages
      },
    },
    openGraph: {
      type: ogType,
      locale,
      url: fullCanonical,
      title,
      description,
      siteName: 'BilimCert',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [fullOgImage],
      creator: '@bilimcert',
      site: '@bilimcert',
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  }

  return metadata
}

/**
 * Generate structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  }
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BilimCert',
    alternateName: 'Білім сапасын бағалау орталығы',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Қазақстан Республикасының білім сапасын бағалау орталығы. Аккредитация, шетелдік білім туралы құжаттарды тану және Болон процесі.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Мәңгілік Ел даңғылы, 8',
      addressLocality: 'Нұр-Сұлтан',
      addressCountry: 'KZ',
      postalCode: '010000'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-7172-123-456',
      contactType: 'customer service',
      availableLanguage: ['Kazakh', 'Russian', 'English']
    },
    sameAs: [
      'https://facebook.com/bilimcert',
      'https://twitter.com/bilimcert',
      'https://linkedin.com/company/bilimcert'
    ]
  }
}

/**
 * Generate structured data for articles/news
 */
export function generateArticleStructuredData(article: ArticleStructuredData) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${article.publisher.logo}`
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image ? `${baseUrl}${article.image}` : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': baseUrl
    }
  }
}

/**
 * Generate structured data for FAQ pages
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * Generate structured data for educational organization
 */
export function generateEducationalOrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'BilimCert',
    alternateName: 'Білім сапасын бағалау орталығы',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Қазақстан Республикасының білім сапасын бағалау орталығы',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Мәңгілік Ел даңғылы, 8',
      addressLocality: 'Нұр-Сұлтан',
      addressCountry: 'KZ',
      postalCode: '010000'
    },
    telephone: '+7-7172-123-456',
    email: 'info@bilimcert.kz',
    foundingDate: '2010',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Accreditation Agency',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Ministry of Education and Science of the Republic of Kazakhstan'
      }
    }
  }
}

/**
 * Generate structured data for services
 */
export function generateServiceStructuredData(services: Array<{
  name: string
  description: string
  provider: string
  areaServed: string
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  
  return services.map(service => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider,
      url: baseUrl
    },
    areaServed: {
      '@type': 'Country',
      name: service.areaServed
    },
    serviceType: 'Educational Assessment'
  }))
}

/**
 * Generate meta tags for social media sharing
 */
export function generateSocialMetaTags(config: SEOConfig) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  const fullOgImage = config.ogImage?.startsWith('http') 
    ? config.ogImage 
    : `${baseUrl}${config.ogImage || '/og-image.jpg'}`

  return [
    // Open Graph
    { property: 'og:type', content: config.ogType || 'website' },
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:image', content: fullOgImage },
    { property: 'og:url', content: config.canonical ? `${baseUrl}${config.canonical}` : baseUrl },
    { property: 'og:site_name', content: 'BilimCert' },
    { property: 'og:locale', content: config.locale || 'kk_KZ' },
    
    // Twitter
    { name: 'twitter:card', content: config.twitterCard || 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: fullOgImage },
    { name: 'twitter:site', content: '@bilimcert' },
    { name: 'twitter:creator', content: '@bilimcert' },
    
    // Additional meta tags
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.keywords?.join(', ') || '' },
    { name: 'author', content: 'BilimCert Team' },
    { name: 'robots', content: `${config.noIndex ? 'noindex' : 'index'}, ${config.noFollow ? 'nofollow' : 'follow'}` }
  ].filter(tag => tag.content) // Remove empty content tags
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Generate hreflang tags for multilingual support
 */
export function generateHreflangTags(currentPath: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bilimcert.kz'
  
  return [
    { rel: 'alternate', hreflang: 'kk-KZ', href: `${baseUrl}/kz${currentPath}` },
    { rel: 'alternate', hreflang: 'ru-RU', href: `${baseUrl}/ru${currentPath}` },
    { rel: 'alternate', hreflang: 'en-US', href: `${baseUrl}/en${currentPath}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}${currentPath}` }
  ]
}
