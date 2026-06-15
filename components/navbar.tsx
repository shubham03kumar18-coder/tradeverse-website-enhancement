"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, User, BookOpen, ShoppingBag, LogOut, Shield } from "lucide-react"
import { LEARNING_HUBS, TRADING_COURSES, TEL_LINK, TG_LINK, IG_LINK, makeWA } from "@/lib/constants"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const PHONE = "919318336747"
const WA_ENROLL = makeWA("Please share course details and fees.")

const learningLinks = LEARNING_HUBS.map((h) => ({
  label: h.label,
  href: `/learning/${h.slug}`,
  desc: h.desc,
}))

const courseLinks = TRADING_COURSES.map((c) => ({
  label: c.label,
  href: `/courses/${c.slug}`,
  desc: c.desc,
}))

interface NavbarClientProps {
  user: { email: string; fullName: string } | null
  isAdmin: boolean
}

export default function NavbarClient({ user, isAdmin }: NavbarClientProps) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUserMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  const displayName = user?.fullName || user?.email?.split("@")[0] || "Account"

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
            <Link href="/" className="px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium">
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
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-muted transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
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
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-muted transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#about" className="px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium">
              About Us
            </Link>
            <Link href="/#contact" className="px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium">
              Contact Us
            </Link>
            <Link href="/ebooks" className="px-4 py-2 text-sm text-foreground hover:text-gold transition-colors duration-200 font-medium">
              Ebooks
            </Link>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={TEL_LINK}
              className="text-xs text-muted-foreground hover:text-gold transition-colors duration-200 font-medium"
              aria-label="Call Tradeverse City"
            >
              +91 93183 36747
            </a>

            {user ? (
              /* User dropdown */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/30 text-gold text-sm font-medium rounded-lg hover:bg-gold/20 transition-all"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-24 truncate text-xs">{displayName}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-2xl shadow-black/60 py-2 z-50">
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="text-xs font-bold text-foreground truncate">{displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-muted transition-colors">
                      <User className="w-3.5 h-3.5" /> Dashboard
                    </Link>
                    <Link href="/dashboard/library" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-muted transition-colors">
                      <BookOpen className="w-3.5 h-3.5" /> My Library
                    </Link>
                    <Link href="/dashboard/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-muted transition-colors">
                      <ShoppingBag className="w-3.5 h-3.5" /> Orders
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gold hover:bg-muted transition-colors border-t border-border mt-1">
                        <Shield className="w-3.5 h-3.5" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-muted transition-colors border-t border-border mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm text-foreground border border-border rounded-lg hover:border-gold/50 hover:text-gold transition-all"
                >
                  Sign In
                </Link>
                <a
                  href={WA_ENROLL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-gold/20"
                >
                  Enroll Now
                </a>
              </>
            )}
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
            <Link href="/" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/ebooks" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              Ebooks
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
                  <Link key={item.label} href={item.href} className="px-3 py-2 text-sm text-muted-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
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
                  <Link key={item.label} href={item.href} className="px-3 py-2 text-sm text-muted-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/#about" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
            <Link href="/#contact" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>

            {user ? (
              <div className="mt-2 pt-3 border-t border-border flex flex-col gap-2">
                <p className="px-3 text-xs text-muted-foreground truncate">{user.email}</p>
                <Link href="/dashboard" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <User className="w-4 h-4" /> Dashboard
                </Link>
                <Link href="/dashboard/library" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-gold transition-colors flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <BookOpen className="w-4 h-4" /> My Library
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="px-3 py-2.5 text-sm font-medium text-gold hover:opacity-80 transition-colors flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <Shield className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2 text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="mt-2 px-5 py-2.5 text-sm font-bold rounded-lg text-center border border-border text-foreground hover:text-gold hover:border-gold/50 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <a
                  href={WA_ENROLL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gold text-background text-sm font-bold rounded-lg text-center"
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
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
