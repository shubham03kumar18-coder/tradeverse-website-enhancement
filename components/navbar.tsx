"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

const PHONE = "919318336747"
const TEL_LINK = `tel:+${PHONE}`
const TG_LINK = `https://t.me/+${PHONE}`
const IG_LINK = "https://instagram.com/TRADEVERSE_CITY"
const WA_ENROLL = `https://wa.me/${PHONE}?text=Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program.%0A%0APlease%20share%20course%20details%20and%20fees.`

const learningLinks = [
  { label: "Beginner Hub", href: "#learning-centers" },
  { label: "Technical Analysis Center", href: "#learning-centers" },
  { label: "Trading Psychology Center", href: "#learning-centers" },
  { label: "Risk Management Center", href: "#learning-centers" },
  { label: "Market Research Center", href: "#learning-centers" },
  { label: "Community Learning Hub", href: "#learning-centers" },
]

const courseLinks = [
  { label: "Stock Market Fundamentals", href: "#courses" },
  { label: "Candlestick Analysis", href: "#courses" },
  { label: "Price Action Trading", href: "#courses" },
  { label: "Swing Trading", href: "#courses" },
  { label: "Intraday Trading", href: "#courses" },
  { label: "Options Trading Fundamentals", href: "#courses" },
  { label: "Risk Management", href: "#courses" },
  { label: "Trading Psychology", href: "#courses" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Tradeverse City Home">
            <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
              <Image
                src="/tradeverse-city-logo.png"
                alt="Tradeverse City Logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-foreground text-sm tracking-wide">TRADEVERSE</span>
              <span className="text-gold text-[10px] tracking-widest font-medium">CITY</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <Link
              href="#"
              className="px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium"
            >
              Home
            </Link>

            {/* Learning Platform Dropdown */}
            <div className="relative" onMouseEnter={() => setLearningOpen(true)} onMouseLeave={() => setLearningOpen(false)}>
              <button
                className="flex items-center gap-1 px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium"
                aria-expanded={learningOpen}
              >
                Learning Platform
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${learningOpen ? "rotate-180" : ""}`} />
              </button>
              {learningOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-2xl shadow-black/60 py-2 z-50">
                  {learningLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-muted transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Trading Courses Dropdown */}
            <div className="relative" onMouseEnter={() => setCoursesOpen(true)} onMouseLeave={() => setCoursesOpen(false)}>
              <button
                className="flex items-center gap-1 px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium"
                aria-expanded={coursesOpen}
              >
                Trading Courses
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`} />
              </button>
              {coursesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-2xl shadow-black/60 py-2 z-50">
                  {courseLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-muted transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#about"
              className="px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium"
            >
              About Us
            </Link>
            <Link
              href="#contact"
              className="px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={TEL_LINK}
              className="text-xs text-muted-foreground hover:text-gold transition-colors duration-200 font-medium"
              aria-label="Call Tradeverse City"
            >
              +91 93183 36747
            </a>
            <a
              href={IG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-gold transition-colors duration-200 font-medium"
            >
              @TRADEVERSE_CITY
            </a>
            <a
              href={WA_ENROLL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-gold/20"
            >
              Enroll Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            <Link href="#" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <button
              className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors w-full"
              onClick={() => setLearningOpen(!learningOpen)}
            >
              Learning Platform
              <ChevronDown className={`w-4 h-4 transition-transform ${learningOpen ? "rotate-180" : ""}`} />
            </button>
            {learningOpen && (
              <div className="pl-4 flex flex-col gap-0.5">
                {learningLinks.map((item) => (
                  <a key={item.label} href={item.href} className="px-3 py-2 text-sm text-muted-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
            <button
              className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors w-full"
              onClick={() => setCoursesOpen(!coursesOpen)}
            >
              Trading Courses
              <ChevronDown className={`w-4 h-4 transition-transform ${coursesOpen ? "rotate-180" : ""}`} />
            </button>
            {coursesOpen && (
              <div className="pl-4 flex flex-col gap-0.5">
                {courseLinks.map((item) => (
                  <a key={item.label} href={item.href} className="px-3 py-2 text-sm text-muted-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
            <Link href="#about" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
            <Link href="#contact" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
            <a
              href={WA_ENROLL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-2.5 bg-gold text-background text-sm font-bold rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              Enroll Now
            </a>
            <div className="mt-2 pt-3 border-t border-border flex flex-col gap-2">
              <a
                href={TEL_LINK}
                className="px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-gold transition-colors text-center border border-border rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                Call: +91 93183 36747
              </a>
              <div className="flex gap-2">
                <a
                  href={TG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2.5 text-xs font-bold text-center rounded-lg"
                  style={{ background: "#229ED9", color: "#fff" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Telegram
                </a>
                <a
                  href={IG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2.5 text-xs font-bold text-center rounded-lg"
                  style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", color: "#fff" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Instagram
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
