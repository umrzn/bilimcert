'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { ContactForm } from '@/components/forms/ContactForm'
import { IframeYandexMap } from '@/components/ui/SimpleYandexMap'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Building } from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactsPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Байланыс', translationKey: 'header.contacts' }
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Мекенжай',
      content: 'г. Нур-Султан, ул. Мәңгілік Ел, 8',
      details: 'БЦ "Нұр Алем", 15-қабат',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Телефон',
      content: '+7 (7172) 12-34-56',
      details: 'Жұмыс уақытында',
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Электрондық пошта',
      content: 'info@bilimcert.kz',
      details: '24 сағат ішінде жауап береміз',
      color: 'bg-purple-500'
    },
    {
      icon: Clock,
      title: 'Жұмыс уақыты',
      content: 'Дүйсенбі - Жұма: 9:00 - 18:00',
      details: 'Сенбі - Жексенбі: демалыс',
      color: 'bg-orange-500'
    }
  ]

  const departments = [
    {
      icon: Users,
      title: 'Аккредитация бөлімі',
      phone: '+7 (7172) 12-34-57',
      email: 'accreditation@bilimcert.kz',
      description: 'Білім беру бағдарламаларын аккредиттеу'
    },
    {
      icon: Building,
      title: 'Тану бөлімі',
      phone: '+7 (7172) 12-34-58',
      email: 'recognition@bilimcert.kz',
      description: 'Шетелдік дипломдарды тану'
    },
    {
      icon: MessageCircle,
      title: 'Техникалық қолдау',
      phone: '+7 (7172) 12-34-59',
      email: 'support@bilimcert.kz',
      description: 'Техникалық сұрақтар бойынша'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })

      toast.success('Хабарламаңыз сәтті жіберілді!')
    } catch (error) {
      toast.error('Хабарлама жіберу кезінде қате орын алды')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            <TranslatedText textKey="contact.title" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Бізбен байланысыңыз. Біз сізге көмектесуге дайынбыз
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            <TranslatedText textKey="contact.info" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className={`${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                  {info.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {info.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Бөлімдер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 dark:bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <dept.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {dept.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {dept.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-200">
                    <Phone className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                    <a href={`tel:${dept.phone}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-200">
                    <Mail className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                    <a href={`mailto:${dept.email}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {dept.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Бізге хат жазыңыз
            </h3>
            <ContactForm />
          </div>

          {/* Map */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Біздің орналасқан жеріміз
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <IframeYandexMap height="400px" className="w-full" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
              <h4 className="font-semibold text-primary-900 mb-3">
                Қосымша ақпарат
              </h4>
              <ul className="space-y-2 text-sm text-primary-800">
                <li>• Жақын жердегі автобус аялдамасы: "Мәңгілік Ел"</li>
                <li>• Метро станциясы: "Сарыарқа" (500м)</li>
                <li>• Автотұрақ: ғимарат астында</li>
                <li>• Мүгедектер үшін қолжетімді</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Жедел байланыс
          </h2>
          <p className="text-primary-100 mb-6 max-w-md mx-auto">
            Шұғыл сұрақтарыңыз бар ма? Бізге тікелей қоңырау шалыңыз
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+77172123456"
              className="inline-flex items-center px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              +7 (7172) 12-34-56
            </a>
            <a
              href="mailto:info@bilimcert.kz"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              info@bilimcert.kz
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
