import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

export function DashboardLayoutProduct() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64">
        <Navbar />
        <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}