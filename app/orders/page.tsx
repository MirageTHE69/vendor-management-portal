"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Edit, Trash2 } from "lucide-react";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "@/app/services/orderApi";
import { getVendors } from "@/app/services/vendorApi";

const statusOptions = ["Pending", "Fulfilled", "Cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [newOrder, setNewOrder] = useState({
    vendorName: "",
    requiredEmployees: 0,
    techStack: "",
    status: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorData = await getVendors();
        setVendors(vendorData);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleAddOrder = async () => {
    try {
      
      const selectedVendor = vendors.find(v => v.vendorName === newOrder.vendorName);
      
      if (!selectedVendor) {
        console.error("Selected vendor not found");
        return;
      }

      const orderData = {
        requiredEmployees: Number(newOrder.requiredEmployees),
        techStack: Array.isArray(newOrder.techStack) ? newOrder.techStack : [newOrder.techStack], 
        vendor: selectedVendor._id, 
        status: newOrder.status
      };

      console.log('Sending new order data:', orderData);
      
     
      const newOrd = await createOrder(orderData);
      console.log('Response from server:', newOrd);

    
      const vendorDetails = vendors.find(v => v._id === newOrd.vendor);

     
      const populatedOrder = {
        ...newOrd,
        vendor: vendorDetails, 
      };

      
      setOrders([...orders, populatedOrder]);

      
      setNewOrder({
        vendorName: "",
        requiredEmployees: 0,
        techStack: "",
        status: ""
      });

      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to add order:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleEditClick = (order) => {
    setEditingId(order._id);
    setEditingOrder({ ...order });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingOrder(null);
  };

  const handleEditOrder = async () => {
    try {
      
      const selectedVendor = vendors.find(
        (v) => v.vendorName === editingOrder.vendor.vendorName
      );

      
      const updatedOrderData = {
        vendor: selectedVendor._id, 
        requiredEmployees: editingOrder.requiredEmployees,
        techStack: editingOrder.techStack,
        status: editingOrder.status,
      };

      console.log("Updated Order Data:", updatedOrderData);

      
      await updateOrder(editingOrder._id, updatedOrderData);

      
      const updatedOrders = orders.map((order) =>
        order._id === editingOrder._id
          ? {
              ...order,
              vendor: selectedVendor,
              requiredEmployees: editingOrder.requiredEmployees,
              techStack: editingOrder.techStack,
              status: editingOrder.status,
            }
          : order
      );

      setOrders(updatedOrders);
      setEditingId(null);
      setEditingOrder(null);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Management</h1>
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Order</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Select
                  value={newOrder.vendorName}
                  onValueChange={(value) =>
                    setNewOrder({ ...newOrder, vendorName: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor._id} value={vendor.vendorName}>
                        {vendor.vendorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="requiredEmployees">Required Employees</Label>
                <Input
                  id="requiredEmployees"
                  type="number"
                  value={newOrder.requiredEmployees}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      requiredEmployees: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="techStack">Tech Stack</Label>
                <Input
                  id="techStack"
                  value={newOrder.techStack}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, techStack: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newOrder.status}
                  onValueChange={(value) =>
                    setNewOrder({ ...newOrder, status: value })
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
              <Button onClick={handleAddOrder}>Add Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Required Employees</TableHead>
            <TableHead>Tech Stack</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>
                {editingId === order._id ? (
                  <Select
                    value={editingOrder.vendor.vendorName}
                    onValueChange={(value) => {
                      const selectedVendor = vendors.find(
                        (v) => v.vendorName === value
                      );
                      setEditingOrder({
                        ...editingOrder,
                        vendor: selectedVendor,
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor._id} value={vendor.vendorName}>
                          {vendor.vendorName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  order.vendor.vendorName
                )}
              </TableCell>
              <TableCell>
                {editingId === order._id ? (
                  <Input
                    type="number"
                    value={editingOrder.requiredEmployees}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        requiredEmployees: Number.parseInt(e.target.value),
                      })
                    }
                  />
                ) : (
                  order.requiredEmployees
                )}
              </TableCell>
              <TableCell>
                {editingId === order._id ? (
                  <Input
                    value={
                      Array.isArray(editingOrder.techStack)
                        ? editingOrder.techStack.join(", ")
                        : editingOrder.techStack
                    }
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        techStack: e.target.value,
                      })
                    }
                  />
                ) : (
                  Array.isArray(order.techStack)
                    ? order.techStack.join(", ")
                    : order.techStack
                )}
              </TableCell>
              <TableCell>
                {editingId === order._id ? (
                  <Select
                    value={editingOrder.status}
                    onValueChange={(value) =>
                      setEditingOrder({ ...editingOrder, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>{editingOrder.status}</SelectValue>
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
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order._id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue>{order.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {editingId === order._id ? (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleEditOrder}
                      >
                        ✓
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCancelEdit}
                      >
                        ✕
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(order)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}