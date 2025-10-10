import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  GraduationCap,
  Bell,
  Shield,
  Clock,
  CalendarDays,
  Download,
  BookOpen
} from 'lucide-react';

const TrainerSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Trainer Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your training preferences, course settings, and notification options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trainer Profile & Course Settings */}
        <Card className="lg:col-span-2 shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Trainer Information
            </CardTitle>
            <CardDescription>
              Update your profile and training session details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trainerName">Full Name</Label>
                <Input id="trainerName" defaultValue="Vijay B" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" defaultValue="Full Stack Development" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Input
                id="bio"
                defaultValue="Passionate about teaching and mentoring developers."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availableHours">Available Hours</Label>
                <Input id="availableHours" defaultValue="10:00 AM - 5:00 PM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC+05:30 (IST)" />
              </div>
            </div>

            <Button>Save Trainer Settings</Button>
          </CardContent>
        </Card>

        {/* Quick Preferences */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Quick Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get alerts before your training sessions
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Attendance Mark</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically mark attendance for completed sessions
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Share Resources Automatically</Label>
                <p className="text-sm text-muted-foreground">
                  Send materials to students after class
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Training Reports
            </Button>
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
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Session Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium">Session Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sessionScheduled">Session Scheduled</Label>
                  <Switch id="sessionScheduled" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sessionReminder">Session Reminder</Label>
                  <Switch id="sessionReminder" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sessionCancelled">Session Cancelled</Label>
                  <Switch id="sessionCancelled" />
                </div>
              </div>
            </div>

            {/* Assignment Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium">Assignment Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="assignmentSubmitted">Assignment Submitted</Label>
                  <Switch id="assignmentSubmitted" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="assignmentDue">Assignment Due</Label>
                  <Switch id="assignmentDue" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="assignmentGraded">Assignment Graded</Label>
                  <Switch id="assignmentGraded" />
                </div>
              </div>
            </div>

            {/* System Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium">System Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="platformUpdates">Platform Updates</Label>
                  <Switch id="platformUpdates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="securityAlerts">Security Alerts</Label>
                  <Switch id="securityAlerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="backupStatus">Backup Status</Label>
                  <Switch id="backupStatus" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerSettings;
