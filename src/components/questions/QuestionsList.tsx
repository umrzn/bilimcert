'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Clock, CheckCircle, Filter, Search, User, Mail } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { QuestionVoting } from './QuestionVoting'
import { bilimcertAPI } from '@/lib/bilimcert-api'

interface Question {
  id: number
  name: string
  email: string
  subject: string
  question: string
  category: string
  created_at: string
  updated_at: string
  status: 'pending' | 'answered'
  answer?: string
  answered_at?: string
  answered_by?: string
  is_public: boolean
  views_count: number
  helpful_votes: number
  not_helpful_votes: number
}

interface QuestionsListProps {
  showFilters?: boolean
  limit?: number
  className?: string
}

export function QuestionsList({ showFilters = true, limit, className = '' }: QuestionsListProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    search: ''
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: limit || 10,
    total: 0,
    totalPages: 0
  })

  const categories = [
    { value: 'all', label: 'Барлық санаттар' },
    { value: 'general', label: 'Жалпы сұрақтар' },
    { value: 'accreditation', label: 'Аккредитация' },
    { value: 'recognition', label: 'Дипломды тану' },
    { value: 'bologna', label: 'Болонья процесі' },
    { value: 'technical', label: 'Техникалық сұрақтар' },
    { value: 'other', label: 'Басқа' }
  ]

  const statusOptions = [
    { value: 'all', label: 'Барлық статустар' },
    { value: 'pending', label: 'Күтуде' },
    { value: 'answered', label: 'Жауап берілген' }
  ]

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.category !== 'all' && { category: filters.category }),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.search && { search: filters.search })
      })

      // Используем bilimcertAPI для получения вопросов
      const response = await bilimcertAPI.getPublicQuestions({
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.category !== 'all' && { category: filters.category }),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.search && { search: filters.search })
      })

      if (response.success) {
        setQuestions(response.data?.questions || [])
        setPagination(prev => ({
          ...prev,
          total: response.data?.total || 0,
          totalPages: Math.ceil((response.data?.total || 0) / pagination.limit)
        }))
      } else {
        console.error('Error fetching questions:', response.message)
        setQuestions([])
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
      setQuestions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [filters.category, filters.status, pagination.page])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleVoteUpdate = (questionId: number, helpful: number, notHelpful: number) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId
        ? { ...q, helpful_votes: helpful, not_helpful_votes: notHelpful }
        : q
    ))
  }

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category
  }

  const filteredQuestions = questions.filter(question =>
    filters.search === '' ||
    question.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
    question.question.toLowerCase().includes(filters.search.toLowerCase()) ||
    question.name.toLowerCase().includes(filters.search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Фильтрлер</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Санат
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Статус
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Іздеу
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Сұрақ немесе тақырып бойынша іздеу..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Сұрақтар табылмады</h3>
            <p className="text-gray-500">Таңдалған фильтрлер бойынша сұрақтар жоқ</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-900">{question.name}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {getCategoryLabel(question.category)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {question.subject}
                  </h3>
                </div>
                <div className="flex items-center ml-4">
                  {question.status === 'answered' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Жауап берілген
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" />
                      Күтуде
                    </span>
                  )}
                </div>
              </div>

              {/* Question Content */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{question.question}</p>
              </div>

              {/* Answer */}
              {question.status === 'answered' && question.answer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Жауап:</span>
                  </div>
                  <p className="text-green-700 leading-relaxed">{question.answer}</p>
                  {question.answered_at && (
                    <p className="text-sm text-green-600 mt-2">
                      {formatDate(question.answered_at)} жауап берілді
                    </p>
                  )}
                  {question.answered_by && (
                    <p className="text-sm text-green-600 mt-1">
                      Жауап берген: {question.answered_by}
                    </p>
                  )}
                </div>
              )}

              {/* Voting Component */}
              {question.status === 'answered' && question.answer && (
                <QuestionVoting
                  questionId={question.id}
                  helpfulVotes={question.helpful_votes}
                  notHelpfulVotes={question.not_helpful_votes}
                  onVoteUpdate={(helpful, notHelpful) => handleVoteUpdate(question.id, helpful, notHelpful)}
                  className="mb-4"
                />
              )}

              {/* Question Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{formatDate(question.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{question.email}</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <span>{question.views_count} көрініс</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!limit && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={pagination.page === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Алдыңғы
            </button>

            <span className="px-3 py-2 text-sm text-gray-700">
              {pagination.page} / {pagination.totalPages}
            </span>

            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Келесі
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
