"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  const admin = createAdminClient()
  const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) throw new Error("Unauthorized")
  return user
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

/** Upload a file to Supabase Storage and return its public/path URL */
async function uploadFile(
  admin: ReturnType<typeof createAdminClient>,
  bucket: string,
  folder: string,
  file: File,
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin"
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error } = await admin.storage.from(bucket).upload(filename, buffer, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(`Storage upload failed: ${error.message}`)
  return filename
}

/** Get a public URL for cover images (covers bucket is public) */
function getCoverPublicUrl(admin: ReturnType<typeof createAdminClient>, path: string): string {
  const { data } = admin.storage.from("covers").getPublicUrl(path)
  return data.publicUrl
}

export async function createEbook(formData: FormData) {
  await requireAdmin()
  const admin = createAdminClient()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priceStr = formData.get("price_inr") as string
  const isFree = formData.get("is_free") === "true"
  const isPublished = formData.get("is_published") === "true"
  const author = formData.get("author") as string
  const tagsStr = formData.get("tags") as string
  const pageCountStr = formData.get("page_count") as string
  const coverFile = formData.get("cover_file") as File | null
  const pdfFile = formData.get("pdf_file") as File | null

  if (!pdfFile || pdfFile.size === 0) throw new Error("PDF file is required")

  const slug = slugify(title)
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : []

  // Upload PDF to private 'ebooks' bucket
  const pdfPath = await uploadFile(admin, "ebooks", "pdfs", pdfFile)

  // Upload cover to public 'covers' bucket (optional)
  let coverUrl: string | null = null
  if (coverFile && coverFile.size > 0) {
    const coverPath = await uploadFile(admin, "covers", "ebooks", coverFile)
    coverUrl = getCoverPublicUrl(admin, coverPath)
  }

  const { error } = await admin.from("ebooks").insert({
    title,
    slug,
    description: description || null,
    price_inr: isFree ? 0 : parseInt(priceStr || "0", 10),
    is_free: isFree,
    is_published: isPublished,
    author: author || "Tradeverse City",
    tags,
    page_count: pageCountStr ? parseInt(pageCountStr, 10) : null,
    cover_url: coverUrl,
    pdf_path: pdfPath,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/ebooks")
  revalidatePath("/admin/ebooks")
  redirect("/admin/ebooks")
}

export async function updateEbook(id: string, formData: FormData) {
  await requireAdmin()
  const admin = createAdminClient()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priceStr = formData.get("price_inr") as string
  const isFree = formData.get("is_free") === "true"
  const isPublished = formData.get("is_published") === "true"
  const author = formData.get("author") as string
  const tagsStr = formData.get("tags") as string
  const pageCountStr = formData.get("page_count") as string
  const coverFile = formData.get("cover_file") as File | null
  const pdfFile = formData.get("pdf_file") as File | null

  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : []

  // Fetch existing record to preserve existing paths if no new file uploaded
  const { data: existing } = await admin.from("ebooks").select("cover_url, pdf_path").eq("id", id).single()

  let pdfPath = existing?.pdf_path ?? null
  let coverUrl = existing?.cover_url ?? null

  if (pdfFile && pdfFile.size > 0) {
    pdfPath = await uploadFile(admin, "ebooks", "pdfs", pdfFile)
  }
  if (coverFile && coverFile.size > 0) {
    const coverPath = await uploadFile(admin, "covers", "ebooks", coverFile)
    coverUrl = getCoverPublicUrl(admin, coverPath)
  }

  const { error } = await admin.from("ebooks").update({
    title,
    description: description || null,
    price_inr: isFree ? 0 : parseInt(priceStr || "0", 10),
    is_free: isFree,
    is_published: isPublished,
    author: author || "Tradeverse City",
    tags,
    page_count: pageCountStr ? parseInt(pageCountStr, 10) : null,
    cover_url: coverUrl,
    pdf_path: pdfPath,
    updated_at: new Date().toISOString(),
  }).eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/ebooks")
  revalidatePath("/admin/ebooks")
  redirect("/admin/ebooks")
}

export async function deleteEbook(id: string) {
  await requireAdmin()
  const admin = createAdminClient()
  await admin.from("ebooks").delete().eq("id", id)
  revalidatePath("/ebooks")
  revalidatePath("/admin/ebooks")
  redirect("/admin/ebooks")
}

export async function markInquiryRead(id: string) {
  await requireAdmin()
  const admin = createAdminClient()
  await admin.from("contact_inquiries").update({ is_read: true }).eq("id", id)
  revalidatePath("/admin/inquiries")
}
