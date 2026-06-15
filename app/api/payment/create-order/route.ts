import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { ebookId } = await request.json()
    if (!ebookId) {
      return NextResponse.json({ error: "ebookId is required" }, { status: 400 })
    }

    // Fetch ebook price
    const admin = createAdminClient()
    const { data: ebook, error: ebookError } = await admin
      .from("ebooks")
      .select("id, title, price_inr, is_free, is_published")
      .eq("id", ebookId)
      .single()

    if (ebookError || !ebook) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 })
    }

    if (!ebook.is_published) {
      return NextResponse.json({ error: "Ebook not available" }, { status: 400 })
    }

    // Check for existing paid purchase
    const { data: existing } = await admin
      .from("purchases")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("ebook_id", ebookId)
      .eq("status", "paid")
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: "Already purchased" }, { status: 400 })
    }

    // Free ebook — record purchase directly without Razorpay
    if (ebook.is_free || ebook.price_inr === 0) {
      const { error: upsertError } = await admin.from("purchases").upsert(
        {
          user_id: user.id,
          ebook_id: ebookId,
          razorpay_order_id: null,
          razorpay_payment_id: `free_${Date.now()}`,
          razorpay_signature: "free",
          amount_inr: 0,
          status: "paid",
        },
        { onConflict: "user_id,ebook_id" }
      )

      if (upsertError) {
        return NextResponse.json({ error: upsertError.message }, { status: 500 })
      }

      return NextResponse.json({ free: true })
    }

    // Create Razorpay order for paid ebooks
    const amountPaise = Math.round(ebook.price_inr * 100)
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${user.id.slice(0, 8)}_${ebookId.slice(0, 8)}`,
      notes: { userId: user.id, ebookId: ebook.id },
    })

    // Persist pending purchase
    await admin.from("purchases").upsert(
      {
        user_id: user.id,
        ebook_id: ebookId,
        razorpay_order_id: order.id,
        amount_inr: ebook.price_inr,
        status: "pending",
      },
      { onConflict: "user_id,ebook_id" }
    )

    return NextResponse.json({
      orderId: order.id,
      amount: amountPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error("[payment] create-order error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
