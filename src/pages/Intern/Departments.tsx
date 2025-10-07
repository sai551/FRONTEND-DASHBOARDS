import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Building2,
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  UserCheck,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { departments, employees, departmentPerformance } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const InternDepartments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter departments
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (deptName: string) => {
    toast({
      title: 'Edit Department',
      description: `Opening edit form for ${deptName}`,
    });
  };

  const handleDelete = (deptName: string) => {
    toast({
      title: 'Department Deleted',
      description: `${deptName} department has been removed`,
      variant: 'destructive',
    });
  };

  // Calculate department stats
  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  const avgEmployeesPerDept = Math.round(totalEmployees / totalDepartments);

  // Department size distribution for pie chart
  const departmentSizes = departments.map(dept => ({
    name: dept.name,
    value: dept.employeeCount,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage organizational departments and structure
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Department</DialogTitle>
              <DialogDescription>
                Add a new department to your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="deptName">Department Name</Label>
                <Input id="deptName" placeholder="Enter department name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Department Manager</Label>
                <Input id="manager" placeholder="Enter manager name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe department responsibilities"
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsAddDialogOpen(false);
                  toast({
                    title: 'Department Created',
                    description: 'New department has been successfully created',
                  });
                }}>
                  Create Department
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Departments</p>
                <p className="text-2xl font-bold text-foreground">{totalDepartments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold text-foreground">{totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-info rounded-2xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg per Department</p>
                <p className="text-2xl font-bold text-foreground">{avgEmployeesPerDept}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Efficiency and satisfaction metrics by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="efficiency" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="satisfaction" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Size Distribution */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Department Size Distribution</CardTitle>
            <CardDescription>
              Employee distribution across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentSizes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentSizes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-custom-md">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments or managers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="shadow-custom-md hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <CardDescription>{department.description}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(department.name)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(department.name)}
                      className="text-danger focus:text-danger"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Manager Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Manager</span>
                  </div>
                  <span className="text-sm font-medium">{department.manager}</span>
                </div>

                {/* Employee Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Employees</span>
                  </div>
                  <Badge variant="secondary">
                    {department.employeeCount} members
                  </Badge>
                </div>

                {/* Performance Indicators */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency</span>
                    <span className="font-medium">
                      {departmentPerformance.find(p => p.department === department.name)?.efficiency || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${departmentPerformance.find(p => p.department === department.name)?.efficiency || 0}%` 
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Satisfaction</span>
                    <span className="font-medium">
                      {departmentPerformance.find(p => p.department === department.name)?.satisfaction || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-success h-2 rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${departmentPerformance.find(p => p.department === department.name)?.satisfaction || 0}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    View Employees
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InternDepartments;
