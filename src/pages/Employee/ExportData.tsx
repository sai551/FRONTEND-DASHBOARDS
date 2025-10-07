import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileSpreadsheet,
  Download,
  FileText,
  BarChart3,
  Users,
  CheckSquare,
  Calendar,
  Database,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import {
  employees,
  tasks,
  leaveRequests,
  leaveAnalytics,
  departmentPerformance,
} from '@/data/mockData';

const ExportData = () => {
  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  // Data stats
  const totalEmployees = employees.length;
  const totalTasks = tasks.length;
  const totalLeaves = leaveRequests.length;

  const handleExport = (format: string, type: string) => {
    // This is just a mock handler for now
    alert(`Exporting ${type} data as ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Export Data</h1>
          <p className="text-muted-foreground mt-1">
            Export employees, tasks, leaves and department data in multiple formats.
          </p>
        </div>
        <Button variant="violet">
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Quick Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Employees Data
            </CardTitle>
            <CardDescription>Total Employees: {totalEmployees}</CardDescription>
          </CardHeader>
          <CardContent className="flex space-x-2">
            <Button variant="outline" onClick={() => handleExport('CSV', 'Employees')}>
              <Download className="h-4 w-4 mr-1" /> CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('Excel', 'Employees')}>
              <Download className="h-4 w-4 mr-1" /> Excel
            </Button>
            <Button variant="outline" onClick={() => handleExport('PDF', 'Employees')}>
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="h-5 w-5 mr-2 text-success" />
              Tasks Data
            </CardTitle>
            <CardDescription>Total Tasks: {totalTasks}</CardDescription>
          </CardHeader>
          <CardContent className="flex space-x-2">
            <Button variant="outline" onClick={() => handleExport('CSV', 'Tasks')}>
              <Download className="h-4 w-4 mr-1" /> CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('Excel', 'Tasks')}>
              <Download className="h-4 w-4 mr-1" /> Excel
            </Button>
            <Button variant="outline" onClick={() => handleExport('PDF', 'Tasks')}>
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-warning" />
              Leave Data
            </CardTitle>
            <CardDescription>Total Leave Requests: {totalLeaves}</CardDescription>
          </CardHeader>
          <CardContent className="flex space-x-2">
            <Button variant="outline" onClick={() => handleExport('CSV', 'Leaves')}>
              <Download className="h-4 w-4 mr-1" /> CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('Excel', 'Leaves')}>
              <Download className="h-4 w-4 mr-1" /> Excel
            </Button>
            <Button variant="outline" onClick={() => handleExport('PDF', 'Leaves')}>
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Distribution */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-info" />
              Leave Distribution (Preview)
            </CardTitle>
            <CardDescription>Breakdown of leaves by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveAnalytics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {leaveAnalytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-info" />
              Department Performance (Preview)
            </CardTitle>
            <CardDescription>Efficiency & Satisfaction Scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformance} layout="vertical" barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="department" width={100} />
                <Tooltip />
                <Bar
                  dataKey="efficiency"
                  fill="#3B82F6"
                  name="Efficiency"
                  radius={[0, 4, 4, 0]}
                  label={{ position: 'right', fill: '#3B82F6', fontSize: 12 }}
                />
                <Bar
                  dataKey="satisfaction"
                  fill="#8B5CF6"
                  name="Satisfaction"
                  radius={[0, 4, 4, 0]}
                  label={{ position: 'right', fill: '#8B5CF6', fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Database Backup Section */}
      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-primary" />
            Full Database Backup
          </CardTitle>
          <CardDescription>
            Export and download the entire company database as a single archive.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-3">
          <Button variant="outline" onClick={() => handleExport('ZIP', 'Full Database')}>
            <Download className="h-4 w-4 mr-2" /> Download Backup (ZIP)
          </Button>
          <Button variant="violet">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Schedule Auto-Backup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportData;
