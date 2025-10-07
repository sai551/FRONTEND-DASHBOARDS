import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FolderKanban, 
  TrendingUp, 
  UserCheck, 
  Calendar, 
  Package, 
  FileText, 
  Settings 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Departments", url: "/departments", icon: Building2 },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Financial Reports", url: "/financial-reports", icon: TrendingUp },
  { title: "HR & Payroll", url: "/hr-payroll", icon: UserCheck },
  { title: "Attendance & Leave", url: "/attendance-leave", icon: Calendar },
  { title: "Asset Management", url: "/asset-management", icon: Package },
  { title: "Notices & Policies", url: "/notices-policies", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath === path;
  };

  const getNavClassName = (isActiveItem: boolean) =>
    isActiveItem 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-dashboard-sidebar border-r border-border shadow-dashboard-sm`}
    >
      <SidebarContent>
        {/* Logo/Brand */}
        <div className="flex items-center justify-center h-16 border-b border-border">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Director</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
        </div>

        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel>
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActiveItem = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={`${getNavClassName(isActiveItem)} transition-all duration-200`}
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;