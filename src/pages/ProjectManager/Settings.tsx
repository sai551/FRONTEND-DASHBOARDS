import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  Bell,
  Shield,
  Clock,
  Mail,
  Palette,
  Database,
  Download
} from 'lucide-react';

const ProjectSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your system preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Settings */}
        <Card className="lg:col-span-2 shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Company Information
            </CardTitle>
            <CardDescription>
              Update your company details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="TechCorp Solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue="Technology" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Business Street, Tech City, TC 12345" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input id="workingHours" defaultValue="9:00 AM - 6:00 PM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC-05:00 (EST)" />
              </div>
            </div>

            <Button>Save Company Settings</Button>
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Daily automatic backups
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  System maintenance alerts
                </p>
              </div>
              <Switch />
            </div>

            <Separator />

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Data
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
            <div className="space-y-4">
              <h4 className="font-medium">Task Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="taskAssigned">Task Assigned</Label>
                  <Switch id="taskAssigned" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="taskDue">Task Due</Label>
                  <Switch id="taskDue" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="taskCompleted">Task Completed</Label>
                  <Switch id="taskCompleted" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Leave Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="leaveRequested">Leave Requested</Label>
                  <Switch id="leaveRequested" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="leaveApproved">Leave Approved</Label>
                  <Switch id="leaveApproved" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="leaveReminder">Leave Reminder</Label>
                  <Switch id="leaveReminder" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">System Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="systemUpdates">System Updates</Label>
                  <Switch id="systemUpdates" defaultChecked />
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

export default ProjectSettings;