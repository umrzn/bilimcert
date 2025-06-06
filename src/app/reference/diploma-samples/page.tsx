'use client'

import { SearchableTable } from '@/components/ui/SearchableTable'

const diplomaSamplesData = [
  {
    id: '1',
    universityName: 'Қазақ ұлттық университеті (ҚазҰУ)',
    universityNameEn: 'Al-Farabi Kazakh National University',
    city: 'Алматы',
    region: 'Алматы қаласы',
    type: 'Ұлттық университет',
    establishedYear: '1934',
    diplomaType: 'Бакалавр дипломы',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    lastUpdated: '2024-01-15',
    downloadUrl: '/documents/diplomas/kaznu-bachelor.pdf',
    viewUrl: '/documents/diplomas/kaznu-bachelor.pdf'
  },
  {
    id: '2',
    universityName: 'Назарбаев Университеті',
    universityNameEn: 'Nazarbayev University',
    city: 'Нұр-Сұлтан',
    region: 'Нұр-Сұлтан қаласы',
    type: 'Автономды университет',
    establishedYear: '2010',
    diplomaType: 'Магистр дипломы',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    lastUpdated: '2024-01-10',
    downloadUrl: '/documents/diplomas/nu-master.pdf',
    viewUrl: '/documents/diplomas/nu-master.pdf'
  },
  {
    id: '3',
    universityName: 'Қазақстан-Британ техникалық университеті (ҚБТУ)',
    universityNameEn: 'Kazakh-British Technical University',
    city: 'Алматы',
    region: 'Алматы қаласы',
    type: 'Халықаралық университет',
    establishedYear: '2001',
    diplomaType: 'Бакалавр дипломы',
    fileType: 'PDF',
    fileSize: '2.8 MB',
    lastUpdated: '2023-12-20',
    downloadUrl: '/documents/diplomas/kbtu-bachelor.pdf',
    viewUrl: '/documents/diplomas/kbtu-bachelor.pdf'
  },
  {
    id: '4',
    universityName: 'Қазақ экономика, қаржы және халықаралық сауда университеті',
    universityNameEn: 'Kazakh University of Economics, Finance and International Trade',
    city: 'Нұр-Сұлтан',
    region: 'Нұр-Сұлтан қаласы',
    type: 'Мемлекеттік университет',
    establishedYear: '1963',
    diplomaType: 'MBA диплом',
    fileType: 'PDF',
    fileSize: '2.2 MB',
    lastUpdated: '2023-11-30',
    downloadUrl: '/documents/diplomas/kueft-mba.pdf',
    viewUrl: '/documents/diplomas/kueft-mba.pdf'
  },
  {
    id: '5',
    universityName: 'Абай атындағы Қазақ ұлттық педагогикалық университеті',
    universityNameEn: 'Abai Kazakh National Pedagogical University',
    city: 'Алматы',
    region: 'Алматы қаласы',
    type: 'Педагогикалық университет',
    establishedYear: '1928',
    diplomaType: 'Бакалавр дипломы',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    lastUpdated: '2023-10-15',
    downloadUrl: '/documents/diplomas/kaznpu-bachelor.pdf',
    viewUrl: '/documents/diplomas/kaznpu-bachelor.pdf'
  },
  {
    id: '6',
    universityName: 'Қарағанды техникалық университеті',
    universityNameEn: 'Karaganda Technical University',
    city: 'Қарағанды',
    region: 'Қарағанды облысы',
    type: 'Техникалық университет',
    establishedYear: '1953',
    diplomaType: 'Инженер дипломы',
    fileType: 'PDF',
    fileSize: '2.7 MB',
    lastUpdated: '2023-09-25',
    downloadUrl: '/documents/diplomas/ktu-engineer.pdf',
    viewUrl: '/documents/diplomas/ktu-engineer.pdf'
  },
  {
    id: '7',
    universityName: 'Еуразия ұлттық университеті',
    universityNameEn: 'L.N. Gumilyov Eurasian National University',
    city: 'Нұр-Сұлтан',
    region: 'Нұр-Сұлтан қаласы',
    type: 'Ұлттық университет',
    establishedYear: '1996',
    diplomaType: 'Магистр дипломы',
    fileType: 'PDF',
    fileSize: '2.6 MB',
    lastUpdated: '2023-08-20',
    downloadUrl: '/documents/diplomas/enu-master.pdf',
    viewUrl: '/documents/diplomas/enu-master.pdf'
  },
  {
    id: '8',
    universityName: 'Қазақ мемлекеттік қыздар педагогикалық университеті',
    universityNameEn: "Kazakh State Women's Teacher Training University",
    city: 'Алматы',
    region: 'Алматы қаласы',
    type: 'Педагогикалық университет',
    establishedYear: '1944',
    diplomaType: 'Бакалавр дипломы',
    fileType: 'PDF',
    fileSize: '2.3 MB',
    lastUpdated: '2023-07-10',
    downloadUrl: '/documents/diplomas/kazmkpu-bachelor.pdf',
    viewUrl: '/documents/diplomas/kazmkpu-bachelor.pdf'
  },
  {
    id: '9',
    universityName: 'Алматы технологиялық университеті',
    universityNameEn: 'Almaty Technological University',
    city: 'Алматы',
    region: 'Алматы қаласы',
    type: 'Технологиялық университет',
    establishedYear: '1957',
    diplomaType: 'Бакалавр дипломы',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    lastUpdated: '2023-06-15',
    downloadUrl: '/documents/diplomas/atu-bachelor.pdf',
    viewUrl: '/documents/diplomas/atu-bachelor.pdf'
  },
  {
    id: '10',
    universityName: 'Қазақ мемлекеттік заң университеті',
    universityNameEn: 'Kazakh State Law University',
    city: 'Алматы',
    region: 'Алматы қаласы',
    type: 'Заң университеті',
    establishedYear: '1963',
    diplomaType: 'Заңгер дипломы',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    lastUpdated: '2023-05-20',
    downloadUrl: '/documents/diplomas/kazguu-law.pdf',
    viewUrl: '/documents/diplomas/kazguu-law.pdf'
  },
  {
    id: '11',
    universityName: 'Шымкент университеті',
    universityNameEn: 'Shymkent University',
    city: 'Шымкент',
    region: 'Түркістан облысы',
    type: 'Мемлекеттік университет',
    establishedYear: '1943',
    diplomaType: 'Бакалавр дипломы',
    fileType: 'PDF',
    fileSize: '2.2 MB',
    lastUpdated: '2023-04-25',
    downloadUrl: '/documents/diplomas/shu-bachelor.pdf',
    viewUrl: '/documents/diplomas/shu-bachelor.pdf'
  },
  {
    id: '12',
    universityName: 'Семей қаласының Шәкәрім атындағы университеті',
    universityNameEn: 'Shakarim University of Semey',
    city: 'Семей',
    region: 'Шығыс Қазақстан облысы',
    type: 'Мемлекеттік университет',
    establishedYear: '1952',
    diplomaType: 'Магистр дипломы',
    fileType: 'PDF',
    fileSize: '2.7 MB',
    lastUpdated: '2023-03-30',
    downloadUrl: '/documents/diplomas/semgu-master.pdf',
    viewUrl: '/documents/diplomas/semgu-master.pdf'
  }
]

