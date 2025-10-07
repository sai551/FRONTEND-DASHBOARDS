import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MailOpen, Mail, Reply, Search } from "lucide-react";
import { useState } from "react";

// Dummy data for messages
const mockMessages = [
  {
    id: 1,
    sender: "HR Department",
    subject: "Internship Policy Update",
    message:
      "Dear intern, please review the updated company policy regarding attendance and code of conduct...",
    date: "2025-08-06",
    unread: true,
  },
  {
    id: 2,
    sender: "Mentor - Ankita Sharma",
    subject: "Weekly Feedback",
    message:
      "Hi Sunil, you've made great progress this week. Keep focusing on your React tasks and improve your PRs.",
    date: "2025-08-05",
    unread: false,
  },
  {
    id: 3,
    sender: "Admin Office",
    subject: "Project Submission Deadline",
    message:
      "Reminder: Your final project needs to be submitted before 15th August. Contact your mentor for guidance.",
    date: "2025-08-04",
    unread: true,
  },
];

const InternMessages = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredMessages = mockMessages.filter((msg) =>
    msg.subject.toLowerCase().includes(search.toLowerCase())
  );

  const selectedMessage = filteredMessages.find((msg) => msg.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">
          View and manage messages from HR, mentors, and admins
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full md:w-1/3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <Card className="lg:col-span-1 shadow-custom-md max-h-[600px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Inbox
            </CardTitle>
            <CardDescription>Your latest messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelected(msg.id)}
                  className={`cursor-pointer border p-3 rounded-md ${
                    selected === msg.id
                      ? "bg-muted/50 border-muted"
                      : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm">{msg.sender}</p>
                    <p className="text-xs text-muted-foreground">
                      {msg.date}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{msg.subject}</p>
                  {msg.unread && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Unread
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No messages found.</p>
            )}
          </CardContent>
        </Card>

        {/* Message Preview */}
        <Card className="lg:col-span-2 shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MailOpen className="h-5 w-5 mr-2" />
              Message Details
            </CardTitle>
            <CardDescription>
              {selectedMessage
                ? `From: ${selectedMessage.sender}`
                : "Select a message to view its content"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <h4 className="font-medium text-lg">
                  {selectedMessage.subject}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedMessage.message}
                </p>

                <div className="flex gap-3 mt-4">
                  <Button size="sm" variant="outline">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button size="sm" variant="ghost">
                    Mark as Read
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No message selected
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternMessages;
