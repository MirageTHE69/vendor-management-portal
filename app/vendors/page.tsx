"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const statusOptions = ["Active", "Pending"]

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
  const [editForm, setEditForm] = useState<{ name?: string, type?: string, employees?: number, status?: string }>({})
  const [newVendorForm, setNewVendorForm] = useState<{ name: string, type: string, employees: number, status: string }>({
    name: "",
    type: "",
    employees: 0,
    status: "Active",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  const handleStatusChange = (id: number, newStatus: string) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === id ? { ...vendor, status: newStatus } : vendor
      )
    )
  }

  const handleAddVendor = () => {
    const newVendor = { ...newVendorForm, id: vendors.length + 1 }
    setVendors((prevVendors) => [...prevVendors, newVendor])
    setNewVendorForm({ name: "", type: "", employees: 0, status: "Active" })
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Vendor Partners</h1>

      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Vendor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="vendor-name">Vendor Name</Label>
                <Input
                  id="vendor-name"
                  placeholder="Vendor Name"
                  value={newVendorForm.name}
                  onChange={(e) => setNewVendorForm({ ...newVendorForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vendor-type">Vendor Type</Label>
                <Input
                  id="vendor-type"
                  placeholder="Vendor Type"
                  value={newVendorForm.type}
                  onChange={(e) => setNewVendorForm({ ...newVendorForm, type: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vendor-employees">Number of Employees</Label>
                <Input
                  id="vendor-employees"
                  type="number"
                  placeholder="Number of Employees"
                  value={newVendorForm.employees}
                  onChange={(e) => setNewVendorForm({ ...newVendorForm, employees: +e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vendor-status">Status</Label>
                <Select
                  id="vendor-status"
                  value={newVendorForm.status}
                  onValueChange={(value) => setNewVendorForm({ ...newVendorForm, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue>{newVendorForm.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleAddVendor}>
                Add Vendor
              </Button>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mt-6">
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
                      <Input
                        name="name"
                        value={editForm.name || vendor.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    ) : (
                      vendor.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor.id ? (
                      <Input
                        name="type"
                        value={editForm.type || vendor.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                      />
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
                        onChange={(e) => setEditForm({ ...editForm, employees: +e.target.value })}
                      />
                    ) : (
                      vendor.employees
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor.id ? (
                      <Select
                        value={editForm.status || vendor.status}
                        onValueChange={(value) => {
                          setEditForm({ ...editForm, status: value })
                          handleStatusChange(vendor.id, value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue>{editForm.status || vendor.status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>{vendor.status}</Badge>
                    )}
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
