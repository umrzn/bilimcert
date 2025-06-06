'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'

export default function ProjectOfficePage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Деятельность', href: '/activities', translationKey: 'activities.title' },
    { title: 'Проектный офис', translationKey: 'activities.projectOffice' }
  ]

  const documents = [
    {
      id: '1',
      title: 'Жоба басқару әдістемесі',
      url: '/downloads/project-management-methodology.pdf',
      type: 'pdf' as const,
      size: '6.2 МБ'
    },
    {
      id: '2',
      title: 'Жоба үлгілері',
      url: '/downloads/project-templates.docx',
      type: 'docx' as const,
      size: '3.8 МБ'
    },
    {
      id: '3',
      title: 'Тиімділік көрсеткіштері',
      url: '/downloads/efficiency-indicators.xlsx',
      type: 'xlsx' as const,
      size: '2.4 МБ'
    }
  ]

  const images = [
    '/images/activities/project-office.jpg',
    '/images/activities/project-management.jpg'
  ]

  const content = (
    <div className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Жоба кеңсесі туралы</h2>

        <p>
          Жоба кеңсесі - білім беру саласындағы стратегиялық жобаларды басқару, үйлестіру және мониторингілеу жөніндегі мамандандырылған құрылым.
        </p>

        <h3>Негізгі функциялар</h3>
        <ul>
          <li>Жобаларды жоспарлау және басқару</li>
          <li>Ресурстарды үйлестіру</li>
          <li>Тиімділікті мониторингілеу</li>
          <li>Тәуекелдерді басқару</li>
        </ul>

        <h3>Ағымдағы жобалар</h3>
        <p><strong>2024 жылғы приоритеттер:</strong></p>
        <ul>
          <li>Цифрлық трансформация - 15 жоба</li>
          <li>Халықаралық ынтымақтастық - 8 жоба</li>
          <li>Инфрақұрылым дамыту - 12 жоба</li>
          <li>Сапа жүйесін жетілдіру - 6 жоба</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Жоба кеңсесі - Жобаларды басқару орталығы"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2021-03-01"
      updatedAt="2024-01-29"
      author="BilimCert"
      images={images}
      documents={documents}
      viewsCount={1420}
    />
  )
}
