import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, TrendingUp } from "lucide-react";

export default function GmAttendanceLeave() {
  const leaveRequests = [
    {
      id: 1,
      employee: "Sarah Johnson",
      type: "Vacation",
      startDate: "2024-02-20",
      endDate: "2024-02-23",
      days: 4,
      status: "Pending",
      reason: "Family vacation"
    },
    {
      id: 2,
      employee: "Michael Chen",
      type: "Sick Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-16",
      days: 2,
      status: "Approved",
      reason: "Medical appointment"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance & Leave</h1>
          <p className="text-muted-foreground mt-1">
            Monitor attendance and manage leave requests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">89%</div>
            </div>
            <p className="text-xs text-muted-foreground">Today's Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-success" />
              <div className="text-2xl font-bold">7.5h</div>
            </div>
            <p className="text-xs text-muted-foreground">Avg Work Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold">12</div>
            </div>
            <p className="text-xs text-muted-foreground">Pending Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">95%</div>
            </div>
            <p className="text-xs text-muted-foreground">Monthly Average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Pending leave requests requiring approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h3 className="font-semibold">{request.employee}</h3>
                  <p className="text-sm text-muted-foreground">{request.type} - {request.days} days</p>
                  <p className="text-xs text-muted-foreground">{request.startDate} to {request.endDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={request.status === "Approved" ? "default" : "secondary"}>
                    {request.status}
                  </Badge>
                  {request.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Deny</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}