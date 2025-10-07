import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  BarChart3
} from 'lucide-react';
import {
  attendanceAnalytics,
  taskAnalytics,
  leaveAnalytics,
  departmentPerformance
} from '@/data/mockData';

const InternReports = () => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights and business intelligence
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold text-foreground">142</p>
                <Badge variant="secondary" className="mt-1">+8% this month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Productivity</p>
                <p className="text-2xl font-bold text-foreground">94%</p>
                <Badge variant="secondary" className="mt-1">+5% this month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-warning rounded-2xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Leave Requests</p>
                <p className="text-2xl font-bold text-foreground">28</p>
                <Badge variant="secondary" className="mt-1">12 pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-info rounded-2xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Hours/Day</p>
                <p className="text-2xl font-bold text-foreground">8.2</p>
                <Badge variant="secondary" className="mt-1">Target: 8h</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="present" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Project progress tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="toDo" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Leave Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of leave types requested this year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveAnalytics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}% is for ${name} Leave`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {leaveAnalytics.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Efficiency and satisfaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="department" width={80} />
                <Tooltip />
                <Bar dataKey="efficiency" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="satisfaction" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternReports;