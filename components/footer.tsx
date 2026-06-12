import { MessageCircle, Send, AtSign } from "lucide-react"

const PHONE = "919318336747"
const PHONE_DISPLAY = "+91 93183 36747"
const WA_AUTO_MSG = "Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.%0A%0APlease%20share%20the%20complete%20course%20details%2C%20fees%2C%20and%20next%20batch%20schedule."
const WA_CTA = `https://wa.me/${PHONE}?text=${WA_AUTO_MSG}`
const TG_LINK = `https://t.me/+${PHONE}`
const IG_LINK = "https://instagram.com/TRADEVERSE_CITY"
const TEL_LINK = `tel:+${PHONE}`

const learningLinks = [
  "Beginner Hub",
  "Technical Analysis Center",
  "Trading Psychology Center",
  "Risk Management Center",
  "Learning Resources Library",
  "Market Research Center",
  "Community Learning Hub",
]

const courseLinks = [
  "Stock Market Fundamentals",
  "Support & Resistance",
  "Trading Psychology",
  "Price Action Trading",
  "Swing Trading",
  "Intraday Trading",
  "Risk Management",
  "Options Trading Fundamentals",
  "Portfolio Management",
]

const moreLinks = [
  "Candlestick Analysis",
  "Trend Analysis",
  "Price Action Trading",
  "Intraday Trading",
  "Futures Market Basics",
  "Market Research Techniques",
]

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section
        id="contact"
        className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden scroll-mt-40"
        aria-label="Contact and enroll"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 30%), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse, oklch(0.78 0.14 85) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-6 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            Get Started Today
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-4">
            Ready to Start Your Trading Journey?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-10 text-pretty max-w-xl mx-auto">
            For complete course details, fees, schedules, enrollment information, and mentorship
            guidance — contact Tradeverse City directly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:scale-105"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 20px rgba(37,211,102,0.25)" }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Enquiry
            </a>
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:scale-105"
              style={{ background: "#229ED9", color: "#fff", boxShadow: "0 4px 20px rgba(34,158,217,0.25)" }}
            >
              <Send className="w-4 h-4" />
              Telegram Enquiry
            </a>
            <a
              href={IG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm border border-border hover:border-gold/50 text-foreground hover:text-gold transition-all duration-200"
            >
              <AtSign className="w-4 h-4" />
              @TRADEVERSE_CITY
            </a>
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
                <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center font-bold text-background text-sm">
                  TC
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
                  <li key={l}>
                    <a href="#learning-centers" className="text-xs text-muted-foreground hover:text-gold transition-colors duration-150">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trading Courses */}
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-4">Trading Courses</h3>
              <ul className="space-y-2.5" role="list">
                {courseLinks.map((l) => (
                  <li key={l}>
                    <a href="#courses" className="text-xs text-muted-foreground hover:text-gold transition-colors duration-150">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* More */}
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-4">More Courses</h3>
              <ul className="space-y-2.5 mb-6" role="list">
                {moreLinks.map((l) => (
                  <li key={l}>
                    <a href="#courses" className="text-xs text-muted-foreground hover:text-gold transition-colors duration-150">
                      {l}
                    </a>
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
            <p className="text-xs text-muted-foreground">v3.0</p>
          </div>
        </div>
      </footer>
    </>
  )
}
