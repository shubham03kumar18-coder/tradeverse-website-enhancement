import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Orders | Admin' }

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*, ebook:ebooks(title), profile:profiles(full_name, email)')
    .order('purchased_at', { ascending: false })

  const orders = purchases ?? []
  const completed = orders.filter(o => o.payment_status === 'completed')
  const totalRevenue = completed.reduce((sum, o) => sum + Number(o.amount), 0)

  const stats = [
    { label: 'Total Orders', value: orders.length },
    { label: 'Completed', value: completed.length },
    { label: 'Pending', value: orders.filter(o => o.payment_status === 'pending').length },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">All payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Ebook</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No orders yet</td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-foreground">{order.profile?.full_name || order.profile?.email || '—'}</td>
                    <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate">{order.ebook?.title || '—'}</td>
                    <td className="px-6 py-4 text-gold font-medium">₹{Number(order.amount).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.payment_status === 'completed' ? 'bg-green-500/10 text-green-400' :
                        order.payment_status === 'failed' ? 'bg-destructive/10 text-destructive' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs font-mono">{order.order_id}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {new Date(order.purchased_at).toLocaleDateString('en-IN')}
                    </td>
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
