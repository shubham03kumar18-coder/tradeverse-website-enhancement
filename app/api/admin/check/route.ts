import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ isAdmin: false }, { status: 401 })
  }

  const adminClient = createAdminClient()
  const { data: profile } = await adminClient
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  return NextResponse.json({ isAdmin: profile?.is_admin === true })
}
