import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import NavbarWrapper from "@/components/navbar-wrapper"
import Footer from "@/components/footer"
import { BookOpen, ArrowRight, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import BuyButton from "@/components/buy-button"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: ebook } = await supabase
    .from("ebooks")
    .select("title, description")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!ebook) return { title: "Ebook Not Found | Tradeverse City" }

  return {
    title: `${ebook.title} | Tradeverse City`,
    description: ebook.description,
  }
}

export default async function EbookDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const [{ data: ebook }, { data: { user } }] = await Promise.all([
    supabase
      .from("ebooks")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single(),
    supabase.auth.getUser(),
  ])

  if (!ebook) notFound()

  // Check if user has purchased
  let isPurchased = false
  if (user) {
    const { data: purchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("ebook_id", ebook.id)
      .eq("status", "paid")
      .single()
    isPurchased = !!purchase
  }

  // Fetch related ebooks
  const { data: related } = await supabase
    .from("ebooks")
    .select("id, title, slug, cover_url, price_inr, is_free")
    .eq("is_published", true)
    .neq("id", ebook.id)
    .limit(3)

  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen bg-background pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/ebooks" className="hover:text-gold transition-colors">Ebooks</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-xs">{ebook.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: details */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Cover + header */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-48 flex-shrink-0 aspect-[3/4] rounded-xl overflow-hidden border border-border">
                  {ebook.cover_url ? (
                    <Image src={ebook.cover_url} alt={ebook.title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                      <BookOpen className="w-16 h-16 text-gold/30" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {ebook.is_free && (
                    <span className="inline-flex w-fit px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full text-xs font-bold">
                      FREE
                    </span>
                  )}
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">{ebook.title}</h1>
                  {ebook.author && (
                    <p className="text-sm text-muted-foreground">By <span className="text-gold font-medium">{ebook.author}</span></p>
                  )}
                  {ebook.page_count && (
                    <p className="text-xs text-muted-foreground">{ebook.page_count} pages</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {ebook.tags?.map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              {ebook.description && (
                <div className="prose prose-invert prose-sm max-w-none">
                  <h2 className="text-lg font-bold text-foreground mb-2">About this Ebook</h2>
                  <p className="text-muted-foreground leading-relaxed">{ebook.description}</p>
                </div>
              )}
            </div>

            {/* Right: buy card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-2xl shadow-black/40 flex flex-col gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">
                    {ebook.is_free ? "Free" : `₹${ebook.price_inr.toLocaleString("en-IN")}`}
                  </p>
                  {isPurchased && (
                    <p className="text-xs text-green-500 font-medium mt-1">You own this ebook</p>
                  )}
                </div>

                <BuyButton
                  ebookId={ebook.id}
                  ebookTitle={ebook.title}
                  priceInr={ebook.price_inr}
                  isFree={ebook.is_free}
                  isPurchased={isPurchased}
                  userEmail={user?.email}
                  userName={user?.user_metadata?.full_name}
                />

                {!user && (
                  <p className="text-xs text-muted-foreground text-center">
                    <Link href={`/auth/login?next=/ebooks/${slug}`} className="text-gold hover:underline">
                      Sign in
                    </Link>{" "}
                    to purchase
                  </p>
                )}

                <div className="pt-3 border-t border-border flex flex-col gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    Instant digital access after purchase
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    Read in-browser — no download needed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related && related.length > 0 && (
            <section className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">More Ebooks</h2>
                <Link href="/ebooks" className="flex items-center gap-1 text-sm text-gold hover:underline">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/ebooks/${r.slug}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all card-glow flex flex-col"
                  >
                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      {r.cover_url ? (
                        <Image src={r.cover_url} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                          <BookOpen className="w-10 h-10 text-gold/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-gold transition-colors line-clamp-2 mb-1">{r.title}</h3>
                      <p className="text-gold font-bold text-sm">{r.is_free ? "Free" : `₹${r.price_inr.toLocaleString("en-IN")}`}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
