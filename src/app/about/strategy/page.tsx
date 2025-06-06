'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'
import { Target, Eye, Heart, Lightbulb } from 'lucide-react'

export default function StrategyPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'О Центре', href: '/about', translationKey: 'about.title' },
    { title: 'Стратегия и миссия', translationKey: 'about.strategy' }
  ]

  const documents = [
    {
      id: '1',
      title: 'Стратегиялық жоспар 2025-2030',
      url: '/documents/strategic-plan-2025-2030.pdf',
      type: 'pdf' as const,
      size: '4.2 MB'
    },
    {
      id: '2',
      title: 'Сапа саясаты',
      url: '/documents/quality-policy.pdf',
      type: 'pdf' as const,
      size: '1.5 MB'
    },
    {
      id: '3',
      title: 'Этика кодексі',
      url: '/documents/ethics-code.pdf',
      type: 'pdf' as const,
      size: '2.1 MB'
    }
  ]

  const content = (
    <div className="space-y-12">
      {/* Mission */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Біздің миссиямыз
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Қазақстанның білім беру жүйесін халықаралық стандарттарға сәйкестендіру, білім беру 
              сапасын қамтамасыз ету және отандық білім беру мекемелерінің әлемдік білім беру 
              кеңістігіне толыққанды интеграциялануына жәрдемдесу.
            </p>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Біздің көзқарасымыз
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              2030 жылға қарай Орталық Азия аймағындағы білім беру сапасын қамтамасыз ету саласындағы 
              жетекші орталық болу және халықаралық деңгейде танылған инновациялық шешімдер ұсыну.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Біздің құндылықтарымыз
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Адалдық
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Барлық қызметімізде ашықтық, әділдік және этикалық принциптерді сақтау
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Сапа
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Халықаралық стандарттарға сәйкес жоғары сапалы қызметтер ұсыну
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Инновация
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Жаңа технологиялар мен әдістерді енгізу арқылы үздіксіз дамыту
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Ашықтық
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Барлық процестерде мөлдірлік пен есеп беру жауапкершілігі
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Goals */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Стратегиялық мақсаттар 2025-2030</h2>
        
        <h3>1. Сапа қамтамасыз ету жүйесін дамыту</h3>
        <ul>
          <li>Аккредиттеу процедураларын халықаралық стандарттарға толық сәйкестендіру</li>
          <li>Цифрлық технологиялар негізінде жаңа бағалау әдістерін енгізу</li>
          <li>Сарапшылар дайындау жүйесін жетілдіру</li>
          <li>Сапа мониторингі мен бақылау механизмдерін күшейту</li>
        </ul>

        <h3>2. Халықаралық ынтымақтастықты кеңейту</h3>
        <ul>
          <li>Еуропалық және Азиялық сапа агенттіктерімен серіктестікті дамыту</li>
          <li>Халықаралық аккредиттеу желілеріне толық интеграция</li>
          <li>Шетелдік сарапшылармен ынтымақтастықты кеңейту</li>
          <li>Трансшекаралық білім беру бағдарламаларын қолдау</li>
        </ul>

        <h3>3. Цифрлық трансформация</h3>
        <ul>
          <li>Жасанды интеллект технологияларын толық енгізу</li>
          <li>Блокчейн негізіндегі дипломдар тану жүйесін дамыту</li>
          <li>Онлайн платформалар арқылы қызметтер ұсыну</li>
          <li>Үлкен деректерді талдау және болжау жүйелерін құру</li>
        </ul>

        <h3>4. Кадр әлеуетін дамыту</h3>
        <ul>
          <li>Қызметкерлердің біліктілігін үздіксіз арттыру</li>
          <li>Халықаралық тәжірибе алмасу бағдарламаларын ұйымдастыру</li>
          <li>Жас мамандарды тарту және дамыту</li>
          <li>Инновациялық жұмыс әдістерін енгізу</li>
        </ul>

        <h3>5. Қоғамдық әсерді арттыру</h3>
        <ul>
          <li>Білім беру сапасы туралы қоғамдық хабардарлықты арттыру</li>
          <li>Студенттер мен жұмыс берушілердің қажеттіліктерін қанағаттандыру</li>
          <li>Тұрақты даму мақсаттарына үлес қосу</li>
          <li>Әлеуметтік жауапкершілік жобаларын іске асыру</li>
        </ul>

        <h2>Орындау механизмдері</h2>
        
        <h3>Мониторинг және бағалау</h3>
        <p>
          Стратегиялық жоспардың орындалуын бақылау үшін KPI жүйесі әзірленген. 
          Жыл сайын нәтижелерге талдау жасалып, қажет болған жағдайда түзетулер енгізіледі.
        </p>

        <h3>Ресурстық қамтамасыз ету</h3>
        <p>
          Стратегияны іске асыру үшін қажетті қаржылық, кадрлық және техникалық ресурстар 
          жоспарланған. Халықаралық донорлармен және серіктестермен ынтымақтастық орнатылады.
        </p>

        <h3>Тәуекелдерді басқару</h3>
        <p>
          Ішкі және сыртқы тәуекелдер анықталып, оларды азайту жөніндегі шаралар 
          қарастырылған. Тәуекелдерді үздіксіз мониторингілеу жүйесі құрылған.
        </p>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Стратегия и миссия"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2024-01-01"
      updatedAt="2024-01-15"
      author="BilimCert Стратегиялық жоспарлау тобы"
      documents={documents}
      viewsCount={1890}
    />
  )
}
