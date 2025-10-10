import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Send, 
  Users, 
  Megaphone, 
  Pin,
  Search,
  Plus,
  Bell,
  Calendar
} from "lucide-react";

export default function TrainerCommunications() {
  const announcements = [
    {
      id: 1,
      title: "New Course: Advanced React Patterns",
      content: "We're excited to announce our new advanced React course starting next month. Registration is now open!",
      date: "2024-01-15",
      pinned: true,
      author: "Trainer"
    },
    {
      id: 2,
      title: "Schedule Change: JavaScript Workshop",
      content: "The JavaScript workshop scheduled for Friday has been moved to Monday at 2:00 PM.",
      date: "2024-01-14",
      pinned: false,
      author: "Trainer"
    }
  ];

  const chats = [
    {
      id: 1,
      name: "React Fundamentals Group",
      type: "group",
      participants: 8,
      lastMessage: "Great session today! Looking forward to the next one.",
      lastMessageTime: "2 hours ago",
      unread: 3
    },
    {
      id: 2,
      name: "Sandeep K",
      type: "direct",
      participants: 1,
      lastMessage: "Could you share the assignment details?",
      lastMessageTime: "5 hours ago",
      unread: 1
    },
    {
      id: 3,
      name: "JavaScript Advanced Group",
      type: "group",
      participants: 12,
      lastMessage: "The async/await examples were very helpful!",
      lastMessageTime: "1 day ago",
      unread: 0
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sandeep K",
      content: "Thank you for the excellent React session today! The hooks explanation was really clear.",
      time: "10:30 AM",
      isTrainer: false
    },
    {
      id: 2,
      sender: "You",
      content: "I'm glad you found it helpful! Don't forget to practice with the exercises I shared.",
      time: "10:45 AM",
      isTrainer: true
    },
    {
      id: 3,
      sender: "Vijay B",
      content: "Could you share the slides from today's session?",
      time: "11:00 AM",
      isTrainer: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communications & Notifications</h1>
          <p className="text-gray-600">Manage trainee communications and announcements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Megaphone className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        </div>
      </div>

      {/* Communication Tabs */}
      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="chats">Team Chats</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4">
          {/* Create Announcement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Create Announcement
              </CardTitle>
              <CardDescription>Broadcast important messages to trainees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Announcement title..." />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Write your announcement here..." rows={4} />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Pin className="h-4 w-4 mr-1" />
                    Pin This
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {announcement.pinned && <Pin className="h-4 w-4 text-yellow-500" />}
                        {announcement.title}
                      </CardTitle>
                      <CardDescription>
                        By {announcement.author} • {announcement.date}
                      </CardDescription>
                    </div>
                    {announcement.pinned && (
                      <Badge variant="secondary">Pinned</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{announcement.content}</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                    {!announcement.pinned && (
                      <Button variant="outline" size="sm">
                        <Pin className="h-4 w-4 mr-1" />
                        Pin
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {chats.map((chat) => (
                  <div key={chat.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {chat.type === "group" ? <Users className="h-4 w-4" /> : chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium truncate">{chat.name}</h4>
                        {chat.unread > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-500">{chat.lastMessageTime}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>React Fundamentals Group</CardTitle>
                    <CardDescription>8 participants</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-64 overflow-y-auto mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isTrainer ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isTrainer 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {!message.isTrainer && (
                          <p className="text-xs font-medium mb-1">{message.sender}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isTrainer ? 'text-green-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: "Session Reminders", description: "Get notified 30 minutes before sessions", enabled: true },
                  { name: "New Messages", description: "Receive notifications for new chat messages", enabled: true },
                  { name: "Feedback Received", description: "Alert when trainees submit feedback", enabled: true },
                  { name: "Attendance Alerts", description: "Notify when trainees are absent", enabled: false }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{setting.name}</h4>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <Button variant={setting.enabled ? "default" : "outline"} size="sm">
                      {setting.enabled ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your latest activity alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  type: "feedback",
                  message: "New feedback received for React Fundamentals session",
                  time: "2 hours ago",
                  icon: MessageSquare
                },
                {
                  type: "reminder",
                  message: "JavaScript Advanced session starts in 30 minutes",
                  time: "4 hours ago",
                  icon: Calendar
                },
                {
                  type: "message",
                  message: "Sandeep K sent you a message",
                  time: "5 hours ago",
                  icon: MessageSquare
                }
              ].map((notification, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <notification.icon className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">Mark Read</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}