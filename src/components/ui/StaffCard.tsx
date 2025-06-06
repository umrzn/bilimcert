'use client'

import Image from 'next/image'
import { Mail, Phone, MapPin, Calendar, Award, ExternalLink } from 'lucide-react'

interface StaffMember {
  id: string
  name: string
  position: string
  department: string
  photo?: string
  email?: string
  phone?: string
  office?: string
  bio?: string
  education?: string[]
  experience?: string[]
  achievements?: string[]
  startDate?: string
  languages?: string[]
  socialLinks?: {
    linkedin?: string
    researchgate?: string
    orcid?: string
  }
}

interface StaffCardProps {
  member: StaffMember
  variant?: 'card' | 'detailed' | 'compact'
  className?: string
}

export function StaffCard({ member, variant = 'card', className = '' }: StaffCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow ${className}`}>
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {member.position}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {member.department}
            </p>
          </div>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Photo */}
            <div className="relative w-48 h-48 mx-auto md:mx-0 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-6xl font-bold">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {member.name}
                </h2>
                <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-1">
                  {member.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.department}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {member.email && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Mail className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    <a
                      href={`tel:${member.phone}`}
                      className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div>
                )}
                {member.office && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    <span>{member.office}</span>
                  </div>
                )}
                {member.startDate && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    <span>Жұмысқа кірген: {formatDate(member.startDate)}</span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {member.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Өмірбаян
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              )}

              {/* Education */}
              {member.education && member.education.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Білімі
                  </h3>
                  <ul className="space-y-2">
                    {member.education.map((edu, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start">
                        <Award className="w-4 h-4 mr-2 mt-1 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience */}
              {member.experience && member.experience.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Жұмыс тәжірибесі
                  </h3>
                  <ul className="space-y-2">
                    {member.experience.map((exp, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300">
                        • {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {member.languages && member.languages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Тілдер
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {member.socialLinks && Object.keys(member.socialLinks).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Сілтемелер
                  </h3>
                  <div className="flex space-x-4">
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialLinks.researchgate && (
                      <a
                        href={member.socialLinks.researchgate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialLinks.orcid && (
                      <a
                        href={member.socialLinks.orcid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-600 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default card variant
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group hover:-translate-y-1 ${className}`}>
      <div className="p-6">
        {/* Photo */}
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-3xl font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
            {member.position}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
            {member.department}
          </p>

          {/* Contact */}
          <div className="flex justify-center space-x-3">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
