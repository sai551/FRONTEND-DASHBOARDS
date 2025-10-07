import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  FolderOpen, 
  Calendar, 
  BarChart3, 
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

const items = [
  { title: "Dashboard", url: "/teamleaddashboard", icon: LayoutDashboard },
  { title: "My Team", url: "/teamlead/team", icon: Users },
  { title: "Tasks", url: "/teamlead/tasks", icon: CheckSquare },
  { title: "Projects", url: "/teamlead/projects", icon: FolderOpen },
  { title: "Leave Requests", url: "/teamlead/leave-requests", icon: Calendar },
  { title: "Reports", url: "/teamlead/reports", icon: BarChart3 },
  { title: "Settings", url: "/teamlead/settings", icon: Settings },
];


export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <Sidebar 
      className={`${state === "collapsed" ? "w-16" : "w-64"} bg-sidebar border-r border-sidebar-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-bold text-sidebar-foreground">Team Lead</h2>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-4 py-4">
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider mb-2">
            {state !== "collapsed" ? "Navigation" : ""}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-lg">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={({ isActive }) => `${getNavCls({ isActive })} flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all`}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {state !== "collapsed" && (
                        <span className="font-medium">{item.title}</span>
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