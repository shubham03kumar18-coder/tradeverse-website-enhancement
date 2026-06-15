import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
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

    // Mark purchase as paid
    const admin = createAdminClient()
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] verify payment error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
