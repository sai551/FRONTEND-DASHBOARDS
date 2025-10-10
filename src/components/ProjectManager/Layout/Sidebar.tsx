import {
  LayoutDashboard,
  FolderKanban,
  Users,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  FileBarChart,
  Calendar,
  Settings,
  Menu,
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/projectmanager/dashboard", icon: LayoutDashboard },
  { title: "Projects", url: "/projectmanager/projects", icon: FolderKanban },
  { title: "Tasks & Teams", url: "/projectmanager/tasks-tracking", icon: Users },
  { title: "Performance & KPIs", url: "/projectmanager/performance", icon: TrendingUp },
  { title: "Budget & Finance", url: "/projectmanager/budget", icon: DollarSign },
  { title: "Risk & Issues", url: "/projectmanager/risk", icon: AlertTriangle },
  { title: "Reports & Analytics", url: "/projectmanager/reports", icon: FileBarChart },
  { title: "Events & Meetings", url: "/projectmanager/events", icon: Calendar },
];

const quickActions = [
  { title: "Profile", url: "/projectmanager/profile", icon: Users },
  { title: "Settings", url: "/projectmanager/settings", icon: Settings },
];

export function ProjectManagerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = (active: boolean) =>
    active
      ? "bg-blue-600 text-white font-medium"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-white border-r border-gray-200 min-h-screen overflow-y-auto scrollbar-hide">
        {/* Sidebar Header with Trigger */}
        <div className="flex items-center justify-between px-3 py-3">
          {!collapsed && (
            <h2 className="font-bold text-lg text-blue-600">Navigation</h2>
          )}
          <SidebarTrigger className="h-8 w-8 rounded-md hover:bg-blue-50 flex items-center justify-center">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel
            className={`${collapsed ? "sr-only" : ""} text-xs font-semibold text-gray-500 uppercase tracking-wider px-4`}
          >
            Project Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className={`flex items-center rounded-lg transition-all duration-200 ${
                        collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
                      } ${getNavClasses(isActive(item.url))}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel
            className={`${collapsed ? "sr-only" : ""} text-xs font-semibold text-gray-500 uppercase tracking-wider px-4`}
          >
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className={`flex items-center rounded-lg transition-all duration-200 ${
                        collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
                      } ${getNavClasses(isActive(item.url))}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
