'use client'

import { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

interface Step {
  id: number
  key: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  optional?: boolean
}

interface MultiStepFormProps {
  steps: Step[]
  currentStep: number
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  isSubmitting?: boolean
  submitText?: string
  nextText?: string
  previousText?: string
  children: ReactNode
  skipSteps?: number[]
}

export function MultiStepForm({
  steps,
  currentStep,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
  submitText = 'Submit',
  nextText = 'Next',
  previousText = 'Previous',
  children,
  skipSteps = []
}: MultiStepFormProps) {
  const visibleSteps = steps.filter(step => !skipSteps.includes(step.id))
  const isLastStep = currentStep === Math.max(...visibleSteps.map(s => s.id))

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {visibleSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : isActive
                      ? 'bg-[#003366] border-[#003366] text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>

                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${isActive ? 'text-[#003366]' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                    {step.title}
                    {step.optional && (
                      <span className="text-xs text-gray-400 ml-1">(Optional)</span>
                    )}
                  </p>
                </div>

                {index < visibleSteps.length - 1 && (
                  <div className={`hidden md:block w-16 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6 md:p-8">
          {children}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className={`flex items-center px-6 py-2 rounded-md font-medium ${!canGoPrevious
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {previousText}
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext || isSubmitting}
              className="flex items-center px-6 py-2 bg-[#003366] text-white rounded-md font-medium hover:bg-[#004080] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastStep ? (
                isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  submitText
                )
              ) : (
                <>
                  {nextText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step content wrapper component
interface StepContentProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function StepContent({ title, subtitle, children }: StepContentProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#003366] mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

// Form field wrapper component
interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({ label, required = false, error, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

// Form grid wrapper
interface FormGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3
}

export function FormGrid({ children, columns = 2 }: FormGridProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[columns]

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {children}
    </div>
  )
}

// Review section component
interface ReviewSectionProps {
  title: string
  children: ReactNode
}

export function ReviewSection({ title, children }: ReviewSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}

// Review item component
interface ReviewItemProps {
  label: string
  value: string | ReactNode
  fullWidth?: boolean
}

export function ReviewItem({ label, value, fullWidth = false }: ReviewItemProps) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="ml-2 text-gray-900">{value}</span>
    </div>
  )
}

// Declaration component
interface DeclarationProps {
  checked: boolean
  onChange: (checked: boolean) => void
  text: string
  error?: string
  id?: string
}

export function Declaration({ checked, onChange, text, error, id = 'declaration' }: DeclarationProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
        />
        <label htmlFor={id} className="ml-3 text-sm text-gray-700">
          {text}
        </label>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
