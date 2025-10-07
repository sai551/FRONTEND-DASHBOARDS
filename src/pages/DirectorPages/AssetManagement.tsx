import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  Laptop,
  Smartphone,
  Monitor,
  Printer,
  Wifi,
  Server,
  MapPin,
  Calendar,
  User
} from "lucide-react";

const assets = [
  {
    id: "AST-001",
    name: "MacBook Pro 16\"",
    category: "Laptop",
    assignedTo: "Alice Cooper",
    location: "Engineering Floor 3",
    status: "Active",
    purchaseDate: "2023-06-15",
    value: "$2,499",
    condition: "Excellent",
    warranty: "2025-06-15"
  },
  {
    id: "AST-002", 
    name: "iPhone 14 Pro",
    category: "Mobile",
    assignedTo: "Bob Smith",
    location: "Sales Floor 2",
    status: "Active",
    purchaseDate: "2023-09-20",
    value: "$999",
    condition: "Good",
    warranty: "2024-09-20"
  },
  {
    id: "AST-003",
    name: "Dell Monitor 32\"",
    category: "Monitor",
    assignedTo: "Carol Johnson",
    location: "Marketing Floor 4",
    status: "Active",
    purchaseDate: "2023-03-10",
    value: "$899",
    condition: "Good",
    warranty: "2026-03-10"
  },
  {
    id: "AST-004",
    name: "HP LaserJet Pro",
    category: "Printer",
    assignedTo: "Unassigned",
    location: "Office Supply Room",
    status: "Available",
    purchaseDate: "2023-08-05",
    value: "$399",
    condition: "Excellent",
    warranty: "2024-08-05"
  },
  {
    id: "AST-005",
    name: "Cisco Router",
    category: "Network",
    assignedTo: "IT Department",
    location: "Server Room",
    status: "Active",
    purchaseDate: "2022-11-12",
    value: "$1,299",
    condition: "Good",
    warranty: "2025-11-12"
  },
  {
    id: "AST-006",
    name: "Surface Pro 9",
    category: "Tablet",
    assignedTo: "David Wilson",
    location: "HR Floor 1",
    status: "Maintenance",
    purchaseDate: "2023-07-22",
    value: "$1,199",
    condition: "Fair",
    warranty: "2025-07-22"
  }
];

const assetCategories = [
  { name: "Laptops", count: 450, icon: Laptop, color: "text-chart-1" },
  { name: "Mobile Devices", count: 320, icon: Smartphone, color: "text-chart-2" },
  { name: "Monitors", count: 280, icon: Monitor, color: "text-chart-3" },
  { name: "Printers", count: 45, icon: Printer, color: "text-chart-4" },
  { name: "Network Equipment", count: 85, icon: Wifi, color: "text-chart-5" },
  { name: "Servers", count: 12, icon: Server, color: "text-chart-1" }
];

const AssetManagement = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Available":
        return "bg-primary text-primary-foreground";
      case "Maintenance":
        return "bg-warning text-warning-foreground";
      case "Retired":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "text-success";
      case "Good":
        return "text-primary";
      case "Fair":
        return "text-warning";
      case "Poor":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Laptop":
        return <Laptop className="h-4 w-4" />;
      case "Mobile":
        return <Smartphone className="h-4 w-4" />;
      case "Monitor":
        return <Monitor className="h-4 w-4" />;
      case "Printer":
        return <Printer className="h-4 w-4" />;
      case "Network":
        return <Wifi className="h-4 w-4" />;
      case "Tablet":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const totalAssets = assetCategories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Asset Management</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage company assets and equipment
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Asset
        </Button>
      </div>

      {/* Asset Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {assetCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card key={index} className="shadow-dashboard-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{category.name}</p>
                    <p className="text-2xl font-bold">{category.count}</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${category.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Package className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-success">+23 assets</Badge> this month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">
              Current asset value
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Package className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              Ready for assignment
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-dashboard-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Package className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Under maintenance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-dashboard-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search assets..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className="shadow-dashboard-md hover:shadow-dashboard-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {getCategoryIcon(asset.category)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{asset.name}</CardTitle>
                    <CardDescription>ID: {asset.id}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(asset.status)}>
                  {asset.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned To</span>
                  </div>
                  <p className="font-medium">{asset.assignedTo}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location</span>
                  </div>
                  <p className="font-medium">{asset.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-muted-foreground">Value</span>
                  <p className="font-medium">{asset.value}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Condition</span>
                  <p className={`font-medium ${getConditionColor(asset.condition)}`}>
                    {asset.condition}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Purchase Date</span>
                </div>
                <p className="text-sm font-medium">
                  {new Date(asset.purchaseDate).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Warranty expires:</span>
                  <span>{new Date(asset.warranty).toLocaleDateString()}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssetManagement;