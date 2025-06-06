// API Configuration
export const API_CONFIG = {
  // Django backend URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/api/auth',
      REGISTER: '/api/registration',
      LOGOUT: '/api/logout',
    },
    
    // Questions
    QUESTIONS: {
      LIST: '/api/questions/',
      CREATE: '/api/questions/',
      DETAIL: (id: number) => `/api/questions/${id}`,
      VOTE: (id: number) => `/api/questions/${id}/vote`,
      CATEGORIES: '/api/questions/categories/',
      STATS: '/api/questions/stats/',
      // Admin endpoints
      ANSWER: (id: number) => `/api/questions/${id}/answer`,
      ADMIN_LIST: '/api/questions/admin/all',
    },
    
    // Email
    EMAIL: {
      SEND: '/api/email/send',
    },
    
    // Content
    CONTENT: {
      PAGES: '/api/content/pages/',
      NEWS: '/api/content/news/',
      FAQ: '/api/content/faq/',
      TESTIMONIALS: '/api/content/testimonials/',
      PARTNERS: '/api/content/partners/',
      BANNERS: '/api/content/banners/',
    }
  }
}

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// Helper function for API requests with error handling
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = buildApiUrl(endpoint)
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }
  
  try {
    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Specific API functions
export const questionsApi = {
  // Get list of questions
  list: async (params: {
    category?: string
    status?: string
    page?: number
    limit?: number
    search?: string
  } = {}) => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })
    
    const endpoint = `${API_CONFIG.ENDPOINTS.QUESTIONS.LIST}?${searchParams}`
    return apiRequest(endpoint)
  },
  
  // Create new question
  create: async (data: {
    name: string
    email: string
    subject: string
    question: string
    category: string
  }) => {
    return apiRequest(API_CONFIG.ENDPOINTS.QUESTIONS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  // Get question by ID
  get: async (id: number) => {
    return apiRequest(API_CONFIG.ENDPOINTS.QUESTIONS.DETAIL(id))
  },
  
  // Vote on question
  vote: async (id: number, helpful: boolean) => {
    return apiRequest(API_CONFIG.ENDPOINTS.QUESTIONS.VOTE(id), {
      method: 'POST',
      body: JSON.stringify({ helpful }),
    })
  },
  
  // Get categories
  getCategories: async () => {
    return apiRequest(API_CONFIG.ENDPOINTS.QUESTIONS.CATEGORIES)
  },
  
  // Get statistics
  getStats: async () => {
    return apiRequest(API_CONFIG.ENDPOINTS.QUESTIONS.STATS)
  },
}

export const authApi = {
  // Login
  login: async (username: string, password: string) => {
    return apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  },
  
  // Register
  register: async (data: {
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    phone: string
    sex: number
    auth?: boolean
  }) => {
    return apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  // Logout
  logout: async () => {
    return apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    })
  },
}

export const emailApi = {
  // Send email
  send: async (data: {
    subject: string
    message: string
    to: string
    isFiles?: boolean
    file?: File
  }) => {
    const formData = new FormData()
    formData.append('subject', data.subject)
    formData.append('message', data.message)
    formData.append('to', data.to)
    formData.append('isFiles', data.isFiles ? 'true' : 'false')
    
    if (data.file) {
      formData.append('file', data.file)
    }
    
    return apiRequest(API_CONFIG.ENDPOINTS.EMAIL.SEND, {
      method: 'POST',
      body: formData,
      headers: {}, // Don't set Content-Type for FormData
    })
  },
}
