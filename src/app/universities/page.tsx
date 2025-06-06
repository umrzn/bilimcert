import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import Link from 'next/link'
import { Building2, Users, BookOpen, Award, ArrowRight, Search, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Университеттерге арналған қызметтер',
  description: 'Университеттер үшін серіктестік бағдарламалары, зерттеу ынтымақтастығы және академиялық дамыту.',
}

export default function UniversitiesPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Университеттерге', translationKey: 'mainNav.forUniversities' }
  ]

  const services = [
    {
      icon: BookOpen,
      title: 'Зерттеу ынтымақтастығы',
      description: 'Ғылыми зерттеулер мен академиялық жобаларда серіктестік',
      href: '/universities/research',
      features: ['Ғылыми гранттар', 'Зерттеу жобалары', 'Халықаралық ынтымақтастық']
    },
    {
      icon: Award,
      title: 'Оқу бағдарламасын дамыту',
      description: 'Заманауи оқу бағдарламаларын әзірлеу және жетілдіру',
      href: '/universities/curriculum',
      features: ['Бағдарлама әзірлеу', 'Сапа бағалау', 'Халықаралық стандарттар']
    },
    {
      icon: Users,
      title: 'Өнеркәсіп серіктестігі',
      description: 'Университет пен өнеркәсіп арасындағы байланыс орнату',
      href: '/universities/partnerships',
      features: ['Корпоративтік серіктестік', 'Тәжірибе орындары', 'Жұмысқа орналастыру']
    }
  ]

  const benefits = [
    {
      icon: Globe,
      title: 'Халықаралық танылу',
      description: 'Әлемдік деңгейде танылған сертификация'
    },
    {
      icon: Users,
      title: 'Сарапшылар желісі',
      description: 'Халықаралық сарапшылармен байланыс'
    },
    {
      icon: Search,
      title: 'Зерттеу мүмкіндіктері',
      description: 'Ғылыми зерттеулерге қолдау'
    }
  ]

  const stats = [
    { number: '150+', label: 'Серіктес университет' },
    { number: '50+', label: 'Ел' },
    { number: '300+', label: 'Бағдарлама' },
    { number: '95%', label: 'Сапа рейтингі' }
  ]

  const partnerUniversities = [
    'Назарбаев Университеті',
    'Қазақстан-Британ Техникалық Университеті',
    'Алматы Менеджмент Университеті',
    'Сәтбаев Университеті',
    'Қазақ Ұлттық Университеті',
    'Еуразия Ұлттық Университеті'
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              <TranslatedText textKey="mainNav.forUniversities" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Университеттер үшін серіктестік бағдарламалары, зерттеу ынтымақтастығы және
              академиялық дамыту мүмкіндіктері.
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

        {/* Services Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Біздің қызметтер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary-500 dark:bg-primary-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  Толығырақ
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Серіктестіктің артықшылықтары
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-100">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Universities */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Серіктес университеттер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {partnerUniversities.map((university, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {university}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/universities/finder"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
            >
              <Search className="mr-2 w-5 h-5" />
              Университет іздеу
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Серіктестікке қосылыңыз!
            </h2>
            <p className="text-secondary-100 mb-8 max-w-2xl mx-auto">
              Біздің серіктестік бағдарламаларына қатысып, университетіңіздің дамуына үлес қосыңыз
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/universities/research"
                className="inline-flex items-center px-8 py-3 bg-white text-secondary-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
              >
                Зерттеу ынтымақтастығы
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/universities/partnerships"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold rounded-lg transition-colors"
              >
                Серіктестік бағдарламалары
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
