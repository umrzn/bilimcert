import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import Link from 'next/link'
import { BookOpen, Building, Globe, Clock, ArrowRight, CheckCircle, Users, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Тәжірибе бағдарламалары - Студенттерге',
  description: 'Студенттер үшін тәжірибе бағдарламалары: жазғы тәжірибе, ұзақ мерзімді тәжірибе, халықаралық мүмкіндіктер.',
}

export default function InternshipsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Студенттерге', href: '/students', translationKey: 'mainNav.forStudents' },
    { title: 'Тәжірибе бағдарламалары', translationKey: 'mainNav.internships' }
  ]

  const programs = [
    {
      icon: Clock,
      title: 'Жазғы тәжірибе',
      duration: '2-3 ай',
      description: 'Жазғы демалыс кезінде қысқа мерзімді тәжірибе',
      features: ['Гибкий график', 'Ментор қолдауы', 'Сертификат'],
      companies: ['Казахтелеком', 'Halyk Bank', 'KazMunayGas']
    },
    {
      icon: Building,
      title: 'Ұзақ мерзімді тәжірибе',
      duration: '6-12 ай',
      description: 'Толық жұмыс күні режимінде ұзақ мерзімді тәжірибе',
      features: ['Толық жұмыс күні', 'Жалақы', 'Жұмысқа орналасу мүмкіндігі'],
      companies: ['Kcell', 'Beeline', 'Tengizchevroil']
    },
    {
      icon: Globe,
      title: 'Халықаралық тәжірибе',
      duration: '3-6 ай',
      description: 'Шетелдік компанияларда тәжірибе өту мүмкіндігі',
      features: ['Виза қолдауы', 'Тұрғын үй', 'Мәдени бағдарлама'],
      companies: ['Microsoft', 'Google', 'Amazon']
    }
  ]

  const requirements = [
    'Университетте 2-курстан жоғары оқу',
    'GPA 3.0-ден жоғары',
    'Ағылшын тілін білу (B2 деңгейі)',
    'Мотивациялық хат',
    'Ұсыныс хаттары (2 дана)',
    'Портфолио немесе жобалар'
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Практикалық тәжірибе',
      description: 'Нақты жобаларда жұмыс істеу тәжірибесі'
    },
    {
      icon: Award,
      title: 'Кәсіби дамыту',
      description: 'Индустрия сарапшыларынан үйрену'
    },
    {
      icon: Building,
      title: 'Желілік байланыс',
      description: 'Кәсіби байланыстар орнату'
    }
  ]

  const stats = [
    { number: '300+', label: 'Тәжірибе орны' },
    { number: '150+', label: 'Серіктес компания' },
    { number: '90%', label: 'Жұмысқа орналасу' },
    { number: '25+', label: 'Ел' }
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
              <TranslatedText textKey="mainNav.internships" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ірі компанияларда тәжірибе өтіп, кәсіби дағдыларыңызды дамытыңыз.
              Жазғы, ұзақ мерзімді және халықаралық мүмкіндіктер.
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

        {/* Programs */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Тәжірибе бағдарламалары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {programs.map((program, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                  <program.icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {program.title}
                  </h3>
                  <span className="text-sm bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full">
                    {program.duration}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {program.description}
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Артықшылықтар:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Серіктес компаниялар:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.companies.map((company, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-primary-500 dark:bg-gray-800 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Қатысу талаптары
                </h2>
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary-400 dark:text-secondary-300 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-primary-100 dark:text-gray-300">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 dark:bg-gray-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Өтініш беру процесі
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-secondary-500 dark:bg-secondary-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      1
                    </div>
                    <span>Онлайн өтініш толтыру</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-secondary-500 dark:bg-secondary-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      2
                    </div>
                    <span>Құжаттарды жүктеу</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-secondary-500 dark:bg-secondary-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      3
                    </div>
                    <span>Сұхбат өту</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-secondary-500 dark:bg-secondary-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      4
                    </div>
                    <span>Тәжірибе бастау</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Тәжірибенің пайдасы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-primary-500 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 dark:from-secondary-600 dark:to-secondary-700 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Тәжірибеге өтініш беріңіз!
            </h2>
            <p className="text-secondary-100 dark:text-secondary-200 mb-8 max-w-2xl mx-auto">
              Ірі компанияларда тәжірибе өтіп, болашақ мансабыңызға қадам жасаңыз
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/application"
                className="inline-flex items-center px-8 py-3 bg-white dark:bg-gray-100 text-secondary-500 dark:text-secondary-600 hover:bg-gray-100 dark:hover:bg-gray-200 font-semibold rounded-lg transition-colors"
              >
                Өтініш беру
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/students/skills"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-secondary-500 dark:hover:text-secondary-600 font-semibold rounded-lg transition-colors"
              >
                Дағды дамыту
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
