import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle, Send, ArrowRight, CheckCircle2, AlertTriangle, Target, TrendingUp, BookOpen, Lightbulb } from "lucide-react"
import SubPageLayout from "@/components/sub-page-layout"
import FAQAccordion from "@/components/faq-accordion"
import { TRADING_COURSES_DATA } from "@/lib/courses-data"
import { LEARNING_HUBS, makeWA, TG_LINK } from "@/lib/constants"

interface Params {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return TRADING_COURSES_DATA.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const course = TRADING_COURSES_DATA.find((c) => c.slug === slug)
  if (!course) return {}
  return {
    title: `${course.title} | Tradeverse City`,
    description: course.intro.slice(0, 155),
    keywords: [
      "tradeverse city",
      course.title.toLowerCase(),
      "stock market",
      "trading course",
      "learn trading india",
      course.category.toLowerCase(),
    ],
    openGraph: {
      title: `${course.title} | Tradeverse City`,
      description: course.intro.slice(0, 155),
      siteName: "Tradeverse City",
    },
  }
}

export default async function CourseDetailPage({ params }: Params) {
  const { slug } = await params
  const course = TRADING_COURSES_DATA.find((c) => c.slug === slug)
  if (!course) notFound()

  const waLink = makeWA(
    `I am interested in the "${course.title}" course at Tradeverse City. Please share complete details, fees, schedule, and how to enroll.`
  )

  return (
    <SubPageLayout backHref="/" backLabel="Home" topic={course.title}>
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
        {/* Grid background */}
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
          {/* Category badge */}
          <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            {course.category}
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
              <path d={course.heroIcon} />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4 leading-tight">
            {course.title}
          </h1>
          <p className="text-gold font-semibold text-base md:text-lg mb-6 tracking-wide">
            {course.tagline}
          </p>
          <p className="text-muted-foreground text-base leading-relaxed text-pretty max-w-2xl mx-auto mb-10">
            {course.intro}
          </p>

          {/* Enquiry nudge */}
          <p className="text-xs text-muted-foreground mb-8 text-pretty max-w-sm mx-auto">
            Connect with us for batch schedules, personalised mentorship, and everything you need to enrol with clarity.
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

      {/* What You Will Learn */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="learn-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Curriculum
            </span>
            <h2 id="learn-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              What You Will Learn
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.whatYouWillLearn.map((item, i) => (
              <div
                key={i}
                className="flex gap-3.5 p-4 rounded-xl border border-border bg-card/60 hover:border-gold/30 transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 font-bold text-gold text-xs mt-0.5"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Skill Matters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background" aria-labelledby="why-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Why It Matters
            </span>
            <h2 id="why-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Why This Skill Matters
            </h2>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-card/60 p-8">
            <div className="flex gap-4">
              <div
                className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <Lightbulb className="w-5 h-5 text-gold" />
              </div>
              <p className="text-base text-muted-foreground leading-relaxed text-pretty">{course.whyItMatters}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Market Applications */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="applications-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Practical Application
            </span>
            <h2 id="applications-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Real Market Applications
            </h2>
            <p className="text-muted-foreground text-sm mt-3 text-pretty">
              How the concepts from this course apply directly in Indian markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {course.realMarketApplications.map((app, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border bg-card/60 card-glow hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <TrendingUp className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug pt-1">{app.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-11">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background" aria-labelledby="outcomes-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              After This Course
            </span>
            <h2 id="outcomes-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Learning Outcomes
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {course.learningOutcomes.map((outcome, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card/60 hover:border-gold/30 transition-all duration-200"
              >
                <div
                  className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <Target className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="mistakes-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              What to Avoid
            </span>
            <h2 id="mistakes-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Common Mistakes in This Area
            </h2>
            <p className="text-muted-foreground text-sm mt-3 text-pretty">
              Tradeverse City teaches you to avoid these costly errors before they affect your capital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {course.commonMistakes.map((mistake, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl border border-border bg-card/60 hover:border-red-500/20 transition-all duration-200"
              >
                <div
                  className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{mistake.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{mistake.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Learning Hubs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background" aria-labelledby="related-courses-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Continue Learning
            </span>
            <h2 id="related-courses-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Related Courses
            </h2>
            <p className="text-muted-foreground text-sm mt-3 text-pretty">
              Build on what you learn here by exploring these related courses at Tradeverse City.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            {course.relatedCourses.map((rc) => {
              const relatedCourse = TRADING_COURSES_DATA.find((c) => c.slug === rc.slug)
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
                    {relatedCourse && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {relatedCourse.tagline}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                </Link>
              )
            })}
          </div>

          {/* Link to Learning Platform */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for conceptual learning resources?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              {LEARNING_HUBS.slice(0, 3).map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/learning/${hub.slug}`}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/40 hover:border-gold/30 hover:bg-card text-sm text-muted-foreground hover:text-gold transition-all duration-200"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  {hub.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] tracking-[0.35em] text-gold font-semibold uppercase mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              FAQs
            </span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion items={course.faqs} />

          {/* Bottom CTA after FAQs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
    </SubPageLayout>
  )
}
