'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface TranslatedTextProps {
  textKey: string
  params?: Record<string, string>
  fallback?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function TranslatedText({ 
  textKey, 
  params = {}, 
  fallback, 
  className = '',
  as: Component = 'span'
}: TranslatedTextProps) {
  const { t } = useLanguage()
  
  const translatedText = t(textKey, params)
  const displayText = translatedText !== textKey ? translatedText : (fallback || textKey)
  
  return (
    <Component className={className}>
      {displayText}
    </Component>
  )
}
