import { createClient } from "@supabase/supabase-js"

/** Service-role client — NEVER expose to the browser */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase admin environment variables are not configured. " +
      "Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Settings > Vars."
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
