'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useAuth } from '@/contexts/AuthContext'
import type { User } from '@/types'
import {
  User as UserIcon,
  Mail,
  Phone,
  Building,
  Briefcase,
  Settings,
  FileText,
  Download,
  Edit3,
  Save,
  X,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  position: string
  preferredLanguage: 'kz' | 'ru' | 'en'
}

interface Application {
  id: string
  type: 'recognition' | 'accreditation' | 'bologna'
  status: 'submitted' | 'in_review' | 'approved' | 'rejected'
  title: string
  submittedAt: string
  lastUpdated: string
}

const mockApplications: Application[] = [
  {
    id: 'APP-2024-001234',
    type: 'recognition',
    status: 'in_review',
    title: 'Германиядан алынған магистр дипломын тану',
    submittedAt: '2024-01-15T10:00:00Z',
    lastUpdated: '2024-01-20T14:30:00Z'
  },
  {
    id: 'APP-2024-001123',
    type: 'accreditation',
    status: 'approved',
    title: 'Компьютерлік ғылымдар бағдарламасын аккредиттеу',
    submittedAt: '2023-12-10T09:00:00Z',
    lastUpdated: '2024-01-10T16:00:00Z'
  }
]

function ProfilePageContent() {
  const router = useRouter()
  const { user, updateProfile, isAuthenticated, isLoading } = useAuth()

  const [activeTab, setActiveTab] = useState<'profile' | 'applications' | 'settings'>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    preferredLanguage: 'kz'
  })
  const [applications] = useState<Application[]>(mockApplications)
  const [isSaving, setIsSaving] = useState(false)

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Профиль', translationKey: 'header.profile' }
  ]

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/auth/login?redirect=/profile')
    }
  }, [isAuthenticated, isLoading, router])

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: (user as any).phone_number || '',
        organization: (user as any).organization || '',
        position: (user as any).position || '',
        preferredLanguage: ((user as any).preferred_language as 'kz' | 'ru' | 'en') || 'kz'
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = await updateProfile({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone_number: profileData.phone,
        organization: profileData.organization,
        position: profileData.position,
        preferred_language: profileData.preferredLanguage
      } as any)

      if (success) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Profile update error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setProfileData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: (user as any).phone_number || '',
        organization: (user as any).organization || '',
        position: (user as any).position || '',
        preferredLanguage: ((user as any).preferred_language as 'kz' | 'ru' | 'en') || 'kz'
      })
    }
    setIsEditing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-5 h-5 text-blue-500" />
      case 'in_review':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Жіберілді'
      case 'in_review':
        return 'Қарауда'
      case 'approved':
        return 'Мақұлданды'
      case 'rejected':
        return 'Қабылданбады'
      default:
        return 'Белгісіз'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'recognition':
        return 'Дипломды тану'
      case 'accreditation':
        return 'Аккредитация'
      case 'bologna':
        return 'Болон процесі'
      default:
        return 'Белгісіз'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            <TranslatedText textKey="header.profile" />
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Жеке ақпаратыңызды басқарыңыз және өтініштеріңізді қадағалаңыз
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8 transition-colors duration-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'profile'
                ? 'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              <UserIcon className="w-4 h-4 inline mr-2" />
              Жеке ақпарат
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'applications'
                ? 'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Өтініштер ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'settings'
                ? 'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Параметрлер
            </button>
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Жеке ақпарат
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Өзгерту
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Болдырмау
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-700 disabled:opacity-50 transition-colors duration-200"
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Сақтау
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TranslatedText textKey="forms.firstName" />
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{profileData.firstName || 'Көрсетілмеген'}</span>
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TranslatedText textKey="forms.lastName" />
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{profileData.lastName || 'Көрсетілмеген'}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TranslatedText textKey="forms.email" />
                </label>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{profileData.email}</span>
                  <span className="ml-2 text-xs text-gray-500">(өзгертуге болмайды)</span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TranslatedText textKey="forms.phone" />
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{profileData.phone || 'Көрсетілмеген'}</span>
                  </div>
                )}
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TranslatedText textKey="forms.organization" />
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="organization"
                    value={profileData.organization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <div className="flex items-center">
                    <Building className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{profileData.organization || 'Көрсетілмеген'}</span>
                  </div>
                )}
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TranslatedText textKey="forms.position" />
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="position"
                    value={profileData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{profileData.position || 'Көрсетілмеген'}</span>
                  </div>
                )}
              </div>

              {/* Language Preference */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TranslatedText textKey="forms.preferredLanguage" />
                </label>
                {isEditing ? (
                  <select
                    name="preferredLanguage"
                    value={profileData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="kz">Қазақша</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                ) : (
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">
                      {profileData.preferredLanguage === 'kz' && 'Қазақша'}
                      {profileData.preferredLanguage === 'ru' && 'Русский'}
                      {profileData.preferredLanguage === 'en' && 'English'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {applications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Өтініштер жоқ
                </h3>
                <p className="text-gray-600 mb-6">
                  Сіз әлі ешқандай өтініш бермегенсіз
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
                  Жаңа өтініш беру
                </button>
              </div>
            ) : (
              applications.map((application) => (
                <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(application.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {getTypeText(application.type)} • {application.id}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      application.status === 'in_review' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                      }`}>
                      {getStatusText(application.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Жіберілген күні</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {formatDate(application.submittedAt)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Соңғы жаңарту</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {formatDate(application.lastUpdated)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Eye className="w-4 h-4 mr-1" />
                        Көру
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="w-4 h-4 mr-1" />
                        Жүктеу
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Аккаунт параметрлері
            </h2>

            <div className="space-y-6">
              {/* Change Password */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Құпия сөзді өзгерту
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Аккаунтыңыздың қауіпсіздігі үшін күшті құпия сөз қолданыңыз
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Құпия сөзді өзгерту
                </button>
              </div>

              {/* Notifications */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Хабарландырулар
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email хабарландырулары</p>
                      <p className="text-sm text-gray-500">Өтініш мәртебесі туралы хабарландырулар</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS хабарландырулары</p>
                      <p className="text-sm text-gray-500">Маңызды жаңартулар туралы SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div>
                <h3 className="text-lg font-medium text-red-900 mb-2">
                  Аккаунтты жою
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Аккаунтты жойғаннан кейін барлық деректер қалпына келтірілмейді
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50">
                  Аккаунтты жою
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default function ProfilePage() {
  return <ProfilePageContent />
}
