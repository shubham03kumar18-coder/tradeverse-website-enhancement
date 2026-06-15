'use client'

import { useState, useTransition } from 'react'
import { Trash2, CheckCircle, Loader2, X } from 'lucide-react'
import { updateInquiryStatus, deleteInquiry } from '@/app/actions/admin'
import type { ContactInquiry } from '@/lib/types/supabase'

export default function AdminInquiriesClient({ initialInquiries }: { initialInquiries: ContactInquiry[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [isPending, startTransition] = useTransition()
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleMarkReplied = (id: string) => {
    setProcessingId(id)
    startTransition(async () => {
      const result = await updateInquiryStatus(id, 'replied')
      if (result.success) {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: 'replied' } : i))
        showToast('Marked as replied', 'success')
      } else {
        showToast(result.error ?? 'Failed', 'error')
      }
      setProcessingId(null)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    setProcessingId(id)
    startTransition(async () => {
      const result = await deleteInquiry(id)
      if (result.success) {
        setInquiries(prev => prev.filter(i => i.id !== id))
        showToast('Inquiry deleted', 'success')
      } else {
        showToast(result.error ?? 'Failed', 'error')
      }
      setProcessingId(null)
    })
  }

  const newCount = inquiries.filter(i => i.status === 'new').length

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-sm font-medium ${
          toast.type === 'success' ? 'bg-card border border-gold/40 text-gold' : 'bg-card border border-destructive/40 text-destructive'
        }`}>
          {toast.message}
          <button onClick={() => setToast(null)}><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Inquiries</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {inquiries.length} total{newCount > 0 && <span className="ml-2 px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full font-medium">{newCount} new</span>}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
            No inquiries yet
          </div>
        ) : (
          inquiries.map(inquiry => (
            <div
              key={inquiry.id}
              className={`bg-card border rounded-xl p-5 ${
                inquiry.status === 'new' ? 'border-gold/30' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{inquiry.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      inquiry.status === 'new' ? 'bg-gold/10 text-gold' :
                      inquiry.status === 'replied' ? 'bg-green-500/10 text-green-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{inquiry.email}</span>
                    {inquiry.phone && <span>{inquiry.phone}</span>}
                    <span>{new Date(inquiry.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {inquiry.status === 'new' && (
                    <button
                      onClick={() => handleMarkReplied(inquiry.id)}
                      disabled={processingId === inquiry.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors disabled:opacity-60"
                    >
                      {processingId === inquiry.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                      Mark Replied
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    disabled={processingId === inquiry.id}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
