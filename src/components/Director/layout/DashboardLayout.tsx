import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

const DashboardLayoutDirector = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dashboard-bg">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardNavbar />
          <main className="flex-1 p-6 overflow-auto">
            < Outlet/>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayoutDirector;