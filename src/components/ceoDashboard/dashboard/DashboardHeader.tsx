import { Bell, Settings, LogOut, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ceoProfile from "@/assets/ceo-profile.jpg";
import { Api_EndPoints, FrontendRoutes } from "@/Config/Api_Endpoints";

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm bg-[rgb(236,248,255)] sticky top-0 z-50">
      <div className="flex h-14 md:h-16 items-center justify-between px-3 md:px-6 gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger />

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs md:text-sm">
                OMS
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-base md:text-lg">
                Office Management System
              </h1>
            </div>
            <div className="block sm:hidden">
              <h1 className="font-semibold text-sm">OMS</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 ">
          {/* Search */}
          <div className="relative hidden lg:block ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 w-48 xl:w-64" />
          </div>

          {/* Mobile search button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 md:h-10 md:w-10"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 md:h-10 md:w-10"
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 p-0 flex items-center justify-center text-xs bg-destructive">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">New project completed</p>
                  <p className="text-xs text-muted-foreground">
                    Mobile App Development project has been completed by the dev
                    team.
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Leave request pending</p>
                  <p className="text-xs text-muted-foreground">
                    3 leave requests are pending your approval.
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Monthly meeting reminder
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Board meeting scheduled for tomorrow at 10:00 AM.
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 md:h-10 w-auto px-1 md:px-2"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <Avatar className="h-6 w-6 md:h-8 md:w-8">
                    <AvatarImage src={ceoProfile} alt="CEO" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      Chief Executive Officer
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(FrontendRoutes.PROFILE)}
                className="hover:bg-[#670D2F] focus:bg-orange-600/20 active:bg-orange-600/20 text-black transition-colors"
              >
                <User className="mr-2 h-4 w-4 cursor-pointer" />
                <span className="cursor-pointer">View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="hover:bg-[#670D2F] focus:bg-[#670D2F] active:bg-[#670D2F] text-black transition-colors"
              >
                <Settings className="mr-2 h-4 w-4 cursor-pointer" />
                <span className="cursor-pointer">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="hover:bg-red-600 focus:bg-red-700 active:bg-red-700 text-red-500 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                <span className="cursor-pointer">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
