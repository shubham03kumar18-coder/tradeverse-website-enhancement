"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, TrendingUp, BarChart2, Shield, Brain } from "lucide-react"

const PHONE = "919318336747"
const WA_HERO = `https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.%0A%0APlease%20guide%20me%20which%20course%20is%20best%20for%20a%20beginner.`

// Animated counter hook
function useCounter(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started, startOnView])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, ref }
}

function StatCard({
  value,
  suffix,
  label,
  delay,
  icon,
  isRating,
  ratingValue,
}: {
  value: number
  suffix: string
  label: string
  delay: number
  icon: React.ReactNode
  isRating?: boolean
  ratingValue?: string
}) {
  const { count, ref } = useCounter(value, 2200)

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm card-glow transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-gold/70 group-hover:text-gold transition-colors duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-none">
        {isRating ? (
          <span className="text-gold">{ratingValue}</span>
        ) : (
          <span>
            <span className="text-gold">{count.toLocaleString()}</span>
            <span className="text-gold text-2xl">{suffix}</span>
          </span>
        )}
      </div>
      <div className="text-xs text-muted-foreground font-medium text-center tracking-wide uppercase">
        {label}
      </div>
    </div>
  )
}

function OrbitalRing({ size, speed, opacity, dotColor }: { size: number; speed: string; opacity: number; dotColor: string }) {
  return (
    <div
      className={`absolute rounded-full border border-gold/10 ${speed}`}
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
        opacity,
      }}
    >
      <div
        className="absolute w-2.5 h-2.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
      />
    </div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background" aria-label="Hero section">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.78 0.14 85) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.14 85) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow center */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.14 85) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Orbital rings - client only to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          <OrbitalRing size={320} speed="animate-orbit-cw" opacity={0.4} dotColor="oklch(0.78 0.14 85)" />
          <OrbitalRing size={480} speed="animate-orbit-ccw" opacity={0.25} dotColor="oklch(0.70 0.12 85)" />
          <OrbitalRing size={640} speed="animate-orbit-cw" opacity={0.15} dotColor="oklch(0.60 0.10 85)" />
        </div>
      )}

      {/* Star particles - client only */}
      {mounted && [...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/40 animate-twinkle"
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 13 + 8) % 80}%`,
            animationDelay: `${(i * 0.3) % 3}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 pt-28 pb-12 max-w-7xl mx-auto w-full">

        {/* Floating Brand Name */}
        <div className="text-center mb-8 animate-float" aria-label="Tradeverse City brand">
          <div className="inline-flex flex-col items-center gap-1">
            <span className="text-[11px] tracking-[0.4em] text-gold/70 font-semibold uppercase mb-2">
              Premium Trading Education Platform
            </span>
            <h2
              className="animate-shimmer font-extrabold uppercase tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", lineHeight: 1 }}
              aria-label="Tradeverse City"
            >
              TRADEVERSE CITY
            </h2>
            <span className="text-[10px] tracking-[0.5em] text-muted-foreground font-medium uppercase mt-1">
              LEARN &nbsp;|&nbsp; PLAN &nbsp;|&nbsp; TRADE &nbsp;|&nbsp; PROFIT
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight text-balance">
            Master the{" "}
            <span className="text-gold">Stock Market</span>
            <br />
            with Expert Guidance
          </h1>
        </div>

        {/* Sub text */}
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-4 text-pretty">
          Learn. Plan. Trade. Profit. — Tradeverse City offers structured, in-depth courses in
          Technical Analysis, Trading Psychology, Risk Management, and beyond.
        </p>
        <p className="text-center text-muted-foreground/70 max-w-xl mx-auto text-sm leading-relaxed mb-10 text-pretty">
          Whether you&apos;re a complete beginner or a seasoned trader looking to sharpen your edge,
          our comprehensive learning ecosystem is designed to take you from knowledge to consistent profitability.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href={WA_HERO}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-background font-bold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-gold/25 text-sm"
          >
            Start Learning Today
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#learning-centers"
            className="flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-200 text-sm backdrop-blur-sm"
          >
            Explore Platform
          </a>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-4xl mx-auto" role="region" aria-label="Platform statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value={10000} suffix="+" label="Students Trained" delay={0} icon={<TrendingUp className="w-5 h-5" />} />
            <StatCard value={14} suffix="+" label="Structured Courses" delay={150} icon={<BarChart2 className="w-5 h-5" />} />
            <StatCard value={7} suffix="+" label="Learning Centers" delay={300} icon={<Shield className="w-5 h-5" />} />
            <StatCard value={5} suffix="★" label="Student Rating · 4.6" delay={450} icon={<Brain className="w-5 h-5" />} isRating ratingValue="4.6 ★" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, oklch(0.08 0 0), transparent)" }}
        aria-hidden="true"
      />
    </section>
  )
}
