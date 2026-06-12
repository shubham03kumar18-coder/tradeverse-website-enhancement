"use client"

import { useEffect, useState } from "react"
import { X, MessageCircle, Send } from "lucide-react"

const PHONE = "919318336747"
const TG_LINK = `https://t.me/+${PHONE}`

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Don't show if already shown this session
    if (typeof window !== "undefined" && sessionStorage.getItem("popupShown")) return

    let fallbackTimer: ReturnType<typeof setTimeout>

    function showPopup() {
      if (dismissed) return
      setVisible(true)
      sessionStorage.setItem("popupShown", "1")
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        showPopup()
        document.removeEventListener("mouseleave", handleMouseLeave)
        clearTimeout(fallbackTimer)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    fallbackTimer = setTimeout(() => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      showPopup()
    }, 15000)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(fallbackTimer)
    }
  }, [dismissed])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) close()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [visible])

  function close() {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem("popupShown", "1")
  }

  function handleCallback() {
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 10) {
      setPhoneError("Please enter a valid 10-digit number.")
      return
    }
    setPhoneError("")
    const msg = `Hi TRADEVERSE CITY, I want to start learning the stock market and would like more information about your training program.\n\nI want a FREE callback for course guidance. My number is ${phone.trim()}. Please call me.`
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank")
    close()
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-gold/30 shadow-2xl shadow-black/80 p-8 flex flex-col items-center text-center gap-5"
        style={{ background: "oklch(0.11 0 0)" }}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all duration-150"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gift icon */}
        <span className="text-5xl" role="img" aria-label="Gift">
          🎁
        </span>

        <div>
          <h2 id="exit-popup-title" className="text-xl sm:text-2xl font-extrabold text-foreground mb-2 text-balance">
            Wait! Get FREE Course Guidance
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
            Talk to our expert before you go — completely free, no obligations
          </p>
        </div>

        {/* Phone input */}
        <div className="w-full flex flex-col gap-1.5">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 border outline-none transition-all duration-150 focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
            style={{
              background: "#1a1a1a",
              borderColor: phoneError ? "#ef4444" : "oklch(0.25 0 0)",
            }}
            aria-label="Your phone number"
            aria-invalid={!!phoneError}
          />
          {phoneError && (
            <span className="text-xs text-red-400 font-medium text-left">{phoneError}</span>
          )}
        </div>

        {/* CTA button */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleCallback}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCallback() }}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-lg select-none"
          style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 20px rgba(37,211,102,0.30)" }}
          aria-label="Get free callback on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          Get FREE Callback on WhatsApp
        </div>

        {/* Telegram link */}
        <p className="text-xs text-muted-foreground">
          Or join{" "}
          <span className="text-gold font-bold">10,000+</span>{" "}
          learners on{" "}
          <a
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold transition-colors hover:text-gold"
            style={{ color: "#229ED9" }}
          >
            <Send className="w-3 h-3" />
            Telegram
          </a>
        </p>
      </div>
    </div>
  )
}
