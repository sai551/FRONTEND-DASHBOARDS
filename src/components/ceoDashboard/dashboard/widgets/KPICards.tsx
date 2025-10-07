import { Users, FolderOpen, DollarSign, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpiData = [
  {
    title: "Total Employees",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Projects", 
    value: "67",
    change: "+8.2%",
    trend: "up",
    icon: FolderOpen,
    color: "text-green-600", 
    bgColor: "bg-green-50",
  },
  {
    title: "Monthly Revenue",
    value: "$2.4M",
    change: "+15.3%",
    trend: "up", 
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Leaves Today",
    value: "23",
    change: "-5.1%",
    trend: "down",
    icon: Calendar,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="kpi-card group p-3 md:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className={`p-1.5 md:p-2 rounded-lg ${kpi.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <kpi.icon className={`h-4 w-4 md:h-5 md:w-5 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl md:text-2xl font-bold text-foreground">{kpi.value}</div>
                <div className="flex items-center mt-1">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-success mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 md:h-4 md:w-4 text-destructive mr-1" />
                  )}
                  <span className={`text-xs md:text-sm font-medium ${
                    kpi.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground ml-1 hidden sm:inline">vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}