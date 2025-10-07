import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Package, 
  Lightbulb, 
  Map, 
  Bug, 
  MessageSquare, 
  Users, 
  FileText, 
  Calendar,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Products", href: "/products", icon: Package },
  { name: "Features", href: "/features", icon: Lightbulb },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Bug Tracker", href: "/bugs", icon: Bug },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
  { name: "Team", href: "/Team", icon: Users },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Schedule", href: "/schedule", icon: Calendar },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border shadow-elevated">
      <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border bg-gradient-header">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground">PM Dashboard</span>
            <span className="text-xs text-muted-foreground">Product Manager</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              )
            }
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-sidebar">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent />
      </div>
    </>
  );
}