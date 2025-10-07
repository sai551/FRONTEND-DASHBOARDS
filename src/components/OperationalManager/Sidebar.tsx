import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  DollarSign, 
  FolderOpen, 
  Users, 
  Wrench, 
  CheckCircle, 
  ClipboardList, 
  UserCheck, 
  Calendar, 
  Truck,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Assets', href: '/assets', icon: Package },
  { name: 'Asset Requests', href: '/asset-requests', icon: FileText },
  { name: 'Expenses', href: '/expenses', icon: DollarSign },
  { name: 'Project Resources', href: '/project-resources', icon: FolderOpen },
  { name: 'Vendors', href: '/vendors', icon: Users },
  { name: 'Maintenance Logs', href: '/maintenance-logs', icon: Wrench },
  { name: 'Approvals', href: '/approvals', icon: CheckCircle },
  { name: 'Task Operations', href: '/task-operations', icon: ClipboardList },
  { name: 'Employee Movements', href: '/employee-movements', icon: UserCheck },
  { name: 'Facility Booking', href: '/facility-booking', icon: Calendar },
  { name: 'Transport Schedules', href: '/transport-schedules', icon: Truck },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-[hsl(var(--sidebar-bg))] border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">OpManager</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop logo */}
        <div className="p-4 border-b border-sidebar-border hidden md:block">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">OpManager</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => window.innerWidth < 768 && onClose()}
                    className={cn(
                      'nav-link',
                      isActive && 'active'
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground text-center">
            OpManager v2.1.0
          </div>
        </div>
      </aside>
    </>
  );
}