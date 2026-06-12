export const PHONE = "919318336747"
export const PHONE_DISPLAY = "+91 93183 36747"
export const TEL_LINK = `tel:+${PHONE}`
export const TG_LINK = `https://t.me/+${PHONE}`
export const IG_LINK = "https://instagram.com/TRADEVERSE_CITY"

export const AUTO_MSG_ENCODED =
  "Hi%20TRADEVERSE%20CITY%2C%20I%20want%20to%20start%20learning%20the%20stock%20market%20and%20would%20like%20more%20information%20about%20your%20training%20program."

export const WA_BASE = `https://wa.me/${PHONE}?text=${AUTO_MSG_ENCODED}`

export function makeWA(extra?: string) {
  if (!extra) return WA_BASE
  return `${WA_BASE}%0A%0A${encodeURIComponent(extra)}`
}

// Learning Platform routes
export const LEARNING_HUBS = [
  {
    label: "Beginner Hub",
    slug: "beginner-hub",
    desc: "Start from zero and build a rock-solid trading foundation.",
  },
  {
    label: "Technical Analysis Center",
    slug: "technical-analysis-center",
    desc: "Master charts, indicators, and price patterns.",
  },
  {
    label: "Trading Psychology Center",
    slug: "trading-psychology-center",
    desc: "Develop the mental discipline every professional trader needs.",
  },
  {
    label: "Risk Management Center",
    slug: "risk-management-center",
    desc: "Protect your capital and trade with precision.",
  },
  {
    label: "Learning Resources Library",
    slug: "learning-resources-library",
    desc: "Curated books, videos, and tools for continuous learning.",
  },
  {
    label: "Market Research Center",
    slug: "market-research-center",
    desc: "Build data-driven trading decisions from real market analysis.",
  },
  {
    label: "Community Learning Hub",
    slug: "community-learning-hub",
    desc: "Learn alongside fellow traders and grow together.",
  },
]

// Trading Course routes
export const TRADING_COURSES = [
  {
    label: "Stock Market Fundamentals",
    slug: "stock-market-fundamentals",
    desc: "Understand how markets work, order types, and market participants.",
  },
  {
    label: "Candlestick Analysis",
    slug: "candlestick-analysis",
    desc: "Read every candlestick pattern and understand what price is telling you.",
  },
  {
    label: "Support & Resistance",
    slug: "support-and-resistance",
    desc: "Identify key price levels where buyers and sellers consistently react.",
  },
  {
    label: "Trend Analysis",
    slug: "trend-analysis",
    desc: "Trade with the market trend and maximise your edge.",
  },
  {
    label: "Technical Analysis",
    slug: "technical-analysis",
    desc: "A complete system combining indicators, patterns, and price action.",
  },
  {
    label: "Price Action Trading",
    slug: "price-action-trading",
    desc: "Trade using raw price movement without relying on lagging indicators.",
  },
  {
    label: "Swing Trading",
    slug: "swing-trading",
    desc: "Capture multi-day moves in the market for consistent returns.",
  },
  {
    label: "Intraday Trading",
    slug: "intraday-trading",
    desc: "Master the skills needed to trade within a single session.",
  },
  {
    label: "Risk Management",
    slug: "risk-management",
    desc: "Preserve capital and grow your account with disciplined risk rules.",
  },
  {
    label: "Trading Psychology",
    slug: "trading-psychology",
    desc: "Overcome fear, greed, and bias to trade with a clear mind.",
  },
  {
    label: "Options Trading Fundamentals",
    slug: "options-trading-fundamentals",
    desc: "Understand options, greeks, and how to use them strategically.",
  },
  {
    label: "Futures Market Basics",
    slug: "futures-market-basics",
    desc: "Learn futures contracts, margin, and hedging strategies.",
  },
  {
    label: "Portfolio Management",
    slug: "portfolio-management",
    desc: "Build and manage a diversified trading and investment portfolio.",
  },
  {
    label: "Market Research Techniques",
    slug: "market-research-techniques",
    desc: "Research stocks, sectors, and macro trends like a professional.",
  },
]
