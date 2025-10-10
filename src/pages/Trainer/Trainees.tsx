import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Users, 
  Mail, 
  Phone, 
  TrendingUp, 
  Award,
  MessageSquare,
  Eye
} from "lucide-react";

export default function TraineeManagement() {
  const trainees = [
    {
      id: 1,
      name: "Sandeep K",
      email: "alice@example.com",
      phone: "+1 234-567-8901",
      courses: ["React Fundamentals", "JavaScript Advanced"],
      progress: 85,
      performance: "Excellent",
      attendance: 95
    },
    {
      id: 2,
      name: "Vijay B",
      email: "mike@example.com",
      phone: "+1 234-567-8902",
      courses: ["Node.js Basics", "Python Basics"],
      progress: 72,
      performance: "Good",
      attendance: 88
    },
    {
      id: 3,
      name: "Bhuvan P",
      email: "Bhuvan P@example.com",
      phone: "+1 234-567-8903",
      courses: ["React Fundamentals"],
      progress: 60,
      performance: "Average",
      attendance: 90
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trainee Management</h1>
          <p className="text-gray-600">Track and manage your trainees' progress and performance</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Users className="h-4 w-4 mr-2" />
          Add Trainee
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search trainees by name, email, or course..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">24</div>
              <p className="text-sm text-gray-600">Active Trainees</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trainee List */}
      <div className="grid gap-6">
        {trainees.map((trainee) => (
          <Card key={trainee.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/trainee-${trainee.id}.jpg`} />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {trainee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{trainee.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {trainee.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {trainee.phone}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {trainee.courses.map((course, index) => (
                        <Badge key={index} variant="secondary">{course}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{trainee.progress}%</span>
                  </div>
                  <Progress value={trainee.progress} className="h-2" />
                </div>

                {/* Performance */}
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Performance:</span>
                  <Badge variant={
                    trainee.performance === "Excellent" ? "default" :
                    trainee.performance === "Good" ? "secondary" : 
                    "outline"
                  }>
                    {trainee.performance}
                  </Badge>
                </div>

                {/* Attendance */}
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Attendance:</span>
                  <span className="text-sm font-semibold text-green-600">{trainee.attendance}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Overview of trainee performance across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-sm text-gray-600">Excellent Performance</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <p className="text-sm text-gray-600">Good Performance</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">4</div>
              <p className="text-sm text-gray-600">Needs Improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}