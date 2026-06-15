import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = "tradeversecity@gmail.com"
const FROM_EMAIL = "Tradeverse City <onboarding@resend.dev>"

export async function sendPurchaseConfirmationToCustomer({
  customerEmail,
  customerName,
  ebookTitle,
  ebookAuthor,
  amountInr,
  paymentId,
  accessUrl,
}: {
  customerEmail: string
  customerName: string
  ebookTitle: string
  ebookAuthor: string
  amountInr: number
  paymentId: string
  accessUrl: string
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Your purchase is confirmed — ${ebookTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:12px;overflow:hidden;border:1px solid #222;">
        <tr>
          <td style="background:#111111;padding:32px 40px;border-bottom:2px solid #D4A017;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;color:#D4A017;text-transform:uppercase;font-weight:700;">TRADEVERSE CITY</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:700;">Purchase Confirmed</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;font-size:16px;color:#cccccc;">Hi <strong style="color:#ffffff;">${customerName || "there"}</strong>,</p>
            <p style="margin:0 0 24px;font-size:15px;color:#999999;line-height:1.6;">
              Thank you for your purchase! You now have full access to the ebook below.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:8px;border:1px solid #2a2a2a;margin-bottom:28px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 6px;font-size:12px;color:#D4A017;letter-spacing:2px;text-transform:uppercase;font-weight:700;">EBOOK</p>
                  <p style="margin:0 0 4px;font-size:20px;color:#ffffff;font-weight:700;">${ebookTitle}</p>
                  <p style="margin:0 0 16px;font-size:13px;color:#888888;">by ${ebookAuthor}</p>
                  <p style="margin:0 0 4px;font-size:12px;color:#666666;">Amount Paid: <strong style="color:#D4A017;">&#8377;${amountInr}</strong></p>
                  <p style="margin:0;font-size:11px;color:#555555;font-family:monospace;">Payment ID: ${paymentId}</p>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:8px 0 28px;">
                  <a href="${accessUrl}" style="display:inline-block;background:#D4A017;color:#000000;text-decoration:none;font-weight:700;font-size:15px;padding:14px 36px;border-radius:8px;">
                    Access Your Ebook
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:13px;color:#555555;line-height:1.6;">
              Questions? Email us at <a href="mailto:${ADMIN_EMAIL}" style="color:#D4A017;text-decoration:none;">${ADMIN_EMAIL}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #1e1e1e;text-align:center;">
            <p style="margin:0;font-size:11px;color:#444444;">Tradeverse City &bull; Trading Education Platform</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    })
  } catch (err) {
    console.error("[email] sendPurchaseConfirmationToCustomer error:", err)
  }
}

export async function sendPurchaseNotificationToAdmin({
  customerEmail,
  customerName,
  ebookTitle,
  amountInr,
  paymentId,
}: {
  customerEmail: string
  customerName: string
  ebookTitle: string
  amountInr: number
  paymentId: string
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Purchase — ${ebookTitle} (&#8377;${amountInr})`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:12px;overflow:hidden;border:1px solid #222;">
        <tr>
          <td style="background:#D4A017;padding:20px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;color:#000;text-transform:uppercase;font-weight:700;">TRADEVERSE CITY — ADMIN</p>
            <h1 style="margin:4px 0 0;font-size:20px;color:#000000;font-weight:800;">New Ebook Purchase</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:13px;color:#888888;width:140px;">Customer</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:14px;color:#ffffff;font-weight:600;">${customerName || "—"}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:13px;color:#888888;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:14px;color:#D4A017;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:13px;color:#888888;">Ebook</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:14px;color:#ffffff;font-weight:600;">${ebookTitle}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:13px;color:#888888;">Amount</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;font-size:16px;color:#D4A017;font-weight:800;">&#8377;${amountInr}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#888888;">Payment ID</td>
                <td style="padding:10px 0;font-size:11px;color:#555555;font-family:monospace;">${paymentId}</td>
              </tr>
            </table>
            <div style="margin-top:24px;text-align:center;">
              <a href="https://tradeversecity.com/admin/orders" style="display:inline-block;background:#D4A017;color:#000;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;">
                View in Admin Panel
              </a>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    })
  } catch (err) {
    console.error("[email] sendPurchaseNotificationToAdmin error:", err)
  }
}
