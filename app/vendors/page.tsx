"use client";

import { useState, useEffect } from "react";
import {
  createVendor,
  getVendors,
  updateVendor,
  deleteVendor,
} from "@/app/services/vendorApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Pencil, Save, Trash2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const statusOptions = ["Pending", "Active"];

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{
    vendorName: string;
    type: string;
    employees: number;
    status: string;
  }>({
    vendorName: "",
    type: "",
    employees: 0,
    status: "Pending",
  });
  const [newVendorForm, setNewVendorForm] = useState<{
    vendorName: string;
    type: string;
    employees: number;
    status: string;
  }>({
    vendorName: "",
    type: "",
    employees: 0,
    status: "Pending",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch vendors on page load
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const fetchedVendors = await getVendors();
        setVendors(fetchedVendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleEdit = (vendor) => {
    setEditingId(vendor._id);
    setEditForm({
      vendorName: vendor.vendorName,
      type: vendor.type,
      employees: vendor.employees,
      status: vendor.status,
    });
  };

  const handleSave = async () => {
    try {
      const updatedVendor = await updateVendor(editingId, editForm);
      setVendors(vendors.map((v) => (v._id === editingId ? updatedVendor : v)));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleAddVendor = async () => {
    try {
      // Create the vendor data object
      const vendorData = {
        vendorName: newVendorForm.vendorName.trim(),
        type: newVendorForm.type.trim(),
        employees: Number(newVendorForm.employees),
        status: newVendorForm.status || "Pending",
      };

      const newVendor = await createVendor(vendorData);
      console.log("Successfully created vendor:", newVendor); // Add this log

      setVendors((prevVendors) => [...prevVendors, newVendor]);
      setNewVendorForm({
        vendorName: "",
        type: "",
        employees: 0,
        status: "Pending",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response data:", error.response?.data);
      alert(
        `Failed to add vendor: ${
          error.response?.data?.message || "Please check all fields"
        }`
      );
    }
  };

  const handleDeleteVendor = async (id) => {
    try {
      await deleteVendor(id);
      setVendors(vendors.filter((vendor) => vendor._id !== id));
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

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
                  value={newVendorForm.vendorName}
                  onChange={(e) =>
                    setNewVendorForm({
                      ...newVendorForm,
                      vendorName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="vendor-type">Vendor Type</Label>
                <Input
                  id="vendor-type"
                  placeholder="Vendor Type"
                  value={newVendorForm.type}
                  onChange={(e) =>
                    setNewVendorForm({ ...newVendorForm, type: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="vendor-employees">Number of Employees</Label>
                <Input
                  id="vendor-employees"
                  type="number"
                  placeholder="Number of Employees"
                  value={newVendorForm.employees}
                  onChange={(e) =>
                    setNewVendorForm({
                      ...newVendorForm,
                      employees: +e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="vendor-status">Status</Label>
                <Select
                  id="vendor-status"
                  value={newVendorForm.status}
                  onValueChange={(value) =>
                    setNewVendorForm({ ...newVendorForm, status: value })
                  }
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
              <Button onClick={handleAddVendor}>Add Vendor</Button>
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
                <TableRow key={vendor._id}>
                  <TableCell>
                    {editingId === vendor._id ? (
                      <Input
                        value={editForm.vendorName}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            vendorName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      vendor.vendorName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor._id ? (
                      <Input
                        name="type"
                        value={
                          editForm.type !== undefined
                            ? editForm.type
                            : vendor.type
                        }
                        onChange={(e) =>
                          setEditForm({ ...editForm, type: e.target.value })
                        }
                      />
                    ) : (
                      vendor.type
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor._id ? (
                      <Input
                        name="employees"
                        type="number"
                        value={editForm.employees || vendor.employees}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            employees: +e.target.value,
                          })
                        }
                      />
                    ) : (
                      vendor.employees
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor._id ? (
                      <Select
                        value={editForm.status || vendor.status}
                        onValueChange={(value) => {
                          setEditForm({ ...editForm, status: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {editForm.status || vendor.status}
                          </SelectValue>
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
                      <Badge
                        variant={
                          vendor.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {vendor.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === vendor._id ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEdit(vendor)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDeleteVendor(vendor._id)}
                        >
                          <Trash2 className="h-4 w-4" /> 
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
