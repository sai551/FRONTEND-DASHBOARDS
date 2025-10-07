import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CheckSquare,
  Clock,
  Search,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// ✅ Reusable Task Card
function TaskCard({ task, onClick }: { task: any; onClick: () => void }) {
  const borderColor =
    task.priority === "High Priority"
      ? "border-l-red-500"
      : task.priority === "Medium Priority"
      ? "border-l-yellow-500"
      : task.priority === "Low Priority"
      ? "border-l-green-500"
      : "border-l-blue-500";

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer border-l-4 ${borderColor} ${
        task.status === "Completed" ? "bg-muted/30" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </div>
          <Badge
            variant={
              task.status === "Completed"
                ? "default"
                : task.status === "In Progress"
                ? "secondary"
                : "destructive"
            }
          >
            {task.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{task.due}</span>
            </div>
            {task.assignedBy && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{task.assignedBy}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ✅ Skeleton for Cards
function TaskCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-20 bg-gray-300 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <div className="h-3 w-24 bg-gray-300 rounded mb-2" />
          <div className="h-6 w-10 bg-gray-400 rounded" />
        </div>
        <div className="h-8 w-8 bg-gray-300 rounded-full" />
      </CardContent>
    </Card>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Search + Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  // ✅ Modal state
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  // ✅ API Linking (dummy for now)
  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: "Fix Authentication Bug",
          description: "Critical bug affecting user login functionality",
          priority: "High Priority",
          due: "Due: Today, 5:00 PM",
          assignedBy: "Vijay B",
          status: "In Progress",
        },
        {
          id: 2,
          title: "Review Code PR #234",
          description: "Review and test the new feature implementation",
          priority: "Medium Priority",
          due: "Due: Tomorrow, 2:00 PM",
          assignedBy: "Hari K",
          status: "Pending",
        },
        {
          id: 3,
          title: "Update Documentation",
          description: "Update API documentation with latest changes",
          priority: "Low Priority",
          due: "Due: Next Week",
          assignedBy: "Self-assigned",
          status: "Pending",
        },
        {
          id: 4,
          title: "Database Migration",
          description: "Migrate user data to new database schema",
          priority: "Completed",
          due: "Completed: Yesterday",
          assignedBy: "Sandeep K",
          status: "Completed",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // ✅ Apply Search & Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterPriority === "All" ? true : task.priority === filterPriority;

    return matchesSearch && matchesFilter;
  });

  // ✅ Update task status
  const updateTaskStatus = (id: number, status: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
    setSelectedTask((prev) => (prev ? { ...prev, status } : prev));

    // Uncomment when backend ready
    // axios.put(`/api/tasks/${id}`, { status }).catch(console.error);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tasks</h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Priority Filter */}
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High Priority">High Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="Low Priority">Low Priority</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {loading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tasks
                  </p>
                  <p className="text-2xl font-bold">{filteredTasks.length}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredTasks.filter((t) => t.status === "In Progress").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredTasks.filter((t) => t.status === "Completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredTasks.filter((t) => t.status === "Pending").length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Task Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <>
              <TaskCardSkeleton />
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground">No tasks found.</p>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filteredTasks
            .filter((t) => t.status === "Pending")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
              />
            ))}
        </TabsContent>

        <TabsContent value="inprogress" className="space-y-4">
          {filteredTasks
            .filter((t) => t.status === "In Progress")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
              />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filteredTasks
            .filter((t) => t.status === "Completed")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
              />
            ))}
        </TabsContent>
      </Tabs>

      {/* ✅ Task Detail Modal */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">{selectedTask.description}</p>
            <div className="mt-4">
              <label className="text-sm font-medium">Update Status:</label>
              <Select
                value={selectedTask.status}
                onValueChange={(val) => updateTaskStatus(selectedTask.id, val)}
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedTask(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
