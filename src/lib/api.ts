import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // Add language header
    if (typeof window !== 'undefined') {
      const language = localStorage.getItem('preferredLanguage') || 'kz'
      config.headers['Accept-Language'] = language
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken
          })

          const { access } = response.data
          localStorage.setItem('accessToken', access)

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${access}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/auth/login'
        }
      }
    }

    return Promise.reject(error)
  }
)

// API Methods
export const apiClient = {
  // Generic methods
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.get(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.post(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.put(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.patch(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.delete(url, config),

  // Auth methods
  auth: {
    login: (credentials: {
      username: string
      password: string
      recaptcha_token: string
    }) => api.post('/auth/login/', credentials),

    register: (userData: {
      username: string
      email: string
      password: string
      auth?: boolean
      recaptcha_token: string
    }) => api.post('/auth/register/', userData),

    logout: (refreshToken?: string) =>
      api.post('/auth/logout/', { refresh_token: refreshToken }),

    refresh: (refreshToken: string) =>
      api.post('/auth/refresh/', { refresh: refreshToken }),

    profile: () => api.get('/auth/users/profile/'),

    updateProfile: (data: any) => api.put('/auth/users/profile/', data),

    changePassword: (data: {
      old_password: string
      new_password: string
      new_password_confirm: string
    }) => api.put('/auth/users/change_password/', data),
  },

  // Core methods
  core: {
    getConfig: () => api.get('/config/'),

    healthCheck: () => api.get('/health/'),

    contact: (data: {
      name: string
      email: string
      phone?: string
      subject: string
      message: string
    }) => api.post('/contact/', data),
  },

  // Content methods
  content: {
    getPages: (params?: any) => api.get('/content/pages/', { params }),

    getPage: (slug: string) => api.get(`/content/pages/${slug}/`),

    getFAQs: (params?: any) => api.get('/content/faqs/', { params }),

    getBanners: (params?: any) => api.get('/content/banners/', { params }),

    getTestimonials: (params?: any) => api.get('/content/testimonials/', { params }),

    getPartners: (params?: any) => api.get('/content/partners/', { params }),
  },

  // News methods
  news: {
    getNews: (params?: any) => api.get('/news/', { params }),

    getNewsItem: (slug: string) => api.get(`/news/${slug}/`),

    getCategories: () => api.get('/news/categories/'),
  },

  // Email sending
  email: {
    send: (emailData: {
      subject: string
      message: string
      to: string
      isFiles?: boolean
      file?: File
      recaptcha_token: string
    }) => {
      const formData = new FormData()
      formData.append('subject', emailData.subject)
      formData.append('message', emailData.message)
      formData.append('to', emailData.to)
      formData.append('isFiles', emailData.isFiles ? 'true' : 'false')
      formData.append('recaptcha_token', emailData.recaptcha_token)

      if (emailData.file) {
        formData.append('file', emailData.file)
      }

      return api.post('/email/send/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  },

  // Forms
  forms: {
    // Accreditation application
    submitAccreditation: (data: any) => api.post('/forms/accreditation/', data),

    // Partnership application
    submitPartnership: (data: any) => api.post('/forms/partnership/', data),

    // Recognition application
    submitRecognition: (data: any) => api.post('/forms/recognition/', data),

    // Contact form
    submitContact: (data: any) => api.post('/forms/contact/', data),

    // Question form
    submitQuestion: (data: any) => api.post('/forms/question/', data),

    // Get questions
    getQuestions: (params?: any) => api.get('/forms/questions/', { params }),
  },

  // File upload
  files: {
    upload: (file: File, data?: any) => {
      const formData = new FormData()
      formData.append('file', file)

      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key])
        })
      }

      return api.post('/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },

    getFiles: (params?: any) => api.get('/files/', { params }),

    deleteFile: (id: number) => api.delete(`/files/${id}/`),
  },
}

// Error handling utility
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response

    switch (status) {
      case 400:
        return {
          message: 'Дұрыс емес деректер жіберілді',
          details: data,
        }
      case 401:
        return {
          message: 'Авторизация қажет',
          details: data,
        }
      case 403:
        return {
          message: 'Қол жеткізу құқығы жоқ',
          details: data,
        }
      case 404:
        return {
          message: 'Ресурс табылмады',
          details: data,
        }
      case 500:
        return {
          message: 'Сервер қатесі',
          details: data,
        }
      default:
        return {
          message: 'Белгісіз қате орын алды',
          details: data,
        }
    }
  } else if (error.request) {
    // Network error
    return {
      message: 'Желі қатесі. Интернет байланысын тексеріңіз.',
      details: null,
    }
  } else {
    // Other error
    return {
      message: error.message || 'Белгісіз қате орын алды',
      details: null,
    }
  }
}

export default api
