"use client"

import { useState, useRef } from "react"
import { Upload, FileText, Image as ImageIcon, X, CheckCircle } from "lucide-react"

interface EbookFormProps {
  action: (formData: FormData) => Promise<void>
  submitLabel: string
  initialData?: {
    title?: string
    description?: string
    price_inr?: number
    is_free?: boolean
    is_published?: boolean
    author?: string
    tags?: string[]
    page_count?: number | null
    cover_url?: string | null
    pdf_path?: string | null
  }
}

function FileUploadField({
  id,
  name,
  label,
  accept,
  existingUrl,
  icon: Icon,
  hint,
}: {
  id: string
  name: string
  label: string
  accept: string
  existingUrl?: string | null
  icon: React.ElementType
  hint: string
}) {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div
        className="relative border-2 border-dashed border-border rounded-xl p-4 cursor-pointer hover:border-gold/60 transition-colors group"
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button
              type="button"
              className="text-muted-foreground hover:text-destructive transition-colors"
              onClick={(e) => { e.stopPropagation(); setFile(null); if (inputRef.current) inputRef.current.value = "" }}
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : existingUrl ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Existing file — click to replace</p>
              <p className="text-xs text-muted-foreground/60 truncate">{existingUrl}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-gold/10 transition-colors">
              <Upload className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Click to upload {label}</p>
              <p className="text-xs text-muted-foreground">{hint}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EbookForm({ action, submitLabel, initialData }: EbookFormProps) {
  const [isFree, setIsFree] = useState(initialData?.is_free ?? false)
  const [pending, setPending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.currentTarget)
    try {
      await action(formData)
    } catch {
      setPending(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-foreground">Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title ?? ""}
          placeholder="e.g. The Trading Psychology Masterclass"
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialData?.description ?? ""}
          placeholder="Brief description of the ebook content and what students will learn..."
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
        />
      </div>

      {/* Author + Pages */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="author" className="text-sm font-medium text-foreground">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={initialData?.author ?? "Tradeverse City"}
            className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="page_count" className="text-sm font-medium text-foreground">Page Count</label>
          <input
            id="page_count"
            name="page_count"
            type="number"
            min={1}
            defaultValue={initialData?.page_count ?? ""}
            placeholder="120"
            className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tags" className="text-sm font-medium text-foreground">Tags <span className="text-muted-foreground font-normal">(comma separated)</span></label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={initialData?.tags?.join(", ") ?? ""}
          placeholder="trading, psychology, technical analysis"
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      {/* Cover image upload */}
      <FileUploadField
        id="cover_file"
        name="cover_file"
        label="Cover Image"
        accept="image/jpeg,image/png,image/webp"
        existingUrl={initialData?.cover_url}
        icon={ImageIcon}
        hint="JPG, PNG or WebP — max 5 MB"
      />

      {/* PDF upload */}
      <FileUploadField
        id="pdf_file"
        name="pdf_file"
        label="PDF File *"
        accept="application/pdf"
        existingUrl={initialData?.pdf_path}
        icon={FileText}
        hint="PDF only — max 100 MB"
      />

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Pricing</label>
          <select
            name="is_free"
            value={isFree ? "true" : "false"}
            onChange={(e) => setIsFree(e.target.value === "true")}
            className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          >
            <option value="false">Paid</option>
            <option value="true">Free for students</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price_inr" className="text-sm font-medium text-foreground">
            Price (INR) {isFree && <span className="text-muted-foreground font-normal text-xs">— ignored for free</span>}
          </label>
          <input
            id="price_inr"
            name="price_inr"
            type="number"
            min={0}
            disabled={isFree}
            defaultValue={initialData?.price_inr ?? ""}
            placeholder="499"
            className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors disabled:opacity-40"
          />
        </div>
      </div>

      {/* Visibility */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Visibility</label>
        <select
          name="is_published"
          defaultValue={initialData?.is_published ? "true" : "false"}
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        >
          <option value="false">Draft (hidden from students)</option>
          <option value="true">Published (visible to students)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gold text-background font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-lg shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading...
          </>
        ) : submitLabel}
      </button>
    </form>
  )
}
