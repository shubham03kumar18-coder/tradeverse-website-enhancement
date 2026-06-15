import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, BookOpen, ShoppingBag, MessageSquare, LogOut } from 'lucide-react'
import { logoutUser } from '@/app/actions/auth'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/ebooks', label: 'Ebooks', icon: BookOpen },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, full_name')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">You do not have admin access.</p>
          <Link href="/dashboard" className="text-gold hover:underline">Go to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/tradeverse-city-logo.png" alt="Logo" fill className="object-contain rounded-full" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">TRADEVERSE</div>
              <div className="text-[9px] text-gold tracking-widest">ADMIN PANEL</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-3 truncate">
            {profile.full_name || user.email}
          </div>
          <form action={logoutUser}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
