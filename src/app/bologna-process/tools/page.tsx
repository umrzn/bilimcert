'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const toolsData = [
  {
    id: 1,
    title: 'ECTS - Еуропалық кредиттік трансфер жүйесі',
    excerpt: 'Студенттердің академиялық жетістіктерін өлшеу және трансфер жасау жүйесі',
    content: 'Толық мәтін...',
    image: '/images/bologna/ects-system.jpg',
    category: {
      id: 1,
      name: 'Кредиттік жүйелер',
      slug: 'credit-systems',
      color: 'bg-blue-500'
    },
    tags: ['ECTS', 'кредит', 'трансфер'],
    slug: 'ects-european-credit-transfer-system',
    publishedAt: '2024-01-15',
    featured: true,
    viewsCount: 2850,
    author: 'BilimCert'
  },
  {
    id: 2,
    title: 'Diploma Supplement - Диплом қосымшасы',
    excerpt: 'Дипломға қосымша ақпарат беретін стандартталған құжат',
    content: 'Толық мәтін...',
    image: '/images/bologna/diploma-supplement.jpg',
    category: {
      id: 2,
      name: 'Тану құралдары',
      slug: 'recognition-tools',
      color: 'bg-green-500'
    },
    tags: ['диплом', 'қосымша', 'тану'],
    slug: 'diploma-supplement-standard-document',
    publishedAt: '2024-01-10',
    featured: true,
    viewsCount: 2150,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'EUROPASS - Еуропалық CV форматы',
    excerpt: 'Біліктілік пен дағдыларды еуропалық стандартта көрсету құралы',
    content: 'Толық мәтін...',
    image: '/images/bologna/europass-cv.jpg',
    category: {
      id: 3,
      name: 'Мобильность құралдары',
      slug: 'mobility-tools',
      color: 'bg-purple-500'
    },
    tags: ['EUROPASS', 'CV', 'біліктілік'],
    slug: 'europass-european-cv-format',
    publishedAt: '2023-12-20',
    featured: false,
    viewsCount: 1890,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'EQAR - Еуропалық сапа агенттіктері реестрі',
    excerpt: 'Еуропадағы сапа қамтамасыз ету агенттіктерінің ресми реестрі',
    content: 'Толық мәтін...',
    image: '/images/bologna/eqar-registry.jpg',
    category: {
      id: 4,
      name: 'Сапа құралдары',
      slug: 'quality-tools',
      color: 'bg-red-500'
    },
    tags: ['EQAR', 'сапа', 'агенттіктер'],
    slug: 'eqar-european-quality-assurance-registry',
    publishedAt: '2023-11-15',
    featured: false,
    viewsCount: 1650,
    author: 'BilimCert'
  },
  {
    id: 5,
    title: 'ESG - Еуропалық сапа стандарттары',
    excerpt: 'Жоғары білім беру саласындағы сапа қамтамасыз етудің еуропалық стандарттары',
    content: 'Толық мәтін...',
    image: '/images/bologna/esg-standards.jpg',
    category: {
      id: 4,
      name: 'Сапа құралдары',
      slug: 'quality-tools',
      color: 'bg-red-500'
    },
    tags: ['ESG', 'стандарттар', 'сапа'],
    slug: 'esg-european-standards-guidelines',
    publishedAt: '2023-10-25',
    featured: false,
    viewsCount: 1420,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'ENIC-NARIC желісі',
    excerpt: 'Академиялық біліктіліктерді тану жөніндегі ақпараттық орталықтар желісі',
    content: 'Толық мәтін...',
    image: '/images/bologna/enic-naric-network.jpg',
    category: {
      id: 2,
      name: 'Тану құралдары',
      slug: 'recognition-tools',
      color: 'bg-green-500'
    },
    tags: ['ENIC', 'NARIC', 'тану'],
    slug: 'enic-naric-recognition-network',
    publishedAt: '2023-09-30',
    featured: false,
    viewsCount: 1280,
    author: 'BilimCert'
  },
  {
    id: 7,
    title: 'Лиссабон тану конвенциясы',
    excerpt: 'Еуропа аймағындағы жоғары білім беру біліктіліктерін тану туралы конвенция',
    content: 'Толық мәтін...',
    image: '/images/bologna/lisbon-recognition-convention.jpg',
    category: {
      id: 2,
      name: 'Тану құралдары',
      slug: 'recognition-tools',
      color: 'bg-green-500'
    },
    tags: ['Лиссабон', 'конвенция', 'тану'],
    slug: 'lisbon-recognition-convention',
    publishedAt: '2023-08-20',
    featured: false,
    viewsCount: 1150,
    author: 'BilimCert'
  },
  {
    id: 8,
    title: 'QF-EHEA - Еуропалық біліктілік шеңбері',
    excerpt: 'Еуропалық жоғары білім беру кеңістігінің біліктілік шеңбері',
    content: 'Толық мәтін...',
    image: '/images/bologna/qf-ehea-framework.jpg',
    category: {
      id: 5,
      name: 'Біліктілік шеңберлері',
      slug: 'qualification-frameworks',
      color: 'bg-orange-500'
    },
    tags: ['QF-EHEA', 'біліктілік', 'шеңбер'],
    slug: 'qf-ehea-qualifications-framework',
    publishedAt: '2023-07-15',
    featured: false,
    viewsCount: 980,
    author: 'BilimCert'
  },
  {
    id: 9,
    title: 'U-Multirank - Университеттерді рейтингтеу',
    excerpt: 'Көпөлшемді университеттер рейтингі және салыстыру құралы',
    content: 'Толық мәтін...',
    image: '/images/bologna/u-multirank.jpg',
    category: {
      id: 6,
      name: 'Бағалау құралдары',
      slug: 'assessment-tools',
      color: 'bg-teal-500'
    },
    tags: ['U-Multirank', 'рейтинг', 'бағалау'],
    slug: 'u-multirank-university-ranking',
    publishedAt: '2023-06-10',
    featured: false,
    viewsCount: 850,
    author: 'BilimCert'
  },
  {
    id: 10,
    title: 'DEQAR - Сапа агенттіктері деректер базасы',
    excerpt: 'Еуропалық сапа агенттіктерінің шешімдері туралы деректер базасы',
    content: 'Толық мәтін...',
    image: '/images/bologna/deqar-database.jpg',
    category: {
      id: 4,
      name: 'Сапа құралдары',
      slug: 'quality-tools',
      color: 'bg-red-500'
    },
    tags: ['DEQAR', 'деректер', 'сапа'],
    slug: 'deqar-quality-agencies-database',
    publishedAt: '2023-05-20',
    featured: false,
    viewsCount: 720,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: toolsData.length },
  { id: 2, name: 'Кредиттік жүйелер', slug: 'credit-systems', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Тану құралдары', slug: 'recognition-tools', color: 'bg-green-500', count: 3 },
  { id: 4, name: 'Мобильность құралдары', slug: 'mobility-tools', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Сапа құралдары', slug: 'quality-tools', color: 'bg-red-500', count: 3 },
  { id: 6, name: 'Біліктілік шеңберлері', slug: 'qualification-frameworks', color: 'bg-orange-500', count: 1 },
  { id: 7, name: 'Бағалау құралдары', slug: 'assessment-tools', color: 'bg-teal-500', count: 1 }
]

export default function BolognaToolsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Болонский процесс', href: '/bologna-process', translationKey: 'bologna.title' },
    { title: 'Инструменты ЕПВО', translationKey: 'bologna.tools' }
  ]

  return (
    <NewsListPage
      title="Инструменты ЕПВО"
      description="Еуропалық жоғары білім беру кеңістігінің құралдары: ECTS, Diploma Supplement, EUROPASS және басқа маңызды жүйелер"
      breadcrumbs={breadcrumbs}
      baseUrl="/bologna-process/tools"
      mockData={toolsData}
      categories={categories}
    />
  )
}
