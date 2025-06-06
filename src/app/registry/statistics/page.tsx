'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const statisticsReportsData = [
  {
    id: 1,
    title: '2024 жылғы реестр статистикасы - жылдық есеп',
    excerpt: 'Білім беру бағдарламаларының реестрі бойынша 2024 жылғы толық статистикалық есеп және талдау',
    content: 'Толық мәтін...',
    image: '/images/registry/annual-report-2024.jpg',
    category: {
      id: 1,
      name: 'Жылдық есептер',
      slug: 'annual-reports',
      color: 'bg-blue-500'
    },
    tags: ['жылдық есеп', '2024', 'статистика'],
    slug: 'registry-annual-report-2024',
    publishedAt: '2024-01-25',
    featured: true,
    viewsCount: 3250,
    author: 'BilimCert'
  },
  {
    id: 2,
    title: 'Реестрдегі білім беру бағдарламаларының санақ статистикасы',
    excerpt: 'Реестрде тіркелген білім беру бағдарламаларының саны, түрлері және олардың үлестірімі',
    content: 'Толық мәтін...',
    image: '/images/registry/program-count-statistics.jpg',
    category: {
      id: 2,
      name: 'Санақ статистикасы',
      slug: 'count-statistics',
      color: 'bg-green-500'
    },
    tags: ['санақ', 'бағдарламалар', 'статистика'],
    slug: 'educational-programs-count-statistics',
    publishedAt: '2024-01-20',
    featured: true,
    viewsCount: 2890,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'Аймақтар бойынша реестр деректерінің талдауы',
    excerpt: 'Қазақстанның әр аймағы бойынша білім беру бағдарламаларының үлестірімі мен сипаттамасы',
    content: 'Толық мәтін...',
    image: '/images/registry/regional-analysis.jpg',
    category: {
      id: 3,
      name: 'Аймақтық талдау',
      slug: 'regional-analysis',
      color: 'bg-purple-500'
    },
    tags: ['аймақтар', 'талдау', 'үлестірім'],
    slug: 'regional-registry-data-analysis',
    publishedAt: '2023-12-15',
    featured: false,
    viewsCount: 2150,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'Білім беру деңгейлері бойынша статистика',
    excerpt: 'Бакалавриат, магистратура және докторантура деңгейлеріндегі бағдарламалардың статистикасы',
    content: 'Толық мәтін...',
    image: '/images/registry/education-levels-statistics.jpg',
    category: {
      id: 4,
      name: 'Деңгей статистикасы',
      slug: 'level-statistics',
      color: 'bg-orange-500'
    },
    tags: ['деңгейлер', 'бакалавриат', 'магистратура'],
    slug: 'education-levels-statistics',
    publishedAt: '2023-11-30',
    featured: false,
    viewsCount: 1980,
    author: 'BilimCert'
  },
  {
    id: 5,
    title: 'Реестр жүйесінің пайдаланушы белсенділігі есебі',
    excerpt: 'Реестр жүйесін пайдаланушылардың белсенділігі, кіру статистикасы және пайдалану үрдістері',
    content: 'Толық мәтін...',
    image: '/images/registry/user-activity-report.jpg',
    category: {
      id: 5,
      name: 'Пайдаланушы белсенділігі',
      slug: 'user-activity',
      color: 'bg-red-500'
    },
    tags: ['пайдаланушылар', 'белсенділік', 'статистика'],
    slug: 'registry-user-activity-report',
    publishedAt: '2023-10-25',
    featured: false,
    viewsCount: 1750,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'Мамандықтар бойынша реестр талдауы',
    excerpt: 'Әр мамандық бағыты бойынша білім беру бағдарламаларының саны мен сипаттамасы',
    content: 'Толық мәтін...',
    image: '/images/registry/specialties-analysis.jpg',
    category: {
      id: 6,
      name: 'Мамандықтар талдауы',
      slug: 'specialties-analysis',
      color: 'bg-teal-500'
    },
    tags: ['мамандықтар', 'талдау', 'бағыттар'],
    slug: 'specialties-registry-analysis',
    publishedAt: '2023-09-20',
    featured: false,
    viewsCount: 1650,
    author: 'BilimCert'
  },
  {
    id: 7,
    title: 'Реестр деректерінің сапасы бойынша есеп',
    excerpt: 'Реестрдегі деректердің толықтығы, дұрыстығы және сапасы туралы талдау',
    content: 'Толық мәтін...',
    image: '/images/registry/data-quality-report.jpg',
    category: {
      id: 7,
      name: 'Сапа есептері',
      slug: 'quality-reports',
      color: 'bg-indigo-500'
    },
    tags: ['сапа', 'деректер', 'талдау'],
    slug: 'registry-data-quality-report',
    publishedAt: '2023-08-15',
    featured: false,
    viewsCount: 1420,
    author: 'BilimCert'
  },
  {
    id: 8,
    title: 'Реестр жүйесінің техникалық көрсеткіштері',
    excerpt: 'Жүйенің өнімділігі, қолжетімділігі және техникалық көрсеткіштері туралы есеп',
    content: 'Толық мәтін...',
    image: '/images/registry/technical-metrics.jpg',
    category: {
      id: 8,
      name: 'Техникалық есептер',
      slug: 'technical-reports',
      color: 'bg-pink-500'
    },
    tags: ['техникалық', 'көрсеткіштер', 'өнімділік'],
    slug: 'registry-technical-metrics',
    publishedAt: '2023-07-10',
    featured: false,
    viewsCount: 1280,
    author: 'BilimCert'
  },
  {
    id: 9,
    title: 'Халықаралық салыстырмалы талдау',
    excerpt: 'Қазақстанның білім беру бағдарламалары реестрін басқа елдердің жүйелерімен салыстыру',
    content: 'Толық мәтін...',
    image: '/images/registry/international-comparison.jpg',
    category: {
      id: 9,
      name: 'Халықаралық талдау',
      slug: 'international-analysis',
      color: 'bg-cyan-500'
    },
    tags: ['халықаралық', 'салыстыру', 'талдау'],
    slug: 'international-comparative-analysis',
    publishedAt: '2023-06-25',
    featured: false,
    viewsCount: 1850,
    author: 'BilimCert'
  },
  {
    id: 10,
    title: 'Реестр дамуының болжамды сценарийлері',
    excerpt: 'Реестр жүйесінің болашақ дамуы үшін болжамды сценарийлер мен ұсыныстар',
    content: 'Толық мәтін...',
    image: '/images/registry/development-scenarios.jpg',
    category: {
      id: 10,
      name: 'Болжамдар',
      slug: 'forecasts',
      color: 'bg-amber-500'
    },
    tags: ['болжамдар', 'даму', 'сценарийлер'],
    slug: 'registry-development-scenarios',
    publishedAt: '2023-05-30',
    featured: false,
    viewsCount: 1550,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: statisticsReportsData.length },
  { id: 2, name: 'Жылдық есептер', slug: 'annual-reports', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Санақ статистикасы', slug: 'count-statistics', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'Аймақтық талдау', slug: 'regional-analysis', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Деңгей статистикасы', slug: 'level-statistics', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Пайдаланушы белсенділігі', slug: 'user-activity', color: 'bg-red-500', count: 1 },
  { id: 7, name: 'Мамандықтар талдауы', slug: 'specialties-analysis', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Сапа есептері', slug: 'quality-reports', color: 'bg-indigo-500', count: 1 },
  { id: 9, name: 'Техникалық есептер', slug: 'technical-reports', color: 'bg-pink-500', count: 1 },
  { id: 10, name: 'Халықаралық талдау', slug: 'international-analysis', color: 'bg-cyan-500', count: 1 },
  { id: 11, name: 'Болжамдар', slug: 'forecasts', color: 'bg-amber-500', count: 1 }
]

export default function RegistryStatisticsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Реестр ОП', href: '/registry', translationKey: 'registry.title' },
    { title: 'Статистика и отчеты', translationKey: 'registry.statistics' }
  ]

  return (
    <NewsListPage
      title="Статистика и отчеты"
      description="Реестр бойынша статистикалық деректер, есептер және талдаулар"
      breadcrumbs={breadcrumbs}
      baseUrl="/registry/statistics"
      mockData={statisticsReportsData}
      categories={categories}
    />
  )
}
