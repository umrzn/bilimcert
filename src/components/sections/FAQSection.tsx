'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Шетелдік дипломды тану үшін қандай құжаттар қажет?',
    answer: 'Шетелдік дипломды тану үшін түпнұсқа диплом, оның нотариалды куәландырылған көшірмесі, академиялық анықтама, паспорт көшірмесі және өтініш қажет.',
    category: 'recognition'
  },
  {
    id: 2,
    question: 'Аккредитация процесі қанша уақыт алады?',
    answer: 'Аккредитация процесі әдетте 3-6 ай аралығында жүргізіледі. Дәл мерзім бағдарламаның күрделілігі мен құжаттардың толықтығына байланысты.',
    category: 'accreditation'
  },
  {
    id: 3,
    question: 'Болон процесі дегеніміз не?',
    answer: 'Болон процесі - бұл Еуропалық жоғары білім кеңістігін құру мақсатында жүргізілетін реформалар жүйесі. Ол білім беру сапасын арттыруға және студенттердің ұтқырлығын қамтамасыз етуге бағытталған.',
    category: 'bologna'
  },
  {
    id: 4,
    question: 'Өтініш мәртебесін қалай тексеруге болады?',
    answer: 'Өтініш мәртебесін біздің веб-сайттағы "Өтініш мәртебесі" бөлімінде тексере аласыз. Ол үшін өтініш нөмірі мен жеке деректеріңізді енгізу қажет.',
    category: 'applications'
  },
  {
    id: 5,
    question: 'Қызметтердің құны қанша?',
    answer: 'Қызметтердің құны қызмет түріне байланысты. Дипломды тану - 50,000 теңге, аккредитация - 500,000 теңгеден басталады. Толық тарифтер кестесін сайтта көре аласыз.',
    category: 'general'
  }
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-primary-500 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              <TranslatedText textKey="faq.title" />
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <TranslatedText textKey="faq.subtitle" />
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-12">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-inset"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItems.includes(item.id)}
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${openItems.includes(item.id) ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* More FAQ Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Басқа сұрақтарыңыз бар ма?
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center px-6 py-3 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Барлық сұрақтарды көру
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
