"use client";

import { useState } from "react";
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const statusOptions = ["Planning", "In Progress", "Completed"];

const initialWork = [
  {
    id: 1,
    project: "E-commerce Platform",
    vendor: "TechCorp Solutions",
    status: "In Progress",
    completion: 65,
  },
  {
    id: 2,
    project: "Data Analytics Dashboard",
    vendor: "DataSys Inc",
    status: "Planning",
    completion: 20,
  },
  {
    id: 3,
    project: "Cloud Migration",
    vendor: "CloudNet Services",
    status: "In Progress",
    completion: 40,
  },
  {
    id: 4,
    project: "Security Audit",
    vendor: "SecureIT Pro",
    status: "Completed",
    completion: 100,
  },
  {
    id: 5,
    project: "DevOps Pipeline Setup",
    vendor: "DevOps Masters",
    status: "In Progress",
    completion: 80,
  },
];

export default function CurrentWorkPage() {
  const [work, setWork] = useState(initialWork);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({});
  const [newProject, setNewProject] = useState({
    project: "",
    vendor: "",
    status: "Planning",
    completion: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = () => {
    setWork(work.map((w) => (w.id === editingId ? { ...w, ...editForm } : w)));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    setWork([
      ...work,
      {
        id: work.length + 1,
        ...newProject,
        completion: Number(newProject.completion),
      },
    ]);
    setNewProject({
      project: "",
      vendor: "",
      status: "Planning",
      completion: 0,
    });
    setIsDialogOpen(false);
  };

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
                <Input
                  id="vendor"
                  value={newProject.vendor}
                  onChange={(e) =>
                    setNewProject({ ...newProject, vendor: e.target.value })
                  }
                />
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
                      completion: e.target.value,
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
                <TableRow key={item.id}>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        name="project"
                        value={editForm.project || item.project}
                        onChange={handleChange}
                      />
                    ) : (
                      item.project
                    )}
                  </TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>
                    {editingId === item.id ? (
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
                    {editingId === item.id ? (
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
                    {editingId === item.id ? (
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
                        <Button size="icon" variant="destructive">
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
