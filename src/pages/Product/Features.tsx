import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Feature {
  id?: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low" | "";
  status: string;
  assigneeId: string; // ✅ camelCase
  assigneeName?: string; // ✅ for display
  productId?: number;
}

interface Product {
  id: number;
  name: string;
}

interface TeamMember {
  id: string;
  name: string;
}

const getPriorityIcon = (priority: string) => {
  const icons = { High: ArrowUp, Medium: Minus, Low: ArrowDown };
  return icons[priority as keyof typeof icons] || Minus;
};

const getPriorityColor = (priority: string) => {
  const colors = {
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-gray-500",
  };
  return colors[priority as keyof typeof colors] || "text-gray-500";
};

export default function Features() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [newFeature, setNewFeature] = useState<Feature>({
    title: "",
    description: "",
    priority: "",
    status: "",
    assigneeId: "", // ✅ updated
    productId: undefined,
  });

  const getHeadAuth = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch features + products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featRes, prodRes] = await Promise.all([
          axios.get("http://localhost:3000/features", getHeadAuth()),
          axios.get("http://localhost:3000/products", getHeadAuth()),
        ]);

        const data = featRes.data.data || [];
        const mappedFeatures = data.map((f: any) => ({
          id: f.id,
          title: f.title,
          description: f.description,
          status: f.status,
          priority: f.priority || "",
          assigneeId: f.assigneeId || "",
          assigneeName: f.assigneeName || "Unassigned", // ✅ prefer backend name
          votes: f.votes || 0,
          effort: f.effort || "",
          productId: f.productId,
        }));

        setFeatures(mappedFeatures);
        setProducts(prodRes.data || []);
      } catch (err) {
        setError("Failed to load features or products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch team members when product is selected
  const fetchTeamMembers = async (productId: number) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/team-collaborations/product/${productId}`,
        getHeadAuth()
      );

      const members = res.data.team.map((m: any) => ({
        id: m.employeeId,
        name: m.fullName,
      }));

      setTeamMembers(members);
    } catch (err) {
      console.error("Failed to fetch team members", err);
      setTeamMembers([]);
    }
  };

  const handleCreateFeature = async () => {
    if (!newFeature.productId) {
      alert("Please select a product!");
      return;
    }
    if (!newFeature.assigneeId) {
      alert("Please select an assignee!");
      return;
    }
    if (!newFeature.priority) {
      alert("Please select a priority!");
      return;
    }
    if (!newFeature.status) {
      alert("Please select a status!");
      return;
    }

    try {
      setFormLoading(true);
      const res = await axios.post(
        "http://localhost:3000/features",
        newFeature,
        getHeadAuth()
      );

      // Map assigneeId -> name
      const assigneeName =
        teamMembers.find((m) => m.id === newFeature.assigneeId)?.name ||
        "Unassigned";

      const createdFeature: Feature = {
        ...res.data,
        assigneeName, // ✅ store name
        priority: newFeature.priority,
        status: newFeature.status,
      };

      // Update cards immediately
      setFeatures((prev) => [...prev, createdFeature]);

      // Reset form
      setOpenForm(false);
      setNewFeature({
        title: "",
        description: "",
        priority: "",
        status: "",
        assigneeId: "",
        productId: undefined,
      });
      setTeamMembers([]);
    } catch (err) {
      alert("Failed to create feature");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <p className="text-gray-700">Loading features...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-purple-900">
            Features
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage feature requests and development
          </p>
        </div>
        <Button
          onClick={() => setOpenForm(true)}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-[#8A2BE2] hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>New Feature</span>
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid gap-4">
        {features.map((feature) => {
          const PriorityIcon = getPriorityIcon(feature.priority);
          return (
            <Card
              key={feature.id}
              className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01] shadow-md border border-gray-200 hover:bg-[#E6E6FA]"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <PriorityIcon
                          className={`h-5 w-5 ${getPriorityColor(
                            feature.priority
                          )}`}
                        />
                        <CardTitle className="text-base md:text-lg text-gray-800">
                          {feature.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="text-xs text-purple-900 border-purple-300"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Assignee: </span>
                      <span className="font-medium text-gray-800">
                        {feature.assigneeName || "Unassigned"}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto transition-colors border-purple-300 text-purple-900 hover:bg-[#8A2BE2] hover:text-white"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* New Feature Form */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Feature</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new feature.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Product Select */}
            <Select
              value={newFeature.productId?.toString() || ""}
              onValueChange={(v) => {
                const productId = Number(v);
                setNewFeature((prev) => ({ ...prev, productId }));
                fetchTeamMembers(productId);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products.length > 0 ? (
                  products.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No Products Found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Title */}
            <Input
              placeholder="Title"
              value={newFeature.title}
              onChange={(e) =>
                setNewFeature((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            {/* Description */}
            <Input
              placeholder="Description"
              value={newFeature.description}
              onChange={(e) =>
                setNewFeature((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            {/* Priority */}
            <Select
              value={newFeature.priority}
              onValueChange={(v) =>
                setNewFeature((prev) => ({
                  ...prev,
                  priority: v as "High" | "Medium" | "Low",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Status */}
            <Select
              value={newFeature.status}
              onValueChange={(v) =>
                setNewFeature((prev) => ({ ...prev, status: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* Assignee */}
            <Select
              value={newFeature.assigneeId}
              onValueChange={(v) =>
                setNewFeature((prev) => ({ ...prev, assigneeId: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Assignee" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No team members found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateFeature}
              disabled={formLoading}
              className="bg-purple-700 text-white hover:bg-purple-800"
            >
              {formLoading ? "Creating..." : "Create Feature"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
