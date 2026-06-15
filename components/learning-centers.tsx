import Link from "next/link"
import { BookOpen, BarChart2, Brain, Shield, Library, Search, Users, ArrowRight, MessageCircle } from "lucide-react"

const PHONE = "919318336747"
const WA_ALL = `https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.`

const centers = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Beginner Hub",
    slug: "beginner-hub",
    desc: "Start your trading journey with structured fundamentals and guided learning paths.",
    tag: "Foundation",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Technical Analysis Center",
    slug: "technical-analysis-center",
    desc: "Master chart reading, indicators, and price pattern recognition.",
    tag: "Core Skill",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Trading Psychology Center",
    slug: "trading-psychology-center",
    desc: "Develop the mental discipline and emotional control every successful trader needs.",
    tag: "Mindset",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Management Center",
    slug: "risk-management-center",
    desc: "Learn to protect capital and manage risk with precision at every trade.",
    tag: "Protection",
  },
  {
    icon: <Library className="w-6 h-6" />,
    title: "Learning Resources Library",
    slug: "learning-resources-library",
    desc: "Every book, tool, and guide a trader needs — curated in one place.",
    tag: "Resources",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Market Research Center",
    slug: "market-research-center",
    desc: "Conduct thorough market analysis and build data-driven trading decisions.",
    tag: "Research",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Learning Hub",
    slug: "community-learning-hub",
    desc: "Learn alongside fellow traders, share insights, and grow together.",
    tag: "Community",
  },
]

export default function LearningCenters() {
  return (
    <section
      id="learning-centers"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden scroll-mt-40"
      aria-label="Comprehensive Learning Platform"
    >
      {/* top separator glow */}
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
            <div
              key={center.title}
              className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm card-glow transition-all duration-300 hover:-translate-y-1"
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

              {/* Actions */}
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border">
                <Link
                  href={`/learning/${center.slug}`}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-gold hover:opacity-80 transition-opacity duration-150 py-1.5"
                  aria-label={`Explore ${center.title}`}
                >
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  Explore Center
                </Link>
                <a
                  href={`https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(center.title)}.%20Please%20share%20more%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-gold transition-colors duration-150 py-1.5"
                  aria-label={`WhatsApp enquiry about ${center.title}`}
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Enquire
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <a
            href={WA_ALL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold/40 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all duration-200 text-sm"
          >
            Enquire About All Learning Centers
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
