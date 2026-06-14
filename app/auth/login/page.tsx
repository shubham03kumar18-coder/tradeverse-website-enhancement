import LoginForm from '@/components/auth/login-form'

export const metadata = {
  title: 'Sign In | Tradeverse City',
  description: 'Sign in to your Tradeverse City account to access your ebooks and dashboard.',
}

export default function LoginPage() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground text-sm">Sign in to your Tradeverse City account</p>
      </div>
      <LoginForm />
    </>
  )
}
