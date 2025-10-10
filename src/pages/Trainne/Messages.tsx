import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MessageSquare } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export default function TraineeMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "CEO",
      content: "Please schedule interviews for the new hiring round.",
      timestamp: "2025-08-05 10:30 AM",
    },
    {
      id: 2,
      sender: "HR Assistant",
      content: "Noted, I'll share the shortlist by EOD.",
      timestamp: "2025-08-05 11:00 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-md ${
                msg.sender === "You" ? "bg-blue-100 text-right" : "bg-gray-100"
              }`}
            >
              <div className="text-sm font-medium">{msg.sender}</div>
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs text-gray-500">{msg.timestamp}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSend} className="w-full">
            Send
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
