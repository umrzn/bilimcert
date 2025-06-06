'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useMobileMenu } from '@/contexts/MobileMenuContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { TranslatedText } from './TranslatedText'

const navItems = [
  { key: 'home', href: '/' },
  { key: 'recognition', href: '/recognition' },
  { key: 'accreditation', href: '/accreditation' },
  { key: 'bolognaProcess', href: '/bologna-process' },
  { key: 'news', href: '/news' },
  { key: 'contacts', href: '/contacts' },
  { key: 'faq', href: '/faq' },
  { key: 'applicationStatus', href: '/application-status' },
  { key: 'universityFinder', href: '/universities/finder' },
]

export function MobileMenu() {
  const { isOpen, setIsOpen } = useMobileMenu()
  const { t } = useLanguage()

  const closeMobileMenu = () => setIsOpen(false)

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                <img
                  src="/images/logo1.png"
                  alt="BilimCert Logo"
                  className="h-10 w-auto object-contain mr-3"
                />
                <span className="text-lg font-semibold text-[#003366]">BilimCert</span>
              </Link>
            </div>
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={closeMobileMenu}
              aria-label={t('common.close')}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto" role="navigation">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <TranslatedText textKey={`header.${item.key}`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200" />

            {/* Additional Links */}
            <div className="space-y-1">
              <Link
                href="/students"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                <TranslatedText textKey="header.students" />
              </Link>
              <Link
                href="/universities"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                <TranslatedText textKey="header.universities" />
              </Link>
              <Link
                href="/employers"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                <TranslatedText textKey="header.employers" />
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-4">
            {/* Language Switcher */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText textKey="header.language" />
              </span>
              <LanguageSwitcher />
            </div>

            {/* Apply Button */}
            <Link
              href="/application"
              className="block w-full bg-secondary-500 hover:bg-secondary-600 text-white text-center px-6 py-3 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
              onClick={closeMobileMenu}
            >
              <TranslatedText textKey="header.applyButton" />
            </Link>

            {/* Accessibility Link */}
            <Link
              href="/accessibility-settings"
              className="block w-full text-center text-sm text-primary-500 hover:text-primary-600 transition-colors"
              onClick={closeMobileMenu}
            >
              <TranslatedText textKey="header.accessibility" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
