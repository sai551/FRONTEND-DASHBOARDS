import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Target, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Plus,
  Calendar,
  TrendingUp,
  Flag
} from "lucide-react";

export default function TasksTargets() {
  const targetMetrics = [
    {
      title: "Monthly Targets",
      value: "8/12",
      change: "67% complete",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Completed Tasks",
      value: "145",
      change: "+23 this week",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Pending Tasks",
      value: "28",
      change: "Due this week",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Overdue Items",
      value: "4",
      change: "Requires attention",
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    }
  ];

  const activeTargets = [
    {
      title: "Q4 Sales Revenue",
      target: "$280,000",
      current: "$187,500",
      progress: 67,
      deadline: "Dec 31, 2024",
      status: "on-track"
    },
    {
      title: "Customer Acquisition",
      target: "200 customers",
      current: "156 customers",
      progress: 78,
      deadline: "Dec 15, 2024",
      status: "ahead"
    },
    {
      title: "Team Training Hours",
      target: "40 hours",
      current: "24 hours",
      progress: 60,
      deadline: "Nov 30, 2024",
      status: "behind"
    },
    {
      title: "Customer Satisfaction",
      target: "95% rating",
      current: "92% rating",
      progress: 97,
      deadline: "Ongoing",
      status: "on-track"
    }
  ];

  const recentTasks = [
    {
      title: "Prepare monthly sales report",
      assignee: "Sarah Johnson",
      priority: "high",
      dueDate: "Today",
      completed: false
    },
    {
      title: "Review customer feedback forms",
      assignee: "Mike Chen",
      priority: "medium",
      dueDate: "Tomorrow",
      completed: false
    },
    {
      title: "Update team performance metrics",
      assignee: "Emma Davis",
      priority: "high",
      dueDate: "Dec 5",
      completed: true
    },
    {
      title: "Schedule team training session",
      assignee: "James Wilson",
      priority: "low",
      dueDate: "Dec 8",
      completed: false
    },
    {
      title: "Analyze quarterly financial data",
      assignee: "Sarah Johnson",
      priority: "high",
      dueDate: "Dec 10",
      completed: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead": return "text-success";
      case "on-track": return "text-primary";
      case "behind": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks & Targets</h1>
          <p className="text-muted-foreground mt-1">
            Monitor progress on goals and manage team tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Set Deadline
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Target Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {targetMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`font-medium ${metric.color}`}>{metric.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Targets */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Targets
            </CardTitle>
            <CardDescription>
              Track progress on key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTargets.map((target) => (
              <div key={target.title} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{target.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {target.current} of {target.target}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(target.status)}>
                      {target.status}
                    </Badge>
                    <span className="text-sm font-medium">{target.progress}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={target.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Deadline: {target.deadline}</span>
                    <span>{target.progress}% complete</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Tasks
            </CardTitle>
            <CardDescription>
              Team assignments and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={task.completed}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm font-medium ${
                        task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {task.assignee}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Due: {task.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Task Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">83%</div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">2.4h</div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              15min faster than target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Priority Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">12</div>
              <Flag className="h-8 w-8 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              8 due this week
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}