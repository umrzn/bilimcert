'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { StaffCard } from '@/components/ui/StaffCard'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { Search, Filter } from 'lucide-react'

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

const leadershipData: StaffMember[] = [
  {
    id: '1',
    name: 'Айгүл Нұрланқызы Сейтова',
    position: 'Директор',
    department: 'Басшылық',
    photo: '/images/staff/director.jpg',
    email: 'director@bilimcert.kz',
    phone: '+7 (7172) 12-34-56',
    office: 'Кабинет 1501',
    bio: 'Білім беру саласында 20 жылдан астам тәжірибесі бар. Халықаралық білім беру сапасын қамтамасыз ету саласындағы танымал сарапшы.',
    education: [
      'PhD, Білім беру менеджменті, Назарбаев Университеті (2015)',
      'Магистр, Педагогика ғылымдары, ҚазҰУ (2008)',
      'Бакалавр, Математика, ҚазҰУ (2005)'
    ],
    experience: [
      'BilimCert директоры (2018 - қазіргі уақыт)',
      'Білім және ғылым министрлігі, Департамент директоры (2015-2018)',
      'ҚазҰУ, Сапа орталығы жетекшісі (2010-2015)'
    ],
    achievements: [
      'Еуропалық сапа агенттіктері ассоциациясының (ENQA) мүшесі',
      '"Білім беру саласындағы үздік басшы" сыйлығы (2020)',
      'UNESCO білім беру сапасы жөніндегі сарапшы'
    ],
    startDate: '2018-03-01',
    languages: ['Қазақша', 'Орысша', 'Ағылшынша', 'Түрікше'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/aigul-seitova',
      researchgate: 'https://researchgate.net/profile/aigul-seitova'
    }
  },
  {
    id: '2',
    name: 'Ерлан Мұратұлы Жақсыбаев',
    position: 'Аккредиттеу департаментінің директоры',
    department: 'Аккредиттеу',
    photo: '/images/staff/accreditation-director.jpg',
    email: 'accreditation@bilimcert.kz',
    phone: '+7 (7172) 12-34-57',
    office: 'Кабинет 1502',
    bio: 'Аккредиттеу процедуралары саласындағы жетекші сарапшы. 15 жылдан астам тәжірибесі бар.',
    education: [
      'PhD, Білім беру менеджменті, Еуразия университеті (2012)',
      'Магистр, Экономика, ҚазЭУ (2007)'
    ],
    experience: [
      'BilimCert аккредиттеу директоры (2015 - қазіргі уақыт)',
      'Сапа агенттігі, Бас сарапшы (2010-2015)'
    ],
    startDate: '2015-06-01',
    languages: ['Қазақша', 'Орысша', 'Ағылшынша']
  },
  {
    id: '3',
    name: 'Гүлнар Серікқызы Оспанова',
    position: 'Тану департаментінің директоры',
    department: 'Тану',
    photo: '/images/staff/recognition-director.jpg',
    email: 'recognition@bilimcert.kz',
    phone: '+7 (7172) 12-34-58',
    office: 'Кабинет 1503',
    bio: 'Шетелдік дипломдарды тану саласындағы сарапшы. ENIC-NARIC желісінің мүшесі.',
    education: [
      'Магистр, Халықаралық қатынастар, ҚазҰХА (2010)',
      'Бакалавр, Лингвистика, Абылай хан атындағы ҚазХҚжӘТУ (2008)'
    ],
    experience: [
      'BilimCert тану директоры (2016 - қазіргі уақыт)',
      'Білім министрлігі, Сарапшы (2012-2016)'
    ],
    startDate: '2016-09-01',
    languages: ['Қазақша', 'Орысша', 'Ағылшынша', 'Немісше', 'Французша']
  },
  {
    id: '4',
    name: 'Дәурен Болатұлы Қасымов',
    position: 'IT департаментінің директоры',
    department: 'Ақпараттық технологиялар',
    photo: '/images/staff/it-director.jpg',
    email: 'it@bilimcert.kz',
    phone: '+7 (7172) 12-34-59',
    office: 'Кабинет 1504',
    bio: 'Цифрлық трансформация және IT жүйелер саласындағы сарапшы.',
    education: [
      'Магистр, Ақпараттық жүйелер, КБТУ (2014)',
      'Бакалавр, Программалық инженерия, ҚазҰТЗУ (2012)'
    ],
    experience: [
      'BilimCert IT директоры (2017 - қазіргі уақыт)',
      'Цифрлық Қазақстан, Жоба менеджері (2014-2017)'
    ],
    startDate: '2017-01-15',
    languages: ['Қазақша', 'Орысша', 'Ағылшынша']
  },
  {
    id: '5',
    name: 'Асель Нұрланқызы Бекетова',
    position: 'Халықаралық қатынастар директоры',
    department: 'Халықаралық қатынастар',
    photo: '/images/staff/international-director.jpg',
    email: 'international@bilimcert.kz',
    phone: '+7 (7172) 12-34-60',
    office: 'Кабинет 1505',
    bio: 'Халықаралық ынтымақтастық және серіктестік саласындағы сарапшы.',
    education: [
      'Магистр, Халықаралық қатынастар, ҚМДБ Университеті (2011)',
      'Бакалавр, Аударма ісі, ҚазҰУ (2009)'
    ],
    experience: [
      'BilimCert халықаралық қатынастар директоры (2019 - қазіргі уақыт)',
      'Сыртқы істер министрлігі, Сарапшы (2015-2019)'
    ],
    startDate: '2019-04-01',
    languages: ['Қазақша', 'Орысша', 'Ағылшынша', 'Французша', 'Испанша']
  }
]

export default function LeadershipPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null)

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'О Центре', href: '/about', translationKey: 'about.title' },
    { title: 'Руководящий состав', translationKey: 'about.leadership' }
  ]

  const departments = [
    { id: 'all', name: 'Барлық бөлімдер' },
    { id: 'Басшылық', name: 'Басшылық' },
    { id: 'Аккредиттеу', name: 'Аккредиттеу' },
    { id: 'Тану', name: 'Тану' },
    { id: 'Ақпараттық технологиялар', name: 'IT' },
    { id: 'Халықаралық қатынастар', name: 'Халықаралық қатынастар' }
  ]

  const filteredStaff = leadershipData.filter(member => {
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment
    const matchesSearch = searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesDepartment && matchesSearch
  })

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Руководящий состав
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Біздің басшылық құрамы - білім беру сапасын қамтамасыз ету саласындағы тәжірибелі мамандар
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Қызметкерлерді іздеу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedDepartment === dept.id
                    ? 'bg-primary-500 dark:bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Grid */}
        {filteredStaff.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Қызметкерлер табылмады
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Іздеу критерийлерін өзгертіп көріңіз
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Director - Featured */}
            {filteredStaff.find(member => member.position.includes('Директор') && member.department === 'Басшылық') && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Басшылық
                </h2>
                <StaffCard
                  member={filteredStaff.find(member => member.position.includes('Директор') && member.department === 'Басшылық')!}
                  variant="detailed"
                />
              </div>
            )}

            {/* Department Directors */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Департамент директорлары
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStaff
                  .filter(member => member.position.includes('директор') && member.department !== 'Басшылық')
                  .map((member) => (
                    <div key={member.id} onClick={() => setSelectedMember(member)} className="cursor-pointer">
                      <StaffCard member={member} variant="card" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Detailed View Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Толық ақпарат
                  </h2>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <StaffCard member={selectedMember} variant="detailed" />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
