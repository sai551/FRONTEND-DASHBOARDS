import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import { ProjectManagerSidebar } from "./Sidebar";
import { ProjectManagerHeader } from "./Header";

export function ProjectManagerLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ProjectManagerSidebar />
        <div className="flex-1 flex flex-col">
          <ProjectManagerHeader />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}