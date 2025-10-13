


import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Building2,
  MoreHorizontal,
  Eye,
  Edit,
  UserPlus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddEmployee from "./AddEmployee";

// ----------------------------
// Interfaces
// ----------------------------
interface Role {
  roleId: number;
  name: string;
  description: string;
}

interface Department {
  departmentId: number;
  name: string;
  description: string;
}

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  roleId: number;
  departmentId: number;
  designationId: number;
  doj: string;
  status: string;
}

// ----------------------------
// Component
// ----------------------------
const Employeess = () => {
  const { toast } = useToast();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // ✅ Auth header helper
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // ✅ Fetch employees, roles, departments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, roleRes, deptRes] = await Promise.all([
          axios.get("http://localhost:3000/employees/getAll", getAuthHeaders()),
          axios.get("http://localhost:3000/roles/get_Roles", getAuthHeaders()),
          axios.get("http://localhost:3000/department/get_dept", getAuthHeaders()),
        ]);

        // ✅ Handle possible object structure
        const empData = Array.isArray(empRes.data)
          ? empRes.data
          : empRes.data?.data || [];

        setEmployees(empData);
        setRoles(Array.isArray(roleRes.data) ? roleRes.data : []);
        setDepartments(Array.isArray(deptRes.data) ? deptRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast({ title: "Error", description: "Failed to load employees" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Defensive fallback for filters
  const safeEmployees = Array.isArray(employees) ? employees : [];

  // ✅ Stats (Safe filtering)
  const totalEmployees = safeEmployees.length;
  const activeEmployees = safeEmployees.filter(
    (e) => e?.status?.toLowerCase() === "active"
  ).length;
  const inactiveEmployees = safeEmployees.filter(
    (e) => e?.status?.toLowerCase() === "inactive"
  ).length;
  const totalDepartments = departments.length;

  // ✅ Filtering Logic
  const filteredEmployees = safeEmployees.filter((employee) => {
    const fullName = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`;
    const matchesSearch =
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.departmentId?.toString() === selectedDepartment;

    const matchesStatus =
      selectedStatus === "all" ||
      employee.status?.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getRoleName = (id: number) =>
    roles.find((r) => r.roleId === id)?.name || "Unknown";

  const getDepartmentName = (id: number) =>
    departments.find((d) => d.departmentId === id)?.name || "Unknown";

  // ✅ Loading State
  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  // ----------------------------
  // ✅ Render
  // ----------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members
          </p>
        </div>

        <Button
          className="bg-orange-600/20 text-black"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Total Employees
              </h3>
              <p className="mt-1 text-2xl font-bold">{totalEmployees}</p>
            </div>
            <Users className="h-5 w-5 text-indigo-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Active
              </h3>
              <p className="mt-1 text-2xl font-bold text-green-600">
                {activeEmployees}
              </p>
            </div>
            <UserCheck className="h-5 w-5 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Inactive
              </h3>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {inactiveEmployees}
              </p>
            </div>
            <UserX className="h-5 w-5 text-red-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Departments
              </h3>
              <p className="mt-1 text-2xl font-bold">{totalDepartments}</p>
            </div>
            <Building2 className="h-5 w-5 text-yellow-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem
                    key={dept.departmentId}
                    value={dept.departmentId.toString()}
                  >
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="lg:w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Total Employees ({filteredEmployees.length})</CardTitle>
          <CardDescription>Manage your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell className="font-mono text-sm text-gray-600">
                        {employee.employeeId}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-semibold text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {employee.username} - {employee.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{getRoleName(employee.roleId)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {getDepartmentName(employee.departmentId)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status?.toLowerCase() === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(employee.doj).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                toast({
                                  title: "View",
                                  description: employee.email,
                                })
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toast({
                                  title: "Edit Clicked",
                                  description: employee.firstName,
                                })
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-gray-500"
                    >
                      No employees found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white max-w-4xl my-1 max-h-[100vh] overflow-y-auto" id="scrollbar-hide">
          <DialogHeader />
          <AddEmployee />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employeess;
