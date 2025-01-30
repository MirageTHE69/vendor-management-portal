"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createEmployee, getAllEmployees, updateEmployee, deleteEmployee } from "@/app/services/employeeApi"
import { fetchAllVendors } from "@/app/services/vendorApi"

const statusOptions = ["Active", "On Leave"]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [vendorList, setVendorList] = useState([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({})
  const [newEmployee, setNewEmployee] = useState({ employeeName: "", position: "", vendor: "", status: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees()
        console.log(data)
        setEmployees(data)
      } catch (error) {
        console.error("Failed to fetch employees:", error)
      }
    }

    const fetchVendors = async () => {
      try {
        const vendors = await fetchAllVendors()
        setVendorList(vendors)
      } catch (error) {
        console.error("Failed to fetch vendors:", error)
      }
    }

    fetchEmployees()
    fetchVendors()
  }, [])

  const handleEdit = (employee) => {
    setEditingId(employee._id)
    setEditForm({
      employeeName: employee.employeeName,
      position: employee.position,
      vendor: employee.vendor._id, // Store vendor ID, not vendor name
      status: employee.status,
    })
  }

  const handleAddEmployee = async () => {
    try {
      const newEmp = await createEmployee(newEmployee)
      
      // Add the complete vendor information to the new employee data
      const completeNewEmp = {
        ...newEmp,
        vendor: {
          _id: newEmployee.vendor,
          vendorName: vendorList.find(v => v._id === newEmployee.vendor)?.vendorName
        }
      }
      
      setEmployees([...employees, completeNewEmp])
      setNewEmployee({ employeeName: "", position: "", vendor: "", status: "" })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to add employee:", error)
    }
  }

  const handleSave = async () => {
    try {
     
      const dataToUpdate = {
        ...editForm,
        vendor: editForm.vendor.id || editForm.vendor 
      }
      
      const updatedEmp = await updateEmployee(editingId, dataToUpdate)

      setEmployees(employees.map((e) => {
        if (e._id === editingId) {
          return {
            ...updatedEmp,
            vendor: {
              _id: editForm.vendor.id || editForm.vendor,
              vendorName: vendorList.find(v => v._id === (editForm.vendor.id || editForm.vendor))?.vendorName
            }
          }
        }
        return e
      }))
      
      setEditingId(null)
      setEditForm({})
    } catch (error) {
      console.error("Failed to update employee:", error)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id)
      setEmployees(employees.filter((employee) => employee._id !== id))
    } catch (error) {
      console.error("Failed to delete employee:", error)
    }
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
                <Label htmlFor="vendor">Vendor</Label>
                <Select
                  value={newEmployee.vendor}
                  onValueChange={(value) => setNewEmployee({ ...newEmployee, vendor: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorList.map((vendor) => (
                      <SelectItem key={vendor._id} value={vendor._id}>
                        {vendor.vendorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newEmployee.status}
                  onValueChange={(value) => setNewEmployee({ ...newEmployee, status: value })}
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
              </div>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
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
                <TableRow key={employee._id}>
                  <TableCell>
                    {editingId === employee._id ? (
                      <Input
                        name="employeeName"
                        value={editForm.employeeName || employee.employeeName}
                        onChange={handleChange}
                      />
                    ) : (
                      employee.employeeName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === employee._id ? (
                      <Input
                        name="position"
                        value={editForm.position || employee.position}
                        onChange={handleChange}
                      />
                    ) : (
                      employee.position
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === employee._id ? (
                      <Select
                        value={editForm.vendor || employee.vendor._id}
                        onValueChange={(value) => setEditForm({ ...editForm, vendor: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendorList.map((vendor) => (
                            <SelectItem key={vendor._id} value={vendor._id}>
                              {vendor.vendorName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      employee.vendor.vendorName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === employee._id ? (
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
                    {editingId === employee._id ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(employee)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(employee._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
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