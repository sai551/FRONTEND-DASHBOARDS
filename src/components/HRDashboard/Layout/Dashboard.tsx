


import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
;
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
  employees as dummyEmployees,
  tasks as dummyTasks,
  leaveRequests as dummyLeaveRequests,
  attendanceAnalytics as dummyAttendanceAnalytics,
  taskAnalytics as dummyTaskAnalytics,
  leaveAnalytics as dummyLeaveAnalytics,
  departmentPerformance as dummyDepartmentPerformance
} from '@/data/mockData';
import StatsCard from '../Dashboard/StatsCard';

const HRDashboard = () => {
  // States
  const [employees, setEmployees] = useState(dummyEmployees);
  const [tasks, setTasks] = useState(dummyTasks);
  const [leaveRequests, setLeaveRequests] = useState(dummyLeaveRequests);
  const [attendanceAnalytics, setAttendanceAnalytics] = useState(dummyAttendanceAnalytics);
  const [taskAnalytics, setTaskAnalytics] = useState(dummyTaskAnalytics);
  const [leaveAnalytics, setLeaveAnalytics] = useState(dummyLeaveAnalytics);
  const [departmentPerformance, setDepartmentPerformance] = useState(dummyDepartmentPerformance);

  // CRUD base URL
  const API_BASE = 'http://localhost:3000/hrdashboard'; // change to your backend URL

  // ===== CRUD Functions =====
  // Employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees`);
      setEmployees(res.data);
    } catch {
      setEmployees(dummyEmployees);
    }
  };
  const addEmployee = async (employee) => {
    try {
      const res = await axios.post(`${API_BASE}/employees/create`, employee);
      setEmployees([...employees, res.data]);
    } catch (err) {
      console.error('Add employee failed:', err);
    }
  };
  const updateEmployee = async (id, updated) => {
    try {
      const res = await axios.put(`${API_BASE}/employees/${id}`, updated);
      setEmployees(employees.map(emp => emp.id === id ? res.data : emp));
    } catch (err) {
      console.error('Update employee failed:', err);
    }
  };
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_BASE}/employees/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      console.error('Delete employee failed:', err);
    }
  };

  // Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      setTasks(res.data);
    } catch {
      setTasks(dummyTasks);
    }
  };
  const addTask = async (task) => {
    try {
      const res = await axios.post(`${API_BASE}/tasks`, task);
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error('Add task failed:', err);
    }
  };
  const updateTask = async (id, updated) => {
    try {
      const res = await axios.put(`${API_BASE}/tasks/${id}`, updated);
      setTasks(tasks.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error('Update task failed:', err);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete task failed:', err);
    }
  };

  // Leave Requests
  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${API_BASE}/leaves`);
      setLeaveRequests(res.data);
    } catch {
      setLeaveRequests(dummyLeaveRequests);
    }
  };
  const addLeave = async (leave) => {
    try {
      const res = await axios.post(`${API_BASE}/leaves`, leave);
      setLeaveRequests([...leaveRequests, res.data]);
    } catch (err) {
      console.error('Add leave failed:', err);
    }
  };
  const updateLeave = async (id, updated) => {
    try {
      const res = await axios.put(`${API_BASE}/leaves/${id}`, updated);
      setLeaveRequests(leaveRequests.map(l => l.id === id ? res.data : l));
    } catch (err) {
      console.error('Update leave failed:', err);
    }
  };
  const deleteLeave = async (id) => {
    try {
      await axios.delete(`${API_BASE}/leaves/${id}`);
      setLeaveRequests(leaveRequests.filter(l => l.id !== id));
    } catch (err) {
      console.error('Delete leave failed:', err);
    }
  };

  // Analytics fetch
  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_BASE}/analytics`);
      setAttendanceAnalytics(res.data.attendance || dummyAttendanceAnalytics);
      setTaskAnalytics(res.data.tasks || dummyTaskAnalytics);
      setLeaveAnalytics(res.data.leaves || dummyLeaveAnalytics);
      setDepartmentPerformance(res.data.departments || dummyDepartmentPerformance);
    } catch {
      setAttendanceAnalytics(dummyAttendanceAnalytics);
      setTaskAnalytics(dummyTaskAnalytics);
      setLeaveAnalytics(dummyLeaveAnalytics);
      setDepartmentPerformance(dummyDepartmentPerformance);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchEmployees();
    fetchTasks();
    fetchLeaves();
    fetchAnalytics();
  }, []);

  // Stats
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
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground"> HR Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at your company today.
          </p>
        </div>
        {/* <div className="flex space-x-3">
          <Button variant="outline" className='hover:bg-violet-700'>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="violet">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div> */}
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
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-warning" />
              Leave Distribution
            </CardTitle>
            <CardDescription>
              Types of leaves taken this year
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
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Quick Actions */}
        <Card className="shadow-custom-md ">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-orange-600/20 text-black hover:text-black"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Employee
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start hover:bg-orange-600/20 text-black hover:text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start hover:bg-orange-600/20 text-black hover:text-black"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start hover:bg-orange-600/20 text-black hover:text-black"
            >
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
                  action: 'New employee K Sandeep joined Marketing department',
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
                  action: 'Leave request from Sandeep K approved',
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

export default HRDashboard;