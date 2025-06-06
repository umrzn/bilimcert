"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PartnersSection() {
  const partners = [
    { name: "ENQA", logo: "/images/partners/enqa.png" },
    { name: "UNESCO", logo: "/images/partners/unesco.png" },
    { name: "Bologna Process", logo: "/images/partners/bologna.png" },
    { name: "ENIC-NARIC", logo: "/images/partners/enic-naric.png" },
    { name: "KazNU", logo: "/images/partners/kaznu.png" },
    { name: "ATU", logo: "/images/partners/atu.png" },
    { name: "Nazarbayev University", logo: "/images/partners/nu.png" },
    { name: "Ministry of Education", logo: "/images/partners/mon.png" },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-[#003366]/20 bg-white px-3 py-1 text-sm text-[#003366] shadow-sm">
            <span className="font-medium">Our Partners</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-[#003366] sm:text-4xl">
              Trusted by Leading Organizations
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We collaborate with international and national educational institutions and quality assurance agencies
            </p>
          </div>
        </motion.div>

        <div className="mt-12 relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex space-x-16 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex min-w-[180px] items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-12 w-32">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[#003366] mb-2">50+</div>
            <div className="text-sm text-gray-600">Partner Universities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#003366] mb-2">1000+</div>
            <div className="text-sm text-gray-600">Documents Recognized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#003366] mb-2">25+</div>
            <div className="text-sm text-gray-600">Accredited Institutions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#003366] mb-2">15+</div>
            <div className="text-sm text-gray-600">Years of Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
