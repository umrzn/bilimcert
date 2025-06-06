'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

interface NewsItem {
  id: number
  title: string
  excerpt: string
  image: string
  publishedAt: string
  category: string
  slug: string
}

// Mock data - replace with actual API call
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Жаңа аккредитация стандарттары енгізілді',
    excerpt: 'Білім беру сапасын арттыру мақсатында жаңа халықаралық стандарттар қабылданды...',
    image: '/images/news/news-1.jpg',
    publishedAt: '2024-01-15',
    category: 'Аккредитация',
    slug: 'new-accreditation-standards'
  },
  {
    id: 2,
    title: 'Шетелдік дипломдарды тану процедурасы жеңілдетілді',
    excerpt: 'Цифрлық технологиялар арқылы құжаттарды тану процесі жылдамдатылды...',
    image: '/images/news/news-2.jpg',
    publishedAt: '2024-01-12',
    category: 'Тану',
    slug: 'simplified-recognition-process'
  },
  {
    id: 3,
    title: 'Болон процесі бойынша жаңа келісімдер',
    excerpt: 'Еуропалық университеттермен ынтымақтастық кеңейтілді...',
    image: '/images/news/news-3.jpg',
    publishedAt: '2024-01-10',
    category: 'Болон процесі',
    slug: 'new-bologna-agreements'
  }
]

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setNews(mockNews)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              <TranslatedText textKey="home.latestNews" />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <TranslatedText textKey="home.latestNews" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Білім беру саласындағы соңғы жаңалықтар мен маңызды хабарландырулар
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 dark:bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={item.publishedAt}>
                    {formatDate(item.publishedAt)}
                  </time>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium text-sm group-hover:text-primary-600 dark:group-hover:text-primary-300"
                >
                  <TranslatedText textKey="common.readMore" />
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All News Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center px-8 py-3 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <TranslatedText textKey="common.viewAll" />
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
