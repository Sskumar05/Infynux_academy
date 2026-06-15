import { Outlet, createFileRoute, redirect, Link, useNavigate } from '@tanstack/react-router'
import { authService } from '@/services/authService'
import { LayoutDashboard, Users, BookOpen, Map, Award, LogOut } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    if (location.pathname === '/admin/login') {
      return
    }

    try {
      const session = await authService.getSession()
      if (!session) {
        throw redirect({
          to: '/admin/login',
          search: {
            redirect: location.href,
          },
        })
      }
    } catch (err) {
      if (err instanceof Error) {
          // log error
      }
      throw err;
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate({ to: '/admin/login' });
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
    { label: 'Applications', icon: Users, to: '/admin/applications' },
    { label: 'Tutorials', icon: BookOpen, to: '/admin/tutorials' },
    { label: 'Roadmaps', icon: Map, to: '/admin/roadmaps' },
    { label: 'Certificates', icon: Award, to: '/admin/certificates' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--card)] border-r border-[var(--border)] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
          <span className="text-lg font-bold text-white">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{ className: 'bg-[var(--electric)]/20 text-[var(--cyan)]' }}
              activeOptions={{ exact: item.to === '/admin' }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--muted-foreground)] hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--border)]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-[var(--border)] bg-[var(--card)] flex items-center px-6">
          <h1 className="text-white font-semibold">INFYNUX Dashboard</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
