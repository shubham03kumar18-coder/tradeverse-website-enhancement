import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Send, AtSign, Phone, MapPin } from "lucide-react"

const PHONE = "919318336747"
const PHONE_DISPLAY = "+91 93183 36747"
const WA_CTA = `https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.`
const TG_LINK = `https://t.me/+${PHONE}`
const IG_LINK = "https://instagram.com/TRADEVERSE_CITY"
const TEL_LINK = `tel:+${PHONE}`

const learningLinks = [
  { label: "Beginner Hub", href: "/learning/beginner-hub" },
  { label: "Technical Analysis Center", href: "/learning/technical-analysis-center" },
  { label: "Trading Psychology Center", href: "/learning/trading-psychology-center" },
  { label: "Risk Management Center", href: "/learning/risk-management-center" },
  { label: "Learning Resources Library", href: "/learning/learning-resources-library" },
  { label: "Market Research Center", href: "/learning/market-research-center" },
  { label: "Community Learning Hub", href: "/learning/community-learning-hub" },
]

const courseLinks = [
  { label: "Stock Market Fundamentals", href: "/courses/stock-market-fundamentals" },
  { label: "Candlestick Analysis", href: "/courses/candlestick-analysis" },
  { label: "Support & Resistance", href: "/courses/support-and-resistance" },
  { label: "Trend Analysis", href: "/courses/trend-analysis" },
  { label: "Technical Analysis", href: "/courses/technical-analysis" },
  { label: "Price Action Trading", href: "/courses/price-action-trading" },
  { label: "Swing Trading", href: "/courses/swing-trading" },
  { label: "Intraday Trading", href: "/courses/intraday-trading" },
  { label: "Risk Management", href: "/courses/risk-management" },
]

const moreLinks = [
  { label: "Trading Psychology", href: "/courses/trading-psychology" },
  { label: "Options Trading Fundamentals", href: "/courses/options-trading-fundamentals" },
  { label: "Futures Market Basics", href: "/courses/futures-market-basics" },
  { label: "Portfolio Management", href: "/courses/portfolio-management" },
  { label: "Market Research Techniques", href: "/courses/market-research-techniques" },
]

export default function Footer() {
  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden scroll-mt-40"
        aria-label="Contact and enroll"
      >
        {/* top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 30%), transparent)" }}
          aria-hidden="true"
        />
        {/* glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, oklch(0.78 0.14 85) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
              Contact Us — Reach Out Any Time
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed text-pretty max-w-xl mx-auto mb-3">
              Reach out to Tradeverse City for course details, fees, batch schedules, enrollment, and personalized mentorship guidance.
            </p>
            <a
              href={TEL_LINK}
              className="inline-flex items-center gap-2 text-gold font-bold text-xl sm:text-2xl hover:opacity-80 transition-opacity duration-200"
              aria-label="Call Tradeverse City"
            >
              <Phone className="w-5 h-5" />
              +91 93183 36747
            </a>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* WhatsApp */}
            <a
              href={WA_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:border-green-500/50 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(37,211,102,0.15)] hover:-translate-y-0.5 bg-card"
              aria-label="WhatsApp Enquiry"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground text-base mb-1">WhatsApp Enquiry</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Chat with us instantly for course info, fees & batch schedules
                </p>
                <p className="text-xs font-semibold mt-2" style={{ color: "#25D366" }}>+91 93183 36747</p>
              </div>
              <span
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-opacity duration-200 group-hover:opacity-90"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </span>
            </a>

            {/* Telegram */}
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:border-sky-400/50 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(34,158,217,0.15)] hover:-translate-y-0.5 bg-card"
              aria-label="Telegram Enquiry"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: "#229ED9" }}
              >
                <Send className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground text-base mb-1">Telegram Enquiry</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join our Telegram channel for daily market updates & tips
                </p>
                <p className="text-xs font-semibold mt-2" style={{ color: "#229ED9" }}>+91 93183 36747</p>
              </div>
              <span
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-opacity duration-200 group-hover:opacity-90"
                style={{ background: "#229ED9", color: "#fff" }}
              >
                <Send className="w-3.5 h-3.5" />
                Open Telegram
              </span>
            </a>

            {/* Instagram */}
            <a
              href={IG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:border-pink-500/50 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(253,29,29,0.12)] hover:-translate-y-0.5 bg-card"
              aria-label="Follow on Instagram"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}
              >
                {/* Instagram SVG icon */}
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground text-base mb-1">Instagram</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Follow us for trading insights, charts & success stories
                </p>
                <p className="text-xs font-semibold mt-2 text-pink-400">@TRADEVERSE_CITY</p>
              </div>
              <span
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-opacity duration-200 group-hover:opacity-90 text-white"
                style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}
              >
                <AtSign className="w-3.5 h-3.5" />
                Follow on Instagram
              </span>
            </a>
          </div>

          {/* Direct call CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-5 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Call / WhatsApp us directly</p>
                <a href={TEL_LINK} className="font-bold text-foreground text-lg hover:text-gold transition-colors duration-200">
                  +91 93183 36747
                </a>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Online & Offline Classes</p>
                <p className="font-semibold text-foreground text-sm">India-wide | Learn from Anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 lg:px-8 py-12 bg-background" aria-label="Site footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src="/tradeverse-city-logo.png"
                    alt="Tradeverse City Logo"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-foreground text-sm tracking-wide">TRADEVERSE</span>
                  <span className="text-gold text-[10px] tracking-widest font-medium">CITY</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 text-pretty">
                {"India's premium stock market education platform. Empowering traders with knowledge, proven strategies, and guidance."}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={WA_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-border hover:border-gold/40 hover:text-gold transition-all duration-200"
                  style={{ color: "#25D366" }}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp: {PHONE_DISPLAY}
                </a>
                <a
                  href={TG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-border hover:border-gold/40 transition-all duration-200"
                  style={{ color: "#229ED9" }}
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram: {PHONE_DISPLAY}
                </a>
                <a
                  href={TEL_LINK}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-border hover:border-gold/40 hover:text-gold transition-all duration-200 text-muted-foreground"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call: {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Learning Platform */}
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-4">Learning Platform</h3>
              <ul className="space-y-2.5" role="list">
                {learningLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-xs text-muted-foreground hover:text-gold transition-colors duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trading Courses */}
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-4">Trading Courses</h3>
              <ul className="space-y-2.5" role="list">
                {courseLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-xs text-muted-foreground hover:text-gold transition-colors duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More */}
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-4">More Courses</h3>
              <ul className="space-y-2.5 mb-6" role="list">
                {moreLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-xs text-muted-foreground hover:text-gold transition-colors duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <a
                  href={TG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram Channel
                </a>
                <a
                  href={IG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  <AtSign className="w-3.5 h-3.5" />
                  @TRADEVERSE_CITY
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; 2025 Tradeverse City. All Rights Reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center text-pretty flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <a href={TEL_LINK} className="hover:text-gold transition-colors duration-150">
                {PHONE_DISPLAY}
              </a>
              <span aria-hidden="true">|</span>
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-150">
                @TRADEVERSE_CITY
              </a>
            </p>
            
          </div>
        </div>
      </footer>
    </>
  )
}
