import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EbookEditForm from './edit-form'

export const metadata = { title: 'Edit Ebook | Admin' }

const CATEGORIES = [
  'technical-analysis', 'trading-psychology', 'risk-management',
  'stock-market-fundamentals', 'candlestick-analysis', 'price-action',
  'swing-trading', 'intraday-trading', 'options-trading', 'futures-trading',
  'portfolio-management', 'market-research', 'other'
]

export default async function EditEbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: ebook } = await supabase.from('ebooks').select('*').eq('id', id).single()
  if (!ebook) notFound()

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Edit Ebook</h1>
        <p className="text-muted-foreground text-sm mt-1">{ebook.title}</p>
      </div>
      <EbookEditForm ebook={ebook} categories={CATEGORIES} />
    </div>
  )
}
