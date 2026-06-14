'use client'

import { useState, useTransition, useRef } from 'react'
import { X, Loader2, Upload, FileText } from 'lucide-react'
import { createEbook } from '@/app/actions/admin'
import type { Ebook } from '@/lib/types/supabase'

interface Props {
  onClose: () => void
  onCreated: (ebook: Ebook) => void
  categories: string[]
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function EbookUploadModal({ onClose, onCreated, categories }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [pdfName, setPdfName] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slugInput = formRef.current?.querySelector<HTMLInputElement>('[name="slug"]')
    if (slugInput && !slugInput.dataset.touched) {
      slugInput.value = slugify(e.target.value)
    }
  }

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
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg">{error}</div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Title *</label>
            <input
              name="title"
              type="text"
              required
              onChange={handleTitleChange}
              placeholder="e.g. Mastering Candlestick Patterns"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Slug *</label>
            <input
              name="slug"
              type="text"
              required
              onInput={e => (e.currentTarget.dataset.touched = 'true')}
              placeholder="mastering-candlestick-patterns"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold font-mono"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Short Description (max 200 chars)</label>
            <input
              name="short_description"
              type="text"
              maxLength={200}
              placeholder="Brief one-line summary"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          {/* Long Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Full description of the ebook..."
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
            />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category *</label>
              <select
                name="category"
                required
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              >
                <option value="">Select category</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Price (INR) *</label>
              <input
                name="price"
                type="number"
                required
                min="1"
                step="0.01"
                placeholder="499"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Cover Image</label>
            <div className="flex items-start gap-4">
              {coverPreview && (
                <img src={coverPreview} alt="Cover preview" className="w-20 h-28 object-cover rounded-lg border border-border" />
              )}
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg py-6 cursor-pointer hover:border-gold/50 transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">Click to upload cover (JPG, PNG, WEBP, max 5MB)</span>
                <input
                  name="cover_image"
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
              <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
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

          {/* Checkboxes */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="is_featured" type="checkbox" value="true" className="rounded border-border bg-input accent-gold w-4 h-4" />
              <span className="text-sm text-muted-foreground">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="is_active" type="checkbox" value="true" defaultChecked className="rounded border-border bg-input accent-gold w-4 h-4" />
              <span className="text-sm text-muted-foreground">Active (visible in catalog)</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg border border-border hover:bg-muted">
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
