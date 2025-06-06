'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { bilimcertAPI, type RegisterSchema, type LoginSchema } from '@/lib/bilimcert-api'

interface User {
  id: string
  username: string
  email: string
  first_name?: string
  last_name?: string
  is_staff: boolean
  is_superuser: boolean
  is_active: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string, recaptchaToken: string) => Promise<boolean>
  register: (username: string, email: string, password: string, recaptchaToken: string, auth?: boolean) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
  updateProfile: (profileData: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Django session-based auth - проверяем через cookie
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: 'include',
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string, recaptchaToken: string): Promise<boolean> => {
    try {
      const response = await bilimcertAPI.login({
        username,
        password,
        recaptcha_token: recaptchaToken
      })

      if (response.success) {
        // После успешного логина проверяем статус пользователя
        await checkAuthStatus()
        toast.success('Сәтті кірдіңіз!')
        return true
      } else {
        toast.error(response.message || 'Кіру кезінде қате орын алды')
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Кіру кезінде қате орын алды')
      return false
    }
  }

  const register = async (username: string, email: string, password: string, recaptchaToken: string, auth: boolean = false): Promise<boolean> => {
    if (!recaptchaToken) {
      toast.error('reCAPTCHA растауы міндетті')
      return false
    }

    try {
      const response = await bilimcertAPI.register({
        username,
        email,
        password,
        recaptcha_token: recaptchaToken,
        auth
      })

      if (response.success) {
        toast.success('Тіркелу сәтті аяқталды! Енді кіре аласыз.')
        return true
      } else {
        toast.error(response.message || 'Тіркелу кезінде қате орын алды')
        return false
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Тіркелу кезінде қате орын алды')
      return false
    }
  }

  const logout = async () => {
    try {
      await bilimcertAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
    setUser(null)
    toast.success('Сәтті шықтыңыз!')
    router.push('/')
  }

  const refreshUser = async () => {
    await checkAuthStatus()
  }

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      const response = await bilimcertAPI.updateProfile(profileData)

      if (response.success && response.data) {
        setUser(response.data)
        toast.success('Профиль сәтті жаңартылды!')
        return true
      } else {
        toast.error(response.message || 'Профильді жаңарту кезінде қате орын алды')
        return false
      }
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Профильді жаңарту кезінде қате орын алды')
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
