import { useState } from "react";
import { Download, Calendar, TrendingUp, Users, Target, BarChart3, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TeamReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedType, setSelectedType] = useState("all");

  const reportData = {
    teamProductivity: [
      { employee: "Sarah Johnson", tasksCompleted: 45, efficiency: 92, rating: "Excellent" },
      { employee: "Mike Chen", tasksCompleted: 32, efficiency: 87, rating: "Good" },
      { employee: "Lisa Wilson", tasksCompleted: 38, efficiency: 91, rating: "Excellent" },
      { employee: "John Smith", tasksCompleted: 28, efficiency: 78, rating: "Good" },
      { employee: "Emily Davis", tasksCompleted: 41, efficiency: 89, rating: "Excellent" },
      { employee: "David Brown", tasksCompleted: 52, efficiency: 94, rating: "Outstanding" }
    ],
    projectStatus: [
      { project: "Q4 Initiative", progress: 65, status: "On Track", budget: 50000 },
      { project: "Client Portal", progress: 80, status: "Ahead", budget: 75000 },
      { project: "HR Management", progress: 15, status: "Delayed", budget: 30000 },
      { project: "Security Audit", progress: 40, status: "On Track", budget: 25000 }
    ],
    leaveStatistics: {
      totalRequests: 24,
      approved: 18,
      pending: 3,
      rejected: 3,
      averageDays: 4.2
    },
    taskMetrics: {
      totalTasks: 156,
      completed: 89,
      inProgress: 43,
      overdue: 24,
      completionRate: 89
    }
  };

  const availableReports = [
    {
      id: "team-productivity",
      title: "Team Productivity Report",
      description: "Detailed analysis of individual team member performance",
      icon: TrendingUp,
      category: "Performance",
      lastGenerated: "2024-01-15"
    },
    {
      id: "project-status",
      title: "Project Status Report",
      description: "Overview of all active projects and their progress",
      icon: Target,
      category: "Projects",
      lastGenerated: "2024-01-14"
    },
    {
      id: "task-analytics",
      title: "Task Analytics Report",
      description: "Comprehensive task completion and efficiency metrics",
      icon: BarChart3,
      category: "Tasks",
      lastGenerated: "2024-01-13"
    },
    {
      id: "leave-summary",
      title: "Leave Summary Report",
      description: "Analysis of leave patterns and team availability",
      icon: Calendar,
      category: "HR",
      lastGenerated: "2024-01-12"
    },
    {
      id: "team-overview",
      title: "Team Overview Report",
      description: "Comprehensive team performance and metrics dashboard",
      icon: Users,
      category: "Management",
      lastGenerated: "2024-01-15"
    }
  ];

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "Outstanding":
        return <Badge className="bg-success text-success-foreground">Outstanding</Badge>;
      case "Excellent":
        return <Badge className="bg-primary text-primary-foreground">Excellent</Badge>;
      case "Good":
        return <Badge className="bg-warning text-warning-foreground">Good</Badge>;
      case "Needs Improvement":
        return <Badge variant="destructive">Needs Improvement</Badge>;
      default:
        return <Badge variant="secondary">{rating}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "On Track":
        return <Badge className="bg-success text-success-foreground">On Track</Badge>;
      case "Ahead":
        return <Badge className="bg-primary text-primary-foreground">Ahead</Badge>;
      case "Delayed":
        return <Badge variant="destructive">Delayed</Badge>;
      case "At Risk":
        return <Badge className="bg-warning text-warning-foreground">At Risk</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleExport = (format: string, reportId: string) => {
    console.log(`Exporting ${reportId} as ${format}`);
    // Handle export logic here
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and export team performance reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{reportData.taskMetrics.completionRate}%</div>
            <div className="text-sm text-muted-foreground">Task Completion Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {Math.round(reportData.teamProductivity.reduce((sum, p) => sum + p.efficiency, 0) / reportData.teamProductivity.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Team Efficiency</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{reportData.leaveStatistics.averageDays}</div>
            <div className="text-sm text-muted-foreground">Avg Leave Days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(reportData.projectStatus.reduce((sum, p) => sum + p.progress, 0) / reportData.projectStatus.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Project Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {availableReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <report.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{report.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Last: {new Date(report.lastGenerated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport("pdf", report.id)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport("csv", report.id)}
                      >
                        CSV
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Productivity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Team Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.teamProductivity.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{member.employee}</p>
                    <p className="text-xs text-muted-foreground">{member.tasksCompleted} tasks completed</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{member.efficiency}%</span>
                    {getRatingBadge(member.rating)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Project Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.projectStatus.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{project.project}</p>
                    <p className="text-xs text-muted-foreground">Budget: ${project.budget.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{project.progress}%</span>
                    {getStatusBadge(project.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleExport("pdf", "comprehensive")}>
              <Download className="w-4 h-4 mr-2" />
              Export All Reports (PDF)
            </Button>
            <Button variant="outline" onClick={() => handleExport("csv", "data")}>
              <Download className="w-4 h-4 mr-2" />
              Export Raw Data (CSV)
            </Button>
            <Button variant="outline" onClick={() => handleExport("xlsx", "excel")}>
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}