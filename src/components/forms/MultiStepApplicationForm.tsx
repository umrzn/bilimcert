'use client'

import { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  X,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { Progress } from '@/components/ui/progress'
import toast from 'react-hot-toast'

// Form validation schema
const applicationSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, 'Аты-жөні кем дегенде 2 таңбадан тұруы керек'),
  email: z.string().email('Дұрыс email мекенжайын енгізіңіз'),
  phone: z.string().min(10, 'Телефон нөмірі дұрыс емес'),
  dateOfBirth: z.string().min(1, 'Туған күнді таңдаңыз'),

  // Step 2: Application Details
  applicationType: z.enum(['student', 'university', 'employer'], {
    required_error: 'Өтініш түрін таңдаңыз'
  }),
  institution: z.string().min(2, 'Мекеме атауын енгізіңіз'),
  position: z.string().optional(),
  experience: z.string().optional(),

  // Step 3: Motivation and Goals
  motivation: z.string().min(100, 'Мотивациялық хат кем дегенде 100 таңбадан тұруы керек'),
  goals: z.string().min(50, 'Мақсаттарыңызды жазыңыз'),

  // Step 4: Documents and Verification
  documents: z.array(z.any()).min(1, 'Кем дегенде бір құжат жүктеңіз'),
  termsAccepted: z.boolean().refine(val => val === true, 'Шарттарды қабылдау керек'),
  recaptcha: z.string().min(1, 'reCAPTCHA тексерісін өтіңіз')
})

type ApplicationFormData = z.infer<typeof applicationSchema>

interface FileWithPreview extends File {
  preview?: string
}

const steps = [
  { id: 1, title: 'Жеке мәліметтер', icon: User },
  { id: 2, title: 'Өтініш мәліметтері', icon: FileText },
  { id: 3, title: 'Мотивация', icon: Mail },
  { id: 4, title: 'Құжаттар', icon: Upload }
]

