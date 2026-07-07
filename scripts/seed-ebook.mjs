/**
 * One-time script: uploads Candlestick Hindi PDF to Supabase storage
 * and inserts the ebook row into the ebooks table.
 *
 * Run with:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/seed-ebook.mjs
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

// ── Download the PDF from the blob URL ─────────────────────────────────────
const PDF_BLOB_URL =
  "https://blobs.vusercontent.net/blob/Candlestick%20Hindi-nLcymW5lG4yCmJwgSwnQcVCSlO1cln.pdf"

console.log("Downloading PDF from blob URL...")
const pdfRes = await fetch(PDF_BLOB_URL)
if (!pdfRes.ok) {
  console.error("Failed to fetch PDF:", pdfRes.status, pdfRes.statusText)
  process.exit(1)
}
const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer())
console.log(`PDF downloaded: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`)

// ── Upload PDF to Supabase Storage (ebooks bucket) ──────────────────────────
const pdfPath = `pdfs/${Date.now()}-candlestick-hindi.pdf`
console.log(`Uploading PDF to storage bucket 'ebooks' at path: ${pdfPath}`)

const { error: uploadErr } = await admin.storage
  .from("ebooks")
  .upload(pdfPath, pdfBuffer, {
    contentType: "application/pdf",
    upsert: false,
  })

if (uploadErr) {
  console.error("PDF upload failed:", uploadErr.message)
  process.exit(1)
}
console.log("PDF uploaded successfully.")

// ── Insert ebook row ─────────────────────────────────────────────────────────
const { data, error: insertErr } = await admin
  .from("ebooks")
  .insert({
    title: "Candlestick Hindi — Complete Guide",
    slug: "candlestick-hindi-complete-guide",
    description:
      "A complete guide to stock market prediction through proper technical analysis. Covers Hammer, Bullish Engulfing, Morning Star, Piercing Pattern, Doji, Shooting Star, and 20+ more candlestick patterns — all explained in Hindi.",
    price_inr: 49,
    is_free: false,
    is_published: true,
    author: "Tradeverse City",
    tags: ["Trading", "Candlestick", "Hindi", "Technical Analysis", "Stock Market"],
    page_count: 45,
    cover_url: null,
    pdf_path: pdfPath,
  })
  .select("id, title, slug")
  .single()

if (insertErr) {
  console.error("Ebook insert failed:", insertErr.message)
  process.exit(1)
}

console.log("Ebook inserted successfully!")
console.log("  ID:   ", data.id)
console.log("  Title:", data.title)
console.log("  Slug: ", data.slug)
console.log("")
console.log("Done. Visit /ebooks to see the published ebook.")
