"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3" role="list">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-border rounded-xl overflow-hidden bg-card/60 transition-all duration-200"
          role="listitem"
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground hover:text-gold transition-colors duration-150"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <ChevronDown
              className={`w-4 h-4 shrink-0 text-gold transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
