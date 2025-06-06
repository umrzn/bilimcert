'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'
import { TranslatedText } from '@/components/ui/TranslatedText'

export default function ExpertPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Реестр ОП', href: '/registry', translationKey: 'registry.title' },
    { title: 'Эксперту ОП', translationKey: 'registry.expert' }
  ]

  const documents = [
    {
      id: '1',
      title: 'Сарапшы нұсқаулығы',
      url: '/downloads/expert-guide.pdf',
      type: 'pdf' as const,
      size: '5.8 МБ'
    },
    {
      id: '2',
      title: 'Аккредиттеу стандарттары',
      url: '/downloads/accreditation-standards.pdf',
      type: 'pdf' as const,
      size: '4.2 МБ'
    },
    {
      id: '3',
      title: 'Бағалау әдістемесі',
      url: '/downloads/evaluation-methodology.pdf',
      type: 'pdf' as const,
      size: '3.5 МБ'
    },
    {
      id: '4',
      title: 'Есеп үлгілері',
      url: '/downloads/report-templates.docx',
      type: 'docx' as const,
      size: '2.1 МБ'
    },
    {
      id: '5',
      title: 'Этика кодексі',
      url: '/downloads/ethics-code.pdf',
      type: 'pdf' as const,
      size: '1.8 МБ'
    }
  ]

  const images = [
    '/images/registry/expert-training.jpg',
    '/images/registry/expert-evaluation.jpg'
  ]

  const content = (
    <div className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Сарапшы туралы жалпы ақпарат</h2>

        <p>
          Білім беру бағдарламаларының сарапшысы - білім беру сапасын бағалау, аккредиттеу процестеріне қатысу және білім беру ұйымдарына кәсіби кеңес беру жөніндегі маман.
        </p>

        <h3>Негізгі функциялар</h3>
        <ul>
          <li>Білім беру бағдарламаларын бағалау</li>
          <li>Аккредиттеу комиссияларына қатысу</li>
          <li>Сарапшылық қорытындылар дайындау</li>
          <li>Кәсіби кеңес беру</li>
        </ul>

        <h3>Сарапшы болу талаптары</h3>

        <h4>Білім талаптары</h4>
        <p><strong>Минималды талаптар:</strong></p>
        <ul>
          <li>Жоғары білім (магистр дәрежесі)</li>
          <li>Мамандық бойынша білім</li>
          <li>Қосымша біліктілік (қажет болған жағдайда)</li>
          <li>Тіл деңгейі (қазақ, орыс, ағылшын)</li>
        </ul>

        <h4>Тәжірибе талаптары</h4>
        <p><strong>Жұмыс тәжірибесі:</strong></p>
        <ul>
          <li>Кемінде 5 жыл кәсіби тәжірибе</li>
          <li>Білім беру саласындағы тәжірибе</li>
          <li>Басқарушылық тәжірибе (артықшылық)</li>
          <li>Халықаралық тәжірибе (артықшылық)</li>
        </ul>

        <h3>Сарапшы дайындау процесі</h3>

        <h4>Іріктеу процедурасы</h4>
        <p><strong>1-кезең: Өтініш беру</strong></p>
        <ul>
          <li>Онлайн өтініш толтыру</li>
          <li>Құжаттарды жүктеу</li>
          <li>Мотивациялық хат</li>
          <li>Ұсыныс хаттары</li>
        </ul>

        <p><strong>2-кезең: Құжаттарды тексеру</strong></p>
        <ul>
          <li>Формальды талаптарға сәйкестік</li>
          <li>Тәжірибе бағалауы</li>
          <li>Біліктілік тексеруі</li>
          <li>Алдын ала іріктеу</li>
        </ul>

        <h4>Дайындық бағдарламасы</h4>
        <p><strong>Теориялық дайындық (40 сағат):</strong></p>
        <ul>
          <li>Сапа қамтамасыз ету негіздері</li>
          <li>Аккредиттеу стандарттары</li>
          <li>Бағалау әдістемелері</li>
          <li>Заңнамалық база</li>
        </ul>

        <p><strong>Практикалық дайындық (60 сағат):</strong></p>
        <ul>
          <li>Кейс-стади талдау</li>
          <li>Рөлдік ойындар</li>
          <li>Симуляциялық жаттығулар</li>
          <li>Тәжірибелік жұмыс</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Эксперту ОП - Руководство для экспертов образовательных программ"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2018-06-01"
      updatedAt="2024-01-28"
      author="BilimCert"
      images={images}
      documents={documents}
      viewsCount={2150}
    />
  )
}
