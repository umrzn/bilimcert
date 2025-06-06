'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar, 
  MapPin, 
  Users, 
  Award,
  Building,
  GraduationCap,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'

interface AccreditedInstitution {
  id: string
  name: string
  type: 'university' | 'institute' | 'college' | 'academy'
  location: string
  region: string
  accreditationDate: string
  expiryDate: string
  status: 'active' | 'expired' | 'suspended'
  programs: number
  students: number
  website: string
  accreditationType: 'institutional' | 'program' | 'both'
  specializations: string[]
}

interface AccreditedProgram {
  id: string
  name: string
  institution: string
  level: 'bachelor' | 'master' | 'phd' | 'diploma'
  duration: number
  credits: number
  language: string
  accreditationDate: string
  expiryDate: string
  status: 'active' | 'expired' | 'suspended'
  department: string
}

// Mock data for demonstration
const mockInstitutions: AccreditedInstitution[] = [
  {
    id: 'inst-001',
    name: 'Қазақстан-Британ техникалық университеті',
    type: 'university',
    location: 'Алматы',
    region: 'Алматы қаласы',
    accreditationDate: '2023-01-15',
    expiryDate: '2028-01-15',
    status: 'active',
    programs: 45,
    students: 8500,
    website: 'https://kbtu.kz',
    accreditationType: 'both',
    specializations: ['Инженерия', 'IT', 'Бизнес', 'Дизайн']
  },
  {
    id: 'inst-002',
    name: 'Назарбаев Университеті',
    type: 'university',
    location: 'Нұр-Сұлтан',
    region: 'Нұр-Сұлтан қаласы',
    accreditationDate: '2022-09-10',
    expiryDate: '2027-09-10',
    status: 'active',
    programs: 38,
    students: 4200,
    website: 'https://nu.edu.kz',
    accreditationType: 'institutional',
    specializations: ['Медицина', 'Инженерия', 'Гуманитарлық ғылымдар']
  },
  {
    id: 'inst-003',
    name: 'Алматы Менеджмент Университеті',
    type: 'university',
    location: 'Алматы',
    region: 'Алматы қаласы',
    accreditationDate: '2021-03-20',
    expiryDate: '2026-03-20',
    status: 'active',
    programs: 28,
    students: 3800,
    website: 'https://almau.edu.kz',
    accreditationType: 'program',
    specializations: ['Бизнес', 'Экономика', 'Менеджмент']
  }
]

const mockPrograms: AccreditedProgram[] = [
  {
    id: 'prog-001',
    name: 'Компьютерлік инженерия',
    institution: 'Қазақстан-Британ техникалық университеті',
    level: 'bachelor',
    duration: 4,
    credits: 240,
    language: 'Ағылшын',
    accreditationDate: '2023-02-01',
    expiryDate: '2028-02-01',
    status: 'active',
    department: 'Инженерия және технологиялар факультеті'
  },
  {
    id: 'prog-002',
    name: 'Дәрігерлік іс',
    institution: 'Назарбаев Университеті',
    level: 'master',
    duration: 6,
    credits: 360,
    language: 'Ағылшын',
    accreditationDate: '2022-11-15',
    expiryDate: '2027-11-15',
    status: 'active',
    department: 'Медицина мектебі'
  }
]

export function AccreditationRegistry() {
  const [activeTab, setActiveTab] = useState<'institutions' | 'programs'>('institutions')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filteredInstitutions, setFilteredInstitutions] = useState(mockInstitutions)
  const [filteredPrograms, setFilteredPrograms] = useState(mockPrograms)

  // Filter institutions
  useEffect(() => {
    let filtered = mockInstitutions.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inst.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = !filterType || inst.type === filterType
      const matchesRegion = !filterRegion || inst.region === filterRegion
      const matchesStatus = !filterStatus || inst.status === filterStatus
      
      return matchesSearch && matchesType && matchesRegion && matchesStatus
    })
    setFilteredInstitutions(filtered)
  }, [searchTerm, filterType, filterRegion, filterStatus])

  // Filter programs
  useEffect(() => {
    let filtered = mockPrograms.filter(prog => {
      const matchesSearch = prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prog.institution.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !filterStatus || prog.status === filterStatus
      
      return matchesSearch && matchesStatus
    })
    setFilteredPrograms(filtered)
  }, [searchTerm, filterStatus])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
      expired: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: AlertCircle },
      suspended: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: Clock }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status === 'active' ? 'Белсенді' : status === 'expired' ? 'Мерзімі өткен' : 'Тоқтатылған'}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('kk-KZ')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Аккредитация тізілімі</h2>
            <p className="text-primary-100 mt-1">
              Аккредитацияланған білім беру ұйымдары мен бағдарламалар
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Экспорт
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'institutions', label: 'Білім беру ұйымдары', icon: Building },
            { id: 'programs', label: 'Бағдарламалар', icon: GraduationCap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'institutions' | 'programs')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Іздеу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Type Filter (for institutions) */}
          {activeTab === 'institutions' && (
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Барлық түрлер</option>
              <option value="university">Университет</option>
              <option value="institute">Институт</option>
              <option value="college">Колледж</option>
              <option value="academy">Академия</option>
            </select>
          )}

          {/* Region Filter (for institutions) */}
          {activeTab === 'institutions' && (
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Барлық аймақтар</option>
              <option value="Алматы қаласы">Алматы қаласы</option>
              <option value="Нұр-Сұлтан қаласы">Нұр-Сұлтан қаласы</option>
              <option value="Шымкент қаласы">Шымкент қаласы</option>
            </select>
          )}

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Барлық мәртебелер</option>
            <option value="active">Белсенді</option>
            <option value="expired">Мерзімі өткен</option>
            <option value="suspended">Тоқтатылған</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'institutions' ? (
          <div className="space-y-4">
            {filteredInstitutions.map((institution) => (
              <motion.div
                key={institution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {institution.name}
                      </h3>
                      {getStatusBadge(institution.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {institution.location}, {institution.region}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {institution.programs} бағдарлама
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {institution.students.toLocaleString()} студент
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {institution.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Аккредитация: {formatDate(institution.accreditationDate)} - {formatDate(institution.expiryDate)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {program.name}
                      </h3>
                      {getStatusBadge(program.status)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {program.institution}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        <span className="font-medium">Деңгей:</span> {program.level}
                      </div>
                      <div>
                        <span className="font-medium">Ұзақтығы:</span> {program.duration} жыл
                      </div>
                      <div>
                        <span className="font-medium">Кредиттер:</span> {program.credits}
                      </div>
                      <div>
                        <span className="font-medium">Тіл:</span> {program.language}
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Аккредитация: {formatDate(program.accreditationDate)} - {formatDate(program.expiryDate)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {((activeTab === 'institutions' && filteredInstitutions.length === 0) ||
          (activeTab === 'programs' && filteredPrograms.length === 0)) && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Нәтиже табылмады
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Іздеу параметрлерін өзгертіп көріңіз
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
