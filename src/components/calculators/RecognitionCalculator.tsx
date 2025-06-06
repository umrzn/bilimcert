'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, DollarSign, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'

interface CalculationResult {
  baseFee: number
  additionalFees: number
  totalFee: number
  processingTime: number
  urgentProcessing: boolean
  documentCount: number
}

interface DocumentType {
  id: string
  name: string
  baseFee: number
  processingDays: number
}

const documentTypes: DocumentType[] = [
  { id: 'diploma', name: 'Диплом', baseFee: 15000, processingDays: 30 },
  { id: 'certificate', name: 'Сертификат', baseFee: 10000, processingDays: 20 },
  { id: 'transcript', name: 'Академиялық анықтама', baseFee: 8000, processingDays: 15 },
  { id: 'degree', name: 'Ғылыми дәреже', baseFee: 25000, processingDays: 45 },
]

const countries = [
  { id: 'usa', name: 'АҚШ', multiplier: 1.2 },
  { id: 'uk', name: 'Ұлыбритания', multiplier: 1.15 },
  { id: 'germany', name: 'Германия', multiplier: 1.1 },
  { id: 'france', name: 'Франция', multiplier: 1.1 },
  { id: 'russia', name: 'Ресей', multiplier: 1.0 },
  { id: 'china', name: 'Қытай', multiplier: 1.05 },
  { id: 'other', name: 'Басқа елдер', multiplier: 1.3 },
]

export function RecognitionCalculator() {
  const { t } = useLanguage()
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)
  const [hasTranslation, setHasTranslation] = useState(false)
  const [hasNotarization, setHasNotarization] = useState(false)
  const [result, setResult] = useState<CalculationResult | null>(null)

  useEffect(() => {
    calculateFees()
  }, [selectedDocuments, selectedCountry, isUrgent, hasTranslation, hasNotarization])

  const calculateFees = () => {
    if (selectedDocuments.length === 0 || !selectedCountry) {
      setResult(null)
      return
    }

    const country = countries.find(c => c.id === selectedCountry)
    if (!country) return

    let baseFee = 0
    let maxProcessingTime = 0

    selectedDocuments.forEach(docId => {
      const docType = documentTypes.find(d => d.id === docId)
      if (docType) {
        baseFee += docType.baseFee
        maxProcessingTime = Math.max(maxProcessingTime, docType.processingDays)
      }
    })

    // Apply country multiplier
    baseFee *= country.multiplier

    // Calculate additional fees
    let additionalFees = 0
    if (hasTranslation) additionalFees += 5000 * selectedDocuments.length
    if (hasNotarization) additionalFees += 3000 * selectedDocuments.length
    if (isUrgent) additionalFees += baseFee * 0.5 // 50% surcharge for urgent processing

    // Calculate processing time
    let processingTime = maxProcessingTime
    if (isUrgent) processingTime = Math.ceil(processingTime / 2)

    const totalFee = baseFee + additionalFees

    setResult({
      baseFee,
      additionalFees,
      totalFee,
      processingTime,
      urgentProcessing: isUrgent,
      documentCount: selectedDocuments.length
    })
  }

  const toggleDocument = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
        <div className="flex items-center">
          <Calculator className="w-8 h-8 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">Тану құнын есептеу</h2>
            <p className="text-primary-100 mt-1">
              Дипломды тану процесінің құны мен уақытын есептеңіз
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Document Types */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Құжат түрлері
              </h3>
              <div className="space-y-3">
                {documentTypes.map((doc) => (
                  <label
                    key={doc.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedDocuments.includes(doc.id)
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleDocument(doc.id)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {doc.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {formatCurrency(doc.baseFee)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.processingDays} күн
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Country Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Диплом алған ел
              </h3>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Елді таңдаңыз</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Қосымша қызметтер
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasTranslation}
                    onChange={(e) => setHasTranslation(e.target.checked)}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-900 dark:text-gray-100">
                    Аударма қызметі (+5,000 ₸ әр құжатқа)
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasNotarization}
                    onChange={(e) => setHasNotarization(e.target.checked)}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-900 dark:text-gray-100">
                    Нотариалды куәландыру (+3,000 ₸ әр құжатқа)
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-900 dark:text-gray-100">
                    Жедел өңдеу (+50% қосымша ақы)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-green-200 dark:border-gray-500"
              >
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Есептеу нәтижесі
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Processing Time */}
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Өңдеу уақыты
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {result.processingTime} күн
                    </span>
                  </div>

                  {/* Base Fee */}
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-900 dark:text-gray-100">Негізгі құн</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {formatCurrency(result.baseFee)}
                    </span>
                  </div>

                  {/* Additional Fees */}
                  {result.additionalFees > 0 && (
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-gray-900 dark:text-gray-100">Қосымша қызметтер</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(result.additionalFees)}
                      </span>
                    </div>
                  )}

                  {/* Total Fee */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg">
                    <span className="text-lg font-bold">Жалпы құн</span>
                    <span className="text-2xl font-bold">
                      {formatCurrency(result.totalFee)}
                    </span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                        Назар аударыңыз
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-200 text-sm">
                        Бұл есептеу шамамен болып табылады. Нақты құн құжаттардың күрделілігі мен 
                        қосымша талаптарға байланысты өзгеруі мүмкін.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Есептеуді бастау үшін
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Құжат түрін және елді таңдаңыз
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
