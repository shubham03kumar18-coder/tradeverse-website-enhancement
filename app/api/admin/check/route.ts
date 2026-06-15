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

    // Use service-role client to bypass RLS when checking the profiles table
    const adminClient = createAdminClient()
    const { data: profile, error: profileError } = await adminClient
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { isAdmin: false, error: 'Profile not found' },
        { status: 404 }
      )
    }

    const isAdmin = profile.is_admin === true

    return NextResponse.json({ isAdmin })
  } catch (err) {
    return NextResponse.json({ isAdmin: false, error: String(err) }, { status: 500 })
  }
}