export function MultiStepApplicationForm() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
    watch
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange',
    defaultValues: {
      documents: [],
      termsAccepted: false
    }
  })

  const watchedValues = watch()

  // File upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    )

    setUploadedFiles(prev => [...prev, ...filesWithPreview])
    setValue('documents', [...uploadedFiles, ...filesWithPreview])
  }, [uploadedFiles, setValue])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true
  })

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    setValue('documents', newFiles)
  }

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isStepValid = await trigger(fieldsToValidate)

    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const getFieldsForStep = (step: number): (keyof ApplicationFormData)[] => {
    switch (step) {
      case 1:
        return ['fullName', 'email', 'phone', 'dateOfBirth']
      case 2:
        return ['applicationType', 'institution']
      case 3:
        return ['motivation', 'goals']
      case 4:
        return ['documents', 'termsAccepted', 'recaptcha']
      default:
        return []
    }
  }

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()

      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'documents') {
          uploadedFiles.forEach((file, index) => {
            formData.append(`documents[${index}]`, file)
          })
        } else if (typeof value === 'string' || typeof value === 'boolean') {
          formData.append(key, value.toString())
        }
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In real implementation, send to backend:
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   body: formData
      // })

      toast.success('Өтініш сәтті жіберілді!')

      // Reset form or redirect
      setCurrentStep(1)
      setUploadedFiles([])

    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Өтініш жіберуде қате орын алды')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            <TranslatedText textKey="application.title" />
          </h2>
          <span className="text-primary-100">
            {currentStep} / {steps.length}
          </span>
        </div>

        <Progress value={progress} className="h-2 bg-primary-400" />

        <div className="flex justify-between mt-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 ${step.id <= currentStep ? 'text-white' : 'text-primary-200'
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step.id <= currentStep ? 'bg-white text-primary-500' : 'bg-primary-400'
                  }`}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              <span className="text-sm font-medium hidden md:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Жеке мәліметтер
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Толық аты-жөні *
                    </label>
                    <Controller
                      name="fullName"
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
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
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
                      Туған күні *
                    </label>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      )}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Application Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Өтініш мәліметтері
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Өтініш түрі *
                  </label>
                  <Controller
                    name="applicationType"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'student', label: 'Студент', desc: 'Мансап дамыту бағдарламалары' },
                          { value: 'university', label: 'Университет', desc: 'Академиялық серіктестік' },
                          { value: 'employer', label: 'Жұмыс беруші', desc: 'Корпоративтік серіктестік' }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${field.value === option.value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                              }`}
                          >
                            <input
                              type="radio"
                              {...field}
                              value={option.value}
                              checked={field.value === option.value}
                              className="sr-only"
                            />
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {option.label}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {option.desc}
                            </span>
                            {field.value === option.value && (
                              <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-primary-500" />
                            )}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                  {errors.applicationType && (
                    <p className="mt-1 text-sm text-red-600">{errors.applicationType.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Мекеме/Ұйым атауы *
                    </label>
                    <Controller
                      name="institution"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Мекеме атауын енгізіңіз"
                        />
                      )}
                    />
                    {errors.institution && (
                      <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Лауазымы/Мамандығы
                    </label>
                    <Controller
                      name="position"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Лауазымыңызды енгізіңіз"
                        />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Жұмыс тәжірибесі
                  </label>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Жұмыс тәжірибеңіз туралы қысқаша жазыңыз..."
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Motivation and Goals */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Мотивация және мақсаттар
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Мотивациялық хат *
                  </label>
                  <Controller
                    name="motivation"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Неліктен біздің бағдарламаға қатысқыңыз келетінін жазыңыз. Сіздің мотивацияңыз, мақсаттарыңыз және күтулеріңіз туралы толық ақпарат беріңіз..."
                      />
                    )}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.motivation && (
                      <p className="text-sm text-red-600">{errors.motivation.message}</p>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {watchedValues.motivation?.length || 0} / 100 минимум
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Мақсаттар мен күтулер *
                  </label>
                  <Controller
                    name="goals"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Бағдарламадан не алуды күтесіз? Қандай мақсаттарға жетуді жоспарлап отырсыз?"
                      />
                    )}
                  />
                  {errors.goals && (
                    <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Кеңес</h4>
                      <p className="text-blue-700 dark:text-blue-200 text-sm">
                        Мотивациялық хатыңызда нақты мысалдар келтіріңіз және сіздің жеке тәжірибеңізді бөлісіңіз.
                        Бұл сіздің өтінішіңізді күшейтеді.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Documents and Verification */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Құжаттар және растау
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Құжаттарды жүктеу *
                  </label>

                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                      }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    {isDragActive ? (
                      <p className="text-primary-600 dark:text-primary-400">
                        Файлдарды осы жерге тастаңыз...
                      </p>
                    ) : (
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          Файлдарды тартып апарыңыз немесе <span className="text-primary-500 font-semibold">таңдаңыз</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          PDF, JPG, PNG (максимум 5MB әрқайсысы)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Жүктелген файлдар ({uploadedFiles.length})
                      </h4>
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.documents && (
                    <p className="mt-1 text-sm text-red-600">{errors.documents.message}</p>
                  )}
                </div>

                {/* reCAPTCHA */}
                <div>
                  <Controller
                    name="recaptcha"
                    control={control}
                    render={({ field }) => (
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={field.onChange}
                        theme="light"
                      />
                    )}
                  />
                  {errors.recaptcha && (
                    <p className="mt-1 text-sm text-red-600">{errors.recaptcha.message}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div>
                  <Controller
                    name="termsAccepted"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 mt-1"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Мен{' '}
                          <a href="/privacy" className="text-primary-500 hover:underline" target="_blank">
                            құпиялылық саясатымен
                          </a>{' '}
                          және{' '}
                          <a href="/terms" className="text-primary-500 hover:underline" target="_blank">
                            қызмет көрсету шарттарымен
                          </a>{' '}
                          келісемін *
                        </span>
                      </label>
                    )}
                  />
                  {errors.termsAccepted && (
                    <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Артқа
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
            >
              Келесі
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Жіберілуде...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Өтініш жіберу
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
