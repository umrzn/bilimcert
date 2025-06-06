import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface NewsArticle {
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

const newsDirectory = path.join(process.cwd(), 'content/news')

// Ensure the news directory exists
function ensureNewsDirectory() {
  if (!fs.existsSync(newsDirectory)) {
    fs.mkdirSync(newsDirectory, { recursive: true })
  }
}

// Get all news articles
export async function getAllNewsArticles(): Promise<NewsArticle[]> {
  ensureNewsDirectory()
  
  try {
    const fileNames = fs.readdirSync(newsDirectory)
    const allNewsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '')
          return await getNewsArticle(slug)
        })
    )

    // Filter out null values and sort by date
    return allNewsData
      .filter((article): article is NewsArticle => article !== null)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch (error) {
    console.error('Error reading news directory:', error)
    return []
  }
}

// Get a single news article by slug
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  ensureNewsDirectory()
  
  try {
    const fullPath = path.join(newsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown content to HTML
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      id: data.id || 0,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: contentHtml,
      image: data.image,
      category: data.category || {
        id: 1,
        name: 'Жаңалықтар',
        slug: 'news',
        color: 'bg-blue-500'
      },
      tags: data.tags || [],
      slug,
      publishedAt: data.publishedAt || new Date().toISOString(),
      featured: data.featured || false,
      viewsCount: data.viewsCount || 0,
      author: data.author
    }
  } catch (error) {
    console.error(`Error reading news article ${slug}:`, error)
    return null
  }
}

// Get featured news articles
export async function getFeaturedNewsArticles(): Promise<NewsArticle[]> {
  const allArticles = await getAllNewsArticles()
  return allArticles.filter(article => article.featured)
}

// Get news articles by category
export async function getNewsArticlesByCategory(categorySlug: string): Promise<NewsArticle[]> {
  const allArticles = await getAllNewsArticles()
  return allArticles.filter(article => article.category.slug === categorySlug)
}

// Search news articles
export async function searchNewsArticles(query: string): Promise<NewsArticle[]> {
  const allArticles = await getAllNewsArticles()
  const lowercaseQuery = query.toLowerCase()
  
  return allArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Create a sample news article (for development)
export function createSampleNewsArticle(slug: string) {
  ensureNewsDirectory()
  
  const sampleContent = `---
id: 1
title: "Жаңа аккредитация стандарттары енгізілді"
excerpt: "Білім беру сапасын арттыру мақсатында жаңа халықаралық стандарттар қабылданды. Бұл стандарттар 2024 жылдан бастап қолданысқа енеді."
image: "/images/news/news-1.jpg"
category:
  id: 1
  name: "Аккредитация"
  slug: "accreditation"
  color: "bg-blue-500"
tags:
  - "аккредитация"
  - "стандарттар"
  - "сапа"
publishedAt: "2024-01-15T10:00:00Z"
featured: true
viewsCount: 1250
author: "BilimCert"
---

# Жаңа аккредитация стандарттары енгізілді

Білім беру сапасын арттыру мақсатында жаңа халықаралық стандарттар қабылданды. Бұл стандарттар 2024 жылдан бастап қолданысқа енеді.

## Негізгі өзгерістер

Жаңа стандарттар келесі негізгі бағыттарды қамтиды:

- **Сапа менеджменті жүйесі** - ISO 9001:2015 стандартына сәйкес
- **Студенттердің нәтижелері** - оқу нәтижелерін бағалау жүйесі
- **Оқытушылардың біліктілігі** - үздіксіз кәсіби даму талаптары
- **Инфрақұрылым** - заманауи оқыту технологиялары

## Енгізу кезеңдері

Жаңа стандарттарды енгізу үш кезеңде жүзеге асырылады:

### 1-кезең (2024 жыл)
- Нормативтік базаны дайындау
- Оқу орындарын хабардар ету
- Дайындық жұмыстары

### 2-кезең (2025 жыл)
- Пилоттық жобаларды іске асыру
- Тәжірибе жинақтау
- Түзетулер енгізу

### 3-кезең (2026 жыл)
- Толық ауқымды енгізу
- Мониторинг және бағалау
- Үздіксіз жетілдіру

## Оқу орындары үшін ұсынымдар

Жаңа стандарттарға дайындалу үшін оқу орындарына келесі іс-шаралар ұсынылады:

1. **Ішкі аудит жүргізу** - қазіргі жағдайды бағалау
2. **Жоспар құру** - енгізу жоспарын дайындау
3. **Қызметкерлерді дайындау** - біліктілікті арттыру курстары
4. **Ресурстарды дайындау** - қажетті ресурстарды қамтамасыз ету

## Қорытынды

Жаңа аккредитация стандарттары Қазақстанның білім беру жүйесін халықаралық деңгейге көтеруге ықпал етеді. Бұл студенттердің сапалы білім алуына және еңбек нарығында бәсекеге қабілетті мамандар дайындауға мүмкіндік береді.

Толығырақ ақпарат алу үшін BilimCert орталығының ресми сайтына кіріңіз немесе біздің мамандармен кеңесіңіз.`

  const filePath = path.join(newsDirectory, `${slug}.md`)
  fs.writeFileSync(filePath, sampleContent, 'utf8')
  
  return filePath
}
