'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
  type: 'university' | 'government' | 'international' | 'private'
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'Назарбаев Университеті',
    logo: '/images/partners/nu.png',
    website: 'https://nu.edu.kz',
    type: 'university'
  },
  {
    id: 2,
    name: 'Қазақ Ұлттық Университеті',
    logo: '/images/partners/kaznu.png',
    website: 'https://kaznu.kz',
    type: 'university'
  },
  {
    id: 3,
    name: 'Алматы Технологиялық Университеті',
    logo: '/images/partners/atu.png',
    website: 'https://atu.edu.kz',
    type: 'university'
  },
  {
    id: 4,
    name: 'Білім және ғылым министрлігі',
    logo: '/images/partners/mon.png',
    website: 'https://edu.gov.kz',
    type: 'government'
  },
  {
    id: 5,
    name: 'ENQA',
    logo: '/images/partners/enqa.png',
    website: 'https://enqa.eu',
    type: 'international'
  },
  {
    id: 6,
    name: 'UNESCO',
    logo: '/images/partners/unesco.png',
    website: 'https://unesco.org',
    type: 'international'
  },
  {
    id: 7,
    name: 'Болон секретариаты',
    logo: '/images/partners/bologna.png',
    website: 'https://ehea.info',
    type: 'international'
  },
  {
    id: 8,
    name: 'ENIC-NARIC',
    logo: '/images/partners/enic-naric.png',
    website: 'https://enic-naric.net',
    type: 'international'
  }
]

export function PartnersSection() {
  const partnersByType = {
    university: partners.filter(p => p.type === 'university'),
    government: partners.filter(p => p.type === 'government'),
    international: partners.filter(p => p.type === 'international'),
    private: partners.filter(p => p.type === 'private')
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <TranslatedText textKey="home.partners" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Біз әлемдегі жетекші білім беру ұйымдары мен халықаралық ұйымдармен серіктестікте жұмыс істейміз
          </p>
        </div>

        {/* International Partners */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Халықаралық серіктестер
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnersByType.international.map((partner) => (
              <div
                key={partner.id}
                className="group bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400"
              >
                {partner.website ? (
                  <Link
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative h-16 mb-4">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {partner.name}
                    </h4>
                  </Link>
                ) : (
                  <>
                    <div className="relative h-16 mb-4">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
                      {partner.name}
                    </h4>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Local Partners */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Жергілікті серіктестер
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...partnersByType.university, ...partnersByType.government].map((partner) => (
              <div
                key={partner.id}
                className="group bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400"
              >
                {partner.website ? (
                  <Link
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative h-16 mb-4">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {partner.name}
                    </h4>
                  </Link>
                ) : (
                  <>
                    <div className="relative h-16 mb-4">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
                      {partner.name}
                    </h4>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-600 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Серіктес болғыңыз келе ме?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Біз жаңа серіктестіктерге ашықпыз. Егер сіз білім беру саласында жұмыс істесеңіз, бізбен байланысыңыз.
          </p>
          <Link
            href="/partnership/application"
            className="inline-flex items-center px-8 py-3 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-700"
          >
            Серіктестік өтініші
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
