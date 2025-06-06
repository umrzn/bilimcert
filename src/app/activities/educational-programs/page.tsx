'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'

export default function EducationalProgramsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Деятельность', href: '/activities', translationKey: 'activities.title' },
    { title: 'Содержание образовательных программ', translationKey: 'activities.educationalPrograms' }
  ]

  const documents = [
    {
      id: '1',
      title: 'Бағдарлама стандарттары',
      url: '/downloads/program-standards.pdf',
      type: 'pdf' as const,
      size: '7.3 МБ'
    },
    {
      id: '2',
      title: 'Оқу жоспарлары үлгілері',
      url: '/downloads/curriculum-templates.docx',
      type: 'docx' as const,
      size: '4.1 МБ'
    },
    {
      id: '3',
      title: 'Сапа көрсеткіштері',
      url: '/downloads/quality-indicators.xlsx',
      type: 'xlsx' as const,
      size: '2.8 МБ'
    }
  ]

  const images = [
    '/images/activities/educational-programs.jpg',
    '/images/activities/curriculum-design.jpg'
  ]

  const content = (
    <div className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Білім беру бағдарламаларының мазмұны</h2>

        <p>
          Білім беру бағдарламаларының мазмұны - студенттердің кәсіби құзыреттіліктерін қалыптастыруға бағытталған оқу пәндері, модульдер мен практикалық дайындықтың жүйелі жиынтығы.
        </p>

        <h3>Негізгі принциптер</h3>
        <ul>
          <li>Еңбек нарығының қажеттіліктеріне сәйкестік</li>
          <li>Халықаралық стандарттарға сай келу</li>
          <li>Практикалық бағдарлылық</li>
          <li>Үздіксіз жаңарту және жетілдіру</li>
        </ul>

        <h3>Бағдарлама құрылымы</h3>

        <h4>Жалпы білім беру компоненті</h4>
        <p><strong>Міндетті пәндер:</strong></p>
        <ul>
          <li>Қазақстан тарихы</li>
          <li>Философия</li>
          <li>Шет тілі</li>
          <li>Ақпараттық технологиялар</li>
        </ul>

        <h4>Базалық пәндер</h4>
        <p><strong>Мамандық негіздері:</strong></p>
        <ul>
          <li>Теориялық дайындық</li>
          <li>Әдістемелік негіздер</li>
          <li>Кәсіби этика</li>
          <li>Заңнамалық база</li>
        </ul>

        <h4>Кәсіби пәндер</h4>
        <p><strong>Мамандандырылған дайындық:</strong></p>
        <ul>
          <li>Арнайы пәндер</li>
          <li>Практикалық дағдылар</li>
          <li>Жоба жұмыстары</li>
          <li>Дипломдық жұмыс</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Білім беру бағдарламаларының мазмұны"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2019-09-01"
      updatedAt="2024-01-29"
      author="BilimCert"
      images={images}
      documents={documents}
      viewsCount={1950}
    />
  )
}
