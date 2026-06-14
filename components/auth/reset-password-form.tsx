'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Eye, EyeOff, KeyRound } from 'lucide-react'
import { resetPassword } from '@/app/actions/auth'

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})
type FormData = z.infer<typeof schema>

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState('')
  const [isPending, startTransition] = useTransition()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    setServerError('')
    const fd = new FormData()
    fd.append('password', data.password)
    fd.append('confirm_password', data.confirm_password)
    startTransition(async () => {
      const result = await resetPassword(fd)
      if (result?.error) setServerError(result.error)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {serverError && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {serverError}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">New password</label>
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

      <div className="space-y-1.5">
        <label htmlFor="confirm_password" className="block text-sm font-medium text-foreground">Confirm new password</label>
        <div className="relative">
          <input
            id="confirm_password"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('confirm_password', { onChange: () => setServerError('') })}
            placeholder="Re-enter new password"
            className="w-full px-4 py-3 pr-10 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors text-sm"
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle confirm password">
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirm_password && <p className="text-destructive text-xs">{errors.confirm_password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-background font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isPending ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
        ) : (
          <><KeyRound className="w-4 h-4" /> Update Password</>
        )}
      </button>
    </form>
  )
}
