import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projectsData = [
  {
    name: "Mobile App Redesign",
    teamLead: "Sarah Johnson",
    teamLeadAvatar: "",
    deadline: "Dec 30, 2024",
    progress: 85,
    status: "On Track",
    priority: "High"
  },
  {
    name: "CRM Integration",
    teamLead: "Mike Chen", 
    teamLeadAvatar: "",
    deadline: "Dec 15, 2024",
    progress: 60,
    status: "At Risk",
    priority: "High"
  },
  {
    name: "Website Optimization",
    teamLead: "Emily Davis",
    teamLeadAvatar: "",
    deadline: "Jan 15, 2025",
    progress: 40,
    status: "On Track",
    priority: "Medium"
  },
  {
    name: "Security Audit",
    teamLead: "James Wilson",
    teamLeadAvatar: "",
    deadline: "Dec 20, 2024", 
    progress: 75,
    status: "On Track",
    priority: "High"
  },
  {
    name: "Marketing Campaign",
    teamLead: "Lisa Brown",
    teamLeadAvatar: "",
    deadline: "Jan 5, 2025",
    progress: 30,
    status: "On Track",
    priority: "Low"
  },
];

const employeePerformance = [
  {
    name: "Sarah Johnson",
    avatar: "",
    department: "Marketing",
    kpiScore: 94,
    status: "Excellent",
    projects: 3,
    completionRate: 96
  },
  {
    name: "Mike Chen",
    avatar: "",
    department: "Engineering", 
    kpiScore: 91,
    status: "Excellent",
    projects: 5,
    completionRate: 88
  },
  {
    name: "Emily Davis",
    avatar: "",
    department: "Sales",
    kpiScore: 88,
    status: "Good",
    projects: 2,
    completionRate: 92
  },
  {
    name: "James Wilson",
    avatar: "",
    department: "Security",
    kpiScore: 86,
    status: "Good", 
    projects: 4,
    completionRate: 85
  },
  {
    name: "Lisa Brown",
    avatar: "",
    department: "Marketing",
    kpiScore: 83,
    status: "Good",
    projects: 2,
    completionRate: 90
  },
];

export function TablesSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
      {/* Project Status Table */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Project Status Overview</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectsData.map((project, index) => (
              <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-medium text-foreground">{project.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {project.teamLead.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{project.teamLead}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={project.priority === "High" ? "destructive" : project.priority === "Medium" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {project.priority}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>View Team</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <Badge 
                      variant={project.status === "On Track" ? "default" : "destructive"}
                      className={`text-xs ${project.status === "On Track" ? "bg-success text-success-foreground" : ""}`}
                    >
                      {project.status}
                    </Badge>
                    <span className="text-muted-foreground">Due: {project.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee Performance Table */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Top Employee Performance</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employeePerformance.map((employee, index) => (
              <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{employee.department}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={employee.status === "Excellent" ? "default" : "secondary"}
                    className={employee.status === "Excellent" ? "bg-success text-success-foreground" : ""}
                  >
                    {employee.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">KPI Score</p>
                    <p className="text-lg font-bold text-foreground">{employee.kpiScore}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projects</p>
                    <p className="text-lg font-bold text-foreground">{employee.projects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completion</p>
                    <p className="text-lg font-bold text-foreground">{employee.completionRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}