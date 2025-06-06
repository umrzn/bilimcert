'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Award, FileText, Globe } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white overflow-hidden min-h-[600px] flex items-center transition-colors duration-200 high-contrast:bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-6" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-20 max-w-screen-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                <Image
                  src="/images/logo1.png"
                  alt="BilimCert Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">BilimCert</h1>
                <p className="text-primary-100 dark:text-gray-300 text-sm md:text-base high-contrast:text-gray-200">
                  <TranslatedText textKey="home.subtitle" />
                </p>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <TranslatedText textKey="home.heroTitle" />
              </h2>
              <p className="text-lg md:text-xl text-primary-100 dark:text-gray-300 leading-relaxed max-w-lg high-contrast:text-gray-200">
                <TranslatedText textKey="home.heroSubtitle" />
              </p>
            </div>

            {/* Key Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 high-contrast:bg-gray-800 high-contrast:border-2 high-contrast:border-white">
                <Award className="w-6 h-6 text-secondary-400 dark:text-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium">
                  <TranslatedText textKey="header.accreditation" />
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 high-contrast:bg-gray-800 high-contrast:border-2 high-contrast:border-white">
                <FileText className="w-6 h-6 text-secondary-400 dark:text-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium">
                  <TranslatedText textKey="header.recognition" />
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 high-contrast:bg-gray-800 high-contrast:border-2 high-contrast:border-white">
                <Globe className="w-6 h-6 text-secondary-400 dark:text-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium">
                  <TranslatedText textKey="header.bolognaProcess" />
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/application"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary-500 dark:bg-orange-600 hover:bg-secondary-600 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-primary-500 dark:focus:ring-offset-gray-900 high-contrast:bg-orange-600 high-contrast:border-2 high-contrast:border-white"
              >
                <TranslatedText textKey="home.getStarted" />
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white dark:border-gray-300 text-white dark:text-gray-300 hover:bg-white dark:hover:bg-gray-300 hover:text-primary-500 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-primary-500 dark:focus:ring-offset-gray-900 high-contrast:border-white high-contrast:text-white"
              >
                <TranslatedText textKey="home.learnMore" />
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:pl-8">
            <div className="relative w-full h-80 lg:h-96">
              {/* Main Card */}
              <div className="relative w-full h-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-600/50 p-8 flex flex-col justify-center high-contrast:bg-gray-800 high-contrast:border-2 high-contrast:border-white">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-secondary-500/20 dark:bg-orange-600/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-secondary-400 dark:text-orange-400" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">
                      <TranslatedText textKey="home.whyChooseUs" />
                    </h3>
                    <p className="text-primary-100 dark:text-gray-300 text-sm leading-relaxed high-contrast:text-gray-200">
                      Сапалы білім беру қызметтері мен халықаралық стандарттарға сәйкес қызмет көрсету
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary-400 dark:text-orange-400">1000+</div>
                      <div className="text-xs text-primary-200 dark:text-gray-400 high-contrast:text-gray-300">Аккредиттелген бағдарлама</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary-400 dark:text-orange-400">50+</div>
                      <div className="text-xs text-primary-200 dark:text-gray-400 high-contrast:text-gray-300">Серіктес ел</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary-500/30 dark:bg-orange-600/40 rounded-full animate-float" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/20 dark:bg-gray-600/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
