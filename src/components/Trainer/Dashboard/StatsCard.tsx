import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient: string;
  description?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  gradient,
  description 
}: StatsCardProps) => {
  return (
    <Card className="relative overflow-hidden border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-foreground">
                {value}
              </h3>
              {change && (
                <span
                  className={cn(
                    'text-sm font-medium px-2 py-1 rounded-full',
                    {
                      'text-success bg-success/10': changeType === 'positive',
                      'text-danger bg-danger/10': changeType === 'negative',
                      'text-muted-foreground bg-muted/50': changeType === 'neutral',
                    }
                  )}
                >
                  {change}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>
          
          <div className={cn('p-3 rounded-2xl shadow-lg', gradient)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        
        {/* Decorative background pattern */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-5">
          <Icon className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;