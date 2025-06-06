'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X, User, LogIn } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle'
import { useLanguage } from '@/contexts/LanguageContext'
import { useMobileMenu } from '@/contexts/MobileMenuContext'

export function MainNav() {
  const { t } = useLanguage()
  const { isOpen: mobileMenuOpen, toggleMenu } = useMobileMenu()
  const [scrolled, setScrolled] = useState(false)
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenItem(null)
      }
    }

    if (openItem !== null) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openItem])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenItem(null)
        setOpenMobileDropdown(null)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  // Complete navigation structure as requested
  const navigationItems = [
    {
      title: "О Центре",
      href: "/about",
      subItems: [
        { title: "История Центра", href: "/about/history" },
        { title: "Стратегия и миссия", href: "/about/strategy" },
        { title: "Руководящий состав", href: "/about/leadership" },
        { title: "Структурные подразделения", href: "/about/departments" },
        { title: "Меморандумы Центра", href: "/about/memorandums" },
        { title: "Мероприятия", href: "/about/events" },
        { title: "Общественная жизнь", href: "/about/social-life" },
      ],
    },
    {
      title: "Болонский процесс",
      href: "/bologna-process",
      subItems: [
        { title: "Основные документы", href: "/bologna-process/documents" },
        { title: "Инструменты ЕПВО", href: "/bologna-process/tools" },
        { title: "UNESCO", href: "/bologna-process/unesco" },
        { title: "Мониторинг деятельности", href: "/bologna-process/monitoring" },
      ],
    },
    {
      title: "Справочная информация",
      href: "/reference",
      subItems: [
        { title: "Материалы Национального Центра развития высшего образования", href: "/reference/national-center" },
        { title: "Система высшего образования в Казахстане", href: "/reference/education-system" },
        { title: "Образцы дипломов ВУЗов РК", href: "/reference/diploma-samples" },
        { title: "ВУЗы Казахстана", href: "/universities/finder" },
        { title: "Нормативно-правовые акты", href: "/reference/legal-acts" },
        { title: "Международные соглашения", href: "/reference/international-agreements" },
        { title: "Методические рекомендации", href: "/reference/methodological-recommendations" },
        { title: "Справочники и классификаторы", href: "/reference/handbooks-classifiers" },
      ],
    },
    {
      title: "Реестр ОП",
      href: "/registry",
      subItems: [
        { title: "НПА", href: "/registry/npa" },
        { title: "ОВПО", href: "/registry/ovpo" },
        { title: "Эксперту ОП", href: "/registry/expert" },
        { title: "Семинары реестра", href: "/registry/seminars" },
      ],
    },
    {
      title: "Деятельность",
      href: "/activities",
      subItems: [
        { title: "Национальный доклад", href: "/activities/national-report" },
        { title: "Содержание образовательных программ", href: "/activities/educational-programs" },
        { title: "Академическая мобильность", href: "/students" },
        { title: "Признание документов об образовании", href: "/recognition" },
        { title: "Научные исследования", href: "/universities/research" },
        { title: "Проектный офис", href: "/activities/project-office" },
        { title: "Международное сотрудничество", href: "/partnership/application" },
        { title: "Программа «Мамандығым-болашағым»", href: "/students" },
        { title: "Атласы", href: "/activities/atlases" },
      ],
    },
  ]

  // Simple navigation items without dropdowns
  const simpleNavItems = [
    { title: "Вопрос - ответ", href: "/questions" },
    { title: "Вакансии", href: "/vacancies" },
  ]

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  const toggleMobileDropdown = (index: number) => {
    setOpenMobileDropdown(openMobileDropdown === index ? null : index)
  }

  return (
    <div className="flex flex-col w-full py-2">
      {/* Top Row - Logo, Language Switcher, Accessibility Toggle, Apply Button */}
      <div className="flex justify-between items-center w-full mb-3">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/images/logo1.png"
              alt="BilimCert Logo"
              width={64}
              height={64}
              className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain"
              priority
            />
            <span
              className={`text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#003366] to-[#0066CC] dark:from-[#4A90E2] dark:to-[#66B3FF] bg-clip-text text-transparent transition-all ${scrolled ? "opacity-100" : "opacity-100"} high-contrast:text-black high-contrast:bg-none`}
            >
              BilimCert
            </span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center">
          {/* Language Switcher - Only visible on large screens */}
          <div className="hidden lg:flex items-center mr-2 lg:mr-3 flex-shrink-0">
            <LanguageSwitcher />
          </div>

          {/* Accessibility Toggle - Only visible on large screens */}
          <div className="hidden lg:flex items-center mr-2 lg:mr-3 xl:mr-4 flex-shrink-0">
            <AccessibilityToggle />
          </div>

          {/* Apply Button - Only visible on large screens */}
          <div className="hidden lg:flex items-center mr-2 lg:mr-3 flex-shrink-0">
            <Link
              href="/application"
              className="bg-gradient-to-r from-[#FF6600] to-[#FF8800] dark:from-[#FF7700] dark:to-[#FF9900] hover:opacity-90 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-md transition-colors text-sm lg:text-base font-medium whitespace-nowrap high-contrast:bg-black high-contrast:border-2 high-contrast:border-white"
            >
              <TranslatedText textKey="header.applyButton" />
            </Link>
          </div>

          {/* Personal Cabinet Button - Only visible on large screens */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              href="/auth/login"
              className="bg-gradient-to-r from-[#003366] to-[#004080] dark:from-[#4A90E2] dark:to-[#66B3FF] hover:opacity-90 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-md transition-colors text-sm lg:text-base font-medium whitespace-nowrap high-contrast:bg-black high-contrast:border-2 high-contrast:border-white flex items-center"
            >
              <User className="w-4 h-4 mr-1" />
              Личный кабинет
            </Link>
          </div>

          {/* Mobile Menu Button - Show for screens smaller than 900px */}
          <div className="lg:hidden flex-shrink-0">
            <button
              type="button"
              className="text-[#003366] dark:text-gray-200 hover:text-[#004080] dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#003366]/50 dark:focus:ring-gray-400 rounded-md p-1.5 transition-colors high-contrast:text-black high-contrast:border-2 high-contrast:border-black"
              onClick={(e) => {
                e.stopPropagation()
                toggleMenu()
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7" />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation Items */}
      <div className="w-full">
        {/* Desktop Navigation - Show only on large screens (1024px+) */}
        <div className="hidden lg:flex justify-center w-full" ref={dropdownRef}>
          <div className="flex space-x-2 lg:space-x-4 xl:space-x-6 flex-wrap justify-center">
            {/* Navigation items with dropdowns */}
            {navigationItems.map((item, index) => (
              <div key={item.title} className="relative flex-shrink-0">
                <button
                  className="bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-700/80 text-sm lg:text-base px-2 py-2 lg:px-3 lg:py-2 font-medium text-[#003366] dark:text-gray-200 rounded-md flex items-center transition-colors high-contrast:text-black high-contrast:border-2 high-contrast:border-black"
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItem === index}
                >
                  {item.title}
                  <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${openItem === index ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {openItem === index && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 z-50">
                    <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg high-contrast:bg-white high-contrast:border-2 high-contrast:border-black min-w-[280px] max-w-[400px]">
                      <div className="p-2">
                        {/* Main category link */}
                        <Link
                          href={item.href}
                          className="block px-4 py-3 rounded-md bg-gradient-to-r from-[#003366] to-[#004080] dark:from-[#4A90E2] dark:to-[#66B3FF] text-white font-medium hover:opacity-90 transition-opacity high-contrast:bg-black high-contrast:border-2 high-contrast:border-white"
                          onClick={() => setOpenItem(null)}
                        >
                          {item.title}
                        </Link>
                        {/* Submenu items */}
                        <div className="mt-2 space-y-1">
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-[#003366] dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors high-contrast:text-black high-contrast:hover:bg-gray-300"
                              onClick={() => setOpenItem(null)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Simple navigation items */}
            {simpleNavItems.map((item) => (
              <div key={item.title} className="flex-shrink-0">
                <Link
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-md bg-transparent px-2 py-2 lg:px-3 lg:py-2 text-sm lg:text-base font-medium transition-colors hover:bg-[#003366]/10 dark:hover:bg-gray-700/50 focus:bg-[#003366]/10 dark:focus:bg-gray-700/50 focus:outline-none text-[#003366] dark:text-gray-200 high-contrast:text-black high-contrast:border-2 high-contrast:border-black"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile Menu Overlay - Show for screens smaller than 1024px */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={toggleMenu}>
          <div
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
            ref={mobileMenuRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/logo1.png"
                  alt="BilimCert Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-lg font-bold text-[#003366] dark:text-gray-200">
                  BilimCert
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-4 space-y-4">
              {/* Navigation Items with Dropdowns */}
              {navigationItems.map((item, index) => (
                <div key={item.title} className="space-y-2">
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-left text-[#003366] dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    onClick={() => toggleMobileDropdown(index)}
                    aria-expanded={openMobileDropdown === index}
                  >
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMobileDropdown === index ? 'rotate-180' : 'rotate-0'}`} />
                  </button>

                  {openMobileDropdown === index && (
                    <div className="ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      {/* Main category link */}
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#003366] to-[#004080] dark:from-[#4A90E2] dark:to-[#66B3FF] rounded-md hover:opacity-90 transition-opacity"
                        onClick={toggleMenu}
                      >
                        {item.title}
                      </Link>
                      {/* Submenu items */}
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                          onClick={toggleMenu}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Simple Navigation Items */}
              {simpleNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block px-3 py-2 text-[#003366] dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
              ))}

              {/* Mobile Menu Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {/* Language Switcher */}
                <div className="px-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Язык / Тіл / Language</div>
                  <div className="max-w-full overflow-hidden">
                    <LanguageSwitcher />
                  </div>
                </div>

                {/* Accessibility Toggle */}
                <div className="px-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Настройки доступности</div>
                  <div className="max-w-full overflow-hidden">
                    <AccessibilityToggle />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 px-3">
                  <Link
                    href="/application"
                    className="block w-full bg-gradient-to-r from-[#FF6600] to-[#FF8800] hover:opacity-90 text-white px-4 py-3 rounded-md transition-colors text-center font-medium"
                    onClick={toggleMenu}
                  >
                    <TranslatedText textKey="header.applyButton" />
                  </Link>
                  <Link
                    href="/auth/login"
                    className="block w-full bg-gradient-to-r from-[#003366] to-[#004080] hover:opacity-90 text-white px-4 py-3 rounded-md transition-colors text-center font-medium flex items-center justify-center"
                    onClick={toggleMenu}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Личный кабинет
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
