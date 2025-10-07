import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Filter, Calendar, User, Flag } from "lucide-react";

export default function Tasks() {
  const tasks = [
    {
      id: 1,
      title: "Review Q4 budget proposal",
      description: "Analyze and approve the budget allocation for next quarter",
      assignee: "Alex Johnson",
      priority: "High",
      status: "In Progress", 
      dueDate: "2024-02-15",
      project: "Budget Planning",
      completed: false
    },
    {
      id: 2,
      title: "Conduct team performance reviews",
      description: "Schedule and complete quarterly performance evaluations",
      assignee: "Emily Davis",
      priority: "Medium",
      status: "Pending",
      dueDate: "2024-02-20",
      project: "HR Management",
      completed: false
    },
    {
      id: 3,
      title: "Update employee handbook",
      description: "Revise policies and procedures documentation",
      assignee: "Sarah Johnson",
      priority: "Low",
      status: "Completed",
      dueDate: "2024-02-10",
      project: "Documentation",
      completed: true
    },
    {
      id: 4,
      title: "Security system maintenance",
      description: "Perform routine security checks and updates",
      assignee: "Michael Chen",
      priority: "Critical",
      status: "In Progress",
      dueDate: "2024-02-12",
      project: "Security Audit",
      completed: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Pending": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all tasks and assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>
            View and manage all organizational tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                <Checkbox 
                  checked={task.completed}
                  className="mt-1"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flag className="h-4 w-4" />
                        <span>{task.project}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
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