import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  User,
  Eye,
  Download,
  Bell,
  Shield,
  Users,
  Building,
  AlertTriangle
} from "lucide-react";

const notices = [
  {
    id: 1,
    title: "Updated Remote Work Policy",
    type: "Policy Update",
    author: "HR Department",
    authorAvatar: "/placeholder.svg",
    publishDate: "2024-02-10",
    priority: "High",
    category: "HR Policy",
    views: 1234,
    description: "Important updates to our remote work policy effective March 1st, 2024. All employees must review and acknowledge.",
    status: "Active"
  },
  {
    id: 2,
    title: "Q1 All-Hands Meeting",
    type: "Announcement",
    author: "John Director",
    authorAvatar: "/placeholder.svg", 
    publishDate: "2024-02-08",
    priority: "Medium",
    category: "Company News",
    views: 892,
    description: "Join us for the quarterly all-hands meeting on February 15th at 10 AM PST. We'll discuss Q4 results and Q1 goals.",
    status: "Active"
  },
  {
    id: 3,
    title: "Security Awareness Training",
    type: "Training Notice",
    author: "IT Security",
    authorAvatar: "/placeholder.svg",
    publishDate: "2024-02-05",
    priority: "High",
    category: "Security",
    views: 756,
    description: "Mandatory security awareness training for all employees. Deadline: February 29th, 2024.",
    status: "Active"
  },
  {
    id: 4,
    title: "New Employee Benefits Package",
    type: "Benefits Update",
    author: "Benefits Team",
    authorAvatar: "/placeholder.svg",
    publishDate: "2024-02-01",
    priority: "Medium",
    category: "Benefits",
    views: 1456,
    description: "Enhanced benefits package including dental coverage and wellness programs. Open enrollment starts March 1st.",
    status: "Active"
  },
  {
    id: 5,
    title: "Office Renovation Notice",
    type: "Facility Notice",
    author: "Facilities",
    authorAvatar: "/placeholder.svg",
    publishDate: "2024-01-28",
    priority: "Low", 
    category: "Facilities",
    views: 345,
    description: "The 3rd floor will undergo renovation from March 15-30. Temporary workspace assignments will be provided.",
    status: "Active"
  },
  {
    id: 6,
    title: "Holiday Schedule 2024",
    type: "Schedule",
    author: "HR Department", 
    authorAvatar: "/placeholder.svg",
    publishDate: "2024-01-15",
    priority: "Low",
    category: "Schedule",
    views: 2134,
    description: "Official company holiday schedule for 2024. Please plan your vacation time accordingly.",
    status: "Archived"
  }
];

const policies = [
  {
    name: "Employee Handbook",
    category: "HR Policy",
    lastUpdated: "2024-01-15",
    version: "2024.1",
    size: "2.4 MB",
    downloads: 1234
  },
  {
    name: "Code of Conduct",
    category: "Ethics",
    lastUpdated: "2023-12-10",
    version: "2023.3",
    size: "890 KB",
    downloads: 987
  },
  {
    name: "Information Security Policy",
    category: "Security",
    lastUpdated: "2024-02-01",
    version: "2024.1",
    size: "1.2 MB",
    downloads: 756
  },
  {
    name: "Remote Work Guidelines",
    category: "Operations",
    lastUpdated: "2024-02-10",
    version: "2024.2",
    size: "650 KB",
    downloads: 543
  }
];

const NoticesPolicies = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Policy Update":
        return <Shield className="h-4 w-4" />;
      case "Announcement":
        return <Bell className="h-4 w-4" />;
      case "Training Notice":
        return <Users className="h-4 w-4" />;
      case "Benefits Update":
        return <User className="h-4 w-4" />;
      case "Facility Notice":
        return <Building className="h-4 w-4" />;
      case "Schedule":
        return <Calendar className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notices & Policies</h1>
          <p className="text-muted-foreground mt-2">
            Company announcements, policies, and important notices
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Notice
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notices</CardTitle>
            <Bell className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notices.filter(n => n.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-warning">2 high priority</Badge>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notices.reduce((sum, notice) => sum + notice.views, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Policy Documents</CardTitle>
            <FileText className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{policies.length}</div>
            <p className="text-xs text-muted-foreground">
              Available for download
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {policies.reduce((sum, policy) => sum + policy.downloads, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total policy downloads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-dashboard-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search notices and policies..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notices */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Notices</h2>
          {notices.map((notice) => (
            <Card key={notice.id} className="shadow-dashboard-md hover:shadow-dashboard-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-muted rounded-lg">
                      {getTypeIcon(notice.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{notice.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{notice.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(notice.publishDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{notice.views} views</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getPriorityColor(notice.priority)}>
                      {notice.priority}
                    </Badge>
                    <Badge variant="outline">
                      {notice.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{notice.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{notice.category}</Badge>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Policy Documents */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Policy Documents</h2>
          <Card className="shadow-dashboard-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-chart-3" />
                Available Policies
              </CardTitle>
              <CardDescription>Download latest policy documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {policies.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{policy.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{policy.category}</span>
                      <span>v{policy.version}</span>
                      <span>{policy.size}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {policy.downloads} downloads
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-dashboard-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create New Notice
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Upload Policy Document
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NoticesPolicies;