'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const eventsData = [
  {
    id: 1,
    title: 'Халықаралық білім беру сапасы конференциясы 2024',
    excerpt: 'Орталық Азия аймағындағы ең ірі білім беру сапасы жөніндегі халықаралық конференция',
    content: 'Толық мәтін...',
    image: '/images/events/quality-conference-2024.jpg',
    category: {
      id: 1,
      name: 'Конференциялар',
      slug: 'conferences',
      color: 'bg-blue-500'
    },
    tags: ['конференция', 'халықаралық', 'сапа'],
    slug: 'international-education-quality-conference-2024',
    publishedAt: '2024-01-20',
    featured: true,
    viewsCount: 2150,
    author: 'BilimCert'
  },
  {
    id: 2,
    title: 'Аккредиттеу сарапшыларын дайындау семинары',
    excerpt: 'Жаңа аккредиттеу сарапшыларын дайындау бойынша 5 күндік интенсивті семинар',
    content: 'Толық мәтін...',
    image: '/images/events/expert-training-seminar.jpg',
    category: {
      id: 2,
      name: 'Семинарлар',
      slug: 'seminars',
      color: 'bg-green-500'
    },
    tags: ['семинар', 'дайындау', 'сарапшылар'],
    slug: 'accreditation-experts-training-seminar',
    publishedAt: '2024-01-10',
    featured: true,
    viewsCount: 1890,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'Цифрлық трансформация форумы',
    excerpt: 'Білім беру саласындағы цифрлық технологиялар мен инновациялар туралы форум',
    content: 'Толық мәтін...',
    image: '/images/events/digital-transformation-forum.jpg',
    category: {
      id: 3,
      name: 'Форумдар',
      slug: 'forums',
      color: 'bg-purple-500'
    },
    tags: ['форум', 'цифрлық', 'инновация'],
    slug: 'digital-transformation-forum',
    publishedAt: '2023-12-15',
    featured: false,
    viewsCount: 1450,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'Болон процесі: жаңа мүмкіндіктер',
    excerpt: 'Болон процесінің жаңа міндеттері мен мүмкіндіктері туралы дөңгелек үстел',
    content: 'Толық мәтін...',
    image: '/images/events/bologna-process-roundtable.jpg',
    category: {
      id: 4,
      name: 'Дөңгелек үстелдер',
      slug: 'roundtables',
      color: 'bg-orange-500'
    },
    tags: ['Болон', 'процесс', 'дөңгелек үстел'],
    slug: 'bologna-process-new-opportunities',
    publishedAt: '2023-11-28',
    featured: false,
    viewsCount: 1120,
    author: 'BilimCert'
  },
  {
    id: 5,
    title: 'Студенттер арасындағы сапа байқауы',
    excerpt: 'Жоғары оқу орындарының студенттері арасындағы білім беру сапасы жөніндегі байқау',
    content: 'Толық мәтін...',
    image: '/images/events/student-quality-competition.jpg',
    category: {
      id: 5,
      name: 'Байқаулар',
      slug: 'competitions',
      color: 'bg-red-500'
    },
    tags: ['байқау', 'студенттер', 'сапа'],
    slug: 'student-quality-competition',
    publishedAt: '2023-10-20',
    featured: false,
    viewsCount: 980,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'Халықаралық сарапшылармен кездесу',
    excerpt: 'Еуропалық және Азиялық сапа агенттіктерінің сарапшыларымен кездесу',
    content: 'Толық мәтін...',
    image: '/images/events/international-experts-meeting.jpg',
    category: {
      id: 6,
      name: 'Кездесулер',
      slug: 'meetings',
      color: 'bg-teal-500'
    },
    tags: ['кездесу', 'сарапшылар', 'халықаралық'],
    slug: 'international-experts-meeting',
    publishedAt: '2023-09-30',
    featured: false,
    viewsCount: 850,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: eventsData.length },
  { id: 2, name: 'Конференциялар', slug: 'conferences', color: 'bg-blue-500', count: 1 },
  { id: 3, name: 'Семинарлар', slug: 'seminars', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'Форумдар', slug: 'forums', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Дөңгелек үстелдер', slug: 'roundtables', color: 'bg-orange-500', count: 1 },
  { id: 6, name: 'Байқаулар', slug: 'competitions', color: 'bg-red-500', count: 1 },
  { id: 7, name: 'Кездесулер', slug: 'meetings', color: 'bg-teal-500', count: 1 }
]

export default function EventsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'О Центре', href: '/about', translationKey: 'about.title' },
    { title: 'Мероприятия', translationKey: 'about.events' }
  ]

  return (
    <NewsListPage
      title="Мероприятия"
      description="BilimCert орталығы ұйымдастырған іс-шаралар, конференциялар мен семинарлар"
      breadcrumbs={breadcrumbs}
      baseUrl="/about/events"
      mockData={eventsData}
      categories={categories}
    />
  )
}
