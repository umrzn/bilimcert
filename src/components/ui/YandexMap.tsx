'use client'

import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

interface YandexMapProps {
  width?: string
  height?: string
  className?: string
}

export function YandexMap({ width = '100%', height = '400px', className = '' }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create script element for Yandex Maps
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = true
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A93357cb578030166e7f5c88bb4411938314c8eb1c2c919b8fb969633829a9e56&width=600&height=200&lang=ru_RU&scroll=true'

    // Append script to document head
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Fallback content while map loads */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Загрузка карты...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            г. Нур-Султан, ул. Мәңгілік Ел, 8
          </p>
        </div>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        id="yandex-map-container"
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{ width, height }}
      />
    </div>
  )
}

// Alternative static map component for better performance
export function StaticYandexMap({ width = '100%', height = '400px', className = '' }: YandexMapProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=71.4491%2C51.1694&z=15&l=map&pt=71.4491%2C51.1694%2Cpm2rdm"
        width="100%"
        height="100%"
        frameBorder="0"
        className="rounded-lg"
        title="BilimCert - г. Нур-Султан, ул. Мәңгілік Ел, 8"
        loading="lazy"
        allowFullScreen
      />
    </div>
  )
}

// Script-based map component with HTML tag
export function ScriptYandexMap({ width = '100%', height = '400px', className = '' }: YandexMapProps) {
  const mapId = `yandex-map-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    // Create map container
    const mapContainer = document.getElementById(mapId)
    if (!mapContainer) return

    // Create script tag for Yandex Maps
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = true
    script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A${mapId}&width=${typeof width === 'string' ? width.replace('%', '') : width}&height=${typeof height === 'string' ? height.replace('px', '') : height}&lang=ru_RU&scroll=true`

    // Add script to head
    document.head.appendChild(script)

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [mapId, width, height])

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div
        id={mapId}
        className="w-full h-full rounded-lg"
        style={{ width, height }}
      />
      {/* Fallback content */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Карта загружается...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            г. Нур-Султан, ул. Мәңгілік Ел, 8
          </p>
        </div>
      </div>
    </div>
  )
}
