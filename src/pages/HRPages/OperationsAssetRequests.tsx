



// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   Layers,
//   CheckCircle,
//   AlertTriangle,
//   Plus,
//   Edit,
//   Trash2,
//   Check,
//   X,
//   MoreHorizontal,
// } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // ======================== MOCK DATA ===============================
// const initialRequests = [
//   {
//     id: 1,
//     department: "Operations",
//     asset: "Forklift",
//     category: "Machinery",
//     status: "Pending",
//     requestDate: "2025-08-03",
//   },
//   {
//     id: 2,
//     department: "Logistics",
//     asset: "Warehouse Shelving",
//     category: "Furniture",
//     status: "Approved",
//     requestDate: "2025-08-07",
//   },
//   {
//     id: 3,
//     department: "Operations",
//     asset: "Safety Helmets",
//     category: "Safety Equipment",
//     status: "Rejected",
//     requestDate: "2025-08-11",
//   },
// ];

// const API_URL = "http://localhost:3000/operations-requests"; // replace with your API

// const OperationsAssetRequests = () => {
//   const [requests, setRequests] = useState(initialRequests);

//   // ✅ Fetch requests from API
//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((res) => setRequests(res.data))
//       .catch((err) => console.error("Error fetching requests:", err));
//   }, []);

//   // ✅ Add new request
//   const handleAdd = () => {
//     const newRequest = {
//       department: "Operations",
//       asset: "New Operation Asset",
//       category: "Miscellaneous",
//       status: "Pending",
//       requestDate: new Date().toISOString().split("T")[0],
//     };

//     axios
//       .post(API_URL, newRequest)
//       .then((res) => setRequests([...requests, res.data]))
//       .catch((err) => console.error("Error adding request:", err));
//   };

//   // ✅ Approve request
//   const handleApprove = (id: number) => {
//     axios
//       .patch(`${API_URL}/${id}`, { status: "Approved" })
//       .then((res) =>
//         setRequests(
//           requests.map((req) =>
//             req.id === id ? { ...req, status: "Approved" } : req
//           )
//         )
//       )
//       .catch((err) => console.error("Error approving request:", err));
//   };

//   // ✅ Reject request
//   const handleReject = (id: number) => {
//     axios
//       .patch(`${API_URL}/${id}`, { status: "Rejected" })
//       .then((res) =>
//         setRequests(
//           requests.map((req) =>
//             req.id === id ? { ...req, status: "Rejected" } : req
//           )
//         )
//       )
//       .catch((err) => console.error("Error rejecting request:", err));
//   };

//   // ✅ Delete request
//   const handleDelete = (id: number) => {
//     axios
//       .delete(`${API_URL}/${id}`)
//       .then(() => setRequests(requests.filter((req) => req.id !== id)))
//       .catch((err) => console.error("Error deleting request:", err));
//   };

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">
//             Operations Asset Requests
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Manage and track asset requests submitted by the operations team
//           </p>
//         </div>
//         <Button onClick={handleAdd} className="bg-[#670D2F]">
//           <Plus className="h-4 w-4 mr-2" />
//           New Request
//         </Button>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="shadow-custom-md">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 bg-gradient-primary rounded-2xl">
//                 <Layers className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Total Requests
//                 </p>
//                 <p className="text-2xl font-bold text-foreground">
//                   {requests.length}
//                 </p>
//                 <Badge variant="secondary" className="mt-1">
//                   Submitted by operations
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-custom-md">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 bg-gradient-success rounded-2xl">
//                 <CheckCircle className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Approved
//                 </p>
//                 <p className="text-2xl font-bold text-foreground">
//                   {requests.filter((r) => r.status === "Approved").length}
//                 </p>
//                 <Badge variant="secondary" className="mt-1">
//                   Granted for operations
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-custom-md">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 bg-gradient-warning rounded-2xl">
//                 <AlertTriangle className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Pending
//                 </p>
//                 <p className="text-2xl font-bold text-foreground">
//                   {requests.filter((r) => r.status === "Pending").length}
//                 </p>
//                 <Badge variant="secondary" className="mt-1">
//                   Awaiting review
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* REQUESTS TABLE */}
//       <Card className="shadow-custom-md">
//         <CardHeader>
//           <CardTitle>Operations Requests Inventory</CardTitle>
//           <CardDescription>Manage operations asset requests</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID</TableHead>
//                 <TableHead>Department</TableHead>
//                 <TableHead>Asset</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Request Date</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {requests.map((req) => (
//                 <TableRow key={req.id}>
//                   <TableCell>{req.id}</TableCell>
//                   <TableCell>{req.department}</TableCell>
//                   <TableCell>{req.asset}</TableCell>
//                   <TableCell>{req.category}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         req.status === "Approved"
//                           ? "default"
//                           : req.status === "Rejected"
//                           ? "destructive"
//                           : "secondary"
//                       }
//                     >
//                       {req.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{req.requestDate}</TableCell>
//                   <TableCell className="text-center">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-5 w-5" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent>
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         {req.status === "Pending" && (
//                           <>
//                             <DropdownMenuItem
//                               onClick={() => handleApprove(req.id)}
//                             >
//                               <Check className="mr-2 h-4 w-4 text-green-600" />
//                               Approve
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleReject(req.id)}
//                             >
//                               <X className="mr-2 h-4 w-4 text-red-600" />
//                               Reject
//                             </DropdownMenuItem>
//                           </>
//                         )}
//                         <DropdownMenuItem
//                           onClick={() => console.log("Edit", req.id)}
//                         >
//                           <Edit className="mr-2 h-4 w-4" />
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => handleDelete(req.id)}
//                           className="text-red-600"
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OperationsAssetRequests;


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
  department: string;
  asset: string;
  category: string;
  status: string;
  requestDate: string;
}

const OperationsAssetRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const token = localStorage.getItem("token");

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ✅ Fetch requests
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/operations-requests",
        authConfig
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  // ✅ Add request
  const handleAdd = async () => {
    const newRequest = {
      department: "Operations",
      asset: "New Operation Asset",
      category: "Miscellaneous",
      status: "Pending",
      requestDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/operations-requests",
        newRequest,
        authConfig
      );
      setRequests((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding request", err);
    }
  };

  // ✅ Approve
  const handleApprove = async (id: number) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/operations-requests/${id}`,
        { status: "Approved" },
        authConfig
      );
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, ...res.data } : req))
      );
    } catch (err) {
      console.error("Error approving request", err);
    }
  };

  // ✅ Reject
  const handleReject = async (id: number) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/operations-requests/${id}`,
        { status: "Rejected" },
        authConfig
      );
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, ...res.data } : req))
      );
    } catch (err) {
      console.error("Error rejecting request", err);
    }
  };

  // ✅ Edit (example: update asset)
  const handleEdit = async (id: number, updatedData: Partial<Request>) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/operations-requests/${id}`,
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

  // ✅ Delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:3000/operations-requests/${id}`,
        authConfig
      );
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
            Operations Asset Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track asset requests submitted by the operations team
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
                  Submitted by operations
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
                  Granted for operations
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
          <CardTitle>Operations Requests Inventory</CardTitle>
          <CardDescription>Manage operations asset requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Department</TableHead>
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
                  <TableCell>{req.department}</TableCell>
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
                            <DropdownMenuItem
                              onClick={() => handleApprove(req.id)}
                            >
                              <Check className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleReject(req.id)}
                            >
                              <X className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            handleEdit(req.id, { asset: "Updated Asset" })
                          }
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

export default OperationsAssetRequests;
