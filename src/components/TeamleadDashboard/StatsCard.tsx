import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning";
}

export function StatsCard({ title, value, icon: Icon, trend, variant = "default" }: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-gradient-to-r from-success/10 to-success/5 border-success/20";
      case "warning":
        return "bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20";
      default:
        return "bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "success":
        return "text-success bg-success/10";
      case "warning":
        return "text-warning bg-warning/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <Card className={`border transition-all hover:shadow-md ${getVariantStyles()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={`text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
                {trend.isPositive ? '↗' : '↘'} {trend.value}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconStyles()}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}