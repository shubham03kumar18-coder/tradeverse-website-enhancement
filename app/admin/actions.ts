"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
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
  const coverUrl = formData.get("cover_url") as string

  const slug = slugify(title)
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : []

  const { error } = await admin.from("ebooks").insert({
    title,
    slug,
    description,
    price_inr: isFree ? 0 : parseInt(priceStr || "0", 10),
    is_free: isFree,
    is_published: isPublished,
    author: author || "Tradeverse City",
    tags,
    page_count: pageCountStr ? parseInt(pageCountStr, 10) : null,
    cover_url: coverUrl || null,
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
  const coverUrl = formData.get("cover_url") as string
  const pdfPath = formData.get("pdf_path") as string

  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : []

  const { error } = await admin.from("ebooks").update({
    title,
    description,
    price_inr: isFree ? 0 : parseInt(priceStr || "0", 10),
    is_free: isFree,
    is_published: isPublished,
    author: author || "Tradeverse City",
    tags,
    page_count: pageCountStr ? parseInt(pageCountStr, 10) : null,
    cover_url: coverUrl || null,
    pdf_path: pdfPath || null,
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
