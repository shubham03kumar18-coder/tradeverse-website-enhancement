"use client"

import { useEffect, useState } from "react"

const PHONE = "919318336747"
const WA_BATCH = `https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.%0A%0AI%20want%20to%20reserve%20my%20seat%20in%20the%20upcoming%20batch.%20Please%20confirm%20availability.`

function getTargetDate() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  d.setHours(10, 0, 0, 0)
  return d
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export default function BatchCountdown() {
  const [target] = useState<Date>(getTargetDate)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 7, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft(target))
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [target])

  if (!mounted) return null

  const isZero = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div
      className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm font-bold overflow-hidden"
      style={{ background: "oklch(0.78 0.14 85)", color: "oklch(0.08 0 0)", minHeight: "44px" }}
      role="banner"
      aria-label="New batch starting soon"
    >
      {isZero ? (
        <>
          <span className="hidden sm:inline font-black tracking-wide uppercase text-xs sm:text-sm">
            Batch Starting Today! Join Now
          </span>
          <span className="sm:hidden font-black tracking-wide uppercase text-xs">
            Batch Today! Join Now
          </span>
          <a
            href={WA_BATCH}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wide transition-all duration-200 hover:opacity-80"
            style={{ background: "oklch(0.08 0 0)", color: "oklch(0.78 0.14 85)" }}
          >
            Reserve Seat
          </a>
        </>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          <span className="hidden sm:inline font-black tracking-wide uppercase text-xs whitespace-nowrap">
            New Batch Starting In:
          </span>
          <span className="sm:hidden font-black tracking-wide uppercase text-[10px] whitespace-nowrap">
            New Batch:
          </span>

          <div className="flex items-center gap-1.5">
            {[
              { val: pad(timeLeft.days), label: "D" },
              { val: pad(timeLeft.hours), label: "H" },
              { val: pad(timeLeft.minutes), label: "M" },
              { val: pad(timeLeft.seconds), label: "S" },
            ].map(({ val, label }, i) => (
              <div key={label} className="flex items-center gap-1">
                <span
                  className="inline-flex flex-col items-center justify-center w-8 h-8 sm:w-10 sm:h-8 rounded font-black text-sm sm:text-base leading-none tabular-nums"
                  style={{ background: "oklch(0.12 0 0)", color: "oklch(0.78 0.14 85)" }}
                >
                  {val}
                  <span className="text-[8px] font-bold tracking-widest" style={{ color: "oklch(0.50 0 0)" }}>{label}</span>
                </span>
                {i < 3 && <span className="font-black text-base" style={{ color: "oklch(0.20 0 0)" }}>:</span>}
              </div>
            ))}
          </div>

          <span className="font-black text-[10px] sm:text-xs uppercase tracking-wide whitespace-nowrap">
            — Limited Seats!
          </span>
          <a
            href={WA_BATCH}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wide transition-all duration-200 hover:opacity-80 whitespace-nowrap"
            style={{ background: "oklch(0.08 0 0)", color: "oklch(0.78 0.14 85)" }}
          >
            Reserve Now
          </a>
        </div>
      )}
    </div>
  )
}
