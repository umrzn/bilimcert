'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight, Info, DollarSign } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { ChatButton } from '@/components/ui/ChatButton'

interface CalculatorForm {
  documentType: string
  processingSpeed: string
  translation: boolean
  apostille: boolean
  courier: boolean
}

interface CostBreakdown {
  basePrice: number
  translationFee: number
  apostilleFee: number
  courierFee: number
  total: number
}

export default function RecognitionCalculatorPage() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState<CalculatorForm>({
    documentType: '',
    processingSpeed: '',
    translation: false,
    apostille: false,
    courier: false,
  })

  const [calculated, setCalculated] = useState(false)
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null)

  // Document types with base prices
  const documentTypes = [
    { value: 'diploma', label: 'Diploma/Degree', basePrice: 15000 },
    { value: 'certificate', label: 'Certificate', basePrice: 12000 },
    { value: 'transcript', label: 'Academic Transcript', basePrice: 10000 },
    { value: 'other', label: 'Other Document', basePrice: 8000 },
  ]

  // Processing speeds with multipliers
  const processingSpeeds = [
    { value: 'standard', label: t('calculator.standard'), multiplier: 1 },
    { value: 'expedited', label: t('calculator.expedited'), multiplier: 1.5 },
    { value: 'urgent', label: t('calculator.urgent'), multiplier: 2 },
  ]

  // Additional service fees
  const additionalFees = {
    translation: 8000,
    apostille: 5000,
    courier: 3000,
  }

  const calculateCost = () => {
    if (!formData.documentType || !formData.processingSpeed) {
      return
    }

    const docType = documentTypes.find(type => type.value === formData.documentType)
    const speed = processingSpeeds.find(speed => speed.value === formData.processingSpeed)

    if (!docType || !speed) return

    const basePrice = docType.basePrice * speed.multiplier
    const translationFee = formData.translation ? additionalFees.translation : 0
    const apostilleFee = formData.apostille ? additionalFees.apostille : 0
    const courierFee = formData.courier ? additionalFees.courier : 0
    const total = basePrice + translationFee + apostilleFee + courierFee

    setCostBreakdown({
      basePrice,
      translationFee,
      apostilleFee,
      courierFee,
      total,
    })

    setCalculated(true)
  }

  const resetCalculator = () => {
    setFormData({
      documentType: '',
      processingSpeed: '',
      translation: false,
      apostille: false,
      courier: false,
    })
    setCalculated(false)
    setCostBreakdown(null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
    }).format(price)
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
                { title: 'Calculator', href: '/recognition/calculator', translationKey: 'calculator.title' },
              ]}
            />

            {/* Header */}
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Calculator className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                <TranslatedText textKey="calculator.title" />
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <TranslatedText textKey="calculator.subtitle" />
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator Form */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-[#003366] mb-6">Calculate Your Cost</h2>

                    <div className="space-y-6">
                      {/* Document Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <TranslatedText textKey="calculator.documentType" />
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          value={formData.documentType}
                          onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        >
                          <option value="">Select document type</option>
                          {documentTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label} - {formatPrice(type.basePrice)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Processing Speed */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <TranslatedText textKey="calculator.processingSpeed" />
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="space-y-3">
                          {processingSpeeds.map((speed) => (
                            <label key={speed.value} className="flex items-center">
                              <input
                                type="radio"
                                name="processingSpeed"
                                value={speed.value}
                                checked={formData.processingSpeed === speed.value}
                                onChange={(e) => setFormData(prev => ({ ...prev, processingSpeed: e.target.value }))}
                                className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300"
                              />
                              <span className="ml-3 text-sm text-gray-700">
                                {speed.label}
                                {speed.multiplier > 1 && (
                                  <span className="text-gray-500"> (+{Math.round((speed.multiplier - 1) * 100)}%)</span>
                                )}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Additional Services */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          <TranslatedText textKey="calculator.additionalServices" />
                        </label>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.translation}
                                onChange={(e) => setFormData(prev => ({ ...prev, translation: e.target.checked }))}
                                className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">
                                <TranslatedText textKey="calculator.translation" />
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{formatPrice(additionalFees.translation)}</span>
                          </label>

                          <label className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.apostille}
                                onChange={(e) => setFormData(prev => ({ ...prev, apostille: e.target.checked }))}
                                className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">
                                <TranslatedText textKey="calculator.apostille" />
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{formatPrice(additionalFees.apostille)}</span>
                          </label>

                          <label className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.courier}
                                onChange={(e) => setFormData(prev => ({ ...prev, courier: e.target.checked }))}
                                className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">
                                <TranslatedText textKey="calculator.courier" />
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{formatPrice(additionalFees.courier)}</span>
                          </label>
                        </div>
                      </div>

                      {/* Calculate Button */}
                      <div className="flex space-x-4">
                        <button
                          onClick={calculateCost}
                          disabled={!formData.documentType || !formData.processingSpeed}
                          className="flex-1 flex items-center justify-center px-6 py-3 bg-[#003366] text-white rounded-md font-medium hover:bg-[#004080] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Calculator className="w-5 h-5 mr-2" />
                          <TranslatedText textKey="calculator.calculate" />
                        </button>

                        {calculated && (
                          <button
                            onClick={resetCalculator}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-6 md:p-8">
                    {!calculated ? (
                      <div className="text-center py-12">
                        <DollarSign className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-500 mb-2">
                          <TranslatedText textKey="calculator.result.title" />
                        </h3>
                        <p className="text-gray-400">
                          Fill out the form to calculate your cost
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl font-semibold text-[#003366] mb-6">
                          <TranslatedText textKey="calculator.result.title" />
                        </h2>

                        {costBreakdown && (
                          <div className="space-y-4">
                            {/* Cost Breakdown */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-700">
                                  <TranslatedText textKey="calculator.result.basePrice" />
                                </span>
                                <span className="font-medium">{formatPrice(costBreakdown.basePrice)}</span>
                              </div>

                              {costBreakdown.translationFee > 0 && (
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                  <span className="text-gray-700">
                                    <TranslatedText textKey="calculator.translation" />
                                  </span>
                                  <span className="font-medium">{formatPrice(costBreakdown.translationFee)}</span>
                                </div>
                              )}

                              {costBreakdown.apostilleFee > 0 && (
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                  <span className="text-gray-700">
                                    <TranslatedText textKey="calculator.apostille" />
                                  </span>
                                  <span className="font-medium">{formatPrice(costBreakdown.apostilleFee)}</span>
                                </div>
                              )}

                              {costBreakdown.courierFee > 0 && (
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                  <span className="text-gray-700">
                                    <TranslatedText textKey="calculator.courier" />
                                  </span>
                                  <span className="font-medium">{formatPrice(costBreakdown.courierFee)}</span>
                                </div>
                              )}

                              <div className="flex justify-between items-center py-3 border-t-2 border-[#003366]">
                                <span className="text-lg font-semibold text-[#003366]">
                                  <TranslatedText textKey="calculator.result.total" />
                                </span>
                                <span className="text-xl font-bold text-[#003366]">
                                  {formatPrice(costBreakdown.total)}
                                </span>
                              </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-start">
                                <Info className="h-5 w-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                                <p className="text-sm text-yellow-800">
                                  <TranslatedText textKey="calculator.result.disclaimer" />
                                </p>
                              </div>
                            </div>

                            {/* Proceed Button */}
                            <Link
                              href="/recognition/application"
                              className="w-full flex items-center justify-center px-6 py-3 bg-[#FF6600] text-white rounded-md font-medium hover:bg-[#FF7F00] transition-colors"
                            >
                              <TranslatedText textKey="calculator.result.proceed" />
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
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
