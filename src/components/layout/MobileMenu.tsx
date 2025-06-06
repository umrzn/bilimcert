'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle'
import { useMobileMenu } from '@/contexts/MobileMenuContext'

// Navigation items
const standardNavItems = [
  { key: 'home', href: '/' },
  { key: 'recognition', href: '/recognition' },
  { key: 'accreditation', href: '/accreditation' },
  { key: 'bolognaProcess', href: '/bologna-process' },
  { key: 'news', href: '/news' },
  { key: 'contacts', href: '/contacts' },
  { key: 'faq', href: '/faq' },
  { key: 'applicationStatus', href: '/application-status' },
]

const advancedItems = [
  {
    title: "mainNav.forStudents",
    href: "/students",
    description: "mainNav.studentsDescription",
    subItems: [
      { title: "mainNav.careerDevelopment", href: "/students/career" },
      { title: "mainNav.internships", href: "/students/internships" },
      { title: "mainNav.skillBuilding", href: "/students/skills" },
    ],
  },
  {
    title: "mainNav.forUniversities",
    href: "/universities",
    description: "mainNav.universitiesDescription",
    subItems: [
      { title: "mainNav.researchCollaboration", href: "/universities/research" },
      { title: "mainNav.curriculumDevelopment", href: "/universities/curriculum" },
      { title: "mainNav.industryPartnerships", href: "/universities/partnerships" },
      { title: "mainNav.universityFinder", href: "/universities/finder" },
    ],
  },
  {
    title: "mainNav.forEmployers",
    href: "/employers",
    description: "mainNav.employersDescription",
    subItems: [
      { title: "mainNav.talentRecruitment", href: "/employers/recruitment" },
      { title: "mainNav.professionalDevelopment", href: "/employers/development" },
      { title: "mainNav.academicPartnerships", href: "/employers/partnerships" },
    ],
  },
  {
    title: "mainNav.about",
    href: "/about",
    description: "mainNav.aboutDescription",
  },
  {
    title: "mainNav.contact",
    href: "/contacts",
    description: "mainNav.contactDescription",
  },
]

export function MobileMenu() {
  const { isOpen, setIsOpen, closeButtonRef } = useMobileMenu()

  // If not open, don't render anything
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className="fixed right-0 inset-y-0 w-3/4 max-w-sm bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out"
        style={{ transform: 'translateX(0)' }}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#003366] p-2"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#003366]">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        {/* Menu content */}
        <div className="overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <img
                src="/images/logo1.png"
                alt="BilimCert Logo"
                className="h-16 w-auto object-contain"
              />
              <span className="ml-4 text-xl font-bold text-[#003366]">BilimCert</span>
            </Link>
          </div>

          <nav className="grid gap-4 text-lg font-medium" id="mobile-menu">
            {standardNavItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group flex min-h-[48px] w-full items-center rounded-md px-4 py-3 hover:bg-gray-100 hover:text-[#003366] text-gray-700 transition-colors text-base"
                onClick={() => setIsOpen(false)}
              >
                <TranslatedText textKey={`header.${item.key}`} />
              </Link>
            ))}

            {/* Add the advanced menu items */}
            {advancedItems.map((item, index) => (
              <div key={item.title} className="space-y-3 mb-2">
                <Link
                  href={item.href}
                  className="group flex min-h-[48px] w-full items-center rounded-md px-4 py-3 hover:bg-gray-100 hover:text-[#003366] text-gray-700 transition-colors font-medium text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <TranslatedText textKey={item.title} />
                </Link>

                {item.subItems && (
                  <div className="pl-4 border-l-2 border-[#003366]/20 space-y-3">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="group flex min-h-[48px] w-full items-center rounded-md px-4 py-2 hover:bg-gray-100 hover:text-[#003366] text-gray-700 transition-colors text-base"
                        onClick={() => setIsOpen(false)}
                      >
                        <TranslatedText textKey={subItem.title} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <LanguageSwitcher />
              <AccessibilityToggle />
            </div>
            <Link
              href="/application"
              className="block w-full bg-gradient-to-r from-[#FF6600] to-[#FF8800] hover:opacity-90 text-white px-4 py-3 rounded-md transition-colors text-center min-h-[48px] text-lg font-medium shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <TranslatedText textKey="header.applyButton" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
