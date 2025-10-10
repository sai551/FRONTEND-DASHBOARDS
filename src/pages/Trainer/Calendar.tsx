import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  MapPin, 
  Users,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react";

export default function TrainerCalendarScheduling() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Mock calendar data
  const events = [
    {
      id: 1,
      title: "React Fundamentals",
      date: "2024-01-15",
      time: "09:00 AM - 12:00 PM",
      location: "Room A-101",
      attendees: 8,
      type: "training"
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      date: "2024-01-15",
      time: "02:00 PM - 05:00 PM",
      location: "Online",
      attendees: 12,
      type: "training"
    },
    {
      id: 3,
      title: "Team Meeting",
      date: "2024-01-16",
      time: "10:00 AM - 11:00 AM",
      location: "Conference Room B",
      attendees: 5,
      type: "meeting"
    }
  ];

  // Generate calendar days (simplified)
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const hasEvent = (day: number) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Scheduling</h1>
          <p className="text-gray-600">Manage your training schedule and meetings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Sync Calendar
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {currentMonth}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth().map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square p-2 text-center text-sm border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    day === currentDate.getDate() ? 'bg-green-100 border-green-300' : 'border-gray-200'
                  } ${day && hasEvent(day) ? 'bg-blue-50 border-blue-200' : ''}`}
                >
                  {day && (
                    <>
                      <div className="font-medium">{day}</div>
                      {hasEvent(day) && (
                        <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>January 15, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.filter(event => event.date === "2024-01-15").map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant={event.type === "training" ? "default" : "secondary"}>
                    {event.type}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {event.attendees} attendees
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">Join</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled training sessions for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString('default', { month: 'short' })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees} attendees
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={event.type === "training" ? "default" : "secondary"}>
                    {event.type}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Scheduling</CardTitle>
          <CardDescription>Quickly schedule common training sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "React Session", duration: "3 hours" },
              { name: "JavaScript Workshop", duration: "4 hours" },
              { name: "Team Meeting", duration: "1 hour" },
              { name: "One-on-One", duration: "30 mins" }
            ].map((template, index) => (
              <Button key={index} variant="outline" className="h-auto py-4 flex-col">
                <CalendarIcon className="h-6 w-6 mb-2" />
                <span className="font-medium">{template.name}</span>
                <span className="text-xs text-gray-500">{template.duration}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}