'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .single()
  
  if (!profile?.is_admin) throw new Error('Forbidden: Admin access required')
  return { supabase, user }
}

const ebookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  short_description: z.string().max(200).optional(),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().positive('Price must be positive'),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
})

export async function createEbook(formData: FormData) {
  try {
    const { supabase, user } = await requireAdmin()

    const raw = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      short_description: formData.get('short_description') as string || undefined,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      price: formData.get('price'),
      is_featured: formData.get('is_featured') === 'true',
      is_active: formData.get('is_active') !== 'false',
    }

    const parsed = ebookSchema.safeParse(raw)
    if (!parsed.success) return { error: parsed.error.errors[0].message }

    // Get the profile id for created_by
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    let cover_image_path = null
    let pdf_path = ''

    // Upload cover image
    const coverFile = formData.get('cover_image') as File
    if (coverFile && coverFile.size > 0) {
      const ebookId = crypto.randomUUID()
      const ext = coverFile.name.split('.').pop()
      const path = `ebooks/${ebookId}/cover.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('ebook-covers')
        .upload(path, coverFile, { contentType: coverFile.type })
      if (!uploadError) cover_image_path = path
    }

    // Upload PDF
    const pdfFile = formData.get('pdf_file') as File
    if (pdfFile && pdfFile.size > 0) {
      const ebookId = crypto.randomUUID()
      const path = `ebooks/${ebookId}/content.pdf`
      const { error: uploadError } = await supabase.storage
        .from('ebook-pdfs')
        .upload(path, pdfFile, { contentType: 'application/pdf' })
      if (!uploadError) pdf_path = path
    }

    const { data, error } = await supabase
      .from('ebooks')
      .insert({
        ...parsed.data,
        cover_image_path,
        pdf_path,
        created_by: profile?.id,
      })
      .select()
      .single()

    if (error) return { error: error.message }
    revalidatePath('/admin/ebooks')
    revalidatePath('/catalog')
    return { success: true, ebook: data }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateEbook(id: string, formData: FormData) {
  try {
    const { supabase } = await requireAdmin()

    const raw = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      short_description: formData.get('short_description') as string || undefined,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      price: formData.get('price'),
      is_featured: formData.get('is_featured') === 'true',
      is_active: formData.get('is_active') !== 'false',
    }

    const parsed = ebookSchema.safeParse(raw)
    if (!parsed.success) return { error: parsed.error.errors[0].message }

    const updates: Record<string, any> = { ...parsed.data, updated_at: new Date().toISOString() }

    // Upload new cover if provided
    const coverFile = formData.get('cover_image') as File
    if (coverFile && coverFile.size > 0) {
      const ext = coverFile.name.split('.').pop()
      const path = `ebooks/${id}/cover.${ext}`
      await supabase.storage.from('ebook-covers').upload(path, coverFile, { upsert: true, contentType: coverFile.type })
      updates.cover_image_path = path
    }

    // Upload new PDF if provided
    const pdfFile = formData.get('pdf_file') as File
    if (pdfFile && pdfFile.size > 0) {
      const path = `ebooks/${id}/content.pdf`
      await supabase.storage.from('ebook-pdfs').upload(path, pdfFile, { upsert: true, contentType: 'application/pdf' })
      updates.pdf_path = path
    }

    const { error } = await supabase.from('ebooks').update(updates).eq('id', id)
    if (error) return { error: error.message }

    revalidatePath('/admin/ebooks')
    revalidatePath(`/admin/ebooks/${id}/edit`)
    revalidatePath('/catalog')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function deleteEbook(id: string) {
  try {
    const { supabase } = await requireAdmin()
    const { error } = await supabase.from('ebooks').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/ebooks')
    revalidatePath('/catalog')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function toggleEbookActive(id: string, is_active: boolean) {
  try {
    const { supabase } = await requireAdmin()
    const { error } = await supabase.from('ebooks').update({ is_active, updated_at: new Date().toISOString() }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/ebooks')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    const { supabase } = await requireAdmin()
    const { error } = await supabase.from('contact_inquiries').update({ status }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function deleteInquiry(id: string) {
  try {
    const { supabase } = await requireAdmin()
    const { error } = await supabase.from('contact_inquiries').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}
