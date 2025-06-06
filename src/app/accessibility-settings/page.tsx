'use client'

import { useState, useEffect } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import toast from 'react-hot-toast'
import {
  Eye,
  Type,
  Palette,
  Monitor,
  RotateCcw,
  Save,
  Volume2,
  Keyboard,
  Sun,
  Moon,
  Contrast
} from 'lucide-react'

export default function AccessibilitySettingsPage() {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    isHighContrastMode,
    toggleHighContrastMode,
    motionReduced,
    toggleMotionReduced,
    isDarkTheme,
    toggleDarkTheme
  } = useAccessibility()

  const [tempSettings, setTempSettings] = useState({
    fontSize: fontSize,
    highContrast: isHighContrastMode,
    reducedMotion: motionReduced,
    darkTheme: isDarkTheme
  })

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Қолжетімділік параметрлері', translationKey: 'accessibility.title' }
  ]

  useEffect(() => {
    setTempSettings({
      fontSize: fontSize,
      highContrast: isHighContrastMode,
      reducedMotion: motionReduced,
      darkTheme: isDarkTheme
    })
  }, [fontSize, isHighContrastMode, motionReduced, isDarkTheme])

  const handleSave = () => {
    // Apply font size changes
    const fontDiff = tempSettings.fontSize - fontSize
    if (fontDiff > 0) {
      for (let i = 0; i < fontDiff / 2; i++) {
        increaseFontSize()
      }
    } else if (fontDiff < 0) {
      for (let i = 0; i < Math.abs(fontDiff) / 2; i++) {
        decreaseFontSize()
      }
    }

    // Apply other settings
    if (tempSettings.highContrast !== isHighContrastMode) {
      toggleHighContrastMode()
    }
    if (tempSettings.reducedMotion !== motionReduced) {
      toggleMotionReduced()
    }
    if (tempSettings.darkTheme !== isDarkTheme) {
      toggleDarkTheme()
    }
    toast.success('Параметрлер сақталды!')
  }

  const handleReset = () => {
    resetFontSize()
    if (isHighContrastMode) toggleHighContrastMode()
    if (motionReduced) toggleMotionReduced()
    if (isDarkTheme) toggleDarkTheme()
    setTempSettings({
      fontSize: 16,
      highContrast: false,
      reducedMotion: false,
      darkTheme: false
    })
    toast.success('Параметрлер қалпына келтірілді!')
  }

  const fontSizeOptions = [
    { value: 12, label: 'Кіші', size: 'text-sm' },
    { value: 16, label: 'Орташа', size: 'text-base' },
    { value: 20, label: 'Үлкен', size: 'text-lg' },
    { value: 24, label: 'Өте үлкен', size: 'text-xl' }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#003366] dark:text-blue-400 mb-4">
              Қолжетімділік параметрлері
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Сайтты өзіңізге ыңғайлы етіп баптаңыз
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-colors duration-200">
            {/* Font Size Settings */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Type className="w-6 h-6 text-[#003366] dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-semibold text-[#003366] dark:text-blue-400">
                  Мәтін өлшемі
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Оқуға ыңғайлы мәтін өлшемін таңдаңыз
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fontSizeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTempSettings(prev => ({ ...prev, fontSize: option.value }))}
                    className={`p-4 border-2 rounded-lg text-center transition-colors ${tempSettings.fontSize === option.value
                      ? 'border-[#003366] dark:border-blue-500 bg-[#003366] dark:bg-blue-600 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-[#003366] dark:hover:border-blue-400 text-gray-900 dark:text-gray-100'
                      }`}
                  >
                    <div className={`font-medium ${option.size}`}>
                      {option.label}
                    </div>
                    <div className={`${tempSettings.fontSize === option.value ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'} mt-1 ${option.size}`}>
                      Мысал мәтін
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* High Contrast */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Palette className="w-6 h-6 text-[#003366] mr-3" />
                <h2 className="text-2xl font-semibold text-[#003366]">
                  Жоғары контраст
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Мәтін бен фонның арасындағы контрастты арттырады
              </p>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSettings.highContrast}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, highContrast: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`relative w-12 h-6 rounded-full transition-colors ${tempSettings.highContrast ? 'bg-[#003366]' : 'bg-gray-300'
                  }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${tempSettings.highContrast ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                </div>
                <span className="ml-3 text-gray-700">
                  Жоғары контрастты қосу
                </span>
              </label>
            </section>

            {/* Reduced Motion */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Monitor className="w-6 h-6 text-[#003366] mr-3" />
                <h2 className="text-2xl font-semibold text-[#003366]">
                  Анимацияны азайту
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Сайттағы анимация мен қозғалысты азайтады
              </p>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSettings.reducedMotion}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, reducedMotion: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`relative w-12 h-6 rounded-full transition-colors ${tempSettings.reducedMotion ? 'bg-[#003366]' : 'bg-gray-300'
                  }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${tempSettings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                </div>
                <span className="ml-3 text-gray-700">
                  Анимацияны азайту
                </span>
              </label>
            </section>
            {/* Dark Theme */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                {tempSettings.darkTheme ? (
                  <Moon className="w-6 h-6 text-[#003366] dark:text-blue-400 mr-3" />
                ) : (
                  <Sun className="w-6 h-6 text-[#003366] dark:text-blue-400 mr-3" />
                )}
                <h2 className="text-2xl font-semibold text-[#003366] dark:text-blue-400">
                  Қараңғы тема
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Көздерді жарықтан қорғау үшін қараңғы түстер схемасын қосады
              </p>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSettings.darkTheme}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, darkTheme: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`relative w-12 h-6 rounded-full transition-colors ${tempSettings.darkTheme ? 'bg-[#003366] dark:bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${tempSettings.darkTheme ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                </div>
                <span className="ml-3 text-gray-700 dark:text-gray-300">
                  Қараңғы теманы қосу
                </span>
              </label>
            </section>





            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="flex items-center justify-center px-6 py-3 bg-[#003366] hover:bg-[#004080] text-white font-semibold rounded-lg transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Параметрлерді сақтау
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-semibold rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Қалпына келтіру
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <Eye className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Қолжетімділік туралы
                  </h3>
                  <p className="text-blue-800 text-sm">
                    Бұл параметрлер сайтты барлық пайдаланушылар үшін қолжетімді етуге арналған.
                    Егер қосымша көмек қажет болса, біздің қолдау қызметімізбен байланысыңыз.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
