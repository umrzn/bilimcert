import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import Link from 'next/link'
import { TrendingUp, Code, Users, Globe, ArrowRight, CheckCircle, Star, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Дағды дамыту - Студенттерге',
  description: 'Студенттер үшін дағды дамыту курстары: техникалық дағдылар, жұмсақ дағдылар, тілдік дағдылар.',
}

export default function SkillsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Студенттерге', href: '/students', translationKey: 'mainNav.forStudents' },
    { title: 'Дағды дамыту', translationKey: 'mainNav.skillBuilding' }
  ]

  const skillCategories = [
    {
      icon: Code,
      title: 'Техникалық дағдылар',
      description: 'Заманауи технологиялар мен бағдарламалау тілдерін үйрену',
      courses: ['Python бағдарламалау', 'Web дамыту', 'Деректер талдау', 'AI/ML негіздері'],
      duration: '3-6 ай',
      level: 'Бастапқы - Жетілген'
    },
    {
      icon: Users,
      title: 'Жұмсақ дағдылар',
      description: 'Коммуникация, көшбасшылық және командада жұмыс істеу дағдылары',
      courses: ['Көшбасшылық', 'Презентация дағдылары', 'Уақытты басқару', 'Стресс менеджменті'],
      duration: '1-3 ай',
      level: 'Барлық деңгей'
    },
    {
      icon: Globe,
      title: 'Тілдік дағдылар',
      description: 'Ағылшын және басқа шет тілдерін үйрену',
      courses: ['Business English', 'IELTS дайындық', 'Техникалық ағылшын', 'Қытай тілі'],
      duration: '6-12 ай',
      level: 'A1 - C2'
    }
  ]

  const features = [
    {
      icon: Star,
      title: 'Сертификация',
      description: 'Халықаралық танылған сертификаттар'
    },
    {
      icon: Users,
      title: 'Сарапшы дәрістер',
      description: 'Индустрия сарапшыларынан дәрістер'
    },
    {
      icon: Award,
      title: 'Практикалық жобалар',
      description: 'Нақты жобаларда қолданбалы тәжірибе'
    }
  ]

  const popularCourses = [
    {
      title: 'Python бағдарламалау',
      category: 'Техникалық',
      duration: '4 ай',
      students: '500+',
      rating: 4.8
    },
    {
      title: 'Business English',
      category: 'Тілдік',
      duration: '6 ай',
      students: '300+',
      rating: 4.9
    },
    {
      title: 'Көшбасшылық дағдылары',
      category: 'Жұмсақ',
      duration: '2 ай',
      students: '200+',
      rating: 4.7
    },
    {
      title: 'Web дамыту',
      category: 'Техникалық',
      duration: '5 ай',
      students: '400+',
      rating: 4.8
    }
  ]

  const stats = [
    { number: '50+', label: 'Курс' },
    { number: '2000+', label: 'Студент' },
    { number: '95%', label: 'Аяқтау көрсеткіші' },
    { number: '4.8', label: 'Орташа рейтинг' }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <TranslatedText textKey="mainNav.skillBuilding" />
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Заманауи дағдыларды дамытып, еңбек нарығында бәсекеге қабілетті болыңыз. 
              Техникалық, жұмсақ және тілдік дағдылар.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Дағды категориялары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <category.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {category.description}
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Курстар:</h4>
                  <ul className="space-y-2">
                    {category.courses.map((course, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Ұзақтығы: {category.duration}</span>
                  <span>Деңгей: {category.level}</span>
                </div>
                <Link
                  href="/application"
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                >
                  Тіркелу
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Біздің артықшылықтар
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-primary-100">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Courses */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Танымал курстар
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {popularCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Ұзақтығы: {course.duration}</div>
                  <div>Студенттер: {course.students}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-screen-xl">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Дағдыларыңызды дамытуды бүгін бастаңыз!
            </h2>
            <p className="text-secondary-100 mb-8 max-w-2xl mx-auto">
              Біздің курстарға тіркеліп, болашақ мансабыңыз үшін қажетті дағдыларды игеріңіз
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/application"
                className="inline-flex items-center px-8 py-3 bg-white text-secondary-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
              >
                Курсқа тіркелу
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/students/career"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold rounded-lg transition-colors"
              >
                Мансап дамыту
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
