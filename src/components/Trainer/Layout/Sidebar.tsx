



import {
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  Star,
  GraduationCap,
  ClipboardCheck,
  BarChart3,
  MessageSquare,
  Settings,
  UserCheck,
  FileText,
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
  { title: "Dashboard", url: "/trainer/dashboard", icon: LayoutDashboard },
  { title: "Training Sessions", url: "/trainer/sessions", icon: BookOpen },
  { title: "Trainee Management", url: "/trainer/trainees", icon: Users },
  { title: "Attendance Tracking", url: "/trainer/attendance", icon: UserCheck },
  { title: "Feedback & Evaluation", url: "/trainer/feedback", icon: Star },
  { title: "Course Management", url: "/trainer/courses", icon: GraduationCap },
  { title: "Calendar & Scheduling", url: "/trainer/calendar", icon: Calendar },
  { title: "Reports & Insights", url: "/trainer/reports", icon: BarChart3 },
  { title: "Communications", url: "/trainer/communications", icon: MessageSquare },
];

const quickActions = [
  { title: "Profile", url: "/trainer/profile", icon: Settings },
];

export function TrainerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path?: string) => currentPath === path;

  const getNavClasses = (active: boolean) =>
    active
      ? "bg-green-600 text-white font-medium scale-100"
      : "text-gray-600 hover:bg-green-50 hover:text-green-700 hover:scale-105 active:scale-95";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-white border-r border-gray-200 min-h-screen overflow-hidden">
        {/* Sidebar Header with Trigger */}
        <div className="flex items-center justify-between px-3 py-3">
          {!collapsed && (
            <h2 className="font-bold text-lg text-green-700">
              Trainer Panel
            </h2>
          )}
          <SidebarTrigger className="h-8 w-8 rounded-md hover:bg-green-50 flex items-center justify-center">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </div>

        <div className="h-full overflow-y-auto scrollbar-hide">
          {/* Main Navigation */}
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel
              className={`${
                collapsed ? "sr-only" : ""
              } text-xs font-semibold text-gray-500 uppercase tracking-wider px-4`}
            >
              Training Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10">
                      <NavLink
                        to={item.url}
                        className={`flex items-center rounded-lg transition-all duration-200 transform 
                          ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"} 
                          ${getNavClasses(isActive(item.url))}`}
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
          <SidebarGroup className="mt-8">
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
                        className={`flex items-center rounded-lg transition-all duration-200 transform 
                          ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"} 
                          ${getNavClasses(isActive(item.url))}`}
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
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
