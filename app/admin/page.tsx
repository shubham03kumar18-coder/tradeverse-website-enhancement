import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import Link from "next/link"
import { BookOpen, ShoppingBag, MessageSquare, TrendingUp, Users, ArrowRight } from "lucide-react"

export const metadata = { title: "Admin Dashboard | Tradeverse City" }

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  // Use service-role client to bypass RLS for the admin check
  const adminClient = createAdminClient()
  const { data: profile } = await adminClient
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) redirect("/dashboard")
  return { supabase: adminClient, user }
}

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin()

  const [
    { count: ebooksCount },
    { count: ordersCount },
    { count: inquiriesCount },
    { count: usersCount },
    { data: revenueData },
  ] = await Promise.all([
    supabase.from("ebooks").select("id", { count: "exact", head: true }),
    supabase.from("purchases").select("id", { count: "exact", head: true }).eq("status", "paid"),
    supabase.from("contact_inquiries").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("purchases").select("amount_inr").eq("status", "paid"),
  ])

  const totalRevenue = revenueData?.reduce((sum, p) => sum + (p.amount_inr ?? 0), 0) ?? 0

  const stats = [
    { icon: BookOpen, label: "Published Ebooks", value: ebooksCount ?? 0, href: "/admin/ebooks", color: "text-gold" },
    { icon: ShoppingBag, label: "Paid Orders", value: ordersCount ?? 0, href: "/admin/orders", color: "text-green-500" },
    { icon: TrendingUp, label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, href: "/admin/orders", color: "text-blue-400" },
    { icon: MessageSquare, label: "Inquiries", value: inquiriesCount ?? 0, href: "/admin/inquiries", color: "text-yellow-400" },
    { icon: Users, label: "Registered Users", value: usersCount ?? 0, href: "/admin/ebooks", color: "text-purple-400" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Tradeverse City — Control Panel</p>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-gold transition-colors">
            View Site
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map(({ icon: Icon, label, value, href, color }) => (
            <Link
              key={label}
              href={href}
              className="group bg-card border border-border rounded-2xl p-5 hover:border-gold/40 transition-all card-glow"
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className={`w-6 h-6 ${color}`} />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/ebooks" className="flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:border-gold/40 transition-all card-glow group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Manage Ebooks</p>
                <p className="text-xs text-muted-foreground">Add, edit, publish ebooks</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
          </Link>
          <Link href="/admin/orders" className="flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:border-gold/40 transition-all card-glow group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Orders & Revenue</p>
                <p className="text-xs text-muted-foreground">View all transactions</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
          </Link>
          <Link href="/admin/inquiries" className="flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:border-gold/40 transition-all card-glow group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Inquiries</p>
                <p className="text-xs text-muted-foreground">Customer messages</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
          </Link>
        </div>
      </div>
    </main>
  )
}
