'use client'

import { ReactNode } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { Calendar, Download, Eye, Share2 } from 'lucide-react'
import Image from 'next/image'

interface BreadcrumbItem {
  title: string
  href?: string
  translationKey?: string
}

interface Document {
  id: string
  title: string
  url: string
  type: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx'
  size: string
}

interface ArticlePageProps {
  title: string
  content: ReactNode
  breadcrumbs: BreadcrumbItem[]
  publishedAt?: string
  updatedAt?: string
  author?: string
  images?: string[]
  documents?: Document[]
  viewsCount?: number
  className?: string
}

export function ArticlePage({
  title,
  content,
  breadcrumbs,
  publishedAt,
  updatedAt,
  author,
  images = [],
  documents = [],
  viewsCount,
  className = ''
}: ArticlePageProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄'
      case 'doc':
      case 'docx':
        return '📝'
      case 'xls':
      case 'xlsx':
        return '📊'
      default:
        return '📎'
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className={`container mx-auto px-4 md:px-6 py-12 max-w-screen-xl ${className}`}>
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {title}
            </h1>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              {publishedAt && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Жарияланды: {formatDate(publishedAt)}</span>
                </div>
              )}
              {updatedAt && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Жаңартылды: {formatDate(updatedAt)}</span>
                </div>
              )}
              {author && (
                <div className="flex items-center">
                  <span>Автор: {author}</span>
                </div>
              )}
              {viewsCount && (
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{viewsCount} көрініс</span>
                </div>
              )}
              <button
                onClick={handleShare}
                className="flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Бөлісу
              </button>
            </div>
          </header>

          {/* Article Images */}
          {images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            {content}
          </div>

          {/* Documents Section */}
          {documents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Құжаттар
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    download
                    className="flex items-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <span className="text-2xl mr-3">{getFileIcon(doc.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.type.toUpperCase()} • {doc.size}
                      </p>
                    </div>
                    <Download className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {updatedAt ? (
                  <span>Соңғы жаңарту: {formatDate(updatedAt)}</span>
                ) : publishedAt ? (
                  <span>Жарияланды: {formatDate(publishedAt)}</span>
                ) : null}
              </div>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Бөлісу
              </button>
            </div>
          </footer>
        </article>
      </div>
    </PageLayout>
  )
}
