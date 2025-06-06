'use client'

import { Shield, Clock, Globe, Users, Award, CheckCircle } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

const features = [
  {
    icon: Shield,
    title: 'Сенімділік пен қауіпсіздік',
    description: 'Барлық деректер қорғалған және халықаралық стандарттарға сәйкес өңделеді',
    color: 'bg-blue-500'
  },
  {
    icon: Clock,
    title: 'Жылдам қызмет көрсету',
    description: 'Өтініштер 24 сағат ішінде өңделеді және нәтижелер жылдам беріледі',
    color: 'bg-green-500'
  },
  {
    icon: Globe,
    title: 'Халықаралық танылу',
    description: 'Біздің сертификаттар 50+ елде танылады және қабылданады',
    color: 'bg-purple-500'
  },
  {
    icon: Users,
    title: 'Сарапшылар тобы',
    description: 'Тәжірибелі мамандар мен халықаралық сарапшылардың командасы',
    color: 'bg-orange-500'
  },
  {
    icon: Award,
    title: 'Сапа кепілдігі',
    description: 'ISO 9001 стандарттары бойынша сертификатталған сапа менеджменті',
    color: 'bg-indigo-500'
  },
  {
    icon: CheckCircle,
    title: 'Толық қолдау',
    description: '24/7 техникалық қолдау және кеңес беру қызметтері',
    color: 'bg-pink-500'
  }
]

export function FeatureSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <TranslatedText textKey="home.whyChooseUs" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Біз неліктен Қазақстандағы ең сенімді білім сапасын бағалау орталығымыз
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className={`${feature.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                1000+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Аккредиттелген бағдарлама
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Серіктес ел
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                10000+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Танылған диплом
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                15+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Жылдық тәжірибе
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
