"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Recognition", href: "/recognition" },
    { name: "Accreditation", href: "/accreditation" },
    { name: "Universities", href: "/universities" },
    { name: "Partnership", href: "/partnership" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="flex w-full items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#003366]">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            B
          </div>
        </div>
        <span className="text-xl font-bold text-[#003366]">BilimCert</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-gray-700 hover:text-[#003366] transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Language Selector & CTA */}
      <div className="hidden md:flex items-center space-x-4">
        <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
          <option value="en">EN</option>
          <option value="kz">KZ</option>
          <option value="ru">RU</option>
        </select>
        <Button className="bg-[#003366] hover:bg-[#004080] text-white">
          Get Started
        </Button>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-gray-700 hover:text-[#003366] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <select className="w-full text-sm border border-gray-300 rounded px-2 py-1 bg-white mb-4">
                <option value="en">English</option>
                <option value="kz">Қазақша</option>
                <option value="ru">Русский</option>
              </select>
              <Button className="w-full bg-[#003366] hover:bg-[#004080] text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
