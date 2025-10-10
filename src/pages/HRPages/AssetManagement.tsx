import { useState } from "react";
import EmployeeAssetRequests from "./EmployeeAssetRequests";
import OperationsAssetRequests from "./OperationsAssetRequests";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Layers, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ================= KPI DATA (Mock) =================
const kpis = [
  {
    title: "Total Assets",
    value: 120,
    icon: <Layers className="h-6 w-6 text-white" />,
    bg: "bg-gradient-primary",
    subtitle: "Across categories",
  },
  {
    title: "In Use",
    value: 85,
    icon: <CheckCircle className="h-6 w-6 text-white" />,
    bg: "bg-gradient-success",
    subtitle: "Assigned to employees",
  },
  {
    title: "In Maintenance",
    value: 12,
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    bg: "bg-gradient-warning",
    subtitle: "Needs attention",
  },
];

const AssetManagement = () => {
  const [activeTab, setActiveTab] = useState<"employee" | "operations">("employee");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Asset Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage company assets with lifecycle operations
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={activeTab === "employee" ? "default" : "outline"}
            onClick={() => setActiveTab("employee")}
            className={
              activeTab === "employee"
                ? "bg-orange-600/20 text-black hover:bg-orange-600/20"
                : "text-black border-orange-500 hover:bg-orange-600/20 hover:text-black "
            }
          >
            Employee Asset Requests
          </Button>

          <Button
            variant={activeTab === "operations" ? "default" : "outline"}
            onClick={() => setActiveTab("operations")}
            className={
              activeTab === "operations"
                ? "bg-orange-600/20 text-black hover:bg-orange-600/20"
                : "text-black border-orange-500 hover:bg-orange-600/20  hover:text-black "
            }
          >
            Operations Asset Requests
          </Button>

        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 ${kpi.bg} rounded-2xl`}>{kpi.icon}</div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <Badge variant="secondary" className="mt-1">
                    {kpi.subtitle}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TOGGLED PAGES */}
      <div>
        {activeTab === "employee" ? <EmployeeAssetRequests /> : <OperationsAssetRequests />}
      </div>
    </div>
  );
};

export default AssetManagement;

