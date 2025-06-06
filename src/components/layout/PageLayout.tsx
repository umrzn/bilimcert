'use client'

import { ReactNode } from 'react'
import { FullWidthHeader } from './FullWidthHeader'
import { Footer } from './Footer'
import { Breadcrumbs } from './Breadcrumbs'
import { MobileMenu } from './MobileMenu'
import { ChatButton } from '../ui/ChatButton'

interface BreadcrumbItem {
  title: string
  href?: string
  translationKey?: string
}

interface PageLayoutProps {
  children: ReactNode
  title?: string
  breadcrumbs?: BreadcrumbItem[]
  showBreadcrumbs?: boolean
  className?: string
}

export function PageLayout({
  children,
  title,
  breadcrumbs = [],
  showBreadcrumbs = true,
  className = '',
}: PageLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-500 text-white px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>

      {/* Header */}
      <FullWidthHeader />

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Main Content */}
      <main id="main-content" className="flex-grow" role="main">
        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 py-3 transition-colors duration-200">
            <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          </div>
        )}

        {/* Page Title */}
        {title && (
          <div className="bg-primary-500 dark:bg-gray-800 text-white py-6 md:py-8 transition-colors duration-200">
            <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
              <h1 className="text-3xl font-bold">{title}</h1>
            </div>
          </div>
        )}

        {/* Page Content */}
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat Button */}
      <ChatButton />
    </div>
  )
}
