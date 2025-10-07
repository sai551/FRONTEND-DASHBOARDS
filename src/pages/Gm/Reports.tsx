import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, BarChart3 } from "lucide-react";

export default function GmReports() {
  const reports = [
    {
      title: "Monthly Performance Report",
      description: "Comprehensive analysis of departmental performance",
      type: "Performance",
      lastGenerated: "2024-02-01",
      size: "2.3 MB"
    },
    {
      title: "Attendance Summary",
      description: "Employee attendance patterns and statistics",
      type: "Attendance",
      lastGenerated: "2024-02-05",
      size: "1.8 MB"
    },
    {
      title: "Budget Analysis",
      description: "Financial overview and budget utilization",
      type: "Financial",
      lastGenerated: "2024-01-30",
      size: "3.1 MB"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and download organizational reports
          </p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">15</div>
            </div>
            <p className="text-xs text-muted-foreground">Available Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-success" />
              <div className="text-2xl font-bold">8</div>
            </div>
            <p className="text-xs text-muted-foreground">Downloaded This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold">5</div>
            </div>
            <p className="text-xs text-muted-foreground">Scheduled Reports</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Available reports for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.type} • Generated {report.lastGenerated} • {report.size}
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}