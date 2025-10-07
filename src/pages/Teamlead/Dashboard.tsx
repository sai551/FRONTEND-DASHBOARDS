import { Users, CheckSquare, Clock, Calendar, TrendingUp, Target } from "lucide-react";
import { StatsCard } from "@/components/TeamleadDashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function TeamLeadDashboard() {
  const recentTasks = [
    { id: 1, title: "Review project proposal", assignee: "Sarah Johnson", priority: "High", status: "In Progress" },
    { id: 2, title: "Update client documentation", assignee: "Mike Chen", priority: "Medium", status: "To Do" },
    { id: 3, title: "Team performance review", assignee: "Lisa Wilson", priority: "High", status: "Done" },
    { id: 4, title: "Prepare monthly report", assignee: "John Smith", priority: "Medium", status: "In Progress" },
  ];

  const teamPerformance = [
    { name: "Sarah Johnson", completion: 95, tasks: 12 },
    { name: "Mike Chen", completion: 87, tasks: 8 },
    { name: "Lisa Wilson", completion: 92, tasks: 10 },
    { name: "John Smith", completion: 78, tasks: 9 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your team's performance and track progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Team Members"
          value={12}
          icon={Users}
          trend={{ value: "+2 this month", isPositive: true }}
          variant="default"
        />
        <StatsCard
          title="Open Tasks"
          value={24}
          icon={CheckSquare}
          trend={{ value: "-5 from last week", isPositive: true }}
          variant="warning"
        />
        <StatsCard
          title="Completed Tasks"
          value={89}
          icon={Target}
          trend={{ value: "+12 this week", isPositive: true }}
          variant="success"
        />
        <StatsCard
          title="Pending Leave Requests"
          value={3}
          icon={Calendar}
          trend={{ value: "2 approved today", isPositive: true }}
          variant="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              Recent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.assignee}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={task.priority === "High" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                    <Badge 
                      variant={task.status === "Done" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member) => (
                <div key={member.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{member.tasks} tasks</span>
                      <span className="text-sm font-medium">{member.completion}%</span>
                    </div>
                  </div>
                  <Progress value={member.completion} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors">
              <h3 className="font-medium text-primary">Create New Task</h3>
              <p className="text-sm text-muted-foreground">Assign a new task to team members</p>
            </div>
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg cursor-pointer hover:bg-success/10 transition-colors">
              <h3 className="font-medium text-success">Review Leave Requests</h3>
              <p className="text-sm text-muted-foreground">3 pending requests to review</p>
            </div>
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg cursor-pointer hover:bg-warning/10 transition-colors">
              <h3 className="font-medium text-warning">Generate Report</h3>
              <p className="text-sm text-muted-foreground">Create team performance report</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}