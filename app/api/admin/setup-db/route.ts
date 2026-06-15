import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-setup-secret')
    if (secret !== 'tradeverse-setup-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminClient = createAdminClient()
    const steps: string[] = []
    const errors: string[] = []

    // ─── 1. Verify tables via Supabase admin client ──────────────────────────
    const tableChecks = ['profiles', 'ebooks', 'purchases', 'contact_inquiries']
    for (const table of tableChecks) {
      const { error } = await adminClient.from(table as any).select('id').limit(1)
      if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
        errors.push(`${table} table missing — run SQL manually`)
      } else if (error && error.message?.includes('schema cache')) {
        errors.push(`${table} table: schema cache not refreshed yet — try again in 10 seconds`)
      } else {
        steps.push(`${table} table exists`)
      }
    }

    // ─── 2. Admin user: create or reset password + set is_admin ─────────────
    const { data: authUsers, error: authErr } = await adminClient.auth.admin.listUsers()

    if (authErr) {
      errors.push(`List auth users: ${authErr.message}`)
    } else {
      const adminUser = authUsers.users.find((u) => u.email === 'tradeversecity@gmail.com')

      if (adminUser) {
        // Reset password AND set app_metadata.is_admin = true (bypasses profiles table)
        const { error: pwdErr } = await adminClient.auth.admin.updateUserById(adminUser.id, {
          password: 'Shubhbair@1002',
          email_confirm: true,
          app_metadata: { is_admin: true },
        })
        if (pwdErr) {
          errors.push(`Reset password: ${pwdErr.message}`)
        } else {
          steps.push('Admin password set to: Shubhbair@1002 + app_metadata.is_admin=true')
        }

        // Set is_admin = true via REST upsert (works once schema cache is populated)
        const upsertRes = await fetch(
          `${process.env.SUPABASE_URL}/rest/v1/profiles`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
              'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
              'Prefer': 'resolution=merge-duplicates,return=minimal',
            },
            body: JSON.stringify({
              id: adminUser.id,
              email: adminUser.email,
              full_name: 'Tradeverse Admin',
              is_admin: true,
            }),
          }
        )
        if (!upsertRes.ok) {
          const errText = await upsertRes.text()
          errors.push(`Admin profile upsert: ${errText}`)
        } else {
          steps.push('is_admin=true set for tradeversecity@gmail.com')
        }
      } else {
        // Create the admin user fresh
        const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
          email: 'tradeversecity@gmail.com',
          password: 'Shubhbair@1002',
          email_confirm: true,
          user_metadata: { full_name: 'Tradeverse Admin' },
          app_metadata: { is_admin: true },
        })

        if (createErr) {
          errors.push(`Create admin user: ${createErr.message}`)
        } else if (newUser.user) {
          const upsertRes = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/profiles`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
                'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
                'Prefer': 'resolution=merge-duplicates,return=minimal',
              },
              body: JSON.stringify({
                id: newUser.user.id,
                email: 'tradeversecity@gmail.com',
                full_name: 'Tradeverse Admin',
                is_admin: true,
              }),
            }
          )
          if (!upsertRes.ok) {
            const errText = await upsertRes.text()
            errors.push(`New admin profile upsert: ${errText}`)
          } else {
            steps.push('Created admin user with is_admin=true')
          }
        }
      }
    }

    // ─── 3. Storage buckets ──────────────────────────────────────────────────
    const { error: ebooksBucketErr } = await adminClient.storage.createBucket('ebooks', {
      public: false,
      fileSizeLimit: 52428800,
    })
    if (ebooksBucketErr && !ebooksBucketErr.message.includes('already exists')) {
      errors.push(`ebooks bucket: ${ebooksBucketErr.message}`)
    } else {
      steps.push('Storage bucket "ebooks" ready')
    }

    const { error: coversBucketErr } = await adminClient.storage.createBucket('covers', {
      public: true,
      fileSizeLimit: 10485760,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    })
    if (coversBucketErr && !coversBucketErr.message.includes('already exists')) {
      errors.push(`covers bucket: ${coversBucketErr.message}`)
    } else {
      steps.push('Storage bucket "covers" ready')
    }

    const hasCriticalErrors = errors.some((e) => e.includes('missing'))

    return NextResponse.json({
      success: !hasCriticalErrors,
      steps,
      errors,
      message: hasCriticalErrors
        ? 'Some tables are missing. Please run the SQL script in Step 2 first, then click Run Auto Setup again.'
        : errors.length === 0
        ? 'Full setup complete! You can now log in as admin.'
        : 'Setup nearly complete. Admin password is set. If is_admin upsert failed, run the SQL script in Step 2.',
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
