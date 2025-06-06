'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { kk } from 'date-fns/locale'
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  readTime: number
  views: number
  featured: boolean
}

interface NewsGridProps {
  filters: {
    search: string
    category: string
    dateRange: string
    tags: string[]
  }
  itemsPerPage?: number
}

// Mock news data - in real app, this would come from API/CMS
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Жаңа аккредитация стандарттары енгізілді',
    excerpt: 'Білім беру сапасын арттыру мақсатында жаңа аккредитация стандарттары қабылданды.',
    content: 'Толық мазмұн...',
    image: '/images/news/news-1.jpg',
    category: 'Аккредитация',
    tags: ['стандарттар', 'сапа', 'жаңалық'],
    author: 'Админ',
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 5,
    views: 1250,
    featured: true
  },
  {
    id: '2',
    title: 'Халықаралық дипломдарды тану процесі жеңілдетілді',
    excerpt: 'Шетелдік дипломдарды тану процедурасы цифрландырылып, уақыт мерзімі қысқартылды.',
    content: 'Толық мазмұн...',
    image: '/images/news/news-2.jpg',
    category: 'Дипломды тану',
    tags: ['диплом', 'тану', 'цифрландыру'],
    author: 'Сарапшы',
    publishedAt: '2024-01-10T14:30:00Z',
    readTime: 7,
    views: 890,
    featured: false
  },
  {
    id: '3',
    title: 'Болонья процесі: жаңа серіктестіктер',
    excerpt: 'Еуропалық университеттермен жаңа серіктестік келісімдері жасалды.',
    content: 'Толық мазмұн...',
    image: '/images/news/news-3.jpg',
    category: 'Болонья процесі',
    tags: ['серіктестік', 'еуропа', 'университет'],
    author: 'Редактор',
    publishedAt: '2024-01-05T09:15:00Z',
    readTime: 4,
    views: 567,
    featured: false
  },
  // Add more mock news items...
]

export function NewsGrid({ filters, itemsPerPage = 9 }: NewsGridProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load news data
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setNews(mockNews)
        setError(null)
      } catch (err) {
        setError('Жаңалықтарды жүктеуде қате орын алды')
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...news]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm)
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date()
      const filterDate = new Date()

      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }

      filtered = filtered.filter(item => 
        new Date(item.publishedAt) >= filterDate
      )
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(item =>
        filters.tags.some(tag => item.tags.includes(tag))
      )
    }

    setFilteredNews(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [news, filters])

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNews = filteredNews.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: kk })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Жаңалықтар жүктелуде...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <AlertCircle className="w-8 h-8 text-red-500 mr-2" />
        <span className="text-red-600 dark:text-red-400">{error}</span>
      </div>
    )
  }

  if (filteredNews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Жаңалықтар табылмады
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Сүзгі параметрлерін өзгертіп көріңіз
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-300">
          {filteredNews.length} жаңалық табылды
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {startIndex + 1}-{Math.min(endIndex, filteredNews.length)} / {filteredNews.length}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <AnimatePresence>
          {currentNews.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-1 ${
                item.featured ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Маңызды
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(item.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{item.readTime} мин</span>
                  <span className="mx-2">•</span>
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{item.views}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4 mr-1" />
                    <span>{item.author}</span>
                  </div>
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                  >
                    Толығырақ
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page === currentPage
                  ? 'bg-primary-500 text-white'
                  : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
