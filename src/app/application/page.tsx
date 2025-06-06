import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { MultiStepApplicationForm } from '@/components/forms/MultiStepApplicationForm'
import Link from 'next/link'
import { FileText, User, Mail, Phone, Upload, Send, CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Өтініш беру - BilimCert',
  description: 'BilimCert қызметтеріне өтініш беру формасы. Біздің бағдарламаларға қатысу үшін өтініш жіберіңіз.',
}

export default function ApplicationPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Өтініш беру', translationKey: 'header.applyButton' }
  ]

  const applicationTypes = [
    {
      id: 'student',
      title: 'Студент ретінде',
      description: 'Мансап дамыту, тәжірибе және дағды дамыту бағдарламаларына қатысу',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 'university',
      title: 'Университет ретінде',
      description: 'Зерттеу ынтымақтастығы және академиялық серіктестік',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      id: 'employer',
      title: 'Жұмыс беруші ретінде',
      description: 'Талант іздеу және корпоративтік серіктестік',
      icon: Mail,
      color: 'bg-purple-500'
    }
  ]

  const requiredDocuments = [
    'Жеке куәлік көшірмесі',
    'Білім туралы құжат',
    'CV немесе резюме',
    'Мотивациялық хат',
    'Портфолио (қажет болса)',
    'Ұсыныс хаттары (2 дана)'
  ]

  const steps = [
    {
      step: 1,
      title: 'Өтініш түрін таңдау',
      description: 'Студент, университет немесе жұмыс беруші ретінде өтініш беру'
    },
    {
      step: 2,
      title: 'Форманы толтыру',
      description: 'Жеке мәліметтер мен қосымша ақпаратты енгізу'
    },
    {
      step: 3,
      title: 'Құжаттарды жүктеу',
      description: 'Қажетті құжаттарды жүйеге жүктеу'
    },
    {
      step: 4,
      title: 'Өтінішті жіберу',
      description: 'Өтінішті тексеру және жіберу'
    }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              <TranslatedText textKey="header.applyButton" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              BilimCert қызметтеріне өтініш беріңіз. Біздің бағдарламаларға қатысып,
              кәсіби дамуыңызға жаңа серпін беріңіз.
            </p>
          </div>

          {/* Application Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {applicationTypes.map((type, index) => (
              <div key={type.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-400">
                <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-6`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {type.description}
                </p>
                <button className="w-full bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Таңдау
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-primary-500 dark:bg-gray-800 text-white py-16 transition-colors duration-200">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Өтініш беру процесі
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white/10 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">{step.step}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/20 dark:bg-gray-600"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-primary-100 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Қажетті құжаттар
              </h2>
              <div className="space-y-4">
                {requiredDocuments.map((document, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{document}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-gray-800 border border-yellow-200 dark:border-gray-600 rounded-lg transition-colors duration-200">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Назар аударыңыз</h4>
                    <p className="text-yellow-700 dark:text-gray-300 text-sm">
                      Барлық құжаттар PDF, JPG немесе PNG форматында болуы керек.
                      Файл өлшемі 5MB-тан аспауы тиіс.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 transition-colors duration-200">
              <div className="text-center">
                <Upload className="w-16 h-16 text-primary-500 dark:text-primary-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Құжаттарды дайындаңыз
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Өтініш беру алдында барлық қажетті құжаттарды дайындап алыңыз.
                  Бұл процесті жеңілдетеді.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-500 dark:text-primary-400">5MB</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Макс. өлшем</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-500 dark:text-orange-400">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Формат түрі</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Step Application Form */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-200">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <MultiStepApplicationForm />
          </div>
        </div>

        {/* Contact Info */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Сұрақтарыңыз бар ма?
            </h2>
            <p className="text-secondary-100 mb-8 max-w-2xl mx-auto">
              Өтініш беру процесі туралы сұрақтарыңыз болса, біздің командамызбен байланысыңыз
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts"
                className="inline-flex items-center px-8 py-3 bg-white text-secondary-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Байланысу
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold rounded-lg transition-colors"
              >
                Жиі қойылатын сұрақтар
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
