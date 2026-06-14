'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, UserPlus, Check } from 'lucide-react'
import { signupUser } from '@/app/actions/auth'

const schema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
  terms: z.boolean().refine(v => v === true, { message: 'You must accept the terms' }),
}).refine(data => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})
type FormData = z.infer<typeof schema>

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    setServerError('')
    const fd = new FormData()
    fd.append('full_name', data.full_name)
    fd.append('email', data.email)
    fd.append('password', data.password)
    fd.append('confirm_password', data.confirm_password)
    startTransition(async () => {
      const result = await signupUser(fd)
      if (result?.error) setServerError(result.error)
      else if (result?.success) setSuccess(true)
    })
  }

  if (success) {
    return (
      <div className="text-center space-y-4 py-6">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Check your email</h3>
        <p className="text-muted-foreground text-sm">
          We&apos;ve sent a confirmation link to your email address. Click it to activate your account.
        </p>
        <Link href="/auth/login" className="inline-block text-gold hover:underline text-sm font-medium">
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {serverError && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {serverError}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1.5">
        <label htmlFor="full_name" className="block text-sm font-medium text-foreground">Full name</label>
        <input
          id="full_name"
          type="text"
          autoComplete="name"
          {...register('full_name', { onChange: () => setServerError('') })}
          placeholder="Rahul Sharma"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors text-sm"
        />
        {errors.full_name && <p className="text-destructive text-xs">{errors.full_name.message}</p>}
      </div>

      {/* Email */}
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

      {/* Password */}
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('password', { onChange: () => setServerError('') })}
            placeholder="Min. 8 characters"
            className="w-full px-4 py-3 pr-10 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors text-sm"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle password">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label htmlFor="confirm_password" className="block text-sm font-medium text-foreground">Confirm password</label>
        <div className="relative">
          <input
            id="confirm_password"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('confirm_password', { onChange: () => setServerError('') })}
            placeholder="Re-enter password"
            className="w-full px-4 py-3 pr-10 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors text-sm"
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle confirm password">
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirm_password && <p className="text-destructive text-xs">{errors.confirm_password.message}</p>}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          id="terms"
          type="checkbox"
          {...register('terms')}
          className="mt-0.5 w-4 h-4 rounded border-border bg-input accent-gold cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          I agree to the{' '}
          <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
        </label>
      </div>
      {errors.terms && <p className="text-destructive text-xs -mt-2">{errors.terms.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-background font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isPending ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>
        ) : (
          <><UserPlus className="w-4 h-4" /> Create Account</>
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-gold hover:underline font-medium">Sign in</Link>
      </p>
    </form>
  )
}
