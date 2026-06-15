'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Use service-role client to bypass RLS for the admin check
  const adminClient = createAdminClient()
  const { data: profile } = await adminClient
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) throw new Error('Forbidden: Admin access required')
  return { supabase, adminClient, user }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function uploadFile(
  adminClient: ReturnType<typeof createAdminClient>,
  bucket: string,
  folder: string,
  file: File,
): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'bin'
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error } = await adminClient.storage.from(bucket).upload(filename, buffer, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(`Storage upload failed: ${error.message}`)
  return filename
}

function getCoverPublicUrl(adminClient: ReturnType<typeof createAdminClient>, path: string): string {
  const { data } = adminClient.storage.from('covers').getPublicUrl(path)
  return data.publicUrl
}

export async function createEbook(formData: FormData) {
  try {
    const { adminClient } = await requireAdmin()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const priceStr = formData.get('price_inr') as string
    const isFree = formData.get('is_free') === 'true'
    const isPublished = formData.get('is_published') === 'true'
    const author = formData.get('author') as string
    const tagsStr = formData.get('tags') as string
    const pageCountStr = formData.get('page_count') as string
    const coverFile = formData.get('cover_file') as File | null
    const pdfFile = formData.get('pdf_file') as File | null

    if (!title) return { error: 'Title is required' }
    if (!pdfFile || pdfFile.size === 0) return { error: 'PDF file is required' }

    const slug = slugify(title)
    const tags = tagsStr ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean) : []

    // Upload PDF to private 'ebooks' bucket
    const pdfPath = await uploadFile(adminClient, 'ebooks', 'pdfs', pdfFile)

    // Upload cover to public 'covers' bucket (optional)
    let coverUrl: string | null = null
    if (coverFile && coverFile.size > 0) {
      const coverPath = await uploadFile(adminClient, 'covers', 'ebooks', coverFile)
      coverUrl = getCoverPublicUrl(adminClient, coverPath)
    }

    const { data, error } = await adminClient
      .from('ebooks')
      .insert({
        title,
        slug,
        description: description || null,
        price_inr: isFree ? 0 : parseInt(priceStr || '0', 10),
        is_free: isFree,
        is_published: isPublished,
        author: author || 'Tradeverse City',
        tags,
        page_count: pageCountStr ? parseInt(pageCountStr, 10) : null,
        cover_url: coverUrl,
        pdf_path: pdfPath,
      })
      .select()
      .single()

    if (error) return { error: error.message }
    revalidatePath('/ebooks')
    revalidatePath('/admin/ebooks')
    return { success: true, ebook: data }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateEbook(id: string, formData: FormData) {
  try {
    const { adminClient } = await requireAdmin()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const priceStr = formData.get('price_inr') as string
    const isFree = formData.get('is_free') === 'true'
    const isPublished = formData.get('is_published') === 'true'
    const author = formData.get('author') as string
    const tagsStr = formData.get('tags') as string
    const pageCountStr = formData.get('page_count') as string
    const coverFile = formData.get('cover_file') as File | null
    const pdfFile = formData.get('pdf_file') as File | null

    const tags = tagsStr ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean) : []

    // Fetch existing to preserve paths
    const { data: existing } = await adminClient.from('ebooks').select('cover_url, pdf_path').eq('id', id).single()

    let pdfPath = existing?.pdf_path ?? null
    let coverUrl = existing?.cover_url ?? null

    if (pdfFile && pdfFile.size > 0) {
      pdfPath = await uploadFile(adminClient, 'ebooks', 'pdfs', pdfFile)
    }
    if (coverFile && coverFile.size > 0) {
      const coverPath = await uploadFile(adminClient, 'covers', 'ebooks', coverFile)
      coverUrl = getCoverPublicUrl(adminClient, coverPath)
    }

    const { error } = await adminClient.from('ebooks').update({
      title,
      description: description || null,
      price_inr: isFree ? 0 : parseInt(priceStr || '0', 10),
      is_free: isFree,
      is_published: isPublished,
      author: author || 'Tradeverse City',
      tags,
      page_count: pageCountStr ? parseInt(pageCountStr, 10) : null,
      cover_url: coverUrl,
      pdf_path: pdfPath,
      updated_at: new Date().toISOString(),
    }).eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/ebooks')
    revalidatePath('/admin/ebooks')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function deleteEbook(id: string) {
  try {
    const { adminClient } = await requireAdmin()
    const { error } = await adminClient.from('ebooks').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/ebooks')
    revalidatePath('/admin/ebooks')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function toggleEbookActive(id: string, is_published: boolean) {
  try {
    const { adminClient } = await requireAdmin()
    const { error } = await adminClient
      .from('ebooks')
      .update({ is_published, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/ebooks')
    revalidatePath('/ebooks')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateInquiryStatus(id: string, is_read: boolean) {
  try {
    const { adminClient } = await requireAdmin()
    const { error } = await adminClient.from('contact_inquiries').update({ is_read }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function deleteInquiry(id: string) {
  try {
    const { adminClient } = await requireAdmin()
    const { error } = await adminClient.from('contact_inquiries').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}
