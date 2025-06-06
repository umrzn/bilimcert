import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'

export const metadata = {
  title: 'Құпиялылық саясаты | BilimCert',
  description: 'BilimCert платформасының жеке деректерді қорғау саясаты',
}

export default function PrivacyPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Құпиялылық саясаты', translationKey: 'footer.privacy' }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Құпиялылық саясаты
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Соңғы жаңарту: 2024 жылдың 1 қаңтары
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-green-50 dark:bg-gray-800 border-l-4 border-green-400 dark:border-green-500 p-6 mb-8 transition-colors duration-200">
              <p className="text-green-800 dark:text-green-300">
                <strong>Біздің міндеттемеміз:</strong> BilimCert сіздің жеке деректеріңізді қорғауды және
                құпиялылығыңызды сақтауды маңызды деп санайды.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">1. Жалпы ақпарат</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Осы Құпиялылық саясаты BilimCert платформасы арқылы жинайтын, пайдаланатын және
                қорғайтын жеке деректер туралы ақпарат береді.
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Біз Қазақстан Республикасының "Жеке деректер және оларды қорғау туралы" Заңына
                және халықаралық стандарттарға сәйкес жұмыс істейміз.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">2. Жинайтын деректер</h2>
              <p className="mb-4">Біз келесі жеке деректерді жинаймыз:</p>

              <h3 className="text-xl font-semibold text-[#003366] mb-3">Тіркелу кезінде:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Аты-жөні</li>
                <li>Электрондық пошта мекенжайы</li>
                <li>Телефон нөмірі</li>
                <li>Ұйым атауы және лауазымы</li>
                <li>Тілдік таңдаулар</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#003366] mb-3">Өтініш беру кезінде:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Білім туралы құжаттар</li>
                <li>Жеке куәлік деректері</li>
                <li>Мекенжай ақпараты</li>
                <li>Қосымша құжаттар</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#003366] mb-3">Автоматты түрде:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP мекенжайы</li>
                <li>Браузер ақпараты</li>
                <li>Сайтта болу уақыты</li>
                <li>Қаралған беттер</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">3. Деректерді пайдалану мақсаттары</h2>
              <p className="mb-4">Жинаған деректерді келесі мақсаттарда пайдаланамыз:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Қызметтер көрсету және өтініштерді өңдеу</li>
                <li>Пайдаланушымен байланыс орнату</li>
                <li>Платформаның жұмысын жақсарту</li>
                <li>Заңды талаптарды орындау</li>
                <li>Қауіпсіздікті қамтамасыз ету</li>
                <li>Статистикалық талдау жүргізу</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">4. Деректерді бөлісу</h2>
              <p className="mb-4">
                Біз сіздің жеке деректеріңізді үшінші тараптармен бөліспейміз, тек келесі жағдайларда:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Сіздің нақты келісіміңізбен</li>
                <li>Заңды талаптар бойынша</li>
                <li>Қызмет көрсетушілермен (шифрланған түрде)</li>
                <li>Қауіпсіздікті қамтамасыз ету үшін</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">5. Деректерді қорғау</h2>
              <p className="mb-4">Біз сіздің деректеріңізді қорғау үшін келесі шараларды қолданамыз:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>SSL шифрлау технологиясы</li>
                <li>Қауіпсіз серверлер</li>
                <li>Кіру құқықтарын шектеу</li>
                <li>Тұрақты қауіпсіздік аудиті</li>
                <li>Деректерді резервтік көшіру</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">6. Сіздің құқықтарыңыз</h2>
              <p className="mb-4">Сіздің келесі құқықтарыңыз бар:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Жеке деректеріңізге қол жеткізу</li>
                <li>Деректерді түзету немесе жаңарту</li>
                <li>Деректерді жою талабы</li>
                <li>Өңдеуге қарсылық білдіру</li>
                <li>Деректерді көшіру</li>
                <li>Шағымдану</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">7. Cookies және трекинг</h2>
              <p className="mb-4">
                Біз сайттың жұмысын жақсарту үшін cookies пайдаланамыз. Сіз браузер параметрлері
                арқылы cookies-ті басқара аласыз.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">8. Деректерді сақтау мерзімі</h2>
              <p className="mb-4">
                Жеке деректер заңды талаптарға сәйкес немесе қызмет көрсету мақсаттары үшін
                қажетті мерзімде сақталады.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">9. Байланыс</h2>
              <p className="mb-4">
                Құпиялылық саясаты туралы сұрақтарыңыз болса, бізбен байланысыңыз:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Деректерді қорғау жөніндегі маман:</strong></p>
                <p><strong>Электрондық пошта:</strong> privacy@bilimcert.kz</p>
                <p><strong>Телефон:</strong> +7 (7172) 123-456</p>
                <p><strong>Мекенжай:</strong> Нұр-Сұлтан қ., Мәңгілік Ел даңғылы, 123</p>
              </div>
            </section>

            <div className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-600 text-center">
                © 2024 BilimCert. Барлық құқықтар қорғалған.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
