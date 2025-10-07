import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 1200000, growth: 8.2 },
  { month: "Feb", revenue: 1350000, growth: 12.5 },
  { month: "Mar", revenue: 1180000, growth: -12.6 },
  { month: "Apr", revenue: 1450000, growth: 22.9 },
  { month: "May", revenue: 1620000, growth: 11.7 },
  { month: "Jun", revenue: 1890000, growth: 16.7 },
  { month: "Jul", revenue: 2100000, growth: 11.1 },
  { month: "Aug", revenue: 2350000, growth: 11.9 },
  { month: "Sep", revenue: 2180000, growth: -7.2 },
  { month: "Oct", revenue: 2420000, growth: 11.0 },
  { month: "Nov", revenue: 2650000, growth: 9.5 },
  { month: "Dec", revenue: 2400000, growth: -9.4 },
];

const departmentData = [
  { name: "Engineering", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "Marketing", value: 20, color: "hsl(30, 15%, 75%)" },
  { name: "Sales", value: 25, color: "hsl(142, 76%, 36%)" },
  { name: "HR", value: 10, color: "hsl(0, 84%, 60%)" },
  { name: "Finance", value: 10, color: "hsl(270, 50%, 50%)" },
];

const projectData = [
  { department: "Engineering", completed: 12, ongoing: 8, total: 20 },
  { department: "Marketing", completed: 6, ongoing: 4, total: 10 },
  { department: "Sales", completed: 8, ongoing: 6, total: 14 },
  { department: "HR", completed: 4, ongoing: 2, total: 6 },
  { department: "Finance", completed: 5, ongoing: 3, total: 8 },
];

const budgetData = [
  { category: "Salaries", amount: 45, color: "hsl(217, 91%, 60%)" },
  { category: "Operations", amount: 25, color: "hsl(30, 15%, 75%)" },
  { category: "Technology", amount: 15, color: "hsl(142, 76%, 36%)" },
  { category: "Marketing", amount: 10, color: "hsl(0, 84%, 60%)" },
  { category: "Other", amount: 5, color: "hsl(270, 50%, 50%)" },
];

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
      {/* Revenue Growth Chart */}
      <Card className="dashboard-card xl:col-span-2 p-3 md:p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-base md:text-lg font-semibold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            Company Revenue Growth
            <span className="text-xs md:text-sm font-normal text-muted-foreground">(Last 12 Months)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Revenue"]}
                labelClassName="text-foreground"
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Distribution */}
      <Card className="dashboard-card p-3 md:p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-base md:text-lg font-semibold">Employee Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
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

      {/* Project Status by Department */}
      <Card className="dashboard-card p-3 md:p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-base md:text-lg font-semibold">Project Status by Department</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="department" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="hsl(var(--success))" name="Completed" />
              <Bar dataKey="ongoing" fill="hsl(var(--primary))" name="Ongoing" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}