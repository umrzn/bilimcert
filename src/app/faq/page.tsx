'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { ChevronDown, Search, HelpCircle, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface FAQ {
  id: number
  question: string
  answer: string
  category: 'general' | 'accreditation' | 'recognition' | 'bologna' | 'applications' | 'technical'
  helpfulVotes: number
  notHelpfulVotes: number
  viewsCount: number
  featured: boolean
}

const mockFAQs: FAQ[] = [
  {
    id: 1,
    question: 'Шетелдік дипломды тану үшін қандай құжаттар қажет?',
    answer: 'Шетелдік дипломды тану үшін мынадай құжаттар қажет: 1) Түпнұсқа диплом және оның нотариалды куәландырылған көшірмесі; 2) Академиялық анықтама (transcript); 3) Паспорт көшірмесі; 4) Өтініш (онлайн толтырылады); 5) 3x4 фотосурет (2 дана). Барлық шетелдік құжаттар қазақ немесе орыс тіліне аударылып, нотариалды куәландырылуы тиіс.',
    category: 'recognition',
    helpfulVotes: 45,
    notHelpfulVotes: 3,
    viewsCount: 1250,
    featured: true
  },
  {
    id: 2,
    question: 'Аккредитация процесі қанша уақыт алады?',
    answer: 'Аккредитация процесі әдетте 3-6 ай аралығында жүргізіледі. Дәл мерзім бағдарламаның күрделілігі мен құжаттардың толықтығына байланысты. Процесс мынадай кезеңдерден тұрады: өтініш беру (1-2 ай), өзін-өзі бағалау (2-3 ай), сыртқы бағалау (1-2 апта), шешім қабылдау (1 ай).',
    category: 'accreditation',
    helpfulVotes: 38,
    notHelpfulVotes: 2,
    viewsCount: 890,
    featured: true
  },
  {
    id: 3,
    question: 'Болон процесі дегеніміз не?',
    answer: 'Болон процесі - бұл Еуропалық жоғары білім кеңістігін құру мақсатында жүргізілетін реформалар жүйесі. Ол білім беру сапасын арттыруға және студенттердің ұтқырлығын қамтамасыз етуге бағытталған. Негізгі құралдары: ECTS кредиттік жүйесі, үш циклді жүйе (бакалавриат-магистратура-докторантура), дипломдық қосымша, сапа кепілдігі.',
    category: 'bologna',
    helpfulVotes: 52,
    notHelpfulVotes: 1,
    viewsCount: 1100,
    featured: true
  },
  {
    id: 4,
    question: 'Өтініш мәртебесін қалай тексеруге болады?',
    answer: 'Өтініш мәртебесін біздің веб-сайттағы "Өтініш мәртебесі" бөлімінде тексере аласыз. Ол үшін өтініш нөмірі мен жеке деректеріңізді енгізу қажет. Сондай-ақ, SMS немесе email арқылы хабарландыру алуға болады.',
    category: 'applications',
    helpfulVotes: 29,
    notHelpfulVotes: 0,
    viewsCount: 650,
    featured: false
  },
  {
    id: 5,
    question: 'Қызметтердің құны қанша?',
    answer: 'Қызметтердің құны қызмет түріне байланысты: Дипломды тану - 50,000 теңге (қарапайым) немесе 75,000 теңге (жедел); Институционалдық аккредитация - 500,000 теңгеден басталады; Бағдарламалық аккредитация - 300,000 теңгеден басталады. Толық тарифтер кестесін сайтта көре аласыз.',
    category: 'general',
    helpfulVotes: 67,
    notHelpfulVotes: 5,
    viewsCount: 1800,
    featured: false
  }
]

