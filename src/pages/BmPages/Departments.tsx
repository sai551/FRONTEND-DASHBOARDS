import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, TrendingUp, Target } from "lucide-react";

export default function Departments() {
  const departments = [
    {
      name: "Engineering",
      head: "John Smith",
      employees: 45,
      budget: 850000,
      budgetUsed: 67,
      performance: 92,
      projects: 8
    },
    {
      name: "Marketing",
      head: "Lisa Brown",
      employees: 18,
      budget: 320000,
      budgetUsed: 74,
      performance: 88,
      projects: 5
    },
    {
      name: "Human Resources",
      head: "David Wilson",
      employees: 12,
      budget: 180000,
      budgetUsed: 56,
      performance: 85,
      projects: 3
    },
    {
      name: "Finance",
      head: "Maria Garcia",
      employees: 15,
      budget: 240000,
      budgetUsed: 63,
      performance: 94,
      projects: 4
    },
    {
      name: "Design",
      head: "Alex Johnson",
      employees: 22,
      budget: 450000,
      budgetUsed: 71,
      performance: 89,
      projects: 6
    },
    {
      name: "Operations",
      head: "Robert Lee",
      employees: 28,
      budget: 380000,
      budgetUsed: 68,
      performance: 91,
      projects: 7
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground mt-1">
            Overview of all organizational departments and their performance
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Department Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">140</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-success" />
              <div className="text-2xl font-bold">$2.4M</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold">89%</div>
            </div>
            <p className="text-xs text-muted-foreground">Avg Performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">33</div>
            </div>
            <p className="text-xs text-muted-foreground">Active Projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card key={department.name} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{department.name}</span>
                <Badge variant="outline">{department.employees} employees</Badge>
              </CardTitle>
              <CardDescription>
                Department Head: {department.head}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Budget Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget Usage</span>
                  <span className="font-medium">{department.budgetUsed}%</span>
                </div>
                <Progress value={department.budgetUsed} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  ${(department.budget * department.budgetUsed / 100).toLocaleString()} of ${department.budget.toLocaleString()}
                </div>
              </div>

              {/* Performance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Performance Score</span>
                  <span className="font-medium">{department.performance}%</span>
                </div>
                <Progress value={department.performance} className="h-2" />
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{department.projects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{department.employees}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}