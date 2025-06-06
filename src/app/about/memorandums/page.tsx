'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const memorandumsData = [
  {
    id: 1,
    title: 'Назарбаев Университетімен серіктестік меморандумы',
    excerpt: 'Білім беру сапасын арттыру және халықаралық стандарттарға сәйкестендіру мақсатында жасалған келісім',
    content: 'Толық мәтін...',
    image: '/images/memorandums/nazarbayev-university.jpg',
    category: {
      id: 1,
      name: 'Университеттер',
      slug: 'universities',
      color: 'bg-blue-500'
    },
    tags: ['серіктестік', 'университет', 'сапа'],
    slug: 'nazarbayev-university-partnership',
    publishedAt: '2024-01-15',
    featured: true,
    viewsCount: 1250,
    author: 'BilimCert'
  },
  {
    id: 2,
    title: 'ENQA-мен ынтымақтастық келісімі',
    excerpt: 'Еуропалық сапа агенттіктері ассоциациясымен жасалған халықаралық ынтымақтастық келісімі',
    content: 'Толық мәтін...',
    image: '/images/memorandums/enqa.jpg',
    category: {
      id: 2,
      name: 'Халықаралық',
      slug: 'international',
      color: 'bg-green-500'
    },
    tags: ['ENQA', 'халықаралық', 'сапа'],
    slug: 'enqa-cooperation-agreement',
    publishedAt: '2023-12-20',
    featured: true,
    viewsCount: 980,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'ҚазҰУ-мен ғылыми ынтымақтастық',
    excerpt: 'Ғылыми зерттеулер мен білім беру бағдарламаларын дамыту бойынша меморандум',
    content: 'Толық мәтін...',
    image: '/images/memorandums/kaznu.jpg',
    category: {
      id: 1,
      name: 'Университеттер',
      slug: 'universities',
      color: 'bg-blue-500'
    },
    tags: ['ҚазҰУ', 'ғылым', 'зерттеу'],
    slug: 'kaznu-scientific-cooperation',
    publishedAt: '2023-11-10',
    featured: false,
    viewsCount: 750,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'UNESCO-мен серіктестік келісімі',
    excerpt: 'Білім беру саласындағы халықаралық ынтымақтастықты дамыту жөніндегі келісім',
    content: 'Толық мәтін...',
    image: '/images/memorandums/unesco.jpg',
    category: {
      id: 2,
      name: 'Халықаралық',
      slug: 'international',
      color: 'bg-green-500'
    },
    tags: ['UNESCO', 'білім', 'халықаралық'],
    slug: 'unesco-partnership-agreement',
    publishedAt: '2023-10-05',
    featured: false,
    viewsCount: 1100,
    author: 'BilimCert'
  },
  {
    id: 5,
    title: 'Еуразия университетімен келісім',
    excerpt: 'Аккредиттеу процедуралары мен сапа стандарттарын дамыту бойынша ынтымақтастық',
    content: 'Толық мәтін...',
    image: '/images/memorandums/eurasian-university.jpg',
    category: {
      id: 1,
      name: 'Университеттер',
      slug: 'universities',
      color: 'bg-blue-500'
    },
    tags: ['Еуразия', 'аккредиттеу', 'стандарттар'],
    slug: 'eurasian-university-agreement',
    publishedAt: '2023-09-15',
    featured: false,
    viewsCount: 650,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'Германия сапа агенттігімен меморандум',
    excerpt: 'Неміс сапа агенттігімен тәжірибе алмасу және ынтымақтастық туралы келісім',
    content: 'Толық мәтін...',
    image: '/images/memorandums/german-agency.jpg',
    category: {
      id: 2,
      name: 'Халықаралық',
      slug: 'international',
      color: 'bg-green-500'
    },
    tags: ['Германия', 'тәжірибе', 'алмасу'],
    slug: 'german-quality-agency-memorandum',
    publishedAt: '2023-08-20',
    featured: false,
    viewsCount: 820,
    author: 'BilimCert'
  },
  {
    id: 7,
    title: 'КБТУ-мен цифрлық серіктестік',
    excerpt: 'Цифрлық технологиялар мен инновацияларды дамыту бойынша ынтымақтастық келісімі',
    content: 'Толық мәтін...',
    image: '/images/memorandums/kbtu.jpg',
    category: {
      id: 3,
      name: 'Технологиялар',
      slug: 'technology',
      color: 'bg-purple-500'
    },
    tags: ['КБТУ', 'цифрлық', 'инновация'],
    slug: 'kbtu-digital-partnership',
    publishedAt: '2023-07-12',
    featured: false,
    viewsCount: 590,
    author: 'BilimCert'
  },
  {
    id: 8,
    title: 'Түркия сапа кеңесімен келісім',
    excerpt: 'Түрік сапа кеңесімен білім беру сапасын дамыту бойынша ынтымақтастық',
    content: 'Толық мәтін...',
    image: '/images/memorandums/turkish-council.jpg',
    category: {
      id: 2,
      name: 'Халықаралық',
      slug: 'international',
      color: 'bg-green-500'
    },
    tags: ['Түркия', 'сапа', 'кеңес'],
    slug: 'turkish-quality-council-agreement',
    publishedAt: '2023-06-25',
    featured: false,
    viewsCount: 710,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: memorandumsData.length },
  { id: 2, name: 'Университеттер', slug: 'universities', color: 'bg-blue-500', count: 3 },
  { id: 3, name: 'Халықаралық', slug: 'international', color: 'bg-green-500', count: 4 },
  { id: 4, name: 'Технологиялар', slug: 'technology', color: 'bg-purple-500', count: 1 }
]

export default function MemorandumsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'О Центре', href: '/about', translationKey: 'about.title' },
    { title: 'Меморандумы Центра', translationKey: 'about.memorandums' }
  ]

  return (
    <NewsListPage
      title="Меморандумы Центра"
      description="BilimCert орталығының серіктестермен жасаған меморандумдары мен келісімдері"
      breadcrumbs={breadcrumbs}
      baseUrl="/about/memorandums"
      mockData={memorandumsData}
      categories={categories}
    />
  )
}
