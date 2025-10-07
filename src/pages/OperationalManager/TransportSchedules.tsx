import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/OperationalManager/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for transport schedules
const transportData = [
  {
    id: 'TS-001',
    route: 'Downtown Office - Main Campus',
    driver: 'John Smith',
    vehicle: 'Mercedes Sprinter (ABC-123)',
    departureTime: '08:30 AM',
    arrivalTime: '09:15 AM',
    capacity: '15/20',
    passengers: 15,
    maxCapacity: 20,
    status: 'On Time',
    type: 'Shuttle',
    date: '2024-01-15',
    cost: '$45.00',
    distance: '12.5 km',
    estimatedDuration: '45 min'
  },
  {
    id: 'TS-002',
    route: 'Airport Pickup - Hotel',
    driver: 'Maria Garcia',
    vehicle: 'Toyota Hiace (XYZ-789)',
    departureTime: '02:15 PM',
    arrivalTime: '03:30 PM',
    capacity: '8/12',
    passengers: 8,
    maxCapacity: 12,
    status: 'Delayed',
    type: 'Transfer',
    date: '2024-01-15',
    cost: '$80.00',
    distance: '25.3 km',
    estimatedDuration: '75 min'
  },
  {
    id: 'TS-003',
    route: 'Client Site - Downtown Office',
    driver: 'David Wilson',
    vehicle: 'Ford Transit (DEF-456)',
    departureTime: '10:00 AM',
    arrivalTime: '10:45 AM',
    capacity: '6/8',
    passengers: 6,
    maxCapacity: 8,
    status: 'In Transit',
    type: 'Business',
    date: '2024-01-15',
    cost: '$35.00',
    distance: '8.7 km',
    estimatedDuration: '45 min'
  },
  {
    id: 'TS-004',
    route: 'Training Center - Main Office',
    driver: 'Sarah Johnson',
    vehicle: 'Nissan NV200 (GHI-789)',
    departureTime: '04:30 PM',
    arrivalTime: '05:15 PM',
    capacity: '10/12',
    passengers: 10,
    maxCapacity: 12,
    status: 'Scheduled',
    type: 'Shuttle',
    date: '2024-01-15',
    cost: '$40.00',
    distance: '10.2 km',
    estimatedDuration: '45 min'
  },
  {
    id: 'TS-005',
    route: 'Emergency Medical - Hospital',
    driver: 'Mike Chen',
    vehicle: 'Ambulance (EMG-001)',
    departureTime: '11:45 AM',
    arrivalTime: '12:10 PM',
    capacity: '1/2',
    passengers: 1,
    maxCapacity: 2,
    status: 'Completed',
    type: 'Emergency',
    date: '2024-01-15',
    cost: '$120.00',
    distance: '5.5 km',
    estimatedDuration: '25 min'
  }
];

const columns = [
  { key: 'id', header: 'Schedule ID' },
  { key: 'route', header: 'Route' },
  { key: 'driver', header: 'Driver' },
  { key: 'vehicle', header: 'Vehicle' },
  { key: 'departureTime', header: 'Departure' },
  { key: 'arrivalTime', header: 'Arrival' },
  { key: 'capacity', header: 'Capacity' },
  { key: 'status', header: 'Status' },
  { key: 'type', header: 'Type' },
  { key: 'actions', header: 'Actions' },
];

export default function OmTransportSchedules() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'On Time':
      case 'Completed':
        return 'default';
      case 'Delayed':
        return 'destructive';
      case 'In Transit':
        return 'secondary';
      case 'Scheduled':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Emergency':
        return 'destructive';
      case 'Business':
        return 'default';
      case 'Transfer':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const renderCell = (key: string, value: any, row: any) => {
    switch (key) {
      case 'status':
        return <Badge variant={getStatusBadgeVariant(value)}>{value}</Badge>;
      case 'type':
        return <Badge variant={getTypeBadgeVariant(value)}>{value}</Badge>;
      case 'capacity':
        const [current, max] = value.split('/').map(Number);
        const percentage = (current / max) * 100;
        const colorClass = percentage >= 90 ? 'text-destructive' : percentage >= 75 ? 'text-warning' : 'text-dashboard-success';
        return (
          <div className={`font-medium ${colorClass}`}>
            {value}
          </div>
        );
      case 'route':
        return (
          <div className="max-w-xs">
            <div className="font-medium truncate">{value}</div>
          </div>
        );
      case 'vehicle':
        return (
          <div className="max-w-xs">
            <div className="font-medium truncate">{value}</div>
          </div>
        );
      case 'actions':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Schedule
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Route
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel Schedule
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      default:
        return value;
    }
  };

  // Filter data based on search and filters
  const filteredData = transportData.filter(item => {
    const matchesSearch = 
      item.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate summary statistics
  const totalSchedules = transportData.length;
  const activeSchedules = transportData.filter(t => ['On Time', 'In Transit', 'Scheduled'].includes(t.status)).length;
  const delayedSchedules = transportData.filter(t => t.status === 'Delayed').length;
  const totalPassengers = transportData.reduce((sum, t) => sum + t.passengers, 0);
  const totalCost = transportData.reduce((sum, t) => sum + parseFloat(t.cost.replace('$', '')), 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transport Schedules</h1>
          <p className="text-muted-foreground mt-2">
            Manage company transportation, shuttles, and vehicle fleet operations
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSchedules}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-success">{activeSchedules}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delayed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{delayedSchedules}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Passengers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-info">{totalPassengers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search schedules, routes, drivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="on time">On Time</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
            <SelectItem value="in transit">In Transit</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="shuttle">Shuttle</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Transport Schedules Table */}
      <DataTable
        title={`Transport Schedules (${filteredData.length})`}
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
      />

      {/* Additional Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fleet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Mercedes Sprinter (ABC-123)</span>
                <span className="text-sm font-medium">75% utilization</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Toyota Hiace (XYZ-789)</span>
                <span className="text-sm font-medium">67% utilization</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ford Transit (DEF-456)</span>
                <span className="text-sm font-medium">75% utilization</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Downtown Office - Main Campus</div>
                  <div className="text-sm text-muted-foreground">Daily shuttle service</div>
                </div>
                <Badge variant="secondary">12 trips/day</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Airport Transfer</div>
                  <div className="text-sm text-muted-foreground">Business travel</div>
                </div>
                <Badge variant="secondary">8 trips/day</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Client Site Visits</div>
                  <div className="text-sm text-muted-foreground">Field operations</div>
                </div>
                <Badge variant="secondary">6 trips/day</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}