const columns = [
  { key: 'universityName', title: 'Университет атауы', sortable: true, width: '25%' },
  { key: 'city', title: 'Қала', sortable: true, width: '10%' },
  { key: 'region', title: 'Облыс', sortable: true, width: '15%' },
  { key: 'type', title: 'Түрі', sortable: true, width: '15%' },
  { key: 'diplomaType', title: 'Диплом түрі', sortable: true, width: '15%' },
  { key: 'fileType', title: 'Файл', sortable: false, width: '8%' },
  { key: 'lastUpdated', title: 'Жаңартылды', sortable: true, width: '12%' },
  { key: 'actions', title: 'Әрекеттер', sortable: false, width: '15%' }
]

const filters = [
  {
    key: 'region',
    title: 'облыстар',
    options: [
      { value: 'Алматы қаласы', label: 'Алматы қаласы' },
      { value: 'Нұр-Сұлтан қаласы', label: 'Нұр-Сұлтан қаласы' },
      { value: 'Қарағанды облысы', label: 'Қарағанды облысы' },
      { value: 'Түркістан облысы', label: 'Түркістан облысы' },
      { value: 'Шығыс Қазақстан облысы', label: 'Шығыс Қазақстан облысы' }
    ]
  },
  {
    key: 'type',
    title: 'университет түрлері',
    options: [
      { value: 'Ұлттық университет', label: 'Ұлттық университет' },
      { value: 'Мемлекеттік университет', label: 'Мемлекеттік университет' },
      { value: 'Техникалық университет', label: 'Техникалық университет' },
      { value: 'Педагогикалық университет', label: 'Педагогикалық университет' },
      { value: 'Халықаралық университет', label: 'Халықаралық университет' },
      { value: 'Автономды университет', label: 'Автономды университет' }
    ]
  },
  {
    key: 'diplomaType',
    title: 'диплом түрлері',
    options: [
      { value: 'Бакалавр дипломы', label: 'Бакалавр дипломы' },
      { value: 'Магистр дипломы', label: 'Магистр дипломы' },
      { value: 'MBA диплом', label: 'MBA диплом' },
      { value: 'Инженер дипломы', label: 'Инженер дипломы' },
      { value: 'Заңгер дипломы', label: 'Заңгер дипломы' }
    ]
  }
]

export default function DiplomaSamplesPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Справочная информация', href: '/reference', translationKey: 'reference.title' },
    { title: 'Образцы дипломов ВУЗов РК', translationKey: 'reference.diplomaSamples' }
  ]

  return (
    <SearchableTable
      title="Образцы дипломов ВУЗов РК"
      description="Қазақстан Республикасы жоғары оқу орындарының диплом үлгілері мен шаблондары"
      breadcrumbs={breadcrumbs}
      columns={columns}
      data={diplomaSamplesData}
      searchPlaceholder="Университет атауы бойынша іздеу..."
      filters={filters}
    />
  )
}
