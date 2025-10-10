import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import { TrainerSidebar } from "./Sidebar";
import { TrainerHeader } from "./Header";

export function TrainerLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <TrainerSidebar />
        <div className="flex-1 flex flex-col">
          <TrainerHeader />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}