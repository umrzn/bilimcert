'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'

export default function AtlasesPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Деятельность', href: '/activities', translationKey: 'activities.title' },
    { title: 'Атласы', translationKey: 'activities.atlases' }
  ]

  const documents = [
    {
      id: '1',
      title: 'Мамандықтар атласы',
      url: '/downloads/professions-atlas.pdf',
      type: 'pdf' as const,
      size: '12.5 МБ'
    },
    {
      id: '2',
      title: 'Университеттер атласы',
      url: '/downloads/universities-atlas.pdf',
      type: 'pdf' as const,
      size: '18.3 МБ'
    },
    {
      id: '3',
      title: 'Еңбек нарығы атласы',
      url: '/downloads/labor-market-atlas.pdf',
      type: 'pdf' as const,
      size: '15.7 МБ'
    }
  ]

  const images = [
    '/images/activities/atlases-overview.jpg',
    '/images/activities/interactive-maps.jpg'
  ]

  const content = (
    <div className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Атластар жинағы туралы</h2>

        <p>
          Атластар жинағы - Қазақстанның білім беру жүйесі, мамандықтар және еңбек нарығы туралы визуалды және интерактивті ақпарат көздерінің жиынтығы.
        </p>

        <h3>Атластардың түрлері</h3>
        <ul>
          <li>Мамандықтар атласы - 500+ мамандық</li>
          <li>Университеттер атласы - 125 ЖОО</li>
          <li>Еңбек нарығы атласы - нарық талдауы</li>
          <li>Интерактивті атлас - онлайн платформа</li>
        </ul>

        <h3>Пайдаланушылар</h3>
        <p><strong>2024 жылғы статистика:</strong></p>
        <ul>
          <li>Жалпы пайдаланушылар: 150,000+</li>
          <li>Айлық белсенді: 45,000+</li>
          <li>Мобильді қосымша: 25,000+</li>
          <li>Пайдаланушылар қанағаттануы: 92%</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Атластар жинағы - Интерактивті ақпарат көздері"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2019-11-01"
      updatedAt="2024-01-29"
      author="BilimCert"
      images={images}
      documents={documents}
      viewsCount={3750}
    />
  )
}
