import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, children, className }: ChartCardProps) {
  return (
    <div className={cn('chart-card', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
}