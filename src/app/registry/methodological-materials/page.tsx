'use client'

import { NewsListPage } from '@/components/ui/NewsListPage'

const methodologicalMaterialsData = [
  {
    id: 1,
    title: 'Реестр жүйесіне деректерді енгізу бойынша нұсқаулық',
    excerpt: 'Білім беру ұйымдары үшін реестрге білім беру бағдарламалары туралы толық ақпарат енгізу жөніндегі толық нұсқаулық',
    content: 'Толық мәтін...',
    image: '/images/registry/data-entry-guide.jpg',
    category: {
      id: 1,
      name: 'Нұсқаулықтар',
      slug: 'guidelines',
      color: 'bg-blue-500'
    },
    tags: ['нұсқаулық', 'деректер', 'енгізу'],
    slug: 'registry-data-entry-guidelines',
    publishedAt: '2024-01-20',
    featured: true,
    viewsCount: 2850,
    author: 'BilimCert'
  },
  {
    id: 2,
    title: 'Білім беру бағдарламаларын сипаттау үлгісі',
    excerpt: 'Реестрде білім беру бағдарламаларын дұрыс сипаттау үшін стандартталған үлгі мен шаблон',
    content: 'Толық мәтін...',
    image: '/images/registry/program-description-template.jpg',
    category: {
      id: 2,
      name: 'Үлгілер',
      slug: 'templates',
      color: 'bg-green-500'
    },
    tags: ['үлгі', 'сипаттау', 'бағдарлама'],
    slug: 'educational-program-description-template',
    publishedAt: '2024-01-15',
    featured: true,
    viewsCount: 2150,
    author: 'BilimCert'
  },
  {
    id: 3,
    title: 'Реестр деректерінің сапасын тексеру тізімі',
    excerpt: 'Реестрге енгізілген ақпараттың дұрыстығы мен толықтығын тексеру үшін чек-лист',
    content: 'Толық мәтін...',
    image: '/images/registry/quality-checklist.jpg',
    category: {
      id: 3,
      name: 'Тексеру тізімдері',
      slug: 'checklists',
      color: 'bg-purple-500'
    },
    tags: ['тексеру', 'сапа', 'чек-лист'],
    slug: 'registry-data-quality-checklist',
    publishedAt: '2023-12-20',
    featured: false,
    viewsCount: 1890,
    author: 'BilimCert'
  },
  {
    id: 4,
    title: 'Реестр жүйесінің пайдаланушы интерфейсі нұсқаулығы',
    excerpt: 'Реестр веб-интерфейсін пайдалану бойынша қадамдық нұсқаулық',
    content: 'Толық мәтін...',
    image: '/images/registry/user-interface-guide.jpg',
    category: {
      id: 1,
      name: 'Нұсқаулықтар',
      slug: 'guidelines',
      color: 'bg-blue-500'
    },
    tags: ['интерфейс', 'пайдаланушы', 'нұсқаулық'],
    slug: 'registry-user-interface-guide',
    publishedAt: '2023-11-30',
    featured: false,
    viewsCount: 1650,
    author: 'BilimCert'
  },
  {
    id: 5,
    title: 'Деректерді экспорттау және импорттау нұсқаулығы',
    excerpt: 'Реестр жүйесінен деректерді экспорттау және басқа жүйелерден импорттау процедуралары',
    content: 'Толық мәтін...',
    image: '/images/registry/import-export-guide.jpg',
    category: {
      id: 4,
      name: 'Техникалық нұсқаулықтар',
      slug: 'technical-guides',
      color: 'bg-orange-500'
    },
    tags: ['экспорт', 'импорт', 'деректер'],
    slug: 'data-import-export-guide',
    publishedAt: '2023-10-25',
    featured: false,
    viewsCount: 1420,
    author: 'BilimCert'
  },
  {
    id: 6,
    title: 'Реестр есептерін құру әдістемесі',
    excerpt: 'Реестр деректері негізінде әртүрлі есептер мен аналитикалық материалдар дайындау әдістемесі',
    content: 'Толық мәтін...',
    image: '/images/registry/reporting-methodology.jpg',
    category: {
      id: 5,
      name: 'Әдістемелер',
      slug: 'methodologies',
      color: 'bg-red-500'
    },
    tags: ['есептер', 'әдістеме', 'аналитика'],
    slug: 'registry-reporting-methodology',
    publishedAt: '2023-09-15',
    featured: false,
    viewsCount: 1280,
    author: 'BilimCert'
  },
  {
    id: 7,
    title: 'Реестр деректерін валидациялау қағидалары',
    excerpt: 'Реестрге енгізілетін деректердің дұрыстығын автоматты тексеру қағидалары мен алгоритмдері',
    content: 'Толық мәтін...',
    image: '/images/registry/validation-rules.jpg',
    category: {
      id: 6,
      name: 'Валидация',
      slug: 'validation',
      color: 'bg-teal-500'
    },
    tags: ['валидация', 'тексеру', 'қағидалар'],
    slug: 'registry-data-validation-rules',
    publishedAt: '2023-08-20',
    featured: false,
    viewsCount: 1150,
    author: 'BilimCert'
  },
  {
    id: 8,
    title: 'Реестр жүйесінің резервтік көшірмелеу нұсқаулығы',
    excerpt: 'Реестр деректерін қауіпсіз сақтау және резервтік көшірмелеу процедуралары',
    content: 'Толық мәтін...',
    image: '/images/registry/backup-procedures.jpg',
    category: {
      id: 4,
      name: 'Техникалық нұсқаулықтар',
      slug: 'technical-guides',
      color: 'bg-orange-500'
    },
    tags: ['резервтік көшірме', 'қауіпсіздік', 'сақтау'],
    slug: 'registry-backup-procedures',
    publishedAt: '2023-07-10',
    featured: false,
    viewsCount: 980,
    author: 'BilimCert'
  },
  {
    id: 9,
    title: 'Реестр деректерін талдау және визуализация',
    excerpt: 'Реестр ақпаратын талдау және көрнекі түрде ұсыну үшін құралдар мен әдістер',
    content: 'Толық мәтін...',
    image: '/images/registry/data-analysis-visualization.jpg',
    category: {
      id: 7,
      name: 'Талдау құралдары',
      slug: 'analysis-tools',
      color: 'bg-indigo-500'
    },
    tags: ['талдау', 'визуализация', 'құралдар'],
    slug: 'registry-data-analysis-visualization',
    publishedAt: '2023-06-25',
    featured: false,
    viewsCount: 1350,
    author: 'BilimCert'
  },
  {
    id: 10,
    title: 'Реестр жүйесінің жаңартулары мен жаңалықтары',
    excerpt: 'Реестр жүйесіне енгізілген соңғы жаңартулар, жаңа функциялар мен мүмкіндіктер',
    content: 'Толық мәтін...',
    image: '/images/registry/system-updates.jpg',
    category: {
      id: 8,
      name: 'Жаңартулар',
      slug: 'updates',
      color: 'bg-pink-500'
    },
    tags: ['жаңартулар', 'жаңалықтар', 'функциялар'],
    slug: 'registry-system-updates-news',
    publishedAt: '2023-05-30',
    featured: false,
    viewsCount: 1750,
    author: 'BilimCert'
  }
]

