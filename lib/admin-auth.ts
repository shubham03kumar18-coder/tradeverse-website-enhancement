/**
 * Shared admin authentication helper.
 *
 * Checks admin status using two strategies (in order):
 *  1. user.app_metadata.is_admin — set by service-role, works without a profiles table
 *  2. profiles.is_admin via service-role REST — works once the SQL has been run
 *
 * This means the admin panel is fully accessible even before the SQL tables are created,
 * as long as the setup page has been run to set app_metadata.is_admin = true.
 */
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // Strategy 1: app_metadata.is_admin (no DB required)
  if (user.app_metadata?.is_admin === true) {
    return { user, adminClient: createAdminClient() }
  }

  // Strategy 2: profiles table
  try {
    const adminClient = createAdminClient()
    const { data: profile } = await adminClient
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profile?.is_admin === true) {
      return { user, adminClient }
    }
  } catch {
    // profiles table not yet available
  }

  redirect('/dashboard')
}
