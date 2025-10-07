import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DollarSign, 
  Download, 
  FileText,
  TrendingDown,
  Activity
} from "lucide-react";

const quarterlyData = [
  { quarter: "Q1 2023", revenue: 2800000, expenses: 2200000, profit: 600000 },
  { quarter: "Q2 2023", revenue: 3200000, expenses: 2500000, profit: 700000 },
  { quarter: "Q3 2023", revenue: 3500000, expenses: 2700000, profit: 800000 },
  { quarter: "Q4 2023", revenue: 3800000, expenses: 2900000, profit: 900000 },
];

const monthlyData = [
  { month: "Jul", revenue: 1200000, expenses: 950000 },
  { month: "Aug", revenue: 1150000, expenses: 920000 },
  { month: "Sep", revenue: 1300000, expenses: 980000 },
  { month: "Oct", revenue: 1250000, expenses: 960000 },
  { month: "Nov", revenue: 1400000, expenses: 1020000 },
  { month: "Dec", revenue: 1350000, expenses: 990000 },
];

const expenseBreakdown = [
  { name: "Salaries", value: 45, amount: 1305000, color: "hsl(var(--chart-1))" },
  { name: "Operations", value: 25, amount: 725000, color: "hsl(var(--chart-2))" },
  { name: "Marketing", value: 15, amount: 435000, color: "hsl(var(--chart-3))" },
  { name: "Technology", value: 10, amount: 290000, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 5, amount: 145000, color: "hsl(var(--chart-5))" },
];

const reports = [
  {
    name: "Q4 2023 Financial Summary",
    type: "Quarterly Report",
    date: "2024-01-15",
    status: "Published",
    size: "2.4 MB"
  },
  {
    name: "November 2023 Expense Report",
    type: "Monthly Report",
    date: "2023-12-05",
    status: "Published", 
    size: "1.8 MB"
  },
  {
    name: "Annual Budget 2024",
    type: "Budget Plan",
    date: "2023-12-20",
    status: "Draft",
    size: "3.2 MB"
  },
  {
    name: "Department Cost Analysis",
    type: "Analysis Report",
    date: "2024-01-10",
    status: "Published",
    size: "1.5 MB"
  }
];

const FinancialReports = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive financial analysis and reporting
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3.8M</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">
                +12.5%
              </Badge>{" "}
              from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.9M</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">
                -3.2%
              </Badge>{" "}
              from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$900K</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">
                +28.6%
              </Badge>{" "}
              from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <Activity className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.7%</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">
                +4.1%
              </Badge>{" "}
              from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quarterly Performance */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              Quarterly Performance
            </CardTitle>
            <CardDescription>Revenue, expenses, and profit by quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, ""]}
                />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" />
                <Bar dataKey="expenses" fill="hsl(var(--chart-2))" name="Expenses" />
                <Bar dataKey="profit" fill="hsl(var(--chart-3))" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-chart-2" />
              Monthly Trend (Last 6 Months)
            </CardTitle>
            <CardDescription>Revenue vs expenses trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, ""]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Breakdown */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-chart-3" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Current quarter expense distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">${(item.amount / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="lg:col-span-2 shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-chart-4" />
              Recent Reports
            </CardTitle>
            <CardDescription>Latest financial reports and documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{report.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{report.type}</span>
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={report.status === "Published" ? "default" : "secondary"}
                    >
                      {report.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
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

export default FinancialReports;