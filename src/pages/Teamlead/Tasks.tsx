import { useState } from "react";
import { Plus, Search, Filter, Calendar, User, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TeamTasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const tasks = [
    {
      id: "T001",
      title: "Review project proposal",
      description: "Review and provide feedback on the Q4 project proposal",
      assignee: "Sarah Johnson",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-15",
      project: "Q4 Initiative",
      createdDate: "2024-01-10"
    },
    {
      id: "T002",
      title: "Update client documentation",
      description: "Update API documentation for the new client onboarding",
      assignee: "Mike Chen",
      priority: "Medium",
      status: "To Do",
      dueDate: "2024-01-20",
      project: "Client Portal",
      createdDate: "2024-01-08"
    },
    {
      id: "T003",
      title: "Team performance review",
      description: "Conduct monthly performance reviews for team members",
      assignee: "Lisa Wilson",
      priority: "High",
      status: "Done",
      dueDate: "2024-01-12",
      project: "HR Management",
      createdDate: "2024-01-05"
    },
    {
      id: "T004",
      title: "Prepare monthly report",
      description: "Compile team productivity metrics for monthly report",
      assignee: "John Smith",
      priority: "Medium",
      status: "In Progress",
      dueDate: "2024-01-25",
      project: "Reporting",
      createdDate: "2024-01-12"
    },
    {
      id: "T005",
      title: "Bug fix - Login issue",
      description: "Fix the login authentication bug reported by users",
      assignee: "Emily Davis",
      priority: "High",
      status: "To Do",
      dueDate: "2024-01-16",
      project: "Bug Fixes",
      createdDate: "2024-01-11"
    }
  ];

  const teamMembers = [
    "Sarah Johnson",
    "Mike Chen", 
    "Lisa Wilson",
    "John Smith",
    "Emily Davis",
    "David Brown"
  ];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Done":
        return <Badge className="bg-success text-success-foreground">Done</Badge>;
      case "In Progress":
        return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
      case "To Do":
        return <Badge variant="outline">To Do</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">Manage and track team tasks</p>
        </div>
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" placeholder="Enter task title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <Input id="project" placeholder="Enter project name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter task description" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member} value={member}>{member}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddTaskOpen(false)}>
                  Create Task
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 lg:w-80">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-warning">{tasks.filter(t => t.status === "To Do").length}</div>
              <div className="text-xs text-muted-foreground">To Do</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-primary">{tasks.filter(t => t.status === "In Progress").length}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-success">{tasks.filter(t => t.status === "Done").length}</div>
              <div className="text-xs text-muted-foreground">Done</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {task.project}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>Reassign</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}