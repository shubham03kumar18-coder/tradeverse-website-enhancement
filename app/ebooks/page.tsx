import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { Ebook } from "@/lib/types"
import { BookOpen, Tag, Star, ArrowRight } from "lucide-react"
import NavbarWrapper from "@/components/navbar-wrapper"

export const metadata = {
  title: "Ebooks | Tradeverse City",
  description: "Premium trading ebooks — master technical analysis, risk management, trading psychology, and more.",
}

export default async function EbooksPage() {
  const supabase = await createClient()
  const { data: ebooks } = await supabase
    .from("ebooks")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  const list = (ebooks ?? []) as Ebook[]

  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen bg-background pt-24 pb-20 px-4">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Premium Knowledge
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Tradeverse City <span className="text-gold">Ebooks</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Hand-crafted trading guides written by our expert mentors. From beginner fundamentals to advanced strategies — your edge starts here.
          </p>
        </section>

        {/* Grid */}
        {list.length === 0 ? (
          <div className="max-w-lg mx-auto text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
            <p className="text-muted-foreground text-sm">Our team is crafting premium ebooks for you. Check back soon.</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((book) => (
              <EbookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}

function EbookCard({ book }: { book: Ebook }) {
  return (
    <Link
      href={`/ebooks/${book.slug}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 card-glow"
    >
      {/* Cover */}
      <div className="relative aspect-[3/2] bg-muted overflow-hidden">
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-muted-foreground opacity-30" />
          </div>
        )}
        {book.is_free && (
          <div className="absolute top-3 left-3 bg-gold text-background text-xs font-bold px-2.5 py-1 rounded-full">
            FREE
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h2 className="text-foreground font-bold text-base leading-snug mb-1 group-hover:text-gold transition-colors line-clamp-2">
          {book.title}
        </h2>
        {book.author && (
          <p className="text-muted-foreground text-xs mb-2">by {book.author}</p>
        )}
        {book.description && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{book.description}</p>
        )}

        {/* Tags */}
        {book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {book.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gold font-bold text-lg">
            {book.is_free ? "Free" : `₹${book.price_inr.toLocaleString("en-IN")}`}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-gold transition-colors font-medium">
            View Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}
