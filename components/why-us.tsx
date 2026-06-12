import { CheckCircle, TrendingUp, BarChart2, Shield, Brain, Activity } from "lucide-react"

const features = [
  "Structured, progressive curriculum from beginner to advanced",
  "Real market applications with live chart analysis",
  "Psychology and risk management integrated throughout",
  "Dedicated support via WhatsApp and Telegram",
  "Community of active traders for peer learning",
  "Regular market research and analysis updates",
]

const pillars = [
  {
    number: "01",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Market Fundamentals",
    desc: "Understand stocks, indices, futures & market structure",
  },
  {
    number: "02",
    icon: <BarChart2 className="w-5 h-5" />,
    title: "Technical Analysis",
    desc: "Charts, patterns, indicators & price action",
  },
  {
    number: "03",
    icon: <Shield className="w-5 h-5" />,
    title: "Risk Management",
    desc: "Position sizing, stop loss & capital protection",
  },
  {
    number: "04",
    icon: <Brain className="w-5 h-5" />,
    title: "Trading Psychology",
    desc: "Discipline, patience & emotional control",
  },
  {
    number: "05",
    icon: <Activity className="w-5 h-5" />,
    title: "Live Market Trading",
    desc: "Apply skills in real market conditions",
  },
]

export default function WhyUs() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden scroll-mt-40"
      aria-label="Why Choose Tradeverse City"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 30%), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4">
            The Tradeverse City Difference
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base text-pretty">
              We don&apos;t just teach trading theory — we build trading professionals. Every course
              at Tradeverse City is built around real market applications, practical exercises,
              and mentorship that follows you through your journey.
            </p>
            <ul className="space-y-3" role="list">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — pillars */}
          <div className="flex flex-col gap-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card/60 card-glow transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 text-gold shrink-0 group-hover:bg-gold/15 transition-colors">
                  {p.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-gold/50 tracking-widest">{p.number}</span>
                    <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
