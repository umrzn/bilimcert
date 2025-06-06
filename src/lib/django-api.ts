/**
 * Django Backend API Integration
 * Handles all communication with Django REST API according to your schemas
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Django API Schemas
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

export interface EmailSchema {
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
  errors?: Record<string, string[]>
}

export interface DjangoUser {
  id: string
  username: string
  email: string
  first_name?: string
  last_name?: string
  is_staff: boolean
  is_superuser: boolean
  is_active: boolean
  date_joined: string
  last_login?: string
  phone_number?: string
  organization?: string
  position?: string
  preferred_language?: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user: DjangoUser
}

class DjangoApiClient {
  private baseURL: string
  private accessToken: string | null = null
  private refreshToken: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL

    // Load tokens from localStorage on client side
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken')
      this.refreshToken = localStorage.getItem('refreshToken')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    // Add authorization header if token exists
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      // Handle token refresh if needed
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          // Retry the original request with new token
          headers['Authorization'] = `Bearer ${this.accessToken}`
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          })
          return this.handleResponse<T>(retryResponse)
        }
      }

      return this.handleResponse<T>(response)
    } catch (error) {
      console.error('API Request failed:', error)
      return {
        success: false,
        message: 'Network error occurred',
      }
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: data.detail || data.message || `HTTP ${response.status}`,
          errors: data.errors,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to parse response',
      }
    }
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false

    try {
      const response = await fetch(`${this.baseURL}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: this.refreshToken,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        this.accessToken = data.access
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.access)
        }
        return true
      } else {
        // Refresh token is invalid, clear tokens
        this.clearTokens()
        return false
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      this.clearTokens()
      return false
    }
  }

  private clearTokens() {
    this.accessToken = null
    this.refreshToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  // Authentication endpoints (separate from email/send)
  async register(data: RegisterSchema): Promise<ApiResponse<any>> {
    return this.request('/registration', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: LoginSchema): Promise<ApiResponse<any>> {
    const response = await this.request('/auth', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    // Django uses session-based auth, no tokens to store
    return response
  }

  async logout(): Promise<void> {
    try {
      await this.request('/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout request failed:', error)
    }
    this.clearTokens()
  }

  async getProfile(): Promise<ApiResponse<DjangoUser>> {
    // Django session-based auth - profile endpoint would need to be implemented
    return this.request('/profile/')
  }

  async updateProfile(data: Partial<DjangoUser>): Promise<ApiResponse<DjangoUser>> {
    return this.request('/profile/', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Email sending endpoint
  async sendEmail(data: EmailSchema): Promise<ApiResponse> {
    const formData = new FormData()
    formData.append('subject', data.subject)
    formData.append('message', data.message)
    formData.append('to', data.to)
    formData.append('isFiles', data.isFiles ? 'true' : 'false')
    formData.append('recaptcha_token', data.recaptcha_token)

    if (data.file) {
      formData.append('file', data.file)
    }

    const url = `${this.baseURL}/email/send/`
    const headers: Record<string, string> = {}

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      })

      return this.handleResponse(response)
    } catch (error) {
      console.error('Email send failed:', error)
      return {
        success: false,
        message: 'Failed to send email',
      }
    }
  }

  // Form submissions - все формы используют email/send кроме auth
  async submitContactForm(data: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Contact Form: ${data.subject}`,
      message: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nMessage: ${data.message}`,
      to: 'contact@bilimcert.kz',
      isFiles: false,
      recaptcha_token: data.recaptcha_token
    })
  }

  async submitAccreditationForm(data: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Accreditation Application: ${data.institutionName}`,
      message: `Institution: ${data.institutionName}\nContact: ${data.contactPerson}\nEmail: ${data.email}\nPhone: ${data.phone}\nDetails: ${data.details}`,
      to: 'accreditation@bilimcert.kz',
      isFiles: !!data.file,
      file: data.file,
      recaptcha_token: data.recaptcha_token
    })
  }

  async submitPartnershipForm(data: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Partnership Application: ${data.organizationName}`,
      message: `Organization: ${data.organizationName}\nContact: ${data.contactPerson}\nEmail: ${data.email}\nPhone: ${data.phone}\nProposal: ${data.proposal}`,
      to: 'partnerships@bilimcert.kz',
      isFiles: !!data.file,
      file: data.file,
      recaptcha_token: data.recaptcha_token
    })
  }

  async submitRecognitionForm(data: any): Promise<ApiResponse> {
    return this.sendEmail({
      subject: `Recognition Application: ${data.applicantName}`,
      message: `Applicant: ${data.applicantName}\nEmail: ${data.email}\nPhone: ${data.phone}\nEducation Details: ${data.educationDetails}`,
      to: 'recognition@bilimcert.kz',
      isFiles: !!data.file,
      file: data.file,
      recaptcha_token: data.recaptcha_token
    })
  }

  // Questions - используют специальные endpoints
  async getQuestions(params?: any): Promise<ApiResponse> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request(`/forms/questions/public${queryString}`)
  }

  async submitQuestion(data: any): Promise<ApiResponse> {
    return this.request('/forms/questions', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Admin endpoints
  async getAdminStats(): Promise<ApiResponse> {
    return this.request('/admin/stats/')
  }

  async getSubmissions(params?: any): Promise<ApiResponse> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request(`/admin/submissions/${queryString}`)
  }

  async updateSubmissionStatus(id: string, status: string): Promise<ApiResponse> {
    return this.request(`/admin/submissions/${id}/status/`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  // Set tokens manually (for SSR or other scenarios)
  setTokens(accessToken: string | null, refreshToken: string | null) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  getTokens(): { accessToken: string | null; refreshToken: string | null } {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    }
  }
}

// Export singleton instance
export const djangoApi = new DjangoApiClient()

// Export class for custom instances if needed
export { DjangoApiClient }
