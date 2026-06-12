"use client"

import { useEffect } from "react"
import { X, MessageCircle, Send, Clock, CheckCircle } from "lucide-react"

const PHONE = "919318336747"
const TG_LINK = `https://t.me/+${PHONE}`

export interface CourseDetail {
  title: string
  level: string
  levelColor: string
  duration: string
  description: string
  bullets: string[]
  whoFor: string
  waText: string
}

interface CourseModalProps {
  course: CourseDetail
  onClose: () => void
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const AUTO_MSG = `Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.%0A%0A`
  const waLink = `https://wa.me/${PHONE}?text=${AUTO_MSG}${course.waText}`

  const tgAskText = encodeURIComponent(
    `Hi TRADEVERSE CITY, I want to start learning the stock market and would like more information about your training program.\n\nI'm interested in the "${course.title}" course. Can you share more details?`
  )
  const tgLink = `${TG_LINK}?start=${tgAskText}`

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl shadow-black/80">
        {/* Header */}
        <div
          className="sticky top-0 flex items-start justify-between gap-4 p-6 pb-4 border-b border-border z-10"
          style={{ background: "oklch(0.12 0 0)" }}
        >
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <h2
              id="modal-title"
              className="text-xl font-extrabold text-gold leading-tight text-balance"
            >
              {course.title}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${course.levelColor}`}>
                {course.level}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                <Clock className="w-3 h-3" />
                {course.duration}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>

          {/* What You'll Learn */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-3">
              What You&apos;ll Learn
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {course.bullets.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who Is This For */}
          <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold/70 block mb-1">
              Who Is This For
            </span>
            <p className="text-sm text-foreground font-medium">{course.whoFor}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-lg"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}
            >
              <MessageCircle className="w-4 h-4" />
              Enroll via WhatsApp
            </a>
            <a
              href={tgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-lg"
              style={{ background: "#229ED9", color: "#fff", boxShadow: "0 4px 16px rgba(34,158,217,0.3)" }}
            >
              <Send className="w-4 h-4" />
              Ask on Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
