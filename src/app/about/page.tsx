'use client'

import { ArticlePage } from '@/components/ui/ArticlePage'
import { TranslatedText } from '@/components/ui/TranslatedText'
import Link from 'next/link'
import { ArrowRight, Users, Target, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'О Центре', translationKey: 'about.title' }
  ]

  const sections = [
    {
      title: 'История Центра',
      href: '/about/history',
      icon: Award,
      description: 'Центрдің құрылу тарихы мен даму жолы'
    },
    {
      title: 'Стратегия и миссия',
      href: '/about/strategy',
      icon: Target,
      description: 'Біздің миссиямыз, көзқарасымыз және стратегиялық мақсаттарымыз'
    },
    {
      title: 'Руководящий состав',
      href: '/about/leadership',
      icon: Users,
      description: 'Центрдің басшылық құрамы мен олардың өмірбаяны'
    },
    {
      title: 'Структурные подразделения',
      href: '/about/departments',
      icon: Globe,
      description: 'Центрдің құрылымдық бөлімшелері мен олардың қызметкерлері'
    }
  ]

  const newsLinks = [
    {
      title: 'Меморандумы Центра',
      href: '/about/memorandums',
      description: 'Центрмен жасалған меморандумдар мен келісімдер'
    },
    {
      title: 'Мероприятия',
      href: '/about/events',
      description: 'Центр ұйымдастырған іс-шаралар мен конференциялар'
    },
    {
      title: 'Общественная жизнь',
      href: '/about/social-life',
      description: 'Центрдің қоғамдық өмірі мен әлеуметтік жобалары'
    }
  ]

  const content = (
    <div className="space-y-12">
      {/* Introduction */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          BilimCert - Қазақстан Республикасының білім беру сапасын қамтамасыз ету және халықаралық 
          стандарттарға сәйкестігін растау саласындағы жетекші орталық. Біз білім беру бағдарламаларын 
          аккредиттеу, шетелдік дипломдарды тану және білім беру сапасын бағалау бойынша кешенді қызметтер ұсынамыз.
        </p>
        
        <p>
          Центр 2010 жылы құрылған және осы уақыт ішінде Қазақстанның білім беру жүйесін дамытуға 
          айтарлықтай үлес қосып келеді. Біздің қызметіміз халықаралық стандарттарға негізделген 
          және еуропалық білім беру кеңістігінің принциптеріне сәйкес келеді.
        </p>
      </div>

      {/* Main Sections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Негізгі бөлімдер
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

      {/* News and Updates */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Жаңалықтар мен іс-шаралар
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {link.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {link.description}
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                Толығырақ
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Statistics */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Біздің жетістіктеріміз
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-primary-100">Аккредиттелген бағдарлама</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-primary-100">Серіктес университет</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-primary-100">Танылған диплом</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-primary-100">Жыл тәжірибе</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Байланыс ақпараты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Басты офис
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              г. Нур-Султан, ул. Мәңгілік Ел, 8
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              БЦ "Нұр Алем", 15-қабат
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Телефон: +7 (7172) 12-34-56
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Жұмыс уақыты
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Дүйсенбі - Жұма: 9:00 - 18:00
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Сенбі - Жексенбі: демалыс
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email: info@bilimcert.kz
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <ArticlePage
      title="О Центре"
      content={content}
      breadcrumbs={breadcrumbs}
      publishedAt="2024-01-01"
      updatedAt="2024-01-15"
    />
  )
}
