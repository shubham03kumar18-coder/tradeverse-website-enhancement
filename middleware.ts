import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

const PROTECTED = ["/dashboard", "/admin"]
const AUTH_ROUTES = ["/auth/login", "/auth/signup"]
// Admin login is public — don't block it as part of /admin
const PUBLIC_ADMIN = ["/admin/login"]

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const pathname = request.nextUrl.pathname

  // Allow /admin/login without auth — never redirect here, let the page handle it
  if (PUBLIC_ADMIN.some((p) => pathname.startsWith(p))) {
    return supabaseResponse
  }

  // Redirect unauthenticated users away from protected routes
  if (!user && PROTECTED.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone()
    // Admin pages redirect to admin login; others go to regular login
    url.pathname = pathname.startsWith("/admin") ? "/admin/login" : "/auth/login"
    url.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(url)
  }

  // Redirect already-authenticated users away from auth pages
  if (user && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
  ],
}
