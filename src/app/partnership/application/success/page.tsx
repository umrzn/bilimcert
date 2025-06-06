'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Eye, ArrowRight, Home, Users, Calendar } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { ChatButton } from '@/components/ui/ChatButton'

function PartnershipSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  const [applicationId, setApplicationId] = useState<string>('')

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setApplicationId(id)
    } else {
      router.push('/partnership/application')
    }
  }, [searchParams, router])

  const nextSteps = [
    {
      step: 1,
      title: 'Application Review',
      description: 'Our partnership committee will review your application and proposal',
      timeframe: '3-5 business days',
      status: 'pending'
    },
    {
      step: 2,
      title: 'Initial Assessment',
      description: 'Evaluation of partnership potential and alignment with our objectives',
      timeframe: '1-2 weeks',
      status: 'upcoming'
    },
    {
      step: 3,
      title: 'Discussion Meeting',
      description: 'Virtual or in-person meeting to discuss partnership details',
      timeframe: '2-3 weeks',
      status: 'upcoming'
    },
    {
      step: 4,
      title: 'Partnership Agreement',
      description: 'Drafting and finalization of partnership agreement',
      timeframe: '3-4 weeks',
      status: 'upcoming'
    },
    {
      step: 5,
      title: 'Partnership Launch',
      description: 'Official launch of the partnership collaboration',
      timeframe: '4-6 weeks',
      status: 'upcoming'
    }
  ]

  const partnershipBenefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaborative Network',
      description: 'Access to our extensive network of educational institutions and partners'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Joint Initiatives',
      description: 'Opportunity to participate in joint projects and initiatives'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Regular Meetings',
      description: 'Quarterly partnership meetings and annual partnership conference'
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
                { title: 'Partnership', href: '/partnership', translationKey: 'header.partnerships' },
                { title: 'Application', href: '/partnership/application', translationKey: 'partnershipApplication.title' },
                { title: 'Success', href: '#', translationKey: 'common.success' },
              ]}
            />

            {/* Success Header */}
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                Partnership Application Submitted Successfully
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Thank you for your interest in partnering with BilimCert. Your partnership application has been submitted successfully and our team will review it carefully.
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

            {/* Partnership Benefits */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-semibold text-[#003366] text-center mb-8">
                Partnership Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partnershipBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-[#003366] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
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
                      type: 'Partnership Application',
                      submittedAt: new Date().toISOString(),
                    }
                    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `partnership-receipt-${applicationId}.json`
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
                    Partnership Process Timeline
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

                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Partnership Commitment</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          We are committed to building meaningful, long-term partnerships that benefit both organizations and contribute to the advancement of education quality and recognition standards.
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
                  <h3 className="text-lg font-semibold text-[#003366] mb-4">Partnership Team Contact</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">partnerships@bilimcert.kz</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-600">+7 (727) 123-45-69</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Working Hours:</span>
                      <span className="ml-2 text-gray-600">Mon-Fri 9:00-18:00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[#003366] mb-4">Partnership Resources</h3>
                  <div className="space-y-3">
                    <Link
                      href="/partnership/types"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Partnership Types
                    </Link>
                    <Link
                      href="/partnership/benefits"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Partnership Benefits
                    </Link>
                    <Link
                      href="/partnership/existing"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Current Partners
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

export default function PartnershipSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    }>
      <PartnershipSuccessContent />
    </Suspense>
  )
}
