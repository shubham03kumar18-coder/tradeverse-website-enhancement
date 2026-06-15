import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import NavbarWrapper from "@/components/navbar-wrapper"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import PdfReader from "@/components/pdf-reader"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ReadEbookPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect(`/auth/login?next=/dashboard/library/${id}`)

  // Verify purchase
  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("ebook_id", id)
    .eq("status", "paid")
    .single()

  if (!purchase) redirect("/dashboard/library")

  // Fetch ebook
  const { data: ebook } = await supabase
    .from("ebooks")
    .select("id, title, pdf_path")
    .eq("id", id)
    .single()

  if (!ebook) notFound()

  // Generate signed URL for PDF (30 min)
  let pdfUrl: string | null = null
  if (ebook.pdf_path) {
    const { data: signed } = await supabase.storage
      .from("ebooks")
      .createSignedUrl(ebook.pdf_path, 1800)
    pdfUrl = signed?.signedUrl ?? null
  }

  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen bg-background pt-16">
        {/* Top bar */}
        <div className="border-b border-border bg-card/50 backdrop-blur-md px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/library" className="text-muted-foreground hover:text-gold transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="font-bold text-foreground text-sm truncate max-w-xs md:max-w-md">{ebook.title}</h1>
            </div>
          </div>
        </div>

        {/* Reader */}
        <div className="max-w-5xl mx-auto px-2 sm:px-4 py-6">
          {pdfUrl ? (
            <PdfReader url={pdfUrl} title={ebook.title} />
          ) : (
            <div className="bg-card border border-border rounded-2xl p-16 text-center">
              <p className="text-muted-foreground">
                The PDF for this ebook is not yet available. Please check back later or contact support.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
