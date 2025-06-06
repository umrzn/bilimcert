"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Dr. Aida Nazarbayeva",
      role: "Rector, Kazakh National University",
      content: "BilimCert's accreditation process helped us achieve international recognition and improve our educational standards significantly.",
      rating: 5,
      avatar: "/images/testimonials/avatar-1.jpg",
    },
    {
      name: "Prof. Murat Auezov",
      role: "Dean, Al-Farabi University",
      content: "The document recognition service is exceptional. Fast, reliable, and professionally handled with great attention to detail.",
      rating: 5,
      avatar: "/images/testimonials/avatar-2.jpg",
    },
    {
      name: "Aigerim Suleimenova",
      role: "International Student",
      content: "Thanks to BilimCert, my foreign degree was recognized quickly, allowing me to pursue my career goals in Kazakhstan.",
      rating: 5,
      avatar: "/images/testimonials/avatar-3.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#003366]/5 rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-[#FF6600]/5 rounded-tr-[70px]" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-[#003366]/20 bg-white px-3 py-1 text-sm text-[#003366] shadow-sm">
            <span className="font-medium">Testimonials</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-[#003366] sm:text-4xl md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Trusted by educational institutions and professionals across Kazakhstan
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 text-[#FF6600]/20">
                <Quote className="h-8 w-8" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FF6600] text-[#FF6600]" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#003366]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#003366] to-[#FF6600] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
