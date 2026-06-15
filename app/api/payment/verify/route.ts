import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendPurchaseConfirmationToCustomer, sendPurchaseNotificationToAdmin } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, ebookId } =
      await request.json()

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !ebookId) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 })
    }

    // Verify HMAC signature
    const body = `${razorpayOrderId}|${razorpayPaymentId}`
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const admin = createAdminClient()

    // Mark purchase as paid
    const { error } = await admin
      .from("purchases")
      .update({
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
        status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("ebook_id", ebookId)
      .eq("razorpay_order_id", razorpayOrderId)

    if (error) {
      console.error("[v0] purchase update error:", error)
      return NextResponse.json({ error: "Failed to record purchase" }, { status: 500 })
    }

    // Fetch ebook details for email
    const { data: ebook } = await admin
      .from("ebooks")
      .select("title, author, price_inr, slug")
      .eq("id", ebookId)
      .single()

    // Fetch customer profile
    const { data: profile } = await admin
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single()

    const customerName = profile?.full_name || user.email?.split("@")[0] || "Student"
    const customerEmail = user.email!
    const ebookTitle = ebook?.title || "Ebook"
    const ebookAuthor = ebook?.author || "Tradeverse City"
    const amountInr = ebook?.price_inr || 0
    const accessUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://tradeversecity.com"}/ebooks/${ebook?.slug || ebookId}`

    // Send emails in parallel (non-blocking — errors are caught inside helpers)
    await Promise.all([
      sendPurchaseConfirmationToCustomer({
        customerEmail,
        customerName,
        ebookTitle,
        ebookAuthor,
        amountInr,
        paymentId: razorpayPaymentId,
        accessUrl,
      }),
      sendPurchaseNotificationToAdmin({
        customerEmail,
        customerName,
        ebookTitle,
        amountInr,
        paymentId: razorpayPaymentId,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] verify payment error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
