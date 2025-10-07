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
  CheckCircle,
  AlertCircle,
  Timer,
  PauseCircle,
  TrendingUp,
  Users
} from 'lucide-react';

// ========================== MOCK DATA =============================

const projectSummary = [
  { name: 'Completed', value: 18 },
  { name: 'In Progress', value: 10 },
  { name: 'Delayed', value: 5 },
  { name: 'On Hold', value: 3 }
];

const projectTimeline = [
  { month: 'Jan', completed: 5, inProgress: 2, delayed: 1 },
  { month: 'Feb', completed: 6, inProgress: 4, delayed: 1 },
  { month: 'Mar', completed: 4, inProgress: 3, delayed: 2 },
  { month: 'Apr', completed: 7, inProgress: 2, delayed: 1 },
  { month: 'May', completed: 5, inProgress: 3, delayed: 2 },
  { month: 'Jun', completed: 8, inProgress: 2, delayed: 1 }
];

const projectDepartments = [
  { department: 'DevOps', activeProjects: 6 },
  { department: 'Sales', activeProjects: 3 },
  { department: 'IT', activeProjects: 4 },
  { department: 'Finance', activeProjects: 2 },
  { department: 'HR', activeProjects: 1 }
];

const teamPerformance = [
  { team: 'Team A', progress: 88 },
  { team: 'Team B', progress: 75 },
  { team: 'Team C', progress: 92 },
  { team: 'Team D', progress: 70 }
];

// ==================================================================

const InternProjectStatus = () => {
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Status</h1>
          <p className="text-muted-foreground mt-1">
            Track ongoing, completed, and delayed projects across departments
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Completed Projects */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Projects</p>
                <p className="text-2xl font-bold text-foreground">18</p>
                <Badge variant="secondary" className="mt-1">+3 this month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Timer className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">10</p>
                <Badge variant="secondary" className="mt-1">On schedule</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delayed */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-warning rounded-2xl">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-foreground">5</p>
                <Badge variant="secondary" className="mt-1">2 critical</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* On Hold */}
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-info rounded-2xl">
                <PauseCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Hold</p>
                <p className="text-2xl font-bold text-foreground">3</p>
                <Badge variant="secondary" className="mt-1">Review needed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Overview Pie Chart */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectSummary}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {projectSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Timeline Chart */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Completed vs In Progress vs Delayed</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects per Department */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Projects by Department</CardTitle>
            <CardDescription>Current active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectDepartments} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" />
                <Tooltip />
                <Bar dataKey="activeProjects" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Progress */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Progress by project team</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternProjectStatus;
