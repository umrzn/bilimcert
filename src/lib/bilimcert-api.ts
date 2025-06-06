/**
 * BilimCert API Client - Точная интеграция с Django Backend
 * Все формы используют POST /api/email/send кроме аутентификации
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Схемы согласно Django backend
export interface RegisterSchema {
  username: string
  email: string
  password: string
  auth?: boolean
  recaptcha_token: string
}

export interface LoginSchema {
  username: string
  password: string
  recaptcha_token: string
}

export interface EmailFormData {
  subject: string
  message: string
  to: string
  isFiles?: boolean
  file?: File
  recaptcha_token: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class BilimCertAPI {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        credentials: 'include', // Для Django session auth
        ...options,
        headers: {
          'X-CSRFToken': this.getCSRFToken(),
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: data.message || data.error || `HTTP ${response.status}`,
          error: data.error,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error('API Request failed:', error)
      return {
        success: false,
        message: 'Network error occurred',
      }
    }
  }

  private getCSRFToken(): string {
    // Получаем CSRF токен из cookie для Django
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'csrftoken') {
        return value
      }
    }
    return ''
  }

  // АУТЕНТИФИКАЦИЯ - отдельные endpoints
  async register(data: RegisterSchema): Promise<ApiResponse> {
    return this.request('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  async login(data: LoginSchema): Promise<ApiResponse> {
    return this.request('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/logout', {
      method: 'POST',
    })
  }

  async updateProfile(profileData: any): Promise<ApiResponse> {
    return this.request('/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
  }

  // УНИВЕРСАЛЬНАЯ ОТПРАВКА EMAIL - все формы используют этот endpoint
  async sendEmail(data: EmailFormData): Promise<ApiResponse> {
    const formData = new FormData()
    formData.append('subject', data.subject)
    formData.append('message', data.message)
    formData.append('to', data.to)
    formData.append('isFiles', data.isFiles ? 'true' : 'false')
    formData.append('recaptcha_token', data.recaptcha_token)

    if (data.file) {
      formData.append('file', data.file)
    }

    return this.request('/email/send', {
      method: 'POST',
      body: formData,
    })
  }

  // ФОРМЫ - все используют sendEmail
  async submitContactForm(formData: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Контактная форма: ${formData.subject || 'Новое сообщение'}`,
      message: `
Имя: ${formData.name}
Email: ${formData.email}
Телефон: ${formData.phone || 'Не указан'}
Сообщение: ${formData.message}
      `.trim(),
      to: 'contact@bilimcert.kz',
      isFiles: false,
      recaptcha_token: formData.recaptcha_token
    })
  }

  async submitAccreditationForm(formData: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Заявка на аккредитацию: ${formData.institutionName}`,
      message: `
Учреждение: ${formData.institutionName}
Контактное лицо: ${formData.contactPerson}
Email: ${formData.email}
Телефон: ${formData.phone}
Детали: ${formData.details}
      `.trim(),
      to: 'accreditation@bilimcert.kz',
      isFiles: !!formData.file,
      file: formData.file,
      recaptcha_token: formData.recaptcha_token
    })
  }

  async submitPartnershipForm(formData: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Заявка на партнерство: ${formData.organizationName}`,
      message: `
Организация: ${formData.organizationName}
Контактное лицо: ${formData.contactPerson}
Email: ${formData.email}
Телефон: ${formData.phone}
Предложение: ${formData.proposal}
      `.trim(),
      to: 'partnerships@bilimcert.kz',
      isFiles: !!formData.file,
      file: formData.file,
      recaptcha_token: formData.recaptcha_token
    })
  }

  async submitRecognitionForm(formData: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Заявка на признание: ${formData.applicantName}`,
      message: `
Заявитель: ${formData.applicantName}
Email: ${formData.email}
Телефон: ${formData.phone}
Детали образования: ${formData.educationDetails}
      `.trim(),
      to: 'recognition@bilimcert.kz',
      isFiles: !!formData.file,
      file: formData.file,
      recaptcha_token: formData.recaptcha_token
    })
  }

  async submitQuestionForm(formData: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Вопрос от пользователя: ${formData.name}`,
      message: `
Имя: ${formData.name}
Email: ${formData.email}
Вопрос: ${formData.question}
      `.trim(),
      to: 'questions@bilimcert.kz',
      isFiles: false,
      recaptcha_token: formData.recaptcha_token
    })
  }

  // ПОЛУЧЕНИЕ ВОПРОСОВ - специальный endpoint
  async getPublicQuestions(params?: any): Promise<ApiResponse> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request(`/forms/questions/public${queryString}`)
  }

  // АДМИН ENDPOINTS
  async getAdminStats(): Promise<ApiResponse> {
    return this.request('/admin/stats')
  }

  async getSubmissions(params?: any): Promise<ApiResponse> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request(`/admin/submissions${queryString}`)
  }

  async updateSubmissionStatus(id: string, status: string): Promise<ApiResponse> {
    return this.request(`/admin/submissions/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
  }
}

// Экспорт singleton instance
export const bilimcertAPI = new BilimCertAPI()

// Экспорт класса для кастомных инстансов
export { BilimCertAPI }
