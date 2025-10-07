import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";

export default function Employees() {
  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Developer",
      department: "Engineering",
      status: "Active",
      email: "sarah@company.com",
      joinDate: "2022-03-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Manager",
      department: "Marketing",
      status: "Active",
      email: "michael@company.com",
      joinDate: "2021-08-20"
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "HR Specialist",
      department: "Human Resources",
      status: "On Leave",
      email: "emily@company.com",
      joinDate: "2023-01-10"
    },
    {
      id: 4,
      name: "James Wilson",
      position: "Product Designer",
      department: "Design",
      status: "Active",
      email: "james@company.com",
      joinDate: "2022-11-05"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and their information
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search employees..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Total Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">On Leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            A comprehensive list of all team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={employee.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <p className="text-xs text-muted-foreground">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium">{employee.department}</p>
                    <p className="text-xs text-muted-foreground">Joined {employee.joinDate}</p>
                  </div>
                  <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                    {employee.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}