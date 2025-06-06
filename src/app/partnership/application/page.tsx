'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Building, User, Users, Eye, Shield } from 'lucide-react'
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

interface PartnershipForm {
  organizationInfo: {
    name: string
    type: string
    website: string
    description: string
    establishedYear: string
    employeeCount: string
    annualRevenue: string
  }
  contactInfo: {
    contactPerson: string
    position: string
    email: string
    phone: string
    address: string
  }
  partnershipDetails: {
    type: string
    interests: string[]
    experience: string
    proposal: string
  }
  recaptchaToken: string
}

const steps = [
  { id: 1, key: 'organization', icon: Building },
  { id: 2, key: 'contact', icon: User },
  { id: 3, key: 'partnership', icon: Users },
  { id: 4, key: 'review', icon: Eye },
]

export default function PartnershipApplicationPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PartnershipForm>({
    organizationInfo: {
      name: '',
      type: '',
      website: '',
      description: '',
      establishedYear: '',
      employeeCount: '',
      annualRevenue: '',
    },
    contactInfo: {
      contactPerson: '',
      position: '',
      email: '',
      phone: '',
      address: '',
    },
    partnershipDetails: {
      type: '',
      interests: [],
      experience: '',
      proposal: '',
    },
    recaptchaToken: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Organization types
  const organizationTypes = [
    { value: 'university', label: 'University/Educational Institution' },
    { value: 'government', label: 'Government Agency' },
    { value: 'ngo', label: 'Non-Governmental Organization' },
    { value: 'private', label: 'Private Company' },
    { value: 'international', label: 'International Organization' },
  ]

  // Partnership types
  const partnershipTypes = [
    { value: 'accreditation', label: 'Accreditation Services' },
    { value: 'recognition', label: 'Document Recognition' },
    { value: 'training', label: 'Training and Capacity Building' },
    { value: 'research', label: 'Research Collaboration' },
    { value: 'technology', label: 'Technology Partnership' },
    { value: 'other', label: 'Other' },
  ]

  // Areas of interest
  const interestAreas = [
    { value: 'quality_assurance', label: 'Quality Assurance' },
    { value: 'accreditation', label: 'Accreditation' },
    { value: 'recognition', label: 'Document Recognition' },
    { value: 'bologna_process', label: 'Bologna Process' },
    { value: 'capacity_building', label: 'Capacity Building' },
    { value: 'technology', label: 'Technology Solutions' },
    { value: 'research', label: 'Research and Development' },
    { value: 'international_cooperation', label: 'International Cooperation' },
  ]

  // Validation functions
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.organizationInfo.name.trim()) {
          newErrors.orgName = t('validation.required')
        }
        if (!formData.organizationInfo.type) {
          newErrors.orgType = t('validation.required')
        }
        if (!formData.organizationInfo.description.trim()) {
          newErrors.orgDescription = t('validation.required')
        }
        break
      case 2:
        if (!formData.contactInfo.contactPerson.trim()) {
          newErrors.contactPerson = t('validation.required')
        }
        if (!formData.contactInfo.email.trim()) {
          newErrors.contactEmail = t('validation.required')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
          newErrors.contactEmail = t('validation.email')
        }
        if (!formData.contactInfo.phone.trim()) {
          newErrors.contactPhone = t('validation.required')
        }
        break
      case 3:
        if (!formData.partnershipDetails.type) {
          newErrors.partnershipType = t('validation.required')
        }
        if (formData.partnershipDetails.interests.length === 0) {
          newErrors.interests = 'Please select at least one area of interest'
        }
        if (!formData.partnershipDetails.proposal.trim()) {
          newErrors.proposal = t('validation.required')
        }
        break
      case 4:
        if (!formData.recaptchaToken) {
          newErrors.recaptchaToken = 'reCAPTCHA verification is required'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation functions
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
        setErrors({})
      } else {
        handleSubmit()
      }
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
    setFormData(prev => ({
      ...prev,
      recaptchaToken: token || ''
    }))
    if (errors.recaptchaToken) {
      setErrors(prev => ({ ...prev, recaptchaToken: '' }))
    }
  }

  // Form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Prepare data for API
      const apiData = {
        partnership_type: formData.organizationInfo.type,
        organization_name: formData.organizationInfo.name,
        contact_person: formData.contactInfo.contactPerson,
        email: formData.contactInfo.email,
        phone: formData.contactInfo.phone,
        website: formData.organizationInfo.website,
        country: formData.contactInfo.address.split(',').pop()?.trim() || '',
        city: formData.contactInfo.address.split(',')[0]?.trim() || '',
        address: formData.contactInfo.address,
        partnership_goals: formData.partnershipDetails.proposal,
        proposed_activities: formData.partnershipDetails.interests.join(', '),
        expected_outcomes: formData.partnershipDetails.experience,
        resources_offered: formData.organizationInfo.description,
        previous_partnerships: formData.partnershipDetails.experience,
        additional_info: `Employee Count: ${formData.organizationInfo.employeeCount}, Established: ${formData.organizationInfo.establishedYear}`,
        recaptcha_token: formData.recaptchaToken
      }

      // Используем bilimcertAPI для отправки через /api/email/send
      const response = await bilimcertAPI.submitPartnershipForm(apiData)

      if (response.success) {
        toast.success('Серіктестік өтініші сәтті жіберілді!')
        router.push('/partnership/application/success?id=' + (response.data?.id || 'submitted'))
      } else {
        toast.error(response.message || 'Өтініш жіберуде қате орын алды. Қайталап көріңіз.')
      }
    } catch (error) {
      console.error('Error submitting partnership application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update form data
  const updateOrganizationInfo = (field: keyof PartnershipForm['organizationInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      organizationInfo: { ...prev.organizationInfo, [field]: value }
    }))
    if (errors[`org${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`org${field.charAt(0).toUpperCase() + field.slice(1)}`]: '' }))
    }
  }

  const updateContactInfo = (field: keyof PartnershipForm['contactInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }))
    if (errors[`contact${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`contact${field.charAt(0).toUpperCase() + field.slice(1)}`]: '' }))
    }
  }

  const updatePartnershipDetails = (field: keyof PartnershipForm['partnershipDetails'], value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      partnershipDetails: { ...prev.partnershipDetails, [field]: value }
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.partnershipDetails.interests
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]

    updatePartnershipDetails('interests', newInterests)
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
                { title: 'Partnership', href: '/partnership', translationKey: 'header.partnerships' },
                { title: 'Application', href: '/partnership/application', translationKey: 'partnershipApplication.title' },
              ]}
            />

            {/* Header */}
            <div className="py-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#003366] dark:text-gray-100 mb-4">
                <TranslatedText textKey="partnershipApplication.title" />
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                <TranslatedText textKey="partnershipApplication.subtitle" />
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
                          ? 'bg-[#003366] dark:bg-primary-600 border-[#003366] dark:border-primary-600 text-white'
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                        }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="ml-3 hidden md:block">
                        <p className={`text-sm font-medium ${isActive ? 'text-[#003366] dark:text-primary-400' : isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                          <TranslatedText textKey={`partnershipApplication.${step.key}Info.title`} />
                        </p>
                      </div>

                      {index < steps.length - 1 && (
                        <div className={`hidden md:block w-16 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 md:p-8">
                  {/* Step 1: Organization Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] dark:text-gray-100 mb-6">
                        <TranslatedText textKey="partnershipApplication.organizationInfo.title" />
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <TranslatedText textKey="partnershipApplication.organizationInfo.name" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.organizationInfo.name}
                            onChange={(e) => updateOrganizationInfo('name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-primary-500 ${errors.orgName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                          />
                          {errors.orgName && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.orgName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.organizationInfo.type" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            value={formData.organizationInfo.type}
                            onChange={(e) => updateOrganizationInfo('type', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.orgType ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <option value="">Select organization type</option>
                            {organizationTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          {errors.orgType && (
                            <p className="mt-1 text-sm text-red-600">{errors.orgType}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.organizationInfo.website" />
                          </label>
                          <input
                            type="url"
                            value={formData.organizationInfo.website}
                            onChange={(e) => updateOrganizationInfo('website', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="https://example.com"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.organizationInfo.description" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <textarea
                            rows={4}
                            value={formData.organizationInfo.description}
                            onChange={(e) => updateOrganizationInfo('description', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.orgDescription ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="Brief description of your organization..."
                          />
                          {errors.orgDescription && (
                            <p className="mt-1 text-sm text-red-600">{errors.orgDescription}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.organizationInfo.establishedYear" />
                          </label>
                          <input
                            type="number"
                            min="1800"
                            max={new Date().getFullYear()}
                            value={formData.organizationInfo.establishedYear}
                            onChange={(e) => updateOrganizationInfo('establishedYear', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.organizationInfo.employeeCount" />
                          </label>
                          <select
                            value={formData.organizationInfo.employeeCount}
                            onChange={(e) => updateOrganizationInfo('employeeCount', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          >
                            <option value="">Select range</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-1000">201-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="partnershipApplication.contactInfo.title" />
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.contactInfo.contactPerson" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.contactInfo.contactPerson}
                            onChange={(e) => updateContactInfo('contactPerson', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.contactPerson && (
                            <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.contactInfo.position" />
                          </label>
                          <input
                            type="text"
                            value={formData.contactInfo.position}
                            onChange={(e) => updateContactInfo('position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.contactInfo.email" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.contactInfo.email}
                            onChange={(e) => updateContactInfo('email', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.contactEmail && (
                            <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.contactInfo.phone" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.contactInfo.phone}
                            onChange={(e) => updateContactInfo('phone', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.contactPhone && (
                            <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.contactInfo.address" />
                          </label>
                          <textarea
                            rows={3}
                            value={formData.contactInfo.address}
                            onChange={(e) => updateContactInfo('address', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="Full address including city and country"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Partnership Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        <TranslatedText textKey="partnershipApplication.partnershipDetails.title" />
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.partnershipDetails.type" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            value={formData.partnershipDetails.type}
                            onChange={(e) => updatePartnershipDetails('type', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.partnershipType ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <option value="">Select partnership type</option>
                            {partnershipTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          {errors.partnershipType && (
                            <p className="mt-1 text-sm text-red-600">{errors.partnershipType}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            <TranslatedText textKey="partnershipApplication.partnershipDetails.interests" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {interestAreas.map((area) => (
                              <label key={area.value} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.partnershipDetails.interests.includes(area.value)}
                                  onChange={() => toggleInterest(area.value)}
                                  className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{area.label}</span>
                              </label>
                            ))}
                          </div>
                          {errors.interests && (
                            <p className="mt-1 text-sm text-red-600">{errors.interests}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.partnershipDetails.experience" />
                          </label>
                          <textarea
                            rows={4}
                            value={formData.partnershipDetails.experience}
                            onChange={(e) => updatePartnershipDetails('experience', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="Describe your relevant experience in the selected areas..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <TranslatedText textKey="partnershipApplication.partnershipDetails.proposal" />
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <textarea
                            rows={6}
                            value={formData.partnershipDetails.proposal}
                            onChange={(e) => updatePartnershipDetails('proposal', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.proposal ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="Describe your partnership proposal, including objectives, expected outcomes, and mutual benefits..."
                          />
                          {errors.proposal && (
                            <p className="mt-1 text-sm text-red-600">{errors.proposal}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                        Review Your Partnership Application
                      </h2>

                      {/* Organization Information Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Organization Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Organization Name:</span>
                            <span className="ml-2 text-gray-900">{formData.organizationInfo.name}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Type:</span>
                            <span className="ml-2 text-gray-900 capitalize">{formData.organizationInfo.type}</span>
                          </div>
                          {formData.organizationInfo.website && (
                            <div className="md:col-span-2">
                              <span className="font-medium text-gray-700">Website:</span>
                              <span className="ml-2 text-gray-900">{formData.organizationInfo.website}</span>
                            </div>
                          )}
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700">Description:</span>
                            <span className="ml-2 text-gray-900">{formData.organizationInfo.description}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Contact Person:</span>
                            <span className="ml-2 text-gray-900">{formData.contactInfo.contactPerson}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Position:</span>
                            <span className="ml-2 text-gray-900">{formData.contactInfo.position}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="ml-2 text-gray-900">{formData.contactInfo.email}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Phone:</span>
                            <span className="ml-2 text-gray-900">{formData.contactInfo.phone}</span>
                          </div>
                          {formData.contactInfo.address && (
                            <div className="md:col-span-2">
                              <span className="font-medium text-gray-700">Address:</span>
                              <span className="ml-2 text-gray-900">{formData.contactInfo.address}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Partnership Details Review */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Partnership Details
                        </h3>
                        <div className="space-y-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Partnership Type:</span>
                            <span className="ml-2 text-gray-900 capitalize">{formData.partnershipDetails.type}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Areas of Interest:</span>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {formData.partnershipDetails.interests.map((interest) => {
                                const area = interestAreas.find(a => a.value === interest)
                                return (
                                  <span key={interest} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {area?.label}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                          {formData.partnershipDetails.experience && (
                            <div>
                              <span className="font-medium text-gray-700">Experience:</span>
                              <p className="mt-1 text-gray-900">{formData.partnershipDetails.experience}</p>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700">Partnership Proposal:</span>
                            <p className="mt-1 text-gray-900">{formData.partnershipDetails.proposal}</p>
                          </div>
                        </div>
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
                            id="declaration-partnership"
                            checked={formData.partnershipDetails.proposal ? true : false}
                            onChange={() => { }}
                            className="mt-1 h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                          />
                          <label htmlFor="declaration-partnership" className="ml-3 text-sm text-gray-700">
                            I declare that all information provided is true and accurate, and I understand that this application will be reviewed by our partnership committee.
                          </label>
                        </div>
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
