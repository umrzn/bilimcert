'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const monitoringData = [
  {
    id: 1,
    title: 'Болон процесі мониторингі 2024',
    excerpt: 'Еуропалық жоғары білім беру кеңістігінің дамуы туралы жылдық есеп',
    content: 'Толық мәтін...',
    image: '/images/monitoring/bologna-monitoring-2024.jpg',
    category: {
      id: 1,
      name: 'Жылдық есептер',
      slug: 'annual-reports',
      color: 'bg-blue-500'
    },
    tags: ['мониторинг', '2024', 'есеп'],
    slug: 'bologna-process-monitoring-2024',
    publishedAt: '2024-01-30',
    featured: true,
    viewsCount: 1850,
    author: 'BFUG Monitoring Group'
  },
  {
    id: 2,
    title: 'Қазақстандағы Болон процесінің іске асырылуы',
    excerpt: 'Қазақстан Республикасында Болон процесі принциптерінің енгізілу мониторингі',
    content: 'Толық мәтін...',
    image: '/images/monitoring/kazakhstan-implementation.jpg',
    category: {
      id: 2,
      name: 'Ұлттық есептер',
      slug: 'national-reports',
      color: 'bg-green-500'
    },
    tags: ['Қазақстан', 'іске асыру', 'мониторинг'],
    slug: 'kazakhstan-bologna-implementation-monitoring',
    publishedAt: '2024-01-15',
    featured: true,
    viewsCount: 1650,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'Студенттердің академиялық ұтқырлығы статистикасы',
    excerpt: 'Еуропалық жоғары білім беру кеңістігіндегі студенттер мобильдігінің статистикалық талдауы',
    content: 'Толық мәтін...',
    image: '/images/monitoring/student-mobility-statistics.jpg',
    category: {
      id: 3,
      name: 'Статистика',
      slug: 'statistics',
      color: 'bg-purple-500'
    },
    tags: ['мобильность', 'студенттер', 'статистика'],
    slug: 'student-academic-mobility-statistics',
    publishedAt: '2023-12-20',
    featured: false,
    viewsCount: 1420,
    author: 'BFUG Monitoring Group'
  },
  {
    id: 4,
    title: 'Сапа қамтамасыз ету жүйелерінің дамуы',
    excerpt: 'Болон процесі елдеріндегі сапа қамтамасыз ету жүйелерінің салыстырмалы талдауы',
    content: 'Толық мәтін...',
    image: '/images/monitoring/quality-assurance-development.jpg',
    category: {
      id: 4,
      name: 'Сапа мониторингі',
      slug: 'quality-monitoring',
      color: 'bg-red-500'
    },
    tags: ['сапа', 'жүйелер', 'дамыту'],
    slug: 'quality-assurance-systems-development',
    publishedAt: '2023-11-25',
    featured: false,
    viewsCount: 1280,
    author: 'ENQA'
  },
  {
    id: 5,
    title: 'ECTS жүйесінің қолданылу мониторингі',
    excerpt: 'Еуропалық кредиттік трансфер жүйесінің елдер бойынша қолданылу деңгейі',
    content: 'Толық мәтін...',
    image: '/images/monitoring/ects-implementation-monitoring.jpg',
    category: {
      id: 5,
      name: 'Құралдар мониторингі',
      slug: 'tools-monitoring',
      color: 'bg-orange-500'
    },
    tags: ['ECTS', 'қолдану', 'мониторинг'],
    slug: 'ects-system-implementation-monitoring',
    publishedAt: '2023-10-30',
    featured: false,
    viewsCount: 1150,
    author: 'BFUG Monitoring Group'
  },
  {
    id: 6,
    title: 'Дипломдарды тану процедураларының тиімділігі',
    excerpt: 'Болон процесі елдеріндегі дипломдарды тану процедураларының тиімділік талдауы',
    content: 'Толық мәтін...',
    image: '/images/monitoring/diploma-recognition-efficiency.jpg',
    category: {
      id: 6,
      name: 'Тану мониторингі',
      slug: 'recognition-monitoring',
      color: 'bg-teal-500'
    },
    tags: ['тану', 'дипломдар', 'тиімділік'],
    slug: 'diploma-recognition-procedures-efficiency',
    publishedAt: '2023-09-15',
    featured: false,
    viewsCount: 980,
    author: 'ENIC-NARIC Network'
  },
  {
    id: 7,
    title: 'Жоғары білім беруге қолжетімділік мониторингі',
    excerpt: 'Әлеуметтік топтар бойынша жоғары білім беруге қолжетімділік деңгейінің талдауы',
    content: 'Толық мәтін...',
    image: '/images/monitoring/higher-education-accessibility.jpg',
    category: {
      id: 7,
      name: 'Қолжетімділік',
      slug: 'accessibility',
      color: 'bg-pink-500'
    },
    tags: ['қолжетімділік', 'әлеуметтік', 'топтар'],
    slug: 'higher-education-accessibility-monitoring',
    publishedAt: '2023-08-20',
    featured: false,
    viewsCount: 850,
    author: 'BFUG Social Dimension Working Group'
  },
  {
    id: 8,
    title: 'Цифрлық дағдылар дамуының мониторингі',
    excerpt: 'Жоғары білім беру жүйесінде цифрлық дағдылар дамуының бағалауы',
    content: 'Толық мәтін...',
    image: '/images/monitoring/digital-skills-development.jpg',
    category: {
      id: 8,
      name: 'Дағдылар мониторингі',
      slug: 'skills-monitoring',
      color: 'bg-indigo-500'
    },
    tags: ['цифрлық', 'дағдылар', 'дамыту'],
    slug: 'digital-skills-development-monitoring',
    publishedAt: '2023-07-25',
    featured: false,
    viewsCount: 720,
    author: 'BFUG Monitoring Group'
  },
  {
    id: 9,
    title: 'Жұмыс берушілердің көзқарасы мониторингі',
    excerpt: 'Жұмыс берушілердің жоғары білім беру сапасына деген көзқарасының зерттеуі',
    content: 'Толық мәтін...',
    image: '/images/monitoring/employers-perspective.jpg',
    category: {
      id: 9,
      name: 'Жұмыс берушілер',
      slug: 'employers',
      color: 'bg-gray-600'
    },
    tags: ['жұмыс берушілер', 'көзқарас', 'сапа'],
    slug: 'employers-perspective-monitoring',
    publishedAt: '2023-06-30',
    featured: false,
    viewsCount: 650,
    author: 'BusinessEurope'
  },
  {
    id: 10,
    title: 'Болон процесінің әлеуметтік өлшемі',
    excerpt: 'Жоғары білім беру саласындағы әлеуметтік теңдік пен инклюзивтіліктің мониторингі',
    content: 'Толық мәтін...',
    image: '/images/monitoring/social-dimension-bologna.jpg',
    category: {
      id: 10,
      name: 'Әлеуметтік өлшем',
      slug: 'social-dimension',
      color: 'bg-yellow-500'
    },
    tags: ['әлеуметтік', 'теңдік', 'инклюзия'],
    slug: 'bologna-process-social-dimension',
    publishedAt: '2023-05-15',
    featured: false,
    viewsCount: 580,
    author: 'ESU - European Students Union'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: monitoringData.length },
  { id: 2, name: 'Жылдық есептер', slug: 'annual-reports', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Ұлттық есептер', slug: 'national-reports', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'Статистика', slug: 'statistics', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Сапа мониторингі', slug: 'quality-monitoring', color: 'bg-red-500', count: 1 },
  { id: 6, name: 'Құралдар мониторингі', slug: 'tools-monitoring', color: 'bg-orange-500', count: 1 },
  { id: 7, name: 'Тану мониторингі', slug: 'recognition-monitoring', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Қолжетімділік', slug: 'accessibility', color: 'bg-pink-500', count: 1 },
  { id: 9, name: 'Дағдылар мониторингі', slug: 'skills-monitoring', color: 'bg-indigo-500', count: 1 },
  { id: 10, name: 'Жұмыс берушілер', slug: 'employers', color: 'bg-gray-600', count: 1 },
  { id: 11, name: 'Әлеуметтік өлшем', slug: 'social-dimension', color: 'bg-yellow-500', count: 1 }
]

export default function BolognaMonitoringPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Болонский процесс', href: '/bologna-process', translationKey: 'bologna.title' },
    { title: 'Мониторинг деятельности', translationKey: 'bologna.monitoring' }
  ]

  return (
    <NewsListPage
      title="Мониторинг деятельности"
      description="Болон процесі іске асырудың мониторингі, есептер, статистика және бағалау материалдары"
      breadcrumbs={breadcrumbs}
      baseUrl="/bologna-process/monitoring"
      mockData={monitoringData}
      categories={categories}
    />
  )
}
