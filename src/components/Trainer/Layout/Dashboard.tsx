import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Calendar,
  Plus,
  ChevronRight,
  TrendingUp,
  UserCheck
} from "lucide-react";

export default function TrainerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Bhuvan P! 👋
        </h1>
        <p className="text-gray-600">
          You have 3 sessions scheduled today and 2 pending feedback reviews.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Sessions */}
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">3</div>
            <p className="text-xs text-muted-foreground">
              Next session in 45 mins
            </p>
          </CardContent>
        </Card>

        {/* Active Trainees */}
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trainees</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">24</div>
            <p className="text-xs text-muted-foreground">
              Across 6 courses
            </p>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">87%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">4.8</div>
            <p className="text-xs text-muted-foreground">
              Based on 156 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Training Schedule
            </CardTitle>
            <CardDescription>Your upcoming sessions for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                time: "09:00 AM",
                title: "React Fundamentals",
                trainees: 8,
                location: "Room A-101",
                status: "Completed"
              },
              {
                time: "11:30 AM",
                title: "JavaScript Advanced",
                trainees: 12,
                location: "Online",
                status: "In Progress"
              },
              {
                time: "02:00 PM",
                title: "Node.js Basics",
                trainees: 6,
                location: "Room B-205",
                status: "Upcoming"
              }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-500">{session.time}</div>
                    <Badge variant={
                      session.status === "Completed" ? "default" :
                      session.status === "In Progress" ? "destructive" : 
                      "secondary"
                    }>
                      {session.status}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mt-1">{session.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{session.trainees} trainees</span>
                    <span>{session.location}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create New Session
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <UserCheck className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Upload Materials
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Review Feedback
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Recent Feedback Highlights
            </CardTitle>
            <CardDescription>Latest reviews from your trainees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Sandeep K",
                course: "React Fundamentals",
                rating: 5,
                comment: "Excellent explanation of complex concepts!"
              },
              {
                name: "Vijay B",
                course: "JavaScript Advanced",
                rating: 5,
                comment: "Best trainer I've had. Very patient and helpful."
              },
              {
                name: "Bhuvan P",
                course: "Node.js Basics",
                rating: 4,
                comment: "Good pace and practical examples."
              }
            ].map((feedback, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{feedback.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{feedback.name}</span>
                    <div className="flex">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{feedback.course}</p>
                  <p className="text-sm">{feedback.comment}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trainee Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trainee Progress Overview
            </CardTitle>
            <CardDescription>Current progress across all courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { course: "React Fundamentals", progress: 85, trainees: 8 },
              { course: "JavaScript Advanced", progress: 60, trainees: 12 },
              { course: "Node.js Basics", progress: 30, trainees: 6 },
              { course: "Python Basics", progress: 95, trainees: 10 }
            ].map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{course.course}</span>
                  <span className="text-gray-600">{course.trainees} trainees</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={course.progress} className="flex-1" />
                  <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}