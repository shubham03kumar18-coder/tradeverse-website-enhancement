'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Search, X } from 'lucide-react'
import { deleteEbook, toggleEbookActive } from '@/app/actions/admin'
import type { Ebook } from '@/lib/types'
import EbookUploadModal from './ebook-upload-modal'

export default function AdminEbooksClient({ initialEbooks }: { initialEbooks: Ebook[] }) {
  const [ebooks, setEbooks] = useState(initialEbooks)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const filtered = ebooks.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (!confirm('Delete this ebook? This cannot be undone.')) return
    setDeletingId(id)
    startTransition(async () => {
      const result = await deleteEbook(id)
      if (result.success) {
        setEbooks(prev => prev.filter(e => e.id !== id))
        showToast('Ebook deleted', 'success')
      } else {
        showToast(result.error ?? 'Delete failed', 'error')
      }
      setDeletingId(null)
    })
  }

  const handleToggle = (id: string, currentPublished: boolean) => {
    setTogglingId(id)
    startTransition(async () => {
      const result = await toggleEbookActive(id, !currentPublished)
      if (result.success) {
        setEbooks(prev => prev.map(e => e.id === id ? { ...e, is_published: !currentPublished } : e))
        showToast(`Ebook ${!currentPublished ? 'published' : 'unpublished'}`, 'success')
      } else {
        showToast(result.error ?? 'Update failed', 'error')
      }
      setTogglingId(null)
    })
  }

  const handleCreated = (ebook: Ebook) => {
    setEbooks(prev => [ebook, ...prev])
    setShowModal(false)
    showToast('Ebook created successfully!', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-sm font-medium ${
          toast.type === 'success' ? 'bg-card border border-gold/40 text-gold' : 'bg-card border border-destructive/40 text-destructive'
        }`}>
          {toast.message}
          <button onClick={() => setToast(null)} aria-label="Dismiss"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ebooks</h1>
          <p className="text-muted-foreground text-sm mt-1">{ebooks.length} total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Upload New Ebook
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search ebooks..."
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Ebooks table">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Pages</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    {search ? 'No ebooks match your search' : 'No ebooks yet. Upload your first ebook!'}
                  </td>
                </tr>
              ) : (
                filtered.map(ebook => (
                  <tr key={ebook.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground max-w-xs truncate">{ebook.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{ebook.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-gold font-medium">
                      {ebook.is_free ? 'Free' : `₹${ebook.price_inr.toLocaleString('en-IN')}`}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ebook.is_published ? 'bg-green-500/10 text-green-400' : 'bg-muted text-muted-foreground'
                      }`}>
                        {ebook.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{ebook.page_count ?? '—'}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {new Date(ebook.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggle(ebook.id, ebook.is_published)}
                          disabled={togglingId === ebook.id}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded"
                          title={ebook.is_published ? 'Unpublish' : 'Publish'}
                          aria-label={ebook.is_published ? 'Unpublish ebook' : 'Publish ebook'}
                        >
                          {togglingId === ebook.id ? <Loader2 className="w-4 h-4 animate-spin" /> : ebook.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/admin/ebooks/${ebook.id}/edit`}
                          className="p-1.5 text-muted-foreground hover:text-gold transition-colors rounded"
                          title="Edit"
                          aria-label="Edit ebook"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(ebook.id)}
                          disabled={deletingId === ebook.id}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded"
                          title="Delete"
                          aria-label="Delete ebook"
                        >
                          {deletingId === ebook.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <EbookUploadModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  )
}
