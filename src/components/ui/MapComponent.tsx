'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface MapMarker {
  position: [number, number]
  popup: string
}

interface MapComponentProps {
  center: [number, number]
  zoom?: number
  markers?: MapMarker[]
  height?: string
  className?: string
}

// Fallback component for when Leaflet is not available
function MapFallback({ height = '400px' }: { height?: string }) {
  return (
    <div
      className="bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Карта жүктелуде...
        </p>
      </div>
    </div>
  )
}

export function MapComponent({
  center,
  zoom = 13,
  markers = [],
  height = '400px',
  className = ''
}: MapComponentProps) {
  const mapRef = useRef<any>(null)

  useEffect(() => {
    // Fix for default markers in Leaflet with webpack
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/images/marker-icon-2x.png',
          iconUrl: '/images/marker-icon.png',
          shadowUrl: '/images/marker-shadow.png',
        })
      })
    }
  }, [])

  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return <MapFallback height={height} />
  }

  try {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup>
                {marker.popup}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    )
  } catch (error) {
    console.error('Error rendering map:', error)
    return <MapFallback height={height} />
  }
}

// Alternative simple map component using iframe (Google Maps embed)
export function SimpleMapComponent({
  address,
  height = '400px',
  className = ''
}: {
  address: string
  height?: string
  className?: string
}) {
  const encodedAddress = encodeURIComponent(address)

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
      />
    </div>
  )
}

// Static map component for better performance
export function StaticMapComponent({
  center,
  zoom = 15,
  width = 600,
  height = 400,
  markers = [],
  className = ''
}: {
  center: [number, number]
  zoom?: number
  width?: number
  height?: number
  markers?: Array<{ position: [number, number], label?: string }>
  className?: string
}) {
  const [lat, lng] = center

  // Build markers parameter for Google Static Maps API
  const markersParam = markers.length > 0
    ? `&markers=${markers.map(m => `${m.position[0]},${m.position[1]}`).join('|')}`
    : ''

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap${markersParam}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

  return (
    <div className={`relative ${className}`}>
      <img
        src={staticMapUrl}
        alt="Карта"
        width={width}
        height={height}
        className="rounded-lg w-full h-auto"
        loading="lazy"
      />
    </div>
  )
}
