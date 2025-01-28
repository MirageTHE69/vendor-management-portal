"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, X } from "lucide-react"

const initialWork = [
  { id: 1, project: "E-commerce Platform", vendor: "TechCorp Solutions", status: "In Progress", completion: 65 },
  { id: 2, project: "Data Analytics Dashboard", vendor: "DataSys Inc", status: "Planning", completion: 20 },
  { id: 3, project: "Cloud Migration", vendor: "CloudNet Services", status: "In Progress", completion: 40 },
  { id: 4, project: "Security Audit", vendor: "SecureIT Pro", status: "Completed", completion: 100 },
  { id: 5, project: "DevOps Pipeline Setup", vendor: "DevOps Masters", status: "In Progress", completion: 80 },
]

export default function CurrentWorkPage() {
  const [work, setWork] = useState(initialWork)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({})

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditForm(item)
  }

  const handleSave = () => {
    setWork(work.map((w) => (w.id === editingId ? { ...w, ...editForm } : w)))
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Current Work</h1>
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {work.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input name="project" value={editForm.project || item.project} onChange={handleChange} />
                    ) : (
                      item.project
                    )}
                  </TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input name="status" value={editForm.status || item.status} onChange={handleChange} />
                    ) : (
                      <Badge variant={item.status === "Completed" ? "default" : "secondary"}>{item.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        name="completion"
                        type="number"
                        value={editForm.completion || item.completion}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.completion}%` }}></div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

