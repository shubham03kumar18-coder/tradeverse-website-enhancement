interface PaymentConfirmationProps {
  userName: string
  userEmail: string
  ebookTitle: string
  orderId: string
  amount: number
  purchaseDate: string
}

export function PaymentConfirmationEmail({
  userName,
  ebookTitle,
  orderId,
  amount,
  purchaseDate,
}: PaymentConfirmationProps) {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tradeversecity.com'}/dashboard/my-library`

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0a0a0a', fontFamily: 'Arial, sans-serif' }}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#0a0a0a' }}>
          <tr>
            <td align="center" style={{ padding: '40px 20px' }}>
              <table width="600" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#141414', borderRadius: '16px', border: '1px solid #2a2a2a', overflow: 'hidden', maxWidth: '600px' }}>
                {/* Header */}
                <tr>
                  <td style={{ backgroundColor: '#0f0f0f', padding: '32px 40px', borderBottom: '1px solid #2a2a2a', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f5f5f5', letterSpacing: '2px' }}>TRADEVERSE</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#C9A84C', letterSpacing: '4px' }}>CITY</p>
                  </td>
                </tr>

                {/* Hero */}
                <tr>
                  <td style={{ padding: '40px 40px 32px', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(201,168,76,0.1)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '28px' }}>✓</span>
                    </div>
                    <h1 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 'bold', color: '#f5f5f5' }}>
                      Payment Successful!
                    </h1>
                    <p style={{ margin: 0, fontSize: '15px', color: '#888' }}>
                      Hi {userName}, your purchase is confirmed.
                    </p>
                  </td>
                </tr>

                {/* Order Details */}
                <tr>
                  <td style={{ padding: '0 40px 32px' }}>
                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#0f0f0f', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                      <tr>
                        <td style={{ padding: '24px' }}>
                          <p style={{ margin: '0 0 16px', fontSize: '12px', fontWeight: 'bold', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>Order Details</p>
                          {[
                            ['Ebook', ebookTitle],
                            ['Amount Paid', `₹${amount.toLocaleString('en-IN')}`],
                            ['Order ID', orderId],
                            ['Purchase Date', purchaseDate],
                          ].map(([label, value]) => (
                            <table key={label} width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '12px' }}>
                              <tr>
                                <td style={{ fontSize: '13px', color: '#888' }}>{label}</td>
                                <td style={{ fontSize: '13px', color: '#f5f5f5', textAlign: 'right', fontWeight: label === 'Amount Paid' ? 'bold' : 'normal', color: label === 'Amount Paid' ? '#C9A84C' : '#f5f5f5' }}>{value}</td>
                              </tr>
                            </table>
                          ))}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* CTA */}
                <tr>
                  <td style={{ padding: '0 40px 40px', textAlign: 'center' }}>
                    <a
                      href={dashboardUrl}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#C9A84C',
                        color: '#0a0a0a',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        textDecoration: 'none',
                        padding: '14px 36px',
                        borderRadius: '10px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Read Your Ebook Now
                    </a>
                    <p style={{ marginTop: '16px', fontSize: '13px', color: '#666' }}>
                      You can access all your purchased ebooks from your library.
                    </p>
                  </td>
                </tr>

                {/* Support */}
                <tr>
                  <td style={{ padding: '24px 40px', borderTop: '1px solid #2a2a2a', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                      Questions? Contact us at{' '}
                      <a href="mailto:tradeversecity@gmail.com" style={{ color: '#C9A84C', textDecoration: 'none' }}>
                        tradeversecity@gmail.com
                      </a>
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: '20px 40px', backgroundColor: '#0f0f0f', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '11px', color: '#555' }}>
                      &copy; {new Date().getFullYear()} Tradeverse City. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
