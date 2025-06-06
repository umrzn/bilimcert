'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const seminarsData = [
  {
    id: 1,
    title: 'Реестр жүйесін пайдалану бойынша базалық семинар',
    excerpt: 'Білім беру ұйымдары үшін реестр жүйесінің негізгі функцияларын үйрену семинары',
    content: 'Толық мәтін...',
    image: '/images/seminars/basic-registry-seminar.jpg',
    category: {
      id: 1,
      name: 'Базалық семинарлар',
      slug: 'basic-seminars',
      color: 'bg-blue-500'
    },
    tags: ['базалық', 'семинар', 'негіздер'],
    slug: 'basic-registry-system-seminar',
    publishedAt: '2024-01-25',
    featured: true,
    viewsCount: 1850,
    author: 'BilimCert'
  },
  {
    id: 2,
    title: 'Деректерді енгізу және жаңарту тренингі',
    excerpt: 'Реестрге білім беру бағдарламалары туралы ақпаратты дұрыс енгізу әдістемесі',
    content: 'Толық мәтін...',
    image: '/images/seminars/data-entry-training.jpg',
    category: {
      id: 2,
      name: 'Тренингтер',
      slug: 'trainings',
      color: 'bg-green-500'
    },
    tags: ['тренинг', 'деректер', 'енгізу'],
    slug: 'data-entry-update-training',
    publishedAt: '2024-01-15',
    featured: true,
    viewsCount: 1650,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'Реестр деректерінің сапасын қамтамасыз ету семинары',
    excerpt: 'Реестрдегі ақпараттың дұрыстығы мен толықтығын қамтамасыз ету жолдары',
    content: 'Толық мәтін...',
    image: '/images/seminars/data-quality-seminar.jpg',
    category: {
      id: 3,
      name: 'Сапа семинарлары',
      slug: 'quality-seminars',
      color: 'bg-purple-500'
    },
    tags: ['сапа', 'деректер', 'қамтамасыз ету'],
    slug: 'registry-data-quality-seminar',
    publishedAt: '2023-12-20',
    featured: false,
    viewsCount: 1420,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'Реестр статистикасын талдау мастер-класы',
    excerpt: 'Реестр деректері негізінде статистикалық талдау жүргізу әдістері',
    content: 'Толық мәтін...',
    image: '/images/seminars/statistics-analysis-masterclass.jpg',
    category: {
      id: 4,
      name: 'Мастер-кластар',
      slug: 'masterclasses',
      color: 'bg-orange-500'
    },
    tags: ['мастер-класс', 'статистика', 'талдау'],
    slug: 'registry-statistics-analysis-masterclass',
    publishedAt: '2023-11-30',
    featured: false,
    viewsCount: 1280,
    author: 'BilimCert'
  },
  {
    id: 5,
    title: 'Реестр API интеграциясы бойынша техникалық семинар',
    excerpt: 'Реестр жүйесімен API арқылы интеграциялау және автоматтандыру',
    content: 'Толық мәтін...',
    image: '/images/seminars/api-integration-seminar.jpg',
    category: {
      id: 5,
      name: 'Техникалық семинарлар',
      slug: 'technical-seminars',
      color: 'bg-red-500'
    },
    tags: ['API', 'интеграция', 'техникалық'],
    slug: 'registry-api-integration-seminar',
    publishedAt: '2023-10-25',
    featured: false,
    viewsCount: 950,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'Реестр есептерін құру және экспорттау',
    excerpt: 'Реестр жүйесінен әртүрлі форматтарда есептер алу және талдау',
    content: 'Толық мәтін...',
    image: '/images/seminars/reports-export-seminar.jpg',
    category: {
      id: 2,
      name: 'Тренингтер',
      slug: 'trainings',
      color: 'bg-green-500'
    },
    tags: ['есептер', 'экспорт', 'талдау'],
    slug: 'registry-reports-export-seminar',
    publishedAt: '2023-09-15',
    featured: false,
    viewsCount: 1150,
    author: 'BilimCert'
  },
  {
    id: 7,
    title: 'Реестр қауіпсіздігі және деректерді қорғау',
    excerpt: 'Реестр жүйесінде ақпараттық қауіпсіздікті қамтамасыз ету шаралары',
    content: 'Толық мәтін...',
    image: '/images/seminars/security-protection-seminar.jpg',
    category: {
      id: 6,
      name: 'Қауіпсіздік семинарлары',
      slug: 'security-seminars',
      color: 'bg-teal-500'
    },
    tags: ['қауіпсіздік', 'қорғау', 'деректер'],
    slug: 'registry-security-data-protection-seminar',
    publishedAt: '2023-08-20',
    featured: false,
    viewsCount: 890,
    author: 'BilimCert'
  },
  {
    id: 8,
    title: 'Реестр мониторингі және бақылау жүйесі',
    excerpt: 'Реестр деректерінің сапасын үздіксіз мониторингтеу механизмдері',
    content: 'Толық мәтін...',
    image: '/images/seminars/monitoring-control-seminar.jpg',
    category: {
      id: 7,
      name: 'Мониторинг семинарлары',
      slug: 'monitoring-seminars',
      color: 'bg-indigo-500'
    },
    tags: ['мониторинг', 'бақылау', 'жүйе'],
    slug: 'registry-monitoring-control-system-seminar',
    publishedAt: '2023-07-10',
    featured: false,
    viewsCount: 750,
    author: 'BilimCert'
  },
  {
    id: 9,
    title: 'Реестр пайдаланушыларына арналған кеңес беру сессиясы',
    excerpt: 'Реестр жүйесін пайдалану бойынша жеке кеңес беру және сұрақтарға жауап',
    content: 'Толық мәтін...',
    image: '/images/seminars/consultation-session.jpg',
    category: {
      id: 8,
      name: 'Кеңес беру',
      slug: 'consultations',
      color: 'bg-pink-500'
    },
    tags: ['кеңес беру', 'сессия', 'сұрақтар'],
    slug: 'registry-users-consultation-session',
    publishedAt: '2023-06-25',
    featured: false,
    viewsCount: 650,
    author: 'BilimCert'
  },
  {
    id: 10,
    title: 'Реестр жүйесінің жаңа функциялары презентациясы',
    excerpt: 'Реестр жүйесіне қосылған жаңа мүмкіндіктер мен функциялармен танысу',
    content: 'Толық мәтін...',
    image: '/images/seminars/new-features-presentation.jpg',
    category: {
      id: 9,
      name: 'Презентациялар',
      slug: 'presentations',
      color: 'bg-yellow-500'
    },
    tags: ['жаңа функциялар', 'презентация', 'мүмкіндіктер'],
    slug: 'registry-new-features-presentation',
    publishedAt: '2023-05-30',
    featured: false,
    viewsCount: 1350,
    author: 'BilimCert'
  },
  {
    id: 11,
    title: 'Реестр деректерін бэкап және қалпына келтіру',
    excerpt: 'Реестр ақпаратын сақтық көшірмелеу және апаттан кейін қалпына келтіру',
    content: 'Толық мәтін...',
    image: '/images/seminars/backup-recovery-seminar.jpg',
    category: {
      id: 5,
      name: 'Техникалық семинарлар',
      slug: 'technical-seminars',
      color: 'bg-red-500'
    },
    tags: ['бэкап', 'қалпына келтіру', 'сақтық көшірме'],
    slug: 'registry-backup-recovery-seminar',
    publishedAt: '2023-04-15',
    featured: false,
    viewsCount: 580,
    author: 'BilimCert'
  },
  {
    id: 12,
    title: 'Реестр жүйесін оңтайландыру және өнімділік',
    excerpt: 'Реестр жүйесінің жұмыс өнімділігін арттыру және оңтайландыру әдістері',
    content: 'Толық мәтін...',
    image: '/images/seminars/optimization-performance-seminar.jpg',
    category: {
      id: 5,
      name: 'Техникалық семинарлар',
      slug: 'technical-seminars',
      color: 'bg-red-500'
    },
    tags: ['оңтайландыру', 'өнімділік', 'жүйе'],
    slug: 'registry-optimization-performance-seminar',
    publishedAt: '2023-03-20',
    featured: false,
    viewsCount: 720,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: seminarsData.length },
  { id: 2, name: 'Базалық семинарлар', slug: 'basic-seminars', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Тренингтер', slug: 'trainings', color: 'bg-green-500', count: 2 },
  { id: 4, name: 'Сапа семинарлары', slug: 'quality-seminars', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Мастер-кластар', slug: 'masterclasses', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Техникалық семинарлар', slug: 'technical-seminars', color: 'bg-red-500', count: 3 },
  { id: 7, name: 'Қауіпсіздік семинарлары', slug: 'security-seminars', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Мониторинг семинарлары', slug: 'monitoring-seminars', color: 'bg-indigo-500', count: 1 },
  { id: 9, name: 'Кеңес беру', slug: 'consultations', color: 'bg-pink-500', count: 1 },
  { id: 10, name: 'Презентациялар', slug: 'presentations', color: 'bg-yellow-500', count: 1 }
]

export default function RegistrySeminarsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Реестр ОП', href: '/registry', translationKey: 'registry.title' },
    { title: 'Семинары реестра', translationKey: 'registry.seminars' }
  ]

  return (
    <NewsListPage
      title="Семинары реестра"
      description="Реестр жүргізу бойынша семинарлар, тренингтер және оқу іс-шаралары"
      breadcrumbs={breadcrumbs}
      baseUrl="/registry/seminars"
      mockData={seminarsData}
      categories={categories}
    />
  )
}
