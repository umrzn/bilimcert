'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { StaffCard } from '@/components/ui/StaffCard'
import { ChevronDown, ChevronUp, Users, Target, Award, Globe, Code, UserCheck, LucideIcon } from 'lucide-react'

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
  startDate?: string
  languages?: string[]
}

interface Department {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
  responsibilities: string[]
  staff: StaffMember[]
}

const departmentsData: Department[] = [
  {
    id: 'accreditation',
    name: 'Аккредиттеу департаменті',
    description: 'Білім беру бағдарламаларын аккредиттеу және сапа бағалау',
    icon: Award,
    color: 'bg-blue-500',
    responsibilities: [
      'Білім беру бағдарламаларын аккредиттеу',
      'Сапа стандарттарын әзірлеу',
      'Сарапшылар дайындау',
      'Мониторинг және бақылау'
    ],
    staff: [
      {
        id: 'acc-1',
        name: 'Ерлан Мұратұлы Жақсыбаев',
        position: 'Департамент директоры',
        department: 'Аккредиттеу',
        photo: '/images/staff/accreditation-director.jpg',
        email: 'accreditation@bilimcert.kz',
        phone: '+7 (7172) 12-34-57',
        office: 'Кабинет 1502'
      },
      {
        id: 'acc-2',
        name: 'Мәдина Серікқызы Нұрланова',
        position: 'Бас сарапшы',
        department: 'Аккредиттеу',
        email: 'madina.nurlanova@bilimcert.kz',
        phone: '+7 (7172) 12-34-61',
        office: 'Кабинет 1506'
      },
      {
        id: 'acc-3',
        name: 'Арман Болатұлы Тұрсынов',
        position: 'Жетекші сарапшы',
        department: 'Аккредиттеу',
        email: 'arman.tursynov@bilimcert.kz',
        phone: '+7 (7172) 12-34-62',
        office: 'Кабинет 1507'
      }
    ]
  },
  {
    id: 'recognition',
    name: 'Тану департаменті',
    description: 'Шетелдік дипломдар мен біліктіліктерді тану',
    icon: Globe,
    color: 'bg-green-500',
    responsibilities: [
      'Шетелдік дипломдарды тану',
      'Біліктілік сәйкестігін анықтау',
      'Халықаралық келісімдер жасау',
      'ENIC-NARIC желісімен жұмыс'
    ],
    staff: [
      {
        id: 'rec-1',
        name: 'Гүлнар Серікқызы Оспанова',
        position: 'Департамент директоры',
        department: 'Тану',
        photo: '/images/staff/recognition-director.jpg',
        email: 'recognition@bilimcert.kz',
        phone: '+7 (7172) 12-34-58',
        office: 'Кабинет 1503'
      },
      {
        id: 'rec-2',
        name: 'Алмас Қайратұлы Бейсенов',
        position: 'Бас сарапшы',
        department: 'Тану',
        email: 'almas.beisenov@bilimcert.kz',
        phone: '+7 (7172) 12-34-63',
        office: 'Кабинет 1508'
      },
      {
        id: 'rec-3',
        name: 'Жанар Мұхтарқызы Әбілова',
        position: 'Жетекші сарапшы',
        department: 'Тану',
        email: 'zhanar.abilova@bilimcert.kz',
        phone: '+7 (7172) 12-34-64',
        office: 'Кабинет 1509'
      }
    ]
  },
  {
    id: 'it',
    name: 'Ақпараттық технологиялар департаменті',
    description: 'Цифрлық жүйелер мен платформаларды дамыту',
    icon: Code,
    color: 'bg-purple-500',
    responsibilities: [
      'IT жүйелерді дамыту',
      'Цифрлық платформалар құру',
      'Кибер қауіпсіздік',
      'Техникалық қолдау'
    ],
    staff: [
      {
        id: 'it-1',
        name: 'Дәурен Болатұлы Қасымов',
        position: 'Департамент директоры',
        department: 'IT',
        photo: '/images/staff/it-director.jpg',
        email: 'it@bilimcert.kz',
        phone: '+7 (7172) 12-34-59',
        office: 'Кабинет 1504'
      },
      {
        id: 'it-2',
        name: 'Нұрлан Ерланұлы Сәтбаев',
        position: 'Жүйе архитекторы',
        department: 'IT',
        email: 'nurlan.satbayev@bilimcert.kz',
        phone: '+7 (7172) 12-34-65',
        office: 'Кабинет 1510'
      },
      {
        id: 'it-3',
        name: 'Айнұр Қанатқызы Жұмабекова',
        position: 'Frontend разработчик',
        department: 'IT',
        email: 'ainur.zhumabekova@bilimcert.kz',
        phone: '+7 (7172) 12-34-66',
        office: 'Кабинет 1511'
      }
    ]
  },
  {
    id: 'international',
    name: 'Халықаралық қатынастар департаменті',
    description: 'Халықаралық ынтымақтастық және серіктестік',
    icon: UserCheck,
    color: 'bg-orange-500',
    responsibilities: [
      'Халықаралық серіктестік',
      'Келісімдер жасау',
      'Конференциялар ұйымдастыру',
      'Тәжірибе алмасу'
    ],
    staff: [
      {
        id: 'int-1',
        name: 'Асель Нұрланқызы Бекетова',
        position: 'Департамент директоры',
        department: 'Халықаралық қатынастар',
        photo: '/images/staff/international-director.jpg',
        email: 'international@bilimcert.kz',
        phone: '+7 (7172) 12-34-60',
        office: 'Кабинет 1505'
      },
      {
        id: 'int-2',
        name: 'Ерболат Мәуленұлы Қожабеков',
        position: 'Бас сарапшы',
        department: 'Халықаралық қатынастар',
        email: 'erbolat.kozhabekov@bilimcert.kz',
        phone: '+7 (7172) 12-34-67',
        office: 'Кабинет 1512'
      }
    ]
  },
  {
    id: 'quality',
    name: 'Сапа менеджменті департаменті',
    description: 'Ішкі сапа жүйесін басқару және дамыту',
    icon: Target,
    color: 'bg-red-500',
    responsibilities: [
      'Сапа жүйесін басқару',
      'Ішкі аудит жүргізу',
      'Процестерді жетілдіру',
      'ISO стандарттарын енгізу'
    ],
    staff: [
      {
        id: 'qm-1',
        name: 'Сауле Әміржанқызы Қалиева',
        position: 'Департамент директоры',
        department: 'Сапа менеджменті',
        email: 'quality@bilimcert.kz',
        phone: '+7 (7172) 12-34-68',
        office: 'Кабинет 1513'
      },
      {
        id: 'qm-2',
        name: 'Бақытжан Серікұлы Мұратов',
        position: 'Ішкі аудитор',
        department: 'Сапа менеджменті',
        email: 'bakytzhan.muratov@bilimcert.kz',
        phone: '+7 (7172) 12-34-69',
        office: 'Кабинет 1514'
      }
    ]
  },
  {
    id: 'admin',
    name: 'Әкімшілік департаменті',
    description: 'Әкімшілік және қаржылық басқару',
    icon: Users,
    color: 'bg-gray-500',
    responsibilities: [
      'Кадр саясаты',
      'Қаржылық басқару',
      'Заңды қолдау',
      'Хатшылық қызметі'
    ],
    staff: [
      {
        id: 'adm-1',
        name: 'Роза Мұхтарқызы Әлімова',
        position: 'Департамент директоры',
        department: 'Әкімшілік',
        email: 'admin@bilimcert.kz',
        phone: '+7 (7172) 12-34-70',
        office: 'Кабинет 1515'
      },
      {
        id: 'adm-2',
        name: 'Қуаныш Болатұлы Сейітов',
        position: 'Бас бухгалтер',
        department: 'Әкімшілік',
        email: 'kuanysh.seitov@bilimcert.kz',
        phone: '+7 (7172) 12-34-71',
        office: 'Кабинет 1516'
      }
    ]
  }
]

