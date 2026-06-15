import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { internshipService, InternshipApplication } from '@/services/internshipService'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { FileText, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import { emailService } from '@/services/emailService'

export const Route = createFileRoute('/admin/applications')({
  component: ApplicationsManager,
})

function ApplicationsManager() {
  const [apps, setApps] = useState<InternshipApplication[]>([])
  const [loading, setLoading] = useState(true)

  const fetchApps = async () => {
    setLoading(true)
    try {
      const data = await internshipService.getAllApplications()
      setApps(data)
    } catch (err) {
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApps()
  }, [])

  const handleUpdateStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      await internshipService.updateStatus(id, status)
      toast.success(`Application marked as ${status}`)
      
      const app = apps.find(a => a.id === id)
      if (app) {
        if (status === 'Approved') {
          emailService.sendApprovalEmail({ name: app.full_name, email: app.email, domain: app.internship_domain })
        } else {
          emailService.sendRejectionEmail({ name: app.full_name, email: app.email, domain: app.internship_domain })
        }
      }

      setApps(apps.map(a => a.id === id ? { ...a, status } : a))
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return
    try {
      await internshipService.deleteApplication(id)
      toast.success('Application deleted')
      setApps(apps.filter(a => a.id !== id))
    } catch (error) {
      toast.error('Failed to delete application')
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Internship Applications</h2>
      </div>

      <div className="card-premium rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--border)] hover:bg-transparent">
              <TableHead className="text-[var(--muted-foreground)]">Date</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Name</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Domain</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Status</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Resume</TableHead>
              <TableHead className="text-right text-[var(--muted-foreground)]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-[var(--muted-foreground)]">
                  No applications found
                </TableCell>
              </TableRow>
            ) : apps.map((app) => (
              <TableRow key={app.id} className="border-[var(--border)] hover:bg-white/5">
                <TableCell className="font-medium text-white">
                  {new Date(app.created_at || '').toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="text-white">{app.full_name}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">{app.email}</div>
                </TableCell>
                <TableCell className="text-white">{app.internship_domain}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    app.status === 'Approved' ? 'border-emerald-500 text-emerald-400' :
                    app.status === 'Rejected' ? 'border-rose-500 text-rose-400' :
                    'border-amber-500 text-amber-400'
                  }>
                    {app.status || 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {app.resume_url && (
                    <a href={app.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-[var(--cyan)] hover:underline">
                      <FileText className="h-4 w-4 mr-1" /> View
                    </a>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {app.status === 'Pending' && (
                    <>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20" onClick={() => handleUpdateStatus(app.id!, 'Approved')}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20" onClick={() => handleUpdateStatus(app.id!, 'Rejected')}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--muted-foreground)] hover:text-rose-400 hover:bg-rose-500/10" onClick={() => handleDelete(app.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
