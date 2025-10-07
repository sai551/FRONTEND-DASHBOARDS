import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Mail, MessageSquare, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  status: "Online" | "Away" | "Offline";
  projects: string[];
  skills: string[];
}

// ✅ Helper for status colors
const getStatusColor = (status: string) => {
  const colors = {
    Online: "bg-green-500",
    Away: "bg-yellow-500",
    Offline: "bg-gray-400",
  };
  return colors[status as keyof typeof colors] || "bg-gray-400";
};

export default function ProductTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMember, setNewMember] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    department: "",
    email: "",
    status: "Offline",
    projects: [],
    skills: [],
  });

  // ✅ Fetch team members from backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Uncomment when backend ready
        // const response = await axios.get("/api/team");
        // setTeamMembers(response.data);

        // Temporary dummy data
        setTeamMembers([
          {
            id: 1,
            name: "Vijay",
            role: "Product Manager",
            department: "Product",
            email: "vijay@example.com",
            status: "Online",
            projects: ["Mobile App v2.0", "API Gateway"],
            skills: ["Strategy", "Analytics", "Leadership"],
          },
          {
            id: 2,
            name: "Sandeep",
            role: "Senior Developer",
            department: "Engineering",
            email: "sandeep@example.com",
            status: "Away",
            projects: ["Web Platform", "Analytics Dashboard"],
            skills: ["React", "Node.js", "TypeScript"],
          },
        ]);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTeam();
  }, []);

  // ✅ Add new member
  const handleAddMember = async () => {
    try {
      // Uncomment when backend ready
      // const response = await axios.post("/api/team", newMember);
      // setTeamMembers([...teamMembers, response.data]);

      // Temporary dummy add
      const dummyId = teamMembers.length + 1;
      setTeamMembers([...teamMembers, { id: dummyId, ...newMember }]);
      setNewMember({
        name: "",
        role: "",
        department: "",
        email: "",
        status: "Offline",
        projects: [],
        skills: [],
      });
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  // ✅ Delete member
  const handleDeleteMember = async (id: number) => {
    try {
      // Uncomment when backend ready
      // await axios.delete(`/api/team/${id}`);

      setTeamMembers(teamMembers.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // ✅ Filter based on search
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Team Members</h1>
          <p className="text-gray-600">Collaborate and connect with your colleagues</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-700 hover:bg-purple-800 text-white flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Invite Member</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
              <Input
                placeholder="Role"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              />
              <Input
                placeholder="Department"
                value={newMember.department}
                onChange={(e) =>
                  setNewMember({ ...newMember, department: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
              <Button
                onClick={handleAddMember}
                className="bg-purple-700 hover:bg-purple-800 text-white"
              >
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border border-purple-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="border border-gray-200 shadow-md hover:shadow-lg hover:bg-[#E6E6FA] transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-14 w-14 ring-2 ring-purple-200">
                    <AvatarFallback className="bg-purple-700 text-white font-semibold">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(
                      member.status
                    )}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-purple-900 truncate">
                    {member.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 truncate">{member.role}</p>
                  <Badge variant="outline" className="mt-2 border-purple-300 text-purple-900">
                    {member.department}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-purple-900">Projects</h4>
                <div className="flex flex-wrap gap-1">
                  {member.projects.map((project, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200"
                    >
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-purple-900">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-purple-300 text-purple-900 hover:bg-purple-100"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 min-w-[90px] border-purple-300 text-purple-900 hover:bg-purple-100"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  <span>Email</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 min-w-[90px] border-purple-300 text-purple-900 hover:bg-purple-100"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>Chat</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteMember(member.id)}
                  className="flex-1 min-w-[90px] border-red-300 text-red-600 hover:bg-red-100"
                >
                  <Trash className="h-4 w-4 mr-1" />
                  <span>Remove</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
