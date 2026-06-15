'use client'

import { useState, useTransition, useRef } from 'react'
import { X, Loader2, Upload, FileText } from 'lucide-react'
import { createEbook } from '@/app/actions/admin'
import type { Ebook } from '@/lib/types'

interface Props {
  onClose: () => void
  onCreated: (ebook: Ebook) => void
}

export default function EbookUploadModal({ onClose, onCreated }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [pdfName, setPdfName] = useState('')
  const [isFree, setIsFree] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await createEbook(fd)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result.ebook) {
        onCreated(result.ebook as Ebook)
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Upload New Ebook</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg">{error}</div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label htmlFor="modal-title" className="text-sm font-medium text-foreground">Title *</label>
            <input
              id="modal-title"
              name="title"
              type="text"
              required
              placeholder="e.g. Mastering Candlestick Patterns"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="modal-description" className="text-sm font-medium text-foreground">Description</label>
            <textarea
              id="modal-description"
              name="description"
              rows={3}
              placeholder="Full description of the ebook..."
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
            />
          </div>

          {/* Author + Pages */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="modal-author" className="text-sm font-medium text-foreground">Author</label>
              <input
                id="modal-author"
                name="author"
                type="text"
                defaultValue="Tradeverse City"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="modal-pages" className="text-sm font-medium text-foreground">Page Count</label>
              <input
                id="modal-pages"
                name="page_count"
                type="number"
                min={1}
                placeholder="120"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label htmlFor="modal-tags" className="text-sm font-medium text-foreground">
              Tags <span className="text-muted-foreground font-normal">(comma separated)</span>
            </label>
            <input
              id="modal-tags"
              name="tags"
              type="text"
              placeholder="trading, psychology, technical analysis"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="modal-is-free" className="text-sm font-medium text-foreground">Pricing</label>
              <select
                id="modal-is-free"
                name="is_free"
                value={isFree ? 'true' : 'false'}
                onChange={e => setIsFree(e.target.value === 'true')}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              >
                <option value="false">Paid</option>
                <option value="true">Free for students</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="modal-price" className="text-sm font-medium text-foreground">
                Price (INR){isFree && <span className="text-muted-foreground font-normal text-xs ml-1">— ignored</span>}
              </label>
              <input
                id="modal-price"
                name="price_inr"
                type="number"
                min={0}
                disabled={isFree}
                placeholder="499"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold disabled:opacity-40"
              />
            </div>
          </div>

          {/* Visibility */}
          <div className="space-y-1.5">
            <label htmlFor="modal-is-published" className="text-sm font-medium text-foreground">Visibility</label>
            <select
              id="modal-is-published"
              name="is_published"
              defaultValue="false"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            >
              <option value="false">Draft (hidden from students)</option>
              <option value="true">Published (visible to students)</option>
            </select>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Cover Image</label>
            <div className="flex items-start gap-4">
              {coverPreview && (
                <img src={coverPreview} alt="Cover preview" className="w-20 h-28 object-cover rounded-lg border border-border" />
              )}
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg py-6 cursor-pointer hover:border-gold/50 transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" aria-hidden />
                <span className="text-xs text-muted-foreground">Click to upload cover (JPG, PNG, WEBP, max 5MB)</span>
                <input
                  name="cover_file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) setCoverPreview(URL.createObjectURL(file))
                  }}
                />
              </label>
            </div>
          </div>

          {/* PDF Upload */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">PDF File *</label>
            <label className="flex items-center gap-3 border-2 border-dashed border-border rounded-lg px-4 py-4 cursor-pointer hover:border-gold/50 transition-colors">
              <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden />
              <span className="text-xs text-muted-foreground flex-1">
                {pdfName || 'Click to upload PDF (max 100MB)'}
              </span>
              <input
                name="pdf_file"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={e => setPdfName(e.target.files?.[0]?.name || '')}
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg border border-border hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : 'Upload Ebook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
