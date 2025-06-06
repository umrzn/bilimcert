'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { TranslatedText } from '../ui/TranslatedText'

interface Testimonial {
  id: number
  name: string
  position: string
  organization: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Айгүл Нұрланова',
    position: 'Магистрант',
    organization: 'Назарбаев Университеті',
    content: 'BilimCert арқылы шетелдік дипломымды тану процесі өте жылдам және ыңғайлы болды. Барлық қызметкерлер кәсіби және көмекші.',
    rating: 5,
    avatar: '/images/testimonials/avatar-1.jpg'
  },
  {
    id: 2,
    name: 'Ерлан Қасымов',
    position: 'Ректор орынбасары',
    organization: 'Қазақ Ұлттық Университеті',
    content: 'Біздің университеттің аккредитация процесі BilimCert мамандарының арқасында сәтті өтті. Олардың кәсібилігі мен тәжірибесі таңғажайып.',
    rating: 5,
    avatar: '/images/testimonials/avatar-2.jpg'
  },
  {
    id: 3,
    name: 'Мария Петрова',
    position: 'Халықаралық студент',
    organization: 'Алматы Технологиялық Университеті',
    content: 'Ресейлік дипломымды Қазақстанда тану үшін BilimCert-ке жүгіндім. Процесс ашық, түсінікті және уақытылы болды.',
    rating: 4,
    avatar: '/images/testimonials/avatar-3.jpg'
  }
]

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-primary-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <TranslatedText textKey="home.testimonials" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Біздің клиенттер біз туралы не дейді
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 transition-colors duration-200">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-primary-200 dark:text-primary-400">
              <Quote className="w-12 h-12" />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-6 right-6 flex space-x-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Testimonial Content */}
            <div className="pt-8">
              <div className="flex items-center mb-6">
                {renderStars(currentTestimonial.rating)}
              </div>

              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="flex items-center">
                <div className="relative w-16 h-16 mr-4">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {currentTestimonial.position}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentTestimonial.organization}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ${index === currentIndex ? 'bg-primary-500 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
