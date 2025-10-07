import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Plane,
  Heart,
  Briefcase
} from "lucide-react";

const attendanceStats = {
  present: 1156,
  absent: 45,
  late: 23,
  onLeave: 10
};

const recentLeaveRequests = [
  {
    id: 1,
    employee: "Alice Cooper",
    avatar: "/placeholder.svg",
    type: "Vacation",
    startDate: "2024-02-15",
    endDate: "2024-02-19",
    days: 5,
    status: "Pending",
    reason: "Family vacation"
  },
  {
    id: 2,
    employee: "Bob Smith", 
    avatar: "/placeholder.svg",
    type: "Sick Leave",
    startDate: "2024-02-12",
    endDate: "2024-02-14",
    days: 3,
    status: "Approved",
    reason: "Medical treatment"
  },
  {
    id: 3,
    employee: "Carol Johnson",
    avatar: "/placeholder.svg", 
    type: "Personal",
    startDate: "2024-02-20",
    endDate: "2024-02-20",
    days: 1,
    status: "Pending",
    reason: "Personal appointment"
  },
  {
    id: 4,
    employee: "David Wilson",
    avatar: "/placeholder.svg",
    type: "Vacation",
    startDate: "2024-02-25",
    endDate: "2024-03-01",
    days: 5,
    status: "Rejected",
    reason: "Conflicts with project deadline"
  }
];

const departmentAttendance = [
  { name: "Engineering", present: 425, total: 450, percentage: 94.4 },
  { name: "Sales", present: 308, total: 320, percentage: 96.3 },
  { name: "Marketing", present: 172, total: 180, percentage: 95.6 },
  { name: "Operations", present: 127, total: 134, percentage: 94.8 },
  { name: "Finance", present: 82, total: 85, percentage: 96.5 },
  { name: "HR", present: 62, total: 65, percentage: 95.4 }
];

const AttendanceLeave = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-success text-success-foreground";
      case "Pending":
        return "bg-warning text-warning-foreground";
      case "Rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getLeaveIcon = (type: string) => {
    switch (type) {
      case "Vacation":
        return <Plane className="h-4 w-4" />;
      case "Sick Leave":
        return <Heart className="h-4 w-4" />;
      case "Personal":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const totalEmployees = attendanceStats.present + attendanceStats.absent + attendanceStats.late + attendanceStats.onLeave;
  const attendanceRate = ((attendanceStats.present / totalEmployees) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance & Leave</h1>
        <p className="text-muted-foreground mt-2">
          Monitor employee attendance and manage leave requests
        </p>
      </div>

      {/* Today's Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{attendanceStats.present}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceRate}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{attendanceStats.absent}</div>
            <p className="text-xs text-muted-foreground">
              {((attendanceStats.absent / totalEmployees) * 100).toFixed(1)}% of workforce
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{attendanceStats.late}</div>
            <p className="text-xs text-muted-foreground">
              Late arrivals today
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Calendar className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">{attendanceStats.onLeave}</div>
            <p className="text-xs text-muted-foreground">
              Approved leave today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Requests */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-chart-1" />
              Recent Leave Requests
            </CardTitle>
            <CardDescription>Latest employee leave requests requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLeaveRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.avatar} alt={request.employee} />
                    <AvatarFallback>
                      {request.employee.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.employee}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getLeaveIcon(request.type)}
                        <span>{request.type}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()} ({request.days} days)
                    </p>
                    <p className="text-xs text-muted-foreground">{request.reason}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  {request.status === "Pending" && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-7 px-2">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 px-2">
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Department Attendance */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-chart-2" />
              Department Attendance
            </CardTitle>
            <CardDescription>Attendance rates by department today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentAttendance.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dept.present} / {dept.total} employees
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{dept.percentage}%</p>
                    <div className="flex items-center gap-1">
                      {dept.percentage >= 95 ? (
                        <CheckCircle className="h-3 w-3 text-success" />
                      ) : dept.percentage >= 90 ? (
                        <AlertCircle className="h-3 w-3 text-warning" />
                      ) : (
                        <XCircle className="h-3 w-3 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
                <Progress value={dept.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Leave Balance Summary */}
      <Card className="shadow-dashboard-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-chart-3" />
            Company Leave Statistics
          </CardTitle>
          <CardDescription>Overview of leave usage across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-chart-1">2,450</div>
              <p className="text-sm text-muted-foreground">Total Leave Days Used</p>
              <p className="text-xs text-muted-foreground">This year</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-chart-2">1,890</div>
              <p className="text-sm text-muted-foreground">Vacation Days</p>
              <p className="text-xs text-muted-foreground">77% of total</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-chart-3">340</div>
              <p className="text-sm text-muted-foreground">Sick Days</p>
              <p className="text-xs text-muted-foreground">14% of total</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-chart-4">220</div>
              <p className="text-sm text-muted-foreground">Personal Days</p>
              <p className="text-xs text-muted-foreground">9% of total</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceLeave;