// Application constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// Application Information
export const APP_INFO = {
  NAME: 'BilimCert',
  FULL_NAME: 'Қазақстан Республикасының білім сапасын бағалау орталығы',
  VERSION: '1.0.0',
  DESCRIPTION: 'Білім беру сапасын қамтамасыз ету және халықаралық стандарттарға сәйкестікті растау',
  KEYWORDS: ['білім', 'аккредитация', 'сапа', 'бағалау', 'Қазақстан'],
  AUTHOR: 'BilimCert Team',
  EMAIL: 'info@bilimcert.kz',
  PHONE: '+7 (7172) 12-34-56',
  ADDRESS: 'г. Нур-Султан, ул. Мәңгілік Ел, 8',
  WEBSITE: 'https://bilimcert.kz',
} as const

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/bilimcert',
  TWITTER: 'https://twitter.com/bilimcert',
  INSTAGRAM: 'https://instagram.com/bilimcert',
  LINKEDIN: 'https://linkedin.com/company/bilimcert',
  YOUTUBE: 'https://youtube.com/bilimcert',
  TELEGRAM: 'https://t.me/bilimcert',
} as const

// External Links
export const EXTERNAL_LINKS = {
  EGOV: 'https://egov.kz',
  MINISTRY_EDUCATION: 'https://edu.gov.kz',
  EDUCATION_DATABASE: 'https://nobd.edu.kz',
  BOLOGNA_PROCESS: 'https://ehea.info',
  ENQA: 'https://enqa.eu',
  UNESCO: 'https://unesco.org',
  ENIC_NARIC: 'https://enic-naric.net',
} as const

// Languages
export const LANGUAGES = [
  {
    code: 'kz' as const,
    name: 'Қазақша',
    nativeName: 'Қазақша',
    displayName: 'ҚАЗ',
    flag: '🇰🇿',
  },
  {
    code: 'ru' as const,
    name: 'Русский',
    nativeName: 'Русский',
    displayName: 'РУС',
    flag: '🇷🇺',
  },
  {
    code: 'en' as const,
    name: 'English',
    nativeName: 'English',
    displayName: 'ENG',
    flag: '🇺🇸',
  },
] as const

export const DEFAULT_LANGUAGE = 'kz' as const

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#003366', // Main primary color
      600: '#002952',
      700: '#00213d',
      800: '#001a29',
      900: '#001214',
    },
    SECONDARY: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#FF6600', // Main secondary color
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
  },
  FONTS: {
    SANS: ['Roboto', 'Arial', 'sans-serif'],
    SERIF: ['Georgia', 'serif'],
    MONO: ['Monaco', 'Consolas', 'monospace'],
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
} as const

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    ARCHIVES: ['application/zip', 'application/x-rar-compressed'],
  },
  UPLOAD_ENDPOINT: '/files/',
} as const

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  LONG_TTL: 60 * 60 * 1000, // 1 hour
  SHORT_TTL: 30 * 1000, // 30 seconds
  KEYS: {
    USER_PROFILE: 'user_profile',
    APP_CONFIG: 'app_config',
    NEWS: 'news',
    FAQS: 'faqs',
    PARTNERS: 'partners',
    TESTIMONIALS: 'testimonials',
  },
} as const

// Form Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-ZА-Яа-яӘәІіҢңҒғҮүҰұҚқӨөҺһ\s]+$/,
  },
} as const

// Application Status Types
export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const

export const APPLICATION_TYPES = {
  RECOGNITION: 'recognition',
  ACCREDITATION: 'accreditation',
  BOLOGNA: 'bologna',
} as const

// Content Status Types
export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  EXPERT: 'expert',
  USER: 'user',
} as const

// Accessibility Settings
export const ACCESSIBILITY_CONFIG = {
  FONT_SIZES: [
    { label: 'Кіші', value: 14 },
    { label: 'Қалыпты', value: 16 },
    { label: 'Үлкен', value: 18 },
    { label: 'Өте үлкен', value: 20 },
  ],
  TEXT_SPACING: [
    { label: 'Қалыпты', value: 1 },
    { label: 'Кең', value: 1.2 },
    { label: 'Өте кең', value: 1.5 },
  ],
  COLOR_BLIND_MODES: [
    { label: 'Жоқ', value: 'none' },
    { label: 'Протанопия', value: 'protanopia' },
    { label: 'Дейтеранопия', value: 'deuteranopia' },
    { label: 'Тританопия', value: 'tritanopia' },
  ],
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Желі қатесі. Интернет байланысын тексеріңіз.',
  SERVER_ERROR: 'Сервер қатесі. Кейінірек қайталап көріңіз.',
  UNAUTHORIZED: 'Авторизация қажет.',
  FORBIDDEN: 'Қол жеткізу құқығы жоқ.',
  NOT_FOUND: 'Ресурс табылмады.',
  VALIDATION_ERROR: 'Деректерді тексеру қатесі.',
  FILE_TOO_LARGE: 'Файл өлшемі тым үлкен.',
  INVALID_FILE_TYPE: 'Файл түрі қолдау көрсетілмейді.',
  GENERIC_ERROR: 'Белгісіз қате орын алды.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Сәтті кірдіңіз!',
  LOGOUT_SUCCESS: 'Сәтті шықтыңыз!',
  REGISTRATION_SUCCESS: 'Тіркелу сәтті аяқталды!',
  PROFILE_UPDATED: 'Профиль жаңартылды!',
  PASSWORD_CHANGED: 'Құпия сөз өзгертілді!',
  MESSAGE_SENT: 'Хабарлама жіберілді!',
  FILE_UPLOADED: 'Файл жүктелді!',
  SETTINGS_SAVED: 'Параметрлер сақталды!',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PREFERENCES: 'userPreferences',
  LANGUAGE: 'preferredLanguage',
  ACCESSIBILITY_SETTINGS: 'accessibilitySettings',
  THEME: 'theme',
  RECENT_SEARCHES: 'recentSearches',
} as const

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'DD.MM.YYYY',
  LONG: 'DD MMMM YYYY',
  WITH_TIME: 'DD.MM.YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm',
} as const

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_KZ: /^(\+7|8)?[\s\-]?\(?7\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const
