'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, Calendar, Tag, X } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'

interface FilterOptions {
  search: string
  category: string
  dateRange: string
  tags: string[]
}

interface NewsFilterProps {
  onFilterChange: (filters: FilterOptions) => void
  categories: string[]
  availableTags: string[]
}

const dateRanges = [
  { value: '', label: 'Барлық уақыт' },
  { value: 'today', label: 'Бүгін' },
  { value: 'week', label: 'Осы апта' },
  { value: 'month', label: 'Осы ай' },
  { value: 'year', label: 'Осы жыл' },
]

export function NewsFilter({ onFilterChange, categories, availableTags }: NewsFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    dateRange: '',
    tags: []
  })
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      search: '',
      category: '',
      dateRange: '',
      tags: []
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    updateFilters({ tags: newTags })
  }

  const hasActiveFilters = filters.search || filters.category || filters.dateRange || filters.tags.length > 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Сүзгі
            </h3>
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full">
                {[filters.search, filters.category, filters.dateRange, ...filters.tags].filter(Boolean).length}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                Тазалау
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              {isExpanded ? 'Жасыру' : 'Көрсету'}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Жаңалықтарды іздеу..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Expanded Filters */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Санат
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilters({ category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Барлық санаттар</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Уақыт аралығы
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => updateFilters({ dateRange: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Тегтер
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Белсенді сүзгілер
              </label>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <div className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    <Search className="w-3 h-3 mr-1" />
                    {filters.search}
                    <button
                      onClick={() => updateFilters({ search: '' })}
                      className="ml-2 hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {filters.category && (
                  <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {filters.category}
                    <button
                      onClick={() => updateFilters({ category: '' })}
                      className="ml-2 hover:text-green-600 dark:hover:text-green-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {filters.dateRange && (
                  <div className="flex items-center bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {dateRanges.find(r => r.value === filters.dateRange)?.label}
                    <button
                      onClick={() => updateFilters({ dateRange: '' })}
                      className="ml-2 hover:text-purple-600 dark:hover:text-purple-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {filters.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="ml-2 hover:text-orange-600 dark:hover:text-orange-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
