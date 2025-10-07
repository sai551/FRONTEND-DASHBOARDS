import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, AlertTriangle, Bug as BugIcon, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";

// ✅ Dummy data (used until backend API is enabled)
const dummyBugs = [
  {
    id: "BUG-001",
    title: "Login page crashes on mobile Safari",
    description: "Users unable to log in using Safari on iOS devices",
    severity: "Critical",
    status: "Open",
    assignee: "John Doe",
    reporter: "Sarah Johnson",
    createdAt: "2024-01-15",
    priority: "High",
  },
  {
    id: "BUG-002",
    title: "Search results pagination not working",
    description: "Pagination buttons don't load additional results",
    severity: "High",
    status: "In Progress",
    assignee: "Jane Smith",
    reporter: "Mike Wilson",
    createdAt: "2024-01-14",
    priority: "Medium",
  },
];

// ✅ Severity Icons
const getSeverityIcon = (severity: string) => {
  const icons = {
    Critical: AlertTriangle,
    High: Zap,
    Medium: BugIcon,
    Low: BugIcon,
  };
  return icons[severity as keyof typeof icons] || BugIcon;
};

// ✅ Severity Colors
const getSeverityColor = (severity: string) => {
  const colors = {
    Critical: "text-red-600",
    High: "text-orange-500",
    Medium: "text-purple-500",
    Low: "text-gray-500",
  };
  return colors[severity as keyof typeof colors] || "text-gray-500";
};

export default function Bugs() {
  const [bugs, setBugs] = useState(dummyBugs);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // ✅ Form state
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    severity: "Low",
    status: "Open",
    assignee: "",
    reporter: "",
    priority: "Low",
  });

  // ✅ Fetch bugs (backend placeholder)
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        // 🔹 Uncomment once backend API is ready
        // const response = await axios.get("/api/bugs");
        // setBugs(response.data);

        console.log("👉 Using dummy data until backend is ready");
      } catch (error) {
        console.error("❌ Error fetching bugs:", error);
      }
    };
    fetchBugs();
  }, []);

  // ✅ Add new bug
  const handleAddBug = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bugToAdd = {
        id: `BUG-${bugs.length + 1}`,
        ...newBug,
        createdAt: new Date().toISOString().split("T")[0],
      };

      // 🔹 Uncomment once backend API is ready
      // const response = await axios.post("/api/bugs", newBug);
      // setBugs([...bugs, response.data]);

      setBugs([...bugs, bugToAdd]); // using dummy data
      setShowForm(false);

      // Reset form
      setNewBug({
        title: "",
        description: "",
        severity: "Low",
        status: "Open",
        assignee: "",
        reporter: "",
        priority: "Low",
      });
    } catch (error) {
      console.error("❌ Error adding bug:", error);
    }
  };

  const filteredBugs = bugs.filter(
    (bug) =>
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.description.toLowerCase().includes(search.toLowerCase()) ||
      bug.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 bg-[#F3F0FF] min-h-screen">
      {/* ✅ Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#6A0DAD]">Bug Tracker</h1>
          <p className="text-base text-[#4B0082]">
            Track and manage bug reports
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-[#8A2BE2] hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>Report Bug</span>
        </Button>
      </div>

      {/* ✅ Search */}
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
          <Input
            placeholder="Search bugs..."
            className="pl-10 border-purple-300 focus:ring-purple-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ Bug Cards */}
      <div className="grid gap-4">
        {filteredBugs.map((bug) => {
          const SeverityIcon = getSeverityIcon(bug.severity);
          return (
            <Card
              key={bug.id}
              className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01] shadow-md border border-purple-300 hover:bg-[#EFE6FF] bg-white"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <SeverityIcon
                          className={`h-5 w-5 ${getSeverityColor(
                            bug.severity
                          )}`}
                        />
                        <CardTitle className="text-base font-semibold text-[#4B0082]">
                          {bug.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="text-xs text-purple-900 border-purple-400"
                        >
                          {bug.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs text-purple-900 border-purple-400"
                        >
                          {bug.severity}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs text-purple-900 border-purple-400"
                        >
                          {bug.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{bug.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                    <div>
                      <span className="font-medium">Assignee: </span>
                      {bug.assignee}
                    </div>
                    <div>
                      <span className="font-medium">Reporter: </span>
                      {bug.reporter}
                    </div>
                    <div>
                      <span className="font-medium">Created: </span>
                      {bug.createdAt}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ✅ Add Bug Form (Modal) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-[#6A0DAD] mb-4">
              Report a New Bug
            </h2>
            <form onSubmit={handleAddBug} className="space-y-4">
              <Input
                placeholder="Title"
                value={newBug.title}
                onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                required
              />
              <Input
                placeholder="Description"
                value={newBug.description}
                onChange={(e) =>
                  setNewBug({ ...newBug, description: e.target.value })
                }
                required
              />
              <select
                value={newBug.severity}
                onChange={(e) =>
                  setNewBug({ ...newBug, severity: e.target.value })
                }
                className="w-full border rounded-md p-2"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
              <select
                value={newBug.priority}
                onChange={(e) =>
                  setNewBug({ ...newBug, priority: e.target.value })
                }
                className="w-full border rounded-md p-2"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <Input
                placeholder="Assignee"
                value={newBug.assignee}
                onChange={(e) =>
                  setNewBug({ ...newBug, assignee: e.target.value })
                }
              />
              <Input
                placeholder="Reporter"
                value={newBug.reporter}
                onChange={(e) =>
                  setNewBug({ ...newBug, reporter: e.target.value })
                }
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#8A2BE2] hover:bg-purple-700 text-white"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
