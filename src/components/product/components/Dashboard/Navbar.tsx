import { useState } from "react";
import { Bell, Search, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navbar-border bg-navbar/95 backdrop-blur supports-[backdrop-filter]:bg-navbar/80 shadow-header">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        
        {/* Search Bar - Hidden on mobile, visible on larger screens */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search across all sections..." 
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        {/* Right side - Actions & Profile */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          
          {/* Quick Actions - Hidden on small screens */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              New Product
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Add Feature
            </Button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start text-left">
                  <span className="text-sm font-medium">sharath</span>
                  <span className="text-xs text-muted-foreground">Product Manager</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}>
                <User className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}