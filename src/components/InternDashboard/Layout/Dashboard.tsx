



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Update the import path to the correct location of StatsCard
import StatsCard from '@/components/InternDashboard/Dashboard/StatsCard';
import {
  Users,
  CheckSquare,
  Calendar,
  TrendingUp,
  Clock,
  Plus,
  FileText,
  UserPlus,
  BarChart3
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
  AreaChart,
  Area
} from 'recharts';
import { 
  employees, 
  tasks, 
  leaveRequests, 
  attendanceAnalytics, 
  taskAnalytics, 
  leaveAnalytics,
  departmentPerformance 
} from '@/data/mockData';

const InternDashboard = () => {
  // Calculate stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingLeaves = leaveRequests.filter(leave => leave.status === 'Pending').length;
  const totalLeaves = leaveRequests.length;

  const taskCompletionRate = Math.round((completedTasks / totalTasks) * 100);
  const employeeGrowth = '+12%';
  const taskEfficiency = '+8%';
  const attendanceRate = '94%';

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground"> INTERN Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back to Intern Dashboard! Here you can manage your tasks, track attendance, and monitor our performance.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className='hover:bg-violet-700'>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          {/* <Button variant="violet">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={totalEmployees}
          change={employeeGrowth}
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-primary"
          description={`${activeEmployees} active employees`}
        />
        <StatsCard
          title="Tasks Completed"
          value={`${completedTasks}/${totalTasks}`}
          change={taskEfficiency}
          changeType="positive"
          icon={CheckSquare}
          gradient="bg-gradient-success"
          description={`${taskCompletionRate}% completion rate`}
        />
        <StatsCard
          title="Pending Leaves"
          value={pendingLeaves}
          change={`${totalLeaves} total`}
          changeType="neutral"
          icon={Calendar}
          gradient="bg-gradient-warning"
          description="Awaiting approval"
        />
        <StatsCard
          title="Attendance Rate"
          value={attendanceRate}
          change="+2%"
          changeType="positive"
          icon={Clock}
          gradient="bg-gradient-info"
          description="This month"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Analytics */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Attendance Analytics
            </CardTitle>
            <CardDescription>
              Monthly attendance trends and patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="present" 
                  stackId="1"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="late" 
                  stackId="1"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="absent" 
                  stackId="1"
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Progress */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="h-5 w-5 mr-2 text-success" />
              Task Progress
            </CardTitle>
            <CardDescription>
              Project completion and workflow status
            </CardDescription>
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Distribution */}
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

        {/* Department Performance with grouped bar chart */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-info" />
              Department Performance
            </CardTitle>
            <CardDescription>
              Efficiency and satisfaction metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={departmentPerformance} 
                layout="vertical"
                barCategoryGap="20%"
              >
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

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Employee
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-custom-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'New employee Sandeep K joined Marketing department',
                  time: '2 hours ago',
                  type: 'user',
                  icon: Users,
                  color: 'text-primary'
                },
                {
                  action: 'Task "Database Migration" marked as completed',
                  time: '3 hours ago',
                  type: 'task',
                  icon: CheckSquare,
                  color: 'text-success'
                },
                {
                  action: 'Leave request fromVijay B approved',
                  time: '5 hours ago',
                  type: 'leave',
                  icon: Calendar,
                  color: 'text-warning'
                },
                {
                  action: 'Monthly attendance report generated',
                  time: '1 day ago',
                  type: 'report',
                  icon: FileText,
                  color: 'text-info'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternDashboard;
