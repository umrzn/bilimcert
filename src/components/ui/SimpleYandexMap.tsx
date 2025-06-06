'use client'

import { MapPin } from 'lucide-react'

interface SimpleYandexMapProps {
  width?: string
  height?: string
  className?: string
}

export function SimpleYandexMap({ width = '100%', height = '400px', className = '' }: SimpleYandexMapProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Yandex Map with direct HTML */}
      <div 
        className="w-full h-full rounded-lg overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: `
            <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A93357cb578030166e7f5c88bb4411938314c8eb1c2c919b8fb969633829a9e56&amp;width=100%25&amp;height=100%25&amp;lang=ru_RU&amp;scroll=true"></script>
          `
        }}
      />
      
      {/* Fallback content */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Яндекс карта</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            г. Нур-Султан, ул. Мәңгілік Ел, 8
          </p>
        </div>
      </div>
    </div>
  )
}

// Alternative with iframe approach
export function IframeYandexMap({ width = '100%', height = '400px', className = '' }: SimpleYandexMapProps) {
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

// HTML tag approach
export function HtmlTagYandexMap({ width = '100%', height = '400px', className = '' }: SimpleYandexMapProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Direct HTML script tag */}
        <script 
          type="text/javascript" 
          charSet="utf-8" 
          async 
          src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A93357cb578030166e7f5c88bb4411938314c8eb1c2c919b8fb969633829a9e56&width=100%&height=100%&lang=ru_RU&scroll=true"
        />
        
        {/* Fallback content */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Яндекс карта загружается...</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              г. Нур-Султан, ул. Мәңгілік Ел, 8
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
