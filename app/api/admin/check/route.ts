import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get the currently authenticated user via the cookie-based server client
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
    }

    // Primary check: app_metadata.is_admin (set by service-role, can't be self-assigned)
    // This works even before the profiles table exists
    if (user.app_metadata?.is_admin === true) {
      return NextResponse.json({ isAdmin: true })
    }

    // Secondary check: profiles table via service-role client (bypasses RLS)
    // Works once the SQL has been run and schema cache is populated
    try {
      const adminClient = createAdminClient()
      const { data: profile, error: profileError } = await adminClient
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (!profileError && profile?.is_admin === true) {
        return NextResponse.json({ isAdmin: true })
      }
    } catch {
      // profiles table not yet available — fall through
    }

    return NextResponse.json({ isAdmin: false, error: 'No admin access' })
  } catch (err) {
    return NextResponse.json({ isAdmin: false, error: String(err) }, { status: 500 })
  }
}
