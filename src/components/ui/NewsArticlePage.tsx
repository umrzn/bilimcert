'use client'

import { PageLayout } from '@/components/layout/PageLayout'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft, Tag, Eye, Share2, Clock } from 'lucide-react'

interface BreadcrumbItem {
  title: string
  href?: string
  translationKey?: string
}

interface ArticleData {
  id: number
  title: string
  excerpt: string
  content: string
  image?: string
  category: {
    id: number
    name: string
    slug: string
    color: string
  }
  tags: string[]
  slug: string
  publishedAt: string
  featured: boolean
  viewsCount: number
  author?: string
}

interface NewsArticlePageProps {
  article: ArticleData
  breadcrumbs: BreadcrumbItem[]
  backUrl: string
  backText: string
}

export function NewsArticlePage({ article, breadcrumbs, backUrl, backText }: NewsArticlePageProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Сілтеме көшірілді!')
    }
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href={backUrl}
            className="inline-flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backText}
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {/* Category */}
            <div className="mb-4">
              <span className={`${article.category.color} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                {article.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              
              {article.author && (
                <div className="flex items-center">
                  <span>Автор: {article.author}</span>
                </div>
              )}

              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                <span>{article.viewsCount} көрініс</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{estimateReadingTime(article.content)} мин оқу</span>
              </div>

              <button 
                onClick={handleShare}
                className="flex items-center hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Бөлісу
              </button>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {article.image && (
            <div className="relative h-64 md:h-96 lg:h-[500px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
                       prose-headings:text-gray-900 dark:prose-headings:text-gray-100 
                       prose-p:text-gray-700 dark:prose-p:text-gray-300 
                       prose-a:text-primary-500 dark:prose-a:text-primary-400 
                       prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                       prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                       prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                       prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                       prose-code:text-primary-600 dark:prose-code:text-primary-400
                       prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Share Buttons */}
              <div className="flex items-center gap-4">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Бөлісу:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                  >
                    Facebook
                  </button>
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
                    className="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors text-sm"
                  >
                    Twitter
                  </button>
                  <button 
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`, '_blank')}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Back to News */}
              <Link
                href={backUrl}
                className="inline-flex items-center px-6 py-3 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {backText}
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </PageLayout>
  )
}
