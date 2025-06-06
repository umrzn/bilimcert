'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Shield } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token || '')
    if (token && error) {
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Электрондық пошта міндетті')
      return
    }

    if (!validateEmail(email)) {
      setError('Дұрыс емес электрондық пошта форматы')
      return
    }

    if (!recaptchaToken) {
      setError('reCAPTCHA растауы міндетті')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      setIsSubmitted(true)
      toast.success('Құпия сөзді қалпына келтіру нұсқаулары жіберілді!')
    } catch (error) {
      setError('Қате орын алды. Қайталап көріңіз.')
      toast.error('Қате орын алды. Қайталап көріңіз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo1.png"
                  alt="BilimCert Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-primary-500">BilimCert</span>
            </Link>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Электрондық пошта жіберілді!
              </h2>
              <p className="text-gray-600 mb-6">
                Құпия сөзді қалпына келтіру нұсқаулары <strong>{email}</strong> мекенжайына жіберілді.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Егер хат келмесе, спам қалтасын тексеріңіз немесе бірнеше минуттан кейін қайталап көріңіз.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Кіру бетіне оралу
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo1.png"
                alt="BilimCert Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-primary-500">BilimCert</span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Құпия сөзді қалпына келтіру
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Электрондық пошта мекенжайыңызды енгізіңіз, біз сізге құпия сөзді қалпына келтіру сілтемесін жібереміз.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Электрондық пошта
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${error ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="your@email.com"
                />
              </div>
              {error && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {error}
                </div>
              )}
            </div>

            {/* reCAPTCHA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                <Shield className="w-4 h-4 inline mr-2" />
                Қауіпсіздік растауы *
              </label>
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleRecaptchaChange}
                  theme="light"
                  size="normal"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  'Сілтеме жіберу'
                )}
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Кіру бетіне оралу
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
