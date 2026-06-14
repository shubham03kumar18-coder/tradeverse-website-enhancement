import { createClient } from '@/lib/supabase/server'
import { DollarSign, BookOpen, Users, ShoppingBag, TrendingUp, MessageSquare } from 'lucide-react'

export const metadata = { title: 'Admin Dashboard | Tradeverse City' }

function StatCard({ label, value, sub, icon: Icon, accent }: { label: string; value: string | number; sub?: string; icon: any; accent?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${accent ?? 'text-foreground'}`}>{value}</p>
        </div>
        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-gold" />
        </div>
      </div>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [ebooksRes, purchasesRes, profilesRes, inquiriesRes] = await Promise.all([
    supabase.from('ebooks').select('id, is_active'),
    supabase.from('purchases').select('amount, payment_status, purchased_at'),
    supabase.from('profiles').select('id, created_at'),
    supabase.from('contact_inquiries').select('id, status, created_at'),
  ])

  const ebooks = ebooksRes.data ?? []
  const purchases = purchasesRes.data ?? []
  const profiles = profilesRes.data ?? []
  const inquiries = inquiriesRes.data ?? []

  const completedPurchases = purchases.filter(p => p.payment_status === 'completed')
  const totalRevenue = completedPurchases.reduce((sum, p) => sum + Number(p.amount), 0)

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())

  const monthRevenue = completedPurchases
    .filter(p => new Date(p.purchased_at) >= startOfMonth)
    .reduce((sum, p) => sum + Number(p.amount), 0)

  const weekRevenue = completedPurchases
    .filter(p => new Date(p.purchased_at) >= startOfWeek)
    .reduce((sum, p) => sum + Number(p.amount), 0)

  const avgOrderValue = completedPurchases.length > 0 ? totalRevenue / completedPurchases.length : 0
  const newInquiries = inquiries.filter(i => i.status === 'new').length

  const recentPurchasesRes = await supabase
    .from('purchases')
    .select('*, ebook:ebooks(title), profile:profiles(full_name, email)')
    .eq('payment_status', 'completed')
    .order('purchased_at', { ascending: false })
    .limit(10)

  const recentPurchases = recentPurchasesRes.data ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`} icon={DollarSign} accent="text-gold" />
        <StatCard label="Monthly Revenue" value={`₹${monthRevenue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`} icon={TrendingUp} />
        <StatCard label="Weekly Revenue" value={`₹${weekRevenue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`} icon={TrendingUp} />
        <StatCard label="Avg Order Value" value={`₹${avgOrderValue.toFixed(0)}`} icon={ShoppingBag} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Sales" value={completedPurchases.length} icon={ShoppingBag} />
        <StatCard label="Total Users" value={profiles.length} icon={Users} />
        <StatCard label="Total Ebooks" value={ebooks.length} sub={`${ebooks.filter(e => e.is_active).length} active`} icon={BookOpen} />
        <StatCard label="New Inquiries" value={newInquiries} sub={`${inquiries.length} total`} icon={MessageSquare} accent={newInquiries > 0 ? 'text-gold' : undefined} />
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Ebook</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No orders yet</td>
                </tr>
              ) : (
                recentPurchases.map((p: any) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-foreground">{p.profile?.full_name || p.profile?.email || '—'}</td>
                    <td className="px-6 py-4 text-muted-foreground">{p.ebook?.title || '—'}</td>
                    <td className="px-6 py-4 text-gold font-medium">₹{Number(p.amount).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-muted-foreground">{new Date(p.purchased_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
