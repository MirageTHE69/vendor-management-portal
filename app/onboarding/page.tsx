"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit, Trash2 } from "lucide-react"

// Mock data (replace with API calls in production)
const mockEmployees = [
  { id: 1, name: "John Doe", vendor: "Acme Inc", status: "Working" },
  { id: 2, name: "Jane Smith", vendor: "Tech Solutions", status: "Onboarding" },
  // Add more mock data as needed
]

const mockVendors = ["Acme Inc", "Tech Solutions", "Global Services"]

const statusOptions = ["Onboarding", "Interview", "Selected", "Working"]

export default function Onboarding() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [vendors, setVendors] = useState(mockVendors)
  const [newEmployee, setNewEmployee] = useState({ name: "", vendor: "", status: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch employees and vendors from API here
    // setEmployees(fetchedEmployees)
    // setVendors(fetchedVendors)
  }, [])

  const handleAddEmployee = () => {
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }])
    setNewEmployee({ name: "", vendor: "", status: "" })
    setIsDialogOpen(false)
  }

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <div className="flex justify-between items-center">
        <Input className="max-w-sm" placeholder="Search employees..." />
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
                <Label htmlFor="name">Employee Name</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Select
                  value={newEmployee.vendor}
                  onValueChange={(value) => setNewEmployee({ ...newEmployee, vendor: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Current Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.vendor}</TableCell>
              <TableCell>
                <Select defaultValue={employee.status}>
                  <SelectTrigger>
                    <SelectValue>{employee.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteEmployee(employee.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

