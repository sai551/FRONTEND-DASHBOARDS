import { useState } from "react";
import { Search, Filter, Calendar, Clock, Check, X, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function TeamLeaveRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const leaveRequests = [
    {
      id: "LR001",
      employee: "Sarah Johnson",
      type: "Annual Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      days: 5,
      reason: "Family vacation to Hawaii. Planning this trip for months.",
      status: "Pending",
      appliedDate: "2024-01-10",
      emergencyContact: "+1 (555) 999-8888",
      handoverNotes: "Mike Chen will handle my ongoing projects during my absence."
    },
    {
      id: "LR002", 
      employee: "Mike Chen",
      type: "Sick Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-16",
      days: 2,
      reason: "Flu symptoms, doctor recommended rest.",
      status: "Approved",
      appliedDate: "2024-01-15",
      emergencyContact: "+1 (555) 777-6666",
      handoverNotes: "Sarah will cover urgent tasks."
    },
    {
      id: "LR003",
      employee: "Lisa Wilson",
      type: "Personal Leave",
      startDate: "2024-01-18",
      endDate: "2024-01-18",
      days: 1,
      reason: "Medical appointment that couldn't be scheduled outside work hours.",
      status: "Pending",
      appliedDate: "2024-01-12",
      emergencyContact: "+1 (555) 444-3333",
      handoverNotes: "Half-day leave, will complete tasks in the morning."
    },
    {
      id: "LR004",
      employee: "John Smith",
      type: "Annual Leave",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      days: 5,
      reason: "Wedding anniversary celebration with spouse.",
      status: "Rejected",
      appliedDate: "2024-01-08",
      emergencyContact: "+1 (555) 222-1111",
      handoverNotes: "Emily will handle client communications.",
      rejectionReason: "Critical project deadline during requested dates."
    },
    {
      id: "LR005",
      employee: "Emily Davis",
      type: "Maternity Leave",
      startDate: "2024-03-01",
      endDate: "2024-06-01",
      days: 90,
      reason: "Maternity leave for newborn care.",
      status: "Approved",
      appliedDate: "2024-01-05",
      emergencyContact: "+1 (555) 111-0000",
      handoverNotes: "Full handover documentation provided. David will take over QA responsibilities."
    },
    {
      id: "LR006",
      employee: "David Brown",
      type: "Emergency Leave",
      startDate: "2024-01-14",
      endDate: "2024-01-16",
      days: 3,
      reason: "Family emergency - need to travel immediately.",
      status: "Approved",
      appliedDate: "2024-01-14",
      emergencyContact: "+1 (555) 000-9999",
      handoverNotes: "John will handle urgent DevOps tasks."
    }
  ];

  const filteredRequests = leaveRequests.filter(request =>
    request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "Pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Annual Leave":
        return "text-primary";
      case "Sick Leave":
        return "text-destructive";
      case "Personal Leave":
        return "text-warning";
      case "Maternity Leave":
        return "text-success";
      case "Emergency Leave":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const handleApprove = (id: string) => {
    // Handle approval logic
    console.log("Approving request:", id);
  };

  const handleReject = (id: string) => {
    // Handle rejection logic
    console.log("Rejecting request:", id);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
        <p className="text-muted-foreground">Review and manage team leave applications</p>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search leave requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 lg:w-80">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-warning">
                {leaveRequests.filter(r => r.status === "Pending").length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-success">
                {leaveRequests.filter(r => r.status === "Approved").length}
              </div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-destructive">
                {leaveRequests.filter(r => r.status === "Rejected").length}
              </div>
              <div className="text-xs text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {request.employee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.employee}</div>
                        <div className="text-sm text-muted-foreground">{request.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {request.days} day{request.days > 1 ? 's' : ''}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {new Date(request.appliedDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(request.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Leave Request Details - {selectedRequest?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Employee Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><strong>Name:</strong> {selectedRequest.employee}</p>
                                    <p><strong>Emergency Contact:</strong> {selectedRequest.emergencyContact}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Leave Details</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><strong>Type:</strong> {selectedRequest.type}</p>
                                    <p><strong>Duration:</strong> {selectedRequest.days} days</p>
                                    <p><strong>Dates:</strong> {new Date(selectedRequest.startDate).toLocaleDateString()} - {new Date(selectedRequest.endDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Reason</h4>
                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                  {selectedRequest.reason}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Handover Notes</h4>
                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                  {selectedRequest.handoverNotes}
                                </p>
                              </div>

                              {selectedRequest.status === "Rejected" && selectedRequest.rejectionReason && (
                                <div>
                                  <h4 className="font-medium mb-2 text-destructive">Rejection Reason</h4>
                                  <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                                    {selectedRequest.rejectionReason}
                                  </p>
                                </div>
                              )}

                              {selectedRequest.status === "Pending" && (
                                <div className="flex gap-2 pt-4 border-t">
                                  <Button 
                                    className="flex-1 bg-success hover:bg-success/90" 
                                    onClick={() => handleApprove(selectedRequest.id)}
                                  >
                                    <Check className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    className="flex-1"
                                    onClick={() => handleReject(selectedRequest.id)}
                                  >
                                    <X className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {request.status === "Pending" && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-success hover:bg-success/90"
                            onClick={() => handleApprove(request.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(request.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
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