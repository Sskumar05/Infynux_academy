import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authService } from '@/services/authService'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
})

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.login(email, password)
      toast.success('Logged in successfully')
      navigate({ to: '/admin' })
    } catch (error: any) {
      toast.error('Login failed', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-white">Admin Login</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">Sign in to manage INFYNUX Academy</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card-premium py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-[var(--muted-foreground)]">Email address</label>
              <div className="mt-1">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-[var(--cyan)]/15 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--muted-foreground)]">Password</label>
              <div className="mt-1">
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-[var(--cyan)]/15 text-white"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full btn-cta" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
