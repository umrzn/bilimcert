import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-r from-[#002244] to-[#003366] text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwaC02VjBoNnYzMHptLTYgMGgtNlYwaDZ2MzB6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
      </div>

      <div className="container py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white">
                <div className="absolute inset-0 flex items-center justify-center text-[#003366] font-bold">B</div>
              </div>
              <span className="text-xl font-bold">BilimCert</span>
            </Link>
            <p className="text-white/80 mb-6">
              Kazakhstan's leading education quality assessment center, providing accreditation, recognition, and Bologna Process implementation services.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/recognition" className="text-white/80 hover:text-white transition-colors">
                  Document Recognition
                </Link>
              </li>
              <li>
                <Link href="/accreditation" className="text-white/80 hover:text-white transition-colors">
                  Institutional Accreditation
                </Link>
              </li>
              <li>
                <Link href="/bologna" className="text-white/80 hover:text-white transition-colors">
                  Bologna Process
                </Link>
              </li>
              <li>
                <Link href="/universities" className="text-white/80 hover:text-white transition-colors">
                  University Finder
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-white/80 hover:text-white transition-colors">
                  Partnership Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About the Center
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-white/80 hover:text-white transition-colors">
                  Careers/Vacancies
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/80 hover:text-white transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/application-status" className="text-white/80 hover:text-white transition-colors">
                  Application Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <address className="not-italic text-white/80 space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Almaty, Kazakhstan</p>
                  <p>050010, Dostyk Ave 13</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@bilimcert.kz" className="hover:text-white transition-colors">
                  info@bilimcert.kz
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+77273456789" className="hover:text-white transition-colors">
                  +7 (727) 345-67-89
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} BilimCert. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-sm text-white/60 hover:text-white transition-colors">
              Accessibility Version
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
