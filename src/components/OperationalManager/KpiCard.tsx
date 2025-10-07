import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  className?: string;
}

export function KpiCard({ title, value, change, icon: Icon, className }: KpiCardProps) {
  return (
    <div className={cn('kpi-card', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'text-xs font-medium',
                  change.type === 'increase' 
                    ? 'text-dashboard-success' 
                    : 'text-destructive'
                )}
              >
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}