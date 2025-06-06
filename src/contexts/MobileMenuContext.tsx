'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

interface MobileMenuContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleMenu: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement>
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined)

export const MobileMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on the body when menu is open
      document.body.style.overflow = 'hidden'

      // Focus on the close button when menu opens (for accessibility)
      if (closeButtonRef.current) {
        setTimeout(() => {
          closeButtonRef.current?.focus()
        }, 100)
      }

      // Add keyboard event listener for Escape key to close menu
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
        }
      }

      window.addEventListener('keydown', handleEscKey)

      // Return cleanup function
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEscKey)
      }
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = ''
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen, toggleMenu, closeButtonRef }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export const useMobileMenu = (): MobileMenuContextType => {
  const context = useContext(MobileMenuContext)
  if (context === undefined) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider')
  }
  return context
}
