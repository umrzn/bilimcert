'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const unescoData = [
  {
    id: 1,
    title: 'UNESCO жаһандық білім беру конвенциясы 2019',
    excerpt: 'Жоғары білім беру біліктіліктерін тану туралы жаһандық конвенция',
    content: 'Толық мәтін...',
    image: '/images/unesco/global-convention-2019.jpg',
    category: {
      id: 1,
      name: 'Конвенциялар',
      slug: 'conventions',
      color: 'bg-blue-500'
    },
    tags: ['конвенция', 'жаһандық', 'тану'],
    slug: 'unesco-global-education-convention-2019',
    publishedAt: '2019-11-25',
    featured: true,
    viewsCount: 2450,
    author: 'UNESCO'
  },
  {
    id: 2,
    title: 'Тұрақты даму мақсаты 4: Сапалы білім',
    excerpt: 'UNESCO-ның тұрақты даму мақсаттары шеңберіндегі білім беру бағдарламалары',
    content: 'Толық мәтін...',
    image: '/images/unesco/sdg4-quality-education.jpg',
    category: {
      id: 2,
      name: 'Тұрақты даму',
      slug: 'sustainable-development',
      color: 'bg-green-500'
    },
    tags: ['SDG4', 'сапалы білім', 'тұрақты даму'],
    slug: 'sdg4-quality-education-unesco',
    publishedAt: '2024-01-20',
    featured: true,
    viewsCount: 1890,
    author: 'UNESCO'
  },
  {
    id: 3,
    title: 'Білім беру 2030 күн тәртібі',
    excerpt: 'UNESCO-ның 2030 жылға дейінгі білім беру саласындағы стратегиялық күн тәртібі',
    content: 'Толық мәтін...',
    image: '/images/unesco/education-2030-agenda.jpg',
    category: {
      id: 3,
      name: 'Стратегиялар',
      slug: 'strategies',
      color: 'bg-purple-500'
    },
    tags: ['2030', 'күн тәртібі', 'стратегия'],
    slug: 'education-2030-agenda-unesco',
    publishedAt: '2023-12-15',
    featured: false,
    viewsCount: 1650,
    author: 'UNESCO'
  },
  {
    id: 4,
    title: 'Жоғары білім беру саласындағы AI этикасы',
    excerpt: 'Жасанды интеллект технологияларын білім беруде этикалық қолдану туралы ұсынымдар',
    content: 'Толық мәтін...',
    image: '/images/unesco/ai-ethics-education.jpg',
    category: {
      id: 4,
      name: 'Технологиялар',
      slug: 'technologies',
      color: 'bg-red-500'
    },
    tags: ['AI', 'этика', 'технология'],
    slug: 'ai-ethics-higher-education-unesco',
    publishedAt: '2023-11-30',
    featured: false,
    viewsCount: 1420,
    author: 'UNESCO'
  },
  {
    id: 5,
    title: 'Ашық ғылым және ашық білім ресурстары',
    excerpt: 'UNESCO-ның ашық ғылым мен ашық білім ресурстарын дамыту бойынша бастамалары',
    content: 'Толық мәтін...',
    image: '/images/unesco/open-science-education.jpg',
    category: {
      id: 5,
      name: 'Ашық ресурстар',
      slug: 'open-resources',
      color: 'bg-orange-500'
    },
    tags: ['ашық ғылым', 'OER', 'ресурстар'],
    slug: 'open-science-education-resources-unesco',
    publishedAt: '2023-10-25',
    featured: false,
    viewsCount: 1280,
    author: 'UNESCO'
  },
  {
    id: 6,
    title: 'Гендерлік теңдік жоғары білім беруде',
    excerpt: 'Жоғары білім беру саласындағы гендерлік теңдікті қамтамасыз ету жөніндегі бағдарлама',
    content: 'Толық мәтін...',
    image: '/images/unesco/gender-equality-education.jpg',
    category: {
      id: 6,
      name: 'Теңдік',
      slug: 'equality',
      color: 'bg-pink-500'
    },
    tags: ['гендер', 'теңдік', 'инклюзия'],
    slug: 'gender-equality-higher-education-unesco',
    publishedAt: '2023-09-20',
    featured: false,
    viewsCount: 1150,
    author: 'UNESCO'
  },
  {
    id: 7,
    title: 'Климат өзгерісі және білім беру',
    excerpt: 'Климат өзгерісіне байланысты білім беру саласындағы бейімделу стратегиялары',
    content: 'Толық мәтін...',
    image: '/images/unesco/climate-change-education.jpg',
    category: {
      id: 2,
      name: 'Тұрақты даму',
      slug: 'sustainable-development',
      color: 'bg-green-500'
    },
    tags: ['климат', 'өзгеріс', 'бейімделу'],
    slug: 'climate-change-education-unesco',
    publishedAt: '2023-08-15',
    featured: false,
    viewsCount: 980,
    author: 'UNESCO'
  },
  {
    id: 8,
    title: 'Цифрлық дағдылар мен сауаттылық',
    excerpt: 'XXI ғасырдағы цифрлық дағдылар мен медиа сауаттылығын дамыту бағдарламалары',
    content: 'Толық мәтін...',
    image: '/images/unesco/digital-literacy.jpg',
    category: {
      id: 4,
      name: 'Технологиялар',
      slug: 'technologies',
      color: 'bg-red-500'
    },
    tags: ['цифрлық', 'дағдылар', 'сауаттылық'],
    slug: 'digital-skills-literacy-unesco',
    publishedAt: '2023-07-10',
    featured: false,
    viewsCount: 850,
    author: 'UNESCO'
  },
  {
    id: 9,
    title: 'Мәдени алуандық пен білім беру',
    excerpt: 'Мәдени алуандықты сақтау және дамыту арқылы білім беру сапасын арттыру',
    content: 'Толық мәтін...',
    image: '/images/unesco/cultural-diversity-education.jpg',
    category: {
      id: 7,
      name: 'Мәдениет',
      slug: 'culture',
      color: 'bg-teal-500'
    },
    tags: ['мәдениет', 'алуандық', 'дәстүр'],
    slug: 'cultural-diversity-education-unesco',
    publishedAt: '2023-06-20',
    featured: false,
    viewsCount: 720,
    author: 'UNESCO'
  },
  {
    id: 10,
    title: 'Жаһандық азаматтық білім беру',
    excerpt: 'Жаһандық азаматтық пен мәдениетаралық түсіністікті дамыту бағдарламалары',
    content: 'Толық мәтін...',
    image: '/images/unesco/global-citizenship-education.jpg',
    category: {
      id: 8,
      name: 'Азаматтық',
      slug: 'citizenship',
      color: 'bg-indigo-500'
    },
    tags: ['азаматтық', 'жаһандық', 'түсіністік'],
    slug: 'global-citizenship-education-unesco',
    publishedAt: '2023-05-15',
    featured: false,
    viewsCount: 650,
    author: 'UNESCO'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: unescoData.length },
  { id: 2, name: 'Конвенциялар', slug: 'conventions', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Тұрақты даму', slug: 'sustainable-development', color: 'bg-green-500', count: 2 },
  { id: 4, name: 'Стратегиялар', slug: 'strategies', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Технологиялар', slug: 'technologies', color: 'bg-red-500', count: 2 },
  { id: 6, name: 'Ашық ресурстар', slug: 'open-resources', color: 'bg-orange-500', count: 1 },
  { id: 7, name: 'Теңдік', slug: 'equality', color: 'bg-pink-500', count: 1 },
  { id: 8, name: 'Мәдениет', slug: 'culture', color: 'bg-teal-500', count: 1 },
  { id: 9, name: 'Азаматтық', slug: 'citizenship', color: 'bg-indigo-500', count: 1 }
]

export default function BolognaUnescoPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Болонский процесс', href: '/bologna-process', translationKey: 'bologna.title' },
    { title: 'UNESCO', translationKey: 'bologna.unesco' }
  ]

  return (
    <NewsListPage
      title="UNESCO"
      description="UNESCO-мен ынтымақтастық, халықаралық білім беру бағдарламалары және тұрақты даму мақсаттары"
      breadcrumbs={breadcrumbs}
      baseUrl="/bologna-process/unesco"
      mockData={unescoData}
      categories={categories}
    />
  )
}
