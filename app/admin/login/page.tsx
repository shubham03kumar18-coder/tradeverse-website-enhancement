"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Lock, Mail, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react"

const ADMIN_EMAIL = "tradeversecity@gmail.com"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    
    // Sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    })

    if (signInError) {
      setError("Incorrect password. Please try again.")
      setLoading(false)
      return
    }

    // Refresh session to ensure JWT is fresh
    await supabase.auth.refreshSession()

    // Wait a moment for session to update
    await new Promise(resolve => setTimeout(resolve, 500))

    // Now check admin status via API
    const res = await fetch("/api/admin/check", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const { isAdmin } = await res.json()

    if (!isAdmin) {
      await supabase.auth.signOut()
      setError("This account does not have admin access.")
      setLoading(false)
      return
    }

    // Success — redirect to admin dashboard
    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold/5 blur-[140px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/tradeverse-city-logo.png"
                alt="Tradeverse City"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-foreground text-sm tracking-wide">TRADEVERSE</span>
              <span className="text-gold text-[10px] tracking-widest font-medium">CITY</span>
            </div>
          </Link>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-black/60">
          <h1 className="text-2xl font-bold text-foreground mb-1">Admin Sign In</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Signing in as{" "}
            <span className="text-gold font-medium">{ADMIN_EMAIL}</span>
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email — read only display */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <div className="w-full bg-muted/40 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-muted-foreground select-none">
                  {ADMIN_EMAIL}
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full bg-input border border-border rounded-lg pl-9 pr-11 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gold text-black font-bold text-sm rounded-xl hover:bg-gold/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>
        </div>

        {/* Admin quick links */}
        <div className="mt-6 bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">After signing in you can:</p>
          <ul className="flex flex-col gap-2 text-sm text-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              Upload &amp; publish ebooks for students
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              View all orders and revenue
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              Manage student inquiries
            </li>
          </ul>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          Not an admin?{" "}
          <Link href="/auth/login" className="text-gold hover:underline">
            Go to student login
          </Link>
        </p>
      </div>
    </div>
  )
}