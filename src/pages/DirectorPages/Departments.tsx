import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, TrendingUp, Plus } from "lucide-react";

const departments = [
  {
    name: "Engineering",
    employees: 450,
    budget: "$2.5M",
    performance: 95,
    head: "Sarah Johnson",
    status: "Active"
  },
  {
    name: "Sales",
    employees: 320,
    budget: "$1.8M",
    performance: 88,
    head: "Mike Chen",
    status: "Active"
  },
  {
    name: "Marketing", 
    employees: 180,
    budget: "$1.2M",
    performance: 92,
    head: "Emily Davis",
    status: "Active"
  },
  {
    name: "Human Resources",
    employees: 85,
    budget: "$800K",
    performance: 90,
    head: "Robert Wilson",
    status: "Active"
  },
  {
    name: "Finance",
    employees: 65,
    budget: "$600K",
    performance: 94,
    head: "Lisa Anderson",
    status: "Active"
  },
  {
    name: "Operations",
    employees: 134,
    budget: "$1.1M",
    performance: 87,
    head: "David Brown",
    status: "Active"
  }
];

const Departments = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all company departments
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <Card key={index} className="shadow-dashboard-md hover:shadow-dashboard-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {dept.name}
                </div>
                <Badge variant="secondary">{dept.status}</Badge>
              </CardTitle>
              <CardDescription>Head: {dept.head}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Employees</span>
                  </div>
                  <p className="font-semibold">{dept.employees}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Budget</span>
                  </div>
                  <p className="font-semibold">{dept.budget}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span className="text-sm font-medium">{dept.performance}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${dept.performance}%` }}
                  />
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;