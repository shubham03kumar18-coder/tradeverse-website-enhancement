import NavbarWrapper from "@/components/navbar-wrapper"
import BatchCountdown from "@/components/batch-countdown"
import MarketTicker from "@/components/market-ticker"
import Hero from "@/components/hero"
import LearningCenters from "@/components/learning-centers"
import Courses from "@/components/courses"
import WhyUs from "@/components/why-us"
import AboutUs from "@/components/about"
import Testimonials from "@/components/testimonials"
import LeadCaptureForm from "@/components/lead-capture-form"
import QuickQuestions from "@/components/quick-questions"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import ExitIntentPopup from "@/components/exit-intent-popup"

export default function Page() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Fixed header stack: Navbar → Batch countdown → Market ticker */}
      <NavbarWrapper />

      {/* Sticky bars below navbar */}
      <div className="fixed top-16 left-0 right-0 z-40 flex flex-col">
        <BatchCountdown />
        <MarketTicker />
      </div>

      {/* Push content below fixed bars (navbar 64px + countdown ~44px + ticker 36px = ~144px) */}
      <div className="h-[144px]" aria-hidden="true" />

      <Hero />
      <LearningCenters />
      <Courses />
      <WhyUs />
      <AboutUs />
      <Testimonials />
      <LeadCaptureForm />
      <QuickQuestions />
      <Footer />

      {/* Floating elements */}
      <FloatingButtons />
      <ExitIntentPopup />
    </main>
  )
}
