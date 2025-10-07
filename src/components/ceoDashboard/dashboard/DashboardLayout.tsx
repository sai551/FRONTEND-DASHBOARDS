// import { useState } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "./AppSidebar";
// import { DashboardHeader } from "./DashboardHeader";
// import { DashboardMain } from "./DashboardMain";

// export function DashboardLayout() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   return (
//     <SidebarProvider>
//       <div className="min-h-screen flex w-full bg-background">
//         <AppSidebar />
        
//         <div className="flex-1 flex flex-col">
//           <DashboardHeader />
//           <DashboardMain />
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }




import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
