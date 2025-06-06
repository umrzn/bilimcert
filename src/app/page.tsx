import { FullWidthHeader } from '@/components/layout/FullWidthHeader'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HeroSection } from '@/components/sections/HeroSection'
import { QuickAccessSection } from '@/components/sections/QuickAccessSection'
import { NewsSection } from '@/components/sections/NewsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { QuickLinksSection } from '@/components/sections/QuickLinksSection'
import { FeatureSection } from '@/components/sections/FeatureSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { Footer } from '@/components/layout/Footer'
import { ChatButton } from '@/components/ui/ChatButton'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'

export default function Home() {
  return (
    <MobileMenuProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#003366]/5 dark:bg-blue-500/10 rounded-bl-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#FF6600]/5 dark:bg-orange-500/10 rounded-tr-[70px]" />
        </div>

        <FullWidthHeader />

        {/* Mobile Menu - Rendered at the root level */}
        <MobileMenu />

        <main className="flex-1">
          <div className="container mx-auto w-[90%] max-w-[1400px]">
            <Breadcrumbs items={[{ title: "Home", href: "/", translationKey: "header.home" }]} />
          </div>
          <HeroSection />
          <div className="container mx-auto w-[90%] max-w-[1400px]">
            <QuickAccessSection />
          </div>
          <NewsSection />
          <div className="container mx-auto w-[90%] max-w-[1400px]">
            <FeatureSection />
          </div>
          <FAQSection />
          <ContactSection />
          <div className="container mx-auto w-[90%] max-w-[1400px]">
            <QuickLinksSection />
          </div>
          <TestimonialSection />
          <PartnersSection />
        </main>

        <Footer />
        <ChatButton />
      </div>
    </MobileMenuProvider>
  )
}
