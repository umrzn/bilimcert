import { Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import {
  Users,
  Globe,
  Target,
  ArrowRight,
  CheckCircle,
  Building,
  Award,
  BookOpen,
  TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Партнерство - BilimCert',
  description: 'Развивайте партнерские отношения с BilimCert. Присоединяйтесь к нашей сети образовательных учреждений и организаций.',
}

export default function PartnershipPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Партнерство', translationKey: 'header.partnership' }
  ]

  const partnershipTypes = [
    {
      icon: Building,
      title: 'Университеты и ВУЗы',
      description: 'Сотрудничество в области аккредитации, обмена опытом и повышения качества образования.',
      benefits: [
        'Поддержка в процессе аккредитации',
        'Обмен лучшими практиками',
        'Совместные исследования',
        'Международное признание'
      ]
    },
    {
      icon: Globe,
      title: 'Международные организации',
      description: 'Развитие международного сотрудничества и интеграция в мировое образовательное пространство.',
      benefits: [
        'Участие в международных проектах',
        'Обмен экспертизой',
        'Развитие стандартов качества',
        'Глобальное признание'
      ]
    },
    {
      icon: Award,
      title: 'Аккредитационные агентства',
      description: 'Взаимодействие с национальными и международными аккредитационными агентствами.',
      benefits: [
        'Взаимное признание решений',
        'Обмен методологиями',
        'Совместные экспертизы',
        'Гармонизация стандартов'
      ]
    },
    {
      icon: Users,
      title: 'Работодатели',
      description: 'Партнерство с работодателями для обеспечения соответствия образования потребностям рынка.',
      benefits: [
        'Участие в разработке стандартов',
        'Экспертная оценка программ',
        'Обратная связь о качестве подготовки',
        'Развитие компетенций'
      ]
    }
  ]

  const currentPartners = [
    {
      name: 'Министерство образования и науки РК',
      type: 'Государственная организация',
      description: 'Основной партнер в области образовательной политики'
    },
    {
      name: 'ENQA (European Association for Quality Assurance)',
      type: 'Международная организация',
      description: 'Европейская ассоциация гарантии качества в высшем образовании'
    },
    {
      name: 'Назарбаев Университет',
      type: 'Университет',
      description: 'Ведущий исследовательский университет Казахстана'
    },
    {
      name: 'КазНУ им. аль-Фараби',
      type: 'Университет',
      description: 'Национальный университет Казахстана'
    }
  ]

  const partnershipBenefits = [
    {
      icon: Target,
      title: 'Повышение качества образования',
      description: 'Совместная работа над улучшением образовательных стандартов и процессов'
    },
    {
      icon: Globe,
      title: 'Международное признание',
      description: 'Расширение возможностей для международного признания и сотрудничества'
    },
    {
      icon: BookOpen,
      title: 'Обмен знаниями',
      description: 'Обмен лучшими практиками, методологиями и экспертизой'
    },
    {
      icon: TrendingUp,
      title: 'Развитие потенциала',
      description: 'Совместное развитие человеческих ресурсов и институциональных возможностей'
    }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Партнерство
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Развивайте партнерские отношения с BilimCert и станьте частью нашей сети,
            направленной на повышение качества образования в Казахстане и за его пределами
          </p>
        </div>

        {/* Partnership Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Типы партнерства
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4">
                    <type.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {type.description}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Преимущества:
                  </h4>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Преимущества партнерства
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Наши партнеры
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPartners.map((partner, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Building className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                      {partner.type}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-gray-800 dark:to-gray-900 rounded-xl text-white p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы стать нашим партнером?
          </h2>
          <p className="text-primary-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к нашей сети партнеров и внесите свой вклад в развитие
            качественного образования в Казахстане
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partnership/application"
              className="inline-flex items-center px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
            >
              Подать заявку на партнерство
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold rounded-lg transition-colors"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
