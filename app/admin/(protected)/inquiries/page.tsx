import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageSquare, Mail, Phone, Clock } from "lucide-react"
import { markInquiryRead } from "@/app/admin/(protected)/actions"

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  const adminClient = createAdminClient()
  const { data: profile } = await adminClient.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) redirect("/dashboard")
  return adminClient
}

export const metadata = { title: "Inquiries | Admin" }

export default async function AdminInquiriesPage() {
  const supabase = await requireAdmin()

  const { data: inquiries } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false })

  const unreadCount = inquiries?.filter((i) => !i.is_read).length ?? 0

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin" className="text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Contact Inquiries
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-gold text-background text-xs font-bold rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground">{inquiries?.length ?? 0} total messages</p>
          </div>
        </div>

        {!inquiries || inquiries.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">No inquiries yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`bg-card border rounded-2xl p-5 transition-all ${
                  !inquiry.is_read ? "border-gold/30 shadow-lg shadow-gold/5" : "border-border"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground">{inquiry.name}</p>
                      {!inquiry.is_read && (
                        <span className="px-2 py-0.5 bg-gold/10 border border-gold/30 text-gold text-xs font-bold rounded-full">New</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-gold transition-colors">
                        <Mail className="w-3 h-3" />{inquiry.email}
                      </a>
                      {inquiry.phone && (
                        <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-gold transition-colors">
                          <Phone className="w-3 h-3" />{inquiry.phone}
                        </a>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(inquiry.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={`mailto:${inquiry.email}?subject=Re: Your Enquiry to Tradeverse City`}
                      className="px-3 py-1.5 bg-gold text-background text-xs font-bold rounded-lg hover:opacity-90 transition-all"
                    >
                      Reply
                    </a>
                    {!inquiry.is_read && (
                      <form action={markInquiryRead.bind(null, inquiry.id)}>
                        <button type="submit" className="px-3 py-1.5 border border-border text-xs text-muted-foreground rounded-lg hover:border-gold/40 hover:text-gold transition-all">
                          Mark read
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground bg-muted/30 rounded-lg px-4 py-3 leading-relaxed">{inquiry.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
