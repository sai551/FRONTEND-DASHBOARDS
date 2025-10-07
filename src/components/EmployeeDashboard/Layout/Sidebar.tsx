import {
  LayoutDashboard,
  FileText,
  UserCheck,
  Calendar,
  MessageSquare,
  Settings,
  CheckSquare,
  FolderOpen,
  BarChart3,
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
  { title: "Dashboard", url: "/emp/dashboard", icon: LayoutDashboard },
  { title: "Tasks", url: "/emp/tasks", icon: CheckSquare },
  { title: "My Projects", url: "/emp/projects", icon: FolderOpen },
  { title: "Team Chat", url: "/emp/team", icon: MessageSquare },
  { title: "Documents", url: "/emp/documents", icon: FileText },
  { title: "Attendance Reports", url: "/emp/attendance", icon: UserCheck },
  { title: "Leave Management", url: "/emp/leave", icon: Calendar },
  { title: "Messages", url: "/emp/messages", icon: MessageSquare },
];

const quickActions = [
  { title: "Performance", url: "/emp/performance", icon: BarChart3 },
  { title: "Reports", url: "/emp/reports", icon: FileText },
  { title: "Settings", url: "/emp/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path?: string) => currentPath === path;

  const getNavClasses = (active: boolean) =>
    active
      ? "bg-violet-800 text-white font-medium scale-100"
      : "text-gray-600 hover:bg-violet-700 hover:text-blue-600 hover:scale-105 active:scale-95";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-white border-r border-gray-200 min-h-screen overflow-y-auto scrollbar-hide">
        {/* Sidebar Header with Trigger */}
        <div className="flex items-center justify-between px-3 py-3">
          {!collapsed && (
            <h2 className="font-bold text-lg text-violet-800">Navigation</h2>
          )}
          <SidebarTrigger className="h-8 w-8 rounded-md hover:bg-violet-100 flex items-center justify-center">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel
            className={`${
              collapsed ? "sr-only" : ""
            } text-xs font-semibold text-gray-500 uppercase tracking-wider px-4`}
          >
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 transform ${getNavClasses(
                        isActive(item.url)
                      )}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
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
            className={`${
              collapsed ? "sr-only" : ""
            } text-xs font-semibold text-gray-500 uppercase tracking-wider px-4`}
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 transform ${getNavClasses(
                        isActive(item.url)
                      )}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
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
