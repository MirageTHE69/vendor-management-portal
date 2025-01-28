"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, X } from "lucide-react"

const initialVendors = [
  { id: 1, name: "TechCorp Solutions", type: "IT Services", employees: 45, status: "Active" },
  { id: 2, name: "DataSys Inc", type: "Data Analytics", employees: 32, status: "Active" },
  { id: 3, name: "CloudNet Services", type: "Cloud Solutions", employees: 28, status: "Active" },
  { id: 4, name: "SecureIT Pro", type: "Cybersecurity", employees: 15, status: "Pending" },
  { id: 5, name: "DevOps Masters", type: "Development", employees: 38, status: "Active" },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState(initialVendors)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({})

  const handleEdit = (vendor) => {
    setEditingId(vendor.id)
    setEditForm(vendor)
  }

  const handleSave = () => {
    setVendors(vendors.map((v) => (v.id === editingId ? { ...v, ...editForm } : v)))
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
      <h1 className="text-3xl font-bold">Vendor Partners</h1>
      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    {editingId === vendor.id ? (
                      <Input name="name" value={editForm.name || vendor.name} onChange={handleChange} />
                    ) : (
                      vendor.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor.id ? (
                      <Input name="type" value={editForm.type || vendor.type} onChange={handleChange} />
                    ) : (
                      vendor.type
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor.id ? (
                      <Input
                        name="employees"
                        type="number"
                        value={editForm.employees || vendor.employees}
                        onChange={handleChange}
                      />
                    ) : (
                      vendor.employees
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>{vendor.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {editingId === vendor.id ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(vendor)}>
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

