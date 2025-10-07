import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Bell,
  Shield,
  Clock,
  Briefcase,
  Palette
} from 'lucide-react';

const EmpSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal profile, preferences, and notifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2 shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal and work-related details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Bhuvan P" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="bhuvan@gmail.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 234 567 890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="Software Development" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" defaultValue="Frontend Developer" />
            </div>

            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Quick Preferences */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Shift Reminder</Label>
                <p className="text-sm text-muted-foreground">
                  Get alerts before your shift starts
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Break Reminder</Label>
                <p className="text-sm text-muted-foreground">
                  Remind me for lunch and coffee breaks
                </p>
              </div>
              <Switch />
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
            Control how you receive updates about work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Task Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Task Assigned</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Task Due</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Task Completed</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Leave Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Leave Status</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Leave Reminders</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">System & HR</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Announcements</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Policy Updates</Label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage your password and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmpSettings;
