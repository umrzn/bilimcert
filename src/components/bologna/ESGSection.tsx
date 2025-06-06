'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Download,
  ExternalLink,
  Award,
  FileText,
  Globe,
  ArrowRight
} from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'

interface ESGStandard {
  id: string
  title: string
  description: string
  requirements: string[]
  kazakhstanStatus: 'implemented' | 'in_progress' | 'planned'
  documents: Array<{
    title: string
    url: string
    type: 'pdf' | 'doc' | 'link'
  }>
}

const esgStandards: ESGStandard[] = [
  {
    id: 'esg-1.1',
    title: 'Сапа қамтамасыз ету саясаты',
    description: 'Білім беру ұйымы сапа қамтамасыз ету саясатын әзірлеп, жариялауы және іске асыруы тиіс.',
    requirements: [
      'Сапа саясатын әзірлеу және бекіту',
      'Барлық қызметкерлерге хабарлау',
      'Тұрақты мониторинг және бағалау',
      'Үздіксіз жетілдіру процестері'
    ],
    kazakhstanStatus: 'implemented',
    documents: [
      { title: 'ESG 1.1 Нұсқаулық', url: '/docs/esg-1-1-guide.pdf', type: 'pdf' },
      { title: 'Үлгі саясат', url: '/docs/sample-policy.doc', type: 'doc' }
    ]
  },
  {
    id: 'esg-1.2',
    title: 'Бағдарламаларды әзірлеу және бекіту',
    description: 'Білім беру бағдарламалары нақты мақсаттарға сәйкес әзірленіп, формальды түрде бекітілуі тиіс.',
    requirements: [
      'Оқу нәтижелерін анықтау',
      'Мазмұн мен құрылымды жоспарлау',
      'Бағалау әдістерін әзірлеу',
      'Тұрақты қайта қарау процестері'
    ],
    kazakhstanStatus: 'implemented',
    documents: [
      { title: 'Бағдарлама әзірлеу нұсқаулығы', url: '/docs/program-development.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'esg-1.3',
    title: 'Студент-орталықты оқыту',
    description: 'Оқыту процесі студенттердің белсенді қатысуын ынталандыратын әдістерге негізделуі тиіс.',
    requirements: [
      'Интерактивті оқыту әдістері',
      'Студенттердің кері байланысы',
      'Жеке оқу траекториялары',
      'Практикалық дағдыларды дамыту'
    ],
    kazakhstanStatus: 'in_progress',
    documents: [
      { title: 'Студент-орталықты оқыту әдістемесі', url: '/docs/student-centered.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'esg-1.4',
    title: 'Студенттерді қабылдау, үлгерімі және тану',
    description: 'Студенттерді қабылдау, олардың үлгерімін бағалау және жетістіктерін тану процедуралары.',
    requirements: [
      'Ашық қабылдау процедуралары',
      'Объективті бағалау критерийлері',
      'Тану процедураларының ашықтығы',
      'Апелляция механизмдері'
    ],
    kazakhstanStatus: 'implemented',
    documents: [
      { title: 'Қабылдау ережелері', url: '/docs/admission-rules.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'esg-1.5',
    title: 'Оқытушылар',
    description: 'Оқытушылар біліктілігі мен кәсіби дамуына қойылатын талаптар.',
    requirements: [
      'Біліктілік талаптары',
      'Кәсіби даму бағдарламалары',
      'Оқыту сапасын бағалау',
      'Ғылыми-зерттеу қызметі'
    ],
    kazakhstanStatus: 'in_progress',
    documents: [
      { title: 'Оқытушылар біліктілігі стандарты', url: '/docs/teacher-qualifications.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'esg-1.6',
    title: 'Оқу ресурстары мен студенттерге қолдау',
    description: 'Студенттердің оқу процесіне қажетті ресурстар мен қолдау қызметтері.',
    requirements: [
      'Кітапхана ресурстары',
      'IT инфрақұрылымы',
      'Академиялық кеңес беру',
      'Әлеуметтік қолдау'
    ],
    kazakhstanStatus: 'in_progress',
    documents: [
      { title: 'Оқу ресурстары стандарты', url: '/docs/learning-resources.pdf', type: 'pdf' }
    ]
  }
]

const implementationStats = {
  implemented: esgStandards.filter(s => s.kazakhstanStatus === 'implemented').length,
  in_progress: esgStandards.filter(s => s.kazakhstanStatus === 'in_progress').length,
  planned: esgStandards.filter(s => s.kazakhstanStatus === 'planned').length,
  total: esgStandards.length
}

export function ESGSection() {
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'standards' | 'implementation'>('overview')

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      implemented: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Іске асырылған' },
      in_progress: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Орындалуда' },
      planned: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'Жоспарланған' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          ESG - Еуропалық стандарттар мен нұсқаулықтар
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Жоғары білім беру сапасын қамтамасыз ету үшін Еуропалық стандарттар мен нұсқаулықтар
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{implementationStats.implemented}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Іске асырылған</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{implementationStats.in_progress}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Орындалуда</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{implementationStats.planned}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Жоспарланған</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{implementationStats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Жалпы стандарт</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Жалпы шолу', icon: Globe },
            { id: 'standards', label: 'Стандарттар', icon: BookOpen },
            { id: 'implementation', label: 'Іске асыру', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                ESG туралы
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Еуропалық стандарттар мен нұсқаулықтар (ESG) - бұл Еуропалық жоғары білім кеңістігіндегі 
                сапа қамтамасыз етудің негізгі құжаты. ESG үш бөлімнен тұрады: ішкі сапа қамтамасыз ету, 
                сыртқы сапа қамтамасыз ету және сапа қамтамасыз ету агенттіктері.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">1-бөлім</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ішкі сапа қамтамасыз ету (7 стандарт)
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">2-бөлім</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Сыртқы сапа қамтамасыз ету (7 стандарт)
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">3-бөлім</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Сапа қамтамасыз ету агенттіктері (5 стандарт)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'standards' && (
          <div className="space-y-6">
            {esgStandards.map((standard) => (
              <motion.div
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedStandard(selectedStandard === standard.id ? null : standard.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {standard.id.toUpperCase()}: {standard.title}
                        </h3>
                        {getStatusBadge(standard.kazakhstanStatus)}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {standard.description}
                      </p>
                    </div>
                    <ArrowRight 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        selectedStandard === standard.id ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </div>

                {selectedStandard === standard.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          Негізгі талаптар:
                        </h4>
                        <ul className="space-y-2">
                          {standard.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300 text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          Құжаттар:
                        </h4>
                        <div className="space-y-2">
                          {standard.documents.map((doc, index) => (
                            <a
                              key={index}
                              href={doc.url}
                              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FileText className="w-4 h-4 text-gray-500 mr-3" />
                              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                                {doc.title}
                              </span>
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Қазақстандағы іске асыру барысы
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-300">Іске асырылған стандарттар</h4>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                      {implementationStats.implemented} стандарт толық іске асырылды
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.round((implementationStats.implemented / implementationStats.total) * 100)}%
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Орындалып жатқан стандарттар</h4>
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                      {implementationStats.in_progress} стандарт қазіргі уақытта орындалуда
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {Math.round((implementationStats.in_progress / implementationStats.total) * 100)}%
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Келесі қадамдар:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary-600 dark:text-primary-400 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          Студент-орталықты оқыту әдістемесін толық енгізу
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          2024 жылдың соңына дейін барлық ЖОО-да іске асыру
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary-600 dark:text-primary-400 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          Оқытушылардың біліктілігін арттыру
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          Халықаралық стандарттарға сәйкес даярлау бағдарламалары
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary-600 dark:text-primary-400 text-xs font-bold">3</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          Цифрлық оқу ресурстарын дамыту
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          Заманауи технологиялар мен платформаларды енгізу
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
