"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"

const tickerItems = [
  { symbol: "NIFTY 50", price: "22,456.80", change: "+0.34%", up: true },
  { symbol: "BANKNIFTY", price: "48,234.15", change: "+0.28%", up: true },
  { symbol: "SENSEX", price: "73,847.25", change: "+0.31%", up: true },
  { symbol: "RELIANCE", price: "2,841.60", change: "+0.85%", up: true },
  { symbol: "TCS", price: "3,892.40", change: "-0.42%", up: false },
  { symbol: "INFOSYS", price: "1,487.30", change: "+1.12%", up: true },
  { symbol: "HDFC BANK", price: "1,624.55", change: "+0.19%", up: true },
  { symbol: "ICICI BANK", price: "1,087.40", change: "+0.63%", up: true },
  { symbol: "WIPRO", price: "462.80", change: "-0.27%", up: false },
  { symbol: "BHARTI AIRTEL", price: "1,398.75", change: "+0.92%", up: true },
]

function TickerItem({ symbol, price, change, up }: { symbol: string; price: string; change: string; up: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 px-0.5 whitespace-nowrap" aria-label={`${symbol}: ${price} ${change}`}>
      <span className="text-[11px] font-bold tracking-wide text-foreground/70">{symbol}</span>
      <span className="text-[11px] font-semibold text-foreground">{price}</span>
      <span className={`text-[11px] font-bold ${up ? "text-emerald-400" : "text-red-400"}`}>
        {up ? "▲" : "▼"} {change}
      </span>
      <span className="mx-2 text-gold/40 font-light">|</span>
    </span>
  )
}

export default function MarketTicker() {
  const [paused, setPaused] = useState(false)
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div
      className="w-full overflow-hidden border-b border-border"
      style={{ background: "oklch(0.11 0 0)", height: "36px" }}
      aria-label="Sample market data — for illustration only"
    >
      <div className="flex items-center h-full">
        {/* Label */}
        <span
          className="text-[9px] font-black tracking-[0.2em] uppercase px-3 whitespace-nowrap border-r border-gold/20 mr-3 shrink-0"
          style={{ color: "oklch(0.78 0.14 85)" }}
          aria-hidden="true"
        >
          SAMPLE
        </span>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1">
          <div
            className={`flex items-center ${paused ? "" : "animate-marquee"}`}
            style={{ width: "max-content" }}
            aria-live="off"
          >
            {doubled.map((item, i) => (
              <TickerItem key={`${item.symbol}-${i}`} {...item} />
            ))}
          </div>
        </div>

        {/* Pause / Resume button */}
        <button
          onClick={() => setPaused((p) => !p)}
          className="shrink-0 px-2 h-full flex items-center border-l border-gold/20 text-muted-foreground hover:text-gold transition-colors duration-200"
          aria-label={paused ? "Resume market ticker" : "Pause market ticker"}
          title={paused ? "Resume" : "Pause"}
        >
          {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </div>
  )
}
