export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Ebook {
  id: string
  title: string
  slug: string
  description: string | null
  author: string | null
  cover_url: string | null
  pdf_path: string | null
  price_inr: number
  is_free: boolean
  is_published: boolean
  page_count: number | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Purchase {
  id: string
  user_id: string
  ebook_id: string
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  razorpay_signature: string | null
  amount_inr: number | null
  status: "pending" | "paid" | "failed"
  created_at: string
  updated_at: string
  ebooks?: Ebook
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}
