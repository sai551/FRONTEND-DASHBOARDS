import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  FileText,
  Edit,
  Trash2,
  Upload
} from "lucide-react";

export default function TrainingSessions() {
  const sessions = [
    {
      id: 1,
      title: "React Fundamentals",
      date: "2024-01-15",
      time: "09:00 AM - 12:00 PM",
      location: "Room A-101",
      trainees: 8,
      status: "Scheduled",
      materials: ["Slides", "Code Examples"]
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      date: "2024-01-15",
      time: "11:30 AM - 02:30 PM",
      location: "Online",
      trainees: 12,
      status: "In Progress",
      materials: ["Video", "Assignments"]
    },
    {
      id: 3,
      title: "Node.js Basics",
      date: "2024-01-15",
      time: "02:00 PM - 05:00 PM",
      location: "Room B-205",
      trainees: 6,
      status: "Completed",
      materials: ["PDF Guide", "Projects"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Sessions</h1>
          <p className="text-gray-600">Manage your training sessions and materials</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Session
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search sessions..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline">Filter Status</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Sessions</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {session.location}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant={
                    session.status === "Completed" ? "default" :
                    session.status === "In Progress" ? "destructive" : 
                    "secondary"
                  }>
                    {session.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{session.trainees} trainees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{session.materials.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Materials
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Scheduled sessions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">In-progress sessions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Completed sessions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              <span>Create Session</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Upload className="h-6 w-6 mb-2" />
              <span>Upload Materials</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Assign Trainees</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Schedule Session</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}