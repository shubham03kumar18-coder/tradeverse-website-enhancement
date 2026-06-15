import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import NavbarWrapper from "@/components/navbar-wrapper"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import ProfileForm from "@/components/profile-form"

export const metadata = { title: "Profile Settings | Tradeverse City" }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/dashboard/profile")

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .single()

  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/dashboard" className="text-muted-foreground hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
              <p className="text-sm text-muted-foreground">Update your personal information</p>
            </div>
          </div>

          {/* Avatar placeholder */}
          <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl mb-6">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-gold" />
            </div>
            <div>
              <p className="font-bold text-foreground">{profile?.full_name ?? user.user_metadata?.full_name ?? "—"}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <ProfileForm
              userId={user.id}
              initialName={profile?.full_name ?? user.user_metadata?.full_name ?? ""}
              initialPhone={profile?.phone ?? ""}
              email={user.email ?? ""}
            />
          </div>
        </div>
      </main>
    </>
  )
}
