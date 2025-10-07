import { useState, useEffect } from "react";
// import axios from "axios"; // ⬅️ Uncomment when backend is ready

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, AlertCircle, CheckCircle, XCircle, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Leave = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  // ✅ Fetch employee's leave requests (API placeholder)
  useEffect(() => {
    setLoading(true);

    // ⬇️ Enable this once backend API is ready
    /*
    axios.get("/api/my-leaves")
      .then((res) => setLeaveRequests(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    */

    // Mock Data until backend is ready
    setTimeout(() => {
      setLeaveRequests([
        {
          id: "1",
          employeeName: "John Doe",
          leaveType: "Sick",
          startDate: "2025-09-02",
          endDate: "2025-09-04",
          reason: "Fever and cold",
          status: "Pending",
        },
        {
          id: "2",
          employeeName: "John Doe",
          leaveType: "Annual",
          startDate: "2025-09-10",
          endDate: "2025-09-15",
          reason: "Family vacation",
          status: "Approved",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  // ✅ Status Helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      case "Pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // ✅ Handle new request submission
  const handleNewRequest = (formData: any) => {
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
    });

    // axios.post("/api/my-leaves", formData).then(() => fetch again);

    // Temporary: Add to mock list
    setLeaveRequests((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        employeeName: "John Doe", // ⚡ Replace with logged-in user
        ...formData,
        status: "Pending",
      },
    ]);
  };

  // ✅ Filter
  const filteredRequests = leaveRequests.filter((req) =>
    req.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">
            Submit and track your leave requests
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Leave Request</DialogTitle>
              <DialogDescription>
                Fill out the details to submit a leave request
              </DialogDescription>
            </DialogHeader>
            <LeaveRequestForm
              onCancel={() => setIsDialogOpen(false)}
              onSubmit={(data) => {
                handleNewRequest(data);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="shadow-custom-md">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle>My Leave Requests ({filteredRequests.length})</CardTitle>
          <CardDescription>
            View the status of your submitted leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={5}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  : filteredRequests.map((request) => {
                      const startDate = new Date(request.startDate);
                      const endDate = new Date(request.endDate);
                      const duration =
                        Math.ceil(
                          (endDate.getTime() - startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) + 1;

                      return (
                        <TableRow key={request.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Badge variant="outline">{request.leaveType}</Badge>
                          </TableCell>
                          <TableCell>
                            {startDate.toLocaleDateString()} -{" "}
                            {endDate.toLocaleDateString()}
                          </TableCell>
                          <TableCell>{duration} day(s)</TableCell>
                          <TableCell>
                            <p
                              className="text-sm max-w-xs truncate"
                              title={request.reason}
                            >
                              {request.reason}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(request.status)}>
                              <span className="flex items-center space-x-1">
                                {getStatusIcon(request.status)}
                                <span>{request.status}</span>
                              </span>
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ✅ Form Component
const LeaveRequestForm = ({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Leave Type</label>
        <Select value={leaveType} onValueChange={setLeaveType}>
          <SelectTrigger>
            <SelectValue placeholder="Select leave type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Annual">Annual Leave</SelectItem>
            <SelectItem value="Sick">Sick Leave</SelectItem>
            <SelectItem value="Personal">Personal Leave</SelectItem>
            <SelectItem value="Emergency">Emergency Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Reason</label>
        <Textarea
          placeholder="Enter reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={() =>
            onSubmit({
              leaveType,
              startDate,
              endDate,
              reason,
            })
          }
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Leave;
