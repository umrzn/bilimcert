'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'
import { TranslatedText } from '@/components/ui/TranslatedText'

export default function NationalReportPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Деятельность', href: '/activities', translationKey: 'activities.title' },
    { title: 'Национальный доклад', translationKey: 'activities.nationalReport' }
  ]

  const documents = [
    {
      id: '1',
      title: 'Ұлттық есеп 2024',
      url: '/downloads/national-report-2024.pdf',
      type: 'pdf' as const,
      size: '15.2 МБ'
    },
    {
      id: '2',
      title: 'Статистикалық қосымша',
      url: '/downloads/statistical-appendix.xlsx',
      type: 'xlsx' as const,
      size: '8.7 МБ'
    },
    {
      id: '3',
      title: 'Аналитикалық қорытынды',
      url: '/downloads/analytical-summary.pdf',
      type: 'pdf' as const,
      size: '5.4 МБ'
    }
  ]

  const images = [
    '/images/activities/national-report-cover.jpg',
    '/images/activities/statistics-charts.jpg'
  ]

  const content = (
    <div className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Ұлттық баянат туралы</h2>

        <p>
          Ұлттық баянат - Қазақстан Республикасының білім беру жүйесінің жай-күйі мен дамуы туралы жыл сайынғы аналитикалық құжат. Баянат білім беру саласындағы негізгі үрдістер мен жетістіктерді көрсетеді.
        </p>

        <h3>Баянаттың мақсаттары</h3>
        <ul>
          <li>Білім беру жүйесінің жай-күйін талдау</li>
          <li>Негізгі көрсеткіштерді мониторингілеу</li>
          <li>Дамыту бағыттарын анықтау</li>
          <li>Халықаралық салыстыру жүргізу</li>
        </ul>

        <h3>2024 жылғы негізгі көрсеткіштер</h3>

        <h4>Жоғары білім беру</h4>
        <p><strong>Статистикалық деректер:</strong></p>
        <ul>
          <li>ОВПО саны: 125 ұйым</li>
          <li>Студенттер саны: 600,000+</li>
          <li>Оқытушылар саны: 45,000+</li>
          <li>Халықаралық студенттер: 25,000+</li>
        </ul>

        <h4>Сапа көрсеткіштері</h4>
        <p><strong>Аккредиттеу нәтижелері:</strong></p>
        <ul>
          <li>Аккредиттелген бағдарламалар: 2,500+</li>
          <li>Халықаралық аккредиттеу: 350+</li>
          <li>Сапа рейтингі: 4.2/5.0</li>
          <li>Түлектердің жұмысқа орналасуы: 85%</li>
        </ul>

        <h3>Негізгі жетістіктер</h3>

        <h4>Цифрлық трансформация</h4>
        <p><strong>Технологиялық дамыту:</strong></p>
        <ul>
          <li>100% университеттерде Wi-Fi</li>
          <li>Онлайн оқыту платформалары</li>
          <li>Цифрлық кітапханалар</li>
          <li>Электрондық құжат айналымы</li>
        </ul>

        <h4>Халықаралық ынтымақтастық</h4>
        <p><strong>Серіктестік бағдарламалары:</strong></p>
        <ul>
          <li>Erasmus+ жобалары: 150+</li>
          <li>Академиялық алмасу: 5,000+ студент</li>
          <li>Ортақ дипломдар: 25 бағдарлама</li>
          <li>Халықаралық зерттеулер: 200+ жоба</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Ұлттық баянат - Білім беру жүйесінің дамуы"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2024-01-01"
      updatedAt="2024-01-29"
      author="BilimCert"
      images={images}
      documents={documents}
      viewsCount={3250}
    />
  )
}
