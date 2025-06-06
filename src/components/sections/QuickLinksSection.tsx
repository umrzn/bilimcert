'use client'

import Link from 'next/link'
import { ExternalLink, Globe, Building, Users } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

const quickLinks = [
  {
    title: 'Электрондық үкімет порталы',
    description: 'Мемлекеттік қызметтерге онлайн қол жеткізу',
    url: 'https://egov.kz',
    icon: Globe,
    color: 'bg-blue-500'
  },
  {
    title: 'Білім және ғылым министрлігі',
    description: 'ҚР Білім және ғылым министрлігінің ресми сайты',
    url: 'https://edu.gov.kz',
    icon: Building,
    color: 'bg-green-500'
  },
  {
    title: 'Білім беру ұйымдарының дерекқоры',
    description: 'Қазақстандағы білім беру ұйымдарының толық тізімі',
    url: 'https://nobd.edu.kz',
    icon: Users,
    color: 'bg-purple-500'
  }
]

export function QuickLinksSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <TranslatedText textKey="common.quickLinks" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Пайдалы ресурстар мен мемлекеттік қызметтерге жылдам қол жеткізу
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className={`${link.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {link.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-primary-50 dark:bg-gray-800 rounded-xl p-6 border border-primary-100 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-400 mb-2">
              Көмек қажет пе?
            </h3>
            <p className="text-primary-700 dark:text-gray-300 mb-4">
              Біздің мамандар сізге кез келген сұрақ бойынша көмектесуге дайын
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center px-6 py-2 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Байланысу
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
