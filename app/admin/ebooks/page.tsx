import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, BookOpen, Eye, EyeOff, Pencil } from "lucide-react"

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  const adminClient = createAdminClient()
  const { data: profile } = await adminClient.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) redirect("/dashboard")
  return adminClient
}

export const metadata = { title: "Manage Ebooks | Admin" }

export default async function AdminEbooksPage() {
  const supabase = await requireAdmin()

  const { data: ebooks } = await supabase
    .from("ebooks")
    .select("id, title, slug, price_inr, is_free, is_published, created_at, page_count")
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ebooks</h1>
              <p className="text-sm text-muted-foreground">{ebooks?.length ?? 0} total ebooks</p>
            </div>
          </div>
          <Link
            href="/admin/ebooks/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gold text-background font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-lg shadow-gold/20"
          >
            <Plus className="w-4 h-4" />
            Add Ebook
          </Link>
        </div>

        {!ebooks || ebooks.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground mb-4">No ebooks yet. Create your first one!</p>
            <Link href="/admin/ebooks/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-background font-bold text-sm rounded-xl hover:opacity-90 transition-all">
              <Plus className="w-4 h-4" /> Add Ebook
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table" aria-label="Ebooks table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Title</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Price</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Pages</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Added</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ebooks.map((ebook, i) => (
                    <tr
                      key={ebook.id}
                      className={`border-b border-border hover:bg-muted/30 transition-colors ${i === ebooks.length - 1 ? "border-0" : ""}`}
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-foreground">{ebook.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{ebook.slug}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-gold">
                          {ebook.is_free ? "Free" : `₹${ebook.price_inr.toLocaleString("en-IN")}`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          ebook.is_published
                            ? "border-green-500/30 bg-green-500/10 text-green-500"
                            : "border-border bg-muted text-muted-foreground"
                        }`}>
                          {ebook.is_published ? (
                            <><Eye className="w-3 h-3" />Published</>
                          ) : (
                            <><EyeOff className="w-3 h-3" />Draft</>
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{ebook.page_count ?? "—"}</td>
                      <td className="px-5 py-4 text-muted-foreground text-xs">
                        {new Date(ebook.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/ebooks/${ebook.id}/edit`}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
