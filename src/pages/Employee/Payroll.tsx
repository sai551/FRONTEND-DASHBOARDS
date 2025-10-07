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
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Wallet
} from 'lucide-react';

// Mock Data
const salaryDistribution = [
  { department: 'HR', salary: 320000 },
  { department: 'IT', salary: 1200000 },
  { department: 'Sales', salary: 800000 },
  { department: 'Finance', salary: 500000 }
];

const payrollTrends = [
  { month: 'Jan', total: 280000, bonuses: 40000 },
  { month: 'Feb', total: 300000, bonuses: 60000 },
  { month: 'Mar', total: 350000, bonuses: 70000 },
  { month: 'Apr', total: 370000, bonuses: 80000 },
  { month: 'May', total: 400000, bonuses: 90000 },
  { month: 'Jun', total: 420000, bonuses: 100000 }
];

const paymentStatus = [
  { name: 'Paid', count: 95 },
  { name: 'Pending', count: 5 }
];

const salaryGrowth = [
  { month: 'Jan', avgSalary: 55000 },
  { month: 'Feb', avgSalary: 56000 },
  { month: 'Mar', avgSalary: 58000 },
  { month: 'Apr', avgSalary: 60000 },
  { month: 'May', avgSalary: 62000 },
  { month: 'Jun', avgSalary: 64000 }
];

const Payroll = () => {
  const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll & Compensation</h1>
          <p className="text-muted-foreground mt-1">
            Salary management, payment status, and trends
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Payroll Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payroll</p>
                <p className="text-2xl font-bold text-foreground">$3.5M</p>
                <Badge variant="secondary" className="mt-1">+10% YoY</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employees Paid</p>
                <p className="text-2xl font-bold text-foreground">95</p>
                <Badge variant="secondary" className="mt-1">+5 this month</Badge>
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
                <p className="text-sm font-medium text-muted-foreground">Next Pay Date</p>
                <p className="text-2xl font-bold text-foreground">28 Jul</p>
                <Badge variant="secondary" className="mt-1">On Schedule</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-info rounded-2xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Salary</p>
                <p className="text-2xl font-bold text-foreground">$64K</p>
                <Badge variant="secondary" className="mt-1">+7% YoY</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Payroll Trends</CardTitle>
            <CardDescription>Monthly payroll and bonuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={payrollTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bonuses" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Distribution of paid vs pending salaries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  dataKey="count"
                >
                  {paymentStatus.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Salary Growth</CardTitle>
            <CardDescription>Average salary growth over months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgSalary" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Salary Distribution by Department</CardTitle>
            <CardDescription>Total salary allocated per department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" />
                <Tooltip />
                <Bar dataKey="salary" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payroll;
