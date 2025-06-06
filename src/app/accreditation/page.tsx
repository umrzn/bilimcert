import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { AccreditationRegistry } from '@/components/accreditation/AccreditationRegistry'
import Link from 'next/link'
import { Award, Users, FileCheck, Target, ArrowRight, CheckCircle, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Аккредитация',
  description: 'Білім беру бағдарламалары мен ұйымдарын аккредиттеу процедурасы. Сапа кепілдігі және халықаралық стандарттар.',
}

export default function AccreditationPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Аккредитация', translationKey: 'header.accreditation' }
  ]

  const accreditationTypes = [
    {
      title: 'Институционалдық аккредитация',
      description: 'Білім беру ұйымының жалпы қызметін бағалау',
      duration: '5 жыл',
      icon: Award,
      features: [
        'Ұйымның басқару жүйесі',
        'Оқу процесінің сапасы',
        'Ғылыми қызмет',
        'Халықаралық ынтымақтастық'
      ]
    },
    {
      title: 'Бағдарламалық аккредитация',
      description: 'Жекелеген білім беру бағдарламаларын бағалау',
      duration: '5 жыл',
      icon: FileCheck,
      features: [
        'Оқу жоспары мен бағдарлама',
        'Оқытушылар құрамы',
        'Материалдық-техникалық база',
        'Түлектердің жұмысқа орналасуы'
      ]
    },
    {
      title: 'Халықаралық аккредитация',
      description: 'Шетелдік аккредиттеу агенттіктерімен бірлескен бағалау',
      duration: '3-6 жыл',
      icon: Target,
      features: [
        'Халықаралық стандарттар',
        'Шетелдік сарапшылар',
        'Әлемдік танылу',
        'Студенттердің ұтқырлығы'
      ]
    }
  ]

  const accreditationProcess = [
    {
      step: 1,
      title: 'Өтініш беру',
      description: 'Аккредитацияға өтініш беру және алдын ала құжаттарды дайындау',
      timeframe: '1-2 ай'
    },
    {
      step: 2,
      title: 'Өзін-өзі бағалау',
      description: 'Ұйым немесе бағдарлама бойынша толық өзін-өзі бағалау есебін дайындау',
      timeframe: '2-3 ай'
    },
    {
      step: 3,
      title: 'Сыртқы бағалау',
      description: 'Сарапшылар комиссиясының сапары және сыртқы бағалау',
      timeframe: '1-2 апта'
    },
    {
      step: 4,
      title: 'Шешім қабылдау',
      description: 'Аккредиттеу кеңесінің шешімі және сертификат беру',
      timeframe: '1 ай'
    }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            <TranslatedText textKey="header.accreditation" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Білім беру сапасын қамтамасыз ету және халықаралық стандарттарға сәйкестікті растау
          </p>
        </div>

        {/* Accreditation Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Аккредитация түрлері
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accreditationTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 dark:bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Мерзімі: {type.duration}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Аккредитация процесі
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 hidden md:block"></div>

              <div className="space-y-8">
                {accreditationProcess.map((step, index) => (
                  <div key={step.step} className="relative flex items-start">
                    {/* Step number */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="ml-6 flex-1">
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {step.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-1" />
                            {step.timeframe}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Аккредитацияның артықшылықтары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Сапа кепілдігі
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Халықаралық стандарттарға сәйкес білім беру сапасының кепілдігі
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Беделді арттыру
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ұйымның беделі мен танылуын арттыру, серіктестікті кеңейту
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 dark:bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Үздіксіз дамыту
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Үздіксіз жетілдіру және инновациялық дамыту процестері
              </p>
            </div>
          </div>
        </div>

        {/* Accreditation Registry */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Аккредитация тізілімі
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Аккредитацияланған білім беру ұйымдары мен бағдарламаларды іздеңіз
            </p>
          </div>
          <AccreditationRegistry />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-gray-800 dark:to-gray-900 rounded-xl text-white p-8 md:p-12 text-center transition-colors duration-200">
          <h2 className="text-3xl font-bold mb-4">
            Аккредитацияға дайынсыз ба?
          </h2>
          <p className="text-primary-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Біздің мамандар сізге аккредитация процесінде толық қолдау көрсетеді
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/accreditation/application"
              className="inline-flex items-center px-8 py-3 bg-secondary-500 dark:bg-orange-600 hover:bg-secondary-600 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
            >
              Өтініш беру
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/accreditation/consultation"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-500 dark:hover:text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Кеңес алу
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
