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

export default function Dashboard() {
  const kpiCards = [
    {
      title: "Monthly Revenue",
      value: "$487K",
      change: "+15.2%",
      icon: Target,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2 new",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Customer Satisfaction",
      value: "4.6/5",
      change: "+0.2",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Active Tasks",
      value: "28",
      change: "12 due today",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const recentActivities = [
    {
      title: "Major client deal closed - $45K revenue",
      time: "2 hours ago",
      type: "sales",
      icon: Target
    },
    {
      title: "Customer feedback received (5-star rating)",
      time: "4 hours ago",
      type: "feedback",
      icon: CheckCircle
    },
    {
      title: "Team training session completed",
      time: "6 hours ago",
      type: "training",
      icon: Users
    },
    {
      title: "Monthly financial report generated",
      time: "1 day ago",
      type: "finance",
      icon: TrendingUp
    }
  ];

  const projectProgress = [
    { name: "Q4 Sales Target", progress: 89, status: "On Track" },
    { name: "Customer Acquisition", progress: 78, status: "Ahead" },
    { name: "Team Training Program", progress: 60, status: "In Progress" },
    { name: "Process Improvement", progress: 45, status: "Started" }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Branch Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your branch performance overview.
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
              <Target className="h-5 w-5" />
              Goals & Targets
            </CardTitle>
            <CardDescription>
              Track progress on key branch objectives
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
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">12</div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Customer feedback awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">$174K</div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +18.7% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">86%</div>
              <Target className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Average team efficiency
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}