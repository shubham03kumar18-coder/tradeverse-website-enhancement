"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import CourseModal, { type CourseDetail } from "@/components/course-modal"

const PHONE = "919318336747"

const COURSE_SLUGS: Record<string, string> = {
  "Stock Market Fundamentals": "stock-market-fundamentals",
  "Candlestick Analysis": "candlestick-analysis",
  "Price Action Trading": "price-action-trading",
  "Swing Trading": "swing-trading",
  "Intraday Trading": "intraday-trading",
  "Options Trading Fundamentals": "options-trading-fundamentals",
  "Risk Management": "risk-management",
  "Trading Psychology": "trading-psychology",
}

const courses: CourseDetail[] = [
  {
    title: "Stock Market Fundamentals",
    level: "Beginner",
    levelColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    duration: "30 Days",
    description: "Complete A-to-Z foundation of how stock markets work — perfect for absolute beginners.",
    bullets: [
      "BSE/NSE structure and how markets operate",
      "Demat account setup and order types explained",
      "Sensex/Nifty basics and index reading",
      "Introduction to candlestick charts",
      "Trading vs investing — key differences",
    ],
    whoFor: "Complete beginners with zero market knowledge",
    waText: `Hi!%20I'm%20interested%20in%20the%20%22Stock%20Market%20Fundamentals%22%20course.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%F0%9F%93%8A`,
  },
  {
    title: "Candlestick Analysis",
    level: "Intermediate",
    levelColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    duration: "45 Days",
    description: "Master 20+ candlestick patterns used by professional traders worldwide.",
    bullets: [
      "Doji, Hammer, Engulfing patterns",
      "Morning Star, Evening Star, Shooting Star",
      "Harami and Three White Soldiers",
      "Pattern psychology — why they work",
      "Combining patterns with trend analysis",
    ],
    whoFor: "Beginners who already know market basics",
    waText: `Hi!%20I'm%20interested%20in%20the%20%22Candlestick%20Analysis%22%20course.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%F0%9F%95%AF`,
  },
  {
    title: "Price Action Trading",
    level: "Advanced",
    levelColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    duration: "60 Days",
    description: "Trade purely with price — no indicators needed. The cleanest edge in markets.",
    bullets: [
      "Pin bars, inside bars, fakey patterns",
      "Support & resistance flips",
      "Trend structure and market phases",
      "Multi-timeframe analysis technique",
      "Precise entry and exit discipline",
    ],
    whoFor: "Intermediate traders ready to go indicator-free",
    waText: `Hi!%20I'm%20interested%20in%20%22Price%20Action%20Trading%22.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%F0%9F%93%88`,
  },
  {
    title: "Swing Trading",
    level: "Intermediate",
    levelColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    duration: "45 Days",
    description: "Capture multi-day market moves with high risk-to-reward setups.",
    bullets: [
      "Swing highs and lows identification",
      "Pullback entry techniques",
      "Target setting and risk-reward ratios",
      "Position sizing for swing trades",
      "Overnight risk management rules",
    ],
    whoFor: "Those who cannot watch markets all day",
    waText: `Hi!%20I'm%20interested%20in%20the%20%22Swing%20Trading%22%20course.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%F0%9F%8C%8A`,
  },
  {
    title: "Intraday Trading",
    level: "Advanced",
    levelColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    duration: "60 Days",
    description: "Profit from same-day market moves with a systematic, rules-based approach.",
    bullets: [
      "Opening range breakout strategy",
      "VWAP trading technique",
      "Scalping and momentum trading",
      "Intraday risk rules and position limits",
      "Exit discipline and trade journaling",
    ],
    whoFor: "Active traders with market hours availability",
    waText: `Hi!%20I'm%20interested%20in%20%22Intraday%20Trading%22.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%E2%9A%A1`,
  },
  {
    title: "Options Trading Fundamentals",
    level: "Advanced",
    levelColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    duration: "90 Days",
    description: "Master derivatives — India's most powerful and misunderstood instrument.",
    bullets: [
      "Calls and Puts explained from scratch",
      "Option Greeks — Delta, Theta, Vega, Gamma",
      "Buying vs selling strategies",
      "Spreads and hedging techniques",
      "Expiry strategies and index options",
    ],
    whoFor: "Traders with a technical analysis background",
    waText: `Hi!%20I'm%20interested%20in%20%22Options%20Trading%20Fundamentals%22.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%F0%9F%8E%AF`,
  },
  {
    title: "Risk Management",
    level: "All Levels",
    levelColor: "text-gold bg-gold/10 border-gold/20",
    duration: "30 Days",
    description: "The most critical skill every trader needs — protect and grow your capital.",
    bullets: [
      "The 1% risk rule and why it works",
      "Position sizing formula for any account",
      "Stop-loss placement strategies",
      "Drawdown management and recovery",
      "Portfolio allocation across instruments",
    ],
    whoFor: "Every trader at every experience level",
    waText: `Hi!%20I'm%20interested%20in%20the%20%22Risk%20Management%22%20course.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%F0%9F%9B%A1`,
  },
  {
    title: "Trading Psychology",
    level: "All Levels",
    levelColor: "text-gold bg-gold/10 border-gold/20",
    duration: "30 Days",
    description: "Build the mindset of a consistently profitable trader — master your emotions.",
    bullets: [
      "Overcome FOMO and impulse trading",
      "Control revenge trading after losses",
      "Trade journaling for self-improvement",
      "Building and following a trading plan",
      "Loss acceptance and confidence building",
    ],
    whoFor: "Anyone struggling with emotional trading decisions",
    waText: `Hi!%20I'm%20interested%20in%20%22Trading%20Psychology%22.%20Please%20share%20details%2C%20fees%20%26%20batch%20schedule.%20%F0%9F%A7%A0`,
  },
]

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null)

  return (
    <section
      id="courses"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-40"
      style={{ background: "oklch(0.10 0 0)" }}
      aria-label="14 In-Depth Trading Courses"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 30%), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            Structured Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4">
            14 In-Depth Trading Courses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed text-pretty">
            From foundational concepts to advanced strategies — click any course to see full details and enroll.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => {
            const slug = COURSE_SLUGS[course.title]
            return (
              <div
                key={course.title}
                className="group flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card/60 card-glow transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground leading-snug text-balance">{course.title}</h3>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{course.description}</div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${course.levelColor}`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-border">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-gold transition-colors duration-150 py-1.5"
                    aria-label={`Quick view ${course.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    Quick View
                  </button>
                  {slug && (
                    <Link
                      href={`/courses/${slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gold hover:opacity-80 transition-opacity duration-150 py-1.5"
                      aria-label={`Full details for ${course.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      Full Details
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href={`https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.%0A%0APlease%20share%20the%20complete%20course%20details%2C%20fees%2C%20and%20next%20batch%20date.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-background font-bold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-gold/25 text-sm"
          >
            View All 14 Courses
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </section>
  )
}
