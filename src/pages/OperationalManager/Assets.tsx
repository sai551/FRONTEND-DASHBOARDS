import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package2, Wrench, AlertTriangle } from 'lucide-react';
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

// Mock data for assets
const assetsData = [
  {
    id: 'AST-001',
    name: 'Dell Laptop XPS 15',
    category: 'IT Equipment',
    serialNumber: 'DL-XPS-2024-001',
    condition: 'Excellent',
    location: 'Office Building A - Floor 3',
    assignedTo: 'Sarah Johnson',
    department: 'Engineering',
    purchaseDate: '2024-01-15',
    warranty: 'Active until 2027-01-15',
    value: '$2,500.00',
    status: 'In Use',
    maintenanceDate: '2024-03-15',
    notes: 'Recently upgraded with additional RAM'
  },
  {
    id: 'AST-002',
    name: 'Herman Miller Aeron Chair',
    category: 'Furniture',
    serialNumber: 'HM-AR-2023-045',
    condition: 'Good',
    location: 'Office Building B - Floor 2',
    assignedTo: 'Mike Chen',
    department: 'Design',
    purchaseDate: '2023-08-10',
    warranty: 'Expired',
    value: '$1,200.00',
    status: 'In Use',
    maintenanceDate: '2024-02-20',
    notes: 'Minor wear on armrests'
  },
  {
    id: 'AST-003',
    name: 'iPhone 15 Pro',
    category: 'Mobile Device',
    serialNumber: 'IP-15P-2024-032',
    condition: 'Excellent',
    location: 'Mobile Assignment',
    assignedTo: 'Lisa Wang',
    department: 'Marketing',
    purchaseDate: '2024-02-01',
    warranty: 'Active until 2025-02-01',
    value: '$1,100.00',
    status: 'In Use',
    maintenanceDate: 'N/A',
    notes: 'Corporate phone with encrypted storage'
  },
  {
    id: 'AST-004',
    name: 'Conference Room Projector',
    category: 'AV Equipment',
    serialNumber: 'EP-PRJ-2023-008',
    condition: 'Fair',
    location: 'Conference Room 1A',
    assignedTo: 'Facilities Team',
    department: 'Operations',
    purchaseDate: '2023-03-20',
    warranty: 'Active until 2025-03-20',
    value: '$3,200.00',
    status: 'Maintenance Required',
    maintenanceDate: '2024-01-10',
    notes: 'Lamp replacement needed'
  },
  {
    id: 'AST-005',
    name: 'Company Vehicle - Toyota Camry',
    category: 'Vehicle',
    serialNumber: 'TC-CAM-2022-007',
    condition: 'Good',
    location: 'Parking Garage Level 1',
    assignedTo: 'Sales Team',
    department: 'Sales',
    purchaseDate: '2022-11-15',
    warranty: 'Active until 2025-11-15',
    value: '$28,500.00',
    status: 'Available',
    maintenanceDate: '2024-01-05',
    notes: 'Regular maintenance completed'
  }
];

const columns = [
  { key: 'id', header: 'Asset ID' },
  { key: 'name', header: 'Asset Name' },
  { key: 'category', header: 'Category' },
  { key: 'condition', header: 'Condition' },
  { key: 'assignedTo', header: 'Assigned To' },
  { key: 'location', header: 'Location' },
  { key: 'status', header: 'Status' },
  { key: 'value', header: 'Value' },
  { key: 'actions', header: 'Actions' },
];

export default function OmAssets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');

  const getConditionBadgeVariant = (condition: string) => {
    switch (condition) {
      case 'Excellent':
        return 'default';
      case 'Good':
        return 'secondary';
      case 'Fair':
        return 'outline';
      case 'Poor':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'In Use':
        return 'default';
      case 'Available':
        return 'secondary';
      case 'Maintenance Required':
        return 'destructive';
      case 'Retired':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const renderCell = (key: string, value: any, row: any) => {
    switch (key) {
      case 'condition':
        return <Badge variant={getConditionBadgeVariant(value)}>{value}</Badge>;
      case 'status':
        return <Badge variant={getStatusBadgeVariant(value)}>{value}</Badge>;
      case 'name':
        return (
          <div className="max-w-xs">
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{row.serialNumber}</div>
          </div>
        );
      case 'location':
        return (
          <div className="max-w-xs">
            <div className="text-sm truncate">{value}</div>
          </div>
        );
      case 'assignedTo':
        return (
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{row.department}</div>
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
                Edit Asset
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wrench className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Retire Asset
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      default:
        return value;
    }
  };

  // Filter data based on search and filters
  const filteredData = assetsData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCondition = conditionFilter === 'all' || item.condition.toLowerCase() === conditionFilter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus && matchesCondition;
  });

  // Calculate summary statistics
  const totalAssets = assetsData.length;
  const inUseAssets = assetsData.filter(a => a.status === 'In Use').length;
  const maintenanceRequired = assetsData.filter(a => a.status === 'Maintenance Required').length;
  const totalValue = assetsData.reduce((sum, a) => sum + parseFloat(a.value.replace('$', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assets Management</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all company assets including hardware, software, and equipment
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Package2 className="h-4 w-4 mr-2" />
              Total Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssets}</div>
            <div className="text-xs text-muted-foreground mt-1">Across all categories</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assets In Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-success">{inUseAssets}</div>
            <div className="text-xs text-muted-foreground mt-1">Currently assigned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Maintenance Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{maintenanceRequired}</div>
            <div className="text-xs text-muted-foreground mt-1">Need attention</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">Asset portfolio value</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assets, serial numbers, assignees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="it equipment">IT Equipment</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="mobile device">Mobile Device</SelectItem>
            <SelectItem value="av equipment">AV Equipment</SelectItem>
            <SelectItem value="vehicle">Vehicle</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in use">In Use</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="maintenance required">Maintenance Required</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={conditionFilter} onValueChange={setConditionFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            <SelectItem value="excellent">Excellent</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Assets Table */}
      <DataTable
        title={`Assets Inventory (${filteredData.length})`}
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
      />

      {/* Additional Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">IT Equipment</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Furniture</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Mobile Devices</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Vehicles</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Conference Room Projector</div>
                  <div className="text-sm text-muted-foreground">Lamp replacement needed</div>
                </div>
                <Badge variant="destructive">Overdue</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Company Vehicle - Toyota Camry</div>
                  <div className="text-sm text-muted-foreground">Scheduled service due</div>
                </div>
                <Badge variant="outline">Due in 5 days</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Office Printer HP LaserJet</div>
                  <div className="text-sm text-muted-foreground">Routine cleaning</div>
                </div>
                <Badge variant="secondary">Due in 2 weeks</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}