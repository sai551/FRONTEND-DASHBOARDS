import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Megaphone, Pin, Calendar } from "lucide-react";

export default function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "Office Holiday Schedule",
      content: "Please note the updated holiday schedule for the remainder of the year. The office will be closed on February 19th for Presidents Day.",
      author: "Alex Johnson",
      date: "2024-02-08",
      priority: "High",
      pinned: true,
      category: "Holiday"
    },
    {
      id: 2,
      title: "New Employee Welcome",
      content: "Please join us in welcoming John Doe to the Engineering team. He will be starting on Monday, February 12th.",
      author: "Emily Davis",
      date: "2024-02-07",
      priority: "Normal",
      pinned: false,
      category: "Welcome"
    },
    {
      id: 3,
      title: "Security Policy Update",
      content: "Important updates to our security policies. All employees must complete the new security training by February 29th.",
      author: "Security Team",
      date: "2024-02-05",
      priority: "Critical",
      pinned: true,
      category: "Security"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "default"; 
      case "Normal": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Company-wide announcements and important notices
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">12</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Announcements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Pin className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold">3</div>
            </div>
            <p className="text-xs text-muted-foreground">Pinned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-success" />
              <div className="text-2xl font-bold">5</div>
            </div>
            <p className="text-xs text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className={`${announcement.pinned ? 'border-primary shadow-md' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {announcement.pinned && <Pin className="h-4 w-4 text-primary" />}
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span>By {announcement.author}</span>
                    <span>{announcement.date}</span>
                    <Badge variant="outline" className="text-xs">
                      {announcement.category}
                    </Badge>
                  </CardDescription>
                </div>
                <Badge variant={getPriorityColor(announcement.priority)}>
                  {announcement.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {announcement.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {announcement.pinned && (
                    <Badge variant="outline" className="text-xs">
                      <Pin className="h-3 w-3 mr-1" />
                      Pinned
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Archive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}