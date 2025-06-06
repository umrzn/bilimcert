import { PageLayout } from '@/components/layout/PageLayout'
import { TranslatedText } from '@/components/ui/TranslatedText'

export const metadata = {
  title: 'Қызмет көрсету шарттары | BilimCert',
  description: 'BilimCert платформасының қызмет көрсету шарттары мен ережелері',
}

export default function TermsPage() {
  const breadcrumbs = [
    { title: 'Басты бет', href: '/', translationKey: 'header.home' },
    { title: 'Қызмет көрсету шарттары', translationKey: 'footer.terms' }
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Қызмет көрсету шарттары
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Соңғы жаңарту: 2024 жылдың 1 қаңтары
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-400 dark:border-blue-500 p-6 mb-8 transition-colors duration-200">
              <p className="text-blue-800 dark:text-blue-300">
                <strong>Маңызды ескерту:</strong> Осы қызмет көрсету шарттарын мұқият оқып шығыңыз.
                BilimCert платформасын пайдалану арқылы сіз осы шарттармен келісетініңізді білдіресіз.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">1. Жалпы ережелер</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Осы Қызмет көрсету шарттары ("Шарттар") BilimCert платформасын ("Қызмет") пайдалануды реттейді.
                Қызметті пайдалану арқылы сіз осы Шарттармен келісетініңізді растайсыз.
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                BilimCert - Қазақстан Республикасының білім сапасын бағалау орталығының ресми платформасы болып табылады.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">2. Қызметтер</h2>
              <p className="mb-4">BilimCert келесі қызметтерді ұсынады:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Шетелдік білім туралы құжаттарды тану</li>
                <li>Білім беру бағдарламаларын аккредиттеу</li>
                <li>Болон процесі бойынша ақпарат және қолдау</li>
                <li>Білім беру сапасын бағалау</li>
                <li>Консультациялық қызметтер</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">3. Пайдаланушы міндеттемелері</h2>
              <p className="mb-4">Платформаны пайдалану кезінде сіз міндеттенесіз:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Дұрыс және толық ақпарат беру</li>
                <li>Жалған құжаттар ұсынбау</li>
                <li>Басқа пайдаланушылардың құқықтарын құрметтеу</li>
                <li>Қолданыстағы заңнаманы сақтау</li>
                <li>Платформаның қауіпсіздігін бұзбау</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">4. Жеке деректерді қорғау</h2>
              <p className="mb-4">
                Біз сіздің жеке деректеріңізді қорғауды маңызды деп санаймыз. Жеке деректерді өңдеу туралы
                толық ақпаратты біздің <a href="/privacy" className="text-[#FF6600] hover:underline">Құпиялылық саясатында</a> табуға болады.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">5. Зияткерлік меншік</h2>
              <p className="mb-4">
                Платформадағы барлық мазмұн, соның ішінде мәтіндер, суреттер, логотиптер, дизайн элементтері
                BilimCert-тің немесе оның серіктестерінің зияткерлік меншігі болып табылады.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">6. Жауапкершіліктің шектелуі</h2>
              <p className="mb-4">
                BilimCert платформаны "қалдығы бойынша" ұсынады және қызметтердің үздіксіздігі,
                қателердің болмауы немесе нақты мақсаттарға сәйкестігі туралы кепілдік бермейді.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">7. Шарттарға өзгерістер</h2>
              <p className="mb-4">
                BilimCert осы Шарттарды кез келген уақытта өзгерту құқығын сақтайды.
                Өзгерістер платформада жарияланған сәттен бастап күшіне енеді.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#003366] mb-4">8. Байланыс ақпараты</h2>
              <p className="mb-4">
                Осы Шарттар туралы сұрақтарыңыз болса, бізбен байланысыңыз:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Электрондық пошта:</strong> info@bilimcert.kz</p>
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
