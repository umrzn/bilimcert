import { notFound } from 'next/navigation'
import { NewsArticlePage } from '@/components/ui/NewsArticlePage'
import { getNewsArticle, getAllNewsArticles } from '@/lib/news'

interface NewsPageProps {
  params: {
    slug: string
  }
}

export default async function NewsArticlePageComponent({ params }: NewsPageProps) {
  const article = await getNewsArticle(params.slug)

  if (!article) {
    notFound()
  }

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Жаңалықтар', href: '/news', translationKey: 'header.news' },
    { title: article.title }
  ]

  return (
    <NewsArticlePage
      article={article}
      breadcrumbs={breadcrumbs}
      backUrl="/news"
      backText="Жаңалықтарға оралу"
    />
  )
}

// Generate static params for all news articles
export async function generateStaticParams() {
  const articles = await getAllNewsArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsPageProps) {
  const article = await getNewsArticle(params.slug)

  if (!article) {
    return {
      title: 'Жаңалық табылмады',
    }
  }

  return {
    title: `${article.title} | BilimCert`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  }
}
