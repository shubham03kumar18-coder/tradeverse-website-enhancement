import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import LearningCenters from "@/components/learning-centers"
import Courses from "@/components/courses"
import WhyUs from "@/components/why-us"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <LearningCenters />
      <Courses />
      <WhyUs />
      <Testimonials />
      <Footer />
    </main>
  )
}
