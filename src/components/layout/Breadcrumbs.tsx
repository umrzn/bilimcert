'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

interface BreadcrumbItem {
  title: string
  href?: string
  translationKey?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null
  }

  // Check if the first item is home page
  const isFirstItemHome = items.length > 0 && (
    items[0].href === '/' ||
    items[0].translationKey === 'header.home' ||
    items[0].title.toLowerCase() === 'home'
  )

  // If we only have home item, don't show breadcrumbs
  if (items.length === 1 && isFirstItemHome) {
    return null
  }

  // Filter out home item if it's the first one, since we always show home link
  const filteredItems = isFirstItemHome ? items.slice(1) : items

  return (
    <nav
      className={`flex ${className}`}
      aria-label="Breadcrumb"
      role="navigation"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* Home link - only show if we have other items */}
        {filteredItems.length > 0 && (
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Home"
            >
              <Home className="w-4 h-4 mr-2" aria-hidden="true" />
              <TranslatedText textKey="header.home" />
            </Link>
          </li>
        )}

        {/* Breadcrumb items */}
        {filteredItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            <ChevronRight
              className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-1"
              aria-hidden="true"
            />
            {item.href && index < filteredItems.length - 1 ? (
              <Link
                href={item.href}
                className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors md:ml-2"
              >
                {item.translationKey ? (
                  <TranslatedText textKey={item.translationKey} />
                ) : (
                  item.title
                )}
              </Link>
            ) : (
              <span
                className="ml-1 text-sm font-medium text-primary-500 dark:text-primary-400 md:ml-2"
                aria-current="page"
              >
                {item.translationKey ? (
                  <TranslatedText textKey={item.translationKey} />
                ) : (
                  item.title
                )}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
