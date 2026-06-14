import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src="/tradeverse-city-logo.png"
            alt="Tradeverse City Logo"
            fill
            className="object-contain rounded-full"
            priority
          />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-foreground text-sm tracking-wide">TRADEVERSE</span>
          <span className="text-gold text-[10px] tracking-widest font-medium">CITY</span>
        </div>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl shadow-black/40 p-8">
        {children}
      </div>
    </div>
  )
}
