import pg from 'pg'
const { Client } = pg

// Use the direct postgres URL from env
const connectionString = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING

if (!connectionString) {
  console.error('No POSTGRES_URL found')
  process.exit(1)
}

// Parse and modify connection string to use compatible SSL
const connStr = connectionString.includes('sslmode=') 
  ? connectionString.replace(/sslmode=[^&]*/, 'sslmode=require')
  : connectionString + (connectionString.includes('?') ? '&' : '?') + 'sslmode=require'

const client = new Client({ 
  connectionString: connStr, 
  ssl: { rejectUnauthorized: false } 
})

const schema = `
-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR NOT NULL DEFAULT '',
  email VARCHAR UNIQUE NOT NULL DEFAULT '',
  avatar_url VARCHAR,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "profiles_update_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_update_own_or_admin" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AUTO-CREATE PROFILE TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.email, '')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- EBOOKS TABLE
CREATE TABLE IF NOT EXISTS public.ebooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(200),
  cover_image_path VARCHAR,
  category VARCHAR NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  pdf_path VARCHAR NOT NULL DEFAULT '',
  total_pages INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

CREATE INDEX IF NOT EXISTS idx_ebooks_category ON public.ebooks (category);
CREATE INDEX IF NOT EXISTS idx_ebooks_slug ON public.ebooks (slug);
CREATE INDEX IF NOT EXISTS idx_ebooks_is_active ON public.ebooks (is_active);

ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ebooks_select_active_or_admin" ON public.ebooks;
CREATE POLICY "ebooks_select_active_or_admin" ON public.ebooks
  FOR SELECT USING (
    is_active = TRUE OR
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "ebooks_insert_admin" ON public.ebooks;
CREATE POLICY "ebooks_insert_admin" ON public.ebooks
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "ebooks_update_admin" ON public.ebooks;
CREATE POLICY "ebooks_update_admin" ON public.ebooks
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "ebooks_delete_admin" ON public.ebooks;
CREATE POLICY "ebooks_delete_admin" ON public.ebooks
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

-- PURCHASES TABLE
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ebook_id UUID NOT NULL REFERENCES public.ebooks(id) ON DELETE CASCADE,
  order_id VARCHAR NOT NULL,
  payment_id VARCHAR NOT NULL DEFAULT '',
  amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR NOT NULL DEFAULT 'pending',
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  accessed_at TIMESTAMPTZ,
  UNIQUE(user_id, ebook_id)
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases (user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_ebook_id ON public.purchases (ebook_id);
CREATE INDEX IF NOT EXISTS idx_purchases_payment_status ON public.purchases (payment_status);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "purchases_select_own_or_admin" ON public.purchases;
CREATE POLICY "purchases_select_own_or_admin" ON public.purchases
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "purchases_insert_server" ON public.purchases;
CREATE POLICY "purchases_insert_server" ON public.purchases
  FOR INSERT WITH CHECK (TRUE);

-- CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  message TEXT NOT NULL,
  status VARCHAR DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.contact_inquiries (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.contact_inquiries (status);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "inquiries_select_admin" ON public.contact_inquiries;
CREATE POLICY "inquiries_select_admin" ON public.contact_inquiries
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "inquiries_insert_public" ON public.contact_inquiries;
CREATE POLICY "inquiries_insert_public" ON public.contact_inquiries
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "inquiries_update_admin" ON public.contact_inquiries;
CREATE POLICY "inquiries_update_admin" ON public.contact_inquiries
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "inquiries_delete_admin" ON public.contact_inquiries;
CREATE POLICY "inquiries_delete_admin" ON public.contact_inquiries
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.is_admin = TRUE)
  );
`

async function run() {
  try {
    await client.connect()
    console.log('Connected to database')
    await client.query(schema)
    console.log('Schema applied successfully!')
  } catch (err) {
    console.error('Error applying schema:', err.message)
  } finally {
    await client.end()
  }
}

run()
