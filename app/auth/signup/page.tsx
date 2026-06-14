import SignupForm from '@/components/auth/signup-form'

export const metadata = {
  title: 'Create Account | Tradeverse City',
  description: 'Join Tradeverse City and access premium trading education ebooks.',
}

export default function SignupPage() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
        <p className="text-muted-foreground text-sm">Join Tradeverse City and start learning</p>
      </div>
      <SignupForm />
    </>
  )
}
