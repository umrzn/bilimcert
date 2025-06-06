import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { RecognitionCalculator } from '@/components/calculators/RecognitionCalculator'
import Link from 'next/link'
import { FileText, Clock, CheckCircle, ArrowRight, Download, Upload, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Шетелдік білім туралы құжаттарды тану',
  description: 'Шетелдік білім беру ұйымдарында алынған дипломдар мен сертификаттарды Қазақстанда тану процедурасы.',
}

export default function RecognitionPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Шетелдік білім туралы құжаттарды тану', translationKey: 'header.recognition' }
  ]

  const requiredDocuments = [
    'Шетелдік білім беру ұйымының дипломы (түпнұсқа)',
    'Дипломның нотариалды куәландырылған көшірмесі',
    'Академиялық анықтама (transcript)',
    'Паспорттың көшірмесі',
    'Өтініш (онлайн толтырылады)',
    '3x4 фотосурет (2 дана)'
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Құжаттарды дайындау',
      description: 'Қажетті құжаттарды жинап, аударма жасатыңыз',
      icon: FileText
    },
    {
      step: 2,
      title: 'Онлайн өтініш',
      description: 'Біздің сайт арқылы өтініш беріп, құжаттарды жүктеңіз',
      icon: Upload
    },
    {
      step: 3,
      title: 'Сараптама',
      description: 'Мамандар құжаттарды тексеріп, сараптама жүргізеді',
      icon: Clock
    },
    {
      step: 4,
      title: 'Нәтиже алу',
      description: 'Тану туралы куәлікті алыңыз',
      icon: CheckCircle
    }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            <TranslatedText textKey="header.recognition" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Шетелдік білім беру ұйымдарында алынған дипломдар мен сертификаттарды
            Қазақстан Республикасында тану процедурасы
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Тану процесі
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 dark:bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
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

        {/* Required Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Қажетті құжаттар
            </h2>
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200">{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-600 transition-colors duration-200">
              <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                Маңызды ескерту
              </h3>
              <p className="text-blue-800 dark:text-gray-300 text-sm">
                Барлық шетелдік құжаттар қазақ немесе орыс тіліне аударылып,
                нотариалды куәландырылуы тиіс.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Мерзімдер мен құны
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Қарапайым тану
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Мерзім:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">30 күн</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Құны:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">50,000 ₸</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Жедел тану
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Мерзім:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">15 күн</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Құны:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">75,000 ₸</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/recognition/calculator"
                className="inline-flex items-center px-6 py-3 bg-secondary-500 dark:bg-orange-600 hover:bg-secondary-600 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
              >
                Құнды есептеу
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Calculator Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Тану құнын есептеу
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Дипломыңызды тану процесінің құны мен уақытын алдын ала есептеп көріңіз
            </p>
          </div>
          <RecognitionCalculator />
        </div>

        {/* CTA Section */}
        <div className="bg-primary-500 dark:bg-gray-800 rounded-xl text-white p-8 md:p-12 text-center transition-colors duration-200">
          <h2 className="text-3xl font-bold mb-4">
            Өтініш беруге дайынсыз ба?
          </h2>
          <p className="text-primary-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Онлайн өтініш беру жүйесі арқылы құжаттарыңызды жіберіп,
            процестің барысын қадағалаңыз
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recognition/application"
              className="inline-flex items-center px-8 py-3 bg-secondary-500 dark:bg-orange-600 hover:bg-secondary-600 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
            >
              Өтініш беру
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/recognition/guide"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-500 dark:hover:text-gray-800 font-semibold rounded-lg transition-colors"
            >
              <Download className="mr-2 w-5 h-5" />
              Нұсқаулықты жүктеу
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