export default function DepartmentsPage() {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>(['accreditation'])

  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'О Центре', href: '/about', translationKey: 'about.title' },
    { title: 'Структурные подразделения', translationKey: 'about.departments' }
  ]

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments(prev =>
      prev.includes(departmentId)
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    )
  }

  const expandAll = () => {
    setExpandedDepartments(departmentsData.map(dept => dept.id))
  }

  const collapseAll = () => {
    setExpandedDepartments([])
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Структурные подразделения
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Центрдің құрылымдық бөлімшелері мен олардың қызметкерлері туралы толық ақпарат
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={expandAll}
            className="px-4 py-2 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Барлығын ашу
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Барлығын жабу
          </button>
        </div>

        {/* Departments */}
        <div className="space-y-6">
          {departmentsData.map((department) => {
            const isExpanded = expandedDepartments.includes(department.id)
            const IconComponent = department.icon

            return (
              <div
                key={department.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Department Header */}
                <button
                  onClick={() => toggleDepartment(department.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${department.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {department.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {department.description}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{department.staff.length} қызметкер</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Department Content */}
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      {/* Responsibilities */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Негізгі функциялар
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {department.responsibilities.map((responsibility, index) => (
                            <div
                              key={index}
                              className="flex items-center text-gray-600 dark:text-gray-300"
                            >
                              <div className={`w-2 h-2 ${department.color} rounded-full mr-3`}></div>
                              {responsibility}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Staff */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                          Қызметкерлер ({department.staff.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {department.staff.map((member) => (
                            <StaffCard
                              key={member.id}
                              member={member}
                              variant="compact"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary Statistics */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Жалпы статистика
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">
                {departmentsData.length}
              </div>
              <div className="text-primary-100">Департамент</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {departmentsData.reduce((total, dept) => total + dept.staff.length, 0)}
              </div>
              <div className="text-primary-100">Қызметкер</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {departmentsData.reduce((total, dept) => total + dept.responsibilities.length, 0)}
              </div>
              <div className="text-primary-100">Функция</div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
