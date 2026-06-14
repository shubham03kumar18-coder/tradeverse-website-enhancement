import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Auth Error | Tradeverse City',
}

export default function AuthErrorPage() {
  return (
    <div className="text-center space-y-4 py-4">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h1 className="text-xl font-bold text-foreground">Authentication Error</h1>
      <p className="text-muted-foreground text-sm">
        Something went wrong during authentication. The link may have expired or already been used.
      </p>
      <div className="flex flex-col gap-2 pt-2">
        <Link
          href="/auth/login"
          className="px-6 py-2.5 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Sign In
        </Link>
        <Link
          href="/auth/forgot-password"
          className="px-6 py-2.5 text-gold text-sm font-medium hover:underline"
        >
          Request a new link
        </Link>
      </div>
    </div>
  )
}
