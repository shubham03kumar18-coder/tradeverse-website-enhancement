import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Use the session-aware client only to identify the current user
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
    }

    // Use the service-role client to bypass RLS and query the profile
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

    const isAdmin = profile.is_admin === true || profile.is_admin === 1

    return NextResponse.json({ isAdmin })
  } catch (err) {
    return NextResponse.json({ isAdmin: false, error: String(err) }, { status: 500 })
  }
}
