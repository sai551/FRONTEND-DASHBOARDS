import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckSquare,
  Clock,
  Target,
  Calendar,
  MessageSquare,
  FolderOpen,
} from "lucide-react";

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        {loading ? (
          <>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome back, Employee! 👋
            </h1>
            <p className="text-muted-foreground">
              Here’s your work summary and upcoming tasks.
            </p>
          </>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              {loading ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <CardTitle className="text-sm font-medium">
                  {i === 1 ? "Active Tasks" : i === 2 ? "Hours This Week" : "Projects"}
                </CardTitle>
              )}
              {!loading && (
                <>
                  {i === 1 && <CheckSquare className="h-4 w-4 text-muted-foreground" />}
                  {i === 2 && <Clock className="h-4 w-4 text-muted-foreground" />}
                  {i === 3 && <FolderOpen className="h-4 w-4 text-muted-foreground" />}
                </>
              )}
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-6 w-10 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">{i === 1 ? "8" : i === 2 ? "32.5" : "3"}</div>
                  <p className="text-xs text-muted-foreground">
                    {i === 1
                      ? "+2 from last week"
                      : i === 2
                      ? "Out of 40 hours"
                      : "2 on track, 1 delayed"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
            <CardDescription>Your assigned tasks for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <>
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Fix login authentication bug</p>
                      <p className="text-sm text-muted-foreground">Due in 2 hours</p>
                    </div>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Review pull request #234</p>
                      <p className="text-sm text-muted-foreground">Due today</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>

                <Button className="w-full" variant="outline">
                  View All Tasks
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <>
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </>
            ) : (
              <>
                <Button className="w-full justify-start" variant="ghost">
                  <Clock className="mr-2 h-4 w-4" />
                  Clock In/Out
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Leave
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Team Chat
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Target className="mr-2 h-4 w-4" />
                  View Goals
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium">Dec</p>
                    <p className="text-lg font-bold">5</p>
                  </div>
                  <div>
                    <p className="font-medium">Team Standup</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 9:30 AM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium">Dec</p>
                    <p className="text-lg font-bold">6</p>
                  </div>
                  <div>
                    <p className="font-medium">Sprint Planning</p>
                    <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium">Dec</p>
                    <p className="text-lg font-bold">8</p>
                  </div>
                  <div>
                    <p className="font-medium">Performance Review</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
