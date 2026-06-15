"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, BookOpen, Loader2, CheckCircle } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface BuyButtonProps {
  ebookId: string
  ebookTitle: string
  priceInr: number
  isFree: boolean
  isPurchased: boolean
  userEmail?: string
  userName?: string
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window.Razorpay !== "undefined") return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function BuyButton({
  ebookId,
  ebookTitle,
  priceInr,
  isFree,
  isPurchased,
  userEmail,
  userName,
}: BuyButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isPurchased) {
    return (
      <button
        onClick={() => router.push(`/dashboard/library`)}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-500/10 border border-green-500/30 text-green-500 font-bold text-sm rounded-xl hover:bg-green-500/20 transition-all"
      >
        <BookOpen className="w-4 h-4" />
        Read Ebook
      </button>
    )
  }

  async function handlePurchase() {
    if (!userEmail) {
      router.push(`/auth/login`)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create Razorpay order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ebookId }),
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        setError(orderData.error ?? "Failed to create order")
        setLoading(false)
        return
      }

      // Free ebook — purchase recorded server-side, redirect immediately
      if (orderData.free) {
        router.push("/dashboard/library")
        router.refresh()
        setLoading(false)
        return
      }

      // Load Razorpay SDK
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        setError("Failed to load payment gateway. Please try again.")
        setLoading(false)
        return
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tradeverse City",
        description: ebookTitle,
        order_id: orderData.orderId,
        prefill: {
          name: userName ?? "",
          email: userEmail ?? "",
        },
        theme: { color: "#C9A84C" },
        handler: async function (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) {
          // Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              ebookId,
            }),
          })

          if (verifyRes.ok) {
            router.push("/dashboard/library")
            router.refresh()
          } else {
            const data = await verifyRes.json()
            setError(data.error ?? "Payment verification failed")
          }
          setLoading(false)
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (resp: any) => {
        setError(resp.error?.description ?? "Payment failed")
        setLoading(false)
      })
      rzp.open()
    } catch (err) {
      console.error("[v0] purchase error:", err)
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <p className="text-xs text-destructive text-center bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gold text-background font-bold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-gold/30"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : isFree ? (
          <>
            <BookOpen className="w-4 h-4" />
            Get Free Ebook
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Buy Now — ₹{priceInr.toLocaleString("en-IN")}
          </>
        )}
      </button>
    </div>
  )
}
