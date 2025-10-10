import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FolderKanban,
  Users,
  CheckCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  Plus,
  Calendar,
  MessageSquare,
} from "lucide-react";

export default function ProjectManagerDashboard() {
  const navigate = useNavigate();

  // Key Metrics
  const keyMetrics = [
    {
      title: "Active Projects",
      value: "12",
      description: "8 on track, 3 at risk, 1 delayed",
      icon: FolderKanban,
      trend: "+2",
      trendDirection: "up",
    },
    {
      title: "Team Members",
      value: "45",
      description: "15 developers, 12 designers, 8 QA, 10 others",
      icon: Users,
      trend: "+5",
      trendDirection: "up",
    },
    {
      title: "Tasks Completion",
      value: "78%",
      description: "892 completed, 245 pending",
      icon: CheckCircle,
      trend: "+12%",
      trendDirection: "up",
    },
    {
      title: "Budget Usage",
      value: "$485K",
      description: "67% of $720K allocated",
      icon: DollarSign,
      trend: "-8%",
      trendDirection: "down",
    },
  ];

  // Recent Projects
  const recentProjects = [
    {
      name: "E-commerce Platform",
      client: "TechCorp Inc.",
      progress: 85,
      status: "On Track",
      deadline: "2024-03-15",
      team: 8,
      budget: "$125K",
    },
    {
      name: "Mobile Banking App",
      client: "FinanceFirst",
      progress: 60,
      status: "At Risk",
      deadline: "2024-04-20",
      team: 12,
      budget: "$180K",
    },
    {
      name: "Healthcare Portal",
      client: "MedLife Solutions",
      progress: 95,
      status: "On Track",
      deadline: "2024-02-28",
      team: 6,
      budget: "$95K",
    },
    {
      name: "Learning Management System",
      client: "EduTech Pro",
      progress: 30,
      status: "Delayed",
      deadline: "2024-05-10",
      team: 10,
      budget: "$150K",
    },
  ];

  // Team Performance
  const teamPerformance = [
    { name: "Alex Johnson", role: "Senior Developer", tasksCompleted: 28, productivity: 95 },
    { name: "Sarah Chen", role: "UI/UX Designer", tasksCompleted: 22, productivity: 90 },
    { name: "Mike Rodriguez", role: "QA Engineer", tasksCompleted: 35, productivity: 88 },
    { name: "Emily Davis", role: "Frontend Developer", tasksCompleted: 19, productivity: 85 },
  ];

  // Status Color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800";
      case "At Risk":
        return "bg-yellow-100 text-yellow-800";
      case "Delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage all your projects, teams, and resources
          </p>
        </div>
        <div className="flex gap-2">
          {/* Navigate to New Project page */}
          <Button onClick={() => navigate("/projectmanager/projects/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="flex items-center mt-2">
                {metric.trendDirection === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={`text-xs ${
                    metric.trendDirection === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.trend} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects & Team Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Projects */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Current project status and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{project.name}</h4>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Due: {project.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.team} members
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {project.budget}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium mb-1">{project.progress}%</div>
                    <Progress value={project.progress} className="w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Team members with highest productivity this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{member.tasksCompleted} tasks</div>
                    <div className="text-xs text-muted-foreground">{member.productivity}% efficiency</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for project management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={() => navigate("/projectmanager/projects/newproject")}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs">Create Project</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:scale-105 transition-transform">
              <Users className="h-5 w-5" />
              <span className="text-xs">Assign Tasks</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:scale-105 transition-transform">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Schedule Meeting</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:scale-105 transition-transform">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Team Chat</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:scale-105 transition-transform">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-xs">Report Issue</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:scale-105 transition-transform">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
