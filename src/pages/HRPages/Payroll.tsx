




import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Download, MoreHorizontal, Edit, Trash2, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

// Dummy payroll data (for charts & table if API fails)
const DUMMY_PAYROLLS = [
  { id: 1, employeeName: 'Kotha Sandeep K', month: 'January', salary: 3000, bonus: 200, status: 'Paid', payDate: '2025-01-25' },
  { id: 2, employeeName: 'Vijay B', month: 'January', salary: 3200, bonus: 150, status: 'Pending', payDate: '2025-01-28' },
  { id: 3, employeeName: 'Mark Lee', month: 'February', salary: 2800, bonus: 100, status: 'Paid', payDate: '2025-02-25' },
  { id: 4, employeeName: 'Sophia Kim', month: 'February', salary: 3500, bonus: 250, status: 'Pending', payDate: '2025-02-26' },
  { id: 5, employeeName: 'Alex Johnson', month: 'March', salary: 3100, bonus: 300, status: 'Paid', payDate: '2025-03-25' },
];

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPayroll, setNewPayroll] = useState({
    employeeName: '',
    month: '',
    salary: '',
    bonus: '',
    status: 'Paid',
    payDate: ''
  });
  const { toast } = useToast();

  // --- READ ---
  const fetchPayrolls = () => {
    axios.get('http://localhost:3000/payroll')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setPayrolls(res.data);
        } else {
          setPayrolls(DUMMY_PAYROLLS);
        }
      })
      .catch(() => {
        setPayrolls(DUMMY_PAYROLLS);
      });
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  // --- CREATE ---
  const handleAddPayroll = () => {
    axios.post('http://localhost:3000/payroll', newPayroll)
      .then(() => {
        toast({ title: 'Payroll Added', description: 'New payroll record added successfully' });
        setIsDialogOpen(false);
        setNewPayroll({ employeeName: '', month: '', salary: '', bonus: '', status: 'Paid', payDate: '' });
        fetchPayrolls();
      })
      .catch(() => {
        const updated = [...payrolls, { ...newPayroll, id: payrolls.length + 1 }];
        setPayrolls(updated);
        toast({ title: 'Payroll Added (Local)', description: 'Added to dummy records' });
        setIsDialogOpen(false);
      });
  };

  // --- UPDATE ---
  const handleEdit = (record) => {
    const updated = { ...record, bonus: Number(record.bonus) + 500 };
    axios.put(`http://localhost:3000/payroll/${record.id}`, updated)
      .then(() => {
        toast({ title: 'Payroll Updated', description: `Payroll for ${record.employeeName} updated successfully` });
        fetchPayrolls();
      })
      .catch(() => {
        setPayrolls(payrolls.map(p => p.id === record.id ? updated : p));
        toast({ title: 'Payroll Updated (Local)', description: 'Updated dummy data' });
      });
  };

  // --- DELETE ---
  const handleDelete = (record) => {
    axios.delete(`http://localhost:3000/payroll/${record.id}`)
      .then(() => {
        toast({ title: 'Payroll Deleted', description: `Payroll for ${record.employeeName} removed`, variant: 'destructive' });
        fetchPayrolls();
      })
      .catch(() => {
        setPayrolls(payrolls.filter(p => p.id !== record.id));
        toast({ title: 'Payroll Deleted (Local)', description: 'Removed from dummy data', variant: 'destructive' });
      });
  };

  // --- FILTER ---
  const filteredPayrolls = payrolls.filter((p) => {
    const matchesSearch =
      p.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.month.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // --- Chart Data ---
  const paidCount = payrolls.filter(p => p.status === 'Paid').length;
  const pendingCount = payrolls.filter(p => p.status === 'Pending').length;

  const pieData = [
    { name: 'Paid', value: paidCount },
    { name: 'Pending', value: pendingCount }
  ];

  const barData = [
    { status: 'Paid', count: paidCount },
    { status: 'Pending', count: pendingCount }
  ];

  // Custom label for Pie Chart
  const renderPieLabel = ({ name, percent }) => {
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payroll Management</h1>
          <p className="text-muted-foreground mt-1">Manage salary payments and bonuses</p>
        </div>
        <div className="flex space-x-3 text-black">
          <Button variant="outline"
            className="hover:bg-orange-600/20 hover:text-black"><Download className="h-4 w-4 mr-2" /> Export</Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className='bg-orange-600/20 text-black'><PlusCircle className="h-4 w-4 mr-2" /> Add Payroll</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payroll Record</DialogTitle>
                <DialogDescription>Enter payroll details below</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Employee Name</Label>
                  <Input value={newPayroll.employeeName} onChange={(e) => setNewPayroll({ ...newPayroll, employeeName: e.target.value })} />
                </div>
                <div>
                  <Label>Month</Label>
                  <Input value={newPayroll.month} onChange={(e) => setNewPayroll({ ...newPayroll, month: e.target.value })} />
                </div>
                <div>
                  <Label>Salary</Label>
                  <Input type="number" value={newPayroll.salary} onChange={(e) => setNewPayroll({ ...newPayroll, salary: e.target.value })} />
                </div>
                <div>
                  <Label>Bonus</Label>
                  <Input type="number" value={newPayroll.bonus} onChange={(e) => setNewPayroll({ ...newPayroll, bonus: e.target.value })} />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={newPayroll.status} onValueChange={(value) => setNewPayroll({ ...newPayroll, status: value })}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pay Date</Label>
                  <Input type="date" value={newPayroll.payDate} onChange={(e) => setNewPayroll({ ...newPayroll, payDate: e.target.value })} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddPayroll}>Add</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
            <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="lg:w-48"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Status Distribution</CardTitle>
            <CardDescription>Proportion of Paid vs Pending payrolls</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie 
                  data={pieData} 
                  dataKey="value" 
                  nameKey="name" 
                  outerRadius={100} 
                  label={renderPieLabel}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Status Count</CardTitle>
            <CardDescription>Number of Paid vs Pending payrolls</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Records ({filteredPayrolls.length})</CardTitle>
          <CardDescription>Manage payments for employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayrolls.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.employeeName}</TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>${record.salary}</TableCell>
                    <TableCell>${record.bonus}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === 'Paid' ? 'default' : 'secondary'}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(record.payDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(record)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(record)} className="text-danger"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payroll;
