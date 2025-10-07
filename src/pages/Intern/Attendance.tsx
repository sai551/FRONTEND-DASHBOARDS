import React from 'react';

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
  Users,
  CalendarCheck,
  CalendarX,
  Clock
} from 'lucide-react';

// ========================== MOCK DATA =============================

const monthlyAttendance = [
  { month: 'Jan', present: 240, absent: 20, late: 10 },
  { month: 'Feb', present: 230, absent: 25, late: 12 },
  { month: 'Mar', present: 250, absent: 18, late: 8 },
  { month: 'Apr', present: 260, absent: 22, late: 5 },
  { month: 'May', present: 255, absent: 15, late: 9 },
  { month: 'Jun', present: 270, absent: 12, late: 6 }
];

const statusDistribution = [
  { name: 'Present', value: 85 },
  { name: 'Absent', value: 10 },
  { name: 'Late', value: 5 }
];

const departmentWiseAttendance = [
  { department: 'Sales', attendance: 92 },
  { department: 'HR', attendance: 88 },
  { department: 'Finance', attendance: 95 },
  { department: 'IT', attendance: 90 },
];

const leaveRequestsTrend = [
  { month: 'Jan', requests: 12 },
  { month: 'Feb', requests: 15 },
  { month: 'Mar', requests: 10 },
  { month: 'Apr', requests: 9 },
  { month: 'May', requests: 13 },
  { month: 'Jun', requests: 8 }
];


const InternAttendance = () => {
  const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Report</h1>
          <p className="text-muted-foreground mt-1">
            Track employee attendance, absenteeism, and late arrivals
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className='hover:bg-violet-700'>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant='default'>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Employees */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold text-foreground">300</p>
                <Badge variant="secondary" className="mt-1">Company wide</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Present */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <CalendarCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                <p className="text-2xl font-bold text-foreground">270</p>
                <Badge variant="secondary" className="mt-1">+3% vs yesterday</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Absent */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-warning rounded-2xl">
                <CalendarX className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
                <p className="text-2xl font-bold text-foreground">20</p>
                <Badge variant="secondary" className="mt-1">-1% vs yesterday</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Late */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-info rounded-2xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late Arrivals</p>
                <p className="text-2xl font-bold text-foreground">10</p>
                <Badge variant="secondary" className="mt-1">No change</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
            <CardDescription>Present, Absent & Late</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Status Distribution */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Today's attendance status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Attendance */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Department-wise Attendance</CardTitle>
            <CardDescription>Attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentWiseAttendance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="department" type="category" />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leave Requests Trend */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Leave Requests Trend</CardTitle>
            <CardDescription>Monthly leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={leaveRequestsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.5} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternAttendance;
