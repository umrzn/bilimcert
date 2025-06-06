'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'

export default function MamandygymBolashagymPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Деятельность', href: '/activities', translationKey: 'activities.title' },
    { title: 'Программа «Мамандығым-болашағым»', translationKey: 'activities.mamandygymBolashagym' }
  ]

  const documents = [
    {
      id: '1',
      title: 'Бағдарлама сипаттамасы',
      url: '/downloads/program-description.pdf',
      type: 'pdf' as const,
      size: '4.5 МБ'
    },
    {
      id: '2',
      title: 'Қатысу нұсқаулығы',
      url: '/downloads/participation-guide.pdf',
      type: 'pdf' as const,
      size: '2.8 МБ'
    },
    {
      id: '3',
      title: 'Статистикалық есеп',
      url: '/downloads/statistical-report.xlsx',
      type: 'xlsx' as const,
      size: '3.2 МБ'
    }
  ]

  const images = [
    '/images/activities/mamandygym-bolashagym.jpg',
    '/images/activities/career-guidance.jpg'
  ]

  const content = (
    <div className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>«Мамандығым-болашағым» бағдарламасы туралы</h2>

        <p>
          «Мамандығым-болашағым» - жас адамдарға мамандық таңдауда көмек көрсету және олардың болашақ мансабын жоспарлауға бағытталған ұлттық бағдарлама.
        </p>

        <h3>Бағдарламаның мақсаттары</h3>
        <ul>
          <li>Мамандық таңдауда бағдар беру</li>
          <li>Еңбек нарығының қажеттіліктерін түсіндіру</li>
          <li>Кәсіби дағдыларды дамыту</li>
          <li>Мансап жоспарлауға көмек көрсету</li>
        </ul>

        <h3>Мақсатты аудитория</h3>

        <h4>Орта мектеп оқушылары</h4>
        <p><strong>9-11 сыныптар:</strong></p>
        <ul>
          <li>Мамандық таңдау бойынша кеңес</li>
          <li>Университеттер туралы ақпарат</li>
          <li>Кәсіби бағдар тесттері</li>
          <li>Ата-аналарға арналған семинарлар</li>
        </ul>

        <h4>Студенттер</h4>
        <p><strong>Жоғары оқу орны студенттері:</strong></p>
        <ul>
          <li>Мансап жоспарлау</li>
          <li>Дағдыларды дамыту</li>
          <li>Тәжірибе мүмкіндіктері</li>
          <li>Жұмысқа орналасуға көмек</li>
        </ul>

        <h3>Бағдарлама компоненттері</h3>

        <h4>Кәсіби бағдар беру</h4>
        <p><strong>Қызметтер:</strong></p>
        <ul>
          <li>Жеке кеңес беру сессиялары</li>
          <li>Топтық семинарлар</li>
          <li>Онлайн тестілеу</li>
          <li>Мамандық көрмелері</li>
        </ul>

        <h4>Дағдыларды дамыту</h4>
        <p><strong>Тренингтер:</strong></p>
        <ul>
          <li>Жұмсақ дағдылар (Soft Skills)</li>
          <li>Цифрлық сауаттылық</li>
          <li>Көшбасшылық дағдылары</li>
          <li>Коммуникация дағдылары</li>
        </ul>

        <h3>2024 жылғы нәтижелер</h3>

        <h4>Статистикалық көрсеткіштер</h4>
        <p><strong>Қамту:</strong></p>
        <ul>
          <li>Қатысушылар саны: 25,000+ адам</li>
          <li>Мектептер саны: 500+ мектеп</li>
          <li>Университеттер саны: 50+ ЖОО</li>
          <li>Аймақтар саны: 14 облыс</li>
        </ul>

        <h4>Тиімділік көрсеткіштері</h4>
        <p><strong>Нәтижелер:</strong></p>
        <ul>
          <li>Мамандық таңдаған: 85%</li>
          <li>Университетке түскен: 78%</li>
          <li>Жұмысқа орналасқан: 82%</li>
          <li>Қанағаттану деңгейі: 4.5/5.0</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="«Мамандығым-болашағым» бағдарламасы"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2020-09-01"
      updatedAt="2024-01-29"
      author="BilimCert"
      images={images}
      documents={documents}
      viewsCount={2850}
    />
  )
}
