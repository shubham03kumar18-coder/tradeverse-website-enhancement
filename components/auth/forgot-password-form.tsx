'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Loader2, Mail, Check } from 'lucide-react'
import { sendResetEmail } from '@/app/actions/auth'

const schema = z.object({
  email: z.string().email('Invalid email address'),
})
type FormData = z.infer<typeof schema>

export default function ForgotPasswordForm() {
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    setServerError('')
    const fd = new FormData()
    fd.append('email', data.email)
    startTransition(async () => {
      const result = await sendResetEmail(fd)
      if (result?.error) setServerError(result.error)
      else setSuccess(true)
    })
  }

  if (success) {
    return (
      <div className="text-center space-y-4 py-6">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Email sent!</h3>
        <p className="text-muted-foreground text-sm">
          We&apos;ve sent a password reset link to your email. Check your inbox and follow the instructions.
        </p>
        <Link href="/auth/login" className="inline-block text-gold hover:underline text-sm font-medium">
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {serverError && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {serverError}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">Email address</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', { onChange: () => setServerError('') })}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors text-sm"
        />
        {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-background font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isPending ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          <><Mail className="w-4 h-4" /> Send Reset Link</>
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/auth/login" className="text-gold hover:underline font-medium">Back to Sign In</Link>
      </p>
    </form>
  )
}
