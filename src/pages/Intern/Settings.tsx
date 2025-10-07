import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Clock, Bell, UserCircle, ClipboardList } from "lucide-react";

const InternSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Intern Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your internship preferences and notification settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="lg:col-span-2 shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>View your internship profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <p className="text-sm text-muted-foreground">Sunil Behera</p>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">
                  sunil@example.com
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <p className="text-sm text-muted-foreground">Development</p>
              </div>
              <div className="space-y-2">
                <Label>Mentor</Label>
                <p className="text-sm text-muted-foreground">Ashish Sharma</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Internship Info */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Internship Details
            </CardTitle>
            <CardDescription>Timeline and Duration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <p className="text-sm text-muted-foreground">June 10, 2025</p>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <p className="text-sm text-muted-foreground">Sep 10, 2025</p>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <p className="text-sm text-green-600 font-medium">Active</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Customize alerts and reminders during your internship
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Attendance Alerts</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Daily Reminder</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Late Check-In Alert</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Task Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>New Task Assigned</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Due Date Reminder</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Mentor Feedback</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Weekly Feedback</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Improvement Tips</Label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Button */}
      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            Export Internship Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            Download Summary PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternSettings;
