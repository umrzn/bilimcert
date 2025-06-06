// Common types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  status: number
}

export interface PaginatedResponse<T = any> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone_number?: string
  organization?: string
  position?: string
  preferred_language: 'kz' | 'ru' | 'en'
  accessibility_settings: AccessibilitySettings
  date_joined: string
  last_login?: string
  is_active: boolean
}

export interface AccessibilitySettings {
  high_contrast_mode?: boolean
  font_size?: number
  motion_reduced?: boolean
  text_spacing?: number
  color_blind_mode?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
}

// Content types
export interface Page {
  id: number
  slug: string
  title_kz: string
  title_ru: string
  title_en: string
  content_kz: string
  content_ru: string
  content_en: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  og_title?: string
  og_description?: string
  og_image?: string
  template: string
  show_in_menu: boolean
  menu_order: number
  parent?: number
  author?: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: number
  title_kz: string
  title_ru: string
  title_en: string
  content_kz: string
  content_ru: string
  content_en: string
  category: 'general' | 'accreditation' | 'recognition' | 'bologna' | 'applications' | 'technical'
  order: number
  views_count: number
  helpful_votes: number
  not_helpful_votes: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  title_kz: string
  title_ru: string
  title_en: string
  content_kz: string
  content_ru: string
  content_en: string
  author_name: string
  author_position: string
  author_organization: string
  author_photo?: string
  rating: 1 | 2 | 3 | 4 | 5
  order: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Partner {
  id: number
  name: string
  name_kz?: string
  name_ru?: string
  description?: string
  partner_type: 'university' | 'government' | 'international' | 'private' | 'ngo'
  logo?: string
  website?: string
  contact_email?: string
  contact_phone?: string
  address?: string
  order: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Banner {
  id: number
  title_kz: string
  title_ru: string
  title_en: string
  content_kz: string
  content_ru: string
  content_en: string
  banner_type: 'hero' | 'announcement' | 'promotion' | 'alert'
  image?: string
  link_url?: string
  link_text_kz?: string
  link_text_ru?: string
  link_text_en?: string
  start_date?: string
  end_date?: string
  order: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  featured: boolean
  created_at: string
  updated_at: string
}

// News types
export interface NewsItem {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  category: NewsCategory
  tags: string[]
  author: User
  views_count: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface NewsCategory {
  id: number
  name: string
  slug: string
  description?: string
  color?: string
  order: number
  created_at: string
  updated_at: string
}

// File types
export interface FileUpload {
  id: number
  name: string
  file: string
  file_type: 'document' | 'image' | 'video' | 'audio' | 'other'
  file_size: number
  file_size_human: string
  mime_type: string
  uploaded_by: number
  uploaded_by_name: string
  description?: string
  is_public: boolean
  created_at: string
  updated_at: string
}

// Contact types
export interface ContactMessage {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  assigned_to?: number
  assigned_to_name?: string
  response?: string
  responded_at?: string
  created_at: string
  updated_at: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface LoginFormData {
  email: string
  password: string
  remember_me?: boolean
}

export interface RegisterFormData {
  username: string
  email: string
  password: string
  password_confirm: string
  first_name?: string
  last_name?: string
  phone_number?: string
  organization?: string
  position?: string
  preferred_language?: 'kz' | 'ru' | 'en'
}

export interface PasswordChangeFormData {
  old_password: string
  new_password: string
  new_password_confirm: string
}

// Application types (for future use)
export interface Application {
  id: number
  type: 'recognition' | 'accreditation' | 'bologna'
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected'
  applicant: User
  data: any
  files: FileUpload[]
  created_at: string
  updated_at: string
  submitted_at?: string
  reviewed_at?: string
  decision_date?: string
  notes?: string
}

// Search types
export interface SearchResult {
  id: number
  title: string
  content: string
  type: 'page' | 'news' | 'faq'
  url: string
  relevance: number
}

export interface SearchFilters {
  query?: string
  type?: string
  category?: string
  date_from?: string
  date_to?: string
}

// Navigation types
export interface BreadcrumbItem {
  title: string
  href?: string
  translationKey?: string
}

export interface MenuItem {
  key: string
  href: string
  translationKey?: string
  children?: MenuItem[]
}

// Language types
export type Language = 'kz' | 'ru' | 'en'

export interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  displayName: string
}

// Error types
export interface ApiError {
  message: string
  details?: any
  status?: number
}

// Component prop types
export interface ComponentWithChildren {
  children: React.ReactNode
}

export interface ComponentWithClassName {
  className?: string
}

export interface ComponentWithLoading {
  isLoading?: boolean
}

export interface ComponentWithError {
  error?: string | null
}
