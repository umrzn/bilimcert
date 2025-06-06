import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { ESGSection } from '@/components/bologna/ESGSection'
import Link from 'next/link'
import { Globe, Users, BookOpen, Award, Target, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Болон процесі',
  description: 'Болон процесі туралы толық ақпарат. Еуропалық жоғары білім кеңістігі, студенттердің ұтқырлығы және халықаралық ынтымақтастық.',
}

export default function BolognaProcessPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Болон процесі', translationKey: 'header.bolognaProcess' }
  ]

  const bolognaObjectives = [
    {
      icon: Globe,
      title: 'Еуропалық жоғары білім кеңістігін құру',
      description: 'Барлық қатысушы елдер арасында бірыңғай білім беру кеңістігін қалыптастыру',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Студенттердің ұтқырлығын арттыру',
      description: 'Студенттер мен оқытушылардың еркін қозғалысын қамтамасыз ету',
      color: 'bg-green-500'
    },
    {
      icon: BookOpen,
      title: 'Білім беру сапасын жақсарту',
      description: 'Жоғары білім беру сапасын арттыру және бәсекеге қабілеттілікті күшейту',
      color: 'bg-purple-500'
    },
    {
      icon: Award,
      title: 'Дипломдардың танылуы',
      description: 'Академиялық дәрежелер мен дипломдардың өзара танылуын қамтамасыз ету',
      color: 'bg-orange-500'
    }
  ]

  const bolognaTools = [
    {
      title: 'Еуропалық кредиттік жүйе (ECTS)',
      description: 'Студенттердің оқу жетістіктерін өлшеу және салыстыру жүйесі',
      features: ['Кредиттік жүйе', 'Оқу жетістіктерін бағалау', 'Халықаралық салыстыру']
    },
    {
      title: 'Үш циклді жүйе',
      description: 'Бакалавриат, магистратура және докторантура деңгейлері',
      features: ['Бакалавриат (3-4 жыл)', 'Магистратура (1-2 жыл)', 'Докторантура (3-4 жыл)']
    },
    {
      title: 'Дипломдық қосымша',
      description: 'Дипломға қосымша ақпарат беретін стандартталған құжат',
      features: ['Стандартталған форма', 'Ағылшын тілінде', 'Халықаралық танылу']
    },
    {
      title: 'Сапаны қамтамасыз ету',
      description: 'Білім беру сапасын бақылау және жақсарту механизмдері',
      features: ['Сыртқы бағалау', 'Аккредитация', 'Үздіксіз жетілдіру']
    }
  ]

  const kazakhstanProgress = [
    {
      year: '2010',
      event: 'Болон декларациясына қосылу',
      description: 'Қазақстан Болон процесіне ресми түрде қосылды'
    },
    {
      year: '2011',
      event: 'Кредиттік жүйені енгізу',
      description: 'Жоғары оқу орындарында кредиттік жүйе енгізілді'
    },
    {
      year: '2015',
      event: 'Үш циклді жүйе',
      description: 'Бакалавриат-магистратура-докторантура жүйесі толық енгізілді'
    },
    {
      year: '2018',
      event: 'Дипломдық қосымша',
      description: 'Еуропалық үлгідегі дипломдық қосымша енгізілді'
    },
    {
      year: '2020',
      event: 'Сапа кепілдігі',
      description: 'Халықаралық стандарттарға сәйкес сапа кепілдігі жүйесі құрылды'
    }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            <TranslatedText textKey="header.bolognaProcess" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Еуропалық жоғары білім кеңістігін құру және білім беру сапасын арттыру бойынша
            халықаралық бастама
          </p>
        </div>

        {/* What is Bologna Process */}
        <div className="mb-16">
          <div className="bg-primary-50 dark:bg-gray-800 rounded-xl p-8 border border-primary-100 dark:border-gray-600 transition-colors duration-200">
            <h2 className="text-3xl font-bold text-primary-900 dark:text-primary-400 mb-6">
              Болон процесі дегеніміз не?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-primary-800 dark:text-gray-300 leading-relaxed mb-4">
                  Болон процесі - бұл 1999 жылы 29 еуропалық елдің білім министрлері
                  Италияның Болонья қаласында қол қойған декларациядан басталған
                  жоғары білім реформасы.
                </p>
                <p className="text-primary-800 dark:text-gray-300 leading-relaxed">
                  Қазіргі уақытта 48 ел қатысады және мақсаты - 2010 жылға дейін
                  Еуропалық жоғары білім кеңістігін құру болды.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-primary-200 dark:border-gray-600 transition-colors duration-200">
                <h3 className="font-semibold text-primary-900 dark:text-gray-100 mb-4">
                  Негізгі принциптер:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-primary-800 dark:text-gray-200">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                    Дипломдардың өзара танылуы
                  </li>
                  <li className="flex items-center text-primary-800 dark:text-gray-200">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                    Студенттердің ұтқырлығы
                  </li>
                  <li className="flex items-center text-primary-800 dark:text-gray-200">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                    Сапа кепілдігі
                  </li>
                  <li className="flex items-center text-primary-800 dark:text-gray-200">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                    Өмір бойы оқыту
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bologna Objectives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Болон процесінің мақсаттары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bolognaObjectives.map((objective, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start space-x-4">
                  <div className={`${objective.color} p-3 rounded-lg`}>
                    <objective.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {objective.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bologna Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Болон процесінің құралдары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bolognaTools.map((tool, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tool.description}
                </p>
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-200">
                      <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Kazakhstan Progress */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Қазақстандағы Болон процесі
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-300 dark:bg-gray-600 hidden md:block"></div>

              <div className="space-y-8">
                {kazakhstanProgress.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                      {item.year}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {item.event}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ESG Section */}
        <div className="mb-16">
          <ESGSection />
        </div>

        {/* External Links */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Пайдалы сілтемелер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="https://ehea.info"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  EHEA ресми сайты
                </h3>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Еуропалық жоғары білім кеңістігінің ресми веб-сайты
              </p>
            </Link>

            <Link
              href="https://enqa.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                  ENQA
                </h3>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
              </div>
              <p className="text-sm text-gray-600">
                Еуропалық сапа кепілдігі агенттіктерінің желісі
              </p>
            </Link>

            <Link
              href="https://enic-naric.net"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                  ENIC-NARIC
                </h3>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
              </div>
              <p className="text-sm text-gray-600">
                Академиялық танылу бойынша ақпарат орталықтары
              </p>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Болон процесі туралы көбірек білгіңіз келе ме?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Біздің мамандар сізге Болон процесі және оның Қазақстандағы
            енгізілуі туралы толық ақпарат береді
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="inline-flex items-center px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
            >
              Кеңес алу
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold rounded-lg transition-colors"
            >
              Жиі қойылатын сұрақтар
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
