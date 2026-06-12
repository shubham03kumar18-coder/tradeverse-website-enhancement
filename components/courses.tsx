import { ArrowRight } from "lucide-react"

const courses = [
  { title: "Stock Market Fundamentals", level: "Beginner", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  { title: "Candlestick Analysis", level: "Intermediate", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  { title: "Price Action Trading", level: "Advanced", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  { title: "Swing Trading", level: "Intermediate", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  { title: "Intraday Trading", level: "Advanced", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  { title: "Options Trading Fundamentals", level: "Advanced", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  { title: "Risk Management", level: "All Levels", color: "text-gold bg-gold/10 border-gold/20" },
  { title: "Trading Psychology", level: "All Levels", color: "text-gold bg-gold/10 border-gold/20" },
]

export default function Courses() {
  return (
    <section
      id="courses"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "oklch(0.10 0 0)" }}
      aria-label="14 In-Depth Trading Courses"
    >
      {/* Decorative line */}
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
            From foundational concepts to advanced trading strategies — our course library covers
            every dimension of successful trading.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course, i) => (
            <a
              key={course.title}
              href="#contact"
              className="group flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card/60 card-glow transition-all duration-300 hover:-translate-y-1"
              aria-label={`${course.title} - ${course.level} level`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-foreground leading-snug text-balance">{course.title}</h3>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${course.color}`}>
                  {course.level}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-background font-bold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-gold/25 text-sm"
          >
            View All 14 Courses
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
