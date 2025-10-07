import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Monitor, Smartphone, Laptop } from "lucide-react";

export default function GmAssets() {
  const assets = [
    {
      id: "LAP001",
      name: "MacBook Pro 16\"",
      type: "Laptop",
      assignee: "Sarah Johnson",
      department: "Engineering",
      status: "In Use",
      purchaseDate: "2023-08-15",
      value: 2500
    },
    {
      id: "MON001", 
      name: "Dell UltraSharp 27\"",
      type: "Monitor",
      assignee: "Michael Chen",
      department: "Marketing",
      status: "In Use",
      purchaseDate: "2023-09-20",
      value: 450
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assets</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage organizational assets
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">342</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Assets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Laptop className="h-4 w-4 text-success" />
              <div className="text-2xl font-bold">156</div>
            </div>
            <p className="text-xs text-muted-foreground">Laptops</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold">89</div>
            </div>
            <p className="text-xs text-muted-foreground">Monitors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">67</div>
            </div>
            <p className="text-xs text-muted-foreground">Mobile Devices</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Inventory</CardTitle>
          <CardDescription>Detailed view of all organizational assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {asset.type === "Laptop" && <Laptop className="h-6 w-6 text-primary" />}
                    {asset.type === "Monitor" && <Monitor className="h-6 w-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-semibold">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {asset.id} • {asset.type}</p>
                    <p className="text-xs text-muted-foreground">
                      Assigned to {asset.assignee} ({asset.department})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="default">{asset.status}</Badge>
                  <p className="text-sm font-medium mt-1">${asset.value}</p>
                  <p className="text-xs text-muted-foreground">{asset.purchaseDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}