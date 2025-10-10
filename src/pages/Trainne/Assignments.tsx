import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  ClipboardList, 
  Upload, 
  Clock, 
  User, 
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileText
} from "lucide-react";

export default function TraineeAssignments() {
  const assignments = [
    {
      id: 1,
      title: "React Component Building",
      description: "Create a reusable button component with different variants and states.",
      dueDate: "2024-01-25",
      status: "Pending",
      priority: "High",
      assignedBy: "Mike Chen",
      course: "React Fundamentals",
      submissionType: "Code Upload",
      maxScore: 100,
      timeRemaining: "2 days"
    },
    {
      id: 2,
      title: "JavaScript Functions Exercise",
      description: "Complete the function exercises covering arrow functions, callbacks, and closures.",
      dueDate: "2024-01-30",
      status: "In Progress",
      priority: "Medium",
      assignedBy: "Hari K",
      course: "JavaScript Fundamentals", 
      submissionType: "File Upload",
      maxScore: 75,
      timeRemaining: "7 days"
    },
    {
      id: 3,
      title: "Git Workflow Project",
      description: "Demonstrate Git branching and merging strategies with a sample project.",
      dueDate: "2024-01-20",
      status: "Submitted",
      priority: "Low",
      assignedBy: "Alex Rodriguez",
      course: "Git & Version Control",
      submissionType: "Repository Link",
      maxScore: 50,
      score: 45,
      timeRemaining: "Completed"
    },
    {
      id: 4,
      title: "API Integration Task",
      description: "Build a small application that fetches and displays data from a REST API.",
      dueDate: "2024-01-28",
      status: "Overdue",
      priority: "High",
      assignedBy: "Mike Chen",
      course: "React Fundamentals",
      submissionType: "Code Upload",
      maxScore: 100,
      timeRemaining: "Overdue by 2 days"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted": return <CheckCircle className="h-4 w-4" />;
      case "Overdue": return <AlertCircle className="h-4 w-4" />;
      default: return <ClipboardList className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">Manage your assignments and track submission deadlines</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search assignments..." className="pl-10" />
        </div>
      </div>

      {/* Assignment Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(assignment.status)}
                        {assignment.title}
                      </CardTitle>
                      <CardDescription>{assignment.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      <Badge variant={getPriorityColor(assignment.priority)}>
                        {assignment.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Assignment Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Due Date</p>
                        <p className="text-muted-foreground">{assignment.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Assigned By</p>
                        <p className="text-muted-foreground">{assignment.assignedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Course</p>
                        <p className="text-muted-foreground">{assignment.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Time Remaining</p>
                        <p className="text-muted-foreground">{assignment.timeRemaining}</p>
                      </div>
                    </div>
                  </div>

                  {/* Score Display for Submitted */}
                  {assignment.status === "Submitted" && assignment.score && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score</span>
                        <span>{assignment.score}/{assignment.maxScore}</span>
                      </div>
                      <Progress value={(assignment.score / assignment.maxScore) * 100} />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    {assignment.status === "Pending" && (
                      <Button className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Start Assignment
                      </Button>
                    )}
                    {assignment.status === "In Progress" && (
                      <Button className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Assignment
                      </Button>
                    )}
                    {assignment.status === "Overdue" && (
                      <Button className="flex-1" variant="destructive">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Late
                      </Button>
                    )}
                    {assignment.status === "Submitted" && (
                      <Button className="flex-1" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Feedback
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {assignments.filter(assignment => assignment.status === "Pending").map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                    <Badge variant={getPriorityColor(assignment.priority)}>
                      {assignment.priority} Priority
                    </Badge>
                  </div>
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Start Assignment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid gap-4">
            {assignments.filter(assignment => assignment.status === "In Progress").map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                    <span className="text-sm text-muted-foreground">{assignment.timeRemaining}</span>
                  </div>
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Assignment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted">
          <div className="grid gap-4">
            {assignments.filter(assignment => assignment.status === "Submitted").map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {assignment.title}
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignment.score && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score</span>
                        <span>{assignment.score}/{assignment.maxScore}</span>
                      </div>
                      <Progress value={(assignment.score / assignment.maxScore) * 100} />
                    </div>
                  )}
                  <Button className="w-full" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Feedback
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="overdue">
          <div className="grid gap-4">
            {assignments.filter(assignment => assignment.status === "Overdue").map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow border-destructive">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    {assignment.title}
                  </CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-destructive">Due: {assignment.dueDate}</span>
                    <span className="text-sm text-destructive">{assignment.timeRemaining}</span>
                  </div>
                  <Button className="w-full" variant="destructive">
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Late
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}