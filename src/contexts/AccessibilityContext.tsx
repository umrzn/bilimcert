'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AccessibilityContextType {
  isHighContrastMode: boolean
  toggleHighContrastMode: () => void
  fontSize: number
  increaseFontSize: () => void
  decreaseFontSize: () => void
  resetFontSize: () => void
  motionReduced: boolean
  toggleMotionReduced: () => void
  textSpacing: number
  setTextSpacing: (spacing: number) => void
  colorBlindMode: string
  setColorBlindMode: (mode: string) => void
  isDarkTheme: boolean
  toggleDarkTheme: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

interface AccessibilityProviderProps {
  children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  // Initialize state from localStorage if available
  const [isHighContrastMode, setIsHighContrastMode] = useState<boolean>(false)
  const [fontSize, setFontSize] = useState<number>(16)
  const [motionReduced, setMotionReduced] = useState<boolean>(false)
  const [textSpacing, setTextSpacing] = useState<number>(1)
  const [colorBlindMode, setColorBlindMode] = useState<string>('none')
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHighContrast = localStorage.getItem('highContrastMode') === 'true'
      const savedFontSize = parseInt(localStorage.getItem('fontSize') || '16', 10)
      const savedMotionReduced = localStorage.getItem('motionReduced') === 'true'
      const savedTextSpacing = parseFloat(localStorage.getItem('textSpacing') || '1')
      const savedColorBlindMode = localStorage.getItem('colorBlindMode') || 'none'
      const savedDarkTheme = localStorage.getItem('darkTheme') === 'true'

      setIsHighContrastMode(savedHighContrast)
      setFontSize(savedFontSize)
      setMotionReduced(savedMotionReduced)
      setTextSpacing(savedTextSpacing)
      setColorBlindMode(savedColorBlindMode)
      setIsDarkTheme(savedDarkTheme)
    }
  }, [])

  // Apply accessibility settings to document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement

      // High contrast mode
      if (isHighContrastMode) {
        root.classList.add('high-contrast')
      } else {
        root.classList.remove('high-contrast')
      }

      // Font size - apply to body instead of root for better compatibility
      const body = document.body
      if (body) {
        body.style.fontSize = `${fontSize}px`
      }

      // Motion reduced
      if (motionReduced) {
        root.classList.add('motion-reduced')
      } else {
        root.classList.remove('motion-reduced')
      }

      // Text spacing
      root.style.setProperty('--text-spacing', textSpacing.toString())

      // Color blind mode
      root.setAttribute('data-color-blind-mode', colorBlindMode)

      // Dark theme
      if (isDarkTheme) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }

      // Save to localStorage
      localStorage.setItem('highContrastMode', isHighContrastMode.toString())
      localStorage.setItem('fontSize', fontSize.toString())
      localStorage.setItem('motionReduced', motionReduced.toString())
      localStorage.setItem('textSpacing', textSpacing.toString())
      localStorage.setItem('colorBlindMode', colorBlindMode)
      localStorage.setItem('darkTheme', isDarkTheme.toString())
    }
  }, [isHighContrastMode, fontSize, motionReduced, textSpacing, colorBlindMode, isDarkTheme])

  const toggleHighContrastMode = () => {
    setIsHighContrastMode(prev => !prev)
  }

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24))
  }

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12))
  }

  const resetFontSize = () => {
    setFontSize(16)
  }

  const toggleMotionReduced = () => {
    setMotionReduced(prev => !prev)
  }

  const toggleDarkTheme = () => {
    setIsDarkTheme(prev => !prev)
  }

  const contextValue: AccessibilityContextType = {
    isHighContrastMode,
    toggleHighContrastMode,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    motionReduced,
    toggleMotionReduced,
    textSpacing,
    setTextSpacing,
    colorBlindMode,
    setColorBlindMode,
    isDarkTheme,
    toggleDarkTheme,
  }

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
