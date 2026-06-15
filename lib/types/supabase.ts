export interface Profile {
  id: string
  user_id: string
  full_name: string
  email: string
  avatar_url: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Ebook {
  id: string
  title: string
  slug: string
  description: string
  short_description: string | null
  cover_image_path: string | null
  category: string
  price: number
  pdf_path: string
  total_pages: number | null
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  created_by: string
}

export interface Purchase {
  id: string
  user_id: string
  ebook_id: string
  order_id: string
  payment_id: string
  amount: number
  payment_status: 'pending' | 'completed' | 'failed'
  purchased_at: string
  accessed_at: string | null
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: 'new' | 'replied' | 'closed'
  created_at: string
}

// Extended types for joined queries
export interface PurchaseWithEbook extends Purchase {
  ebook: Ebook
}

export interface EbookWithPurchase extends Ebook {
  purchase?: Purchase
  hasPurchased?: boolean
}
