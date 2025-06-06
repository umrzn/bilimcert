'use client'

import { useState } from 'react'
import useSWR, { SWRConfiguration, SWRResponse, mutate } from 'swr'
import { apiClient } from '@/lib/api'

// Generic fetcher function
const fetcher = async (url: string) => {
  const response = await apiClient.get(url)
  return response.data
}

// Generic hook for API calls
export function useApi<T = any>(
  url: string | null,
  options?: SWRConfiguration
): SWRResponse<T, any> {
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  })
}

// Specific hooks for different endpoints

// News hooks
export function useNews(params?: any) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  return useApi(`/news/${queryString}`)
}

export function useNewsItem(slug: string | null) {
  return useApi(slug ? `/news/${slug}/` : null)
}

export function useNewsCategories() {
  return useApi('/news/categories/')
}

// Content hooks
export function usePages(params?: any) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  return useApi(`/content/pages/${queryString}`)
}

export function usePage(slug: string | null) {
  return useApi(slug ? `/content/pages/${slug}/` : null)
}

export function useFAQs(params?: any) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  return useApi(`/content/faqs/${queryString}`)
}

export function useBanners(params?: any) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  return useApi(`/content/banners/${queryString}`)
}

export function useTestimonials(params?: any) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  return useApi(`/content/testimonials/${queryString}`)
}

export function usePartners(params?: any) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  return useApi(`/content/partners/${queryString}`)
}

// Core hooks
export function useAppConfig() {
  return useApi('/config/')
}

// Files hooks
export function useFiles(params?: any) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  return useApi(`/files/${queryString}`)
}

// Custom hooks with mutations

// Contact form hook
export function useContactForm() {
  const submitForm = async (data: {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
  }) => {
    const response = await apiClient.core.contact(data)
    return response.data
  }

  return { submitForm }
}

// File upload hook
export function useFileUpload() {
  const uploadFile = async (file: File, data?: any) => {
    const response = await apiClient.files.upload(file, data)
    return response.data
  }

  const deleteFile = async (id: number) => {
    const response = await apiClient.files.deleteFile(id)
    return response.data
  }

  return { uploadFile, deleteFile }
}

// Search hook
export function useSearch(query: string, type?: string) {
  const params = new URLSearchParams()
  if (query) params.append('search', query)
  if (type) params.append('type', type)

  const queryString = params.toString()
  return useApi(queryString ? `/search/?${queryString}` : null)
}

// Pagination hook
export function usePagination<T = any>(
  endpoint: string,
  params?: any,
  options?: SWRConfiguration
) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
  const { data, error, isLoading, mutate } = useApi<{
    results: T[]
    count: number
    next: string | null
    previous: string | null
  }>(`${endpoint}${queryString}`, options)

  const hasNext = !!data?.next
  const hasPrevious = !!data?.previous
  const totalCount = data?.count || 0
  const results = data?.results || []

  return {
    data: results,
    totalCount,
    hasNext,
    hasPrevious,
    isLoading,
    error,
    mutate,
  }
}

// Infinite scroll hook
export function useInfiniteScroll<T = any>(endpoint: string, params?: any) {
  const [allData, setAllData] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams({
        ...params,
        page: page.toString(),
      })

      const response = await apiClient.get(`${endpoint}?${queryParams}`)
      const { results, next } = response.data

      setAllData(prev => [...prev, ...results])
      setPage(prev => prev + 1)
      setHasMore(!!next)
    } catch (error) {
      console.error('Error loading more data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setAllData([])
    setPage(1)
    setHasMore(true)
  }

  return {
    data: allData,
    loadMore,
    hasMore,
    isLoading,
    reset,
  }
}

// Cache management utilities
export function mutateApi(key: string, data?: any) {
  return mutate(key, data)
}

export function invalidateApi(key: string) {
  return mutate(key)
}

export function preloadApi(url: string) {
  return mutate(url, fetcher(url))
}
