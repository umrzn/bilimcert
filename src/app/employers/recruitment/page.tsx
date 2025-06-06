import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import Link from 'next/link'
import { Search, Users, FileText, Target, ArrowRight, CheckCircle, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Талант іздеу - Жұмыс берушілерге',
  description: 'Жұмыс берушілер үшін талант іздеу қызметтері: CV базасы, іріктеу процесі, сұхбат ұйымдастыру.',
}

export default function RecruitmentPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Жұмыс берушілерге', href: '/employers', translationKey: 'mainNav.forEmployers' },
    { title: 'Талант іздеу', translationKey: 'mainNav.talentRecruitment' }
  ]

  const services = [
    {
      icon: FileText,
      title: 'CV базасы',
      description: 'Мыңдаған мамандардың CV-лары мен портфолиолары',
      features: ['Іздеу фильтрлері', 'Дағды бағалау', 'Тәжірибе деңгейі']
    },
    {
      icon: Users,
      title: 'Іріктеу процесі',
      description: 'Кандидаттарды іріктеу және бағалау жүйесі',
      features: ['Автоматты іріктеу', 'Тест тапсырмалары', 'Рейтинг жүйесі']
    },
    {
      icon: Target,
      title: 'Сұхбат ұйымдастыру',
      description: 'Онлайн және офлайн сұхбаттарды ұйымдастыру',
      features: ['Кестені жоспарлау', 'Видео сұхбат', 'Бағалау парақтары']
    }
  ]

  const benefits = [
    'Уақытты үнемдеу',
    'Сапалы кандидаттар',
    'Автоматты іріктеу',
    'Дағды бағалау',
    'Тәжірибе тексеру',
    'Ұсыныс хаттары'
  ]

  const process = [
    {
      step: 1,
      title: 'Вакансия жариялау',
      description: 'Жұмыс орнының сипаттамасы мен талаптарын жариялау'
    },
    {
      step: 2,
      title: 'Кандидаттар іздеу',
      description: 'CV базасынан сәйкес кандидаттарды іздеу'
    },
    {
      step: 3,
      title: 'Алдын ала іріктеу',
      description: 'Автоматты жүйе арқылы алдын ала іріктеу'
    },
    {
      step: 4,
      title: 'Сұхбат өткізу',
      description: 'Таңдалған кандидаттармен сұхбат өткізу'
    }
  ]

  const stats = [
    { number: '10000+', label: 'Маман базасы' },
    { number: '500+', label: 'Компания' },
    { number: '85%', label: 'Сәтті орналасу' },
    { number: '7 күн', label: 'Орташа уақыт' }
  ]

  const specializations = [
    'IT мамандар',
    'Инженерлер',
    'Қаржы мамандары',
    'Маркетинг',
    'HR мамандары',
    'Жоба менеджерлері',
    'Сату мамандары',
    'Дизайнерлер'
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <TranslatedText textKey="mainNav.talentRecruitment" />
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Білікті мамандарды тез және тиімді табыңыз. Біздің платформа арқылы 
              сапалы кандидаттарды іріктеп, жұмысқа алу процесін жеңілдетіңіз.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Біздің қызметтер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Іріктеу процесі
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">{step.step}</span>
                    </div>
                    {index < process.length - 1 && (
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

        {/* Specializations */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Мамандық бағыттары
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {specializations.map((spec, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-secondary-500" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {spec}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Артықшылықтар
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="text-center">
                  <Clock className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    7 күнде нәтиже
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Біздің платформа арқылы орташа есеппен 7 күн ішінде 
                    сәйкес кандидаттарды табасыз
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-500">95%</div>
                      <div className="text-sm text-gray-600">Сәтті іріктеу</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-500">3x</div>
                      <div className="text-sm text-gray-600">Жылдам процес</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Тарифтер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: 'Базалық',
                price: '50,000 ₸',
                period: 'айына',
                features: ['5 вакансия', 'CV базасына қолжетімділік', 'Негізгі іріктеу']
              },
              {
                name: 'Кәсіби',
                price: '150,000 ₸',
                period: 'айына',
                features: ['20 вакансия', 'Кеңейтілген іздеу', 'Сұхбат ұйымдастыру', 'Аналитика'],
                popular: true
              },
              {
                name: 'Корпоративтік',
                price: 'Келісім бойынша',
                period: '',
                features: ['Шектеусіз вакансия', 'Жеке менеджер', 'API интеграция', 'Кастомизация']
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl p-8 ${plan.popular ? 'ring-2 ring-secondary-500 shadow-xl' : 'shadow-lg'}`}>
                {plan.popular && (
                  <div className="bg-secondary-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Танымал
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/application"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Таңдау
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Талант іздеуді бүгін бастаңыз!
            </h2>
            <p className="text-secondary-100 mb-8 max-w-2xl mx-auto">
              Біздің платформа арқылы білікті мамандарды табыңыз және командаңызды күшейтіңіз
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/application"
                className="inline-flex items-center px-8 py-3 bg-white text-secondary-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
              >
                Бастау
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/employers/development"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold rounded-lg transition-colors"
              >
                Кәсіби дамыту
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
