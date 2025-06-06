'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const npaData = [
  {
    id: 1,
    title: 'Білім беру бағдарламаларының реестрін жүргізу қағидалары',
    excerpt: 'ҚР Үкіметінің білім беру бағдарламаларының мемлекеттік реестрін жүргізу тәртібі туралы қаулысы',
    content: 'Толық мәтін...',
    image: '/images/registry/registry-rules.jpg',
    category: {
      id: 1,
      name: 'Қағидалар',
      slug: 'rules',
      color: 'bg-blue-500'
    },
    tags: ['реестр', 'қағидалар', 'жүргізу'],
    slug: 'educational-programs-registry-rules',
    publishedAt: '2021-08-31',
    featured: true,
    viewsCount: 4250,
    author: 'ҚР Үкіметі'
  },
  {
    id: 2,
    title: 'Реестрге ақпарат енгізу нұсқаулығы',
    excerpt: 'Білім беру ұйымдары үшін реестрге деректерді енгізу және жаңарту жөніндегі нұсқаулық',
    content: 'Толық мәтін...',
    image: '/images/registry/data-entry-instruction.jpg',
    category: {
      id: 2,
      name: 'Нұсқаулықтар',
      slug: 'instructions',
      color: 'bg-green-500'
    },
    tags: ['нұсқаулық', 'деректер', 'енгізу'],
    slug: 'registry-data-entry-instruction',
    publishedAt: '2022-03-15',
    featured: true,
    viewsCount: 3890,
    author: 'ҚР БҒМ'
  },
  {
    id: 3,
    title: 'Реестр деректерінің сапасына қойылатын талаптар',
    excerpt: 'Реестрге енгізілетін ақпараттың дұрыстығы мен толықтығына қойылатын талаптар',
    content: 'Толық мәтін...',
    image: '/images/registry/data-quality-requirements.jpg',
    category: {
      id: 3,
      name: 'Талаптар',
      slug: 'requirements',
      color: 'bg-purple-500'
    },
    tags: ['талаптар', 'сапа', 'деректер'],
    slug: 'registry-data-quality-requirements',
    publishedAt: '2022-01-20',
    featured: false,
    viewsCount: 2750,
    author: 'ҚР БҒМ'
  },
  {
    id: 4,
    title: 'Реестрге қол жеткізу құқықтары',
    excerpt: 'Реестр ақпаратына қол жеткізу құқықтары мен рұқсаттар жүйесі',
    content: 'Толық мәтін...',
    image: '/images/registry/access-rights.jpg',
    category: {
      id: 4,
      name: 'Құқықтар',
      slug: 'rights',
      color: 'bg-orange-500'
    },
    tags: ['құқықтар', 'қол жеткізу', 'рұқсаттар'],
    slug: 'registry-access-rights',
    publishedAt: '2021-12-10',
    featured: false,
    viewsCount: 2150,
    author: 'ҚР БҒМ'
  },
  {
    id: 5,
    title: 'Реестр деректерін жариялау тәртібі',
    excerpt: 'Реестр ақпаратын ашық порталда жариялау және жаңарту процедуралары',
    content: 'Толық мәтін...',
    image: '/images/registry/publication-procedure.jpg',
    category: {
      id: 5,
      name: 'Процедуралар',
      slug: 'procedures',
      color: 'bg-red-500'
    },
    tags: ['жариялау', 'процедура', 'ашық портал'],
    slug: 'registry-data-publication-procedure',
    publishedAt: '2021-11-25',
    featured: false,
    viewsCount: 1890,
    author: 'ҚР БҒМ'
  },
  {
    id: 6,
    title: 'Реестр жүйесінің техникалық талаптары',
    excerpt: 'Реестр ақпараттық жүйесінің техникалық сипаттамалары мен талаптары',
    content: 'Толық мәтін...',
    image: '/images/registry/technical-requirements.jpg',
    category: {
      id: 3,
      name: 'Талаптар',
      slug: 'requirements',
      color: 'bg-purple-500'
    },
    tags: ['техникалық', 'талаптар', 'жүйе'],
    slug: 'registry-system-technical-requirements',
    publishedAt: '2021-10-15',
    featured: false,
    viewsCount: 1650,
    author: 'ҚР БҒМ'
  },
  {
    id: 7,
    title: 'Реестр деректерінің қауіпсіздігі',
    excerpt: 'Реестр ақпаратының қорғалуы мен қауіпсіздігін қамтамасыз ету шаралары',
    content: 'Толық мәтін...',
    image: '/images/registry/data-security.jpg',
    category: {
      id: 6,
      name: 'Қауіпсіздік',
      slug: 'security',
      color: 'bg-teal-500'
    },
    tags: ['қауіпсіздік', 'қорғау', 'деректер'],
    slug: 'registry-data-security-measures',
    publishedAt: '2021-09-30',
    featured: false,
    viewsCount: 1450,
    author: 'ҚР БҒМ'
  },
  {
    id: 8,
    title: 'Реестр мониторингі және бақылау',
    excerpt: 'Реестр деректерінің сапасын мониторингтеу және бақылау механизмдері',
    content: 'Толық мәтін...',
    image: '/images/registry/monitoring-control.jpg',
    category: {
      id: 7,
      name: 'Мониторинг',
      slug: 'monitoring',
      color: 'bg-indigo-500'
    },
    tags: ['мониторинг', 'бақылау', 'сапа'],
    slug: 'registry-monitoring-control',
    publishedAt: '2021-08-20',
    featured: false,
    viewsCount: 1250,
    author: 'ҚР БҒМ'
  },
  {
    id: 9,
    title: 'Реестр деректерін архивтеу тәртібі',
    excerpt: 'Реестр ақпаратын архивтеу, сақтау және қалпына келтіру процедуралары',
    content: 'Толық мәтін...',
    image: '/images/registry/archiving-procedure.jpg',
    category: {
      id: 5,
      name: 'Процедуралар',
      slug: 'procedures',
      color: 'bg-red-500'
    },
    tags: ['архивтеу', 'сақтау', 'қалпына келтіру'],
    slug: 'registry-data-archiving-procedure',
    publishedAt: '2021-07-15',
    featured: false,
    viewsCount: 980,
    author: 'ҚР БҒМ'
  },
  {
    id: 10,
    title: 'Реестр пайдаланушыларының жауапкершілігі',
    excerpt: 'Реестр жүйесін пайдаланушылардың құқықтары мен міндеттері',
    content: 'Толық мәтін...',
    image: '/images/registry/user-responsibilities.jpg',
    category: {
      id: 8,
      name: 'Жауапкершілік',
      slug: 'responsibilities',
      color: 'bg-yellow-500'
    },
    tags: ['жауапкершілік', 'пайдаланушылар', 'міндеттер'],
    slug: 'registry-user-responsibilities',
    publishedAt: '2021-06-30',
    featured: false,
    viewsCount: 1150,
    author: 'ҚР БҒМ'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: npaData.length },
  { id: 2, name: 'Қағидалар', slug: 'rules', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Нұсқаулықтар', slug: 'instructions', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'Талаптар', slug: 'requirements', color: 'bg-purple-500', count: 2 },
  { id: 5, name: 'Құқықтар', slug: 'rights', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Процедуралар', slug: 'procedures', color: 'bg-red-500', count: 2 },
  { id: 7, name: 'Қауіпсіздік', slug: 'security', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Мониторинг', slug: 'monitoring', color: 'bg-indigo-500', count: 1 },
  { id: 9, name: 'Жауапкершілік', slug: 'responsibilities', color: 'bg-yellow-500', count: 1 }
]

export default function RegistryNpaPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Реестр ОП', href: '/registry', translationKey: 'registry.title' },
    { title: 'НПА', translationKey: 'registry.npa' }
  ]

  return (
    <NewsListPage
      title="НПА"
      description="Білім беру бағдарламаларының реестрін жүргізуге қатысты нормативтік-құқықтық актілер"
      breadcrumbs={breadcrumbs}
      baseUrl="/registry/npa"
      mockData={npaData}
      categories={categories}
    />
  )
}
