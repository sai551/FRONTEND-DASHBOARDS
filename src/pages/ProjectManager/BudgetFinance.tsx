import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  FileText,
  Clock,
  CreditCard,
  PieChart,
  BarChart3,
  Download,
  Plus
} from "lucide-react";

export default function BudgetFinance() {
  const budgetOverview = [
    {
      title: "Total Budget",
      value: "$720K",
      description: "Allocated across all projects",
      icon: DollarSign,
      trend: "0%",
      trendDirection: "neutral"
    },
    {
      title: "Spent to Date",
      value: "$485K",
      description: "67% of total budget used",
      icon: CreditCard,
      trend: "+12%",
      trendDirection: "up"
    },
    {
      title: "Remaining Budget",
      value: "$235K",
      description: "33% available for allocation",
      icon: PieChart,
      trend: "-12%",
      trendDirection: "down"
    },
    {
      title: "Projected Spend",
      value: "$680K",
      description: "Estimated total project cost",
      icon: TrendingUp,
      trend: "+5%",
      trendDirection: "up"
    }
  ];

  const projectBudgets = [
    {
      name: "E-commerce Platform",
      allocated: 125000,
      spent: 98750,
      remaining: 26250,
      percentage: 79,
      status: "On Track",
      forecast: 122000,
      dueDate: "2024-03-15"
    },
    {
      name: "Mobile Banking App",
      allocated: 180000,
      spent: 125000,
      remaining: 55000,
      percentage: 69,
      status: "At Risk",
      forecast: 195000,
      dueDate: "2024-04-20"
    },
    {
      name: "Healthcare Portal",
      allocated: 95000,
      spent: 88500,
      remaining: 6500,
      percentage: 93,
      status: "Over Budget",
      forecast: 98000,
      dueDate: "2024-02-28"
    },
    {
      name: "Learning Management System",
      allocated: 150000,
      spent: 45000,
      remaining: 105000,
      percentage: 30,
      status: "Under Budget",
      forecast: 135000,
      dueDate: "2024-05-10"
    },
    {
      name: "Inventory Management",
      allocated: 200000,
      spent: 75000,
      remaining: 125000,
      percentage: 38,
      status: "On Track",
      forecast: 185000,
      dueDate: "2024-06-30"
    }
  ];

  const pendingInvoices = [
    {
      id: "INV-001",
      vendor: "AWS Cloud Services",
      amount: 2500,
      dueDate: "2024-03-05",
      status: "pending",
      category: "Infrastructure"
    },
    {
      id: "INV-002",
      vendor: "Design Studio Pro",
      amount: 8500,
      dueDate: "2024-03-10",
      status: "overdue",
      category: "Design Services"
    },
    {
      id: "INV-003",
      vendor: "Development Tools Inc",
      amount: 1200,
      dueDate: "2024-03-15",
      status: "pending",
      category: "Software Licenses"
    },
    {
      id: "INV-004",
      vendor: "Security Solutions",
      amount: 3500,
      dueDate: "2024-03-20",
      status: "approved",
      category: "Security Services"
    }
  ];

  const monthlyForecast = [
    { month: "March 2024", projected: 85000, actual: 78000, variance: -7000 },
    { month: "April 2024", projected: 95000, actual: null, variance: null },
    { month: "May 2024", projected: 110000, actual: null, variance: null },
    { month: "June 2024", projected: 75000, actual: null, variance: null }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "bg-green-100 text-green-800";
      case "At Risk": return "bg-yellow-100 text-yellow-800";
      case "Over Budget": return "bg-red-100 text-red-800";
      case "Under Budget": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "approved": return "bg-green-100 text-green-800";
      case "paid": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget & Finance Overview</h1>
          <p className="text-muted-foreground">
            Monitor project budgets, track expenses, and manage financial forecasts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Request Budget
          </Button>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {budgetOverview.map((budget, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{budget.title}</CardTitle>
              <budget.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{budget.value}</div>
              <p className="text-xs text-muted-foreground">{budget.description}</p>
              <div className="flex items-center mt-2">
                {budget.trendDirection === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : budget.trendDirection === "down" ? (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                ) : (
                  <div className="h-3 w-3 bg-gray-400 rounded-full mr-1" />
                )}
                <span className={`text-xs ${
                  budget.trendDirection === "up" ? "text-green-500" : 
                  budget.trendDirection === "down" ? "text-red-500" : "text-gray-500"
                }`}>
                  {budget.trend} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Project Budgets</TabsTrigger>
          <TabsTrigger value="invoices">Pending Invoices</TabsTrigger>
          <TabsTrigger value="forecast">Financial Forecast</TabsTrigger>
          <TabsTrigger value="analytics">Budget Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Budget Overview</CardTitle>
              <CardDescription>Budget allocation and spending across all active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectBudgets.map((project, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{project.name}</h4>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ${(project.spent/1000).toFixed(0)}K / ${(project.allocated/1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Due: {project.dueDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Utilization</span>
                        <span>{project.percentage}%</span>
                      </div>
                      <Progress value={project.percentage} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Remaining</div>
                        <div className="font-medium">${(project.remaining/1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Forecast</div>
                        <div className="font-medium">${(project.forecast/1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Variance</div>
                        <div className={`font-medium ${
                          project.forecast > project.allocated ? "text-red-600" : "text-green-600"
                        }`}>
                          {project.forecast > project.allocated ? "+" : ""}
                          ${((project.forecast - project.allocated)/1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Alerts</CardTitle>
              <CardDescription>Important budget notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800">Budget Exceeded</span>
                  </div>
                  <p className="text-sm text-red-700">
                    Healthcare Portal project has exceeded its allocated budget by $3K
                  </p>
                </div>
                <div className="p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Budget Warning</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Mobile Banking App is approaching 85% budget utilization
                  </p>
                </div>
                <div className="p-3 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Under Budget</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Learning Management System is 40% under budget with good progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending Invoices</CardTitle>
                <CardDescription>Bills and invoices awaiting approval or payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingInvoices.map((invoice) => (
                    <div 
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{invoice.vendor}</span>
                          <Badge className={getInvoiceStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.id} • {invoice.category}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Due: {invoice.dueDate}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${invoice.amount.toLocaleString()}</div>
                        <Button variant="outline" size="sm" className="mt-1">
                          {invoice.status === "pending" ? "Approve" : 
                           invoice.status === "overdue" ? "Pay Now" : "View"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
                <CardDescription>Quick overview of invoice status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-muted-foreground">Pending Approval</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-muted-foreground">Overdue</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Pending Amount</span>
                    <span className="font-medium">$15,700</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="font-medium">3.2 days</span>
                  </div>
                </div>

                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Process All Pending
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Forecast</CardTitle>
              <CardDescription>Projected spending and budget requirements for upcoming months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyForecast.map((month, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{month.month}</h4>
                      <div className="text-sm text-muted-foreground">
                        {month.actual ? "Actual vs Projected" : "Projected Spending"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${(month.projected/1000).toFixed(0)}K projected
                      </div>
                      {month.actual && (
                        <div className="text-sm">
                          ${(month.actual/1000).toFixed(0)}K actual
                          <span className={`ml-2 ${month.variance! < 0 ? "text-green-600" : "text-red-600"}`}>
                            ({month.variance! < 0 ? "" : "+"}${(month.variance!/1000).toFixed(0)}K)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Budget Recommendations</CardTitle>
                <CardDescription>AI-powered budget optimization suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Cost Savings Opportunity</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Consolidating cloud services could save $5K monthly
                  </p>
                </div>
                <div className="p-3 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Reallocation Suggestion</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Move $15K from Learning Management to Mobile Banking project
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common budget management tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Request Additional Budget
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Budget Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Financial Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Analytics Dashboard</CardTitle>
              <CardDescription>Visual analytics and insights for budget performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Advanced Analytics</h3>
                <p className="text-gray-500 mb-6">
                  Interactive charts and graphs for budget analysis would be displayed here using libraries like Chart.js or D3.js
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline">Spend Analysis</Button>
                  <Button variant="outline">Cost Breakdown</Button>
                  <Button variant="outline">Trend Analysis</Button>
                  <Button variant="outline">ROI Metrics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}