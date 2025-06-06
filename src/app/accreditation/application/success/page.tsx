'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Eye, ArrowRight, Home, Building, GraduationCap } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { ChatButton } from '@/components/ui/ChatButton'

function AccreditationSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  const [applicationId, setApplicationId] = useState<string>('')
  const [applicationType, setApplicationType] = useState<'institutional' | 'program'>('institutional')

  useEffect(() => {
    const id = searchParams.get('id')
    const type = searchParams.get('type') as 'institutional' | 'program'

    if (id) {
      setApplicationId(id)
    } else {
      router.push('/accreditation/application')
    }

    if (type) {
      setApplicationType(type)
    }
  }, [searchParams, router])

  const nextSteps = [
    {
      step: 1,
      title: 'Initial Review',
      description: 'Our accreditation team will conduct an initial review of your application',
      timeframe: '5-7 business days',
      status: 'pending'
    },
    {
      step: 2,
      title: 'Document Verification',
      description: 'Verification of all submitted documents and institutional information',
      timeframe: '2-3 weeks',
      status: 'upcoming'
    },
    {
      step: 3,
      title: 'Site Visit Preparation',
      description: 'Scheduling and preparation for the accreditation site visit',
      timeframe: '4-6 weeks',
      status: 'upcoming'
    },
    {
      step: 4,
      title: 'Site Visit',
      description: 'On-site evaluation by our accreditation experts',
      timeframe: '2-3 days',
      status: 'upcoming'
    },
    {
      step: 5,
      title: 'Final Decision',
      description: 'Accreditation committee review and final decision',
      timeframe: '3-4 weeks after site visit',
      status: 'upcoming'
    }
  ]

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
                { title: 'Success', href: '#', translationKey: 'common.success' },
              ]}
            />

            {/* Success Header */}
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                Accreditation Application Submitted Successfully
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Your {applicationType} accreditation application has been submitted successfully. Our team will review your application and contact you soon.
              </p>

              {applicationId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Application ID
                  </p>
                  <p className="text-lg font-mono font-bold text-blue-900">{applicationId}</p>
                </div>
              )}
            </div>

            {/* Application Type Info */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  {applicationType === 'institutional' ? (
                    <Building className="w-8 h-8 text-[#003366] mr-3" />
                  ) : (
                    <GraduationCap className="w-8 h-8 text-[#003366] mr-3" />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-[#003366]">
                      {applicationType === 'institutional' ? 'Institutional Accreditation' : 'Program Accreditation'}
                    </h2>
                    <p className="text-gray-600">
                      {applicationType === 'institutional'
                        ? 'Comprehensive evaluation of your entire educational institution'
                        : 'Detailed assessment of your specific academic program'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href={`/application-status?id=${applicationId}`}
                  className="flex items-center justify-center px-6 py-4 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#004080] transition-colors"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Track Application Status
                </Link>

                <button
                  onClick={() => {
                    const receiptData = {
                      applicationId,
                      type: `${applicationType} Accreditation`,
                      submittedAt: new Date().toISOString(),
                    }
                    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `accreditation-receipt-${applicationId}.json`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  className="flex items-center justify-center px-6 py-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Receipt
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center px-6 py-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </div>
            </div>

            {/* Next Steps */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold text-[#003366] mb-6">
                    Accreditation Process Timeline
                  </h2>

                  <div className="space-y-6">
                    {nextSteps.map((step, index) => (
                      <div key={step.step} className="flex items-start">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step.status === 'pending'
                          ? 'bg-blue-100 border-blue-500 text-blue-600'
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                          } flex-shrink-0`}>
                          {step.status === 'pending' ? (
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                          ) : (
                            <span className="text-sm font-medium">{step.step}</span>
                          )}
                        </div>

                        <div className="ml-4 flex-1">
                          <h3 className={`text-lg font-medium ${step.status === 'pending' ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{step.description}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Expected timeframe: {step.timeframe}
                          </p>
                        </div>

                        {index < nextSteps.length - 1 && (
                          <div className="absolute left-5 mt-10 w-0.5 h-6 bg-gray-300"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          The accreditation process is comprehensive and may take several months to complete.
                          We will keep you informed at each stage and may request additional information or clarification during the review process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[#003366] mb-4">Accreditation Team Contact</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">accreditation@bilimcert.kz</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-600">+7 (727) 123-45-68</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Working Hours:</span>
                      <span className="ml-2 text-gray-600">Mon-Fri 9:00-18:00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[#003366] mb-4">Helpful Resources</h3>
                  <div className="space-y-3">
                    <Link
                      href="/accreditation/standards"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Accreditation Standards
                    </Link>
                    <Link
                      href="/accreditation/process"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Accreditation Process Guide
                    </Link>
                    <Link
                      href="/faq"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Frequently Asked Questions
                    </Link>
                    <Link
                      href="/contacts"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Contact Support
                    </Link>
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

export default function AccreditationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    }>
      <AccreditationSuccessContent />
    </Suspense>
  )
}
