import { Package, FileText, DollarSign, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { KpiCard } from '@/components/OperationalManager/KpiCard';
import { ChartCard } from '@/components/OperationalManager/ChartCard';
import { DataTable } from '@/components/OperationalManager/DataTable';
import { Badge } from '@/components/ui/badge';

// Mock data
const kpiData = [
  {
    title: 'Total Assets',
    value: '1,247',
    change: { value: 12, type: 'increase' as const },
    icon: Package,
  },
  {
    title: 'Pending Requests',
    value: '23',
    change: { value: 8, type: 'decrease' as const },
    icon: FileText,
  },
  {
    title: 'Monthly Expenses',
    value: '$45,892',
    change: { value: 15, type: 'increase' as const },
    icon: DollarSign,
  },
  {
    title: 'Pending Approvals',
    value: '7',
    change: { value: 30, type: 'decrease' as const },
    icon: CheckCircle,
  },
];

const assetConditionData = [
  { name: 'Excellent', value: 45, color: '#10b981' },
  { name: 'Good', value: 30, color: '#3b82f6' },
  { name: 'Fair', value: 20, color: '#f59e0b' },
  { name: 'Poor', value: 5, color: '#ef4444' },
];

const expenseTrendData = [
  { month: 'Jan', amount: 42000 },
  { month: 'Feb', amount: 38000 },
  { month: 'Mar', amount: 45000 },
  { month: 'Apr', amount: 41000 },
  { month: 'May', amount: 47000 },
  { month: 'Jun', amount: 45892 },
];

const approvalStatusData = [
  { name: 'Approved', value: 65, color: '#10b981' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'Rejected', value: 10, color: '#ef4444' },
];

const recentRequestsData = [
  {
    id: 'REQ-001',
    asset: 'Dell Laptop XPS 15',
    requester: 'Sarah Johnson',
    department: 'Engineering',
    status: 'Pending',
    date: '2024-01-15',
  },
  {
    id: 'REQ-002',
    asset: 'Office Chair Herman Miller',
    requester: 'Mike Chen',
    department: 'Design',
    status: 'Approved',
    date: '2024-01-14',
  },
  {
    id: 'REQ-003',
    asset: 'iPhone 15 Pro',
    requester: 'Lisa Wang',
    department: 'Marketing',
    status: 'Under Review',
    date: '2024-01-13',
  },
];

const transportSchedulesData = [
  {
    route: 'Downtown - Office',
    time: '08:30 AM',
    driver: 'John Smith',
    capacity: '12/15',
    status: 'On Time',
  },
  {
    route: 'Airport Pickup',
    time: '02:15 PM',
    driver: 'Maria Garcia',
    capacity: '3/8',
    status: 'Delayed',
  },
  {
    route: 'Client Site Visit',
    time: '10:00 AM',
    driver: 'David Wilson',
    capacity: '5/6',
    status: 'In Transit',
  },
];

const requestColumns = [
  { key: 'id', header: 'Request ID' },
  { key: 'asset', header: 'Asset' },
  { key: 'requester', header: 'Requester' },
  { key: 'department', header: 'Department' },
  { key: 'status', header: 'Status' },
  { key: 'date', header: 'Date' },
];

const transportColumns = [
  { key: 'route', header: 'Route' },
  { key: 'time', header: 'Time' },
  { key: 'driver', header: 'Driver' },
  { key: 'capacity', header: 'Capacity' },
  { key: 'status', header: 'Status' },
];

export default function OmDashboard() {
  const renderRequestCell = (key: string, value: any) => {
    if (key === 'status') {
      const variant = 
        value === 'Approved' ? 'default' :
        value === 'Pending' ? 'secondary' :
        'outline';
      
      return <Badge variant={variant}>{value}</Badge>;
    }
    return value;
  };

  const renderTransportCell = (key: string, value: any) => {
    if (key === 'status') {
      const variant = 
        value === 'On Time' ? 'default' :
        value === 'Delayed' ? 'destructive' :
        'secondary';
      
      return <Badge variant={variant}>{value}</Badge>;
    }
    return value;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your operations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Asset Condition Status">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetConditionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetConditionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Expenses Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={expenseTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Approval Status Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={approvalStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DataTable
          title="Recent Asset Requests"
          columns={requestColumns}
          data={recentRequestsData}
          renderCell={renderRequestCell}
        />

        <DataTable
          title="Upcoming Transport Schedules"
          columns={transportColumns}
          data={transportSchedulesData}
          renderCell={renderTransportCell}
        />
      </div>
    </div>
  );
}