import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Target,
  BarChart3,
  Download,
  Calendar,
  Users,
  ShoppingCart
} from "lucide-react";

export default function SalesReports() {
  const salesMetrics = [
    {
      title: "Monthly Revenue",
      value: "$248,500",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Sales Target",
      value: "89%",
      change: "Target: $280K",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "New Customers",
      value: "156",
      change: "+23 this week",
      icon: Users,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+3.2% vs last month",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  const topProducts = [
    { name: "Premium Account", revenue: "$89,500", percentage: 36, trend: "up" },
    { name: "Business Package", revenue: "$67,200", percentage: 27, trend: "up" },
    { name: "Standard Plan", revenue: "$54,800", percentage: 22, trend: "down" },
    { name: "Starter Package", revenue: "$37,000", percentage: 15, trend: "up" }
  ];

  const recentSales = [
    {
      customer: "TechCorp Solutions",
      amount: "$15,500",
      product: "Premium Account",
      date: "2 hours ago",
      status: "completed"
    },
    {
      customer: "Design Studio Inc",
      amount: "$8,750",
      product: "Business Package",
      date: "4 hours ago",
      status: "completed"
    },
    {
      customer: "StartUp Co",
      amount: "$5,200",
      product: "Standard Plan",
      date: "6 hours ago",
      status: "pending"
    },
    {
      customer: "Local Business",
      amount: "$2,100",
      product: "Starter Package",
      date: "1 day ago",
      status: "completed"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Reports</h1>
          <p className="text-muted-foreground mt-1">
            Track sales performance, revenue, and growth metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric) => (
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
                <span className={`font-medium ${metric.color}`}>{metric.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Performing Products
            </CardTitle>
            <CardDescription>
              Revenue breakdown by product category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{product.name}</span>
                    <TrendingUp 
                      className={`h-3 w-3 ${
                        product.trend === 'up' ? 'text-success' : 'text-destructive'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{product.revenue}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.percentage}%
                    </span>
                  </div>
                </div>
                <Progress value={product.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Sales
            </CardTitle>
            <CardDescription>
              Latest transactions and deals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{sale.customer}</span>
                    <Badge variant={sale.status === "completed" ? "default" : "secondary"}>
                      {sale.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{sale.product}</span>
                      <span className="font-medium">{sale.amount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{sale.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Sales
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sales Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quarterly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">$750K</div>
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <Progress value={66} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                66% complete - $495K achieved
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Deal Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">$6,250</div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +15% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pipeline Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">$425K</div>
              <DollarSign className="h-8 w-8 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              32 active opportunities
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}