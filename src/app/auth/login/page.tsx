'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Shield } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { TranslatedText } from '@/components/ui/TranslatedText'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'

interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
  recaptchaToken: string
}

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated, isLoading } = useAuth()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: '',
    rememberMe: false,
    recaptchaToken: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = searchParams.get('redirect') || '/'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {}

    if (!formData.username) {
      newErrors.username = 'Пайдаланушы аты міндетті'
    }

    if (!formData.password) {
      newErrors.password = 'Құпия сөз міндетті'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Құпия сөз кемінде 6 таңбадан тұруы керек'
    }

    if (!formData.recaptchaToken) {
      newErrors.recaptchaToken = 'reCAPTCHA растауы міндетті'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof LoginForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleRecaptchaChange = (token: string | null) => {
    setFormData(prev => ({
      ...prev,
      recaptchaToken: token || ''
    }))

    // Clear error when reCAPTCHA is completed
    if (errors.recaptchaToken) {
      setErrors(prev => ({
        ...prev,
        recaptchaToken: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const success = await login(formData.username, formData.password, formData.recaptchaToken)

      if (success) {
        router.push(redirectTo)
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-16 h-16">
              <Image
                src="/images/logo1.png"
                alt="BilimCert Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-primary-500 dark:text-primary-400">BilimCert</span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          <TranslatedText textKey="auth.signIn" />
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          <TranslatedText textKey="auth.noAccount" />{' '}
          <Link
            href="/auth/register"
            className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200"
          >
            <TranslatedText textKey="auth.signUp" />
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <TranslatedText textKey="forms.email" />
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 sm:text-sm transition-colors duration-200 ${errors.username ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  placeholder="Пайдаланушы аты"
                />
              </div>
              {errors.username && (
                <div className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.username}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                <TranslatedText textKey="forms.password" />
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  <TranslatedText textKey="auth.rememberMe" />
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  <TranslatedText textKey="auth.forgotPassword" />
                </Link>
              </div>
            </div>

            {/* reCAPTCHA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
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
              {errors.recaptchaToken && (
                <div className="mt-2 flex items-center justify-center text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.recaptchaToken}
                </div>
              )}
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
                  <>
                    <TranslatedText textKey="auth.signIn" />
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  <TranslatedText textKey="auth.orContinueWith" />
                </span>
              </div>
            </div>

            {/* Social Login Placeholder */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                <TranslatedText textKey="auth.socialLoginComingSoon" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}