const categories = [
  { id: 1, name: 'Барлығы', slug: 'all', color: 'bg-gray-500', count: methodologicalMaterialsData.length },
  { id: 2, name: 'Нұсқаулықтар', slug: 'guidelines', color: 'bg-blue-500', count: 2 },
  { id: 3, name: 'Үлгілер', slug: 'templates', color: 'bg-green-500', count: 1 },
  { id: 4, name: 'Тексеру тізімдері', slug: 'checklists', color: 'bg-purple-500', count: 1 },
  { id: 5, name: 'Техникалық нұсқаулықтар', slug: 'technical-guides', color: 'bg-orange-500', count: 2 },
  { id: 6, name: 'Әдістемелер', slug: 'methodologies', color: 'bg-red-500', count: 1 },
  { id: 7, name: 'Валидация', slug: 'validation', color: 'bg-teal-500', count: 1 },
  { id: 8, name: 'Талдау құралдары', slug: 'analysis-tools', color: 'bg-indigo-500', count: 1 },
  { id: 9, name: 'Жаңартулар', slug: 'updates', color: 'bg-pink-500', count: 1 }
]

export default function RegistryMethodologicalMaterialsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Реестр ОП', href: '/registry', translationKey: 'registry.title' },
    { title: 'Методические материалы', translationKey: 'registry.methodologicalMaterials' }
  ]

  return (
    <NewsListPage
      title="Методические материалы"
      description="Реестр жүргізу үшін әдістемелік материалдар, нұсқаулықтар және үлгілер"
      breadcrumbs={breadcrumbs}
      baseUrl="/registry/methodological-materials"
      mockData={methodologicalMaterialsData}
      categories={categories}
    />
  )
}
