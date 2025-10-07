import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  header: string;
  className?: string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
  renderCell?: (key: string, value: any, row: Record<string, any>) => ReactNode;
}

export function DataTable({ 
  title, 
  columns, 
  data, 
  className,
  renderCell 
}: DataTableProps) {
  return (
    <div className={cn('table-card', className)}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider',
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-muted/25 transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
                  >
                    {renderCell 
                      ? renderCell(column.key, row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
}