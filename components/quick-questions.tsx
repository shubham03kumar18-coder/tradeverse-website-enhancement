const PHONE = "919318336747"

const questions = [
  {
    label: "Course Fees?",
    text: "Hi! Can you please share the fees for your trading courses?",
  },
  {
    label: "Batch Schedule?",
    text: "Hi! When does the next batch start? What are the class timings?",
  },
  {
    label: "Beginner Friendly?",
    text: "Hi! I am a complete beginner. Which course should I start with?",
  },
  {
    label: "Online or Offline?",
    text: "Hi! Are your classes online or offline? How are sessions conducted?",
  },
  {
    label: "Certificate?",
    text: "Hi! Do you provide a certificate after course completion?",
  },
  {
    label: "1-on-1 Mentorship?",
    text: "Hi! Do you offer personal mentorship? What does it include?",
  },
]

const WA_OWN = `https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.`

export default function QuickQuestions() {
  return (
    <section
      className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "oklch(0.10 0 0)" }}
      aria-label="Quick questions on WhatsApp"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 20%), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
          Instant Help
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-balance mb-3">
          Have Questions? Ask Instantly on WhatsApp
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-10 text-pretty max-w-xl mx-auto">
          Tap any question below to open WhatsApp with a pre-filled message. Our team replies fast.
        </p>

        {/* Quick question pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" role="list">
          {questions.map(({ label, text }) => (
            <a
              key={label}
              href={`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-gold/30 text-foreground hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-200"
              style={{ background: "oklch(0.12 0 0)" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Big WA button */}
        <a
          href={WA_OWN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-black text-base uppercase tracking-wide transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-xl"
          style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 24px rgba(37,211,102,0.35)" }}
        >
          {/* WhatsApp inline SVG */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Ask Your Own Question on WhatsApp
        </a>
      </div>
    </section>
  )
}
