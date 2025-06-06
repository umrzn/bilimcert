'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'
import { IframeYandexMap } from '../ui/SimpleYandexMap'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { key: 'recognition', href: '/recognition' },
      { key: 'accreditation', href: '/accreditation' },
      { key: 'bolognaProcess', href: '/bologna-process' },
      { key: 'applicationStatus', href: '/application-status' },
      { key: 'universityFinder', href: '/universities/finder' },
    ],
    support: [
      { key: 'faq', href: '/faq' },
      { key: 'contacts', href: '/contacts' },
      { key: 'aboutCenter', href: '/about' },
      { key: 'partnerships', href: '/partnership/application' },
    ],
    quickLinks: [
      { key: 'students', href: '/students' },
      { key: 'universities', href: '/universities' },
      { key: 'employers', href: '/employers' },
      { key: 'news', href: '/news' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-primary-500 dark:bg-gray-900 text-white dark:text-gray-100 transition-colors duration-200 high-contrast:bg-black high-contrast:text-white" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-16 h-16 mr-3">
                <Image
                  src="/images/logo1.png"
                  alt="BilimCert Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">BilimCert</span>
            </Link>
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed high-contrast:text-gray-200">
              <TranslatedText textKey="home.subtitle" />
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300 dark:text-gray-400 high-contrast:text-gray-200">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <span>г. Нур-Султан, ул. Мәңгілік Ел, 8</span>
              </div>
              <div className="flex items-center text-sm text-gray-300 dark:text-gray-400 high-contrast:text-gray-200">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+77172123456" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  +7 (7172) 12-34-56
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300 dark:text-gray-400 high-contrast:text-gray-200">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@bilimcert.kz" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  info@bilimcert.kz
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300 dark:text-gray-400 high-contrast:text-gray-200">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <span>Пн-Пт: 9:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <TranslatedText textKey="footer.services" />
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm high-contrast:text-gray-200"
                  >
                    <TranslatedText textKey={`header.${link.key}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <TranslatedText textKey="footer.support" />
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm high-contrast:text-gray-200"
                  >
                    <TranslatedText textKey={`footer.${link.key}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <TranslatedText textKey="footer.quickLinks" />
            </h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm high-contrast:text-gray-200"
                  >
                    <TranslatedText textKey={`header.${link.key}`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-3">
                <TranslatedText textKey="footer.followUs" />
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors high-contrast:text-gray-200"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 pt-8 border-t border-primary-400 dark:border-gray-700 high-contrast:border-gray-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100 high-contrast:text-white">
                Біздің орналасқан жеріміз
              </h3>
              <div className="space-y-2 text-sm text-gray-300 dark:text-gray-400 high-contrast:text-gray-200">
                <p>БЦ "Нұр Алем", 15-қабат</p>
                <p>Метро: "Сарыарқа" (500м)</p>
                <p>Автотұрақ: ғимарат астында</p>
              </div>
            </div>
            <div className="h-64 rounded-lg overflow-hidden border border-primary-400 dark:border-gray-600 high-contrast:border-gray-300">
              <IframeYandexMap height="100%" className="w-full" />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-primary-400 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center high-contrast:border-gray-300">
          <p className="text-gray-300 dark:text-gray-400 text-sm text-center md:text-left high-contrast:text-gray-200">
            © {currentYear} BilimCert. <TranslatedText textKey="footer.rights" />
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <Link
              href="/privacy-policy"
              className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm high-contrast:text-gray-200"
            >
              <TranslatedText textKey="footer.privacy" />
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm high-contrast:text-gray-200"
            >
              <TranslatedText textKey="footer.terms" />
            </Link>
            <Link
              href="/accessibility-settings"
              className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm high-contrast:text-gray-200"
            >
              <TranslatedText textKey="footer.accessibility" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
