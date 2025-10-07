import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Calendar, Users, Clock } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern design",
      status: "In Progress",
      priority: "High",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-03-30",
      team: ["Sarah J.", "Mike C.", "Alex R."],
      budget: 45000,
      department: "Marketing"
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native mobile app for iOS and Android platforms",
      status: "In Progress", 
      priority: "High",
      progress: 45,
      startDate: "2024-02-01",
      endDate: "2024-06-15",
      team: ["David L.", "Emma W.", "John D.", "Lisa K."],
      budget: 120000,
      department: "Engineering"
    },
    {
      id: 3,
      name: "HR System Integration",
      description: "Integration of new HRMS with existing systems",
      status: "Planning",
      priority: "Medium",
      progress: 15,
      startDate: "2024-03-01",
      endDate: "2024-05-20",
      team: ["Emily D.", "Robert M."],
      budget: 35000,
      department: "HR"
    },
    {
      id: 4,
      name: "Security Audit",
      description: "Comprehensive security assessment and improvements",
      status: "Completed",
      priority: "Critical",
      progress: 100,
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      team: ["James W.", "Maria G.", "Chris B."],
      budget: 28000,
      department: "IT"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Planning": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all organizational projects
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$428K</div>
            <p className="text-xs text-muted-foreground">Total Budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant={getPriorityColor(project.priority)} className="text-xs">
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{project.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{project.endDate}</span>
                </div>
              </div>

              {/* Team and Budget */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg" alt={member} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{project.team.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    ${project.budget.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.department}
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full opacity-0 group-hover:opacity-100 transition-opacity">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}