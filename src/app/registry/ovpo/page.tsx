'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'
import { TranslatedText } from '@/components/ui/TranslatedText'

export default function OVPOPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Реестр ОП', href: '/registry', translationKey: 'registry.title' },
    { title: 'ОВПО', translationKey: 'registry.ovpoNav' }
  ]

  const documents = [
    {
      id: '1',
      title: 'ОВПО тізімі',
      url: '/downloads/ovpo-list.pdf',
      type: 'pdf' as const,
      size: '8.5 МБ'
    },
    {
      id: '2',
      title: 'Тіркеу нұсқаулығы',
      url: '/downloads/registration-guide.pdf',
      type: 'pdf' as const,
      size: '3.2 МБ'
    },
    {
      id: '3',
      title: 'Сапа көрсеткіштері',
      url: '/downloads/quality-indicators.xlsx',
      type: 'xlsx' as const,
      size: '2.8 МБ'
    },
    {
      id: '4',
      title: 'Статистикалық есеп 2024',
      url: '/downloads/statistical-report-2024.pdf',
      type: 'pdf' as const,
      size: '6.1 МБ'
    },
    {
      id: '5',
      title: 'Мониторинг нәтижелері',
      url: '/downloads/monitoring-results.pdf',
      type: 'pdf' as const,
      size: '4.7 МБ'
    }
  ]

  const images = [
    '/images/registry/ovpo-statistics.jpg',
    '/images/registry/ovpo-map.jpg'
  ]

  const content = (
    <div className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2><TranslatedText textKey="registry.ovpo.generalInfo" fallback="ОВПО туралы жалпы ақпарат" /></h2>

        <p>
          <TranslatedText textKey="registry.ovpo.description" fallback="ОВПО (Организации высшего и послевузовского образования) - жоғары білім беру бағдарламаларын іске асыратын және жоғары оқу орнынан кейінгі білім беру қызметін көрсететін білім беру ұйымдары. Реестрде тіркелген барлық ОВПО туралы толық ақпарат ұсынылады." />
        </p>

        <h3><TranslatedText textKey="registry.ovpo.mainFunctions.title" fallback="Негізгі функциялар" /></h3>
        <ul>
          <li><TranslatedText textKey="registry.ovpo.mainFunctions.item1" fallback="Жоғары білім беру бағдарламаларын іске асыру" /></li>
          <li><TranslatedText textKey="registry.ovpo.mainFunctions.item2" fallback="Ғылыми зерттеулер жүргізу" /></li>
          <li><TranslatedText textKey="registry.ovpo.mainFunctions.item3" fallback="Кадрлар дайындау және қайта даярлау" /></li>
          <li><TranslatedText textKey="registry.ovpo.mainFunctions.item4" fallback="Халықаралық ынтымақтастық дамыту" /></li>
        </ul>

        <h3><TranslatedText textKey="registry.ovpo.ovpoTypes.title" fallback="ОВПО түрлері" /></h3>

        <h4><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.title" fallback="Меншік түрі бойынша" /></h4>
        <p><strong><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.state.title" fallback="Мемлекеттік ОВПО:" /></strong></p>
        <ul>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.state.item1" fallback="Мемлекет меншігіндегі ұйымдар" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.state.item2" fallback="Бюджеттік қаржыландыру" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.state.item3" fallback="Мемлекеттік білім тапсырысы" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.state.item4" fallback="Ерекше мәртебе" /></li>
        </ul>

        <p><strong><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.private.title" fallback="Жеке ОВПО:" /></strong></p>
        <ul>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.private.item1" fallback="Жеке меншіктегі ұйымдар" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.private.item2" fallback="Коммерциялық негіз" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.private.item3" fallback="Нарықтық бәсекелестік" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.byOwnership.private.item4" fallback="Инновациялық бағдарлама" /></li>
        </ul>

        <h4><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.title" fallback="Мамандану бойынша" /></h4>
        <p><strong><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.universities.title" fallback="Университеттер:" /></strong></p>
        <ul>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.universities.item1" fallback="Көп салалы дайындық" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.universities.item2" fallback="Барлық білім деңгейлері" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.universities.item3" fallback="Ғылыми зерттеулер" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.universities.item4" fallback="Докторантура" /></li>
        </ul>

        <p><strong><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.academies.title" fallback="Академиялар:" /></strong></p>
        <ul>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.academies.item1" fallback="Мамандандырылған дайындық" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.academies.item2" fallback="Жоғары деңгейдегі мамандар" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.academies.item3" fallback="Ғылыми-зерттеу қызметі" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.academies.item4" fallback="Элиталық білім" /></li>
        </ul>

        <p><strong><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.institutes.title" fallback="Институттар:" /></strong></p>
        <ul>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.institutes.item1" fallback="Тар мамандандыру" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.institutes.item2" fallback="Нақты салалар" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.institutes.item3" fallback="Практикалық бағдар" /></li>
          <li><TranslatedText textKey="registry.ovpo.ovpoTypes.bySpecialization.institutes.item4" fallback="Кәсіби дайындық" /></li>
        </ul>

        <h3>Реестрге тіркеу процесі</h3>

        <h4>Тіркеу талаптары</h4>
        <p><strong>Заңдық талаптар:</strong></p>
        <ul>
          <li>Мемлекеттік тіркеу</li>
          <li>Білім беру лицензиясы</li>
          <li>Аккредиттеу сертификаты</li>
          <li>Қажетті рұқсаттар</li>
        </ul>

        <p><strong>Техникалық талаптар:</strong></p>
        <ul>
          <li>Материалдық-техникалық база</li>
          <li>Кадр құрамы</li>
          <li>Оқу-әдістемелік қамтамасыз ету</li>
          <li>Ақпараттық жүйелер</li>
        </ul>

        <h4>Тіркеу процедурасы</h4>
        <p><strong>1-қадам: Өтініш беру</strong></p>
        <ul>
          <li>Ресми өтініш</li>
          <li>Қажетті құжаттар</li>
          <li>Мәліметтерді толтыру</li>
          <li>Растайтын материалдар</li>
        </ul>

        <p><strong>2-қадам: Құжаттарды тексеру</strong></p>
        <ul>
          <li>Формальды тексеру</li>
          <li>Мазмұндық сараптама</li>
          <li>Қосымша ақпарат сұрау</li>
          <li>Түзетулер енгізу</li>
        </ul>

        <p><strong>3-қадам: Шешім қабылдау</strong></p>
        <ul>
          <li>Сарапшылар қорытындысы</li>
          <li>Комиссия шешімі</li>
          <li>Тіркеу туралы хабарлама</li>
          <li>Реестрге енгізу</li>
        </ul>

        <h3>Статистикалық деректер</h3>

        <h4>2024 жылғы көрсеткіштер</h4>
        <p><strong>ОВПО саны:</strong></p>
        <ul>
          <li>Жалпы саны: 125 ұйым</li>
          <li>Мемлекеттік: 28 ұйым</li>
          <li>Жеке: 97 ұйым</li>
          <li>Филиалдар: 45 ұйым</li>
        </ul>

        <p><strong>Студенттер саны:</strong></p>
        <ul>
          <li>Жалпы: 600,000+ студент</li>
          <li>Бакалавриат: 480,000 студент</li>
          <li>Магистратура: 95,000 студент</li>
          <li>Докторантура: 25,000 студент</li>
        </ul>

        <h4>Аймақтық үлестірім</h4>
        <p><strong>Нұр-Султан:</strong></p>
        <ul>
          <li>ОВПО саны: 25</li>
          <li>Студенттер саны: 120,000</li>
          <li>Мемлекеттік: 8</li>
          <li>Жеке: 17</li>
        </ul>

        <p><strong>Алматы:</strong></p>
        <ul>
          <li>ОВПО саны: 35</li>
          <li>Студенттер саны: 180,000</li>
          <li>Мемлекеттік: 10</li>
          <li>Жеке: 25</li>
        </ul>

        <h3>Болашақ дамыту</h3>

        <h4>2025-2030 жоспарлары</h4>
        <p><strong>Негізгі мақсаттар:</strong></p>
        <ul>
          <li>Сапа көрсеткіштерін арттыру</li>
          <li>Халықаралық танылуды кеңейту</li>
          <li>Цифрлық трансформация</li>
          <li>Инновациялық дамыту</li>
        </ul>

        <p><strong>Күтілетін нәтижелер:</strong></p>
        <ul>
          <li>100% цифрландыру</li>
          <li>50% халықаралық аккредиттеу</li>
          <li>20 университет TOP-500 рейтингте</li>
          <li>100,000 шетелдік студент</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="ОВПО - Организации высшего и послевузовского образования"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2020-01-15"
      updatedAt="2024-01-27"
      author="BilimCert"
      images={images}
      documents={documents}
      viewsCount={1850}
    />
  )
}
