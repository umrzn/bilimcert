import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import Link from 'next/link'
import { Briefcase, FileText, Users, Target, ArrowRight, CheckCircle, Star, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Мансап дамыту - Студенттерге',
  description: 'Студенттер үшін мансап дамыту қызметтері: CV жазу, сұхбат дайындығы, мансап кеңесі.',
}

export default function CareerPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Студенттерге', href: '/students', translationKey: 'mainNav.forStudents' },
    { title: 'Мансап дамыту', translationKey: 'mainNav.careerDevelopment' }
  ]

  const services = [
    {
      icon: FileText,
      title: 'CV жазу көмегі',
      description: 'Кәсіби CV және сопроводительное хат жазуда көмек',
      features: ['CV шаблондары', 'Жеке кеңес', 'Портфолио құру']
    },
    {
      icon: Users,
      title: 'Сұхбат дайындығы',
      description: 'Жұмысқа алу сұхбатына дайындық және практика',
      features: ['Mock интервью', 'Сұрақтар базасы', 'Стресс менеджменті']
    },
    {
      icon: Target,
      title: 'Мансап жоспарлау',
      description: 'Жеке мансап жолын жоспарлау және мақсат қою',
      features: ['Мансап картасы', 'SWOT талдау', 'Мақсат қою']
    }
  ]

  const steps = [
    {
      step: 1,
      title: 'Бағалау',
      description: 'Қазіргі дағдылар мен мүмкіндіктерді бағалау'
    },
    {
      step: 2,
      title: 'Жоспарлау',
      description: 'Жеке мансап жоспарын құру'
    },
    {
      step: 3,
      title: 'Дамыту',
      description: 'Қажетті дағдыларды дамыту'
    },
    {
      step: 4,
      title: 'Іске асыру',
      description: 'Жоспарды іске асыру және мониторинг'
    }
  ]

  const benefits = [
    'Кәсіби CV және портфолио',
    'Сұхбат дағдылары',
    'Мансап жоспары',
    'Желілік байланыстар',
    'Ментор қолдауы',
    'Жұмыс мүмкіндіктері'
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              <TranslatedText textKey="mainNav.careerDevelopment" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Мансабыңызды дамытуға көмек көрсетеміз. CV жазудан бастап сұхбат дайындығына дейін
              толық қолдау көрсетеміз.
            </p>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Мансап дамыту процесі
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">{step.step}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/20"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-primary-100 text-sm">
                    {step.description}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Не алып жүресіз?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Star className="w-5 h-5 text-secondary-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  85% табысты нәтиже
                </h3>
                <p className="text-gray-600 mb-6">
                  Біздің бағдарламаға қатысқан студенттердің 85%-ы 3 ай ішінде
                  жұмысқа орналасады
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-500">500+</div>
                    <div className="text-sm text-gray-600">Студент</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-500">200+</div>
                    <div className="text-sm text-gray-600">Компания</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Мансабыңызды бүгін бастаңыз!
            </h2>
            <p className="text-secondary-100 mb-8 max-w-2xl mx-auto">
              Біздің мансап дамыту бағдарламасына қатысып, арман жұмысыңызға қол жеткізіңіз
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
                href="/students/internships"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold rounded-lg transition-colors"
              >
                Тәжірибе бағдарламалары
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
