import { Suspense } from 'react'
import ResetPasswordForm from '@/components/auth/reset-password-form'

export const metadata = {
  title: 'Reset Password | Tradeverse City',
}

export default function ResetPasswordPage() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Set new password</h1>
        <p className="text-muted-foreground text-sm">Choose a strong new password for your account</p>
      </div>
      <Suspense fallback={<div className="text-center text-muted-foreground text-sm">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </>
  )
}