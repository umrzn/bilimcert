'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { AuthProvider } from '@/contexts/AuthContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LanguageProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <MobileMenuProvider>
              {children}
            </MobileMenuProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
