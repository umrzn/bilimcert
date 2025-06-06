'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const documentsData = [
  {
    id: 1,
    title: 'Болон декларациясы (1999)',
    excerpt: 'Еуропалық жоғары білім беру кеңістігін құру туралы негізгі құжат',
    content: 'Толық мәтін...',
    image: '/images/bologna/bologna-declaration.jpg',
    category: {
      id: 1,
      name: 'Декларациялар',
      slug: 'declarations',
      color: 'bg-blue-500'
    },
    tags: ['декларация', 'негізгі', '1999'],
    slug: 'bologna-declaration-1999',
    publishedAt: '1999-06-19',
    featured: true,
    viewsCount: 2150,
    author: 'Bologna Process'
  },
  {
    id: 2,
    title: 'Прага коммюникесі (2001)',
    excerpt: 'Болон процесінің дамуы және жаңа міндеттер туралы коммюнике',
    content: 'Толық мәтін...',
    image: '/images/bologna/prague-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Прага', '2001'],
    slug: 'prague-communique-2001',
    publishedAt: '2001-05-19',
    featured: true,
    viewsCount: 1890,
    author: 'Bologna Process'
  },
  {
    id: 3,
    title: 'Берлин коммюникесі (2003)',
    excerpt: 'Сапа қамтамасыз ету және докторантура деңгейін енгізу туралы',
    content: 'Толық мәтін...',
    image: '/images/bologna/berlin-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Берлин', 'сапа'],
    slug: 'berlin-communique-2003',
    publishedAt: '2003-09-19',
    featured: false,
    viewsCount: 1450,
    author: 'Bologna Process'
  },
  {
    id: 4,
    title: 'Берген коммюникесі (2005)',
    excerpt: 'Еуропалық жоғары білім беру кеңістігі - мақсаттарға жету',
    content: 'Толық мәтін...',
    image: '/images/bologna/bergen-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Берген', 'мақсаттар'],
    slug: 'bergen-communique-2005',
    publishedAt: '2005-05-20',
    featured: false,
    viewsCount: 1320,
    author: 'Bologna Process'
  },
  {
    id: 5,
    title: 'Лондон коммюникесі (2007)',
    excerpt: 'Жаһандық контекстегі Еуропалық жоғары білім беру кеңістігі',
    content: 'Толық мәтін...',
    image: '/images/bologna/london-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Лондон', 'жаһандық'],
    slug: 'london-communique-2007',
    publishedAt: '2007-05-18',
    featured: false,
    viewsCount: 1180,
    author: 'Bologna Process'
  },
  {
    id: 6,
    title: 'Лувен коммюникесі (2009)',
    excerpt: 'Болон процесі 2020 - Еуропалық жоғары білім беру кеңістігі жаңа онжылдықта',
    content: 'Толық мәтін...',
    image: '/images/bologna/leuven-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Лувен', '2020'],
    slug: 'leuven-communique-2009',
    publishedAt: '2009-04-29',
    featured: false,
    viewsCount: 1050,
    author: 'Bologna Process'
  },
  {
    id: 7,
    title: 'Будапешт-Вена декларациясы (2010)',
    excerpt: 'Еуропалық жоғары білім беру кеңістігін аяқтау туралы декларация',
    content: 'Толық мәтін...',
    image: '/images/bologna/budapest-vienna-declaration.jpg',
    category: {
      id: 1,
      name: 'Декларациялар',
      slug: 'declarations',
      color: 'bg-blue-500'
    },
    tags: ['декларация', 'Будапешт', 'Вена'],
    slug: 'budapest-vienna-declaration-2010',
    publishedAt: '2010-03-12',
    featured: false,
    viewsCount: 1680,
    author: 'Bologna Process'
  },
  {
    id: 8,
    title: 'Бухарест коммюникесі (2012)',
    excerpt: 'Мобильность пен жұмысқа орналасу мүмкіндіктерін арттыру',
    content: 'Толық мәтін...',
    image: '/images/bologna/bucharest-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Бухарест', 'мобильность'],
    slug: 'bucharest-communique-2012',
    publishedAt: '2012-04-27',
    featured: false,
    viewsCount: 920,
    author: 'Bologna Process'
  },
  {
    id: 9,
    title: 'Ереван коммюникесі (2015)',
    excerpt: 'Еуропалық жоғары білім беру кеңістігі - жетістіктер мен жаңа міндеттер',
    content: 'Толық мәтін...',
    image: '/images/bologna/yerevan-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Ереван', 'жетістіктер'],
    slug: 'yerevan-communique-2015',
    publishedAt: '2015-05-15',
    featured: false,
    viewsCount: 850,
    author: 'Bologna Process'
  },
  {
    id: 10,
    title: 'Париж коммюникесі (2018)',
    excerpt: 'Еуропалық жоғары білім беру кеңістігінің болашағы',
    content: 'Толық мәтін...',
    image: '/images/bologna/paris-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Париж', 'болашақ'],
    slug: 'paris-communique-2018',
    publishedAt: '2018-05-25',
    featured: false,
    viewsCount: 780,
    author: 'Bologna Process'
  },
  {
    id: 11,
    title: 'Рим коммюникесі (2020)',
    excerpt: 'Еуропалық жоғары білім беру кеңістігінің құндылықтары мен принциптері',
    content: 'Толық мәтін...',
    image: '/images/bologna/rome-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Рим', 'құндылықтар'],
    slug: 'rome-communique-2020',
    publishedAt: '2020-11-19',
    featured: false,
    viewsCount: 650,
    author: 'Bologna Process'
  },
  {
    id: 12,
    title: 'Тирана коммюникесі (2024)',
    excerpt: 'Болон процесінің жаңа кезеңі - 2030 жылға дейінгі перспективалар',
    content: 'Толық мәтін...',
    image: '/images/bologna/tirana-communique.jpg',
    category: {
      id: 2,
      name: 'Коммюникелер',
      slug: 'communiques',
      color: 'bg-green-500'
    },
    tags: ['коммюнике', 'Тирана', '2030'],
    slug: 'tirana-communique-2024',
    publishedAt: '2024-05-30',
    featured: false,
    viewsCount: 420,
    author: 'Bologna Process'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: documentsData.length },
  { id: 2, name: 'Декларациялар', slug: 'declarations', color: 'bg-blue-500', count: 2 },
  { id: 3, name: 'Коммюникелер', slug: 'communiques', color: 'bg-green-500', count: 10 }
]

export default function BolognaDocumentsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Болонский процесс', href: '/bologna-process', translationKey: 'bologna.title' },
    { title: 'Основные документы', translationKey: 'bologna.documents' }
  ]

  return (
    <NewsListPage
      title="Основные документы"
      description="Болон процесінің негізгі құжаттары: декларациялар, коммюникелер және басқа ресми материалдар"
      breadcrumbs={breadcrumbs}
      baseUrl="/bologna-process/documents"
      mockData={documentsData}
      categories={categories}
    />
  )
}
