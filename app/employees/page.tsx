"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, X } from "lucide-react"

const initialEmployees = [
  { id: 1, name: "John Doe", position: "Senior Developer", vendor: "TechCorp Solutions", status: "Active" },
  { id: 2, name: "Jane Smith", position: "Data Analyst", vendor: "DataSys Inc", status: "Active" },
  { id: 3, name: "Mike Johnson", position: "Cloud Architect", vendor: "CloudNet Services", status: "On Leave" },
  { id: 4, name: "Emily Brown", position: "Security Specialist", vendor: "SecureIT Pro", status: "Active" },
  { id: 5, name: "Chris Lee", position: "DevOps Engineer", vendor: "DevOps Masters", status: "Active" },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({})

  const handleEdit = (employee) => {
    setEditingId(employee.id)
    setEditForm(employee)
  }

  const handleSave = () => {
    setEmployees(employees.map((e) => (e.id === editingId ? { ...e, ...editForm } : e)))
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
      <h1 className="text-3xl font-bold">Employees</h1>
      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    {editingId === employee.id ? (
                      <Input name="name" value={editForm.name || employee.name} onChange={handleChange} />
                    ) : (
                      employee.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === employee.id ? (
                      <Input name="position" value={editForm.position || employee.position} onChange={handleChange} />
                    ) : (
                      employee.position
                    )}
                  </TableCell>
                  <TableCell>{employee.vendor}</TableCell>
                  <TableCell>
                    {editingId === employee.id ? (
                      <Input name="status" value={editForm.status || employee.status} onChange={handleChange} />
                    ) : (
                      <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === employee.id ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(employee)}>
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

