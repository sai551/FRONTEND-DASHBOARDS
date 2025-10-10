


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
  Legend,
} from "recharts";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Repeat,
  FileText,
  Download,
  Users,
} from "lucide-react";

const API_BASE = "http://localhost:3000/api";

const EmployeeTransitions = () => {
  const COLORS = ["#10B981", "#EF4444", "#3B82F6"];
  const navigate = useNavigate();

  // ======== Default Static Data ========
  const defaultTransitions = [
    { type: "Promotion", count: 12 },
    { type: "Demotion", count: 4 },
    { type: "Transfer", count: 7 },
  ];

  const defaultMonthlyTrend = [
    { month: "Jan", promotions: 3, demotions: 1, transfers: 2 },
    { month: "Feb", promotions: 2, demotions: 0, transfers: 1 },
    { month: "Mar", promotions: 4, demotions: 2, transfers: 3 },
    { month: "Apr", promotions: 2, demotions: 1, transfers: 1 },
    { month: "May", promotions: 1, demotions: 0, transfers: 0 },
  ];

  const defaultDeptWise = [
    { department: "Sales", promotions: 3, demotions: 1, transfers: 2 },
    { department: "Marketing", promotions: 2, demotions: 0, transfers: 1 },
    { department: "Development", promotions: 5, demotions: 2, transfers: 3 },
    { department: "Support", promotions: 2, demotions: 1, transfers: 1 },
  ];

  // ======== STATE ========
  const [Transitions, setTransitions] = useState(defaultTransitions);
  const [monthlyTrend, setMonthlyTrend] = useState(defaultMonthlyTrend);
  const [deptWise, setDeptWise] = useState(defaultDeptWise);
  const [loading, setLoading] = useState(true);

  // ======== FETCH FUNCTION ========
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [txRes, trendRes, deptRes] = await Promise.all([
        axios.get(`${API_BASE}/employee-Transitions`),
        axios.get(`${API_BASE}/employee-Transitions/monthly`),
        axios.get(`${API_BASE}/employee-Transitions/department`),
      ]);

      if (txRes.data.length) setTransitions(txRes.data);
      if (trendRes.data.length) setMonthlyTrend(trendRes.data);
      if (deptRes.data.length) setDeptWise(deptRes.data);
    } catch (err) {
      console.error("Error fetching Employee Transitions:", err);
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
            Employee Transitions
          </h1>
          <p className="text-muted-foreground mt-1">
            Track promotions, demotions, and transfers across departments
          </p>
        </div>
        <div className="flex space-x-3 text-black">
          <Button
            variant="outline"
            className="hover:bg-orange-600/20 hover:text-black"
            onClick={handleExportNavigation}
          >
            <Download className="h-4 w-4 mr-2" /> Export Data
          </Button>
          <Button className="bg-orange-600/20 text-black hover:text-black">
            <FileText className="h-4 w-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total */}
        <Card className="shadow-lg hover:shadow-xl transition rounded-2xl">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Transitions</p>
              <p className="text-2xl font-bold">
                {Transitions.reduce((sum, t) => sum + t.count, 0)}
              </p>
              <Badge variant="secondary">Dynamic</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Promotions */}
        <Card className="shadow-lg hover:shadow-xl transition rounded-2xl">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl">
              <ArrowUpCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Promotions</p>
              <p className="text-2xl font-bold">
                {Transitions.find((t) => t.type === "Promotion")?.count || 0}
              </p>
              <Badge variant="secondary">API</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Demotions */}
        <Card className="shadow-lg hover:shadow-xl transition rounded-2xl">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl">
              <ArrowDownCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Demotions</p>
              <p className="text-2xl font-bold">
                {Transitions.find((t) => t.type === "Demotion")?.count || 0}
              </p>
              <Badge variant="secondary">API</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Transfers */}
        <Card className="shadow-lg hover:shadow-xl transition rounded-2xl">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl">
              <Repeat className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transfers</p>
              <p className="text-2xl font-bold">
                {Transitions.find((t) => t.type === "Transfer")?.count || 0}
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
            <CardTitle>Transaction Distribution</CardTitle>
            <CardDescription>
              Promotions vs Demotions vs Transfers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Transitions}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="count"
                >
                  {Transitions.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Transitions by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="promotions"
                  stroke="#10B981"
                  name="Promotions"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="demotions"
                  stroke="#EF4444"
                  name="Demotions"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="transfers"
                  stroke="#3B82F6"
                  name="Transfers"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Transitions</CardTitle>
            <CardDescription>Comparison across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={deptWise}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="promotions" fill="#10B981" name="Promotions" />
                <Bar dataKey="demotions" fill="#EF4444" name="Demotions" />
                <Bar dataKey="transfers" fill="#3B82F6" name="Transfers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeTransitions;
