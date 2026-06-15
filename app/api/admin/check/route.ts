import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get the currently authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    console.log('Auth user:', user?.id, user?.email)
    if (userError) console.error('User error:', userError)

    if (userError || !user) {
      return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
    }

    // Query the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin, user_id, email')
      .eq('user_id', user.id)
      .single()

    console.log('Profile data:', profile)
    console.log('Profile error:', profileError)

    if (profileError || !profile) {
      console.error('Full profile error:', profileError)
      return NextResponse.json(
        { isAdmin: false, error: 'Profile not found', debug: profileError?.message },
        { status: 404 }
      )
    }

    console.log('is_admin value:', profile.is_admin, 'type:', typeof profile.is_admin)
    const isAdmin = profile.is_admin === true || profile.is_admin === 1

    return NextResponse.json({ isAdmin })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ isAdmin: false, error: String(err) }, { status: 500 })
  }
}