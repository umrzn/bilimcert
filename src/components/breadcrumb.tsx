import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  title: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <Link
              href={item.href}
              className={`ml-2 text-sm font-medium ${
                index === items.length - 1 
                  ? "text-[#003366] hover:text-[#004080]" 
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors`}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
