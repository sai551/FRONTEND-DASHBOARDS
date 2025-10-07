import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, Clock, Users, CheckCircle } from "lucide-react";

const topDepartments = [
  { name: "Engineering", performance: 94, employees: 89, projects: 12 },
  { name: "Sales", performance: 91, employees: 45, projects: 8 },
  { name: "Marketing", performance: 88, employees: 32, projects: 6 },
  { name: "Product", performance: 86, employees: 28, projects: 5 },
  { name: "Design", performance: 84, employees: 18, projects: 4 },
];

const upcomingEvents = [
  { 
    title: "Board Meeting", 
    date: "Tomorrow, 10:00 AM", 
    type: "meeting",
    attendees: 8 
  },
  { 
    title: "Q4 Planning Session", 
    date: "Dec 15, 2:00 PM", 
    type: "planning",
    attendees: 12 
  },
  { 
    title: "Product Launch", 
    date: "Dec 20, 9:00 AM", 
    type: "launch",
    attendees: 25 
  },
  { 
    title: "Team Building Event", 
    date: "Dec 22, 3:00 PM", 
    type: "event",
    attendees: 50 
  },
];

const currentLeaves = [
  { name: "Sarah Johnson", department: "Marketing", duration: "3 days", reason: "Vacation" },
  { name: "Mike Chen", department: "Engineering", duration: "1 day", reason: "Sick Leave" },
  { name: "Emily Davis", department: "Sales", duration: "2 days", reason: "Personal" },
  { name: "James Wilson", department: "HR", duration: "5 days", reason: "Vacation" },
];

const recentProjects = [
  { 
    name: "Mobile App v2.0", 
    status: "Completed", 
    date: "Dec 1, 2024",
    team: "Engineering",
    impact: "High"
  },
  { 
    name: "Brand Redesign", 
    status: "Completed", 
    date: "Nov 28, 2024",
    team: "Design",
    impact: "Medium"
  },
  { 
    name: "CRM Integration", 
    status: "In Progress", 
    date: "Expected Dec 15",
    team: "Engineering",
    impact: "High"
  },
  { 
    name: "Social Media Campaign", 
    status: "Completed", 
    date: "Nov 25, 2024",
    team: "Marketing",
    impact: "Medium"
  },
];

export function SummaryWidgets() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
      {/* Top Performing Departments */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Top Performing Departments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDepartments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">{dept.employees} employees • {dept.projects} projects</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  {dept.performance}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Upcoming Key Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {event.date}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {event.attendees} attendees
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Leaves */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Current Leaves Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentLeaves.map((leave, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {leave.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{leave.name}</p>
                    <p className="text-sm text-muted-foreground">{leave.department} • {leave.reason}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {leave.duration}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Project Launches */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Recent Project Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    project.status === "Completed" ? "bg-success" : "bg-warning"
                  }`}></div>
                  <div>
                    <p className="font-medium text-foreground">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.team} • {project.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={project.status === "Completed" ? "default" : "secondary"}
                    className={project.status === "Completed" ? "bg-success text-success-foreground" : ""}
                  >
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}