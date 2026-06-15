import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { roadmapService, Roadmap } from '@/services/roadmapService'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Trash2, Edit } from 'lucide-react'

export const Route = createFileRoute('/admin/roadmaps')({
  component: RoadmapsManager,
})

function RoadmapsManager() {
  const [items, setItems] = useState<Roadmap[]>([])
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const data = await roadmapService.getAllRoadmaps()
      setItems(data)
    } catch (err) {
      toast.error('Failed to load roadmaps')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this roadmap?')) return
    try {
      await roadmapService.deleteRoadmap(id)
      toast.success('Roadmap deleted')
      setItems(items.filter(i => i.id !== id))
    } catch (error) {
      toast.error('Failed to delete roadmap')
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Roadmaps</h2>
        <Button className="btn-cta">Add Roadmap</Button>
      </div>

      <div className="card-premium rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--border)] hover:bg-transparent">
              <TableHead className="text-[var(--muted-foreground)]">Domain</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Title</TableHead>
              <TableHead className="text-[var(--muted-foreground)]">Date Added</TableHead>
              <TableHead className="text-right text-[var(--muted-foreground)]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-[var(--muted-foreground)]">
                  No roadmaps found
                </TableCell>
              </TableRow>
            ) : items.map((item) => (
              <TableRow key={item.id} className="border-[var(--border)] hover:bg-white/5">
                <TableCell className="font-medium text-white">{item.domain_name}</TableCell>
                <TableCell className="text-[var(--muted-foreground)]">{item.title}</TableCell>
                <TableCell className="text-[var(--muted-foreground)]">{new Date(item.created_at || '').toLocaleDateString()}</TableCell>
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
