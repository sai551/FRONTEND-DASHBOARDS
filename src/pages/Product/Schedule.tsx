import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, Clock, Users, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Product Planning Meeting",
    date: "2024-01-20",
    time: "09:00 - 10:30",
    type: "Meeting",
    attendees: ["sandeep", "vijay", "sravan"],
    location: "Conference Room A",
    priority: "High"
  },
  {
    id: 2,
    title: "Sprint Demo",
    date: "2024-01-22",
    time: "14:00 - 15:00",
    type: "Demo",
    attendees: ["Development Team", "QA Team"],
    location: "Main Hall",
    priority: "Medium"
  },
  {
    id: 3,
    title: "User Research Session",
    date: "2024-01-24",
    time: "10:00 - 12:00",
    type: "Research",
    attendees: ["bhuvan", "sravan"],
    location: "Research Lab",
    priority: "High"
  },
  {
    id: 4,
    title: "Quarterly Review",
    date: "2024-01-26",
    time: "13:00 - 16:00",
    type: "Review",
    attendees: ["All Teams"],
    location: "Auditorium",
    priority: "Critical"
  }
];

const milestones = [
  {
    id: 1,
    title: "Mobile App v2.0 Beta Release",
    date: "2024-02-15",
    status: "Upcoming",
    progress: 75
  },
  {
    id: 2,
    title: "API Gateway Production Deploy",
    date: "2024-02-28",
    status: "On Track",
    progress: 60
  },
  {
    id: 3,
    title: "Q1 Feature Freeze",
    date: "2024-03-01",
    status: "Planned",
    progress: 30
  }
];

const getEventTypeColor = (type: string) => {
  const colors = {
    "Meeting": "default" as const,
    "Demo": "secondary" as const,
    "Research": "outline" as const,
    "Review": "destructive" as const
  };
  return colors[type as keyof typeof colors] || "default";
};

const getPriorityColor = (priority: string) => {
  const colors = {
    "Critical": "destructive" as const,
    "High": "outline" as const,
    "Medium": "secondary" as const,
    "Low": "secondary" as const
  };
  return colors[priority as keyof typeof colors] || "secondary";
};

export default function Schedule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage events and track milestones
          </p>
        </div>
        <Button className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>New Event</span>
        </Button>
      </div>

      {/* Events & Milestones */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Events Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Events</span>
          </h2>
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="transition-shadow hover:shadow-elevated">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Title + Badges */}
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                        <Badge variant={getPriorityColor(event.priority)}>{event.priority}</Badge>
                      </div>

                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Attendees */}
                      <div className="flex items-center space-x-2 mt-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {event.attendees.slice(0, 3).map((attendee, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {attendee}
                            </Badge>
                          ))}
                          {event.attendees.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{event.attendees.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Project Milestones</h2>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <Card key={milestone.id} className="transition-shadow hover:shadow-elevated">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Title + Date */}
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{milestone.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{milestone.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {milestone.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
