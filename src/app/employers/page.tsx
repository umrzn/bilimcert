import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'
import {
  Briefcase,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Жұмыс берушілер үшін | BilimCert',
  description: 'BilimCert-те жұмыс мүмкіндіктері және мансап дамыту',
}

export default function EmployersPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Жұмыс берушілер', translationKey: 'footer.careers' }
  ]

  const benefits = [
    {
      icon: Award,
      title: 'Кәсіби дамыту',
      description: 'Үздіксіз оқыту және біліктілікті арттыру мүмкіндіктері'
    },
    {
      icon: Users,
      title: 'Командалық жұмыс',
      description: 'Тәжірибелі мамандармен бірге жұмыс істеу'
    },
    {
      icon: TrendingUp,
      title: 'Мансап өсуі',
      description: 'Нақты мансап дамыту жолдары және көтерілу мүмкіндіктері'
    },
    {
      icon: Shield,
      title: 'Тұрақтылық',
      description: 'Мемлекеттік ұйым ретінде жұмыс орнының тұрақтылығы'
    },
    {
      icon: Globe,
      title: 'Халықаралық тәжірибе',
      description: 'Халықаралық серіктестермен ынтымақтастық'
    },
    {
      icon: Building,
      title: 'Заманауи офис',
      description: 'Жайлы жұмыс орны және заманауи жабдықтар'
    }
  ]

  const openPositions = [
    {
      title: 'Білім сапасын бағалау маманы',
      department: 'Аккредитация бөлімі',
      type: 'Толық жұмыс күні',
      location: 'Нұр-Сұлтан',
      requirements: [
        'Жоғары білім (педагогика, психология немесе пән бойынша)',
        'Кемінде 3 жыл жұмыс тәжірибесі',
        'Ағылшын тілін білу (орташа деңгей)',
        'Аналитикалық ойлау қабілеті'
      ]
    },
    {
      title: 'IT маманы',
      department: 'Ақпараттық технологиялар бөлімі',
      type: 'Толық жұмыс күні',
      location: 'Нұр-Сұлтан',
      requirements: [
        'Техникалық жоғары білім',
        'JavaScript, React, Node.js білімі',
        'Деректер базасымен жұмыс тәжірибесі',
        'Командада жұмыс істеу дағдылары'
      ]
    },
    {
      title: 'Халықаралық байланыс маманы',
      department: 'Халықаралық ынтымақтастық бөлімі',
      type: 'Толық жұмыс күні',
      location: 'Нұр-Сұлтан',
      requirements: [
        'Халықаралық қатынастар немесе лингвистика бойынша білім',
        'Ағылшын және орыс тілдерін еркін білу',
        'Дипломатиялық протокол білімі',
        'Ұйымдастыру дағдылары'
      ]
    }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            BilimCert-те жұмыс істеңіз
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Қазақстанның білім сапасын арттыруға үлес қосыңыз. Біздің командаға қосылып,
            мансабыңызды дамытыңыз және елдің болашағын қалыптастыруға қатысыңыз.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#positions"
              className="inline-flex items-center px-8 py-3 bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Ашық вакансиялар
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center px-8 py-3 border-2 border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-colors"
            >
              Біз туралы
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Неліктен BilimCert?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Біздің қызметкерлерге ұсынатын артықшылықтарымыз
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-primary-500 dark:bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-white transition-colors duration-200">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                BilimCert туралы
              </h2>
              <p className="text-lg mb-8 opacity-90 dark:text-gray-300">
                Біз Қазақстанның білім сапасын бағалау саласындағы жетекші ұйыммыз.
                Халықаралық стандарттарға сәйкес келетін сапалы білім беруді қамтамасыз етуге ұмтыламыз.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-secondary-500 dark:text-orange-400 mb-2">500+</div>
                  <div className="text-sm opacity-90">Аккредиттелген бағдарлама</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-500 dark:text-orange-400 mb-2">50+</div>
                  <div className="text-sm opacity-90">Қызметкер</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-500 dark:text-orange-400 mb-2">15+</div>
                  <div className="text-sm opacity-90">Жыл тәжірибе</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">
              Ашық вакансиялар
            </h2>
            <p className="text-lg text-gray-600">
              Қазіргі уақытта ашық жұмыс орындары
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#003366] mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {position.type}
                      </span>
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 px-6 py-2 bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold rounded-lg transition-colors">
                    Өтініш беру
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Талаптар:</h4>
                  <ul className="space-y-1">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">
            Сұрақтарыңыз бар ма?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            HR бөлімімізбен байланысыңыз немесе резюмеңізді жіберіңіз
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hr@bilimcert.kz"
              className="inline-flex items-center px-6 py-3 bg-[#003366] hover:bg-[#004080] text-white font-semibold rounded-lg transition-colors"
            >
              HR-мен байланысу
            </a>
            <a
              href="mailto:jobs@bilimcert.kz"
              className="inline-flex items-center px-6 py-3 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-semibold rounded-lg transition-colors"
            >
              Резюме жіберу
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
