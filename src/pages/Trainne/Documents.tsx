import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Search,
  Video,
  Image,
  File,
  BookOpen,
  ExternalLink,
  Eye
} from "lucide-react";

export default function TraineeDocuments() {
  const documents = [
    {
      id: 1,
      title: "JavaScript Fundamentals Handbook",
      description: "Complete guide to JavaScript programming basics including variables, functions, and control structures.",
      type: "PDF",
      category: "Technical",
      course: "JavaScript Fundamentals",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      downloads: 156,
      icon: FileText
    },
    {
      id: 2,
      title: "React Component Best Practices",
      description: "Video tutorial covering React component design patterns and optimization techniques.",
      type: "Video",
      category: "Technical",
      course: "React Components",
      size: "45.6 MB",
      uploadDate: "2024-01-18",
      downloads: 98,
      icon: Video
    },
    {
      id: 3,
      title: "Git Workflow Diagram",
      description: "Visual representation of Git branching strategies and merge workflows.",
      type: "Image",
      category: "Technical", 
      course: "Git & Version Control",
      size: "1.2 MB",
      uploadDate: "2024-01-20",
      downloads: 234,
      icon: Image
    },
    {
      id: 4,
      title: "Company Code of Conduct",
      description: "Official company policies and guidelines for professional behavior and ethics.",
      type: "PDF",
      category: "Policies",
      course: "General",
      size: "856 KB",
      uploadDate: "2024-01-10",
      downloads: 89,
      icon: FileText
    },
    {
      id: 5,
      title: "Soft Skills Training Slides",
      description: "Presentation materials covering communication, teamwork, and leadership skills.",
      type: "PowerPoint",
      category: "Soft Skills",
      course: "Professional Development",
      size: "3.8 MB",
      uploadDate: "2024-01-12",
      downloads: 67,
      icon: File
    },
    {
      id: 6,
      title: "API Documentation Guide",
      description: "Comprehensive guide to working with REST APIs and JSON data structures.",
      type: "PDF",
      category: "Technical",
      course: "Web Development",
      size: "1.9 MB",
      uploadDate: "2024-01-22",
      downloads: 45,
      icon: FileText
    }
  ];

  const categories = ["All", "Technical", "Soft Skills", "Policies"];
  const fileTypes = ["All", "PDF", "Video", "Image", "PowerPoint"];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF": return "bg-red-100 text-red-800";
      case "Video": return "bg-blue-100 text-blue-800";
      case "Image": return "bg-green-100 text-green-800";
      case "PowerPoint": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical": return "bg-purple-100 text-purple-800";
      case "Soft Skills": return "bg-blue-100 text-blue-800";
      case "Policies": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documents & Resources</h1>
        <p className="text-muted-foreground">Access training materials, guides, and reference documents</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Technical Guides</p>
                <p className="text-2xl font-bold">{documents.filter(doc => doc.category === "Technical").length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Video Resources</p>
                <p className="text-2xl font-bold">{documents.filter(doc => doc.type === "Video").length}</p>
              </div>
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold">{documents.reduce((sum, doc) => sum + doc.downloads, 0)}</p>
              </div>
              <Download className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>
        <select className="px-3 py-2 border rounded-md">
          <option>All Categories</option>
          {categories.slice(1).map(category => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <select className="px-3 py-2 border rounded-md">
          <option>All Types</option>
          {fileTypes.slice(1).map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Document Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {documents.map((document) => (
              <Card key={document.id} className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <document.icon className="h-5 w-5" />
                        {document.title}
                      </CardTitle>
                      <CardDescription>{document.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-1 ml-4">
                      <Badge className={getTypeColor(document.type)}>
                        {document.type}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Document Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium">Course</p>
                      <p>{document.course}</p>
                    </div>
                    <div>
                      <p className="font-medium">File Size</p>
                      <p>{document.size}</p>
                    </div>
                    <div>
                      <p className="font-medium">Upload Date</p>
                      <p>{document.uploadDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Downloads</p>
                      <p>{document.downloads}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    {document.type === "Video" && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {documents.filter(doc => doc.category === "Technical").map((document) => (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <document.icon className="h-5 w-5" />
                    {document.title}
                  </CardTitle>
                  <CardDescription>{document.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge className={getTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{document.size}</span>
                  </div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="soft-skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {documents.filter(doc => doc.category === "Soft Skills").map((document) => (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <document.icon className="h-5 w-5" />
                    {document.title}
                  </CardTitle>
                  <CardDescription>{document.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge className={getTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{document.size}</span>
                  </div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {documents.filter(doc => doc.category === "Policies").map((document) => (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <document.icon className="h-5 w-5" />
                    {document.title}
                  </CardTitle>
                  <CardDescription>{document.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge className={getTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{document.size}</span>
                  </div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Frequently accessed resources and external links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Learning Management System</p>
                <p className="text-xs text-muted-foreground">Access online courses</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Company Knowledge Base</p>
                <p className="text-xs text-muted-foreground">Internal documentation</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Help & Support</p>
                <p className="text-xs text-muted-foreground">Get assistance</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}