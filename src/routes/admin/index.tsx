import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { internshipService } from '@/services/internshipService'
import { tutorialService } from '@/services/tutorialService'
import { roadmapService } from '@/services/roadmapService'
import { Users, FileText, Map, Award } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: DashboardIndex,
})

function DashboardIndex() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    totalTutorials: 0,
    totalRoadmaps: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const apps = await internshipService.getAllApplications()
        const tuts = await tutorialService.getAllTutorials()
        const roads = await roadmapService.getAllRoadmaps()
        
        setStats({
          totalApplications: apps.length,
          pendingApplications: apps.filter(a => a.status === 'Pending').length,
          totalTutorials: tuts.length,
          totalRoadmaps: roads.length,
        })
      } catch (err) {
        console.error("Failed to load stats", err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Applications" value={stats.totalApplications} icon={<Users className="text-[var(--cyan)]" />} />
        <StatCard title="Pending Review" value={stats.pendingApplications} icon={<FileText className="text-[var(--cyan)]" />} />
        <StatCard title="Tutorials" value={stats.totalTutorials} icon={<Award className="text-[var(--cyan)]" />} />
        <StatCard title="Roadmaps" value={stats.totalRoadmaps} icon={<Map className="text-[var(--cyan)]" />} />
      </div>

      {/* Placeholder for recent activity or charts */}
      <div className="card-premium p-6 mt-8">
        <h3 className="text-lg font-medium text-white mb-4">Welcome to the Admin Panel</h3>
        <p className="text-[var(--muted-foreground)]">Use the sidebar to navigate through the management modules.</p>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="card-premium p-6 flex items-center">
      <div className="p-3 rounded-xl bg-[var(--electric)]/20">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  )
}
