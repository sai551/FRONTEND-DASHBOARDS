import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderOpen,
  Users,
  Calendar,
  Clock,
  MoreHorizontal,
  Plus,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function ProjectsM() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Projects</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Track</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* E-commerce Platform */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">E-commerce Platform</CardTitle>
                  <CardDescription>
                    Building a modern e-commerce platform with React and Node.js
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">On Track</Badge>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-muted-foreground">Dec 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Team Size</p>
                    <p className="text-sm text-muted-foreground">5 members</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time Remaining</p>
                    <p className="text-sm text-muted-foreground">2 weeks</p>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="text-sm font-medium mb-3">Team Members</h4>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>+1</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button variant="outline" size="sm">Update Status</Button>
              </div>
            </CardContent>
          </Card>

          {/* Mobile App Redesign */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Mobile App Redesign</CardTitle>
                  <CardDescription>
                    Complete redesign of the company mobile application
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">In Progress</Badge>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-muted-foreground">Jan 10, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Team Size</p>
                    <p className="text-sm text-muted-foreground">3 members</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time Remaining</p>
                    <p className="text-sm text-muted-foreground">6 weeks</p>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="text-sm font-medium mb-3">Team Members</h4>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>RL</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button variant="outline" size="sm">Update Status</Button>
              </div>
            </CardContent>
          </Card>

          {/* API Documentation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">API Documentation</CardTitle>
                  <CardDescription>
                    Comprehensive documentation for all API endpoints
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">At Risk</Badge>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-muted-foreground text-red-600">Dec 5, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Team Size</p>
                    <p className="text-sm text-muted-foreground">2 members</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time Remaining</p>
                    <p className="text-sm text-muted-foreground text-red-600">2 days</p>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="text-sm font-medium mb-3">Team Members</h4>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>PT</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button variant="outline" size="sm">Update Status</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">No Completed Projects</h3>
                <p className="text-muted-foreground">Your completed projects will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">No Archived Projects</h3>
                <p className="text-muted-foreground">Archived projects will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}