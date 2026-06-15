'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save } from 'lucide-react'
import { updateEbook } from '@/app/actions/admin'
import type { Ebook } from '@/lib/types'

export default function EbookEditForm({ ebook }: { ebook: Ebook }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isFree, setIsFree] = useState(ebook.is_free)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateEbook(ebook.id, fd)
      if (result?.error) setError(result.error)
      else {
        setSuccess(true)
        setTimeout(() => router.push('/admin/ebooks'), 1500)
      }
    })
  }

  const fieldClass =
    'w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold'

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg">{error}</div>
      )}
      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg">Saved! Redirecting...</div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="edit-title" className="text-sm font-medium text-foreground">Title *</label>
        <input id="edit-title" name="title" type="text" required defaultValue={ebook.title} className={fieldClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="edit-description" className="text-sm font-medium text-foreground">Description</label>
        <textarea
          id="edit-description"
          name="description"
          rows={4}
          defaultValue={ebook.description ?? ''}
          className={fieldClass + ' resize-none'}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="edit-author" className="text-sm font-medium text-foreground">Author</label>
          <input
            id="edit-author"
            name="author"
            type="text"
            defaultValue={ebook.author ?? 'Tradeverse City'}
            className={fieldClass}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="edit-pages" className="text-sm font-medium text-foreground">Page Count</label>
          <input
            id="edit-pages"
            name="page_count"
            type="number"
            min={1}
            defaultValue={ebook.page_count ?? ''}
            placeholder="120"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="edit-tags" className="text-sm font-medium text-foreground">
          Tags <span className="text-muted-foreground font-normal">(comma separated)</span>
        </label>
        <input
          id="edit-tags"
          name="tags"
          type="text"
          defaultValue={ebook.tags?.join(', ') ?? ''}
          placeholder="trading, psychology, technical analysis"
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="edit-is-free" className="text-sm font-medium text-foreground">Pricing</label>
          <select
            id="edit-is-free"
            name="is_free"
            value={isFree ? 'true' : 'false'}
            onChange={e => setIsFree(e.target.value === 'true')}
            className={fieldClass}
          >
            <option value="false">Paid</option>
            <option value="true">Free for students</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="edit-price" className="text-sm font-medium text-foreground">
            Price (INR){isFree && <span className="text-muted-foreground font-normal text-xs ml-1">— ignored</span>}
          </label>
          <input
            id="edit-price"
            name="price_inr"
            type="number"
            min={0}
            disabled={isFree}
            defaultValue={ebook.price_inr ?? ''}
            placeholder="499"
            className={fieldClass + ' disabled:opacity-40'}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="edit-is-published" className="text-sm font-medium text-foreground">Visibility</label>
        <select
          id="edit-is-published"
          name="is_published"
          defaultValue={ebook.is_published ? 'true' : 'false'}
          className={fieldClass}
        >
          <option value="false">Draft (hidden from students)</option>
          <option value="true">Published (visible to students)</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Replace Cover Image (optional)</label>
        <input
          name="cover_file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
        />
        {ebook.cover_url && (
          <p className="text-xs text-muted-foreground">Current cover on file — upload a new one to replace it.</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Replace PDF (optional)</label>
        <input
          name="pdf_file"
          type="file"
          accept="application/pdf"
          className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
        />
        {ebook.pdf_path && (
          <p className="text-xs text-muted-foreground">PDF on file — upload a new one to replace it.</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        <button
          type="button"
          onClick={() => router.push('/admin/ebooks')}
          className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </button>
      </div>
    </form>
  )
}
