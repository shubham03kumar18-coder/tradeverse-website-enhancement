"use client"

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

export default function EbookForm({ action, submitLabel, initialData }: EbookFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4">
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialData?.description ?? ""}
          placeholder="Brief description of the ebook..."
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
        />
      </div>

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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tags" className="text-sm font-medium text-foreground">Tags (comma separated)</label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={initialData?.tags?.join(", ") ?? ""}
          placeholder="trading, psychology, technical analysis"
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cover_url" className="text-sm font-medium text-foreground">Cover Image URL</label>
        <input
          id="cover_url"
          name="cover_url"
          type="url"
          defaultValue={initialData?.cover_url ?? ""}
          placeholder="https://..."
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pdf_path" className="text-sm font-medium text-foreground">PDF Storage Path</label>
        <input
          id="pdf_path"
          name="pdf_path"
          type="text"
          defaultValue={initialData?.pdf_path ?? ""}
          placeholder="ebooks/my-ebook.pdf (path within ebooks-pdfs bucket)"
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Pricing</label>
          <select
            name="is_free"
            defaultValue={initialData?.is_free ? "true" : "false"}
            className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          >
            <option value="false">Paid</option>
            <option value="true">Free</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price_inr" className="text-sm font-medium text-foreground">Price (INR)</label>
          <input
            id="price_inr"
            name="price_inr"
            type="number"
            min={0}
            defaultValue={initialData?.price_inr ?? ""}
            placeholder="499"
            className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Visibility</label>
        <select
          name="is_published"
          defaultValue={initialData?.is_published ? "true" : "false"}
          className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        >
          <option value="false">Draft (hidden)</option>
          <option value="true">Published (visible)</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 flex items-center justify-center px-4 py-2.5 bg-gold text-background font-bold text-sm rounded-lg hover:opacity-90 transition-all shadow-lg shadow-gold/20"
      >
        {submitLabel}
      </button>
    </form>
  )
}
