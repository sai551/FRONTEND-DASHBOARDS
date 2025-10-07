import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function OpsDashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar isOpen={true} onClose={() => {}} />
        <div className="flex-1 flex flex-col">
          <Navbar
            onToggleSidebar={() => {}}
            darkMode={false}
            setDarkMode={() => {}}
          />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}