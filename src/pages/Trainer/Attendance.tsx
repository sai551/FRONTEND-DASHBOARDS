import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Search, 
  UserCheck, 
  UserX, 
  Download,
  Clock,
  Users
} from "lucide-react";

export default function TrainerAttendanceTracking() {
  const attendanceData = [
    {
      sessionId: 1,
      sessionTitle: "React Fundamentals",
      date: "2024-01-15",
      trainees: [
        { id: 1, name: "Sandeep K", status: "Present", timeIn: "09:00 AM" },
        { id: 2, name: "Vijay B", status: "Present", timeIn: "09:05 AM" },
        { id: 3, name: "Bhuvan P", status: "Absent", timeIn: null }
      ]
    },
    {
      sessionId: 2,
      sessionTitle: "JavaScript Advanced",
      date: "2024-01-15",
      trainees: [
        { id: 4, name: "Sunil B", status: "Present", timeIn: "11:30 AM" },
        { id: 5, name: "Hari K", status: "Late", timeIn: "11:45 AM" },
        { id: 6, name: "Shravan N", status: "Present", timeIn: "11:30 AM" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-600">Mark and track attendance for training sessions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <UserCheck className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">3</div>
            <p className="text-xs text-muted-foreground">All sessions tracked</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">22</div>
            <p className="text-xs text-muted-foreground">Out of 26 trainees</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">4</div>
            <p className="text-xs text-muted-foreground">15% absence rate</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">2</div>
            <p className="text-xs text-muted-foreground">Within 15 minutes</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search sessions or trainees..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Select Date
              </Button>
              <Button variant="outline">Filter by Status</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Sessions */}
      <div className="space-y-6">
        {attendanceData.map((session) => (
          <Card key={session.sessionId}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{session.sessionTitle}</CardTitle>
                  <CardDescription>{session.date}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    {session.trainees.length} trainees
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {session.trainees.map((trainee) => (
                  <div key={trainee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Checkbox 
                        checked={trainee.status === "Present"}
                        className="border-green-500 data-[state=checked]:bg-green-600"
                      />
                      <div>
                        <p className="font-medium">{trainee.name}</p>
                        {trainee.timeIn && (
                          <p className="text-sm text-gray-600">Time in: {trainee.timeIn}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        trainee.status === "Present" ? "default" :
                        trainee.status === "Late" ? "destructive" :
                        "secondary"
                      }>
                        {trainee.status}
                      </Badge>
                      {trainee.status === "Present" && (
                        <UserCheck className="h-4 w-4 text-green-600" />
                      )}
                      {trainee.status === "Absent" && (
                        <UserX className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  Edit Attendance
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
          <CardDescription>Track attendance patterns over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">This Week</h4>
              <div className="space-y-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-sm">{day}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${85 + index * 2}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{85 + index * 2}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Frequently Absent</h4>
              <div className="space-y-2">
                {[
                  { name: "Vijay B", absences: 3 },
                  { name: "Sandeep K", absences: 2 },
                  { name: "Bhuvan P", absences: 2 }
                ].map((trainee, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <span className="text-sm">{trainee.name}</span>
                    <Badge variant="destructive">{trainee.absences} absences</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}