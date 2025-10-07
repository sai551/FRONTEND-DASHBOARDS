import { useState, useEffect } from "react";
// import axios from "axios"; // 🔒 Uncomment when backend is ready

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderOpen,
  Users,
  Calendar,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  status: "On Track" | "At Risk" | "In Progress";
  dueDate: string;
  teamLead: string;
  team: string[];
  details: string;
}

export default function EmpProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call (replace with axios when backend is ready)
    setLoading(true);
    setTimeout(() => {
      const dummyData: Project[] = [
        {
          id: 1,
          name: "E-commerce Platform",
          description: "Building a modern e-commerce platform with React and Node.js",
          status: "On Track",
          dueDate: "Dec 15, 2024",
          teamLead: "John Doe",
          team: ["John Doe", "Sarah M.", "Mark J.", "Alice L.", "Tom P."],
          details: "This project includes frontend, backend, and payment gateway integration.",
        },
        {
          id: 2,
          name: "Mobile App Redesign",
          description: "Complete redesign of the company mobile application",
          status: "In Progress",
          dueDate: "Jan 10, 2025",
          teamLead: "Sarah M.",
          team: ["Sarah M.", "Tim K.", "Ryan L."],
          details: "The app is being redesigned with a modern UI and improved performance.",
        },
        {
          id: 3,
          name: "API Documentation",
          description: "Comprehensive documentation for all API endpoints",
          status: "At Risk",
          dueDate: "Dec 5, 2024",
          teamLead: "Peter T.",
          team: ["Peter T.", "James D."],
          details: "Work includes REST API, authentication, and versioning guidelines.",
        },
      ];
      setProjects(dummyData);
      setLoading(false);
    }, 1500); // Simulated delay
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Projects</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <>
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </>
        ) : (
          <>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">On Track</p>
                  <p className="text-2xl font-bold">
                    {projects.filter((p) => p.status === "On Track").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                  <p className="text-2xl font-bold">
                    {projects.filter((p) => p.status === "At Risk").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {loading
            ? Array(2)
                .fill(0)
                .map((_, idx) => (
                  <Card key={idx} className="p-6 space-y-4">
                    <Skeleton className="h-6 w-1/3 rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                  </Card>
                ))
            : projects.map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-lg transition"
                  onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge
                        className={
                          project.status === "On Track"
                            ? "bg-green-100 text-green-800"
                            : project.status === "At Risk"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  {expanded === project.id && (
                    <CardContent className="space-y-4">
                      {/* Team Lead */}
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          <span className="font-medium">Team Lead:</span> {project.teamLead}
                        </p>
                      </div>

                      {/* Team Members */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Team Members</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.team.map((member, idx) => (
                            <Avatar key={idx} className="h-8 w-8">
                              <AvatarFallback>
                                {member.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          <span className="font-medium">Due Date:</span> {project.dueDate}
                        </p>
                      </div>

                      {/* Project Details */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Details</h4>
                        <p className="text-sm text-muted-foreground">{project.details}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="p-6 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">No Completed Projects</h3>
              <p className="text-muted-foreground">Your completed projects will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="p-6 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">No Archived Projects</h3>
              <p className="text-muted-foreground">Archived projects will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
