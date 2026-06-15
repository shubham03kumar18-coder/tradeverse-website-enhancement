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

    // ─── 1. Profiles table ──────────────────────────────────────────────────
    try {
      const { error } = await adminClient
        .from('profiles')
        .select('id')
        .limit(1)
      if (error && error.code === '42P01') {
        errors.push('profiles table missing — run SQL manually')
      } else {
        steps.push('profiles table exists')
      }
    } catch {
      errors.push('Could not verify profiles table')
    }

    // ─── 2. Ebooks table ────────────────────────────────────────────────────
    try {
      const { error } = await adminClient
        .from('ebooks')
        .select('id')
        .limit(1)
      if (error && error.code === '42P01') {
        errors.push('ebooks table missing — run SQL manually')
      } else {
        steps.push('ebooks table exists')
      }
    } catch {
      errors.push('Could not verify ebooks table')
    }

    // ─── 3. Purchases table ─────────────────────────────────────────────────
    try {
      const { error } = await adminClient
        .from('purchases')
        .select('id')
        .limit(1)
      if (error && error.code === '42P01') {
        errors.push('purchases table missing — run SQL manually')
      } else {
        steps.push('purchases table exists')
      }
    } catch {
      errors.push('Could not verify purchases table')
    }

    // ─── 4. Contact inquiries table ─────────────────────────────────────────
    try {
      const { error } = await adminClient
        .from('contact_inquiries')
        .select('id')
        .limit(1)
      if (error && error.code === '42P01') {
        errors.push('contact_inquiries table missing — run SQL manually')
      } else {
        steps.push('contact_inquiries table exists')
      }
    } catch {
      errors.push('Could not verify contact_inquiries table')
    }

    // ─── 5. Create/find admin user & set is_admin ────────────────────────────
    const { data: authUsers, error: authErr } = await adminClient.auth.admin.listUsers()

    if (authErr) {
      errors.push(`List auth users: ${authErr.message}`)
    } else {
      const adminUser = authUsers.users.find(
        (u) => u.email === 'tradeversecity@gmail.com'
      )

      if (adminUser) {
        // User exists — upsert profile with is_admin = true
        const { error: upsertErr } = await adminClient.from('profiles').upsert(
          {
            id: adminUser.id,
            email: adminUser.email,
            full_name: 'Tradeverse Admin',
            is_admin: true,
          },
          { onConflict: 'id' }
        )
        if (upsertErr) {
          errors.push(`Admin profile upsert: ${upsertErr.message}`)
        } else {
          steps.push(`is_admin=true set for tradeversecity@gmail.com`)
        }
      } else {
        // Create user with the password
        const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
          email: 'tradeversecity@gmail.com',
          password: 'Shubhbair@1002',
          email_confirm: true,
          user_metadata: { full_name: 'Tradeverse Admin' },
        })

        if (createErr) {
          errors.push(`Create admin user: ${createErr.message}`)
        } else if (newUser.user) {
          const { error: upsertErr } = await adminClient.from('profiles').upsert(
            {
              id: newUser.user.id,
              email: 'tradeversecity@gmail.com',
              full_name: 'Tradeverse Admin',
              is_admin: true,
            },
            { onConflict: 'id' }
          )
          if (upsertErr) {
            errors.push(`New admin profile upsert: ${upsertErr.message}`)
          } else {
            steps.push('Created admin user tradeversecity@gmail.com with is_admin=true')
          }
        }
      }
    }

    // ─── 6. Storage buckets ─────────────────────────────────────────────────
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
        ? 'Some tables are missing. Please run the SQL script manually in Supabase SQL Editor.'
        : errors.length === 0
        ? 'Full setup complete! You can now log in as admin.'
        : 'Setup complete with minor warnings. Admin login should work.',
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
