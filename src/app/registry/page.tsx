'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'
import Link from 'next/link'
import { ArrowRight, FileText, Users, BookOpen, Award, BarChart, Settings } from 'lucide-react'

export default function RegistryPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Реестр ОП', translationKey: 'registry.title' }
  ]

  const sections = [
    {
      title: 'НПА',
      href: '/registry/npa',
      icon: FileText,
      description: 'Білім беру бағдарламаларының реестрін жүргізуге қатысты нормативтік құжаттар'
    },
    {
      title: 'Семинары реестра',
      href: '/registry/seminars',
      icon: Users,
      description: 'Реестр жүргізу бойынша семинарлар мен оқу іс-шаралары'
    },
    {
      title: 'Методические материалы',
      href: '/registry/methodological-materials',
      icon: BookOpen,
      description: 'Реестрді жүргізу үшін әдістемелік материалдар мен нұсқаулықтар'
    },
    {
      title: 'Статистика и отчеты',
      href: '/registry/statistics',
      icon: BarChart,
      description: 'Реестрдің статистикалық деректері мен аналитикалық есептер'
    },
    {
      title: 'Техническая поддержка',
      href: '/registry/technical-support',
      icon: Settings,
      description: 'Реестр жүйесін пайдалану бойынша техникалық қолдау'
    }
  ]

  const content = (
    <div className="space-y-12">
      {/* Introduction */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Білім беру бағдарламаларының реестрі (Реестр ОП) - Қазақстан Республикасында 
          іске асырылатын барлық жоғары және жоғары оқу орнынан кейінгі білім беру 
          бағдарламаларының мемлекеттік тізілімі. Реестр білім беру бағдарламаларының 
          ашықтығы мен қолжетімділігін қамтамасыз етеді.
        </p>
        
        <h2>Реестрдің мақсаттары</h2>
        <ul>
          <li>Білім беру бағдарламалары туралы толық және дәл ақпарат беру</li>
          <li>Білім беру қызметтері нарығының ашықтығын қамтамасыз ету</li>
          <li>Студенттер мен жұмыс берушілердің ақпараттық қажеттіліктерін қанағаттандыру</li>
          <li>Білім беру бағдарламаларының сапасын мониторингтеу</li>
          <li>Мемлекеттік статистика мен талдау үшін деректер жинау</li>
        </ul>

        <h2>Реестрдің құрылымы</h2>
        <p>
          Реестр келесі негізгі компоненттерден тұрады: білім беру ұйымдары туралы 
          ақпарат, білім беру бағдарламаларының сипаттамалары, аккредиттеу мәртебесі, 
          түлектер туралы статистика және жұмысқа орналасу көрсеткіштері.
        </p>
      </div>

      {/* Main Sections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Реестр бөлімдері
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {section.title}
                  </h3>
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

      {/* Key Statistics */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Реестр статистикасы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-primary-100">Білім беру ұйымы</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">2,500+</div>
            <div className="text-primary-100">Білім беру бағдарламасы</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">85%</div>
            <div className="text-primary-100">Аккредиттелген бағдарламалар</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">450,000+</div>
            <div className="text-primary-100">Студент</div>
          </div>
        </div>
      </div>

      {/* Registry Benefits */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Реестрдің артықшылықтары
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Студенттер үшін
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Білім беру бағдарламаларын салыстыру мүмкіндігі</li>
              <li>• Аккредиттеу мәртебесі туралы ақпарат</li>
              <li>• Түлектердің жұмысқа орналасу статистикасы</li>
              <li>• Оқу ақысы мен стипендиялар туралы мәліметтер</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Жұмыс берушілер үшін
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Мамандар дайындау сапасы туралы ақпарат</li>
              <li>• Білім беру бағдарламаларының мазмұны</li>
              <li>• Түлектердің біліктілік деңгейі</li>
              <li>• Серіктестік мүмкіндіктері</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How to Use Registry */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Реестрді қалай пайдалану керек
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Іздеу</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Қажетті мамандық немесе университет бойынша іздеу жүргізіңіз
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Салыстыру</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Әртүрлі бағдарламаларды салыстырып, ең жақсысын таңдаңыз
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Өтініш беру</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Таңдаған университетке тікелей өтініш беріңіз
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Реестр бойынша сұрақтар
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Реестрді пайдалану немесе ақпаратты жаңарту бойынша сұрақтарыңыз болса, 
          біздің мамандармен хабарласыңыз.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/registry/technical-support"
            className="inline-flex items-center px-4 py-2 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            Техникалық қолдау
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4 mr-2" />
            Байланыс
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="Реестр ОП"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2020-01-01"
      updatedAt="2024-01-15"
      author="BilimCert"
      viewsCount={8750}
    />
  )
}
