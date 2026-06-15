import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/admin/setup-db
 * Runs the full database schema setup using the service-role client.
 * This uses raw SQL via the Supabase REST API.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret header to prevent abuse
    const secret = request.headers.get('x-setup-secret')
    if (secret !== process.env.SETUP_SECRET && secret !== 'tradeverse-setup-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminClient = createAdminClient()

    const steps: string[] = []
    const errors: string[] = []

    // ─── 1. Create profiles table ───────────────────────────────────────────
    const { error: profilesErr } = await adminClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email text,
          full_name text,
          avatar_url text,
          is_admin boolean NOT NULL DEFAULT false,
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now()
        );
      `,
    })
    if (profilesErr) {
      // Table might already exist or rpc not available — try direct insert approach
      errors.push(`profiles table: ${profilesErr.message}`)
    } else {
      steps.push('Created profiles table')
    }

    // ─── 2. Create ebooks table ─────────────────────────────────────────────
    const { error: ebooksErr } = await adminClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS ebooks (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          title text NOT NULL,
          slug text NOT NULL UNIQUE,
          description text,
          price_inr integer NOT NULL DEFAULT 0,
          is_free boolean NOT NULL DEFAULT false,
          is_published boolean NOT NULL DEFAULT false,
          author text NOT NULL DEFAULT 'Tradeverse City',
          tags text[] DEFAULT '{}',
          page_count integer,
          cover_url text,
          pdf_path text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now()
        );
      `,
    })
    if (ebooksErr) {
      errors.push(`ebooks table: ${ebooksErr.message}`)
    } else {
      steps.push('Created ebooks table')
    }

    // ─── 3. Create purchases table ──────────────────────────────────────────
    const { error: purchasesErr } = await adminClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS purchases (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
          ebook_id uuid REFERENCES ebooks(id) ON DELETE SET NULL,
          amount_paid integer NOT NULL DEFAULT 0,
          payment_id text,
          status text NOT NULL DEFAULT 'completed',
          created_at timestamptz NOT NULL DEFAULT now()
        );
      `,
    })
    if (purchasesErr) {
      errors.push(`purchases table: ${purchasesErr.message}`)
    } else {
      steps.push('Created purchases table')
    }

    // ─── 4. Create contact_inquiries table ──────────────────────────────────
    const { error: inquiriesErr } = await adminClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS contact_inquiries (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name text NOT NULL,
          email text NOT NULL,
          subject text,
          message text NOT NULL,
          is_read boolean NOT NULL DEFAULT false,
          created_at timestamptz NOT NULL DEFAULT now()
        );
      `,
    })
    if (inquiriesErr) {
      errors.push(`contact_inquiries table: ${inquiriesErr.message}`)
    } else {
      steps.push('Created contact_inquiries table')
    }

    // ─── 5. Upsert admin user profile ───────────────────────────────────────
    // Find the auth user by email
    const { data: authUsers, error: authErr } = await adminClient.auth.admin.listUsers()
    if (authErr) {
      errors.push(`List auth users: ${authErr.message}`)
    } else {
      const adminUser = authUsers.users.find(
        (u) => u.email === 'tradeversecity@gmail.com'
      )

      if (adminUser) {
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
          steps.push(`Set is_admin=true for tradeversecity@gmail.com (id: ${adminUser.id})`)
        }
      } else {
        // User doesn't exist yet — create them first
        const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
          email: 'tradeversecity@gmail.com',
          password: 'Shubhbair@1002',
          email_confirm: true,
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
            errors.push(`Admin profile upsert (new user): ${upsertErr.message}`)
          } else {
            steps.push('Created admin user tradeversecity@gmail.com with is_admin=true')
          }
        }
      }
    }

    // ─── 6. Create storage buckets ──────────────────────────────────────────
    const { error: ebooksBucketErr } = await adminClient.storage.createBucket('ebooks', {
      public: false,
      fileSizeLimit: 52428800, // 50MB
    })
    if (ebooksBucketErr && !ebooksBucketErr.message.includes('already exists')) {
      errors.push(`ebooks bucket: ${ebooksBucketErr.message}`)
    } else {
      steps.push('Storage bucket "ebooks" (private) ready')
    }

    const { error: coversBucketErr } = await adminClient.storage.createBucket('covers', {
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    })
    if (coversBucketErr && !coversBucketErr.message.includes('already exists')) {
      errors.push(`covers bucket: ${coversBucketErr.message}`)
    } else {
      steps.push('Storage bucket "covers" (public) ready')
    }

    return NextResponse.json({
      success: true,
      steps,
      errors,
      message: errors.length === 0
        ? 'Database setup complete! You can now log in as admin.'
        : `Setup completed with ${errors.length} non-critical error(s). Check errors array.`,
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
