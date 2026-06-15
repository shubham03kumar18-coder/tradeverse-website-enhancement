import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  // Get the currently authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
  }

  // Query the profiles table using RLS (authenticated users can read own row)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .single()

  if (profileError || !profile) {
    console.error('Profile fetch error:', profileError)
    return NextResponse.json({ isAdmin: false, error: 'Profile not found' }, { status: 404 })
  }

  return NextResponse.json({ isAdmin: profile.is_admin === true })
}