import { createClient } from "@/lib/supabase/server"
import NavbarClient from "./navbar"

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if admin
  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()
    isAdmin = profile?.is_admin ?? false
  }

  return (
    <NavbarClient
      user={user ? { email: user.email ?? "", fullName: user.user_metadata?.full_name ?? "" } : null}
      isAdmin={isAdmin}
    />
  )
}
