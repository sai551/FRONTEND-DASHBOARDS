import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialQuarters = [
  {
    id: "q1-2024",
    name: "Q1 2024",
    items: [
      {
        id: 1,
        title: "Mobile App v2.0",
        description: "Complete redesign with new features",
        status: "In Progress",
        team: "Mobile Team",
      },
      {
        id: 2,
        title: "API Performance",
        description: "Optimize API response times",
        status: "Planning",
        team: "Backend Team",
      },
    ],
  },
  {
    id: "q2-2024",
    name: "Q2 2024",
    items: [
      {
        id: 3,
        title: "Analytics Platform",
        description: "Real-time analytics dashboard",
        status: "Planning",
        team: "Data Team",
      },
      {
        id: 4,
        title: "User Management",
        description: "Enhanced user roles and permissions",
        status: "Backlog",
        team: "Backend Team",
      },
    ],
  },
  {
    id: "q3-2024",
    name: "Q3 2024",
    items: [
      {
        id: 5,
        title: "Machine Learning",
        description: "AI-powered recommendations",
        status: "Research",
        team: "AI Team",
      },
    ],
  },
  {
    id: "q4-2024",
    name: "Q4 2024",
    items: [
      {
        id: 6,
        title: "Global Expansion",
        description: "Multi-language and region support",
        status: "Concept",
        team: "Platform Team",
      },
    ],
  },
];

export default function Roadmap() {
  const [quarters, setQuarters] = useState(initialQuarters);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    status: "Planning",
    team: "",
    quarter: "q1-2024",
  });

  const handleAddMilestone = () => {
    const updatedQuarters = quarters.map((q) => {
      if (q.id === newMilestone.quarter) {
        return {
          ...q,
          items: [
            ...q.items,
            {
              id: Date.now(),
              title: newMilestone.title,
              description: newMilestone.description,
              status: newMilestone.status,
              team: newMilestone.team,
            },
          ],
        };
      }
      return q;
    });
    setQuarters(updatedQuarters);
    setNewMilestone({
      title: "",
      description: "",
      status: "Planning",
      team: "",
      quarter: "q1-2024",
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Product Roadmap</h1>
          <p className="text-base text-gray-600">
            Timeline and upcoming development milestones
          </p>
        </div>

        {/* Form Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-[#8A2BE2] hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4" />
              <span>Add Milestone</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Milestone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={newMilestone.title}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={newMilestone.description}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Team</Label>
                <Input
                  value={newMilestone.team}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, team: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={newMilestone.status}
                  onValueChange={(value) =>
                    setNewMilestone({ ...newMilestone, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Backlog">Backlog</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Concept">Concept</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Quarter</Label>
                <Select
                  value={newMilestone.quarter}
                  onValueChange={(value) =>
                    setNewMilestone({ ...newMilestone, quarter: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    {quarters.map((q) => (
                      <SelectItem key={q.id} value={q.id}>
                        {q.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddMilestone} className="bg-[#8A2BE2] text-white">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quarters Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {quarters.map((quarter) => (
          <div key={quarter.id} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-700" />
              <h2 className="text-xl font-semibold text-purple-800">
                {quarter.name}
              </h2>
            </div>

            <div className="space-y-3">
              {quarter.items.map((item) => (
                <Card
                  key={item.id}
                  className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01] shadow-md border border-purple-200 hover:bg-[#E6E6FA]"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-semibold text-purple-900">
                        {item.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="text-xs border-purple-300 text-purple-900"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{item.team}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-purple-300 text-purple-900 hover:bg-[#8A2BE2] hover:text-white"
                      >
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
