import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Plus, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
  id?: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low" | "";
  status: string;
  assigneeId: string;
  assigneeName?: string;
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
  const [formLoading, setFormLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [expandedFeatureId, setExpandedFeatureId] = useState<number | null>(
    null
  );

  const [newFeature, setNewFeature] = useState<Feature>({
    title: "",
    description: "",
    priority: "",
    status: "",
    assigneeId: "",
    productId: undefined,
  });

  const getHeadAuth = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

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
          assigneeId: f.assigneeId || "",
          assigneeName: f.assigneeName || "Unassigned",
          productId: f.productId,
        }));

        setFeatures(mappedFeatures);
        setProducts(prodRes.data || []);
      } catch (err) {
        console.error("Failed to fetch features/products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    if (!newFeature.productId) return alert("Please select a product!");
    if (!newFeature.assigneeId) return alert("Please select an assignee!");
    if (!newFeature.priority) return alert("Please select a priority!");
    if (!newFeature.status) return alert("Please select a status!");

    try {
      setFormLoading(true);
      const res = await axios.post(
        "http://localhost:3000/features",
        newFeature,
        getHeadAuth()
      );

      const assigneeName =
        teamMembers.find((m) => m.id === newFeature.assigneeId)?.name ||
        "Unassigned";

      const createdFeature: Feature = {
        ...res.data,
        assigneeName,
        priority: newFeature.priority,
        status: newFeature.status,
      };

      setFeatures((prev) => [...prev, createdFeature]);

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

  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl p-5 h-48"></div>
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : features.map((feature) => {
              const PriorityIcon = getPriorityIcon(feature.priority);
              const isExpanded = expandedFeatureId === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 hover:scale-[1.02] transition-transform duration-300"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      <PriorityIcon
                        className={`h-5 w-5 ${getPriorityColor(
                          feature.priority
                        )} transition-transform duration-300 hover:scale-125`}
                      />
                      <h3 className="text-gray-900 dark:text-gray-100 font-semibold">
                        {feature.title}
                      </h3>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs text-purple-900 border-purple-300 px-2 py-1 rounded transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900 dark:hover:text-white"
                    >
                      {feature.status}
                    </Badge>
                  </div>

                  {/* Description Preview */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      <span className="font-medium">Description: </span>
                    {feature.description}
                  </p>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Assignee: </span>
                      {feature.assigneeName || "Unassigned"}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setExpandedFeatureId(
                          isExpanded ? null : feature.id || null
                        )
                      }
                      className="w-full sm:w-auto border-purple-300 text-purple-900 hover:bg-purple-700 hover:text-white transition-colors"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </Button>
                  </div>

                  {/* Animated Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-2"
                      >
                        <div>
                          <span className="font-medium">Priority: </span>
                          {feature.priority}
                        </div>
                        <div>
                          <span className="font-medium">Status: </span>
                          {feature.status}
                        </div>
                        <div>
                          <span className="font-medium">Product: </span>
                          {products.find((p) => p.id === feature.productId)
                            ?.name || "Unknown"}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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

            <Input
              placeholder="Title"
              value={newFeature.title}
              onChange={(e) =>
                setNewFeature((prev) => ({ ...prev, title: e.target.value }))
              }
            />

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
