import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  User, 
  Filter,
  Plus,
  Search,
  TrendingUp,
  Shield,
  Target,
  FileText
} from "lucide-react";

export default function Risk() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const riskMatrix = [
    {
      id: 1,
      title: "API Performance Degradation",
      description: "Slow response times affecting user experience in mobile banking app",
      probability: "High",
      impact: "High",
      priority: "Critical",
      status: "Open",
      owner: "Alex Johnson",
      project: "Mobile Banking App",
      dueDate: "2024-03-10",
      mitigation: "Optimize database queries and implement caching"
    },
    {
      id: 2,
      title: "Third-party Integration Delay",
      description: "Payment gateway integration delayed due to vendor issues",
      probability: "Medium",
      impact: "High",
      priority: "High",
      status: "In Progress",
      owner: "Sarah Chen",
      project: "E-commerce Platform",
      dueDate: "2024-03-15",
      mitigation: "Explore alternative payment providers as backup"
    },
    {
      id: 3,
      title: "Resource Availability",
      description: "Key developer scheduled for vacation during critical phase",
      probability: "High",
      impact: "Medium",
      priority: "Medium",
      status: "Open",
      owner: "Mike Rodriguez",
      project: "Healthcare Portal",
      dueDate: "2024-03-20",
      mitigation: "Cross-train team members and adjust timeline"
    },
    {
      id: 4,
      title: "Security Compliance Gap",
      description: "Potential GDPR compliance issues in data handling",
      probability: "Low",
      impact: "High",
      priority: "High",
      status: "Resolved",
      owner: "Emily Davis",
      project: "Learning Management",
      dueDate: "2024-02-28",
      mitigation: "Implement additional data encryption and audit trails"
    },
    {
      id: 5,
      title: "Budget Overrun Risk",
      description: "Current spending rate may exceed allocated budget",
      probability: "Medium",
      impact: "Medium",
      priority: "Medium",
      status: "Open",
      owner: "John Smith",
      project: "Inventory Management",
      dueDate: "2024-04-01",
      mitigation: "Review scope and optimize resource allocation"
    }
  ];

  const issueLog = [
    {
      id: 1,
      title: "Database Connection Timeout",
      description: "Users experiencing timeouts during peak hours",
      severity: "High",
      status: "Open",
      assignee: "Alex Johnson",
      project: "E-commerce Platform",
      createdDate: "2024-03-01",
      lastUpdate: "2024-03-03",
      escalated: false
    },
    {
      id: 2,
      title: "UI Inconsistency in Mobile View",
      description: "Button alignment issues on smaller screens",
      severity: "Medium",
      status: "In Progress",
      assignee: "Sarah Chen",
      project: "Mobile Banking App",
      createdDate: "2024-02-28",
      lastUpdate: "2024-03-02",
      escalated: false
    },
    {
      id: 3,
      title: "Memory Leak in Background Process",
      description: "Server memory usage increasing over time",
      severity: "High",
      status: "Escalated",
      assignee: "Mike Rodriguez",
      project: "Healthcare Portal",
      createdDate: "2024-02-25",
      lastUpdate: "2024-03-01",
      escalated: true
    },
    {
      id: 4,
      title: "Test Environment Configuration",
      description: "Staging environment not reflecting production setup",
      severity: "Medium",
      status: "Resolved",
      assignee: "Emily Davis",
      project: "Learning Management",
      createdDate: "2024-02-20",
      lastUpdate: "2024-02-28",
      escalated: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Escalated": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskLevel = (probability: string, impact: string) => {
    if ((probability === "High" && impact === "High")) return "Critical";
    if ((probability === "High" && impact === "Medium") || (probability === "Medium" && impact === "High")) return "High";
    if ((probability === "Medium" && impact === "Medium") || (probability === "Low" && impact === "High") || (probability === "High" && impact === "Low")) return "Medium";
    return "Low";
  };

  const filteredRisks = riskMatrix.filter(risk => {
    if (selectedFilter === "all") return true;
    return risk.priority.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk & Issue Tracking</h1>
          <p className="text-muted-foreground">
            Monitor project risks, track issues, and manage escalations across all projects
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Risk Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Risk/Issue
          </Button>
        </div>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 critical, 8 high/medium</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 high severity, 5 medium</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalations</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved This Week</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+25% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="risks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risks">Risk Matrix</TabsTrigger>
          <TabsTrigger value="issues">Issue Log</TabsTrigger>
          <TabsTrigger value="escalations">Escalations</TabsTrigger>
          <TabsTrigger value="analytics">Risk Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-4">
          {/* Risk Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search risks..." className="pl-10" />
                  </div>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Matrix View</CardTitle>
              <CardDescription>Active risks categorized by probability and impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRisks.map((risk) => (
                  <div 
                    key={risk.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{risk.title}</h4>
                          <Badge className={getPriorityColor(risk.priority)}>
                            {risk.priority}
                          </Badge>
                          <Badge className={getStatusColor(risk.status)}>
                            {risk.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Project:</span> {risk.project} | 
                          <span className="font-medium ml-2">Owner:</span> {risk.owner} | 
                          <span className="font-medium ml-2">Due:</span> {risk.dueDate}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center p-2 border rounded">
                            <div className="font-medium">Probability</div>
                            <div className={`text-xs ${
                              risk.probability === "High" ? "text-red-600" :
                              risk.probability === "Medium" ? "text-yellow-600" : "text-green-600"
                            }`}>
                              {risk.probability}
                            </div>
                          </div>
                          <div className="text-center p-2 border rounded">
                            <div className="font-medium">Impact</div>
                            <div className={`text-xs ${
                              risk.impact === "High" ? "text-red-600" :
                              risk.impact === "Medium" ? "text-yellow-600" : "text-green-600"
                            }`}>
                              {risk.impact}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded border">
                      <div className="text-xs font-medium text-gray-700 mb-1">Mitigation Strategy:</div>
                      <div className="text-xs text-gray-600">{risk.mitigation}</div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Update</Button>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issue Log</CardTitle>
              <CardDescription>Track and manage all project issues and blockers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issueLog.map((issue) => (
                  <div 
                    key={issue.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{issue.title}</h4>
                          <Badge className={getPriorityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                          {issue.escalated && (
                            <Badge className="bg-purple-100 text-purple-800">
                              Escalated
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Project:</span>
                        <div>{issue.project}</div>
                      </div>
                      <div>
                        <span className="font-medium">Assignee:</span>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {issue.assignee}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Created:</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {issue.createdDate}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Last Update:</span>
                        <div>{issue.lastUpdate}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Update Status</Button>
                      {!issue.escalated && issue.status !== "Resolved" && (
                        <Button size="sm" variant="destructive">Escalate</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escalated Issues</CardTitle>
              <CardDescription>High-priority issues requiring immediate management attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issueLog.filter(issue => issue.escalated).map((issue) => (
                  <div 
                    key={issue.id}
                    className="p-4 border-2 border-red-200 bg-red-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <h4 className="font-semibold text-red-900">{issue.title}</h4>
                          <Badge className="bg-red-200 text-red-800">ESCALATED</Badge>
                        </div>
                        <p className="text-sm text-red-700 mb-2">{issue.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-red-600 mb-3">
                      <div>
                        <span className="font-medium">Severity:</span> {issue.severity}
                      </div>
                      <div>
                        <span className="font-medium">Assigned to:</span> {issue.assignee}
                      </div>
                      <div>
                        <span className="font-medium">Escalated:</span> {issue.lastUpdate}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white border border-red-200 rounded mb-3">
                      <div className="text-xs font-medium text-red-800 mb-1">Required Actions:</div>
                      <div className="text-xs text-red-700">
                        Immediate technical review required. Senior developer assistance needed to resolve memory leak.
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="bg-red-600 hover:bg-red-700">Assign Senior Team</Button>
                      <Button variant="outline" className="border-red-300 text-red-700">Schedule Review</Button>
                      <Button variant="outline" className="border-red-300 text-red-700">Update Status</Button>
                    </div>
                  </div>
                ))}
                
                {issueLog.filter(issue => issue.escalated).length === 0 && (
                  <div className="text-center p-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-medium mb-2">No Escalated Issues</h3>
                    <p>All issues are being handled at the team level.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Trends</CardTitle>
                <CardDescription>Risk identification and resolution patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Risk Analytics Chart</h3>
                  <p className="text-gray-500 mb-4">
                    Interactive charts showing risk trends over time would be displayed here
                  </p>
                  <Button variant="outline">Configure Analytics</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
                <CardDescription>Key performance indicators for risk management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-muted-foreground">Risk Resolution Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3</div>
                    <div className="text-sm text-muted-foreground">Avg Resolution Days</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Critical Risk Resolution</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Issue Escalation Rate</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Risk Exposure</span>
                    <span className="font-medium">Medium</span>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Management Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions for improving risk management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Process Improvement</span>
                </div>
                <p className="text-sm text-blue-700">
                  Consider implementing weekly risk review meetings to catch issues earlier
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Best Practice</span>
                </div>
                <p className="text-sm text-green-700">
                  Your team's risk resolution rate is above industry average
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-yellow-50">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Attention Needed</span>
                </div>
                <p className="text-sm text-yellow-700">
                  3 risks have been open for more than 30 days - consider escalation
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}