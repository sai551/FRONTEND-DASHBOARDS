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
import { useNavigate } from "react-router-dom";
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
  AreaChart,
  Area,
  Legend,
  Label,
} from "recharts";
import {
  Users,
  TrendingUp,
  ClipboardList,
  Clock,
  FileText,
  Download,
} from "lucide-react";

const API_BASE = "http://localhost:3000/api";

const EmployeePerformance = () => {
  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
  const navigate = useNavigate();

  // ======== Default Static Data ========
  const defaultPerformanceData = [
    { name: "Alice", score: 92, department: "Sales" },
    { name: "Bob", score: 75, department: "Marketing" },
    { name: "Charlie", score: 88, department: "Development" },
    { name: "David", score: 64, department: "Support" },
    { name: "Eva", score: 80, department: "HR" },
  ];

  const defaultDepartmentAvg = [
    { department: "Sales", avg: 85 },
    { department: "Marketing", avg: 78 },
    { department: "Development", avg: 90 },
    { department: "Support", avg: 70 },
    { department: "HR", avg: 82 },
  ];

  const defaultLeaveStatus = [
    { name: "Approved", value: 12 },
    { name: "Pending", value: 5 },
    { name: "Rejected", value: 3 },
  ];

  const defaultEmployeeGrowth = [
    { month: "Jan", employees: 25 },
    { month: "Feb", employees: 28 },
    { month: "Mar", employees: 30 },
    { month: "Apr", employees: 32 },
    { month: "May", employees: 35 },
  ];

  // ======== STATE ========
  const [performanceData, setPerformanceData] = useState(defaultPerformanceData);
  const [departmentAvg, setDepartmentAvg] = useState(defaultDepartmentAvg);
  const [leaveStatus, setLeaveStatus] = useState(defaultLeaveStatus);
  const [employeeGrowth, setEmployeeGrowth] = useState(defaultEmployeeGrowth);
  const [loading, setLoading] = useState(true);

  // ======== FETCH FUNCTION ========
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [perfRes, deptRes, leaveRes, growthRes] = await Promise.all([
        axios.get(`${API_BASE}/employee/performance`),
        axios.get(`${API_BASE}/employee/department-avg`),
        axios.get(`${API_BASE}/employee/leave-status`),
        axios.get(`${API_BASE}/employee/growth`),
      ]);

      if (perfRes.data.length) setPerformanceData(perfRes.data);
      if (deptRes.data.length) setDepartmentAvg(deptRes.data);
      if (leaveRes.data.length) setLeaveStatus(leaveRes.data);
      if (growthRes.data.length) setEmployeeGrowth(growthRes.data);
    } catch (err) {
      console.error("Error fetching Employee KPI data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleExportNavigation = () => {
    navigate("/exportdata");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Employee Performance
          </h1>
          <p className="text-muted-foreground mt-1">
            Track productivity, department scores, leave insights, and growth
          </p>
        </div>
        <div className="flex space-x-3 text-black">
          <Button
            variant="outline"
            className="hover:bg-orange-600/20 hover:text-black"
            onClick={handleExportNavigation}
          >
            <Download className="h-4 w-4 mr-2 " /> Export Data
          </Button>
          <Button className="bg-orange-600/20  text-black hover:text-black">
            <FileText className="h-4 w-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-success rounded-2xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold">{performanceData.length}</p>
              <Badge variant="secondary">API/Dynamic</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Score</p>
              <p className="text-2xl font-bold">
                {(
                  performanceData.reduce((sum, e) => sum + e.score, 0) /
                  performanceData.length
                ).toFixed(1)}
                %
              </p>
              <Badge variant="secondary">Dynamic</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-warning rounded-2xl">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Department</p>
              <p className="text-2xl font-bold">
                {departmentAvg.sort((a, b) => b.avg - a.avg)[0].department}
              </p>
              <Badge variant="secondary">API</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-info rounded-2xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Leaves</p>
              <p className="text-2xl font-bold">
                {leaveStatus.find((l) => l.name === "Pending")?.value || 0}
              </p>
              <Badge variant="secondary">API</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Scores</CardTitle>
            <CardDescription>Employee-wise performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]}>
                  <Label value="Score (%)" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Status</CardTitle>
            <CardDescription>Approved vs Pending vs Rejected</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {leaveStatus.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Avg Scores</CardTitle>
            <CardDescription>Performance by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={departmentAvg}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="avg"
                  name="Avg Score"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee Growth Trend</CardTitle>
            <CardDescription>Monthly employee strength</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="employees"
                  name="Employees"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePerformance;


