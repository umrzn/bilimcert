'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const handbooksData = [
  {
    id: 1,
    title: 'Мамандықтардың мемлекеттік классификаторы',
    excerpt: 'Қазақстан Республикасындағы жоғары білім беру мамандықтарының толық классификаторы',
    content: 'Толық мәтін...',
    image: '/images/handbooks/specialties-classifier.jpg',
    category: {
      id: 1,
      name: 'Классификаторлар',
      slug: 'classifiers',
      color: 'bg-blue-500'
    },
    tags: ['мамандықтар', 'классификатор', 'мемлекеттік'],
    slug: 'state-classifier-specialties',
    publishedAt: '2023-08-31',
    featured: true,
    viewsCount: 4250,
    author: 'ҚР БҒМ'
  },
  {
    id: 2,
    title: 'Білім беру саласының кодтар жүйесі',
    excerpt: 'Білім беру ұйымдары мен бағдарламаларға арналған бірыңғай кодтау жүйесі',
    content: 'Толық мәтін...',
    image: '/images/handbooks/education-codes.jpg',
    category: {
      id: 2,
      name: 'Кодтар жүйесі',
      slug: 'code-systems',
      color: 'bg-green-500'
    },
    tags: ['кодтар', 'жүйе', 'бірыңғай'],
    slug: 'education-sector-code-system',
    publishedAt: '2023-07-15',
    featured: true,
    viewsCount: 3150,
    author: 'ҚР БҒМ'
  },
  {
    id: 3,
    title: 'Жоғары оқу орындарының анықтамалығы',
    excerpt: 'Қазақстандағы барлық жоғары оқу орындарының толық анықтамалығы',
    content: 'Толық мәтін...',
    image: '/images/handbooks/universities-directory.jpg',
    category: {
      id: 3,
      name: 'Анықтамалықтар',
      slug: 'directories',
      color: 'bg-purple-500'
    },
    tags: ['ЖОО', 'анықтамалық', 'университеттер'],
    slug: 'higher-education-institutions-directory',
    publishedAt: '2023-06-20',
    featured: false,
    viewsCount: 5890,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'Академиялық дәрежелер мен атақтар классификаторы',
    excerpt: 'Ғылыми дәрежелер мен академиялық атақтардың жүйеленген тізімі',
    content: 'Толық мәтін...',
    image: '/images/handbooks/academic-degrees-classifier.jpg',
    category: {
      id: 1,
      name: 'Классификаторлар',
      slug: 'classifiers',
      color: 'bg-blue-500'
    },
    tags: ['дәрежелер', 'атақтар', 'академиялық'],
    slug: 'academic-degrees-titles-classifier',
    publishedAt: '2023-05-10',
    featured: false,
    viewsCount: 2750,
    author: 'ҚР БҒМ'
  },
  {
    id: 5,
    title: 'Білім беру деңгейлерінің анықтамалығы',
    excerpt: 'Қазақстандағы білім беру жүйесінің барлық деңгейлерінің сипаттамасы',
    content: 'Толық мәтін...',
    image: '/images/handbooks/education-levels-guide.jpg',
    category: {
      id: 3,
      name: 'Анықтамалықтар',
      slug: 'directories',
      color: 'bg-purple-500'
    },
    tags: ['деңгейлер', 'білім', 'жүйе'],
    slug: 'education-levels-reference-guide',
    publishedAt: '2023-04-25',
    featured: false,
    viewsCount: 3450,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'Халықаралық стандарттар мен эквиваленттер',
    excerpt: 'Қазақстандық білім беру жүйесінің халықаралық стандарттармен сәйкестігі',
    content: 'Толық мәтін...',
    image: '/images/handbooks/international-standards.jpg',
    category: {
      id: 4,
      name: 'Халықаралық стандарттар',
      slug: 'international-standards',
      color: 'bg-orange-500'
    },
    tags: ['халықаралық', 'стандарттар', 'эквивалент'],
    slug: 'international-standards-equivalents',
    publishedAt: '2023-03-30',
    featured: false,
    viewsCount: 2890,
    author: 'BilimCert'
  },
  {
    id: 7,
    title: 'Сапа көрсеткіштерінің анықтамалығы',
    excerpt: 'Білім беру сапасын бағалаудағы негізгі көрсеткіштер мен критерийлер',
    content: 'Толық мәтін...',
    image: '/images/handbooks/quality-indicators.jpg',
    category: {
      id: 3,
      name: 'Анықтамалықтар',
      slug: 'directories',
      color: 'bg-purple-500'
    },
    tags: ['сапа', 'көрсеткіштер', 'критерийлер'],
    slug: 'quality-indicators-reference',
    publishedAt: '2023-02-15',
    featured: false,
    viewsCount: 2150,
    author: 'BilimCert'
  },
  {
    id: 8,
    title: 'Аккредиттеу терминдерінің сөздігі',
    excerpt: 'Аккредиттеу саласында қолданылатын терминдер мен анықтамалардың сөздігі',
    content: 'Толық мәтін...',
    image: '/images/handbooks/accreditation-glossary.jpg',
    category: {
      id: 5,
      name: 'Сөздіктер',
      slug: 'glossaries',
      color: 'bg-red-500'
    },
    tags: ['терминдер', 'сөздік', 'аккредиттеу'],
    slug: 'accreditation-terms-glossary',
    publishedAt: '2023-01-20',
    featured: false,
    viewsCount: 1890,
    author: 'BilimCert'
  },
  {
    id: 9,
    title: 'Құжаттар түрлерінің классификаторы',
    excerpt: 'Білім беру саласында қолданылатын құжаттардың түрлері мен форматтары',
    content: 'Толық мәтін...',
    image: '/images/handbooks/documents-classifier.jpg',
    category: {
      id: 1,
      name: 'Классификаторлар',
      slug: 'classifiers',
      color: 'bg-blue-500'
    },
    tags: ['құжаттар', 'түрлер', 'форматтар'],
    slug: 'document-types-classifier',
    publishedAt: '2022-12-10',
    featured: false,
    viewsCount: 2650,
    author: 'ҚР БҒМ'
  },
  {
    id: 10,
    title: 'Статистикалық есептілік формаларының анықтамалығы',
    excerpt: 'Білім беру ұйымдары үшін статистикалық есептілік формалары мен нұсқаулықтар',
    content: 'Толық мәтін...',
    image: '/images/handbooks/statistical-forms.jpg',
    category: {
      id: 6,
      name: 'Есептілік формалары',
      slug: 'reporting-forms',
      color: 'bg-teal-500'
    },
    tags: ['статистика', 'есептілік', 'формалар'],
    slug: 'statistical-reporting-forms-guide',
    publishedAt: '2022-11-25',
    featured: false,
    viewsCount: 1750,
    author: 'ҚР БҒМ'
  },
  {
    id: 11,
    title: 'Кредиттік жүйе есептеулерінің анықтамалығы',
    excerpt: 'ECTS кредиттерін есептеу және трансфер жасау жөніндегі практикалық нұсқаулық',
    content: 'Толық мәтін...',
    image: '/images/handbooks/credit-system-calculations.jpg',
    category: {
      id: 3,
      name: 'Анықтамалықтар',
      slug: 'directories',
      color: 'bg-purple-500'
    },
    tags: ['кредиттер', 'есептеулер', 'ECTS'],
    slug: 'credit-system-calculations-guide',
    publishedAt: '2022-10-15',
    featured: false,
    viewsCount: 3250,
    author: 'BilimCert'
  },
  {
    id: 12,
    title: 'Мобильность бағдарламаларының каталогы',
    excerpt: 'Ұлттық және халықаралық академиялық мобильность бағдарламаларының каталогы',
    content: 'Толық мәтін...',
    image: '/images/handbooks/mobility-programs-catalog.jpg',
    category: {
      id: 7,
      name: 'Каталогтар',
      slug: 'catalogs',
      color: 'bg-indigo-500'
    },
    tags: ['мобильность', 'бағдарламалар', 'каталог'],
    slug: 'mobility-programs-catalog',
    publishedAt: '2022-09-30',
    featured: false,
    viewsCount: 2450,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: handbooksData.length },
  { id: 2, name: 'Классификаторлар', slug: 'classifiers', color: 'bg-blue-500', count: 3 },
  { id: 3, name: 'Кодтар жүйесі', slug: 'code-systems', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'Анықтамалықтар', slug: 'directories', color: 'bg-purple-500', count: 4 },
  { id: 5, name: 'Халықаралық стандарттар', slug: 'international-standards', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Сөздіктер', slug: 'glossaries', color: 'bg-red-500', count: 1 },
  { id: 7, name: 'Есептілік формалары', slug: 'reporting-forms', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Каталогтар', slug: 'catalogs', color: 'bg-indigo-500', count: 1 }
]

export default function HandbooksClassifiersPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Справочная информация', href: '/reference', translationKey: 'reference.title' },
    { title: 'Справочники и классификаторы', translationKey: 'reference.handbooksClassifiers' }
  ]

  return (
    <NewsListPage
      title="Справочники и классификаторы"
      description="Анықтамалықтар, классификаторлар және білім беру саласындағы кодтар жүйесі"
      breadcrumbs={breadcrumbs}
      baseUrl="/reference/handbooks-classifiers"
      mockData={handbooksData}
      categories={categories}
    />
  )
}
