import { createClient } from '@/lib/supabase/server'
import AdminEbooksClient from './ebooks-client'

export const metadata = { title: 'Manage Ebooks | Admin' }

export default async function AdminEbooksPage() {
  const supabase = await createClient()
  const { data: ebooks } = await supabase
    .from('ebooks')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminEbooksClient initialEbooks={ebooks ?? []} />
}
