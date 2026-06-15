import { Suspense } from 'react'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export const metadata = {
  title: 'Forgot Password | Tradeverse City',
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Reset your password</h1>
        <p className="text-muted-foreground text-sm">Enter your email and we&apos;ll send you a reset link</p>
      </div>
      <Suspense fallback={<div className="text-center text-muted-foreground text-sm">Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </>
  )
}