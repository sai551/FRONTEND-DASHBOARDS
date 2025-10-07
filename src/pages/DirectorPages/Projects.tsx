import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FolderKanban, 
  Plus, 
  Calendar, 
  Users, 
  Target,
  TrendingUp
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Mobile App Redesign",
    description: "Complete redesign of the company mobile application with modern UI/UX",
    status: "In Progress",
    priority: "High",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    budget: "$150,000",
    spent: "$112,500",
    team: [
      { name: "Alice Cooper", avatar: "/placeholder.svg" },
      { name: "Bob Smith", avatar: "/placeholder.svg" },
      { name: "Carol Johnson", avatar: "/placeholder.svg" }
    ]
  },
  {
    id: 2,
    name: "Database Migration",
    description: "Migrate legacy database to modern cloud infrastructure",
    status: "Completed",
    priority: "Critical",
    progress: 100,
    startDate: "2023-12-01",
    endDate: "2024-01-30",
    budget: "$200,000",
    spent: "$195,000",
    team: [
      { name: "David Wilson", avatar: "/placeholder.svg" },
      { name: "Eva Martinez", avatar: "/placeholder.svg" }
    ]
  },
  {
    id: 3,
    name: "Marketing Campaign Q1",
    description: "Launch comprehensive marketing campaign for Q1 2024",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    startDate: "2024-02-01",
    endDate: "2024-03-31",
    budget: "$80,000",
    spent: "$15,000",
    team: [
      { name: "Frank Chen", avatar: "/placeholder.svg" },
      { name: "Alice Cooper", avatar: "/placeholder.svg" }
    ]
  },
  {
    id: 4,
    name: "Security Audit",
    description: "Comprehensive security audit and penetration testing",
    status: "In Progress",
    priority: "High",
    progress: 60,
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    budget: "$75,000",
    spent: "$45,000",
    team: [
      { name: "Bob Smith", avatar: "/placeholder.svg" }
    ]
  },
  {
    id: 5,
    name: "Employee Training Portal",
    description: "Development of new employee training and onboarding portal",
    status: "On Hold",
    priority: "Low",
    progress: 15,
    startDate: "2024-01-10",
    endDate: "2024-04-15",
    budget: "$120,000",
    spent: "$18,000",
    team: [
      { name: "Carol Johnson", avatar: "/placeholder.svg" },
      { name: "David Wilson", avatar: "/placeholder.svg" }
    ]
  },
  {
    id: 6,
    name: "API Gateway Implementation",
    description: "Implement centralized API gateway for microservices architecture",
    status: "In Progress",
    priority: "High",
    progress: 40,
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    budget: "$180,000",
    spent: "$72,000",
    team: [
      { name: "Eva Martinez", avatar: "/placeholder.svg" },
      { name: "Frank Chen", avatar: "/placeholder.svg" }
    ]
  }
];

const Projects = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-primary text-primary-foreground";
      case "Planning":
        return "bg-warning text-warning-foreground";
      case "On Hold":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-destructive text-destructive-foreground";
      case "High":
        return "bg-warning text-warning-foreground";
      case "Medium":
        return "bg-primary text-primary-foreground";
      case "Low":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all company projects
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-dashboard-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <FolderKanban className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-dashboard-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.status === "In Progress").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-dashboard-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.status === "Completed").length}
                </p>
              </div>
              <Target className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-dashboard-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">
                  ${projects.reduce((acc, p) => acc + parseInt(p.budget.replace(/[$,]/g, '')), 0).toLocaleString()}
                </p>
              </div>
              <Target className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="shadow-dashboard-md hover:shadow-dashboard-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Dates and Budget */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Timeline</span>
                  </div>
                  <p className="font-medium">
                    {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Budget</span>
                  <p className="font-medium">{project.spent} / {project.budget}</p>
                </div>
              </div>

              {/* Team */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Team ({project.team.length})</span>
                </div>
                <div className="flex -space-x-2">
                  {project.team.map((member, index) => (
                    <Avatar key={index} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;