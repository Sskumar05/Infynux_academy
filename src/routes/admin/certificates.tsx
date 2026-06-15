import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { certificateService, Certificate } from '@/services/certificateService'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Trash2, Edit } from 'lucide-react'

export const Route = createFileRoute('/admin/certificates')({
  component: CertificatesManager,
})

function CertificatesManager() {
  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const data = await certificateService.getAllCertificates()
      setItems(data)
    } catch (err) {
      toast.error('Failed to load certificates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return
    try {
      await certificateService.deleteCertificate(id)
      toast.success('Certificate deleted')
      setItems(items.filter(i => i.id !== id))
    } catch (error) {
      toast.error('Failed to delete certificate')
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Certificates</h2>
        <Button className="btn-cta">Issue Certificate</Button>
      </div>

      <div className="card-premium rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--border)] hover:bg-transparent">
              <TableHead className="text-[var(--muted-foreground)]">Cert ID</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Student Name</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Course</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Issue Date</TableHead>
              <TableHead className="text-right text-[var(--muted-foreground)]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-[var(--muted-foreground)]">
                  No certificates found
                </TableCell>
              </TableRow>
            ) : items.map((item) => (
              <TableRow key={item.id} className="border-[var(--border)] hover:bg-white/5">
                <TableCell className="font-medium text-emerald-400">{item.certificate_id}</TableCell>
                <TableCell className="text-white">{item.student_name}</TableCell>
                <TableCell className="text-[var(--muted-foreground)]">{item.course_name}</TableCell>
                <TableCell className="text-[var(--muted-foreground)]">{new Date(item.issue_date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--cyan)] hover:bg-[var(--cyan)]/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--muted-foreground)] hover:text-rose-400 hover:bg-rose-500/10" onClick={() => handleDelete(item.id!)}>
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
