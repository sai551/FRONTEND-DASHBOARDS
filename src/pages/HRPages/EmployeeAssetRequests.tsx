


import { useState, useEffect } from "react";
import axios from "axios"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Layers,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Request {
  id: number;
  employee: string;
  asset: string;
  category: string;
  status: string;
  requestDate: string;
}

const EmployeeAssetRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
   const token = localStorage.getItem("token"); 

    const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/asset-requests", authConfig);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

 
  const handleAdd = async () => {
    const newRequest = {
      employee: `Employee ${requests.length + 1}`,
      asset: "New Asset",
      category: "Miscellaneous",
      status: "Pending",
      requestDate: new Date().toISOString().split("T")[0],
    };
    try {
      const res = await axios.post("http://localhost:3000/asset-requests", 
        newRequest,
        authConfig);
      setRequests((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding request", err);
    }
  };

  
  const handleApprove = async (id: number) => {
    try {
      const res = await axios.put(`http://localhost:3000/asset-requests/${id}`, {
        status: "Approved",
      },
      authConfig);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, ...res.data } : req))
      );
    } catch (err) {
      console.error("Error approving request", err);
    }
  };

  
  const handleReject = async (id: number) => {
    try {
      const res = await axios.put(`http://localhost:3000/asset-requests/${id}`, {
        status: "Rejected",
      },authConfig);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, ...res.data } : req))
      );
    } catch (err) {
      console.error("Error rejecting request", err);
    }
  };

  const handleEdit = async (id: number, updatedData: Partial<Request>) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/asset-requests/${id}`,
        updatedData,
        authConfig
      );
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, ...res.data } : req))
      );
    } catch (err) {
      console.error("Error editing request", err);
    }
  };

  
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/asset-requests/${id}`, authConfig);
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error("Error deleting request", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Employee Asset Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track asset requests submitted by employees
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-orange-600/20 text-black">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.length}
                </p>
                <Badge variant="secondary" className="mt-1">
                  Submitted by employees
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Approved
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter((r) => r.status === "Approved").length}
                </p>
                <Badge variant="secondary" className="mt-1">
                  Granted to employees
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-warning rounded-2xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter((r) => r.status === "Pending").length}
                </p>
                <Badge variant="secondary" className="mt-1">
                  Awaiting review
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* REQUESTS TABLE */}
      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle>Requests Inventory</CardTitle>
          <CardDescription>Manage employee asset requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.employee}</TableCell>
                  <TableCell>{req.asset}</TableCell>
                  <TableCell>{req.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        req.status === "Approved"
                          ? "default"
                          : req.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{req.requestDate}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {req.status === "Pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(req.id)}>
                              <Check className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(req.id)}>
                              <X className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleEdit(req.id, { asset: "Updated Asset" })}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(req.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeAssetRequests;
