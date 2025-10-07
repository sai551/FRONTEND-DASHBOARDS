import { Calendar, Users, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TeamProjects() {
  const projects = [
    {
      id: "P001",
      name: "Q4 Initiative",
      description: "Strategic planning and execution for Q4 business objectives",
      status: "In Progress",
      progress: 65,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      teamMembers: ["Sarah Johnson", "Mike Chen", "Lisa Wilson"],
      tasksTotal: 24,
      tasksCompleted: 16,
      priority: "High",
      budget: "$50,000",
      manager: "John Doe"
    },
    {
      id: "P002", 
      name: "Client Portal",
      description: "Development of new client onboarding and management portal",
      status: "In Progress",
      progress: 80,
      startDate: "2023-11-15",
      endDate: "2024-02-15",
      teamMembers: ["Mike Chen", "Emily Davis", "David Brown"],
      tasksTotal: 32,
      tasksCompleted: 26,
      priority: "High",
      budget: "$75,000",
      manager: "John Doe"
    },
    {
      id: "P003",
      name: "HR Management System",
      description: "Internal HR management and employee tracking system",
      status: "Planning", 
      progress: 15,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      teamMembers: ["Lisa Wilson", "John Smith"],
      tasksTotal: 18,
      tasksCompleted: 3,
      priority: "Medium",
      budget: "$30,000",
      manager: "John Doe"
    },
    {
      id: "P004",
      name: "Mobile App Redesign",
      description: "Complete redesign and optimization of the mobile application",
      status: "Completed",
      progress: 100,
      startDate: "2023-09-01", 
      endDate: "2023-12-31",
      teamMembers: ["Lisa Wilson", "Sarah Johnson", "Emily Davis"],
      tasksTotal: 45,
      tasksCompleted: 45,
      priority: "Medium",
      budget: "$40,000",
      manager: "John Doe"
    },
    {
      id: "P005",
      name: "Security Audit",
      description: "Comprehensive security audit and vulnerability assessment",
      status: "In Progress",
      progress: 40,
      startDate: "2024-01-10",
      endDate: "2024-02-28",
      teamMembers: ["David Brown", "John Smith"],
      tasksTotal: 12,
      tasksCompleted: 5,
      priority: "High",
      budget: "$25,000",
      manager: "John Doe"
    },
    {
      id: "P006",
      name: "Documentation Update",
      description: "Update and standardize all technical documentation",
      status: "Planning",
      progress: 5,
      startDate: "2024-02-15",
      endDate: "2024-04-15",
      teamMembers: ["Mike Chen", "Sarah Johnson"],
      tasksTotal: 8,
      tasksCompleted: 0,
      priority: "Low",
      budget: "$15,000",
      manager: "John Doe"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-primary text-primary-foreground">In Progress</Badge>;
      case "Planning":
        return <Badge className="bg-warning text-warning-foreground">Planning</Badge>;
      case "On Hold":
        return <Badge variant="secondary">On Hold</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const totalBudget = projects.reduce((sum, project) => {
    return sum + parseInt(project.budget.replace('$', '').replace(',', ''));
  }, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <p className="text-muted-foreground">Track and manage active projects</p>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {projects.filter(p => p.status === "In Progress").length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {projects.filter(p => p.status === "Completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              ${totalBudget.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.id}</p>
                </div>
                <div className="flex gap-2">
                  {getPriorityBadge(project.priority)}
                  {getStatusBadge(project.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{project.description}</p>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>Tasks: {project.tasksCompleted}/{project.tasksTotal}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>Budget: {project.budget}</span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users className="w-4 h-4" />
                  <span>Team Members ({project.teamMembers.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  {project.teamMembers.slice(0, 4).map((member, index) => (
                    <Avatar key={index} className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {member.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.teamMembers.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      +{project.teamMembers.length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* Days Remaining */}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Days remaining:</span>
                  <span className="font-medium">
                    {Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}