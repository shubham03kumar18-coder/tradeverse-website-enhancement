import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react"

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  const adminClient = createAdminClient()
  const { data: profile } = await adminClient.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) redirect("/dashboard")
  return adminClient
}

export const metadata = { title: "Orders | Admin" }

export default async function AdminOrdersPage() {
  const supabase = await requireAdmin()

  const { data: orders } = await supabase
    .from("purchases")
    .select("id, created_at, amount_inr, status, razorpay_order_id, razorpay_payment_id, user_id, ebook:ebooks(title, slug), profile:profiles(full_name)")
    .order("created_at", { ascending: false })

  const totalRevenue = orders?.filter((o) => o.status === "paid").reduce((sum, o) => sum + (o.amount_inr ?? 0), 0) ?? 0
  const paidCount = orders?.filter((o) => o.status === "paid").length ?? 0

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin" className="text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders & Revenue</h1>
            <p className="text-sm text-muted-foreground">{orders?.length ?? 0} total orders</p>
          </div>
        </div>

        {/* Revenue stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gold" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">Total Revenue</p>
            </div>
            <p className="text-2xl font-bold text-gold">₹{totalRevenue.toLocaleString("en-IN")}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">Paid Orders</p>
            </div>
            <p className="text-2xl font-bold text-green-500">{paidCount}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">All Orders</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{orders?.length ?? 0}</p>
          </div>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">No orders yet.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Orders table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Ebook</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">User</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Amount</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Payment ID</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any, i) => {
                    const ebook = order.ebook as any
                    const profile = order.profile as any
                    return (
                      <tr key={order.id} className={`border-b border-border hover:bg-muted/30 transition-colors ${i === orders.length - 1 ? "border-0" : ""}`}>
                        <td className="px-5 py-4">
                          <Link href={`/ebooks/${ebook?.slug}`} className="font-medium text-foreground hover:text-gold transition-colors">
                            {ebook?.title ?? "—"}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground text-xs">{profile?.full_name ?? order.user_id?.slice(0, 8)}</td>
                        <td className="px-5 py-4 font-bold text-gold">{order.amount_inr === 0 ? "Free" : `₹${order.amount_inr.toLocaleString("en-IN")}`}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            order.status === "paid" ? "border-green-500/30 bg-green-500/10 text-green-500" :
                            order.status === "pending" ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500" :
                            "border-destructive/30 bg-destructive/10 text-destructive"
                          }`}>
                            {order.status === "paid" ? <CheckCircle className="w-3 h-3" /> : order.status === "pending" ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted-foreground font-mono">{order.razorpay_payment_id ?? "—"}</td>
                        <td className="px-5 py-4 text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
