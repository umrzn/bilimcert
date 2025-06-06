import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import { Briefcase, MapPin, Clock, Users, ArrowRight, Search, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Вакансии - BilimCert',
  description: 'Открытые вакансии в BilimCert. Присоединяйтесь к нашей команде профессионалов в сфере образования.',
}

export default function VacanciesPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Вакансии', translationKey: 'header.vacancies' }
  ]

  const vacancies = [
    {
      id: 1,
      title: 'Специалист по аккредитации',
      department: 'Отдел аккредитации',
      location: 'Нур-Султан',
      type: 'Полная занятость',
      experience: '3-5 лет',
      salary: 'По договоренности',
      description: 'Проведение экспертизы образовательных программ, подготовка аналитических материалов.',
      requirements: [
        'Высшее образование в области образования или смежной сфере',
        'Опыт работы в сфере качества образования',
        'Знание принципов Болонского процесса',
        'Владение казахским, русским и английским языками'
      ],
      posted: '2024-01-15'
    },
    {
      id: 2,
      title: 'Эксперт по признанию документов',
      department: 'Отдел признания',
      location: 'Нур-Султан',
      type: 'Полная занятость',
      experience: '2-4 года',
      salary: '350,000 - 450,000 тенге',
      description: 'Экспертиза документов об образовании, консультирование заявителей.',
      requirements: [
        'Высшее образование',
        'Опыт работы с документами об образовании',
        'Внимательность к деталям',
        'Коммуникативные навыки'
      ],
      posted: '2024-01-10'
    },
    {
      id: 3,
      title: 'IT-специалист',
      department: 'Отдел информационных технологий',
      location: 'Нур-Султан',
      type: 'Полная занятость',
      experience: '1-3 года',
      salary: '400,000 - 600,000 тенге',
      description: 'Поддержка и развитие информационных систем центра.',
      requirements: [
        'Высшее техническое образование',
        'Знание веб-технологий',
        'Опыт работы с базами данных',
        'Знание системного администрирования'
      ],
      posted: '2024-01-08'
    }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 dark:bg-primary-600 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Вакансии
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Присоединяйтесь к команде профессионалов BilimCert и внесите свой вклад 
            в развитие системы образования Казахстана
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск вакансий..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Все отделы</option>
                <option value="accreditation">Отдел аккредитации</option>
                <option value="recognition">Отдел признания</option>
                <option value="it">Отдел ИТ</option>
                <option value="admin">Администрация</option>
              </select>
              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Тип занятости</option>
                <option value="full">Полная занятость</option>
                <option value="part">Частичная занятость</option>
                <option value="contract">Контракт</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vacancies List */}
        <div className="space-y-8">
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {vacancy.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {vacancy.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {vacancy.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {vacancy.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        {vacancy.salary}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Опыт: {vacancy.experience}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {vacancy.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Требования:
                    </h4>
                    <ul className="space-y-2">
                      {vacancy.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Опубликовано: {new Date(vacancy.posted).toLocaleDateString('ru-RU')}
                    </div>
                    <button className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
                      Откликнуться
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Vacancies Message */}
        {vacancies.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Нет открытых вакансий
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              В настоящее время открытых вакансий нет. Следите за обновлениями.
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-gray-800 dark:to-gray-900 rounded-xl text-white p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Не нашли подходящую вакансию?
          </h2>
          <p className="text-primary-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Отправьте нам свое резюме, и мы свяжемся с вами при появлении 
            подходящих возможностей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors">
              Отправить резюме
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold rounded-lg transition-colors">
              Связаться с HR
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
