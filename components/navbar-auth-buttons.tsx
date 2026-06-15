'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { logoutUser } from '@/app/actions/auth'
import { User, LogOut, LayoutDashboard, Shield } from 'lucide-react'

interface NavbarAuthButtonsProps {
  user: { email?: string; full_name?: string; is_admin?: boolean } | null
}

export default function NavbarAuthButtons({ user }: NavbarAuthButtonsProps) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser()
    })
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-sm font-medium text-foreground hover:text-gold transition-colors border border-border rounded-lg"
        >
          Sign In
        </Link>
        <Link
          href="/catalog"
          className="px-4 py-2 text-sm font-bold bg-gold text-background rounded-lg hover:opacity-90 transition-opacity"
        >
          Browse Ebooks
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {user.is_admin && (
        <Link
          href="/admin"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gold border border-gold/30 rounded-lg hover:bg-gold/10 transition-colors"
        >
          <Shield className="w-3.5 h-3.5" />
          Admin
        </Link>
      )}
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-gold transition-colors"
      >
        <LayoutDashboard className="w-3.5 h-3.5" />
        Dashboard
      </Link>
      <div className="flex items-center gap-1.5 px-2 py-2 text-xs text-muted-foreground">
        <User className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="max-w-[80px] truncate">{user.full_name || user.email}</span>
      </div>
      <button
        onClick={handleLogout}
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
        aria-label="Sign out"
      >
        <LogOut className="w-3.5 h-3.5" />
        {isPending ? '...' : 'Sign out'}
      </button>
    </div>
  )
}
