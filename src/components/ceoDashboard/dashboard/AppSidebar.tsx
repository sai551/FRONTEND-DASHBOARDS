// import {
//   LayoutDashboard,
//   Building2,
//   Users,
//   BarChart3,
//   DollarSign,
//   FolderOpen,
//   Calendar,
//   Briefcase,
//   MessageSquare,
//   Settings,
//   TrendingUp,
//   FileText,
//   UserCheck,
//   Plus,
// } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useState } from "react";

// const navigationItems = [
//   { title: "Dashboard", url:"/dashboard", icon: LayoutDashboard },
//   { title: "Company Performance", url: "/perfomances", icon: TrendingUp },
//   { title: "Departments", url: "/department", icon: Building2 },
//   { title: "Employee",
//     // url: "/employees",
//     icon: Users,
//     children: [
//       { title: "Add New Employee", url: "/employee", icon: Plus },
//       { title: "Employee List", url: "/employees/list", icon: Users },
//     ],
//   },
//   { title: "Financial Overview", url: "/FinancialOverview", icon: DollarSign },
//   { title: "Project Status", url: "/projects", icon: FolderOpen },
//   { title: "Attendance Reports", url: "/attendance", icon: UserCheck },
//   { title: "Leave Management", url: "/leaves", icon: Calendar },
//   { title: "Asset Management", url: "/assets", icon: Briefcase },
//   { title: "Messages", url: "/messages", icon: MessageSquare },
// ];

// const quickActions = [
//   { title: "Reports", url: "/reports", icon: FileText },
//   { title: "Analytics", url: "/analytics", icon: BarChart3 },
//   { title: "Settings", url: "/settings", icon: Settings },
// ];

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const collapsed = state === "collapsed";
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

//   const isActive = (path: string) => currentPath === path;
//   const getNavClasses = (active: boolean) =>
//     active
//       ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90"
//       : "text-muted-foreground hover:text-foreground hover:bg-accent";

//   return (
//     <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`} collapsible="icon">
//       <SidebarContent className="bg-sidebar">
//         {/* Main Navigation */}
//         <SidebarGroup className="mt-4">
//           <SidebarGroupLabel
//             className={`${collapsed ? "sr-only" : ""} text-xs font-semibold text-muted-foreground uppercase tracking-wider`}
//           >
//             Main Navigation
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="space-y-1">
//               {navigationItems.map((item) => (
//                 <div key={item.title}>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton
//                       asChild
//                       className="h-10"
//                       onClick={() =>
//                         item.children
//                           ? setOpenSubmenu(openSubmenu === item.title ? null : item.title)
//                           : undefined
//                       }
//                     >
//                       <NavLink
//                         to={item.url}
//                         className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
//                           getNavClasses(isActive(item.url))
//                         }`}
//                       >
//                         <item.icon className="h-5 w-5 flex-shrink-0" />
//                         {!collapsed && <span className="truncate">{item.title}</span>}
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>

//                   {/* Submenu Items */}
//                   {!collapsed &&
//                     item.children &&
//                     openSubmenu === item.title && (
//                       <div className="ml-8 mt-1 space-y-1">
//                         {item.children.map((subItem) => (
//                           <SidebarMenuItem key={subItem.title}>
//                             <SidebarMenuButton asChild className="h-9">
//                               <NavLink
//                                 to={subItem.url}
//                                 className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors ${
//                                   getNavClasses(isActive(subItem.url))
//                                 }`}
//                               >
//                                 {subItem.icon && <subItem.icon className="h-4 w-4" />}
//                                 <span>{subItem.title}</span>
//                               </NavLink>
//                             </SidebarMenuButton>
//                           </SidebarMenuItem>
//                         ))}
//                       </div>
//                     )}
//                 </div>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         {/* Quick Actions */}
//         <SidebarGroup className="mt-8">
//           <SidebarGroupLabel
//             className={`${collapsed ? "sr-only" : ""} text-xs font-semibold text-muted-foreground uppercase tracking-wider`}
//           >
//             Quick Actions
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="space-y-1">
//               {quickActions.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild className="h-10">
//                     <NavLink
//                       to={item.url}
//                       className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
//                         getNavClasses(isActive(item.url))
//                       }`}
//                     >
//                       <item.icon className="h-5 w-5 flex-shrink-0" />
//                       {!collapsed && <span className="truncate">{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }


import {
  LayoutDashboard,
  Building2,
  BarChart3,
  DollarSign,
  FolderOpen,
  Calendar,
  Briefcase,
  MessageSquare,
  Settings,
  TrendingUp,
  FileText,
  UserCheck,
  Plus,
  Users,
  
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
import { useState } from "react";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Company Performance", url: "/perfomances", icon: TrendingUp },
  { title: "Departments", url: "/department", icon: Building2 },
  { title: "Employee", url: "/employee", icon: Users },
  { title: "Financial Overview", url: "/FinancialOverview", icon: DollarSign },
  { title: "Project Status", url: "/projects", icon: FolderOpen },
  { title: "Attendance Reports", url: "/attendance", icon: UserCheck },
  { title: "Leave Management", url: "/leaves", icon: Calendar },
  { title: "Asset Management", url: "/assets", icon: Briefcase },
  { title: "Messages", url: "/messages", icon: MessageSquare },
];

const quickActions = [
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (active: boolean) =>
    active
      ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90"
      : "text-muted-foreground hover:text-foreground hover:bg-accent";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        {/* Main Navigation */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel
            className={`${
              collapsed ? "sr-only" : ""
            } text-xs font-semibold text-muted-foreground uppercase tracking-wider`}
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClasses(
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
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel
            className={`${
              collapsed ? "sr-only" : ""
            } text-xs font-semibold text-muted-foreground uppercase tracking-wider`}
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClasses(
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
