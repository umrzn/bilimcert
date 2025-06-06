'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Globe, Users, GraduationCap, ExternalLink, Phone, Mail } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { ChatButton } from '@/components/ui/ChatButton'

interface University {
  id: string
  name: string
  country: string
  city: string
  type: string
  website: string
  email: string
  phone: string
  description: string
  studentCount: number
  establishedYear: number
  accredited: boolean
  languages: string[]
  programs: string[]
  image?: string
}

interface SearchFilters {
  query: string
  country: string
  city: string
  type: string
  level: string
  language: string
  accredited: boolean
}

// Mock data for universities
const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Harvard University',
    country: 'United States',
    city: 'Cambridge',
    type: 'Private',
    website: 'https://harvard.edu',
    email: 'admissions@harvard.edu',
    phone: '+1-617-495-1000',
    description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.',
    studentCount: 23000,
    establishedYear: 1636,
    accredited: true,
    languages: ['English'],
    programs: ['Medicine', 'Law', 'Business', 'Engineering', 'Liberal Arts']
  },
  {
    id: '2',
    name: 'University of Oxford',
    country: 'United Kingdom',
    city: 'Oxford',
    type: 'Public',
    website: 'https://ox.ac.uk',
    email: 'admissions@ox.ac.uk',
    phone: '+44-1865-270000',
    description: 'The University of Oxford is a collegiate research university in Oxford, England.',
    studentCount: 24000,
    establishedYear: 1096,
    accredited: true,
    languages: ['English'],
    programs: ['Medicine', 'Law', 'Philosophy', 'Engineering', 'Sciences']
  },
  {
    id: '3',
    name: 'Sorbonne University',
    country: 'France',
    city: 'Paris',
    type: 'Public',
    website: 'https://sorbonne-universite.fr',
    email: 'contact@sorbonne-universite.fr',
    phone: '+33-1-44-27-44-27',
    description: 'Sorbonne University is a public research university in Paris, France.',
    studentCount: 55000,
    establishedYear: 1257,
    accredited: true,
    languages: ['French', 'English'],
    programs: ['Medicine', 'Sciences', 'Literature', 'Engineering']
  },
  {
    id: '4',
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    type: 'Public',
    website: 'https://tum.de',
    email: 'info@tum.de',
    phone: '+49-89-289-01',
    description: 'The Technical University of Munich is a research university with campuses in Munich, Garching, and Freising-Weihenstephan.',
    studentCount: 45000,
    establishedYear: 1868,
    accredited: true,
    languages: ['German', 'English'],
    programs: ['Engineering', 'Computer Science', 'Natural Sciences', 'Medicine']
  }
]

