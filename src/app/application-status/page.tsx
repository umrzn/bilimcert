'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { Search, FileText, Clock, CheckCircle, XCircle, AlertCircle, Download, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

interface Application {
  id: string
  type: 'recognition' | 'accreditation' | 'bologna'
  status: 'submitted' | 'in_review' | 'additional_info_required' | 'approved' | 'rejected'
  submittedAt: string
  lastUpdated: string
  applicantName: string
  description: string
  documents: {
    id: string
    name: string
    status: 'pending' | 'approved' | 'rejected'
    url?: string
  }[]
  statusHistory: {
    status: string
    date: string
    comment?: string
  }[]
  estimatedCompletion?: string
  rejectionReason?: string
}

const mockApplication: Application = {
  id: 'APP-2024-001234',
  type: 'recognition',
  status: 'in_review',
  submittedAt: '2024-01-15T10:00:00Z',
  lastUpdated: '2024-01-20T14:30:00Z',
  applicantName: 'Айгүл Нұрланова',
  description: 'Германиядан алынған магистр дипломын тану',
  documents: [
    { id: '1', name: 'Диплом (түпнұсқа)', status: 'approved' },
    { id: '2', name: 'Академиялық анықтама', status: 'approved' },
    { id: '3', name: 'Паспорт көшірмесі', status: 'approved' },
    { id: '4', name: 'Аударма (нотариалды)', status: 'pending' }
  ],
  statusHistory: [
    { status: 'submitted', date: '2024-01-15T10:00:00Z', comment: 'Өтініш қабылданды' },
    { status: 'in_review', date: '2024-01-18T09:00:00Z', comment: 'Құжаттар тексерілуде' }
  ],
  estimatedCompletion: '2024-02-15T00:00:00Z'
}

export default function ApplicationStatusPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Өтініш мәртебесі', translationKey: 'header.applicationStatus' }
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      toast.error('Өтініш нөмірін енгізіңіз')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (searchQuery === 'APP-2024-001234') {
        setApplication(mockApplication)
      } else {
        setError('Өтініш табылмады. Нөмірді дұрыс енгізгеніңізді тексеріңіз.')
        setApplication(null)
      }
    } catch (error) {
      setError('Іздеу кезінде қате орын алды. Кейінірек қайталап көріңіз.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-5 h-5 text-blue-500" />
      case 'in_review':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'additional_info_required':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Жіберілді'
      case 'in_review':
        return 'Қарауда'
      case 'additional_info_required':
        return 'Қосымша ақпарат қажет'
      case 'approved':
        return 'Мақұлданды'
      case 'rejected':
        return 'Қабылданбады'
      default:
        return 'Белгісіз'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'additional_info_required':
        return 'bg-orange-100 text-orange-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'recognition':
        return 'Дипломды тану'
      case 'accreditation':
        return 'Аккредитация'
      case 'bologna':
        return 'Болон процесі'
      default:
        return 'Белгісіз'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            <TranslatedText textKey="header.applicationStatus" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Өтініш нөмірін енгізіп, өтінішіңіздің қазіргі мәртебесін тексеріңіз
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="applicationId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Өтініш нөмірі
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  id="applicationId"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="APP-2024-001234"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-lg transition-colors duration-200"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Мысал: APP-2024-001234 (сіз өтініш бергенде алған нөмір)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Іздеуде...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Мәртебені тексеру
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg p-4 transition-colors duration-200">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-400 mr-3" />
                <p className="text-red-800 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Application Details */}
        {application && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Өтініш #{application.id}
                  </h2>
                  <p className="text-gray-600">{application.description}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-2">{getStatusText(application.status)}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Өтініш түрі</h3>
                  <p className="text-gray-900">{getTypeText(application.type)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Жіберілген күні</h3>
                  <p className="text-gray-900">{formatDate(application.submittedAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Соңғы жаңарту</h3>
                  <p className="text-gray-900">{formatDate(application.lastUpdated)}</p>
                </div>
              </div>

              {application.estimatedCompletion && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-blue-900 font-medium">Болжамды аяқталу күні</p>
                      <p className="text-blue-700">{formatDate(application.estimatedCompletion)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Documents Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Құжаттар мәртебесі</h3>
              <div className="space-y-4">
                {application.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{doc.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {getStatusText(doc.status)}
                      </span>
                      {doc.url && (
                        <button className="text-primary-500 hover:text-primary-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Мәртебе тарихы</h3>
              <div className="space-y-4">
                {application.statusHistory.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {getStatusText(item.status)}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      {item.comment && (
                        <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Қосымша әрекеттер</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Есепті жүктеу
                </button>
                <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors">
                  <FileText className="w-5 h-5 mr-2" />
                  Қосымша құжат жіберу
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-primary-50 rounded-xl p-6 border border-primary-200 text-center">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Көмек қажет пе?
            </h3>
            <p className="text-primary-700 mb-4">
              Өтініш мәртебесі туралы сұрақтарыңыз болса, бізбен байланысыңыз
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+77172123456"
                className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
              >
                +7 (7172) 12-34-56
              </a>
              <a
                href="mailto:support@bilimcert.kz"
                className="inline-flex items-center px-4 py-2 border border-primary-300 text-primary-700 hover:bg-primary-100 font-medium rounded-lg transition-colors"
              >
                support@bilimcert.kz
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
