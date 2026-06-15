import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { updateEbook, deleteEbook } from "@/app/admin/(protected)/actions"
import EbookForm from "@/components/admin/ebook-form"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect, notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  const adminClient = createAdminClient()
  const { data: profile } = await adminClient.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) redirect("/dashboard")
}

export const metadata = { title: "Edit Ebook | Admin" }

export default async function EditEbookPage({ params }: Props) {
  await requireAdmin()
  const { id } = await params
  const admin = createAdminClient()
  const { data: ebook } = await admin.from("ebooks").select("*").eq("id", id).single()
  if (!ebook) notFound()

  const updateWithId = updateEbook.bind(null, id)

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/ebooks" className="text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Ebook</h1>
            <p className="text-sm text-muted-foreground truncate max-w-xs">{ebook.title}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <EbookForm action={updateWithId} submitLabel="Save Changes" initialData={ebook} />
        </div>
        {/* Danger zone */}
        <div className="mt-6 bg-card border border-destructive/20 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-destructive mb-2">Danger Zone</h2>
          <p className="text-xs text-muted-foreground mb-4">Deleting an ebook is permanent and cannot be undone.</p>
          <form action={deleteEbook.bind(null, id)}>
            <button
              type="submit"
              className="px-4 py-2 border border-destructive text-destructive text-sm font-medium rounded-lg hover:bg-destructive hover:text-white transition-all"
            >
              Delete Ebook
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