const categories = [
  { key: 'all', name: 'Барлығы', count: 25 },
  { key: 'general', name: 'Жалпы сұрақтар', count: 8 },
  { key: 'recognition', name: 'Тану', count: 6 },
  { key: 'accreditation', name: 'Аккредитация', count: 5 },
  { key: 'bologna', name: 'Болон процесі', count: 3 },
  { key: 'applications', name: 'Өтініштер', count: 2 },
  { key: 'technical', name: 'Техникалық', count: 1 }
]

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Жиі қойылатын сұрақтар', translationKey: 'header.faq' }
  ]

  useEffect(() => {
    // Simulate API call
    const fetchFAQs = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setFaqs(mockFAQs)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const featuredFAQs = filteredFAQs.filter(faq => faq.featured)
  const regularFAQs = filteredFAQs.filter(faq => !faq.featured)

  const handleVote = (id: number, type: 'helpful' | 'not-helpful') => {
    setFaqs(prev => prev.map(faq =>
      faq.id === id
        ? {
          ...faq,
          helpfulVotes: type === 'helpful' ? faq.helpfulVotes + 1 : faq.helpfulVotes,
          notHelpfulVotes: type === 'not-helpful' ? faq.notHelpfulVotes + 1 : faq.notHelpfulVotes
        }
        : faq
    ))
  }

  if (loading) {
    return (
      <PageLayout breadcrumbs={breadcrumbs}>
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-16"></div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-primary-500 dark:text-primary-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              <TranslatedText textKey="faq.title" />
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <TranslatedText textKey="faq.subtitle" />
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Сұрақтарды іздеу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.key
                    ? 'bg-primary-500 dark:bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured FAQs */}
        {featuredFAQs.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Танымал сұрақтар
            </h2>
            <div className="space-y-4">
              {featuredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-primary-50 dark:bg-gray-800 rounded-lg border border-primary-200 dark:border-gray-600 overflow-hidden transition-colors duration-200"
                >
                  <button
                    type="button"
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-inset"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={openItems.includes(faq.id)}
                  >
                    <span className="font-medium text-primary-900 dark:text-gray-100 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary-600 dark:text-primary-400 transition-transform duration-200 flex-shrink-0 ${openItems.includes(faq.id) ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-4">
                      <div className="pt-2 border-t border-primary-200 dark:border-gray-600">
                        <p className="text-primary-800 dark:text-gray-300 leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <span className="text-primary-600 dark:text-gray-400">
                              Бұл жауап пайдалы болды ма?
                            </span>
                            <button
                              onClick={() => handleVote(faq.id, 'helpful')}
                              className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span>{faq.helpfulVotes}</span>
                            </button>
                            <button
                              onClick={() => handleVote(faq.id, 'not-helpful')}
                              className="flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span>{faq.notHelpfulVotes}</span>
                            </button>
                          </div>
                          <span className="text-primary-500 dark:text-primary-400">
                            {faq.viewsCount} көрініс
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular FAQs */}
        <div className="mb-12">
          {(selectedCategory !== 'all' || searchQuery !== '' || featuredFAQs.length === 0) && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {searchQuery ? `Іздеу нәтижелері: "${searchQuery}"` : 'Барлық сұрақтар'}
            </h2>
          )}

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Сұрақтар табылмады
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Іздеу критерийлерін өзгертіп көріңіз немесе бізге сұрақ қойыңыз
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center px-6 py-3 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Сұрақ қою
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {(selectedCategory === 'all' && searchQuery === '' ? regularFAQs : filteredFAQs).map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200"
                >
                  <button
                    type="button"
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-inset"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={openItems.includes(faq.id)}
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${openItems.includes(faq.id) ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-4">
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-600">
                              Бұл жауап пайдалы болды ма?
                            </span>
                            <button
                              onClick={() => handleVote(faq.id, 'helpful')}
                              className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span>{faq.helpfulVotes}</span>
                            </button>
                            <button
                              onClick={() => handleVote(faq.id, 'not-helpful')}
                              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span>{faq.notHelpfulVotes}</span>
                            </button>
                          </div>
                          <span className="text-gray-500">
                            {faq.viewsCount} көрініс
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="bg-primary-500 dark:bg-gray-800 rounded-xl text-white p-8 text-center transition-colors duration-200">
          <h2 className="text-2xl font-bold mb-4">
            Жауабын таба алмадыңыз ба?
          </h2>
          <p className="text-primary-100 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Біздің мамандар сізге кез келген сұрақ бойынша көмектесуге дайын
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center px-8 py-3 bg-secondary-500 dark:bg-orange-600 hover:bg-secondary-600 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Бізбен байланысыңыз
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