export default function UniversityFinderPage() {
  const { t } = useLanguage()

  const [universities, setUniversities] = useState<University[]>(mockUniversities)
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>(mockUniversities)
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    country: '',
    city: '',
    type: '',
    level: '',
    language: '',
    accredited: false,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  // Filter options
  const countries = Array.from(new Set(universities.map(u => u.country))).sort()
  const cities = Array.from(new Set(universities.map(u => u.city))).sort()
  const types = Array.from(new Set(universities.map(u => u.type))).sort()
  const languages = Array.from(new Set(universities.flatMap(u => u.languages))).sort()

  // Apply filters
  useEffect(() => {
    let filtered = universities

    if (filters.query) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        uni.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        uni.programs.some(program => program.toLowerCase().includes(filters.query.toLowerCase()))
      )
    }

    if (filters.country) {
      filtered = filtered.filter(uni => uni.country === filters.country)
    }

    if (filters.city) {
      filtered = filtered.filter(uni => uni.city === filters.city)
    }

    if (filters.type) {
      filtered = filtered.filter(uni => uni.type === filters.type)
    }

    if (filters.language) {
      filtered = filtered.filter(uni => uni.languages.includes(filters.language))
    }

    if (filters.accredited) {
      filtered = filtered.filter(uni => uni.accredited)
    }

    setFilteredUniversities(filtered)
  }, [filters, universities])

  const clearFilters = () => {
    setFilters({
      query: '',
      country: '',
      city: '',
      type: '',
      level: '',
      language: '',
      accredited: false,
    })
  }

  return (
    <MobileMenuProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <FullWidthHeader />
        <MobileMenu />

        <main className="flex-1">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <Breadcrumbs
              items={[
                { title: 'Home', href: '/', translationKey: 'header.home' },
                { title: 'Universities', href: '/universities', translationKey: 'header.universities' },
                { title: 'Finder', href: '/universities/finder', translationKey: 'universityFinder.title' },
              ]}
            />

            {/* Header */}
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#003366] dark:text-gray-100 mb-4">
                <TranslatedText textKey="universityFinder.title" />
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                <TranslatedText textKey="universityFinder.subtitle" />
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                {/* Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={t('universityFinder.search.placeholder')}
                      value={filters.query}
                      onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    <TranslatedText textKey="universityFinder.search.filters" />
                  </button>
                </div>

                {/* Filters */}
                {showFilters && (
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <TranslatedText textKey="universityFinder.search.country" />
                        </label>
                        <select
                          value={filters.country}
                          onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-blue-500"
                        >
                          <option value="">All Countries</option>
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <TranslatedText textKey="universityFinder.search.city" />
                        </label>
                        <select
                          value={filters.city}
                          onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-blue-500"
                        >
                          <option value="">All Cities</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <TranslatedText textKey="universityFinder.search.type" />
                        </label>
                        <select
                          value={filters.type}
                          onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-blue-500"
                        >
                          <option value="">All Types</option>
                          {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <TranslatedText textKey="universityFinder.search.language" />
                        </label>
                        <select
                          value={filters.language}
                          onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-blue-500"
                        >
                          <option value="">All Languages</option>
                          {languages.map(language => (
                            <option key={language} value={language}>{language}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.accredited}
                          onChange={(e) => setFilters(prev => ({ ...prev, accredited: e.target.checked }))}
                          className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          <TranslatedText textKey="universityFinder.search.accredited" />
                        </span>
                      </label>

                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <TranslatedText textKey="universityFinder.search.clear" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="max-w-6xl mx-auto">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredUniversities.length} <TranslatedText textKey="universityFinder.results.found" />
                </p>
              </div>

              {/* Universities Grid */}
              {filteredUniversities.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                  {filteredUniversities.map((university) => (
                    <div key={university.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-[#003366] dark:text-gray-100 mb-2">{university.name}</h3>
                            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="text-sm">{university.city}, {university.country}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                              <Users className="w-4 h-4 mr-1" />
                              <span className="text-sm">{university.studentCount.toLocaleString()} students</span>
                            </div>
                          </div>
                          {university.accredited && (
                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded">
                              Accredited
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{university.description}</p>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Programs:</h4>
                          <div className="flex flex-wrap gap-1">
                            {university.programs.slice(0, 3).map((program) => (
                              <span key={program} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                                {program}
                              </span>
                            ))}
                            {university.programs.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">+{university.programs.length - 3} more</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex space-x-3">
                            <a
                              href={university.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                            >
                              <Globe className="w-4 h-4 mr-1" />
                              <TranslatedText textKey="universityFinder.results.website" />
                            </a>
                            <a
                              href={`mailto:${university.email}`}
                              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                            >
                              <Mail className="w-4 h-4 mr-1" />
                              <TranslatedText textKey="universityFinder.results.contact" />
                            </a>
                          </div>
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                            <TranslatedText textKey="universityFinder.results.viewDetails" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                    <TranslatedText textKey="universityFinder.results.noResults" />
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500 mb-4">Try adjusting your search criteria</p>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
        <ChatButton />
      </div>
    </MobileMenuProvider>
  )
}
