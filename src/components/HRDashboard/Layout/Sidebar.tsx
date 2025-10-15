


import {
  LayoutDashboard,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  UserCheck,
  Plus,
  ChevronDown,
  ChevronRight,
  Briefcase,
  UserPlus,
  ClipboardList,
  FileCheck,
  Menu,
  Settings,
  ArrowRightLeft,
  UserX,
  Award,
  Shield,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";

const navigationItems = [
  { title: "Dashboard", url: "/HRdashboard", icon: LayoutDashboard },
  {
    title: "Recruitment",
    url: "/recruitment",
    icon: Users,
    children: [
      { title: "Job Openings", url: "/recruitment/jobs", icon: Briefcase },
      { title: "Applicants", url: "/recruitment/applicants", icon: UserPlus },
      { title: "Interview", url: "/recruitment/interview", icon: ClipboardList },
      {
        title: "Document Verification / Onboarding",
        url: "/recruitment/document-verification",
        icon: FileCheck,
      },
    ],
  },
  {
    title: "Asset Management",
    url: "/assetmanagement",
    icon: DollarSign,
    // children: [
    //   {
    //     title: "Employee Asset Requests",
    //     url: "/employees/asset-requests",
    //     icon: Plus,
    //   },
    //    {
    //     title: "Operation Asset Requests",
    //     url: "/employees/operation/asset-request",
    //     icon: Plus,
    //   },
    // ],
  },
  {
    title: "Employees",
    url: "/employeess",
    icon: Users,
  },

  { title: "Attendance Reports", url: "/attendance", icon: UserCheck },
  { title: "Payroll Management", url: "/payroll", icon: DollarSign },
  { title: "Employee Performance", url: "/emp-performance", icon: TrendingUp },
  { title: "Employee Transitions", url: "/employees/transitions", icon: ArrowRightLeft },
  { title: "HR Policies", url: "/hr-policies", icon: Shield },
];

const quickActions = [
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    navigationItems.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some((child) =>
          currentPath.startsWith(child.url)
        );
        if (isChildActive) {
          setOpenSubmenu(item.title);
        }
      }
    });
  }, [currentPath]);

  const isActive = (url?: string, children?: { url: string }[]) => {
    if (children) {
      return (
        currentPath === url ||
        children.some((child) => currentPath.startsWith(child.url))
      );
    }
    return url ? currentPath === url : false;
  };

  const getNavClasses = (active: boolean) =>
  active
     ? "bg-orange-300 text-white font-medium"
     : " hover:bg-orange-200";


  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-orange-100/90 border-r min-h-screen overflow-y-auto scrollbar-hide">
        {/* Header with Trigger */}
        <div className="flex items-center justify-between px-3 py-3">
          {!collapsed && (
            <h2 className="font-bold text-lg text-orange-500">Navigation</h2>
          )}
          <SidebarTrigger className="h-8 w-8 rounded-md hover:bg-orange-500 flex items-center justify-center">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel
            className={`${
              collapsed ? "sr-only" : ""
            } text-xs font-semibold text-orange-500 uppercase tracking-wider px-4`}
          >
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 ">
              {navigationItems.map((item) => {
                const active = isActive(item.url, item.children);
                const isDropdownOpen = openSubmenu === item.title;

                return (
                  <div key={item.title}>
                    {!item.children ? (
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className="h-10">
                          <NavLink
                            to={item.url || "#"}
                            className={`flex items-center rounded-lg transition-all 
                              ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"} 
                              ${getNavClasses(active)}`}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!collapsed && (
                              <span className="truncate">{item.title}</span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ) : (
                      <SidebarMenuItem>
                        <button
                          onClick={() => {
                            navigate(item.url || "#");
                            setOpenSubmenu(
                              isDropdownOpen ? null : item.title
                            );
                          }}
                          className={`w-full flex items-center  rounded-lg transition-all 
                            ${collapsed ? "justify-center p-2" : "justify-between px-3 py-2"} 
                            ${getNavClasses(active)}`}
                        >
                          <div
                            className={`flex items-center ${
                              collapsed ? "justify-center" : "gap-3"
                            }`}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!collapsed && (
                              <span className="truncate">{item.title}</span>
                            )}
                          </div>
                          {!collapsed &&
                            (isDropdownOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            ))}
                        </button>

                        {/* Submenu */}
                        {!collapsed && isDropdownOpen && (
                          <div className="ml-8 mt-1 space-y-1">
                            {item.children.map((subItem) => {
                              const childActive = isActive(subItem.url);
                              return (
                                <SidebarMenuItem key={subItem.title}>
                                  <SidebarMenuButton asChild className="h-9">
                                    <NavLink
                                      to={subItem.url}
                                      className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-all ${getNavClasses(
                                        childActive
                                      )}`}
                                    >
                                      {subItem.icon && (
                                        <subItem.icon className="h-4 w-4" />
                                      )}
                                      <span>{subItem.title}</span>
                                    </NavLink>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </div>
                        )}
                      </SidebarMenuItem>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel
            className={`${
              collapsed ? "sr-only" : ""
            } text-xs font-semibold text-orange-500 uppercase tracking-wider px-4`}
          >
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {quickActions.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10">
                      <NavLink
                        to={item.url}
                        className={`flex items-center rounded-lg transition-all 
                          ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"} 
                          ${getNavClasses(active)}`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && (
                          <span className="truncate">{item.title}</span>
                        )}
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
}
