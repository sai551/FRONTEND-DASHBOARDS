import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, FileText, Download, Share2, Edit, Folder } from "lucide-react";
import { Input } from "@/components/ui/input";

const documents = [
  {
    id: 1,
    title: "Product Requirements Document - Mobile App v2.0",
    type: "PRD",
    author: "sai",
    lastModified: "2024-01-15",
    size: "2.4 MB",
    status: "Final",
    tags: ["Mobile", "Requirements", "v2.0"],
  },
  {
    id: 2,
    title: "API Documentation v3.1",
    type: "Technical Spec",
    author: "sandeep",
    lastModified: "2024-01-14",
    size: "1.8 MB",
    status: "Draft",
    tags: ["API", "Documentation", "Backend"],
  },
  {
    id: 3,
    title: "User Research Report Q4 2023",
    type: "Research",
    author: "vijay",
    lastModified: "2024-01-10",
    size: "5.2 MB",
    status: "Published",
    tags: ["Research", "Users", "Q4"],
  },
  {
    id: 4,
    title: "Marketing Campaign Brief",
    type: "Brief",
    author: "sravan",
    lastModified: "2024-01-08",
    size: "890 KB",
    status: "Review",
    tags: ["Marketing", "Campaign", "Q1"],
  },
  {
    id: 5,
    title: "Technical Architecture Diagram",
    type: "Architecture",
    author: "bhuvan",
    lastModified: "2024-01-05",
    size: "1.2 MB",
    status: "Final",
    tags: ["Architecture", "Technical", "Infrastructure"],
  },
];

const tasks = [
  {
    id: 1,
    title: "Review API documentation changes",
    assignee: "vijay",
    dueDate: "2024-01-20",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Update user onboarding flow",
    assignee: "sandeep",
    dueDate: "2024-01-25",
    priority: "Medium",
    status: "Todo",
  },
  {
    id: 3,
    title: "Finalize Q1 roadmap presentation",
    assignee: "sai",
    dueDate: "2024-01-18",
    priority: "High",
    status: "Done",
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    Final: "default" as const,
    Published: "default" as const,
    Draft: "secondary" as const,
    Review: "outline" as const,
  };
  return colors[status as keyof typeof colors] || "secondary";
};

export default function Documents() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📂 Documents & Tasks</h1>
          <p className="text-sm md:text-base text-gray-600">
            Centralized workspace to manage documents and track active tasks
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" className="flex items-center justify-center space-x-2">
            <Folder className="h-4 w-4" />
            <span>New Folder</span>
          </Button>
          <Button className="flex items-center justify-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Document</span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Documents */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">📑 Documents</h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <Card key={doc.id} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <FileText className="h-5 w-5 text-indigo-500 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{doc.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>{doc.author}</span>
                          <span>{doc.lastModified}</span>
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                          <Badge variant="outline">{doc.type}</Badge>
                          {doc.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">✅ Active Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-800 text-sm">{task.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {task.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>👤 Assigned to: {task.assignee}</div>
                      <div>📅 Due: {task.dueDate}</div>
                    </div>
                    <Badge
                      variant={task.priority === "High" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
