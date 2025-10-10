import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Eye,
  Download,
  Trash2,
  GraduationCap,
  BookOpen,
  MessageCircle,
} from "lucide-react";

export default function TraineeSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Trainee Settings</h1>
        <p className="text-muted-foreground">
          Manage your training preferences, notifications, and account.
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Customize how you receive alerts and announcements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  ["Training Session Alerts", "Get reminders for your upcoming sessions"],
                  ["Assignment Notifications", "Get notified for new and due assignments"],
                  ["Mentor Messages", "Receive message alerts from mentors"],
                  ["System Announcements", "Receive important system-wide updates"],
                ].map(([label, desc], i) => (
                  <div className="flex items-center justify-between" key={i}>
                    <div className="space-y-0.5">
                      <Label className="text-base">{label}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>

              <Button className="w-full">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Preferences */}
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Learning Preferences
              </CardTitle>
              <CardDescription>
                Control how your training modules and progress are managed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Auto-Mark Lessons as Completed</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically mark modules as completed when opened
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Progress Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow mentors to track your module progress
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Enable Hints</Label>
                  <p className="text-sm text-muted-foreground">
                    Show hints during quizzes or exercises
                  </p>
                </div>
                <Switch />
              </div>

              <Button className="w-full">Save Learning Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Message Settings
              </CardTitle>
              <CardDescription>
                Configure how you receive and manage internal messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Enable Chat</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow in-app chat with trainers or team members
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Email Copies</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email copies of important messages
                  </p>
                </div>
                <Switch />
              </div>

              <Button className="w-full">Save Message Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Account Preferences
              </CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <select id="language" className="w-full p-2 border rounded-md">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select id="timezone" className="w-full p-2 border rounded-md">
                  <option>IST (UTC+05:30)</option>
                  <option>GMT (UTC+00:00)</option>
                  <option>PST (UTC-08:00)</option>
                </select>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Export Training Data</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Download your training history and assignment records.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download My Data
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3 text-destructive">Danger Zone</h4>
                <div className="p-4 border border-destructive rounded-lg">
                  <h5 className="font-medium text-destructive mb-2">Deactivate Account</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    This will deactivate your trainee account and remove access to the platform.
                  </p>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deactivate Account
                  </Button>
                </div>
              </div>

              <Button className="w-full">Save Account Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
