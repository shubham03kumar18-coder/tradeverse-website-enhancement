import { requireAdmin } from "@/lib/admin-auth"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createEbook } from "@/app/admin/(protected)/actions"
import EbookForm from "@/components/admin/ebook-form"

export const metadata = { title: "Add Ebook | Admin" }

export default async function NewEbookPage() {
  await requireAdmin()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/ebooks" className="text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Ebook</h1>
            <p className="text-sm text-muted-foreground">Fill in the details below</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <EbookForm action={createEbook} submitLabel="Create Ebook" />
        </div>
      </div>
    </main>
  )
}
