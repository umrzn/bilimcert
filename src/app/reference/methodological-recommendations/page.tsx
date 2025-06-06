'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const methodologicalData = [
  {
    id: 1,
    title: 'Білім беру бағдарламаларын әзірлеу бойынша әдістемелік ұсынымдар',
    excerpt: 'Жоғары білім беру бағдарламаларын әзірлеу және жетілдіру жөніндегі толық нұсқаулық',
    content: 'Толық мәтін...',
    image: '/images/methodological/program-development.jpg',
    category: {
      id: 1,
      name: 'Бағдарлама әзірлеу',
      slug: 'program-development',
      color: 'bg-blue-500'
    },
    tags: ['бағдарлама', 'әзірлеу', 'әдістеме'],
    slug: 'educational-program-development-guidelines',
    publishedAt: '2023-09-15',
    featured: true,
    viewsCount: 3250,
    author: 'BilimCert'
  },
  {
    id: 2,
    title: 'Сапа қамтамасыз ету жүйесін енгізу бойынша ұсынымдар',
    excerpt: 'Білім беру ұйымдарында ішкі сапа қамтамасыз ету жүйесін құру нұсқаулығы',
    content: 'Толық мәтін...',
    image: '/images/methodological/quality-assurance.jpg',
    category: {
      id: 2,
      name: 'Сапа қамтамасыз ету',
      slug: 'quality-assurance',
      color: 'bg-green-500'
    },
    tags: ['сапа', 'жүйе', 'енгізу'],
    slug: 'quality-assurance-system-implementation',
    publishedAt: '2023-08-20',
    featured: true,
    viewsCount: 2890,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'Аккредиттеуге дайындық бойынша әдістемелік нұсқаулық',
    excerpt: 'Білім беру ұйымдарының аккредиттеу процедурасына дайындалу жөніндегі ұсынымдар',
    content: 'Толық мәтін...',
    image: '/images/methodological/accreditation-preparation.jpg',
    category: {
      id: 3,
      name: 'Аккредиттеу',
      slug: 'accreditation',
      color: 'bg-purple-500'
    },
    tags: ['аккредиттеу', 'дайындық', 'процедура'],
    slug: 'accreditation-preparation-guidelines',
    publishedAt: '2023-07-10',
    featured: false,
    viewsCount: 4150,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'Студенттерді бағалау әдістемесі',
    excerpt: 'Студенттердің оқу жетістіктерін бағалаудың заманауи әдістері мен тәсілдері',
    content: 'Толық мәтін...',
    image: '/images/methodological/student-assessment.jpg',
    category: {
      id: 4,
      name: 'Бағалау әдістемесі',
      slug: 'assessment-methodology',
      color: 'bg-orange-500'
    },
    tags: ['бағалау', 'студенттер', 'әдістеме'],
    slug: 'student-assessment-methodology',
    publishedAt: '2023-06-25',
    featured: false,
    viewsCount: 2650,
    author: 'BilimCert'
  },
  {
    id: 5,
    title: 'Оқытушылардың біліктілігін арттыру бағдарламасы',
    excerpt: 'Жоғары оқу орындары оқытушыларының кәсіби дамуын қамтамасыз ету жолдары',
    content: 'Толық мәтін...',
    image: '/images/methodological/faculty-development.jpg',
    category: {
      id: 5,
      name: 'Кәсіби даму',
      slug: 'professional-development',
      color: 'bg-red-500'
    },
    tags: ['оқытушылар', 'біліктілік', 'даму'],
    slug: 'faculty-professional-development-program',
    publishedAt: '2023-05-30',
    featured: false,
    viewsCount: 2150,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'Цифрлық технологияларды білім беруде қолдану',
    excerpt: 'Заманауи цифрлық құралдар мен платформаларды оқу процесіне енгізу әдістемесі',
    content: 'Толық мәтін...',
    image: '/images/methodological/digital-technologies.jpg',
    category: {
      id: 6,
      name: 'Цифрлық технологиялар',
      slug: 'digital-technologies',
      color: 'bg-teal-500'
    },
    tags: ['цифрлық', 'технологиялар', 'инновация'],
    slug: 'digital-technologies-in-education',
    publishedAt: '2023-04-15',
    featured: false,
    viewsCount: 3450,
    author: 'BilimCert'
  },
  {
    id: 7,
    title: 'Инклюзивті білім беруді ұйымдастыру',
    excerpt: 'Ерекше қажеттіліктері бар студенттер үшін қолайлы білім беру ортасын құру',
    content: 'Толық мәтін...',
    image: '/images/methodological/inclusive-education.jpg',
    category: {
      id: 7,
      name: 'Инклюзивті білім',
      slug: 'inclusive-education',
      color: 'bg-pink-500'
    },
    tags: ['инклюзия', 'қолжетімділік', 'теңдік'],
    slug: 'inclusive-education-organization',
    publishedAt: '2023-03-20',
    featured: false,
    viewsCount: 1890,
    author: 'BilimCert'
  },
  {
    id: 8,
    title: 'Халықаралық ынтымақтастықты дамыту стратегиясы',
    excerpt: 'Жоғары оқу орындарының халықаралық серіктестікті кеңейту жолдары',
    content: 'Толық мәтін...',
    image: '/images/methodological/international-cooperation.jpg',
    category: {
      id: 8,
      name: 'Халықаралық ынтымақтастық',
      slug: 'international-cooperation',
      color: 'bg-indigo-500'
    },
    tags: ['халықаралық', 'ынтымақтастық', 'серіктестік'],
    slug: 'international-cooperation-development-strategy',
    publishedAt: '2023-02-28',
    featured: false,
    viewsCount: 2250,
    author: 'BilimCert'
  },
  {
    id: 9,
    title: 'Зерттеу қызметін ұйымдастыру әдістемесі',
    excerpt: 'Жоғары оқу орындарында ғылыми зерттеу жұмыстарын жүргізу принциптері',
    content: 'Толық мәтін...',
    image: '/images/methodological/research-methodology.jpg',
    category: {
      id: 9,
      name: 'Ғылыми зерттеулер',
      slug: 'research',
      color: 'bg-yellow-500'
    },
    tags: ['зерттеу', 'ғылым', 'әдістеме'],
    slug: 'research-activity-organization-methodology',
    publishedAt: '2023-01-25',
    featured: false,
    viewsCount: 1750,
    author: 'BilimCert'
  },
  {
    id: 10,
    title: 'Студенттердің академиялық ұтқырлығын қолдау',
    excerpt: 'Ұлттық және халықаралық академиялық ұтқырлық бағдарламаларын іске асыру',
    content: 'Толық мәтін...',
    image: '/images/methodological/academic-mobility.jpg',
    category: {
      id: 10,
      name: 'Академиялық ұтқырлық',
      slug: 'academic-mobility',
      color: 'bg-gray-600'
    },
    tags: ['ұтқырлық', 'студенттер', 'қолдау'],
    slug: 'student-academic-mobility-support',
    publishedAt: '2022-12-15',
    featured: false,
    viewsCount: 2950,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: methodologicalData.length },
  { id: 2, name: 'Бағдарлама әзірлеу', slug: 'program-development', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Сапа қамтамасыз ету', slug: 'quality-assurance', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'Аккредиттеу', slug: 'accreditation', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Бағалау әдістемесі', slug: 'assessment-methodology', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Кәсіби даму', slug: 'professional-development', color: 'bg-red-500', count: 1 },
  { id: 7, name: 'Цифрлық технологиялар', slug: 'digital-technologies', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Инклюзивті білім', slug: 'inclusive-education', color: 'bg-pink-500', count: 1 },
  { id: 9, name: 'Халықаралық ынтымақтастық', slug: 'international-cooperation', color: 'bg-indigo-500', count: 1 },
  { id: 10, name: 'Ғылыми зерттеулер', slug: 'research', color: 'bg-yellow-500', count: 1 },
  { id: 11, name: 'Академиялық ұтқырлық', slug: 'academic-mobility', color: 'bg-gray-600', count: 1 }
]

export default function MethodologicalRecommendationsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Справочная информация', href: '/reference', translationKey: 'reference.title' },
    { title: 'Методические рекомендации', translationKey: 'reference.methodologicalRecommendations' }
  ]

  return (
    <NewsListPage
      title="Методические рекомендации"
      description="Әдістемелік ұсынымдар, нұсқаулықтар және білім беру саласындағы ең жақсы тәжірибелер"
      breadcrumbs={breadcrumbs}
      baseUrl="/reference/methodological-recommendations"
      mockData={methodologicalData}
      categories={categories}
    />
  )
}
