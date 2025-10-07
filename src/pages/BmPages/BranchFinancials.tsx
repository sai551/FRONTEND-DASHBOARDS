import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  Calculator,
  FileText,
  AlertTriangle,
  CreditCard
} from "lucide-react";

export default function BranchFinancials() {
  const financialMetrics = [
    {
      title: "Total Revenue",
      value: "$487,250",
      change: "+15.2%",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Operating Costs",
      value: "$312,800",
      change: "+8.1%",
      icon: Calculator,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Net Profit",
      value: "$174,450",
      change: "+18.7%",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Profit Margin",
      value: "35.8%",
      change: "+2.1%",
      icon: PieChart,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  const revenueStreams = [
    { source: "Product Sales", amount: "$298,500", percentage: 61, trend: "up" },
    { source: "Service Contracts", amount: "$134,200", percentage: 28, trend: "up" },
    { source: "Consultancy", amount: "$54,550", percentage: 11, trend: "down" }
  ];

  const expenseCategories = [
    { category: "Personnel", amount: "$187,200", percentage: 60, budget: "$190,000" },
    { category: "Office Operations", amount: "$78,400", percentage: 25, budget: "$75,000" },
    { category: "Marketing", amount: "$31,200", percentage: 10, budget: "$35,000" },
    { category: "Technology", amount: "$16,000", percentage: 5, budget: "$18,000" }
  ];

  const monthlyComparison = [
    { month: "October", revenue: "$445,200", expenses: "$298,100", profit: "$147,100" },
    { month: "November", revenue: "$487,250", expenses: "$312,800", profit: "$174,450" },
    { month: "December (Proj.)", revenue: "$510,000", expenses: "$325,000", profit: "$185,000" }
  ];

  const cashFlow = [
    {
      type: "Accounts Receivable",
      amount: "$125,400",
      status: "pending",
      dueDate: "Dec 15, 2024"
    },
    {
      type: "Accounts Payable",
      amount: "$67,800",
      status: "due",
      dueDate: "Dec 10, 2024"
    },
    {
      type: "Pending Invoices",
      amount: "$89,200",
      status: "sent",
      dueDate: "Dec 20, 2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning text-warning-foreground";
      case "due": return "bg-destructive text-destructive-foreground";
      case "sent": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Branch Financials</h1>
          <p className="text-muted-foreground mt-1">
            Monitor financial performance, revenue, and expenses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            Budget Planning
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`font-medium ${metric.color}`}>{metric.change}</span> vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Streams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Streams
            </CardTitle>
            <CardDescription>
              Income breakdown by source
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueStreams.map((stream) => (
              <div key={stream.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stream.source}</span>
                    {stream.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stream.amount}</span>
                    <span className="text-xs text-muted-foreground">
                      {stream.percentage}%
                    </span>
                  </div>
                </div>
                <Progress value={stream.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Expense Categories
            </CardTitle>
            <CardDescription>
              Cost breakdown vs budget allocation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenseCategories.map((expense) => (
              <div key={expense.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{expense.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{expense.amount}</span>
                    <span className="text-xs text-muted-foreground">
                      of {expense.budget}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(parseInt(expense.amount.replace(/[$,]/g, '')) / parseInt(expense.budget.replace(/[$,]/g, ''))) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Monthly Financial Comparison
          </CardTitle>
          <CardDescription>
            Revenue, expenses, and profit trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monthlyComparison.map((month) => (
              <div key={month.month} className="p-4 rounded-lg border bg-card">
                <h4 className="font-medium text-foreground mb-3">{month.month}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium text-success">{month.revenue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expenses</span>
                    <span className="font-medium text-destructive">{month.expenses}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="font-medium">Net Profit</span>
                    <span className="font-bold text-primary">{month.profit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow & Outstanding */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Cash Flow Management
            </CardTitle>
            <CardDescription>
              Pending receivables and payables
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cashFlow.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{item.type}</span>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">{item.amount}</span>
                  <span className="text-sm text-muted-foreground">Due: {item.dueDate}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Financial Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Financial Alerts
            </CardTitle>
            <CardDescription>
              Important notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium">Budget Alert</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Office Operations exceeded budget by 4.5%
                </p>
              </div>

              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Revenue Growth</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  15.2% increase in monthly revenue
                </p>
              </div>

              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Payment Due</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  $67,800 in vendor payments due Dec 10
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}