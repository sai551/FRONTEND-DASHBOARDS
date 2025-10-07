import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { DashboardHeader } from "./Header";
import { Outlet } from "react-router-dom";

export function InternDashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar stays fixed */}
        <AppSidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <DashboardHeader />

          {/* Page content will swap dynamically */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
