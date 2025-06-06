'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InternationalCooperationPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/partnership/application')
  }, [router])

  return null
}
