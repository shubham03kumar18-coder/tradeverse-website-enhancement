import { createClient } from '@/lib/supabase/server'
import AdminInquiriesClient from './inquiries-client'

export const metadata = { title: 'Inquiries | Admin' }

export default async function AdminInquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminInquiriesClient initialInquiries={inquiries ?? []} />
}
