"use client";

import { useEffect, useState } from "react";
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
import { Edit, Save, Trash2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  createProject, 
  getProjects, 
  updateProject, 
  deleteProject 
} from "@/app/services/projectApi";
import { getAllOrders } from "@/app/services/orderApi";
import { toast } from "@/components/ui/use-toast";

const statusOptions = ["Planning", "In Progress", "Completed"];

export default function CurrentWorkPage() {
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newProject, setNewProject] = useState({
    project: "",
    vendor: "",
    status: "Planning",
    completion: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availableVendors, setAvailableVendors] = useState([]);

  // Fetch orders to get available vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const orders = await getAllOrders();
        // Extract unique vendors from orders
        const uniqueVendors = [...new Map(orders.map(order => [
          order.vendor._id,
          {
            _id: order.vendor._id,
            vendorName: order.vendor.vendorName
          }
        ])).values()];
        setAvailableVendors(uniqueVendors);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch vendors from orders. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchVendors();
  }, []);

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projects = await getProjects();
      setWork(projects);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditForm(item);
  };

  const handleSave = async () => {
    try {
      const updatedProject = await updateProject(editingId, editForm);
      setWork(work.map((w) => (w._id === editingId ? updatedProject : w)));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddProject = async () => {
    try {
      const selectedVendor = availableVendors.find(v => v._id === newProject.vendor);
      if (!selectedVendor) {
        toast({
          title: "Error",
          description: "Please select a valid vendor",
          variant: "destructive",
        });
        return;
      }

      const projectData = {
        project: newProject.project,
        vendor: selectedVendor._id,
        status: newProject.status,
        completion: Number(newProject.completion),
      };

      const createdProject = await createProject(projectData);
      setWork([...work, {
        ...createdProject,
        vendor: selectedVendor
      }]);
      
      setNewProject({
        project: "",
        vendor: "",
        status: "Planning",
        completion: 0,
      });
      setIsDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setWork(work.filter((w) => w._id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Current Work</h1>
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project">Project Name</Label>
                <Input
                  id="project"
                  value={newProject.project}
                  onChange={(e) =>
                    setNewProject({ ...newProject, project: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Select
                  value={newProject.vendor}
                  onValueChange={(value) =>
                    setNewProject({ ...newProject, vendor: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVendors.map((vendor) => (
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
                  value={newProject.status}
                  onValueChange={(value) =>
                    setNewProject({ ...newProject, status: value })
                  }
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
              <div>
                <Label htmlFor="completion">Completion (%)</Label>
                <Input
                  id="completion"
                  type="number"
                  value={newProject.completion}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      completion: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Button onClick={handleAddProject}>Add Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
                <TableRow key={item._id}>
                  <TableCell>
                    {editingId === item._id ? (
                      <Input
                        name="project"
                        value={editForm.project || item.project}
                        onChange={handleChange}
                      />
                    ) : (
                      item.project
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item._id ? (
                      <Select
                        value={editForm.vendor?._id || item.vendor._id}
                        onValueChange={(value) => {
                          const selectedVendor = availableVendors.find(v => v._id === value);
                          setEditForm({
                            ...editForm,
                            vendor: selectedVendor
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableVendors.map((vendor) => (
                            <SelectItem key={vendor._id} value={vendor._id}>
                              {vendor.vendorName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      item.vendor?.vendorName || 'N/A'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item._id ? (
                      <Select
                        value={editForm.status || item.status}
                        onValueChange={(value) =>
                          setEditForm({ ...editForm, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {editForm.status || item.status}
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
                          item.status === "Completed" ? "default" : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item._id ? (
                      <Input
                        name="completion"
                        type="number"
                        value={editForm.completion || item.completion}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${item.completion}%` }}
                        ></div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item._id ? (
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
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(item._id)}
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