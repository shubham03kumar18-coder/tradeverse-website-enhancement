import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import NavbarWrapper from "@/components/navbar-wrapper"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ShoppingBag, User, ArrowRight, LogOut } from "lucide-react"
import { signOut } from "@/app/auth/actions"

export const metadata = {
  title: "My Dashboard | Tradeverse City",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login?next=/dashboard")

  // Fetch owned ebooks
  const { data: purchases } = await supabase
    .from("purchases")
    .select("id, created_at, amount_inr, ebook:ebooks(id, title, slug, cover_url, is_free)")
    .eq("user_id", user.id)
    .eq("status", "paid")
    .order("created_at", { ascending: false })

  const recentLibrary = purchases?.slice(0, 4) ?? []

  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, <span className="text-gold">{user.user_metadata?.full_name ?? user.email?.split("@")[0]}</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:border-destructive/50 hover:text-destructive transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: BookOpen, label: "Ebooks Owned", value: purchases?.length ?? 0, href: "/dashboard/library" },
              { icon: ShoppingBag, label: "Total Orders", value: purchases?.length ?? 0, href: "/dashboard/orders" },
              { icon: User, label: "Profile", value: "Edit", href: "/dashboard/profile" },
            ].map(({ icon: Icon, label, value, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-gold/40 transition-all card-glow"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-bold text-foreground text-lg group-hover:text-gold transition-colors">{value}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-gold transition-colors" />
              </Link>
            ))}
          </div>

          {/* Library preview */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">My Library</h2>
              <Link href="/dashboard/library" className="flex items-center gap-1 text-sm text-gold hover:underline">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentLibrary.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-10 text-center">
                <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-muted-foreground mb-4">You haven&apos;t purchased any ebooks yet.</p>
                <Link
                  href="/ebooks"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-background font-bold text-sm rounded-xl hover:opacity-90 transition-all"
                >
                  Browse Ebooks <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recentLibrary.map((p: any) => {
                  const ebook = p.ebook as any
                  return (
                    <Link
                      key={p.id}
                      href={`/dashboard/library/${ebook.id}`}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all card-glow"
                    >
                      <div className="relative aspect-[3/4] bg-muted">
                        {ebook.cover_url ? (
                          <Image src={ebook.cover_url} alt={ebook.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                            <BookOpen className="w-10 h-10 text-gold/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-xs text-foreground group-hover:text-gold transition-colors line-clamp-2">{ebook.title}</h3>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
