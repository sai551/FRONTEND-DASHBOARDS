import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  UserCheck, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const HRPayroll = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">HR & Payroll</h1>
        <p className="text-muted-foreground mt-2">
          Human resources management and payroll processing
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">+2.3%</Badge> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.5M</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">+1.8%</Badge> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <UserCheck className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-warning">-5 positions</Badge> this week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">+0.3</Badge> from last survey
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Status */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-chart-2" />
              Payroll Status
            </CardTitle>
            <CardDescription>Current payroll cycle progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Payroll Processing</span>
                <Badge className="bg-success text-success-foreground">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Tax Calculations</span>
                <Badge className="bg-warning text-warning-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  In Progress
                </Badge>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Payment Dispatch</span>
                <Badge variant="secondary">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              </div>
              <Progress value={25} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next Payroll Date:</span>
                <span className="font-medium">February 15, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-dashboard-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-chart-1" />
              Recent HR Activities
            </CardTitle>
            <CardDescription>Latest human resources updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-chart-1 rounded-full mt-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">New employee onboarding completed</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson joined Engineering team</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-chart-2 rounded-full mt-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Performance review cycle started</p>
                  <p className="text-xs text-muted-foreground">Q1 2024 reviews for all departments</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-chart-3 rounded-full mt-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Benefits enrollment reminder sent</p>
                  <p className="text-xs text-muted-foreground">Annual benefits enrollment deadline: March 1</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-chart-4 rounded-full mt-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Training program launched</p>
                  <p className="text-xs text-muted-foreground">Leadership development program for managers</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <Card className="shadow-dashboard-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-chart-3" />
            Department Payroll Breakdown
          </CardTitle>
          <CardDescription>Payroll distribution across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Engineering", employees: 450, payroll: "$3.2M", avg: "$7,111" },
              { name: "Sales", employees: 320, payroll: "$2.1M", avg: "$6,563" },
              { name: "Marketing", employees: 180, payroll: "$1.4M", avg: "$7,778" },
              { name: "Operations", employees: 134, payroll: "$850K", avg: "$6,343" },
              { name: "Finance", employees: 85, payroll: "$680K", avg: "$8,000" },
              { name: "HR", employees: 65, payroll: "$420K", avg: "$6,462" }
            ].map((dept, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-lg">
                <h3 className="font-semibold">{dept.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employees:</span>
                    <span className="font-medium">{dept.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Payroll:</span>
                    <span className="font-medium">{dept.payroll}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Salary:</span>
                    <span className="font-medium">{dept.avg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRPayroll;