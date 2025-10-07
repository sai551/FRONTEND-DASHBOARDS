import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Teamleads() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",
      role: "Senior Developer",
      status: "Active",
      joinDate: "2022-03-15",
      avatar: "/placeholder-avatar.jpg",
      tasksCompleted: 45,
      currentProjects: 3
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      phone: "+1 (555) 234-5678",
      role: "Frontend Developer",
      status: "On Leave",
      joinDate: "2022-08-20",
      avatar: "/placeholder-avatar.jpg",
      tasksCompleted: 32,
      currentProjects: 2
    },
    {
      id: 3,
      name: "Lisa Wilson",
      email: "lisa.wilson@company.com",
      phone: "+1 (555) 345-6789",
      role: "UX Designer",
      status: "Active",
      joinDate: "2021-11-10",
      avatar: "/placeholder-avatar.jpg",
      tasksCompleted: 38,
      currentProjects: 4
    },
    {
      id: 4,
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+1 (555) 456-7890",
      role: "Backend Developer",
      status: "Active",
      joinDate: "2023-01-05",
      avatar: "/placeholder-avatar.jpg",
      tasksCompleted: 28,
      currentProjects: 2
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      phone: "+1 (555) 567-8901",
      role: "QA Engineer",
      status: "Active",
      joinDate: "2022-06-12",
      avatar: "/placeholder-avatar.jpg",
      tasksCompleted: 41,
      currentProjects: 3
    },
    {
      id: 6,
      name: "David Brown",
      email: "david.brown@company.com",
      phone: "+1 (555) 678-9012",
      role: "DevOps Engineer",
      status: "Active",
      joinDate: "2021-09-30",
      avatar: "/placeholder-avatar.jpg",
      tasksCompleted: 52,
      currentProjects: 2
    }
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Team</h1>
        <p className="text-muted-foreground">Manage and monitor your team members</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{teamMembers.length}</div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {teamMembers.filter(m => m.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {teamMembers.filter(m => m.status === "On Leave").length}
            </div>
            <div className="text-sm text-muted-foreground">On Leave</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0) / teamMembers.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Tasks</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Assign Task</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Badge 
                  variant={member.status === "Active" ? "default" : "secondary"}
                  className={member.status === "Active" ? "bg-success text-success-foreground" : ""}
                >
                  {member.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="font-semibold text-primary">{member.tasksCompleted}</div>
                  <div className="text-xs text-muted-foreground">Tasks Done</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-warning">{member.currentProjects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}