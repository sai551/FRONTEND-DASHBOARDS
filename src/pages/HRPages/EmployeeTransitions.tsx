

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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Repeat,
  FileText,
  Download,
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building2,
  Award,
  UserX,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Interfaces
interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentName?: string;
  roleName?: string;
}

interface EmployeePromotion {
  id: number;
  employeeId: string;
  currentPosition: string;
  newPosition: string;
  currentDepartment: string;
  newDepartment: string;
  promotionDate: string;
  effectiveDate: string;
  salaryIncrease?: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  employee?: Employee;
}

interface EmployeeTransfer {
  id: number;
  employeeId: string;
  fromBranch: string;
  toBranch: string;
  fromDepartment: string;
  toDepartment: string;
  transferDate: string;
  effectiveDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  employee?: Employee;
}

interface Resignation {
  id: number;
  employeeId: string;
  resignationDate: string;
  lastWorkingDay: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  employee?: Employee;
}

const EmployeeTransitions = () => {
  const { toast } = useToast();
  const COLORS = ["#10B981", "#EF4444", "#3B82F6"];
  
  // State for all transitions
  const [promotions, setPromotions] = useState<EmployeePromotion[]>([]);
  const [transfers, setTransfers] = useState<EmployeeTransfer[]>([]);
  const [resignations, setResignations] = useState<Resignation[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [branches, setBranches] = useState<{id: number, name: string}[]>([]);
  const [departments, setDepartments] = useState<{departmentId: number, name: string}[]>([]);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Dialog States
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedTransition, setSelectedTransition] = useState<any>(null);
  const [transitionType, setTransitionType] = useState<'promotion' | 'transfer' | 'resignation'>('promotion');
  
  // Form States
  const [promotionForm, setPromotionForm] = useState({
    employeeId: "",
    promotedBy: "", // Added required field
    newRole: "", // Added required field  
    promotionDate: "",
    remarks: "", // Changed from reason to remarks
  });
  
  const [transferForm, setTransferForm] = useState({
    employeeId: "",
    fromBranchId: "", // Changed to ID
    toBranchId: "", // Changed to ID
    fromDepartmentId: "", // Changed to ID
    toDepartmentId: "", // Changed to ID
    transferDate: "",
    reason: "",
  });
  
  const [resignationForm, setResignationForm] = useState({
    employeeId: "",
    resignedAt: "", // Changed from resignationDate to resignedAt
    reason: "",
  });

  // Constants
  const promotionReasons = [
    "Performance Excellence",
    "Skill Development",
    "Leadership Qualities",
    "Project Success",
    "Tenure Achievement",
    "Educational Qualification",
    "Other",
  ];

  const transferReasons = [
    "Operational Requirements",
    "Career Development",
    "Skill Utilization",
    "Workload Distribution",
    "Employee Request",
    "Department Restructuring",
    "Project Assignment",
    "Geographic Preference",
    "Other",
  ];

  const resignationReasons = [
    "Better Opportunity",
    "Career Change",
    "Personal Reasons",
    "Health Issues",
    "Family Reasons",
    "Relocation",
    "Salary/Compensation",
    "Work Environment",
    "Other",
  ];

  // Auth header helper
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [promotionsRes, transfersRes, resignationsRes, employeesRes, branchesRes, departmentsRes] = await Promise.all([
        axios.get("http://localhost:3000/employee-promotions", getAuthHeaders()),
        axios.get("http://localhost:3000/employee-transfers", getAuthHeaders()),
        axios.get("http://localhost:3000/resignations", getAuthHeaders()),
        axios.get("http://localhost:3000/employees/getAll", getAuthHeaders()),
        axios.get("http://localhost:3000/branches/getAllBranches", getAuthHeaders()),
        axios.get("http://localhost:3000/department/get_dept", getAuthHeaders()),
      ]);

      setPromotions(Array.isArray(promotionsRes.data) ? promotionsRes.data : []);
      setTransfers(Array.isArray(transfersRes.data) ? transfersRes.data : []);
      setResignations(Array.isArray(resignationsRes.data) ? resignationsRes.data : []);
      
      let empData = [];
      if (employeesRes.data?.data && Array.isArray(employeesRes.data.data)) {
        empData = employeesRes.data.data;
      } else if (Array.isArray(employeesRes.data)) {
        empData = employeesRes.data;
      }
      setEmployees(empData);
      
      setBranches(Array.isArray(branchesRes.data) ? branchesRes.data.map((b: any) => ({ id: b.branchId, name: b.name })) : [{ id: 1, name: "Main Branch" }]);
      setDepartments(Array.isArray(departmentsRes.data) ? departmentsRes.data.map((d: any) => ({ departmentId: d.departmentId, name: d.name })) : [{ departmentId: 1, name: "Default Department" }]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Set fallback data
      setBranches([{ id: 1, name: "Main Branch" }]);
      setDepartments([{ departmentId: 1, name: "Default Department" }]);
      toast({
        title: "Error",
        description: "Failed to load transition data",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create functions
  const createPromotion = async () => {
    try {
      // Validate required fields
      if (!promotionForm.employeeId || !promotionForm.promotedBy || !promotionForm.newRole || !promotionForm.promotionDate) {
        toast({ title: "Error", description: "Please fill in all required fields" });
        return;
      }
      
      await axios.post("http://localhost:3000/employee-promotions", promotionForm, getAuthHeaders());
      toast({ title: "Success", description: "Promotion created successfully" });
      setIsCreateDialogOpen(false);
      resetPromotionForm();
      fetchAllData();
    } catch (error) {
      console.error("Promotion creation error:", error);
      toast({ title: "Error", description: "Failed to create promotion" });
    }
  };

  const createTransfer = async () => {
    try {
      // Validate required fields
      if (!transferForm.employeeId || !transferForm.fromBranchId || !transferForm.toBranchId || 
          !transferForm.fromDepartmentId || !transferForm.toDepartmentId || !transferForm.transferDate) {
        toast({ title: "Error", description: "Please fill in all required fields" });
        return;
      }
      
      await axios.post("http://localhost:3000/employee-transfers", transferForm, getAuthHeaders());
      toast({ title: "Success", description: "Transfer created successfully" });
      setIsCreateDialogOpen(false);
      resetTransferForm();
      fetchAllData();
    } catch (error) {
      console.error("Transfer creation error:", error);
      toast({ title: "Error", description: "Failed to create transfer" });
    }
  };

  const createResignation = async () => {
    try {
      // Validate required fields
      if (!resignationForm.employeeId || !resignationForm.resignedAt || !resignationForm.reason) {
        toast({ title: "Error", description: "Please fill in all required fields" });
        return;
      }
      
      // Convert datetime-local to ISO string for backend (DTO expects ISO format string)
      const formattedData = {
        employeeId: resignationForm.employeeId,
        reason: resignationForm.reason,
        resignedAt: resignationForm.resignedAt ? new Date(resignationForm.resignedAt).toISOString() : new Date().toISOString()
      };
      
      await axios.post("http://localhost:3000/resignations", formattedData, getAuthHeaders());
      toast({ title: "Success", description: "Resignation created successfully" });
      setIsCreateDialogOpen(false);
      resetResignationForm();
      fetchAllData();
    } catch (error) {
      console.error("Resignation creation error:", error);
      toast({ title: "Error", description: "Failed to create resignation" });
    }
  };

  // Delete functions
  const deleteTransition = async (id: number, type: string) => {
    try {
      const endpoint = type === 'promotion' ? 'employee-promotions' : 
                      type === 'transfer' ? 'employee-transfers' : 'resignations';
      await axios.delete(`http://localhost:3000/${endpoint}/${id}`, getAuthHeaders());
      toast({ title: "Success", description: `${type} deleted successfully` });
      fetchAllData();
    } catch (error) {
      toast({ title: "Error", description: `Failed to delete ${type}` });
    }
  };

  // Reset forms
  const resetPromotionForm = () => {
    setPromotionForm({
      employeeId: "", promotedBy: "", newRole: "", promotionDate: "", remarks: "",
    });
  };

  const resetTransferForm = () => {
    setTransferForm({
      employeeId: "", fromBranchId: "", toBranchId: "", fromDepartmentId: "", toDepartmentId: "",
      transferDate: "", reason: "",
    });
  };

  const resetResignationForm = () => {
    setResignationForm({
      employeeId: "", resignedAt: "", reason: "",
    });
  };

  // Open create dialog
  const openCreateDialog = (type: 'promotion' | 'transfer' | 'resignation') => {
    setTransitionType(type);
    setIsCreateDialogOpen(true);
  };

  // Filter data
  const filteredPromotions = promotions.filter((promotion) => {
    const employee = employees.find(emp => emp.employeeId === promotion.employeeId);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : "";
    const matchesSearch = employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         promotion.currentPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         promotion.newPosition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || promotion.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredTransfers = transfers.filter((transfer) => {
    const employee = employees.find(emp => emp.employeeId === transfer.employeeId);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : "";
    const matchesSearch = employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.fromBranch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.toBranch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || transfer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredResignations = resignations.filter((resignation) => {
    const employee = employees.find(emp => emp.employeeId === resignation.employeeId);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : "";
    const matchesSearch = employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resignation.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || resignation.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Stats for overview
  const totalPromotions = promotions.length;
  const totalTransfers = transfers.length;
  const totalResignations = resignations.length;
  const totalTransitions = totalPromotions + totalTransfers + totalResignations;

  const pendingPromotions = promotions.filter(p => p.status === 'pending').length;
  const pendingTransfers = transfers.filter(t => t.status === 'pending').length;
  const pendingResignations = resignations.filter(r => r.status === 'pending').length;

  const approvedPromotions = promotions.filter(p => p.status === 'approved').length;
  const approvedTransfers = transfers.filter(t => t.status === 'approved').length;
  const approvedResignations = resignations.filter(r => r.status === 'approved').length;

  // Chart data
  const transitionData = [
    { type: "Promotions", count: totalPromotions, color: "#10B981" },
    { type: "Transfers", count: totalTransfers, color: "#3B82F6" },
    { type: "Resignations", count: totalResignations, color: "#EF4444" },
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading employee transitions...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Transitions</h1>
          <p className="text-muted-foreground mt-1">
            Manage employee promotions, transfers, and resignations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="hover:bg-orange-600/20 hover:text-black"
          >
            <Download className="h-4 w-4 mr-2" /> Export Data
          </Button>
          <Button className="bg-orange-600/20 text-black hover:text-black">
            <FileText className="h-4 w-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Transitions Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Total Transitions
                </h3>
                <p className="text-3xl font-bold text-gray-900">{totalTransitions}</p>
                <p className="text-xs text-gray-500">All employee movements</p>
            </div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotions Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Promotions
                </h3>
                <p className="text-3xl font-bold text-green-600">{totalPromotions}</p>
                <p className="text-xs text-gray-500">Career advancements</p>
            </div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <ArrowUpCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transfers Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Transfers
                </h3>
                <p className="text-3xl font-bold text-blue-600">{totalTransfers}</p>
                <p className="text-xs text-gray-500">Location changes</p>
            </div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Repeat className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resignations Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Resignations
                </h3>
                <p className="text-3xl font-bold text-red-600">{totalResignations}</p>
                <p className="text-xs text-gray-500">Exit requests</p>
            </div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                <UserX className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different transition types */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="resignations">Resignations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Pie Chart */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-800">Transition Distribution</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Overview of all employee transitions
            </CardDescription>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
          </CardHeader>
              <CardContent className="pt-0">
                <div className="select-none" style={{ outline: 'none' }}>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart style={{ outline: 'none' }}>
                    <Pie
                      data={transitionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                      stroke="none"
                      strokeWidth={0}
                    >
                      {transitionData.map((entry, index) => (
                        <Cell 
                          key={index} 
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={2}
                          style={{ outline: 'none' }}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        padding: '12px 16px'
                      }}
                      formatter={(value: any, name: any, props: any) => [
                        `${value} ${value === 1 ? 'transition' : 'transitions'}`,
                        props.payload.type
                      ]}
                    />
                    
              </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Custom Legend with Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                  {transitionData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">{item.type}</span>
                      </div>
                      <div className="text-2xl font-bold" style={{ color: item.color }}>
                        {item.count}
                      </div>
                      <div className="text-xs text-gray-500">
                        {totalTransitions > 0 ? ((item.count / totalTransitions) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  ))}
                </div>
          </CardContent>
        </Card>

            {/* Enhanced Bar Chart */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-800">Status Overview</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Pending vs Approved transitions
                    </CardDescription>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
          </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart 
                    data={[
                      { 
                        status: "Pending", 
                        count: pendingPromotions + pendingTransfers + pendingResignations,
                        color: "#F59E0B"
                      },
                      { 
                        status: "Approved", 
                        count: approvedPromotions + approvedTransfers + approvedResignations,
                        color: "#10B981"
                      },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="approvedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="status" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 14, fontWeight: 600, fill: '#374151' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        padding: '12px 16px'
                      }}
                      formatter={(value: any) => [
                        `${value} ${value === 1 ? 'transition' : 'transitions'}`,
                        'Count'
                      ]}
                    />
                    <Bar 
                      dataKey="count" 
                      radius={[8, 8, 0, 0]}
                      maxBarSize={80}
                    >
                      {[
                        { status: "Pending", count: pendingPromotions + pendingTransfers + pendingResignations },
                        { status: "Approved", count: approvedPromotions + approvedTransfers + approvedResignations },
                      ].map((entry, index) => (
                        <Cell 
                          key={index} 
                          fill={entry.status === "Pending" ? "url(#pendingGradient)" : "url(#approvedGradient)"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
            </ResponsiveContainer>
                
                {/* Status Summary */}
                <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Pending</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {pendingPromotions + pendingTransfers + pendingResignations}
                    </div>
                    <div className="text-xs text-gray-500">Awaiting approval</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Approved</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {approvedPromotions + approvedTransfers + approvedResignations}
                    </div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>
          </CardContent>
        </Card>
      </div>

          {/* Enhanced Quick Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-800">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Create new employee transitions
                  </CardDescription>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Promotion Action */}
                <div 
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:border-green-200 transition-all duration-300 cursor-pointer"
                  onClick={() => openCreateDialog('promotion')}
                >
                  <div className="p-6 h-32 flex flex-col items-center justify-center relative z-10">
                    <div className="h-14 w-14 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300 flex items-center justify-center mb-3">
                      <ArrowUpCircle className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-800 text-center">Create Promotion</h3>
                    <p className="text-xs text-green-600 text-center mt-1">Career advancement</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Transfer Action */}
                <div 
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 hover:border-blue-200 transition-all duration-300 cursor-pointer"
                  onClick={() => openCreateDialog('transfer')}
                >
                  <div className="p-6 h-32 flex flex-col items-center justify-center relative z-10">
                    <div className="h-14 w-14 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex items-center justify-center mb-3">
                      <Repeat className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-blue-800 text-center">Create Transfer</h3>
                    <p className="text-xs text-blue-600 text-center mt-1">Location change</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Resignation Action */}
                <div 
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 hover:border-red-200 transition-all duration-300 cursor-pointer"
                  onClick={() => openCreateDialog('resignation')}
                >
                  <div className="p-6 h-32 flex flex-col items-center justify-center relative z-10">
                    <div className="h-14 w-14 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors duration-300 flex items-center justify-center mb-3">
                      <UserX className="h-7 w-7 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-red-800 text-center">Create Resignation</h3>
                    <p className="text-xs text-red-600 text-center mt-1">Exit process</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Employee Promotions</h2>
            <Button
              className="bg-orange-600/20 text-black"
              onClick={() => openCreateDialog('promotion')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search promotions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="lg:w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Promotions Table */}
        <Card>
          <CardHeader>
              <CardTitle>Employee Promotions ({filteredPromotions.length})</CardTitle>
              <CardDescription>Manage employee career advancements</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Current Position</TableHead>
                      <TableHead>New Position</TableHead>
                      <TableHead>Department Change</TableHead>
                      <TableHead>Effective Date</TableHead>
                      <TableHead>Salary Increase</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPromotions.length > 0 ? (
                      filteredPromotions.map((promotion) => {
                        const employee = employees.find(emp => emp.employeeId === promotion.employeeId);
                        return (
                          <TableRow key={promotion.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <p className="font-semibold text-gray-900">
                                  {employee ? `${employee.firstName} ${employee.lastName}` : promotion.employeeId}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {employee?.email || 'N/A'}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{promotion.currentPosition}</TableCell>
                            <TableCell className="font-medium text-green-600">
                              {promotion.newPosition}
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p>{promotion.currentDepartment}</p>
                                <p className="text-green-600">→ {promotion.newDepartment}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(promotion.effectiveDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {promotion.salaryIncrease ? `$${promotion.salaryIncrease.toLocaleString()}` : 'N/A'}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  promotion.status === "approved"
                                    ? "default"
                                    : promotion.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {promotion.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => deleteTransition(promotion.id, 'promotion')}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-6 text-gray-500"
                        >
                          No promotions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
          </CardContent>
        </Card>
        </TabsContent>

        {/* Transfers Tab */}
        <TabsContent value="transfers" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Employee Transfers</h2>
            <Button
              className="bg-orange-600/20 text-black"
              onClick={() => openCreateDialog('transfer')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Transfer
            </Button>
      </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transfers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="lg:w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transfers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Transfers ({filteredTransfers.length})</CardTitle>
              <CardDescription>Manage employee transfers between locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>From Branch</TableHead>
                      <TableHead>To Branch</TableHead>
                      <TableHead>Department Change</TableHead>
                      <TableHead>Transfer Date</TableHead>
                      <TableHead>Effective Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransfers.length > 0 ? (
                      filteredTransfers.map((transfer) => {
                        const employee = employees.find(emp => emp.employeeId === transfer.employeeId);
                        return (
                          <TableRow key={transfer.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <p className="font-semibold text-gray-900">
                                  {employee ? `${employee.firstName} ${employee.lastName}` : transfer.employeeId}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {employee?.email || 'N/A'}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{transfer.fromBranch}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-600">{transfer.toBranch}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {transfer.fromDepartment}
                                </p>
                                <p className="text-green-600 flex items-center gap-1">
                                  <Repeat className="h-3 w-3" />
                                  {transfer.toDepartment}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(transfer.transferDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(transfer.effectiveDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  transfer.status === "approved"
                                    ? "default"
                                    : transfer.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {transfer.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => deleteTransition(transfer.id, 'transfer')}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-6 text-gray-500"
                        >
                          No transfers found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resignations Tab */}
        <TabsContent value="resignations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Employee Resignations</h2>
            <Button
              className="bg-orange-600/20 text-black"
              onClick={() => openCreateDialog('resignation')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Resignation
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resignations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="lg:w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resignations Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Resignations ({filteredResignations.length})</CardTitle>
              <CardDescription>Manage employee resignation requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Resignation Date</TableHead>
                      <TableHead>Last Working Day</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notice Period</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResignations.length > 0 ? (
                      filteredResignations.map((resignation) => {
                        const employee = employees.find(emp => emp.employeeId === resignation.employeeId);
                        const noticePeriod = Math.ceil(
                          (new Date(resignation.lastWorkingDay).getTime() - new Date(resignation.resignationDate).getTime()) / (1000 * 60 * 60 * 24)
                        );
                        
                        return (
                          <TableRow key={resignation.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <p className="font-semibold text-gray-900">
                                  {employee ? `${employee.firstName} ${employee.lastName}` : resignation.employeeId}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {employee?.email || 'N/A'}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(resignation.resignationDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(resignation.lastWorkingDay).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{resignation.reason}</span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  resignation.status === "approved"
                                    ? "default"
                                    : resignation.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {resignation.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={`text-sm ${noticePeriod < 30 ? 'text-red-600' : 'text-green-600'}`}>
                                {noticePeriod} days
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => deleteTransition(resignation.id, 'resignation')}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-6 text-gray-500"
                        >
                          No resignations found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Dialogs */}
      {/* Promotion Dialog */}
      <Dialog open={isCreateDialogOpen && transitionType === 'promotion'} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Create Employee Promotion</DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Create a new employee promotion record with position change details and effective dates.
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Employee</label>
              <Select
                value={promotionForm.employeeId}
                onValueChange={(value) => setPromotionForm({ ...promotionForm, employeeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.employeeId} value={employee.employeeId}>
                      {employee.firstName} {employee.lastName} - {employee.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Promoted By</label>
              <Select
                value={promotionForm.promotedBy}
                onValueChange={(value) => setPromotionForm({ ...promotionForm, promotedBy: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select who promoted" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.employeeId} value={employee.employeeId}>
                      {employee.firstName} {employee.lastName} - {employee.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">New Role</label>
              <Input
                value={promotionForm.newRole}
                onChange={(e) => setPromotionForm({ ...promotionForm, newRole: e.target.value })}
                placeholder="New role/position"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Promotion Date</label>
              <Input
                type="date"
                value={promotionForm.promotionDate}
                onChange={(e) => setPromotionForm({ ...promotionForm, promotionDate: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Remarks (Optional)</label>
              <Textarea
                value={promotionForm.remarks || ""}
                onChange={(e) => setPromotionForm({ ...promotionForm, remarks: e.target.value })}
                placeholder="Additional remarks or details..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createPromotion}>Create Promotion</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={isCreateDialogOpen && transitionType === 'transfer'} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Create Employee Transfer</DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Transfer an employee between different branches and departments with effective dates.
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Employee</label>
              <Select
                value={transferForm.employeeId}
                onValueChange={(value) => setTransferForm({ ...transferForm, employeeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.employeeId} value={employee.employeeId}>
                      {employee.firstName} {employee.lastName} - {employee.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">From Branch</label>
                <Select
                  value={transferForm.fromBranchId}
                  onValueChange={(value) => setTransferForm({ ...transferForm, fromBranchId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id?.toString() || ''}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">To Branch</label>
                <Select
                  value={transferForm.toBranchId}
                  onValueChange={(value) => setTransferForm({ ...transferForm, toBranchId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id?.toString() || ''}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">From Department</label>
                <Select
                  value={transferForm.fromDepartmentId}
                  onValueChange={(value) => setTransferForm({ ...transferForm, fromDepartmentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.departmentId} value={dept.departmentId?.toString() || ''}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">To Department</label>
                <Select
                  value={transferForm.toDepartmentId}
                  onValueChange={(value) => setTransferForm({ ...transferForm, toDepartmentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.departmentId} value={dept.departmentId?.toString() || ''}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Transfer Date</label>
              <Input
                type="date"
                value={transferForm.transferDate}
                onChange={(e) => setTransferForm({ ...transferForm, transferDate: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Reason for Transfer</label>
              <Select
                value={transferForm.reason}
                onValueChange={(value) => setTransferForm({ ...transferForm, reason: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {transferReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createTransfer}>Create Transfer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resignation Dialog */}
      <Dialog open={isCreateDialogOpen && transitionType === 'resignation'} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Create Resignation Request</DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Record an employee resignation with effective date and reason for exit processing.
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Employee</label>
              <Select
                value={resignationForm.employeeId}
                onValueChange={(value) => setResignationForm({ ...resignationForm, employeeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.employeeId} value={employee.employeeId}>
                      {employee.firstName} {employee.lastName} - {employee.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Resignation Date</label>
              <Input
                type="datetime-local"
                value={resignationForm.resignedAt}
                onChange={(e) => setResignationForm({ ...resignationForm, resignedAt: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Reason for Resignation</label>
              <Select
                value={resignationForm.reason}
                onValueChange={(value) => setResignationForm({ ...resignationForm, reason: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {resignationReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createResignation}>Create Resignation</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeTransitions;
