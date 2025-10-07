import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin,
  Calendar
} from "lucide-react";

const employees = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice.cooper@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "2022-03-15",
    location: "New York, NY",
    avatar: "/placeholder.svg"
  },
  {
    id: 2, 
    name: "Bob Smith",
    email: "bob.smith@company.com",
    phone: "+1 (555) 234-5678",
    department: "Sales",
    position: "Sales Manager",
    status: "Active",
    joinDate: "2021-08-22",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Carol Johnson",
    email: "carol.johnson@company.com", 
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    position: "Marketing Specialist",
    status: "On Leave",
    joinDate: "2023-01-10",
    location: "Chicago, IL",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@company.com",
    phone: "+1 (555) 456-7890",
    department: "HR",
    position: "HR Coordinator",
    status: "Active",
    joinDate: "2022-11-05",
    location: "Miami, FL",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva.martinez@company.com",
    phone: "+1 (555) 567-8901",
    department: "Finance",
    position: "Financial Analyst",
    status: "Active",
    joinDate: "2021-06-18",
    location: "Seattle, WA",
    avatar: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Frank Chen",
    email: "frank.chen@company.com",
    phone: "+1 (555) 678-9012", 
    department: "Engineering",
    position: "Tech Lead",
    status: "Active",
    joinDate: "2020-09-12",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg"
  }
];

const Employees = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "On Leave":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-2">
            Manage your company workforce
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-dashboard-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="shadow-dashboard-md hover:shadow-dashboard-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription>{employee.position}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Joined {new Date(employee.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <Badge variant="outline">{employee.department}</Badge>
              </div>
              
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Employees;