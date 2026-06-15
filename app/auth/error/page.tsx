import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-destructive/10 border border-destructive/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Error</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Something went wrong during authentication. The link may have expired or already been used.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/auth/login"
            className="px-5 py-2.5 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 transition-all"
          >
            Back to Sign In
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded-lg hover:border-gold/50 hover:text-gold transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
