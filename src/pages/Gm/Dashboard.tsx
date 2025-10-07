import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  FolderKanban, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  AlertCircle,
  Target
} from "lucide-react";

export default function GmDashboard() {
  const kpiCards = [
    {
      title: "Total Employees",
      value: "156",
      change: "+12%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Ongoing Projects",
      value: "23",
      change: "+3 new",
      icon: FolderKanban,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Today's Attendance",
      value: "89%",
      change: "+5%",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Task Completion",
      value: "76%",
      change: "+8%",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  const recentActivities = [
    {
      title: "New project 'Mobile App' started",
      time: "2 hours ago",
      type: "project",
      icon: FolderKanban
    },
    {
      title: "sandeep submitted leave request",
      time: "4 hours ago",
      type: "leave",
      icon: Calendar
    },
    {
      title: "Marketing team completed Q4 presentation",
      time: "6 hours ago",
      type: "task",
      icon: CheckCircle
    },
    {
      title: "New employee onboarding - vijay",
      time: "1 day ago",
      type: "employee",
      icon: Users
    }
  ];

  const projectProgress = [
    { name: "Website Redesign", progress: 85, status: "On Track" },
    { name: "Mobile App Development", progress: 45, status: "In Progress" },
    { name: "Data Migration", progress: 95, status: "Almost Done" },
    { name: "Security Audit", progress: 30, status: "Started" }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Sharth! Here's what's happening at your office today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success font-medium">{kpi.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              Project Progress
            </CardTitle>
            <CardDescription>
              Track the progress of ongoing projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{project.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={project.progress > 80 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">8</div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Requires your attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">92%</div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Average efficiency score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">67%</div>
              <Target className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Of allocated budget used
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}