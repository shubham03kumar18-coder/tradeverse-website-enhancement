import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle, Send, ArrowRight, BookOpen, CheckCircle2, Users, Star } from "lucide-react"
import SubPageLayout from "@/components/sub-page-layout"
import FAQAccordion from "@/components/faq-accordion"
import { LEARNING_HUBS_DATA } from "@/lib/learning-data"
import { TRADING_COURSES, makeWA, TG_LINK } from "@/lib/constants"

interface Params {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return LEARNING_HUBS_DATA.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const hub = LEARNING_HUBS_DATA.find((h) => h.slug === slug)
  if (!hub) return {}
  return {
    title: `${hub.title} | Tradeverse City`,
    description: hub.intro.slice(0, 155),
    keywords: ["tradeverse city", hub.title.toLowerCase(), "stock market", "trading education", "learn trading india"],
  }
}

export default async function LearningHubPage({ params }: Params) {
  const { slug } = await params
  const hub = LEARNING_HUBS_DATA.find((h) => h.slug === slug)
  if (!hub) notFound()

  const waLink = makeWA(
    `I am interested in the ${hub.title} at Tradeverse City. Please share complete details, schedule, and how to join.`
  )

  return (
    <SubPageLayout backHref="/" backLabel="Home" topic={hub.title}>
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.78 0.14 85) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.14 85) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, oklch(0.78 0.14 85) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-6 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            Learning Platform
          </span>

          {/* SVG icon */}
          <div
            className="w-16 h-16 rounded-2xl border border-gold/20 bg-gold/10 flex items-center justify-center mx-auto mb-6"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="oklch(0.78 0.14 85)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d={hub.heroIcon} />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4 leading-tight">
            {hub.title}
          </h1>
          <p className="text-gold font-semibold text-base md:text-lg mb-6 tracking-wide">{hub.tagline}</p>
          <p className="text-muted-foreground text-base leading-relaxed text-pretty max-w-2xl mx-auto mb-10">
            {hub.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 20px rgba(37,211,102,0.25)" }}
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp Enquiry
            </a>
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
              style={{ background: "#229ED9", color: "#fff", boxShadow: "0 4px 20px rgba(34,158,217,0.25)" }}
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              Telegram Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="benefits-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Student Benefits
            </span>
            <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              What You Gain from This Center
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hub.benefits.map((b, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl border border-border bg-card/60 card-glow transition-all duration-300"
              >
                <div
                  className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Content — Topics Covered */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background" aria-labelledby="topics-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Curriculum
            </span>
            <h2 id="topics-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              What You Will Study
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hub.topics.map((t, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl border border-border bg-card/60 hover:border-gold/30 transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 font-bold text-gold text-xs mt-0.5"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{t.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Learning Cards — Related Courses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="related-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Continue Learning
            </span>
            <h2 id="related-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Related Trading Courses
            </h2>
            <p className="text-muted-foreground text-sm mt-3 text-pretty">
              Deepen your knowledge by exploring these related courses at Tradeverse City.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            {hub.relatedCourses.map((rc) => {
              const course = TRADING_COURSES.find((c) => c.slug === rc.slug)
              return (
                <Link
                  key={rc.slug}
                  href={`/courses/${rc.slug}`}
                  className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-card/60 hover:border-gold/40 hover:bg-card transition-all duration-200 sm:w-72"
                >
                  <div>
                    <p className="font-semibold text-sm text-foreground group-hover:text-gold transition-colors duration-150">
                      {rc.label}
                    </p>
                    {course && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{course.desc}</p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              FAQs
            </span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion items={hub.faqs} />
        </div>
      </section>
    </SubPageLayout>
  )
}
