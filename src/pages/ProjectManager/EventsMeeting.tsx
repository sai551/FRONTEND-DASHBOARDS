import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  Plus,
  Video,
  Phone,
  Mail,
  Bell,
  ExternalLink,
  Edit,
  Trash2
} from "lucide-react";

export default function EventsMeetings() {
  const [selectedView, setSelectedView] = useState("calendar");

  const upcomingEvents = [
    {
      id: 1,
      title: "Sprint Planning Meeting",
      type: "meeting",
      date: "2024-03-08",
      time: "09:00 AM",
      duration: "2 hours",
      location: "Conference Room A",
      attendees: ["Alex Johnson", "Sarah Chen", "Mike Rodriguez", "Emily Davis"],
      project: "E-commerce Platform",
      priority: "high",
      isRecurring: true,
      meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      title: "Client Presentation",
      type: "meeting",
      date: "2024-03-08",
      time: "02:00 PM",
      duration: "1 hour",
      location: "Virtual",
      attendees: ["Project Manager", "Client Team"],
      project: "Mobile Banking App",
      priority: "critical",
      isRecurring: false,
      meetingLink: "https://zoom.us/j/123456789"
    },
    {
      id: 3,
      title: "Project Deadline",
      type: "deadline",
      date: "2024-03-15",
      time: "11:59 PM",
      duration: "Deadline",
      location: "-",
      attendees: [],
      project: "E-commerce Platform",
      priority: "critical",
      isRecurring: false
    },
    {
      id: 4,
      title: "Team Building Event",
      type: "event",
      date: "2024-03-22",
      time: "04:00 PM",
      duration: "3 hours",
      location: "Central Park",
      attendees: ["All Team Members"],
      project: "Company-wide",
      priority: "medium",
      isRecurring: false
    },
    {
      id: 5,
      title: "Weekly Standup",
      type: "meeting",
      date: "2024-03-11",
      time: "10:00 AM",
      duration: "30 minutes",
      location: "Conference Room B",
      attendees: ["Development Team"],
      project: "All Projects",
      priority: "medium",
      isRecurring: true,
      meetingLink: "https://teams.microsoft.com/meeting-id"
    }
  ];

  const todaysEvents = upcomingEvents.filter(event => event.date === "2024-03-08");

  const deadlines = [
    {
      project: "E-commerce Platform",
      milestone: "Final Testing Phase",
      dueDate: "2024-03-15",
      daysLeft: 7,
      status: "on-track"
    },
    {
      project: "Mobile Banking App",
      milestone: "Security Audit",
      dueDate: "2024-03-20",
      daysLeft: 12,
      status: "at-risk"
    },
    {
      project: "Healthcare Portal",
      milestone: "User Acceptance Testing",
      dueDate: "2024-03-25",
      daysLeft: 17,
      status: "on-track"
    },
    {
      project: "Learning Management",
      milestone: "Content Migration",
      dueDate: "2024-04-01",
      daysLeft: 24,
      status: "ahead"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meeting": return Users;
      case "deadline": return Clock;
      case "event": return Calendar;
      default: return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "bg-green-100 text-green-800";
      case "at-risk": return "bg-yellow-100 text-yellow-800";
      case "behind": return "bg-red-100 text-red-800";
      case "ahead": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events & Meetings</h1>
          <p className="text-muted-foreground">
            Manage schedules, track deadlines, and coordinate team meetings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Sync Calendar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your meetings and events for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysEvents.map((event) => {
              const Icon = getTypeIcon(event.type);
              return (
                <div 
                  key={event.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{event.time} ({event.duration})</span>
                        {event.location !== "Virtual" && event.location !== "-" && (
                          <>
                            <MapPin className="h-3 w-3 ml-2" />
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(event.priority)}>
                      {event.priority}
                    </Badge>
                    {event.meetingLink && (
                      <Button variant="outline" size="sm">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="meetings">Team Meetings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule New</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar Overview</CardTitle>
                  <CardDescription>Monthly view of all events and meetings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Calendar Integration</h3>
                    <p className="text-gray-500 mb-6">
                      Interactive calendar view would be integrated here with libraries like FullCalendar or react-calendar
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline">Google Calendar</Button>
                      <Button variant="outline">Outlook</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next 7 days schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 5).map((event) => {
                    const Icon = getTypeIcon(event.type);
                    return (
                      <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{event.title}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div>{event.date} at {event.time}</div>
                          <div>{event.project}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Deadlines</CardTitle>
              <CardDescription>Critical milestones and project deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deadlines.map((deadline, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{deadline.project}</h4>
                        <p className="text-sm text-muted-foreground">{deadline.milestone}</p>
                      </div>
                      <Badge className={getStatusColor(deadline.status)}>
                        {deadline.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Due: {deadline.dueDate}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {deadline.daysLeft} days remaining
                      </div>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        <Bell className="h-3 w-3 mr-1" />
                        Set Reminder
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Meetings</CardTitle>
              <CardDescription>Scheduled meetings and team discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.filter(event => event.type === "meeting").map((meeting) => (
                  <div 
                    key={meeting.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{meeting.title}</h4>
                          <Badge className={getPriorityColor(meeting.priority)}>
                            {meeting.priority}
                          </Badge>
                          {meeting.isRecurring && (
                            <Badge variant="secondary">Recurring</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{meeting.time} ({meeting.duration})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{meeting.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{meeting.attendees.length} attendees</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Project: {meeting.project}
                      </div>
                      <div className="flex gap-2">
                        {meeting.meetingLink && (
                          <Button variant="outline" size="sm">
                            <Video className="h-3 w-3 mr-1" />
                            Join Meeting
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3 mr-1" />
                          Invite
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Event</CardTitle>
                <CardDescription>Create meetings, set deadlines, or plan events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Team Meeting</SelectItem>
                      <SelectItem value="client-meeting">Client Meeting</SelectItem>
                      <SelectItem value="deadline">Project Deadline</SelectItem>
                      <SelectItem value="event">Team Event</SelectItem>
                      <SelectItem value="review">Review Session</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter event title..." />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">30 minutes</SelectItem>
                      <SelectItem value="1hour">1 hour</SelectItem>
                      <SelectItem value="2hours">2 hours</SelectItem>
                      <SelectItem value="half-day">Half day</SelectItem>
                      <SelectItem value="full-day">Full day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Conference room or meeting link..." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                      <SelectItem value="mobile-banking">Mobile Banking App</SelectItem>
                      <SelectItem value="healthcare">Healthcare Portal</SelectItem>
                      <SelectItem value="learning">Learning Management</SelectItem>
                      <SelectItem value="general">General/Company-wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Event description and agenda..." rows={3} />
                </div>
                
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Event
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meeting Templates</CardTitle>
                <CardDescription>Quick templates for common meetings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Daily Standup (15 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Sprint Planning (2 hours)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Sprint Review (1 hour)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" />
                  Client Demo (30 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  1-on-1 Meeting (30 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  All Hands Meeting (1 hour)
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calendar Integration</CardTitle>
              <CardDescription>Connect with external calendar services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <ExternalLink className="h-6 w-6" />
                  <span>Google Calendar</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <ExternalLink className="h-6 w-6" />
                  <span>Outlook Calendar</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <ExternalLink className="h-6 w-6" />
                  <span>Apple Calendar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}