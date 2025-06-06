'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import { ArrowLeft, ArrowRight, CheckCircle, Upload, User, FileText, Eye, Shield } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { ChatButton } from '@/components/ui/ChatButton'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'
import { bilimcertAPI } from '@/lib/bilimcert-api'

// Form data interfaces
interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
}

interface DocumentInfo {
  documentType: string
  issuingInstitution: string
  issuingCountry: string
  graduationYear: string
  fieldOfStudy: string
  degreeLevel: string
  languageOfInstruction: string
}

interface UploadedFile {
  file: File
  type: string
  id: string
}

interface ApplicationData {
  personalInfo: PersonalInfo
  documentInfo: DocumentInfo
  uploadedFiles: UploadedFile[]
  declaration: boolean
  recaptchaToken: string
}

const steps = [
  { id: 1, key: 'personal', icon: User },
  { id: 2, key: 'documents', icon: FileText },
  { id: 3, key: 'upload', icon: Upload },
  { id: 4, key: 'review', icon: Eye },
]

export default function RecognitionApplicationPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    },
    documentInfo: {
      documentType: '',
      issuingInstitution: '',
      issuingCountry: '',
      graduationYear: '',
      fieldOfStudy: '',
      degreeLevel: '',
      languageOfInstruction: '',
    },
    uploadedFiles: [],
    declaration: false,
    recaptchaToken: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Document type options
  const documentTypes = [
    { value: 'diploma', label: t('recognitionApplication.documentInfo.documentType') },
    { value: 'certificate', label: 'Certificate' },
    { value: 'transcript', label: 'Academic Transcript' },
  ]

  // Degree level options
  const degreeLevels = [
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate/PhD' },
    { value: 'diploma', label: 'Diploma' },
  ]

  // Validation functions
  const validatePersonalInfo = (): boolean => {
    const newErrors: Record<string, string> = {}
    const { personalInfo } = applicationData

    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = t('validation.required')
    }
    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = t('validation.required')
    }
    if (!personalInfo.email.trim()) {
      newErrors.email = t('validation.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newErrors.email = t('validation.email')
    }
    if (!personalInfo.phone.trim()) {
      newErrors.phone = t('validation.required')
    }
    if (!personalInfo.address.trim()) {
      newErrors.address = t('validation.required')
    }
    if (!personalInfo.city.trim()) {
      newErrors.city = t('validation.required')
    }
    if (!personalInfo.country.trim()) {
      newErrors.country = t('validation.required')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateDocumentInfo = (): boolean => {
    const newErrors: Record<string, string> = {}
    const { documentInfo } = applicationData

    if (!documentInfo.documentType) {
      newErrors.documentType = t('validation.required')
    }
    if (!documentInfo.issuingInstitution.trim()) {
      newErrors.issuingInstitution = t('validation.required')
    }
    if (!documentInfo.issuingCountry.trim()) {
      newErrors.issuingCountry = t('validation.required')
    }
    if (!documentInfo.graduationYear) {
      newErrors.graduationYear = t('validation.required')
    }
    if (!documentInfo.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = t('validation.required')
    }
    if (!documentInfo.degreeLevel) {
      newErrors.degreeLevel = t('validation.required')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateUpload = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (applicationData.uploadedFiles.length === 0) {
      newErrors.files = 'Please upload at least one document'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateReview = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!applicationData.declaration) {
      newErrors.declaration = 'You must agree to the declaration'
    }

    if (!applicationData.recaptchaToken) {
      newErrors.recaptchaToken = 'reCAPTCHA verification is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation functions
  const goToNextStep = () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validatePersonalInfo()
        break
      case 2:
        isValid = validateDocumentInfo()
        break
      case 3:
        isValid = validateUpload()
        break
      case 4:
        isValid = validateReview()
        break
      default:
        isValid = true
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
      setErrors({})
    } else if (isValid && currentStep === 4) {
      handleSubmit()
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  // reCAPTCHA handler
  const handleRecaptchaChange = (token: string | null) => {
    setApplicationData(prev => ({
      ...prev,
      recaptchaToken: token || ''
    }))
    if (errors.recaptchaToken) {
      setErrors(prev => ({ ...prev, recaptchaToken: '' }))
    }
  }

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Проверяем, что мышь действительно покинула область drop zone
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      console.log('Files dropped:', droppedFiles.length)
      const newFiles = Array.from(droppedFiles).map(file => ({
        file,
        type: 'document',
        id: Math.random().toString(36).substr(2, 9)
      }))
      setApplicationData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...newFiles]
      }))
      if (errors.files) {
        setErrors(prev => ({ ...prev, files: '' }))
      }
    }
  }

  // Form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Prepare data for API
      const apiData = {
        applicant_name: `${applicationData.personalInfo.firstName} ${applicationData.personalInfo.lastName}`,
        email: applicationData.personalInfo.email,
        phone: applicationData.personalInfo.phone,
        nationality: applicationData.personalInfo.country,
        passport_number: '', // Add this field to form if needed
        document_type: applicationData.documentInfo.documentType,
        recognition_purpose: 'employment', // Default value, add field to form if needed
        issuing_institution: applicationData.documentInfo.issuingInstitution,
        issuing_country: applicationData.documentInfo.issuingCountry,
        graduation_year: parseInt(applicationData.documentInfo.graduationYear),
        field_of_study: applicationData.documentInfo.fieldOfStudy,
        qualification_level: applicationData.documentInfo.degreeLevel,
        study_duration: '4 years', // Default value, add field to form if needed
        language_of_instruction: applicationData.documentInfo.languageOfInstruction,
        additional_qualifications: '', // Add field to form if needed
        work_experience: '', // Add field to form if needed
        additional_info: `Address: ${applicationData.personalInfo.address}, ${applicationData.personalInfo.city}, ${applicationData.personalInfo.country} ${applicationData.personalInfo.postalCode}`,
        recaptcha_token: applicationData.recaptchaToken
      }

      // Используем bilimcertAPI для отправки через /api/email/send
      const response = await bilimcertAPI.submitRecognitionForm(apiData)

      if (response.success) {
        toast.success('Дипломды тану өтініші сәтті жіберілді!')
        router.push('/recognition/application/success?id=' + (response.data?.id || 'submitted'))
      } else {
        toast.error(response.message || 'Өтініш жіберуде қате орын алды. Қайталап көріңіз.')
      }
    } catch (error) {
      console.error('Error submitting recognition application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update form data
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const updateDocumentInfo = (field: keyof DocumentInfo, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      documentInfo: { ...prev.documentInfo, [field]: value }
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <MobileMenuProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <FullWidthHeader />
        <MobileMenu />

        <main className="flex-1">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <Breadcrumbs
              items={[
                { title: 'Home', href: '/', translationKey: 'header.home' },
                { title: 'Recognition', href: '/recognition', translationKey: 'header.recognition' },
                { title: 'Application', href: '/recognition/application', translationKey: 'recognitionApplication.title' },
              ]}
            />

            {/* Header */}
            <div className="py-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                <TranslatedText textKey="recognitionApplication.title" />
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <TranslatedText textKey="recognitionApplication.subtitle" />
              </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id

                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                          ? 'bg-[#003366] border-[#003366] text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>

                      <div className="ml-3 hidden md:block">
                        <p className={`text-sm font-medium ${isActive ? 'text-[#003366]' : isCompleted ? 'text-green-600' : 'text-gray-500'
                          }`}>
                          <TranslatedText textKey={`recognitionApplication.steps.${step.key}`} />
                        </p>
                      </div>

                      {index < steps.length - 1 && (
                        <div className={`hidden md:block w-16 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-6 md:p-8">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="recognitionApplication.personalInfo.title" />
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.firstName" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.personalInfo.firstName}
                            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.lastName" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.email" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="email"
                            value={applicationData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.phone" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="tel"
                            value={applicationData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.address" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.personalInfo.address}
                            onChange={(e) => updatePersonalInfo('address', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.address ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.address && (
                            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.city" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.personalInfo.city}
                            onChange={(e) => updatePersonalInfo('city', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.city ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.city && (
                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.country" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.personalInfo.country}
                            onChange={(e) => updatePersonalInfo('country', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.country ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.country && (
                            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.personalInfo.postalCode" />
                          </label>
                          <input
                            type="text"
                            value={applicationData.personalInfo.postalCode}
                            onChange={(e) => updatePersonalInfo('postalCode', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Document Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="recognitionApplication.documentInfo.title" />
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.documentInfo.documentType" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            value={applicationData.documentInfo.documentType}
                            onChange={(e) => updateDocumentInfo('documentType', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.documentType ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <option value="">Select document type</option>
                            {documentTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          {errors.documentType && (
                            <p className="mt-1 text-sm text-red-600">{errors.documentType}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.documentInfo.degreeLevel" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            value={applicationData.documentInfo.degreeLevel}
                            onChange={(e) => updateDocumentInfo('degreeLevel', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.degreeLevel ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <option value="">Select degree level</option>
                            {degreeLevels.map((level) => (
                              <option key={level.value} value={level.value}>
                                {level.label}
                              </option>
                            ))}
                          </select>
                          {errors.degreeLevel && (
                            <p className="mt-1 text-sm text-red-600">{errors.degreeLevel}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.documentInfo.issuingInstitution" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.documentInfo.issuingInstitution}
                            onChange={(e) => updateDocumentInfo('issuingInstitution', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.issuingInstitution ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.issuingInstitution && (
                            <p className="mt-1 text-sm text-red-600">{errors.issuingInstitution}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.documentInfo.issuingCountry" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.documentInfo.issuingCountry}
                            onChange={(e) => updateDocumentInfo('issuingCountry', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.issuingCountry ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.issuingCountry && (
                            <p className="mt-1 text-sm text-red-600">{errors.issuingCountry}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.documentInfo.graduationYear" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="number"
                            min="1950"
                            max={new Date().getFullYear()}
                            value={applicationData.documentInfo.graduationYear}
                            onChange={(e) => updateDocumentInfo('graduationYear', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.graduationYear ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.graduationYear && (
                            <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.documentInfo.fieldOfStudy" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={applicationData.documentInfo.fieldOfStudy}
                            onChange={(e) => updateDocumentInfo('fieldOfStudy', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.fieldOfStudy && (
                            <p className="mt-1 text-sm text-red-600">{errors.fieldOfStudy}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="recognitionApplication.documentInfo.languageOfInstruction" />
                          </label>
                          <input
                            type="text"
                            value={applicationData.documentInfo.languageOfInstruction}
                            onChange={(e) => updateDocumentInfo('languageOfInstruction', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: File Upload */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="recognitionApplication.upload.title" />
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            <TranslatedText textKey="recognitionApplication.upload.requiredDocuments" />
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                <TranslatedText textKey="recognitionApplication.upload.originalDiploma" />
                              </span>
                            </div>
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                <TranslatedText textKey="recognitionApplication.upload.transcript" />
                              </span>
                            </div>
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                <TranslatedText textKey="recognitionApplication.upload.translation" />
                              </span>
                            </div>
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                <TranslatedText textKey="recognitionApplication.upload.passport" />
                              </span>
                            </div>
                          </div>

                          <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                              }`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                          >
                            <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'
                              }`} />
                            <div className="space-y-2">
                              <p className="text-lg font-medium text-gray-900">
                                <TranslatedText textKey="recognitionApplication.upload.dragAndDrop" />
                              </p>
                              <p className="text-sm text-gray-500">
                                <TranslatedText textKey="recognitionApplication.upload.supportedFormats" />
                              </p>
                              <input
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  if (e.target.files) {
                                    const newFiles = Array.from(e.target.files).map(file => ({
                                      file,
                                      type: 'document',
                                      id: Math.random().toString(36).substr(2, 9)
                                    }))
                                    setApplicationData(prev => ({
                                      ...prev,
                                      uploadedFiles: [...prev.uploadedFiles, ...newFiles]
                                    }))
                                    if (errors.files) {
                                      setErrors(prev => ({ ...prev, files: '' }))
                                    }
                                  }
                                }}
                                className="hidden"
                                id="file-upload"
                              />
                              <label
                                htmlFor="file-upload"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003366] hover:bg-[#004080] cursor-pointer"
                              >
                                Select Files
                              </label>
                            </div>
                          </div>

                          {errors.files && (
                            <p className="mt-2 text-sm text-red-600">{errors.files}</p>
                          )}

                          {/* Uploaded Files List */}
                          {applicationData.uploadedFiles.length > 0 && (
                            <div className="mt-6">
                              <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files:</h4>
                              <div className="space-y-2">
                                {applicationData.uploadedFiles.map((uploadedFile) => (
                                  <div key={uploadedFile.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                      <span className="text-sm text-gray-900">{uploadedFile.file.name}</span>
                                      <span className="text-xs text-gray-500 ml-2">
                                        ({(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB)
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setApplicationData(prev => ({
                                          ...prev,
                                          uploadedFiles: prev.uploadedFiles.filter(f => f.id !== uploadedFile.id)
                                        }))
                                      }}
                                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}



                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="recognitionApplication.review.title" />
                      </h2>

                      {/* Personal Information Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          <TranslatedText textKey="recognitionApplication.review.personalInfoSection" />
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.personalInfo.firstName" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.personalInfo.firstName}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.personalInfo.lastName" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.personalInfo.lastName}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.personalInfo.email" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.personalInfo.email}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.personalInfo.phone" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.personalInfo.phone}</span>
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.personalInfo.address" />:
                            </span>
                            <span className="ml-2 text-gray-900">
                              {applicationData.personalInfo.address}, {applicationData.personalInfo.city}, {applicationData.personalInfo.country}
                              {applicationData.personalInfo.postalCode && `, ${applicationData.personalInfo.postalCode}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Document Information Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          <TranslatedText textKey="recognitionApplication.review.documentInfoSection" />
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.documentInfo.documentType" />:
                            </span>
                            <span className="ml-2 text-gray-900 capitalize">{applicationData.documentInfo.documentType}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.documentInfo.degreeLevel" />:
                            </span>
                            <span className="ml-2 text-gray-900 capitalize">{applicationData.documentInfo.degreeLevel}</span>
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.documentInfo.issuingInstitution" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.documentInfo.issuingInstitution}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.documentInfo.issuingCountry" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.documentInfo.issuingCountry}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.documentInfo.graduationYear" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.documentInfo.graduationYear}</span>
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700">
                              <TranslatedText textKey="recognitionApplication.documentInfo.fieldOfStudy" />:
                            </span>
                            <span className="ml-2 text-gray-900">{applicationData.documentInfo.fieldOfStudy}</span>
                          </div>
                          {applicationData.documentInfo.languageOfInstruction && (
                            <div>
                              <span className="font-medium text-gray-700">
                                <TranslatedText textKey="recognitionApplication.documentInfo.languageOfInstruction" />:
                              </span>
                              <span className="ml-2 text-gray-900">{applicationData.documentInfo.languageOfInstruction}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Uploaded Files Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          <TranslatedText textKey="recognitionApplication.review.uploadedFiles" />
                        </h3>
                        {applicationData.uploadedFiles.length > 0 ? (
                          <div className="space-y-2">
                            {applicationData.uploadedFiles.map((uploadedFile) => (
                              <div key={uploadedFile.id} className="flex items-center p-3 bg-white rounded border">
                                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                <span className="text-sm text-gray-900">{uploadedFile.file.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No files uploaded</p>
                        )}
                      </div>

                      {/* reCAPTCHA */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                          <Shield className="w-4 h-4 inline mr-2" />
                          Қауіпсіздік растауы *
                        </label>
                        <div className="flex justify-center">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={handleRecaptchaChange}
                            theme="light"
                            size="normal"
                          />
                        </div>
                        {errors.recaptchaToken && (
                          <p className="mt-2 text-sm text-red-600 text-center">{errors.recaptchaToken}</p>
                        )}
                      </div>

                      {/* Declaration */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="declaration"
                            checked={applicationData.declaration}
                            onChange={(e) => {
                              setApplicationData(prev => ({
                                ...prev,
                                declaration: e.target.checked
                              }))
                              if (errors.declaration) {
                                setErrors(prev => ({ ...prev, declaration: '' }))
                              }
                            }}
                            className="mt-1 h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                          />
                          <label htmlFor="declaration" className="ml-3 text-sm text-gray-700">
                            <TranslatedText textKey="recognitionApplication.review.declaration" />
                          </label>
                        </div>
                        {errors.declaration && (
                          <p className="mt-2 text-sm text-red-600">{errors.declaration}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      disabled={currentStep === 1}
                      className={`flex items-center px-6 py-2 rounded-md font-medium ${currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <TranslatedText textKey="common.previous" />
                    </button>

                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={isSubmitting}
                      className="flex items-center px-6 py-2 bg-[#003366] text-white rounded-md font-medium hover:bg-[#004080] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentStep === 4 ? (
                        isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            <TranslatedText textKey="recognitionApplication.review.submitting" />
                          </>
                        ) : (
                          <TranslatedText textKey="recognitionApplication.review.submit" />
                        )
                      ) : (
                        <>
                          <TranslatedText textKey="common.next" />
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <ChatButton />
      </div>
    </MobileMenuProvider>
  )
}
