import { BookOpen, BarChart2, Brain, Shield, Search, Users, ArrowRight } from "lucide-react"

const centers = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Beginner Hub",
    desc: "Start your trading journey with structured fundamentals and guided learning paths.",
    tag: "Foundation",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Technical Analysis Center",
    desc: "Master chart reading, indicators, and price pattern recognition.",
    tag: "Core Skill",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Trading Psychology Center",
    desc: "Develop the mental discipline and emotional control every successful trader needs.",
    tag: "Mindset",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Management Center",
    desc: "Learn to protect capital and manage risk with precision at every trade.",
    tag: "Protection",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Market Research Center",
    desc: "Conduct thorough market analysis and build data-driven trading decisions.",
    tag: "Research",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Learning Hub",
    desc: "Learn alongside fellow traders, share insights, and grow together.",
    tag: "Community",
  },
]

export default function LearningCenters() {
  return (
    <section
      id="learning-centers"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
      aria-label="Comprehensive Learning Platform"
    >
      {/* Subtle top separator glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 40%), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            Our Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4">
            Comprehensive Learning Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed text-pretty">
            Seven dedicated learning centers, each focused on a critical pillar of trading mastery.
            Navigate your learning journey with purpose.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {centers.map((center, i) => (
            <a
              key={center.title}
              href="#contact"
              className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm card-glow transition-all duration-300 hover:-translate-y-1"
              aria-label={`${center.title}: ${center.desc}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-gold/60 bg-gold/5 border border-gold/10 px-2.5 py-1 rounded-full">
                  {center.tag}
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/15 transition-colors duration-300">
                {center.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-bold text-foreground mb-2 text-balance">{center.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{center.desc}</p>
              </div>

              {/* Explore link */}
              <div className="flex items-center gap-1.5 text-gold text-sm font-semibold mt-auto pt-2 group-hover:gap-3 transition-all duration-200">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold/40 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all duration-200 text-sm"
          >
            View All Learning Centers
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
