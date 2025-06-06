'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'

// Types for language context
export type Language = 'kz' | 'ru' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, string>) => string
  availableLanguages: Array<{
    code: Language
    name: string
    nativeName: string
    displayName: string
  }>
}

// Create context with initial value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Get saved language from localStorage or use Kazakh as default
  const [language, setLanguageState] = useState<Language>('kz')
  const [translations, setTranslations] = useState<Record<string, any>>({})

  const availableLanguages = [
    { code: 'kz' as Language, name: 'Kazakh', nativeName: 'Қазақша', displayName: 'Kazakh' },
    { code: 'ru' as Language, name: 'Russian', nativeName: 'Русский', displayName: 'Russian' },
    { code: 'en' as Language, name: 'English', nativeName: 'English', displayName: 'English' }
  ]

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [kzTranslations, ruTranslations, enTranslations] = await Promise.all([
          import('@/locales/kz').then(m => m.default),
          import('@/locales/ru').then(m => m.default),
          import('@/locales/en').then(m => m.default),
        ])
        
        setTranslations({
          kz: kzTranslations,
          ru: ruTranslations,
          en: enTranslations,
        })
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }

    loadTranslations()
  }, [])

  // Initialize language from localStorage/cookies
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage') || 
                           Cookies.get('preferredLanguage') || 
                           'kz'
      setLanguageState(savedLanguage as Language)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    
    if (typeof window !== 'undefined') {
      try {
        // Save to localStorage
        localStorage.setItem('preferredLanguage', newLanguage)
        
        // Save to cookie with 30 days expiry
        Cookies.set('preferredLanguage', newLanguage, { expires: 30, path: '/', sameSite: 'lax' })
        
        // Update HTML lang attribute
        document.documentElement.lang = newLanguage
        
        // Dispatch custom event for other components
        const event = new CustomEvent('languageChanged', { detail: { language: newLanguage } })
        window.dispatchEvent(event)
        
        console.log(`Language set to: ${newLanguage}`)
      } catch (error) {
        console.error('Error saving language preference:', error)
      }
    }
  }

  // Translation function
  const t = (key: string, params: Record<string, string> = {}) => {
    if (!translations[language]) {
      return key
    }

    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    if (typeof value === 'string') {
      // Replace parameters in translation string
      return Object.entries(params).reduce(
        (str, [param, val]) => str.replace(`{{${param}}}`, val),
        value
      )
    }

    return key
  }

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages,
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
