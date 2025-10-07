import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  FolderKanban, 
  Activity,
  Calendar,
  Target,
  Award
} from "lucide-react";

const kpiData = [
  {
    title: "Total Employees",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-chart-1"
  },
  {
    title: "Active Projects",
    value: "45",
    change: "+3%",
    trend: "up", 
    icon: FolderKanban,
    color: "text-chart-2"
  },
  {
    title: "Monthly Revenue",
    value: "$2.4M",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "text-chart-3"
  },
  {
    title: "Department Score",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: Target,
    color: "text-chart-4"
  }
];

const monthlyData = [
  { month: "Jan", revenue: 2200000, expenses: 1800000 },
  { month: "Feb", revenue: 2100000, expenses: 1750000 },
  { month: "Mar", revenue: 2400000, expenses: 1900000 },
  { month: "Apr", revenue: 2300000, expenses: 1850000 },
  { month: "May", revenue: 2600000, expenses: 2000000 },
  { month: "Jun", revenue: 2400000, expenses: 1900000 },
];

const employeeData = [
  { month: "Jan", employees: 1150 },
  { month: "Feb", employees: 1180 },
  { month: "Mar", employees: 1200 },
  { month: "Apr", employees: 1220 },
  { month: "May", employees: 1234 },
  { month: "Jun", employees: 1234 },
];

const departmentData = [
  { name: "Engineering", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Sales", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Marketing", value: 20, color: "hsl(var(--chart-3))" },
  { name: "HR", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Finance", value: 8, color: "hsl(var(--chart-5))" },
];

const recentProjects = [
  { name: "Mobile App Redesign", status: "In Progress", progress: 75, deadline: "2024-02-15" },
  { name: "Database Migration", status: "Completed", progress: 100, deadline: "2024-01-30" },
  { name: "Marketing Campaign", status: "Planning", progress: 25, deadline: "2024-03-01" },
  { name: "Security Audit", status: "In Progress", progress: 60, deadline: "2024-02-20" },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, Director. Here's what's happening at your company today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="shadow-dashboard-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-success">
                    {kpi.change}
                  </Badge>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              Revenue vs Expenses
            </CardTitle>
            <CardDescription>Monthly comparison for this year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, ""]}
                />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" />
                <Bar dataKey="expenses" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Employee Growth */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-chart-2" />
              Employee Growth
            </CardTitle>
            <CardDescription>Total employees over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="employees" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-chart-3" />
              Department Distribution
            </CardTitle>
            <CardDescription>Employee distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="lg:col-span-2 shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-chart-4" />
              Recent Projects
            </CardTitle>
            <CardDescription>Current project status and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant={project.status === "Completed" ? "default" : "secondary"}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;