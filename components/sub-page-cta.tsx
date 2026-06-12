import { MessageCircle, Send } from "lucide-react"
import { TG_LINK, makeWA } from "@/lib/constants"

interface SubPageCTAProps {
  topic?: string
}

export default function SubPageCTA({ topic }: SubPageCTAProps) {
  const waLink = makeWA(
    topic
      ? `I am interested in learning more about "${topic}". Please share complete details, fees, schedule, and next batch date.`
      : undefined
  )

  return (
    <section
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Enquiry call to action"
    >
      {/* Gold top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 40%), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto">
        {/* Notice box */}
        <div className="rounded-2xl border border-gold/20 bg-card/60 px-6 py-8 text-center mb-8">
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty mb-1">
            <span className="text-gold font-semibold">No pricing displayed on this website.</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
            For complete course details, fees, schedules, enrollment information, and mentorship
            guidance, contact{" "}
            <span className="text-foreground font-semibold">Tradeverse City</span> on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
            style={{
              background: "#25D366",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
            }}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp Enquiry
          </a>
          <a
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
            style={{
              background: "#229ED9",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(34,158,217,0.25)",
            }}
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            Telegram Enquiry
          </a>
        </div>
      </div>
    </section>
  )
}
