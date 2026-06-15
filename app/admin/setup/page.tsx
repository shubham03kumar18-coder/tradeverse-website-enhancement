"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2, Copy, Check, Database, ShieldCheck, AlertTriangle } from "lucide-react"

const SQL_SCRIPT = `-- ============================================================
-- TRADEVERSE CITY — Full Database Setup
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 1. Profiles table (auto-linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Ebooks table
CREATE TABLE IF NOT EXISTS ebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  price_inr integer NOT NULL DEFAULT 0,
  is_free boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  author text NOT NULL DEFAULT 'Tradeverse City',
  tags text[] DEFAULT '{}',
  page_count integer,
  cover_url text,
  pdf_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Purchases table (Razorpay-compatible schema)
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ebook_id uuid REFERENCES ebooks(id) ON DELETE SET NULL,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  amount_inr integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, ebook_id)
);

-- 4. Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- 6. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 7. RLS — profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 8. RLS — ebooks (published are public)
DROP POLICY IF EXISTS "Published ebooks are public" ON ebooks;
CREATE POLICY "Published ebooks are public" ON ebooks
  FOR SELECT USING (is_published = true);

-- 9. RLS — purchases (users see own)
DROP POLICY IF EXISTS "Users see own purchases" ON purchases;
CREATE POLICY "Users see own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- 10. Set admin for tradeversecity@gmail.com
INSERT INTO profiles (id, email, full_name, is_admin)
SELECT id, email, 'Tradeverse Admin', true
FROM auth.users
WHERE email = 'tradeversecity@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  is_admin = true,
  full_name = COALESCE(profiles.full_name, 'Tradeverse Admin'),
  updated_at = now();

-- Verify admin was set:
SELECT id, email, is_admin FROM profiles WHERE email = 'tradeversecity@gmail.com';
`

export default function AdminSetupPage() {
  const [copied, setCopied] = useState(false)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    steps?: string[]
    errors?: string[]
    message?: string
    error?: string
  } | null>(null)

  async function copySQL() {
    await navigator.clipboard.writeText(SQL_SCRIPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  async function runSetup() {
    setRunning(true)
    setResult(null)
    try {
      const res = await fetch("/api/admin/setup-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-setup-secret": "tradeverse-setup-2024",
        },
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ success: false, error: String(err) })
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <Database className="w-7 h-7 text-gold" />
          <h1 className="text-2xl font-bold font-serif">Database Setup</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          This page creates all required database tables and sets admin access for{" "}
          <span className="text-gold font-mono font-medium">tradeversecity@gmail.com</span>.
          Run Step 1 first, then Step 2 if needed.
        </p>

        {/* Admin Credentials Card */}
        <div className="bg-gold/5 border border-gold/30 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold uppercase tracking-wide">Admin Login Credentials</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Email</p>
              <p className="font-mono text-sm text-foreground">tradeversecity@gmail.com</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Password</p>
              <p className="font-mono text-sm text-foreground">Shubhbair@1002</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Login URL: <span className="font-mono text-gold">/admin/login</span>
          </p>
        </div>

        {/* Step 1 — Auto Setup */}
        <div className="bg-card border border-border rounded-xl p-6 mb-5">
          <div className="flex items-start gap-3 mb-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-black text-xs font-bold flex items-center justify-center">1</span>
            <div>
              <h2 className="font-bold text-base leading-tight">Auto Setup</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Verifies tables exist and creates the admin user automatically via the Supabase service-role API.
              </p>
            </div>
          </div>

          <button
            onClick={runSetup}
            disabled={running}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-bold text-sm rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {running ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Running...</>
            ) : (
              <><Database className="w-4 h-4" /> Run Auto Setup</>
            )}
          </button>

          {result && (
            <div className={`mt-5 rounded-xl p-4 border text-sm ${
              result.success
                ? "bg-green-500/10 border-green-500/30"
                : "bg-yellow-500/10 border-yellow-500/30"
            }`}>
              <div className="flex items-center gap-2 mb-3 font-bold">
                {result.success
                  ? <CheckCircle className="w-4 h-4 text-green-500" />
                  : <AlertTriangle className="w-4 h-4 text-yellow-500" />
                }
                <span className={result.success ? "text-green-400" : "text-yellow-400"}>
                  {result.message || result.error}
                </span>
              </div>

              {result.steps && result.steps.length > 0 && (
                <ul className="space-y-1 mb-3">
                  {result.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-400" />
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              )}

              {result.errors && result.errors.length > 0 && (
                <div className="border-t border-border/50 pt-3 mt-2">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Issues (run Step 2 SQL to fix):</p>
                  <ul className="space-y-1">
                    {result.errors.map((err, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-yellow-400">
                        <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.success && (
                <div className="mt-3 pt-3 border-t border-green-500/20">
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Go to Admin Login →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 2 — Manual SQL */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground text-xs font-bold flex items-center justify-center">2</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base leading-tight">Manual SQL (If Auto Setup Shows Table Errors)</h2>
                <button
                  onClick={copySQL}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-1.5"
                >
                  {copied
                    ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                    : <><Copy className="w-3.5 h-3.5" /> Copy</>
                  }
                </button>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Go to{" "}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Supabase Dashboard
                </a>
                {" "}→ SQL Editor → New Query → paste and click Run.
              </p>
            </div>
          </div>

          <pre className="bg-background border border-border rounded-lg p-4 text-xs text-muted-foreground overflow-auto max-h-80 font-mono leading-relaxed whitespace-pre select-all">
            {SQL_SCRIPT}
          </pre>

          <div className="mt-4 bg-gold/5 border border-gold/20 rounded-lg p-3 text-xs text-muted-foreground">
            <strong className="text-foreground">After running the SQL:</strong> Come back here and click &quot;Run Auto Setup&quot; again to create the admin user, then go to{" "}
            <Link href="/admin/login" className="text-gold hover:underline font-mono">/admin/login</Link>.
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/admin/login" className="text-sm text-gold hover:underline">
            Already set up? Go to Admin Login →
          </Link>
        </div>
      </div>
    </div>
  )
}
