import type { Ebook } from "@/lib/types"

/**
 * Local ebook seed data — used as fallback when Supabase is not configured.
 * pdf_public_path is the /public-served PDF path for direct download.
 */
export type LocalEbook = Ebook & { pdf_public_path: string }

export const LOCAL_EBOOKS: LocalEbook[] = [
  {
    id: "candlestick-hindi-001",
    title: "Candlestick Chart Complete Guide (Hindi)",
    slug: "candlestick-hindi",
    description:
      "A complete guide to stock market prediction using proper technical analysis — in Hindi. Covers 30+ candlestick patterns including Hammer, Bullish Engulfing, Morning Star, Shooting Star, Doji, and more. Perfect for beginners and intermediate traders who want to master chart reading.",
    author: "Tradeverse City",
    price_inr: 0,
    is_free: true,
    is_published: true,
    page_count: 50,
    tags: ["candlestick", "technical analysis", "hindi", "stock market", "beginner"],
    cover_url: "/ebooks/candlestick-hindi-cover.png",
    pdf_path: "/ebooks/candlestick-hindi.pdf",
    pdf_public_path: "/ebooks/candlestick-hindi.pdf",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
