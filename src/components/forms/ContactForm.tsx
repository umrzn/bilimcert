'use client'

import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle, Shield } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { bilimcertAPI } from '@/lib/bilimcert-api'

import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Аты-жөні кем дегенде 2 таңбадан тұруы керек'),
  email: z.string().email('Дұрыс email мекенжайын енгізіңіз'),
  phone: z.string().min(10, 'Телефон нөмірі дұрыс емес'),
  subject: z.string().min(5, 'Тақырып кем дегенде 5 таңбадан тұруы керек'),
  message: z.string().min(20, 'Хабарлама кем дегенде 20 таңбадан тұруы керек'),
  department: z.string().optional(),
  recaptcha_token: z.string().min(1, 'reCAPTCHA растауы міндетті')
})

type ContactFormData = z.infer<typeof contactSchema>

const subjects = [
  'Аккредитация туралы сұрақ',
  'Дипломды тану',
  'Болонья процесі',
  'Техникалық қолдау',
  'Серіктестік',
  'Басқа'
]

const departments = [
  { value: 'general', label: 'Жалпы сұрақтар' },
  { value: 'accreditation', label: 'Аккредитация бөлімі' },
  { value: 'recognition', label: 'Дипломды тану бөлімі' },
  { value: 'international', label: 'Халықаралық байланыс' },
  { value: 'quality', label: 'Сапа менеджменті' },
  { value: 'support', label: 'Техникалық қолдау' }
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      department: 'general',
      recaptcha_token: ''
    }
  })

  const watchedMessage = watch('message')

  const handleRecaptchaChange = (token: string | null) => {
    setValue('recaptcha_token', token || '')
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Отправляем через BilimCert API
      const response = await bilimcertAPI.submitContactForm(data)

      if (response.success) {
        setSubmitStatus('success')
        toast.success('Хабарлама сәтті жіберілді!')
        reset()
        // Сбрасываем reCAPTCHA
        recaptchaRef.current?.reset()
      } else {
        setSubmitStatus('error')
        toast.error(response.message || 'Хабарлама жіберуде қате орын алды')
      }

    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
      toast.error('Хабарлама жіберуде қате орын алды')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
          Хабарлама жіберілді!
        </h3>
        <p className="text-green-700 dark:text-green-200 mb-6">
          Сіздің хабарламаңыз сәтті жіберілді. Біз 24 сағат ішінде жауап береміз.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          Жаңа хабарлама жазу
        </button>
      </motion.div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Толық аты-жөні *
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Аты-жөніңізді енгізіңіз"
                />
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email мекенжайы *
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="email@example.com"
                />
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Телефон нөмірі *
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="+7 (___) ___-__-__"
                />
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Бөлім
            </label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {departments.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Тақырып *
          </label>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Тақырыпты таңдаңыз</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Хабарлама *
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Сіздің сұрағыңыз немесе хабарламаңызды жазыңыз..."
              />
            )}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
              {watchedMessage?.length || 0} / 20 минимум
            </span>
          </div>
        </div>

        {/* reCAPTCHA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Shield className="w-4 h-4 inline mr-2" />
            Қауіпсіздік растауы *
          </label>
          <div className="flex justify-center">
            <Controller
              name="recaptcha_token"
              control={control}
              render={({ field }) => (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleRecaptchaChange}
                  theme="light"
                  size="normal"
                />
              )}
            />
          </div>
          {errors.recaptcha_token && (
            <p className="mt-2 text-sm text-red-600 text-center">{errors.recaptcha_token.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Жіберілуде...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Хабарлама жіберу
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 dark:text-red-200 text-sm">
                Хабарлама жіберуде қате орын алды. Қайталап көріңіз немесе телефон арқылы байланысыңыз.
              </p>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  )
}
