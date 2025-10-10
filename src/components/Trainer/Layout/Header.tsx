

import { Bell, Settings, LogOut, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TrainerHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm bg-[rgb(236,248,255)] sticky top-0 z-50">
      <div className="flex h-14 md:h-16 items-center justify-between px-3 md:px-6 gap-2 md:gap-4">
        {/* Title only (no SidebarTrigger here) */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs md:text-sm">
              OMS
            </span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-semibold text-base md:text-lg">
              Training Management System
            </h1>
          </div>
          <div className="block sm:hidden">
            <h1 className="font-semibold text-sm">TMS</h1>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions, trainees..."
              className="pl-10 w-48 xl:w-64"
            />
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
                variant="outline"
                size="icon"
                className="relative h-8 w-8 md:h-10 md:w-10 transition-colors rounded-lg border-green-200 hover:bg-green-50"
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 p-0 flex items-center justify-center text-xs bg-destructive">
                  5
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Training Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Session feedback received
                  </p>
                  <p className="text-xs text-muted-foreground">
                    New feedback from React Fundamentals session.
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Session starting soon</p>
                  <p className="text-xs text-muted-foreground">
                    JavaScript Advanced session starts in 30 minutes.
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Attendance alert</p>
                  <p className="text-xs text-muted-foreground">
                    3 trainees marked absent for today's session.
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 md:h-10 w-auto px-1 md:px-2 hover:bg-green-50 rounded-lg"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <Avatar className="h-6 w-6 md:h-8 md:w-8">
                    <AvatarImage src="/trainer-profile.jpg" alt="Profile" />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      TR
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">Trainer</p>
                    <p className="text-xs text-muted-foreground">
                      Senior Trainer
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>

            {/* Dropdown List */}
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/trainer/profile")}
                className="hover:bg-green-50 focus:bg-green-100 text-black transition-colors"
              >
                <User className="mr-2 h-4 w-4 cursor-pointer" />
                <span className="cursor-pointer">View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/trainer/settings")}
                className="hover:bg-green-50 focus:bg-green-100 text-black transition-colors"
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
