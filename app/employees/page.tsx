"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialEmployees = [
  { id: 1, name: "John Doe", position: "Senior Developer", vendor: "TechCorp Solutions", status: "Active" },
  { id: 2, name: "Jane Smith", position: "Data Analyst", vendor: "DataSys Inc", status: "Active" },
  { id: 3, name: "Mike Johnson", position: "Cloud Architect", vendor: "CloudNet Services", status: "On Leave" },
  { id: 4, name: "Emily Brown", position: "Security Specialist", vendor: "SecureIT Pro", status: "Active" },
  { id: 5, name: "Chris Lee", position: "DevOps Engineer", vendor: "DevOps Masters", status: "Active" },
]
const statusOptions = ["Active", "On Leave"]
//^ To be fetched from API
const vendorList = ["static1", "static2", "static3"]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({})
  const [newEmployee, setNewEmployee] = useState({ employeeName: "",position: "", vendor: "", status: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Employee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={newEmployee.employeeName}
                  onChange={(e) => setNewEmployee({ ...newEmployee, employeeName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                />
                
              </div>
              <div>
                <Label htmlFor="vender">Vendor</Label>
                <Select value={newEmployee.vendor} onValueChange={(value) => setNewEmployee({ ...newEmployee, vendor: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorList.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newEmployee.status} onValueChange={(value) => setNewEmployee({ ...newEmployee, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
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
              <Button 
              // onClick={handleAddEmployee}
              >Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
    <Select
      value={editForm.status || employee.status}
      onValueChange={(value) => setEditForm({ ...editForm, status: value })}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
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
    <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
      {employee.status}
    </Badge>
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

