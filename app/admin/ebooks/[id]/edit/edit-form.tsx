'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save } from 'lucide-react'
import { updateEbook } from '@/app/actions/admin'
import type { Ebook } from '@/lib/types/supabase'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function EbookEditForm({ ebook, categories }: { ebook: Ebook; categories: string[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [slugTouched, setSlugTouched] = useState(false)
  const [slug, setSlug] = useState(ebook.slug)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!slugTouched) setSlug(slugify(e.target.value))
  }

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

  const fieldClass = "w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
      {error && <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg">{error}</div>}
      {success && <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg">Saved! Redirecting...</div>}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Title *</label>
        <input name="title" type="text" required defaultValue={ebook.title} onChange={handleTitleChange} className={fieldClass} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Slug *</label>
        <input
          name="slug" type="text" required value={slug}
          onChange={e => { setSlug(e.target.value); setSlugTouched(true) }}
          className={fieldClass + ' font-mono'}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Short Description</label>
        <input name="short_description" type="text" maxLength={200} defaultValue={ebook.short_description ?? ''} className={fieldClass} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Description *</label>
        <textarea name="description" required rows={5} defaultValue={ebook.description} className={fieldClass + ' resize-none'} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Category *</label>
          <select name="category" required defaultValue={ebook.category} className={fieldClass}>
            {categories.map(c => (
              <option key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Price (INR) *</label>
          <input name="price" type="number" required min="1" step="0.01" defaultValue={ebook.price} className={fieldClass} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Replace Cover Image (optional)</label>
        <input name="cover_image" type="file" accept="image/jpeg,image/png,image/webp" className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Replace PDF (optional)</label>
        <input name="pdf_file" type="file" accept="application/pdf" className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input name="is_featured" type="checkbox" value="true" defaultChecked={ebook.is_featured} className="rounded border-border bg-input accent-gold w-4 h-4" />
          <span className="text-sm text-muted-foreground">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input name="is_active" type="checkbox" value="true" defaultChecked={ebook.is_active} className="rounded border-border bg-input accent-gold w-4 h-4" />
          <span className="text-sm text-muted-foreground">Active</span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        <button type="button" onClick={() => router.push('/admin/ebooks')} className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold text-background text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>
    </form>
  )
}
