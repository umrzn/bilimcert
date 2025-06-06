'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const agreementsData = [
  {
    id: 1,
    title: 'Лиссабон конвенциясы - Еуропа аймағындағы жоғары білім беру біліктіліктерін тану туралы',
    excerpt: 'Еуропа Кеңесі мен UNESCO-ның жоғары білім беру біліктіліктерін тану туралы конвенциясы',
    content: 'Толық мәтін...',
    image: '/images/agreements/lisbon-convention.jpg',
    category: {
      id: 1,
      name: 'UNESCO конвенциялары',
      slug: 'unesco-conventions',
      color: 'bg-blue-500'
    },
    tags: ['Лиссабон', 'конвенция', 'тану'],
    slug: 'lisbon-recognition-convention',
    publishedAt: '1997-04-11',
    featured: true,
    viewsCount: 4250,
    author: 'UNESCO/Council of Europe'
  },
  {
    id: 2,
    title: 'Болон декларациясы - Еуропалық жоғары білім беру кеңістігі туралы',
    excerpt: '29 еуропалық елдің жоғары білім беру жүйелерін үйлестіру туралы декларациясы',
    content: 'Толық мәтін...',
    image: '/images/agreements/bologna-declaration.jpg',
    category: {
      id: 2,
      name: 'Болон процесі',
      slug: 'bologna-process',
      color: 'bg-green-500'
    },
    tags: ['Болон', 'декларация', 'Еуропа'],
    slug: 'bologna-declaration-1999',
    publishedAt: '1999-06-19',
    featured: true,
    viewsCount: 3890,
    author: 'Bologna Process'
  },
  {
    id: 3,
    title: 'Азия-Тынық мұхиты аймағындағы жоғары білім беру біліктіліктерін тану туралы конвенция',
    excerpt: 'UNESCO-ның Азия-Тынық мұхиты аймағы үшін аймақтық конвенциясы',
    content: 'Толық мәтін...',
    image: '/images/agreements/asia-pacific-convention.jpg',
    category: {
      id: 1,
      name: 'UNESCO конвенциялары',
      slug: 'unesco-conventions',
      color: 'bg-blue-500'
    },
    tags: ['Азия-Тынық мұхиты', 'конвенция', 'аймақтық'],
    slug: 'asia-pacific-recognition-convention',
    publishedAt: '1983-12-16',
    featured: false,
    viewsCount: 2150,
    author: 'UNESCO'
  },
  {
    id: 4,
    title: 'ТМД елдері арасындағы білім беру саласындағы ынтымақтастық туралы келісім',
    excerpt: 'Тәуелсіз Мемлекеттер Достастығы елдері арасындағы білім беру ынтымақтастығы',
    content: 'Толық мәтін...',
    image: '/images/agreements/cis-education-agreement.jpg',
    category: {
      id: 3,
      name: 'ТМД келісімдері',
      slug: 'cis-agreements',
      color: 'bg-purple-500'
    },
    tags: ['ТМД', 'ынтымақтастық', 'білім'],
    slug: 'cis-education-cooperation-agreement',
    publishedAt: '1992-10-15',
    featured: false,
    viewsCount: 1890,
    author: 'ТМД'
  },
  {
    id: 5,
    title: 'ШЫҰ елдері арасындағы білім беру ынтымақтастығы туралы келісім',
    excerpt: 'Шанхай Ынтымақтастық Ұйымы елдері арасындағы білім беру саласындағы келісім',
    content: 'Толық мәтін...',
    image: '/images/agreements/sco-education-agreement.jpg',
    category: {
      id: 4,
      name: 'ШЫҰ келісімдері',
      slug: 'sco-agreements',
      color: 'bg-orange-500'
    },
    tags: ['ШЫҰ', 'ынтымақтастық', 'білім'],
    slug: 'sco-education-cooperation-agreement',
    publishedAt: '2006-06-15',
    featured: false,
    viewsCount: 1650,
    author: 'ШЫҰ'
  },
  {
    id: 6,
    title: 'Қазақстан-Ресей арасындағы білім беру саласындағы ынтымақтастық туралы келісім',
    excerpt: 'Екіжақты ынтымақтастық және дипломдарды өзара тану туралы келісім',
    content: 'Толық мәтін...',
    image: '/images/agreements/kazakhstan-russia-agreement.jpg',
    category: {
      id: 5,
      name: 'Екіжақты келісімдер',
      slug: 'bilateral-agreements',
      color: 'bg-red-500'
    },
    tags: ['Қазақстан', 'Ресей', 'екіжақты'],
    slug: 'kazakhstan-russia-education-agreement',
    publishedAt: '2013-05-29',
    featured: false,
    viewsCount: 2450,
    author: 'ҚР-РФ'
  },
  {
    id: 7,
    title: 'Қазақстан-Қытай арасындағы білім беру ынтымақтастығы туралы меморандум',
    excerpt: 'Стратегиялық серіктестік шеңберіндегі білім беру ынтымақтастығы',
    content: 'Толық мәтін...',
    image: '/images/agreements/kazakhstan-china-memorandum.jpg',
    category: {
      id: 5,
      name: 'Екіжақты келісімдер',
      slug: 'bilateral-agreements',
      color: 'bg-red-500'
    },
    tags: ['Қазақстан', 'Қытай', 'меморандум'],
    slug: 'kazakhstan-china-education-memorandum',
    publishedAt: '2017-09-07',
    featured: false,
    viewsCount: 1950,
    author: 'ҚР-ҚХР'
  },
  {
    id: 8,
    title: 'Түркі тілдес мемлекеттер ынтымақтастық кеңесі білім беру келісімі',
    excerpt: 'Түркі әлемі елдері арасындағы білім беру және мәдени ынтымақтастық',
    content: 'Толық мәтін...',
    image: '/images/agreements/turkic-council-agreement.jpg',
    category: {
      id: 6,
      name: 'Аймақтық келісімдер',
      slug: 'regional-agreements',
      color: 'bg-teal-500'
    },
    tags: ['Түркі кеңесі', 'мәдени', 'ынтымақтастық'],
    slug: 'turkic-council-education-agreement',
    publishedAt: '2019-10-15',
    featured: false,
    viewsCount: 1350,
    author: 'Түркі кеңесі'
  },
  {
    id: 9,
    title: 'Ислам ынтымақтастық ұйымы білім беру бағдарламасы',
    excerpt: 'ИЫҰ елдері арасындағы білім беру ынтымақтастығы және стипендиялық бағдарламалар',
    content: 'Толық мәтін...',
    image: '/images/agreements/oic-education-program.jpg',
    category: {
      id: 7,
      name: 'Халықаралық ұйымдар',
      slug: 'international-organizations',
      color: 'bg-indigo-500'
    },
    tags: ['ИЫҰ', 'стипендия', 'бағдарлама'],
    slug: 'oic-education-program',
    publishedAt: '2015-03-20',
    featured: false,
    viewsCount: 1150,
    author: 'ИЫҰ'
  },
  {
    id: 10,
    title: 'Еуразиялық экономикалық одақ білім беру келісімі',
    excerpt: 'ЕАЭО елдері арасындағы білім беру қызметтері нарығын дамыту туралы келісім',
    content: 'Толық мәтін...',
    image: '/images/agreements/eaeu-education-agreement.jpg',
    category: {
      id: 8,
      name: 'ЕАЭО келісімдері',
      slug: 'eaeu-agreements',
      color: 'bg-yellow-500'
    },
    tags: ['ЕАЭО', 'нарық', 'қызметтер'],
    slug: 'eaeu-education-services-agreement',
    publishedAt: '2016-12-26',
    featured: false,
    viewsCount: 1750,
    author: 'ЕАЭО'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: agreementsData.length },
  { id: 2, name: 'UNESCO конвенциялары', slug: 'unesco-conventions', color: 'bg-blue-500', count: 2 },
  { id: 3, name: 'Болон процесі', slug: 'bologna-process', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'ТМД келісімдері', slug: 'cis-agreements', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'ШЫҰ келісімдері', slug: 'sco-agreements', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Екіжақты келісімдер', slug: 'bilateral-agreements', color: 'bg-red-500', count: 2 },
  { id: 7, name: 'Аймақтық келісімдер', slug: 'regional-agreements', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Халықаралық ұйымдар', slug: 'international-organizations', color: 'bg-indigo-500', count: 1 },
  { id: 9, name: 'ЕАЭО келісімдері', slug: 'eaeu-agreements', color: 'bg-yellow-500', count: 1 }
]

export default function InternationalAgreementsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Справочная информация', href: '/reference', translationKey: 'reference.title' },
    { title: 'Международные соглашения', translationKey: 'reference.internationalAgreements' }
  ]

  return (
    <NewsListPage
      title="Международные соглашения"
      description="Халықаралық келісімдер, конвенциялар және білім беру саласындағы ынтымақтастық құжаттары"
      breadcrumbs={breadcrumbs}
      baseUrl="/reference/international-agreements"
      mockData={agreementsData}
      categories={categories}
    />
  )
}
