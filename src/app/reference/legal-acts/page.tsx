'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const legalActsData = [
  {
    id: 1,
    title: 'Қазақстан Республикасының "Білім туралы" Заңы',
    excerpt: 'Білім беру жүйесінің құқықтық негіздерін айқындайтын негізгі заң',
    content: 'Толық мәтін...',
    image: '/images/legal/education-law.jpg',
    category: {
      id: 1,
      name: 'Заңдар',
      slug: 'laws',
      color: 'bg-blue-500'
    },
    tags: ['заң', 'білім', 'негізгі'],
    slug: 'education-law-kazakhstan',
    publishedAt: '2007-07-27',
    featured: true,
    viewsCount: 5250,
    author: 'ҚР Парламенті'
  },
  {
    id: 2,
    title: 'Жоғары білім беру туралы ереже',
    excerpt: 'Жоғары білім беру ұйымдарының қызметін реттейтін нормативтік құжат',
    content: 'Толық мәтін...',
    image: '/images/legal/higher-education-regulation.jpg',
    category: {
      id: 2,
      name: 'Ережелер',
      slug: 'regulations',
      color: 'bg-green-500'
    },
    tags: ['ереже', 'жоғары білім', 'реттеу'],
    slug: 'higher-education-regulation',
    publishedAt: '2022-08-31',
    featured: true,
    viewsCount: 3890,
    author: 'ҚР Үкіметі'
  },
  {
    id: 3,
    title: 'Білім беру бағдарламаларын аккредиттеу қағидалары',
    excerpt: 'Білім беру бағдарламаларын аккредиттеу процедураларын айқындайтын құжат',
    content: 'Толық мәтін...',
    image: '/images/legal/accreditation-rules.jpg',
    category: {
      id: 3,
      name: 'Қағидалар',
      slug: 'rules',
      color: 'bg-purple-500'
    },
    tags: ['аккредиттеу', 'қағидалар', 'бағдарлама'],
    slug: 'education-programs-accreditation-rules',
    publishedAt: '2021-12-29',
    featured: false,
    viewsCount: 2750,
    author: 'ҚР БҒМ'
  },
  {
    id: 4,
    title: 'Шетелдік дипломдарды тану қағидалары',
    excerpt: 'Шетелдік білім беру құжаттарын тану процедураларын реттейтін құжат',
    content: 'Толық мәтін...',
    image: '/images/legal/foreign-diploma-recognition.jpg',
    category: {
      id: 3,
      name: 'Қағидалар',
      slug: 'rules',
      color: 'bg-purple-500'
    },
    tags: ['тану', 'шетелдік', 'диплом'],
    slug: 'foreign-diploma-recognition-rules',
    publishedAt: '2020-07-13',
    featured: false,
    viewsCount: 4150,
    author: 'ҚР БҒМ'
  },
  {
    id: 5,
    title: 'Мемлекеттік білім беру стандарттары',
    excerpt: 'Жоғары білім беру саласындағы мемлекеттік стандарттар жиынтығы',
    content: 'Толық мәтін...',
    image: '/images/legal/state-education-standards.jpg',
    category: {
      id: 4,
      name: 'Стандарттар',
      slug: 'standards',
      color: 'bg-orange-500'
    },
    tags: ['стандарттар', 'мемлекеттік', 'білім'],
    slug: 'state-education-standards',
    publishedAt: '2022-10-31',
    featured: false,
    viewsCount: 3250,
    author: 'ҚР БҒМ'
  },
  {
    id: 6,
    title: 'Академиялық ұтқырлық туралы қағидалар',
    excerpt: 'Студенттер мен оқытушылардың академиялық ұтқырлығын реттейтін құжат',
    content: 'Толық мәтін...',
    image: '/images/legal/academic-mobility-rules.jpg',
    category: {
      id: 3,
      name: 'Қағидалар',
      slug: 'rules',
      color: 'bg-purple-500'
    },
    tags: ['ұтқырлық', 'академиялық', 'студенттер'],
    slug: 'academic-mobility-rules',
    publishedAt: '2019-04-12',
    featured: false,
    viewsCount: 2890,
    author: 'ҚР БҒМ'
  },
  {
    id: 7,
    title: 'Сапа қамтамасыз ету жүйесі туралы нұсқаулық',
    excerpt: 'Білім беру ұйымдарындағы сапа қамтамасыз ету жүйесін құру нұсқаулығы',
    content: 'Толық мәтін...',
    image: '/images/legal/quality-assurance-guidelines.jpg',
    category: {
      id: 5,
      name: 'Нұсқаулықтар',
      slug: 'guidelines',
      color: 'bg-teal-500'
    },
    tags: ['сапа', 'нұсқаулық', 'жүйе'],
    slug: 'quality-assurance-system-guidelines',
    publishedAt: '2021-06-15',
    featured: false,
    viewsCount: 2150,
    author: 'ҚР БҒМ'
  },
  {
    id: 8,
    title: 'Кредиттік технология туралы ереже',
    excerpt: 'Жоғары білім беруде кредиттік технологияны қолдану ережелері',
    content: 'Толық мәтін...',
    image: '/images/legal/credit-technology-regulation.jpg',
    category: {
      id: 2,
      name: 'Ережелер',
      slug: 'regulations',
      color: 'bg-green-500'
    },
    tags: ['кредит', 'технология', 'ереже'],
    slug: 'credit-technology-regulation',
    publishedAt: '2018-10-31',
    featured: false,
    viewsCount: 3450,
    author: 'ҚР БҒМ'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: legalActsData.length },
  { id: 2, name: 'Заңдар', slug: 'laws', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Ережелер', slug: 'regulations', color: 'bg-green-500', count: 2 },
  { id: 4, name: 'Қағидалар', slug: 'rules', color: 'bg-purple-500', count: 3 },
  { id: 5, name: 'Стандарттар', slug: 'standards', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Нұсқаулықтар', slug: 'guidelines', color: 'bg-teal-500', count: 1 }
]

export default function LegalActsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Справочная информация', href: '/reference', translationKey: 'reference.title' },
    { title: 'Нормативно-правовые акты', translationKey: 'reference.legalActs' }
  ]

  return (
    <NewsListPage
      title="Нормативно-правовые акты"
      description="Білім беру саласындағы нормативтік-құқықтық актілер, заңдар, ережелер және қағидалар"
      breadcrumbs={breadcrumbs}
      baseUrl="/reference/legal-acts"
      mockData={legalActsData}
      categories={categories}
    />
  )
}
