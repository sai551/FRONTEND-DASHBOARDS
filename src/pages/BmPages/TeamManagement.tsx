import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Star, 
  TrendingUp, 
  Clock,
  Plus,
  Calendar,
  Target,
  Award
} from "lucide-react";

export default function TeamManagement() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Sales Manager",
      performance: 92,
      avatar: "/placeholder.svg",
      status: "active",
      targets: "95%",
      lastActive: "2 hours ago"
    },
    {
      name: "Mike Chen",
      role: "Customer Service Lead",
      performance: 88,
      avatar: "/placeholder.svg",
      status: "active",
      targets: "87%",
      lastActive: "1 hour ago"
    },
    {
      name: "Emma Davis",
      role: "Sales Representative",
      performance: 85,
      avatar: "/placeholder.svg",
      status: "active",
      targets: "90%",
      lastActive: "30 minutes ago"
    },
    {
      name: "James Wilson",
      role: "Junior Associate",
      performance: 78,
      avatar: "/placeholder.svg",
      status: "training",
      targets: "70%",
      lastActive: "4 hours ago"
    }
  ];

  const teamMetrics = [
    {
      title: "Team Size",
      value: "12",
      change: "+2 this month",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Avg Performance",
      value: "86%",
      change: "+4% this month",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Training Hours",
      value: "24",
      change: "8 hours pending",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Top Performers",
      value: "5",
      change: "Above 90%",
      icon: Star,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team performance, targets, and development
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Training
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMetrics.map((metric) => (
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
                <span className="text-success font-medium">{metric.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
            <CardDescription>
              Monitor individual performance and development
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{member.performance}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Performance</span>
                    <span>Target: {member.targets}</span>
                  </div>
                  <Progress value={member.performance} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Last active: {member.lastActive}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Performance Insights
            </CardTitle>
            <CardDescription>
              Team achievements and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Target className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Monthly Target</p>
                    <p className="text-xs text-muted-foreground">89% achieved</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Top Performer</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson - 92%</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Clock className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Training Due</p>
                    <p className="text-xs text-muted-foreground">3 team members</p>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Detailed Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}