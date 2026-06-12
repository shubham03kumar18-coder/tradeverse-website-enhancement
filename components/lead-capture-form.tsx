"use client"

import { useState } from "react"
import { MessageCircle, Lock, Phone, GraduationCap } from "lucide-react"

const PHONE = "919318336747"

const courseOptions = [
  "Select a Course...",
  "Stock Market Fundamentals (Beginner)",
  "Technical Analysis (Intermediate)",
  "Candlestick Patterns (Intermediate)",
  "Price Action Trading (Advanced)",
  "Swing Trading (Intermediate)",
  "Intraday Trading (Advanced)",
  "Options Trading (Advanced)",
  "Risk Management (All Levels)",
  "Trading Psychology (All Levels)",
  "Complete 200-Day Program",
]

export default function LeadCaptureForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [course, setCourse] = useState(courseOptions[0])
  const [nameError, setNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")

  function handleSubmit() {
    let valid = true

    if (!name.trim()) {
      setNameError("Please enter your full name.")
      valid = false
    } else {
      setNameError("")
    }

    const digits = phone.replace(/\D/g, "")
    if (digits.length < 10) {
      setPhoneError("Please enter a valid 10-digit phone number.")
      valid = false
    } else {
      setPhoneError("")
    }

    if (!valid) return

    const selectedCourse = course === courseOptions[0] ? "Not specified" : course
    const msg = `Hi TRADEVERSE CITY, I want to start learning the stock market and would like more information about your training program.\n\nMy name is ${name.trim()} and my number is ${phone.trim()}.\nI'm interested in: ${selectedCourse}.\nPlease share complete details, fees & next batch date.`
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <section
      id="consultation"
      className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "oklch(0.09 0 0)" }}
      aria-label="Free course consultation form"
    >
      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            Free Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground text-balance mb-3">
            Get FREE Course Consultation
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed text-pretty">
            Fill in your details — we&apos;ll reach out within 2 hours
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl border p-6 sm:p-8 flex flex-col gap-5"
          style={{ background: "#111", borderColor: "oklch(0.78 0.14 85 / 30%)" }}
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Full Name
            </label>
            <input
              id="lead-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 border outline-none transition-all duration-150 focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
              style={{ background: "#1a1a1a", borderColor: nameError ? "#ef4444" : "oklch(0.25 0 0)" }}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? "name-error" : undefined}
            />
            {nameError && (
              <span id="name-error" className="text-xs text-red-400 font-medium">{nameError}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Phone Number
            </label>
            <input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 border outline-none transition-all duration-150 focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
              style={{ background: "#1a1a1a", borderColor: phoneError ? "#ef4444" : "oklch(0.25 0 0)" }}
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error" : undefined}
            />
            {phoneError && (
              <span id="phone-error" className="text-xs text-red-400 font-medium">{phoneError}</span>
            )}
          </div>

          {/* Course dropdown */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-course" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Course Interest
            </label>
            <select
              id="lead-course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-foreground border outline-none transition-all duration-150 focus:border-gold/70 focus:ring-2 focus:ring-gold/20 cursor-pointer"
              style={{ background: "#1a1a1a", borderColor: "oklch(0.25 0 0)", color: course === courseOptions[0] ? "oklch(0.50 0 0)" : "oklch(0.97 0 0)" }}
            >
              {courseOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleSubmit}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSubmit() }}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-lg select-none"
            style={{ background: "oklch(0.78 0.14 85)", color: "oklch(0.08 0 0)", boxShadow: "0 4px 20px oklch(0.78 0.14 85 / 30%)" }}
            aria-label="Send details on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            Send on WhatsApp
          </div>
        </div>

        {/* Trust row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6">
          {[
            { Icon: Lock, text: "We never share your data" },
            { Icon: Phone, text: "Response within 2 hours" },
            { Icon: GraduationCap, text: "Free consultation call" },
          ].map(({ Icon, text }) => (
            <span key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Icon className="w-3.5 h-3.5 text-gold/60" aria-hidden="true" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
