import { Metadata } from 'next'
import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { QuestionForm } from '@/components/forms/QuestionForm'
import { QuestionsList } from '@/components/questions/QuestionsList'
import { MessageSquare, HelpCircle, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Сұрақтар мен жауаптар | BilimCert',
  description: 'Аккредитация, дипломды тану және білім беру саласы бойынша сұрақтар мен жауаптар',
  keywords: 'сұрақтар, жауаптар, аккредитация, дипломды тану, білім беру, BilimCert'
}

const breadcrumbItems = [
  { title: "Сұрақтар", href: "/questions" }
]

export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <FullWidthHeader />

      <main>
        {/* Breadcrumbs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-gray-800 dark:to-gray-900 text-white py-16 transition-colors duration-200">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 dark:bg-gray-700/50 p-4 rounded-full">
                  <MessageSquare className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Сұрақтар мен жауаптар
              </h1>
              <p className="text-xl text-primary-100 dark:text-gray-300 mb-8 leading-relaxed">
                Аккредитация, дипломды тану және білім беру саласы бойынша сұрақтарыңызды қойыңыз.
                Біздің сарапшылар сізге толық жауап береді.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="bg-white/10 dark:bg-gray-700/50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-primary-100 dark:text-gray-300">Жауап берілген сұрақ</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 dark:bg-gray-700/50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">1000+</div>
                  <div className="text-primary-100 dark:text-gray-300">Қолданушы</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 dark:bg-gray-700/50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">24 сағат</div>
                  <div className="text-primary-100 dark:text-gray-300">Орташа жауап уақыты</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Question Form */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <QuestionForm />

                  {/* Help Text */}
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">
                      Сұрақ қоюдан бұрын:
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• Сұрағыңыз бұрын қойылған жоқ па екенін тексеріңіз</li>
                      <li>• Сұрағыңызды неғұрлым нақты жазыңыз</li>
                      <li>• Қажетті құжаттар мен мәліметтерді көрсетіңіз</li>
                      <li>• Жауап 24-48 сағат ішінде келеді</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Жиі қойылатын сұрақтар
                  </h2>
                  <p className="text-gray-600">
                    Басқа қолданушылардың сұрақтары мен жауаптарын қараңыз.
                    Мүмкін сіздің сұрағыңызға жауап табылар.
                  </p>
                </div>

                <QuestionsList />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Жиі қойылатын сұрақтар
                </h2>
                <p className="text-gray-600">
                  Ең көп қойылатын сұрақтарға жауаптар
                </p>
              </div>

              <div className="space-y-6">
                <details className="bg-gray-50 rounded-lg p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Аккредитация қанша уақыт алады?
                  </summary>
                  <div className="mt-4 text-gray-700">
                    Аккредитация процесі әдетте 3-6 ай аралығында жүреді. Дәл уақыт
                    бағдарламаның күрделілігі мен ұсынылған құжаттардың толықтығына байланысты.
                  </div>
                </details>

                <details className="bg-gray-50 rounded-lg p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Шетелдік дипломды тану үшін қандай құжаттар қажет?
                  </summary>
                  <div className="mt-4 text-gray-700">
                    Дипломның түпнұсқасы, нотариалды куәландырылған аудармасы,
                    академиялық анықтама, паспорт көшірмесі және басқа да қажетті құжаттар.
                  </div>
                </details>

                <details className="bg-gray-50 rounded-lg p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Болонья процесіне қосылу міндетті ме?
                  </summary>
                  <div className="mt-4 text-gray-700">
                    Болонья процесіне қосылу міндетті емес, бірақ халықаралық танылу
                    және студенттердің ұтқырлығы үшін ұсынылады.
                  </div>
                </details>

                <details className="bg-gray-50 rounded-lg p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Аккредитация құны қанша?
                  </summary>
                  <div className="mt-4 text-gray-700">
                    Аккредитация құны бағдарламаның түріне және күрделілігіне байланысты.
                    Дәл ақпарат алу үшін біз бен хабарласыңыз.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
