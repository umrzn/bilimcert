import { NewsListPage } from '@/components/ui/NewsListPage'
import { getAllNewsArticles } from '@/lib/news'

// Generate categories from news data
function generateCategories(newsData: any[]) {
  const categoryMap = new Map()

  // Add "All" category
  categoryMap.set('all', {
    id: 0,
    name: 'Барлығы',
    slug: 'all',
    color: 'bg-gray-500',
    count: newsData.length
  })

  // Count articles by category
  newsData.forEach(article => {
    const category = article.category
    if (categoryMap.has(category.slug)) {
      categoryMap.get(category.slug).count++
    } else {
      categoryMap.set(category.slug, {
        ...category,
        count: 1
      })
    }
  })

  return Array.from(categoryMap.values())
}

export default async function NewsPage() {
  const newsData = await getAllNewsArticles()
  const categories = generateCategories(newsData)

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Жаңалықтар', translationKey: 'header.news' }
  ]

  return (
    <NewsListPage
      title="Жаңалықтар"
      description="Білім беру саласындағы соңғы жаңалықтар мен маңызды хабарландырулар"
      breadcrumbs={breadcrumbs}
      baseUrl="/news"
      mockData={newsData}
      categories={categories}
    />
  )
}
