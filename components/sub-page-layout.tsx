import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import NavbarWrapper from "@/components/navbar-wrapper"
import FloatingButtons from "@/components/floating-buttons"
import SubPageCTA from "@/components/sub-page-cta"

interface SubPageLayoutProps {
  children: React.ReactNode
  backHref: string
  backLabel: string
  topic: string
}

export default function SubPageLayout({
  children,
  backHref,
  backLabel,
  topic,
}: SubPageLayoutProps) {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <NavbarWrapper />
      {/* Push content below fixed navbar (64px) */}
      <div className="h-16" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center gap-2">
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {backLabel}
          </Link>
          <span className="text-border text-xs" aria-hidden="true">/</span>
          <span className="text-xs text-foreground font-medium truncate">{topic}</span>
        </div>
      </div>

      {children}

      <SubPageCTA topic={topic} />
      <FloatingButtons />
    </main>
  )
}
