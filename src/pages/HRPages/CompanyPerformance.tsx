



import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
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
  Label
} from 'recharts';
import {
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Briefcase,
  Target
} from 'lucide-react';

const API_BASE = 'http://localhost:3000/api';

const CompanyPerformance = () => {
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
  const navigate = useNavigate();

  // ======== Default Static Data for Initial Render ========
  const defaultRevenueData = [
    { month: 'Jan', revenue: 12000, expenses: 8000 },
    { month: 'Feb', revenue: 15000, expenses: 9000 },
    { month: 'Mar', revenue: 18000, expenses: 11000 },
    { month: 'Apr', revenue: 20000, expenses: 12000 },
    { month: 'May', revenue: 22000, expenses: 14000 },
  ];

  const defaultProjectStatusData = [
    { name: 'Completed', value: 8 },
    { name: 'Ongoing', value: 5 },
    { name: 'Pending', value: 3 },
    { name: 'Delayed', value: 2 },
  ];

  const defaultEmployeePerformance = [
    { department: 'Sales', score: 85 },
    { department: 'Marketing', score: 78 },
    { department: 'Development', score: 92 },
    { department: 'Support', score: 70 },
  ];

  const defaultMarketShareData = [
    { month: 'Jan', share: 25 },
    { month: 'Feb', share: 28 },
    { month: 'Mar', share: 30 },
    { month: 'Apr', share: 33 },
    { month: 'May', share: 35 },
  ];

  // ======== STATE ========
  const [revenueData, setRevenueData] = useState(defaultRevenueData);
  const [projectStatusData, setProjectStatusData] = useState(defaultProjectStatusData);
  const [employeePerformance, setEmployeePerformance] = useState(defaultEmployeePerformance);
  const [marketShareData, setMarketShareData] = useState(defaultMarketShareData);
  const [loading, setLoading] = useState(true);

  // ======== FETCH FUNCTION ========
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [revRes, projRes, empRes, marketRes] = await Promise.all([
        axios.get(`${API_BASE}/revenue`),
        axios.get(`${API_BASE}/project-status`),
        axios.get(`${API_BASE}/employee-performance`),
        axios.get(`${API_BASE}/market-share`)
      ]);

      if (revRes.data.length) setRevenueData(revRes.data);
      if (projRes.data.length) setProjectStatusData(projRes.data);
      if (empRes.data.length) setEmployeePerformance(empRes.data);
      if (marketRes.data.length) setMarketShareData(marketRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleExportNavigation = () => {
    navigate('/exportdata');
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Performance</h1>
          <p className="text-muted-foreground mt-1">
            Monitor revenue, projects, employee productivity, and market growth
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="hover:bg-violet-700" onClick={handleExportNavigation}>
            <Download className="h-4 w-4 mr-2" /> Export Data
          </Button>
          <Button variant="violet">
            <FileText className="h-4 w-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">
                ${revenueData.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}
              </p>
              <Badge variant="secondary">Dynamic/API</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-success rounded-2xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="text-2xl font-bold">32%</p>
              <Badge variant="secondary">Static</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-warning rounded-2xl">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold">{projectStatusData.reduce((sum, p) => sum + p.value, 0)}</p>
              <Badge variant="secondary">API</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-3">
            <div className="p-3 bg-gradient-info rounded-2xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Share</p>
              <p className="text-2xl font-bold">
                {marketShareData.length ? `${marketShareData.at(-1).share}%` : '0%'}
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
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month">
                  <Label value="Month" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis>
                  <Label value="USD ($)" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.5} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
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
            <CardTitle>Employee Performance Score</CardTitle>
            <CardDescription>By department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeePerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]}>
                  <Label value="Score (%)" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis dataKey="department" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Performance Score" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Share Growth</CardTitle>
            <CardDescription>Monthly trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketShareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month">
                  <Label value="Month" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis domain={[0, 100]}>
                  <Label value="Market Share (%)" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="share" name="Market Share" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyPerformance;
