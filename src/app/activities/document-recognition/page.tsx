'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DocumentRecognitionPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/recognition')
  }, [router])

  return null
}
