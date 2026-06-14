import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import NavbarWrapper from "@/components/navbar-wrapper"
import { BookOpen, ArrowLeft } from "lucide-react"

export const metadata = { title: "My Library | Tradeverse City" }

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/dashboard/library")

  const { data: purchases } = await supabase
    .from("purchases")
    .select("id, created_at, ebook:ebooks(id, title, slug, cover_url, is_free, price_inr)")
    .eq("user_id", user.id)
    .eq("status", "paid")
    .order("created_at", { ascending: false })

  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/dashboard" className="text-muted-foreground hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Library</h1>
              <p className="text-sm text-muted-foreground">{purchases?.length ?? 0} ebooks owned</p>
            </div>
          </div>

          {!purchases || purchases.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-16 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground mb-5">Your library is empty. Start learning today!</p>
              <Link href="/ebooks" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-background font-bold text-sm rounded-xl hover:opacity-90 transition-all">
                Browse Ebooks
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {purchases.map((p: any) => {
                const ebook = p.ebook as any
                return (
                  <Link
                    key={p.id}
                    href={`/dashboard/library/${ebook.id}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all card-glow flex flex-col"
                  >
                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      {ebook.cover_url ? (
                        <Image src={ebook.cover_url} alt={ebook.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                          <BookOpen className="w-10 h-10 text-gold/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <span className="px-3 py-1.5 bg-gold text-background text-xs font-bold rounded-lg">Read Now</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-xs text-foreground group-hover:text-gold transition-colors line-clamp-2">{ebook.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
