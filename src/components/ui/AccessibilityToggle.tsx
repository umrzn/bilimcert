'use client'

import { useState, useRef, useEffect } from 'react'
import { Eye, Settings, Sun, Moon, Contrast } from 'lucide-react'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import { TranslatedText } from './TranslatedText'

export function AccessibilityToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const {
    isHighContrastMode,
    toggleHighContrastMode,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    motionReduced,
    toggleMotionReduced,
    isDarkTheme,
    toggleDarkTheme,
  } = useAccessibility()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Accessibility settings"
      >
        <Eye className="w-4 h-4" aria-hidden="true" />
        <span className="hidden md:inline">
          <TranslatedText textKey="header.accessibility" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600 z-50 high-contrast:bg-white high-contrast:border-2 high-contrast:border-black">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center high-contrast:text-black">
              <Settings className="w-5 h-5 mr-2" aria-hidden="true" />
              <TranslatedText textKey="accessibility.settings" />
            </h3>

            <div className="space-y-4">
              {/* High Contrast Mode */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center high-contrast:text-black">
                    <Contrast className="w-4 h-4 mr-2" aria-hidden="true" />
                    <TranslatedText textKey="accessibility.highContrast" />
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-6 high-contrast:text-gray-800">
                    <TranslatedText textKey="accessibility.highContrastDescription" />
                  </p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 high-contrast:ring-4 high-contrast:ring-black ${isHighContrastMode ? 'bg-primary-500 high-contrast:bg-black' : 'bg-gray-200 dark:bg-gray-600 high-contrast:bg-gray-300'
                    }`}
                  onClick={toggleHighContrastMode}
                  aria-pressed={isHighContrastMode}
                  aria-label="Toggle high contrast mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform high-contrast:bg-white ${isHighContrastMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2 high-contrast:text-black">
                  <TranslatedText textKey="accessibility.fontSize" />: {fontSize}px
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded transition-colors high-contrast:bg-white high-contrast:border-2 high-contrast:border-black high-contrast:text-black disabled:opacity-50"
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 12}
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded transition-colors high-contrast:bg-white high-contrast:border-2 high-contrast:border-black high-contrast:text-black"
                    onClick={resetFontSize}
                  >
                    <TranslatedText textKey="accessibility.reset" />
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded transition-colors high-contrast:bg-white high-contrast:border-2 high-contrast:border-black high-contrast:text-black disabled:opacity-50"
                    onClick={increaseFontSize}
                    disabled={fontSize >= 24}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    <TranslatedText textKey="accessibility.reduceMotion" />
                  </label>
                  <p className="text-xs text-gray-500">
                    <TranslatedText textKey="accessibility.reduceMotionDescription" />
                  </p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${motionReduced ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  onClick={toggleMotionReduced}
                  aria-pressed={motionReduced}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${motionReduced ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {/* Dark Theme */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center high-contrast:text-black">
                    {isDarkTheme ? (
                      <Moon className="w-4 h-4 mr-2" aria-hidden="true" />
                    ) : (
                      <Sun className="w-4 h-4 mr-2" aria-hidden="true" />
                    )}
                    <TranslatedText textKey="accessibility.darkTheme" />
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-6 high-contrast:text-gray-800">
                    <TranslatedText textKey="accessibility.darkThemeDescription" />
                  </p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 high-contrast:ring-4 high-contrast:ring-black ${isDarkTheme ? 'bg-primary-500 high-contrast:bg-black' : 'bg-gray-200 dark:bg-gray-600 high-contrast:bg-gray-300'
                    }`}
                  onClick={toggleDarkTheme}
                  aria-pressed={isDarkTheme}
                  aria-label="Toggle dark theme"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform high-contrast:bg-white ${isDarkTheme ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 high-contrast:border-black">
              <button
                type="button"
                className="w-full text-center text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors high-contrast:text-black high-contrast:underline"
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to full accessibility settings page
                  window.location.href = '/accessibility-settings'
                }}
              >
                <TranslatedText textKey="common.viewAll" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
