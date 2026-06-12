import Image from "next/image"
import { Award, BookOpen, Users, Target, TrendingUp, Shield, CheckCircle2, Star } from "lucide-react"

const credentials = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "Certificate of Completion",
    subtitle: "Creative Technology Of Trading",
    detail: "Held on 16 July 2022",
    color: "text-sky-400",
    border: "border-sky-400/30",
    bg: "bg-sky-400/5",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Certificate of Appreciation",
    subtitle: "A.T PVT LTD — For effortless contribution towards company goals",
    detail: "Month of July — Issued by Director Pardeep Kumar Gupta",
    color: "text-gold",
    border: "border-gold/30",
    bg: "bg-gold/5",
  },
]

const highlights = [
  { icon: <TrendingUp className="w-4 h-4" />, text: "5+ years of active stock market trading experience" },
  { icon: <BookOpen className="w-4 h-4" />, text: "Trained 10,000+ students across India online & offline" },
  { icon: <Users className="w-4 h-4" />, text: "Community of traders learning together daily" },
  { icon: <Target className="w-4 h-4" />, text: "Specialised in Technical Analysis & Price Action" },
  { icon: <Shield className="w-4 h-4" />, text: "Proven risk management frameworks taught in every course" },
  { icon: <CheckCircle2 className="w-4 h-4" />, text: "4.6 ★ rated platform trusted by thousands of traders" },
]

const values = [
  {
    title: "Structured Learning",
    description: "Every course follows a step-by-step curriculum — from fundamentals to advanced strategies — so nothing is left to chance.",
  },
  {
    title: "Real-World Application",
    description: "We teach only what works in live markets. Every concept is backed by real chart examples, live trade reviews, and practical exercises.",
  },
  {
    title: "Lifelong Mentorship",
    description: "Learning does not end after the course. Our community stays active, and Rajeev is personally accessible for guidance via WhatsApp and Telegram.",
  },
  {
    title: "Honest Education",
    description: "No shortcuts, no 'get rich quick' promises. We believe in disciplined, consistent trading built on knowledge, patience, and a rock-solid plan.",
  },
]

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden scroll-mt-20"
      aria-label="About Us"
    >
      {/* Decorative accent lines */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 25%), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 25%), transparent)" }}
        aria-hidden="true"
      />
      {/* Subtle bg glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.14 85) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4">
            Who Is <span className="text-gold">Tradeverse City?</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto text-pretty">
            Tradeverse City is a premium stock market education platform founded by{" "}
            <span className="text-foreground font-semibold">Rajeev Bair</span> — a passionate trader and educator dedicated to building India&apos;s next generation of disciplined, profitable traders.
          </p>
        </div>

        {/* Founder section: two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Left — story */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/tradeverse-city-logo.png"
                    alt="Tradeverse City Logo"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Founder & Head Mentor</p>
                  <h3 className="text-2xl font-extrabold text-foreground">Rajeev Bair</h3>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Rajeev Bair started his journey in the Indian stock market over 5 years ago — not as an investor, but as a student of the market, determined to understand every nuance of price movement, volume, and trading psychology. What began as a personal quest for financial independence grew into a calling to teach others.
              </p>
              <p>
                After years of live trading, self-study, and certified training in Creative Technology of Trading, Rajeev founded{" "}
                <span className="text-foreground font-semibold">Tradeverse City</span> — a place where aspiring traders could learn a structured, honest, and practical approach to the markets.
              </p>
              <p>
                Today, Tradeverse City has trained{" "}
                <span className="text-gold font-bold">10,000+ students</span> across India through online and offline programs, covering everything from Candlestick Analysis and Price Action to Risk Management and Trading Psychology. The platform is rated{" "}
                <span className="text-gold font-bold">4.6 out of 5</span> by its students — a testament to its quality and impact.
              </p>
              <p>
                Rajeev personally mentors every batch, ensuring that students do not just learn theory but develop the mindset, discipline, and real-world skills to trade confidently in live markets. His philosophy is simple:{" "}
                <span className="text-foreground font-semibold italic">"Learn right, plan smart, trade with discipline — profit will follow."</span>
              </p>
            </div>

            {/* Highlights list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2" role="list">
              {highlights.map((h) => (
                <li key={h.text} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <span className="text-gold mt-0.5 flex-shrink-0">{h.icon}</span>
                  <span className="leading-relaxed">{h.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — certificates */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Certifications &amp; Recognition</h4>

            {/* Cert credential cards */}
            <div className="flex flex-col gap-4">
              {credentials.map((c) => (
                <div
                  key={c.title}
                  className={`flex items-start gap-4 p-4 rounded-xl border ${c.border} ${c.bg}`}
                >
                  <div className={`mt-0.5 flex-shrink-0 ${c.color}`}>{c.icon}</div>
                  <div>
                    <p className={`text-sm font-bold ${c.color}`}>{c.title}</p>
                    <p className="text-xs text-foreground font-medium mt-0.5">{c.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificate images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <figure className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <Image
                  src="/certificate-completion.jpg"
                  alt="Certificate of Completion — Rajeev Bair, Creative Technology Of Trading, 16 July 2022"
                  width={600}
                  height={420}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="text-[10px] text-muted-foreground text-center py-2 px-3 bg-card border-t border-border">
                  Certificate of Completion — Creative Technology Of Trading (2022)
                </figcaption>
              </figure>
              <figure className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <Image
                  src="/certificate-appreciation.jpg"
                  alt="Certificate of Appreciation — Rajeev Bair, A.T PVT LTD, Director Pardeep Kumar Gupta"
                  width={600}
                  height={420}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="text-[10px] text-muted-foreground text-center py-2 px-3 bg-card border-t border-border">
                  Certificate of Appreciation — A.T PVT LTD
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance mb-2">
              Our Mission &amp; Values
            </h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              Everything we do at Tradeverse City is driven by one goal — to empower every student with the tools, knowledge, and confidence to trade profitably and independently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card/60 hover:border-gold/30 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-xs font-extrabold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">{v.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border border-border bg-card/40">
          {[
            { value: "10,000+", label: "Students Trained" },
            { value: "14+", label: "Structured Courses" },
            { value: "5+", label: "Years of Experience" },
            { value: "4.6 ★", label: "Average Student Rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-gold">{stat.value}</span>
              <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
