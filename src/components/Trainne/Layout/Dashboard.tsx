import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Award, 
  User, 
  Bell,
  CheckCircle,
  PlayCircle,
  Calendar,
  TrendingUp,
  Target
} from "lucide-react";

export default function TraineeDashboard() {
  const upcomingSessions = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      time: "10:00 AM",
      date: "Today",
      trainer: "Hari K",
      location: "Room 101"
    },
    {
      id: 2,
      title: "React Components",
      time: "2:00 PM", 
      date: "Tomorrow",
      trainer: "Mike Chen",
      location: "Lab 2"
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "New Course Available: Advanced JavaScript",
      content: "Enroll now for the new advanced JavaScript course starting next week.",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Assignment Deadline Reminder",
      content: "React Components assignment is due this Friday.",
      time: "1 day ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Sunil B!</h1>
        <p className="text-muted-foreground">
          Continue your learning journey. You have 2 sessions today and 3 pending assignments.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Training Progress</p>
                <p className="text-2xl font-bold">75%</p>
                <p className="text-xs text-muted-foreground">6/8 modules completed</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-xs text-muted-foreground">23/25 sessions attended</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">pending submission</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Performance Score</p>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-muted-foreground">out of 5.0</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Sessions
            </CardTitle>
            <CardDescription>Your scheduled training sessions for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.slice(0, 1).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium">{session.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {session.trainer}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{session.location}</p>
                </div>
                <Button size="sm">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Join
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              View Available Courses
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Request Leave
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <User className="mr-2 h-4 w-4" />
              Contact Mentor
            </Button>
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Learning Progress
            </CardTitle>
            <CardDescription>Your progress in current courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>JavaScript Fundamentals</span>
                <span>80%</span>
              </div>
              <Progress value={80} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>React Basics</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Git & Version Control</span>
                <span>90%</span>
              </div>
              <Progress value={90} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="space-y-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium text-sm">{announcement.title}</h4>
                <p className="text-xs text-muted-foreground">{announcement.content}</p>
                <p className="text-xs text-muted-foreground">{announcement.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Schedule</CardTitle>
          <CardDescription>Your upcoming training sessions and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium">{session.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{session.date} at {session.time}</span>
                    <span>{session.trainer}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{session.location}</p>
                </div>
                <Badge variant="outline">{session.date === "Today" ? "Today" : "Upcoming"}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}