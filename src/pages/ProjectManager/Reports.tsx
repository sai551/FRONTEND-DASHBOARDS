import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Target,
  Settings
} from "lucide-react";

export default function ProjectReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedProject, setSelectedProject] = useState("all");

  const reportTemplates = [
    {
      id: 1,
      name: "Project Status Report",
      description: "Comprehensive overview of all project progress, milestones, and deliverables",
      frequency: "Weekly",
      lastGenerated: "2024-03-01",
      recipients: 8,
      format: "PDF",
      automated: true
    },
    {
      id: 2,
      name: "Resource Utilization Report",
      description: "Team capacity, workload distribution, and productivity metrics",
      frequency: "Monthly",
      lastGenerated: "2024-02-28",
      recipients: 5,
      format: "Excel",
      automated: true
    },
    {
      id: 3,
      name: "Budget Performance Report",
      description: "Financial overview including budget vs actual, forecasts, and variances",
      frequency: "Monthly",
      lastGenerated: "2024-02-28",
      recipients: 12,
      format: "PDF",
      automated: false
    },
    {
      id: 4,
      name: "Risk Assessment Report",
      description: "Active risks, mitigation strategies, and issue resolution status",
      frequency: "Bi-weekly",
      lastGenerated: "2024-03-01",
      recipients: 6,
      format: "PDF",
      automated: true
    },
    {
      id: 5,
      name: "Team Performance Report",
      description: "Individual and team KPIs, achievements, and improvement areas",
      frequency: "Monthly",
      lastGenerated: "2024-02-28",
      recipients: 15,
      format: "Excel",
      automated: false
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Status Summary",
      nextRun: "2024-03-08 09:00",
      recipients: ["sarah.johnson@company.com", "mike.davis@company.com"],
      status: "Active"
    },
    {
      id: 2,
      name: "Monthly Budget Review",
      nextRun: "2024-03-31 08:00",
      recipients: ["finance@company.com", "ceo@company.com"],
      status: "Active"
    },
    {
      id: 3,
      name: "Quarterly Performance",
      nextRun: "2024-03-31 10:00",
      recipients: ["hr@company.com", "management@company.com"],
      status: "Paused"
    }
  ];

  const analyticsWidgets = [
    {
      title: "Project Completion Rate",
      value: "78%",
      change: "+12%",
      trend: "up",
      icon: Target,
      description: "Projects completed on time"
    },
    {
      title: "Team Productivity",
      value: "94%",
      change: "+8%",
      trend: "up",
      icon: Users,
      description: "Average team efficiency"
    },
    {
      title: "Budget Variance",
      value: "-2.3%",
      change: "+1.2%",
      trend: "up",
      icon: DollarSign,
      description: "Under budget performance"
    },
    {
      title: "Time to Market",
      value: "12.4d",
      change: "-3.2d",
      trend: "down",
      icon: Clock,
      description: "Average delivery time"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Paused": return "bg-yellow-100 text-yellow-800";
      case "Error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate insights, create reports, and schedule automated analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure Templates
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsWidgets.map((widget, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
              <widget.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{widget.value}</div>
              <p className="text-xs text-muted-foreground">{widget.description}</p>
              <div className="flex items-center mt-2">
                {widget.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingUp className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                )}
                <span className={`text-xs ${
                  widget.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {widget.change} from last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Live Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Report Generation</CardTitle>
                <CardDescription>Generate instant reports with custom parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-status">Project Status</SelectItem>
                      <SelectItem value="resource-utilization">Resource Utilization</SelectItem>
                      <SelectItem value="budget-performance">Budget Performance</SelectItem>
                      <SelectItem value="team-performance">Team Performance</SelectItem>
                      <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">This Week</SelectItem>
                      <SelectItem value="monthly">This Month</SelectItem>
                      <SelectItem value="quarterly">This Quarter</SelectItem>
                      <SelectItem value="yearly">This Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Scope</label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                      <SelectItem value="mobile-banking">Mobile Banking App</SelectItem>
                      <SelectItem value="healthcare">Healthcare Portal</SelectItem>
                      <SelectItem value="learning">Learning Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Previously generated reports and downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium">Project Status - March 2024</h4>
                      <p className="text-sm text-muted-foreground">Generated 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium">Budget Performance Q1</h4>
                      <p className="text-sm text-muted-foreground">Generated yesterday</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium">Team Performance - Feb</h4>
                      <p className="text-sm text-muted-foreground">Generated 3 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Manage and customize report templates for consistent reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{template.name}</h4>
                          <Badge variant={template.automated ? "default" : "secondary"}>
                            {template.automated ? "Automated" : "Manual"}
                          </Badge>
                          <Badge variant="outline">{template.format}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div>
                        <span className="font-medium">Frequency:</span>
                        <div>{template.frequency}</div>
                      </div>
                      <div>
                        <span className="font-medium">Last Generated:</span>
                        <div>{template.lastGenerated}</div>
                      </div>
                      <div>
                        <span className="font-medium">Recipients:</span>
                        <div>{template.recipients} people</div>
                      </div>
                      <div>
                        <span className="font-medium">Format:</span>
                        <div>{template.format}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        Generate Now
                      </Button>
                      <Button size="sm">
                        <Mail className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automated report delivery schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledReports.map((report) => (
                    <div 
                      key={report.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{report.name}</h4>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Next run: {report.nextRun}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {report.recipients.length} recipients
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">
                          {report.status === "Active" ? "Pause" : "Resume"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Automation</CardTitle>
                <CardDescription>Configure automated report delivery settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Email Configuration</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Set up automated email delivery for your reports
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Configure Email Settings
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reports Sent This Month</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Success Rate</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Open Rate</span>
                    <span className="font-medium">76%</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Dashboard</CardTitle>
                <CardDescription>Live project metrics and KPIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Interactive Analytics</h3>
                  <p className="text-gray-500 mb-6">
                    Real-time charts and graphs would be displayed here using libraries like Chart.js or D3.js
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">Project Trends</Button>
                    <Button variant="outline">Team Metrics</Button>
                    <Button variant="outline">Budget Analysis</Button>
                    <Button variant="outline">Risk Heatmap</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics Insights</CardTitle>
                <CardDescription>AI-powered insights and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Positive Trend</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Team productivity has increased by 15% this quarter
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Recommendation</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Consider reallocating resources from over-performing projects
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Attention</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Two projects are approaching critical deadlines
                  </p>
                </div>
                
                <Button className="w-full">
                  <PieChart className="mr-2 h-4 w-4" />
                  View Full Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Custom Analytics Builder</CardTitle>
              <CardDescription>Create custom reports and visualizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-xs">Bar Charts</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <PieChart className="h-6 w-6" />
                  <span className="text-xs">Pie Charts</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-xs">Line Graphs</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Target className="h-6 w-6" />
                  <span className="text-xs">KPI Widgets</span>
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button>Build Custom Report</Button>
                <Button variant="outline">Import Template</Button>
                <Button variant="outline">Export Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}