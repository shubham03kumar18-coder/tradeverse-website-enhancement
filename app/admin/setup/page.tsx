"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2, Copy, Check, Database, ShieldCheck } from "lucide-react"

const SQL_SCRIPT = `-- ============================================================
-- TRADEVERSE CITY — Full Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Profiles table (links to auth.users)
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

-- 3. Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ebook_id uuid REFERENCES ebooks(id) ON DELETE SET NULL,
  amount_paid integer NOT NULL DEFAULT 0,
  payment_id text,
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz NOT NULL DEFAULT now()
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

-- 5. Auto-create profile on user signup
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

-- 6. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies — profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 8. RLS Policies — ebooks (public read for published)
DROP POLICY IF EXISTS "Published ebooks are public" ON ebooks;
CREATE POLICY "Published ebooks are public" ON ebooks
  FOR SELECT USING (is_published = true);

-- 9. RLS Policies — purchases (own records only)
DROP POLICY IF EXISTS "Users see own purchases" ON purchases;
CREATE POLICY "Users see own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- 10. Set admin flag for tradeversecity@gmail.com
-- First find the user's UUID from auth.users and upsert the profile
INSERT INTO profiles (id, email, full_name, is_admin)
SELECT 
  id,
  email,
  'Tradeverse Admin',
  true
FROM auth.users
WHERE email = 'tradeversecity@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  is_admin = true,
  full_name = COALESCE(profiles.full_name, 'Tradeverse Admin'),
  updated_at = now();

-- Verify:
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
    setTimeout(() => setCopied(false), 2000)
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
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-7 h-7 text-gold" />
          <h1 className="text-2xl font-bold">Database Setup</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          Run the setup to create all required tables and set admin access for{" "}
          <span className="text-gold font-medium">tradeversecity@gmail.com</span>.
        </p>

        {/* Credentials box */}
        <div className="bg-gold/5 border border-gold/30 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">Admin Credentials</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Email</p>
              <p className="font-mono text-foreground">tradeversecity@gmail.com</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Password</p>
              <p className="font-mono text-foreground">Shubhbair@1002</p>
            </div>
          </div>
        </div>

        {/* Option 1 — Auto setup */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="font-bold text-base mb-1">Option 1 — Auto Setup (Recommended)</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Click the button below to automatically create all tables and set admin access.
          </p>
          <button
            onClick={runSetup}
            disabled={running}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-bold text-sm rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {running ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Running setup...</>
            ) : (
              <><Database className="w-4 h-4" /> Run Auto Setup</>
            )}
          </button>

          {result && (
            <div className={`mt-4 rounded-xl p-4 border text-sm ${result.success ? "bg-green-500/10 border-green-500/30" : "bg-destructive/10 border-destructive/30"}`}>
              <div className="flex items-center gap-2 mb-3 font-bold">
                {result.success
                  ? <CheckCircle className="w-4 h-4 text-green-500" />
                  : <XCircle className="w-4 h-4 text-destructive" />
                }
                <span className={result.success ? "text-green-500" : "text-destructive"}>
                  {result.message || result.error}
                </span>
              </div>

              {result.steps && result.steps.length > 0 && (
                <div className="mb-3">
                  <p className="text-muted-foreground text-xs font-medium mb-1.5">Completed Steps:</p>
                  <ul className="space-y-1">
                    {result.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-green-400">
                        <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.errors && result.errors.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs font-medium mb-1.5">Warnings (non-critical):</p>
                  <ul className="space-y-1">
                    {result.errors.map((err, i) => (
                      <li key={i} className="flex items-start gap-2 text-yellow-400">
                        <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="text-xs">{err}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    If auto setup shows errors for SQL tables, use Option 2 below and run the SQL manually in Supabase.
                  </p>
                </div>
              )}

              {result.success && (
                <div className="mt-3 pt-3 border-t border-green-500/20">
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Go to Admin Login
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Option 2 — Manual SQL */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-base">Option 2 — Manual SQL (Supabase Editor)</h2>
            <button
              onClick={copySQL}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-1.5"
            >
              {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy SQL</>}
            </button>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Go to your{" "}
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              Supabase Dashboard
            </a>
            {" "}→ SQL Editor → paste and run the script below.
          </p>
          <pre className="bg-background border border-border rounded-lg p-4 text-xs text-muted-foreground overflow-auto max-h-[400px] font-mono leading-relaxed whitespace-pre">
            {SQL_SCRIPT}
          </pre>
        </div>

        <div className="mt-6 text-center">
          <Link href="/admin/login" className="text-sm text-gold hover:underline">
            Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  )
}
