'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const socialLifeData = [
  {
    id: 1,
    title: 'Қызметкерлер арасындағы спорт жарысы',
    excerpt: 'BilimCert қызметкерлері арасында ұйымдастырылған жылдық спорт жарысы мен командалық ойындар',
    content: 'Толық мәтін...',
    image: '/images/social-life/sports-competition.jpg',
    category: {
      id: 1,
      name: 'Спорт',
      slug: 'sports',
      color: 'bg-green-500'
    },
    tags: ['спорт', 'жарыс', 'команда'],
    slug: 'staff-sports-competition',
    publishedAt: '2024-01-25',
    featured: true,
    viewsCount: 890,
    author: 'BilimCert HR'
  },
  {
    id: 2,
    title: 'Жаңа жыл корпоративі 2024',
    excerpt: 'Центрдің дәстүрлі жаңа жыл корпоративтік іс-шарасы мен сыйлық беру рәсімі',
    content: 'Толық мәтін...',
    image: '/images/social-life/new-year-corporate.jpg',
    category: {
      id: 2,
      name: 'Мерекелер',
      slug: 'holidays',
      color: 'bg-red-500'
    },
    tags: ['жаңа жыл', 'корпоратив', 'мереке'],
    slug: 'new-year-corporate-2024',
    publishedAt: '2023-12-30',
    featured: true,
    viewsCount: 1250,
    author: 'BilimCert HR'
  },
  {
    id: 3,
    title: 'Қайырымдылық акциясы "Жылы жүрек"',
    excerpt: 'Қызметкерлер балалар үйіне қайырымдылық көмек көрсету акциясын ұйымдастырды',
    content: 'Толық мәтін...',
    image: '/images/social-life/charity-action.jpg',
    category: {
      id: 3,
      name: 'Қайырымдылық',
      slug: 'charity',
      color: 'bg-pink-500'
    },
    tags: ['қайырымдылық', 'көмек', 'балалар'],
    slug: 'charity-action-warm-heart',
    publishedAt: '2023-12-15',
    featured: false,
    viewsCount: 750,
    author: 'BilimCert HR'
  },
  {
    id: 4,
    title: 'Командалық тренинг "Бірлік күші"',
    excerpt: 'Қызметкерлердің командалық рухын нығайту мақсатында ұйымдастырылған тренинг',
    content: 'Толық мәтін...',
    image: '/images/social-life/team-building.jpg',
    category: {
      id: 4,
      name: 'Тренингтер',
      slug: 'trainings',
      color: 'bg-blue-500'
    },
    tags: ['тренинг', 'команда', 'дамыту'],
    slug: 'team-building-unity-strength',
    publishedAt: '2023-11-20',
    featured: false,
    viewsCount: 650,
    author: 'BilimCert HR'
  },
  {
    id: 5,
    title: 'Экологиялық акция "Таза қала"',
    excerpt: 'Қызметкерлер қала паркін тазалау және ағаш отырғызу акциясына қатысты',
    content: 'Толық мәтін...',
    image: '/images/social-life/eco-action.jpg',
    category: {
      id: 5,
      name: 'Экология',
      slug: 'ecology',
      color: 'bg-green-600'
    },
    tags: ['экология', 'тазалық', 'ағаш'],
    slug: 'eco-action-clean-city',
    publishedAt: '2023-10-15',
    featured: false,
    viewsCount: 580,
    author: 'BilimCert HR'
  },
  {
    id: 6,
    title: 'Мұғалімдер күні мерекесі',
    excerpt: 'Білім беру саласындағы қызметкерлерді құрметтеу мерекелік іс-шарасы',
    content: 'Толық мәтін...',
    image: '/images/social-life/teachers-day.jpg',
    category: {
      id: 2,
      name: 'Мерекелер',
      slug: 'holidays',
      color: 'bg-red-500'
    },
    tags: ['мұғалімдер', 'мереке', 'құрмет'],
    slug: 'teachers-day-celebration',
    publishedAt: '2023-10-05',
    featured: false,
    viewsCount: 920,
    author: 'BilimCert HR'
  },
  {
    id: 7,
    title: 'Кітап клубы "Білім әлемі"',
    excerpt: 'Қызметкерлер арасында кітап оқу мәдениетін дамыту мақсатында құрылған клуб',
    content: 'Толық мәтін...',
    image: '/images/social-life/book-club.jpg',
    category: {
      id: 6,
      name: 'Мәдениет',
      slug: 'culture',
      color: 'bg-purple-500'
    },
    tags: ['кітап', 'клуб', 'мәдениет'],
    slug: 'book-club-world-of-knowledge',
    publishedAt: '2023-09-20',
    featured: false,
    viewsCount: 480,
    author: 'BilimCert HR'
  },
  {
    id: 8,
    title: 'Отбасылық пикник "Бірге жақсы"',
    excerpt: 'Қызметкерлер мен олардың отбасылары үшін ұйымдастырылған жаздық пикник',
    content: 'Толық мәтін...',
    image: '/images/social-life/family-picnic.jpg',
    category: {
      id: 7,
      name: 'Отбасылық',
      slug: 'family',
      color: 'bg-orange-500'
    },
    tags: ['отбасы', 'пикник', 'демалыс'],
    slug: 'family-picnic-better-together',
    publishedAt: '2023-08-15',
    featured: false,
    viewsCount: 720,
    author: 'BilimCert HR'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: socialLifeData.length },
  { id: 2, name: 'Спорт', slug: 'sports', color: 'bg-green-500', count: 1 },
  { id: 3, name: 'Мерекелер', slug: 'holidays', color: 'bg-red-500', count: 2 },
  { id: 4, name: 'Қайырымдылық', slug: 'charity', color: 'bg-pink-500', count: 1 },
  { id: 5, name: 'Тренингтер', slug: 'trainings', color: 'bg-blue-500', count: 1 },
  { id: 6, name: 'Экология', slug: 'ecology', color: 'bg-green-600', count: 1 },
  { id: 7, name: 'Мәдениет', slug: 'culture', color: 'bg-purple-500', count: 1 },
  { id: 8, name: 'Отбасылық', slug: 'family', color: 'bg-orange-500', count: 1 }
]

export default function SocialLifePage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'О Центре', href: '/about', translationKey: 'about.title' },
    { title: 'Общественная жизнь', translationKey: 'about.socialLife' }
  ]

  return (
    <NewsListPage
      title="Общественная жизнь"
      description="BilimCert орталығының қоғамдық өмірі, әлеуметтік жобалары мен қызметкерлердің белсенділігі"
      breadcrumbs={breadcrumbs}
      baseUrl="/about/social-life"
      mockData={socialLifeData}
      categories={categories}
    />
  )
}
