'use client'

import Link from 'next/link'
import {
  FileText,
  Award,
  Globe,
  Search,
  Users,
  Building2,
  HelpCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

const quickAccessItems = [
  {
    key: 'recognition',
    href: '/recognition',
    icon: FileText,
    color: 'bg-blue-500',
    description: 'Шетелдік білім туралы құжаттарды тану'
  },
  {
    key: 'accreditation',
    href: '/accreditation',
    icon: Award,
    color: 'bg-green-500',
    description: 'Білім беру бағдарламаларын аккредиттеу'
  },
  {
    key: 'bolognaProcess',
    href: '/bologna-process',
    icon: Globe,
    color: 'bg-purple-500',
    description: 'Болон процесі туралы ақпарат'
  },
  {
    key: 'applicationStatus',
    href: '/application-status',
    icon: Search,
    color: 'bg-orange-500',
    description: 'Өтініш мәртебесін тексеру'
  },
  {
    key: 'universityFinder',
    href: '/universities/finder',
    icon: Building2,
    color: 'bg-indigo-500',
    description: 'Университет іздеу'
  },
  {
    key: 'faq',
    href: '/faq',
    icon: HelpCircle,
    color: 'bg-pink-500',
    description: 'Жиі қойылатын сұрақтар'
  }
]

export function QuickAccessSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <TranslatedText textKey="home.quickAccess" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Біздің қызметтерге жылдам қол жеткізу үшін төмендегі сілтемелерді пайдаланыңыз
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quickAccessItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 p-6 border border-gray-100 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className={`${item.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                    <TranslatedText textKey={`header.${item.key}`} />
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center text-primary-500 dark:text-primary-400 text-sm font-medium group-hover:text-primary-600 dark:group-hover:text-primary-300">
                    <span>Көбірек білу</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-600">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Өтініш беруге дайынсыз ба?
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Біздің онлайн платформа арқылы өтінішіңізді жылдам және оңай жіберіңіз
            </p>
            <Link
              href="/application"
              className="inline-flex items-center px-8 py-3 bg-secondary-500 dark:bg-orange-600 hover:bg-secondary-600 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700"
            >
              <TranslatedText textKey="header.applyButton" />
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
