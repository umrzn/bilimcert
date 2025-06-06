'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'
import Link from 'next/link'
import { ArrowRight, FileText, Search, Building2, Globe, BookOpen, Award, Users } from 'lucide-react'

export default function ReferencePage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Справочная информация', translationKey: 'reference.title' }
  ]

  const sections = [
    {
      title: 'Образцы дипломов ВУЗов РК',
      href: '/reference/diploma-samples',
      icon: Award,
      description: 'Қазақстан Республикасы ЖОО-ларының диплом үлгілері мен шаблондары',
      type: 'searchable-table'
    },
    {
      title: 'ВУЗы Казахстана',
      href: '/universities/finder',
      icon: Building2,
      description: 'Қазақстанның жоғары оқу орындарының толық тізімі мен ақпараты',
      type: 'redirect'
    },
    {
      title: 'Нормативно-правовые акты',
      href: '/reference/legal-acts',
      icon: FileText,
      description: 'Білім беру саласындағы нормативтік-құқықтық актілер'
    },
    {
      title: 'Международные соглашения',
      href: '/reference/international-agreements',
      icon: Globe,
      description: 'Халықаралық келісімдер мен конвенциялар'
    },
    {
      title: 'Методические рекомендации',
      href: '/reference/methodological-recommendations',
      icon: BookOpen,
      description: 'Әдістемелік ұсынымдар мен нұсқаулықтар'
    },
    {
      title: 'Справочники и классификаторы',
      href: '/reference/handbooks-classifiers',
      icon: Search,
      description: 'Анықтамалықтар, классификаторлар және кодтар жүйесі'
    }
  ]

  const content = (
    <div className="space-y-12">
      {/* Introduction */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Анықтамалық ақпарат бөлімі білім беру саласындағы маңызды құжаттар,
          нормативтік актілер, халықаралық келісімдер және әдістемелік материалдарды қамтиды.
          Бұл ресурстар студенттер, оқытушылар, зерттеушілер және білім беру саласының
          мамандары үшін арналған.
        </p>

        <h2>Негізгі бөлімдер</h2>
        <p>
          Анықтамалық ақпарат бөлімі алты негізгі санатқа бөлінеді, олардың әрқайсысы
          білім беру саласының белгілі бір аспектісіне арналған. Барлық материалдар
          жүйелі түрде ұйымдастырылған және оңай іздеу мүмкіндігімен қамтамасыз етілген.
        </p>
      </div>

      {/* Main Sections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Анықтамалық материалдар
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {section.title}
                    </h3>
                    {section.type === 'redirect' && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        Сілтеме
                      </span>
                    )}
                    {section.type === 'searchable-table' && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                        Іздеу
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {section.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Жиі қолданылатын ресурстар
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-primary-100">ЖОО диплом үлгісі</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-primary-100">Халықаралық келісім</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">200+</div>
            <div className="text-primary-100">Нормативтік құжат</div>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Пайдалану нұсқаулығы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Іздеу функциялары
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Университет атауы бойынша іздеу</li>
              <li>• Құжат түрі бойынша сүзгілеу</li>
              <li>• Жыл мен санат бойынша топтау</li>
              <li>• Кілт сөздер бойынша іздеу</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Жүктеп алу мүмкіндіктері
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• PDF форматында құжаттар</li>
              <li>• Word шаблондары</li>
              <li>• Excel кестелері</li>
              <li>• Архивтелген файлдар</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Қосымша ақпарат алу
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Егер сізге қажетті ақпарат табылмаса немесе қосымша сұрақтарыңыз болса,
          біздің мамандармен хабарласыңыз.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contacts"
            className="inline-flex items-center px-4 py-2 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Users className="w-4 h-4 mr-2" />
            Байланыс
          </Link>
          <Link
            href="/questions"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            Сұрақ қою
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Справочная информация"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2024-01-01"
      updatedAt="2024-01-15"
      author="BilimCert"
      viewsCount={4250}
    />
  )
}
