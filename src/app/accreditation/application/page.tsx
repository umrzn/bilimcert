'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Building, GraduationCap, FileText, Eye } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { ChatButton } from '@/components/ui/ChatButton'
import toast from 'react-hot-toast'
import { bilimcertAPI } from '@/lib/bilimcert-api'

interface AccreditationForm {
  type: 'institutional' | 'program' | ''
  institutionInfo: {
    name: string
    type: string
    address: string
    website: string
    contactPerson: string
    position: string
    email: string
    phone: string
    establishedYear: string
    studentCount: string
    facultyCount: string
  }
  programInfo: {
    name: string
    level: string
    duration: string
    credits: string
    language: string
    department: string
    description: string
  }
  uploadedFiles: Array<{
    file: File
    type: string
    id: string
  }>
  declaration: boolean
}

const steps = [
  { id: 1, key: 'type', icon: CheckCircle },
  { id: 2, key: 'institution', icon: Building },
  { id: 3, key: 'program', icon: GraduationCap },
  { id: 4, key: 'documents', icon: FileText },
  { id: 5, key: 'review', icon: Eye },
]

export default function AccreditationApplicationPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<AccreditationForm>({
    type: '',
    institutionInfo: {
      name: '',
      type: '',
      address: '',
      website: '',
      contactPerson: '',
      position: '',
      email: '',
      phone: '',
      establishedYear: '',
      studentCount: '',
      facultyCount: '',
    },
    programInfo: {
      name: '',
      level: '',
      duration: '',
      credits: '',
      language: '',
      department: '',
      description: '',
    },
    uploadedFiles: [],
    declaration: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Institution types
  const institutionTypes = [
    { value: 'university', label: 'University' },
    { value: 'college', label: 'College' },
    { value: 'institute', label: 'Institute' },
    { value: 'academy', label: 'Academy' },
  ]

  // Program levels
  const programLevels = [
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate/PhD' },
    { value: 'diploma', label: 'Diploma Program' },
  ]

  // Validation functions
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.type) {
          newErrors.type = t('validation.required')
        }
        break
      case 2:
        if (!formData.institutionInfo.name.trim()) {
          newErrors.institutionName = t('validation.required')
        }
        if (!formData.institutionInfo.type) {
          newErrors.institutionType = t('validation.required')
        }
        if (!formData.institutionInfo.email.trim()) {
          newErrors.institutionEmail = t('validation.required')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.institutionInfo.email)) {
          newErrors.institutionEmail = t('validation.email')
        }
        break
      case 3:
        if (formData.type === 'program') {
          if (!formData.programInfo.name.trim()) {
            newErrors.programName = t('validation.required')
          }
          if (!formData.programInfo.level) {
            newErrors.programLevel = t('validation.required')
          }
        }
        break
      case 4:
        if (formData.uploadedFiles.length === 0) {
          newErrors.files = 'Please upload at least one document'
        }
        break
      case 5:
        if (!formData.declaration) {
          newErrors.declaration = 'You must agree to the declaration'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation functions
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        // Skip program step for institutional accreditation
        if (currentStep === 2 && formData.type === 'institutional') {
          setCurrentStep(4)
        } else {
          setCurrentStep(currentStep + 1)
        }
        setErrors({})
      } else {
        handleSubmit()
      }
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      // Skip program step for institutional accreditation when going back
      if (currentStep === 4 && formData.type === 'institutional') {
        setCurrentStep(2)
      } else {
        setCurrentStep(currentStep - 1)
      }
      setErrors({})
    }
  }

  // Form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Prepare data for API
      const apiData = {
        accreditation_type: formData.type,
        institution_name: formData.institutionInfo.name,
        contact_person: formData.institutionInfo.contactPerson,
        email: formData.institutionInfo.email,
        phone: formData.institutionInfo.phone,
        website: formData.institutionInfo.website,
        address: formData.institutionInfo.address,
        program_name: formData.type === 'program' ? formData.programInfo.name : null,
        program_level: formData.type === 'program' ? formData.programInfo.level : null,
        student_count: formData.institutionInfo.studentCount ? parseInt(formData.institutionInfo.studentCount) : null,
        faculty_count: formData.institutionInfo.facultyCount ? parseInt(formData.institutionInfo.facultyCount) : null,
        establishment_year: formData.institutionInfo.establishedYear ? parseInt(formData.institutionInfo.establishedYear) : null,
        license_number: '', // Add this field to form if needed
        previous_accreditation: '', // Add this field to form if needed
        quality_assurance_system: 'Standard quality assurance system', // Default value
        educational_goals: formData.type === 'program' ? formData.programInfo.description : 'Institutional educational goals',
        curriculum_description: formData.type === 'program' ? formData.programInfo.description : 'Institutional curriculum',
        assessment_methods: 'Standard assessment methods', // Default value
        faculty_qualifications: 'Qualified faculty members', // Default value
        infrastructure_description: 'Modern infrastructure and facilities', // Default value
        student_services: 'Comprehensive student services', // Default value
        additional_info: `Institution Type: ${formData.institutionInfo.type}, Program Duration: ${formData.programInfo.duration}, Credits: ${formData.programInfo.credits}, Language: ${formData.programInfo.language}, Department: ${formData.programInfo.department}`
      }

      // Используем bilimcertAPI для отправки через /api/email/send
      const response = await bilimcertAPI.submitAccreditationForm(apiData)

      if (response.success) {
        toast.success('Аккредитация өтініші сәтті жіберілді!')
        router.push('/accreditation/application/success?id=' + (response.data?.id || 'submitted'))
      } else {
        toast.error(response.message || 'Өтініш жіберуде қате орын алды. Қайталап көріңіз.')
      }
    } catch (error) {
      console.error('Error submitting accreditation application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update form data
  const updateInstitutionInfo = (field: keyof AccreditationForm['institutionInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      institutionInfo: { ...prev.institutionInfo, [field]: value }
    }))
    if (errors[`institution${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`institution${field.charAt(0).toUpperCase() + field.slice(1)}`]: '' }))
    }
  }

  const updateProgramInfo = (field: keyof AccreditationForm['programInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      programInfo: { ...prev.programInfo, [field]: value }
    }))
    if (errors[`program${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`program${field.charAt(0).toUpperCase() + field.slice(1)}`]: '' }))
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
                { title: 'Accreditation', href: '/accreditation', translationKey: 'header.accreditation' },
                { title: 'Application', href: '/accreditation/application', translationKey: 'accreditationApplication.title' },
              ]}
            />

            {/* Header */}
            <div className="py-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                <TranslatedText textKey="accreditationApplication.title" />
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <TranslatedText textKey="accreditationApplication.subtitle" />
              </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  // Skip program step for institutional accreditation
                  if (step.key === 'program' && formData.type === 'institutional') {
                    return null
                  }

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
                          <TranslatedText textKey={`accreditationApplication.steps.${step.key}`} />
                        </p>
                      </div>

                      {index < steps.filter(s => s.key !== 'program' || formData.type !== 'institutional').length - 1 && (
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
                  {/* Step 1: Accreditation Type */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="accreditationApplication.types.selectType" />
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                          onClick={() => {
                            setFormData(prev => ({ ...prev, type: 'institutional' }))
                            if (errors.type) setErrors(prev => ({ ...prev, type: '' }))
                          }}
                          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${formData.type === 'institutional'
                            ? 'border-[#003366] bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          <div className="flex items-center mb-4">
                            <Building className="w-8 h-8 text-[#003366] mr-3" />
                            <h3 className="text-lg font-semibold text-[#003366]">
                              <TranslatedText textKey="accreditationApplication.types.institutional" />
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Comprehensive evaluation of the entire educational institution, including governance, resources, and quality assurance systems.
                          </p>
                        </div>

                        <div
                          onClick={() => {
                            setFormData(prev => ({ ...prev, type: 'program' }))
                            if (errors.type) setErrors(prev => ({ ...prev, type: '' }))
                          }}
                          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${formData.type === 'program'
                            ? 'border-[#003366] bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          <div className="flex items-center mb-4">
                            <GraduationCap className="w-8 h-8 text-[#003366] mr-3" />
                            <h3 className="text-lg font-semibold text-[#003366]">
                              <TranslatedText textKey="accreditationApplication.types.program" />
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Evaluation of specific academic programs, including curriculum, faculty qualifications, and learning outcomes.
                          </p>
                        </div>
                      </div>

                      {errors.type && (
                        <p className="text-red-600 text-sm">{errors.type}</p>
                      )}
                    </div>
                  )}

                  {/* Step 2: Institution Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="accreditationApplication.institutionInfo.title" />
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.name" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.institutionInfo.name}
                            onChange={(e) => updateInstitutionInfo('name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.institutionName ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.institutionName && (
                            <p className="mt-1 text-sm text-red-600">{errors.institutionName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.type" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            value={formData.institutionInfo.type}
                            onChange={(e) => updateInstitutionInfo('type', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.institutionType ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <option value="">Select institution type</option>
                            {institutionTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          {errors.institutionType && (
                            <p className="mt-1 text-sm text-red-600">{errors.institutionType}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.website" />
                          </label>
                          <input
                            type="url"
                            value={formData.institutionInfo.website}
                            onChange={(e) => updateInstitutionInfo('website', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="https://example.com"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.address" />
                          </label>
                          <input
                            type="text"
                            value={formData.institutionInfo.address}
                            onChange={(e) => updateInstitutionInfo('address', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.contactPerson" />
                          </label>
                          <input
                            type="text"
                            value={formData.institutionInfo.contactPerson}
                            onChange={(e) => updateInstitutionInfo('contactPerson', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.position" />
                          </label>
                          <input
                            type="text"
                            value={formData.institutionInfo.position}
                            onChange={(e) => updateInstitutionInfo('position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.email" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.institutionInfo.email}
                            onChange={(e) => updateInstitutionInfo('email', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.institutionEmail ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.institutionEmail && (
                            <p className="mt-1 text-sm text-red-600">{errors.institutionEmail}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.phone" />
                          </label>
                          <input
                            type="tel"
                            value={formData.institutionInfo.phone}
                            onChange={(e) => updateInstitutionInfo('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.establishedYear" />
                          </label>
                          <input
                            type="number"
                            min="1800"
                            max={new Date().getFullYear()}
                            value={formData.institutionInfo.establishedYear}
                            onChange={(e) => updateInstitutionInfo('establishedYear', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.studentCount" />
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={formData.institutionInfo.studentCount}
                            onChange={(e) => updateInstitutionInfo('studentCount', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.institutionInfo.facultyCount" />
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={formData.institutionInfo.facultyCount}
                            onChange={(e) => updateInstitutionInfo('facultyCount', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Program Information (only for program accreditation) */}
                  {currentStep === 3 && formData.type === 'program' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="accreditationApplication.programInfo.title" />
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.programInfo.name" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.programInfo.name}
                            onChange={(e) => updateProgramInfo('name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.programName ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.programName && (
                            <p className="mt-1 text-sm text-red-600">{errors.programName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.programInfo.level" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            value={formData.programInfo.level}
                            onChange={(e) => updateProgramInfo('level', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.programLevel ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <option value="">Select program level</option>
                            {programLevels.map((level) => (
                              <option key={level.value} value={level.value}>
                                {level.label}
                              </option>
                            ))}
                          </select>
                          {errors.programLevel && (
                            <p className="mt-1 text-sm text-red-600">{errors.programLevel}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.programInfo.duration" />
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.5"
                            value={formData.programInfo.duration}
                            onChange={(e) => updateProgramInfo('duration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="e.g., 4"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.programInfo.credits" />
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={formData.programInfo.credits}
                            onChange={(e) => updateProgramInfo('credits', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="e.g., 240"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.programInfo.language" />
                          </label>
                          <input
                            type="text"
                            value={formData.programInfo.language}
                            onChange={(e) => updateProgramInfo('language', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="e.g., English, Kazakh"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.programInfo.department" />
                          </label>
                          <input
                            type="text"
                            value={formData.programInfo.department}
                            onChange={(e) => updateProgramInfo('department', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="accreditationApplication.programInfo.description" />
                          </label>
                          <textarea
                            rows={4}
                            value={formData.programInfo.description}
                            onChange={(e) => updateProgramInfo('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="Detailed description of the program..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Documents Upload */}
                  {(currentStep === 4 || (currentStep === 3 && formData.type === 'institutional')) && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        Required Documents
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Required Documents for {formData.type === 'institutional' ? 'Institutional' : 'Program'} Accreditation
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                Self-Assessment Report
                              </span>
                            </div>
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                Organizational Chart
                              </span>
                            </div>
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                Financial Statements
                              </span>
                            </div>
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-sm text-blue-800">
                                Quality Assurance Policies
                              </span>
                            </div>
                            {formData.type === 'program' && (
                              <>
                                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                  <FileText className="w-5 h-5 text-blue-600 mr-3" />
                                  <span className="text-sm text-blue-800">
                                    Curriculum Documentation
                                  </span>
                                </div>
                                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                  <FileText className="w-5 h-5 text-blue-600 mr-3" />
                                  <span className="text-sm text-blue-800">
                                    Faculty Qualifications
                                  </span>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <div className="space-y-2">
                              <p className="text-lg font-medium text-gray-900">
                                Drag and drop files here, or click to select
                              </p>
                              <p className="text-sm text-gray-500">
                                Supported formats: PDF, DOC, DOCX (max 10MB each)
                              </p>
                              <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                  if (e.target.files) {
                                    const newFiles = Array.from(e.target.files).map(file => ({
                                      file,
                                      type: 'document',
                                      id: Math.random().toString(36).substr(2, 9)
                                    }))
                                    setFormData(prev => ({
                                      ...prev,
                                      uploadedFiles: [...prev.uploadedFiles, ...newFiles]
                                    }))
                                    if (errors.files) {
                                      setErrors(prev => ({ ...prev, files: '' }))
                                    }
                                  }
                                }}
                                className="hidden"
                                id="file-upload-accreditation"
                              />
                              <label
                                htmlFor="file-upload-accreditation"
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
                          {formData.uploadedFiles.length > 0 && (
                            <div className="mt-6">
                              <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files:</h4>
                              <div className="space-y-2">
                                {formData.uploadedFiles.map((uploadedFile) => (
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
                                        setFormData(prev => ({
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

                  {/* Step 5: Review & Submit */}
                  {(currentStep === 5 || (currentStep === 4 && formData.type === 'institutional')) && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        Review Your Application
                      </h2>

                      {/* Accreditation Type */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Accreditation Type
                        </h3>
                        <p className="text-gray-700 capitalize">
                          {formData.type} Accreditation
                        </p>
                      </div>

                      {/* Institution Information Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Institution Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Institution Name:</span>
                            <span className="ml-2 text-gray-900">{formData.institutionInfo.name}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Type:</span>
                            <span className="ml-2 text-gray-900 capitalize">{formData.institutionInfo.type}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="ml-2 text-gray-900">{formData.institutionInfo.email}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Phone:</span>
                            <span className="ml-2 text-gray-900">{formData.institutionInfo.phone}</span>
                          </div>
                          {formData.institutionInfo.website && (
                            <div className="md:col-span-2">
                              <span className="font-medium text-gray-700">Website:</span>
                              <span className="ml-2 text-gray-900">{formData.institutionInfo.website}</span>
                            </div>
                          )}
                          {formData.institutionInfo.address && (
                            <div className="md:col-span-2">
                              <span className="font-medium text-gray-700">Address:</span>
                              <span className="ml-2 text-gray-900">{formData.institutionInfo.address}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Program Information Review (only for program accreditation) */}
                      {formData.type === 'program' && (
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Program Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Program Name:</span>
                              <span className="ml-2 text-gray-900">{formData.programInfo.name}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Level:</span>
                              <span className="ml-2 text-gray-900 capitalize">{formData.programInfo.level}</span>
                            </div>
                            {formData.programInfo.duration && (
                              <div>
                                <span className="font-medium text-gray-700">Duration:</span>
                                <span className="ml-2 text-gray-900">{formData.programInfo.duration} years</span>
                              </div>
                            )}
                            {formData.programInfo.credits && (
                              <div>
                                <span className="font-medium text-gray-700">Credits:</span>
                                <span className="ml-2 text-gray-900">{formData.programInfo.credits}</span>
                              </div>
                            )}
                            {formData.programInfo.description && (
                              <div className="md:col-span-2">
                                <span className="font-medium text-gray-700">Description:</span>
                                <span className="ml-2 text-gray-900">{formData.programInfo.description}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Uploaded Files Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Uploaded Documents
                        </h3>
                        {formData.uploadedFiles.length > 0 ? (
                          <div className="space-y-2">
                            {formData.uploadedFiles.map((uploadedFile) => (
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

                      {/* Declaration */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="declaration-accreditation"
                            checked={formData.declaration}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                declaration: e.target.checked
                              }))
                              if (errors.declaration) {
                                setErrors(prev => ({ ...prev, declaration: '' }))
                              }
                            }}
                            className="mt-1 h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                          />
                          <label htmlFor="declaration-accreditation" className="ml-3 text-sm text-gray-700">
                            I declare that all information provided is true and accurate, and I understand that any false information may result in the rejection of this application.
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
                      {currentStep === 5 ? (
                        isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
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
