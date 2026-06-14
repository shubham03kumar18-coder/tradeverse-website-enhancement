import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import NavbarWrapper from "@/components/navbar-wrapper"
import { ArrowLeft, ShoppingBag, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"

export const metadata = { title: "Order History | Tradeverse City" }

const statusIcon = {
  paid: CheckCircle,
  pending: Clock,
  failed: XCircle,
}
const statusColor = {
  paid: "text-green-500",
  pending: "text-yellow-500",
  failed: "text-destructive",
}

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/dashboard/orders")

  const { data: purchases } = await supabase
    .from("purchases")
    .select("id, created_at, amount_inr, status, razorpay_order_id, razorpay_payment_id, ebook:ebooks(id, title, slug, cover_url)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/dashboard" className="text-muted-foreground hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Order History</h1>
              <p className="text-sm text-muted-foreground">{purchases?.length ?? 0} orders</p>
            </div>
          </div>

          {!purchases || purchases.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-16 text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground mb-5">No orders yet.</p>
              <Link href="/ebooks" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-background font-bold text-sm rounded-xl hover:opacity-90 transition-all">
                Browse Ebooks
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {purchases.map((p: any) => {
                const ebook = p.ebook as any
                const StatusIcon = statusIcon[p.status as keyof typeof statusIcon] ?? Clock
                const statusClass = statusColor[p.status as keyof typeof statusColor] ?? "text-muted-foreground"
                return (
                  <div key={p.id} className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <StatusIcon className={`w-5 h-5 ${statusClass}`} />
                      </div>
                      <div className="min-w-0">
                        <Link href={`/ebooks/${ebook?.slug}`} className="font-bold text-sm text-foreground hover:text-gold transition-colors truncate block">
                          {ebook?.title ?? "Unknown Ebook"}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          {p.razorpay_payment_id && ` · ${p.razorpay_payment_id}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="font-bold text-gold text-sm">
                        {p.amount_inr === 0 ? "Free" : `₹${p.amount_inr.toLocaleString("en-IN")}`}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize border ${
                        p.status === "paid" ? "border-green-500/30 bg-green-500/10 text-green-500" :
                        p.status === "pending" ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500" :
                        "border-destructive/30 bg-destructive/10 text-destructive"
                      }`}>
                        {p.status}
                      </span>
                      {p.status === "paid" && (
                        <Link href={`/dashboard/library/${ebook?.id}`} className="text-xs text-gold hover:underline">
                          Read
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
