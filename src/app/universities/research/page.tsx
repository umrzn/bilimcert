import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import Link from 'next/link'
import { BookOpen, Users, Globe, Award, ArrowRight, CheckCircle, Search, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Зерттеу ынтымақтастығы - Университеттерге',
  description: 'Университеттер үшін зерттеу ынтымақтастығы: ғылыми гранттар, зерттеу жобалары, халықаралық ынтымақтастық.',
}

export default function ResearchPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Университеттерге', href: '/universities', translationKey: 'mainNav.forUniversities' },
    { title: 'Зерттеу ынтымақтастығы', translationKey: 'mainNav.researchCollaboration' }
  ]

  const researchAreas = [
    {
      icon: Lightbulb,
      title: 'Инновациялық технологиялар',
      description: 'AI, IoT, блокчейн және басқа заманауи технологиялар',
      projects: ['Жасанды интеллект', 'Кибер қауіпсіздік', 'Блокчейн технологиялары']
    },
    {
      icon: Globe,
      title: 'Тұрақты дамыту',
      description: 'Экология, климат өзгерісі және тұрақты дамыту мәселелері',
      projects: ['Жасыл энергия', 'Климат зерттеулері', 'Экологиялық мониторинг']
    },
    {
      icon: Users,
      title: 'Әлеуметтік ғылымдар',
      description: 'Қоғамтану, психология, экономика саласындағы зерттеулер',
      projects: ['Цифрлық қоғам', 'Экономикалық дамыту', 'Білім беру инновациялары']
    }
  ]

  const grantPrograms = [
    {
      title: 'Жас ғалымдар гранты',
      amount: '5-15 млн ₸',
      duration: '2-3 жыл',
      description: '35 жасқа дейінгі жас ғалымдарға арналған грант'
    },
    {
      title: 'Ірі зерттеу жобалары',
      amount: '50-200 млн ₸',
      duration: '3-5 жыл',
      description: 'Стратегиялық маңызы бар ірі зерттеу жобалары'
    },
    {
      title: 'Халықаралық ынтымақтастық',
      amount: '20-100 млн ₸',
      duration: '2-4 жыл',
      description: 'Шетелдік серіктестермен бірлескен жобалар'
    }
  ]

  const benefits = [
    'Ғылыми гранттарға қолжетімділік',
    'Халықаралық серіктестік',
    'Заманауи зертхана жабдықтары',
    'Сарапшылар желісі',
    'Жарияланым қолдауы',
    'Конференция қатысуы'
  ]

  const stats = [
    { number: '200+', label: 'Зерттеу жобасы' },
    { number: '50+', label: 'Серіктес университет' },
    { number: '15 млрд ₸', label: 'Грант қаржысы' },
    { number: '30+', label: 'Ел' }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              <TranslatedText textKey="mainNav.researchCollaboration" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ғылыми зерттеулерде серіктестік орнатып, инновациялық жобаларды іске асырыңыз.
              Гранттар, халықаралық ынтымақтастық және сарапшылар желісі.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Зерттеу бағыттары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                  <area.icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {area.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Жобалар:</h4>
                  <ul className="space-y-2">
                    {area.projects.map((project, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grant Programs */}
        <div className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Грант бағдарламалары
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {grantPrograms.map((program, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    {program.title}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Сома:</span>
                      <span className="font-semibold">{program.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Мерзім:</span>
                      <span className="font-semibold">{program.duration}</span>
                    </div>
                  </div>
                  <p className="text-primary-100 text-sm">
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Серіктестіктің артықшылықтары
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <Search className="w-16 h-16 text-primary-500 dark:text-primary-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Зерттеу мүмкіндіктері
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Біздің платформа арқылы зерттеу серіктестерін табыңыз және
                  бірлескен жобаларды іске асырыңыз
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-500 dark:text-primary-400">500+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Зерттеуші</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-500 dark:text-secondary-400">100+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Зертхана</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
              Қатысу процесі
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Өтініш беру', description: 'Зерттеу жобасының сипаттамасын жіберу' },
                { step: 2, title: 'Бағалау', description: 'Сарапшылар комиссиясының бағалауы' },
                { step: 3, title: 'Келісім', description: 'Серіктестік келісімін жасасу' },
                { step: 4, title: 'Іске асыру', description: 'Жобаны іске асыру және мониторинг' }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Зерттеу серіктестігіне қосылыңыз!
            </h2>
            <p className="text-secondary-100 mb-8 max-w-2xl mx-auto">
              Ғылыми зерттеулерде серіктестік орнатып, инновациялық жобаларды іске асырыңыз
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/application"
                className="inline-flex items-center px-8 py-3 bg-white text-secondary-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
              >
                Өтініш беру
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/universities/curriculum"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold rounded-lg transition-colors"
              >
                Оқу бағдарламалары
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
