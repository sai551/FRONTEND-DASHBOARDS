import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {jwtDecode} from "jwt-decode";

// Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  managerId: string;
}

interface JwtPayload {
  sub: string;
  name: string;
  role: string;
}

// Decode JWT to get managerId
const token = localStorage.getItem("token");
let managerId = "";
if (token) {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    managerId = decoded.sub;
  } catch (err) {
    console.error("Failed to decode JWT", err);
  }
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);

  const initialForm = {
    name: "",
    description: "",
    status: "planning",
    priority: "medium",
    deadline: "",
    managerId,
  };

  const [formData, setFormData] = useState(initialForm);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function calculateProgress(status: string) {
    switch (status.toLowerCase()) {
      case "completed":
      case "live":
        return 100;
      case "planning":
        return 0;
      case "in_development":
        return 25;
      case "testing":
        return 50;
      case "on_hold":
        return 10;
      case "inactive":
        return 0;
      case "active":
        return 75;
      default:
        return 0;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const id = Number(editingProduct.id);
        const res = await axios.patch(`http://localhost:3000/products/${id}`, formData);
        setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      } else {
        const res = await axios.post("http://localhost:3000/products", formData);
        setProducts((prev) => [...prev, res.data]);
      }
      setOpen(false);
      setEditingProduct(null);
      setFormData(initialForm);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      status: product.status,
      priority: product.priority,
      deadline: product.deadline,
      managerId: product.managerId,
    });
    setOpen(true);
  };

  const handleDelete = async (product: Product) => {
    try {
      await axios.delete(`http://localhost:3000/products/${product.id}`);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus && filterStatus !== "none" ? p.status === filterStatus : true;
    const matchesPriority = filterPriority && filterPriority !== "none" ? p.priority === filterPriority : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Products</h1>
          <p className="text-base text-gray-600">Manage your product portfolio</p>
        </div>
        <Button
          onClick={() => {
            setOpen(true);
            setEditingProduct(null);
            setFormData(initialForm);
          }}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-[#8A2BE2] hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>{editingProduct ? "Edit Product" : "Add Product"}</span>
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <Select value={filterStatus || "none"} onValueChange={(val) => setFilterStatus(val)}>
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="in_development">In Development</SelectItem>
            <SelectItem value="testing">Testing</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select value={filterPriority || "none"} onValueChange={(val) => setFilterPriority(val)}>
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01] shadow-md border border-purple-200 hover:bg-[#E6E6FA]"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-lg font-semibold text-purple-900">{product.name}</CardTitle>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Badge variant="outline" className="text-xs text-purple-900 border-purple-300">
                      {product.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-purple-900 border-purple-300">
                      {product.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="col-span-full sm:col-span-1">
                    <p className="text-sm text-gray-600 mb-2">Progress</p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-[#8A2BE2] h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${calculateProgress(product.status)}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold min-w-[3rem] text-right text-gray-700">
                        {calculateProgress(product.status)}%
                      </span>
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-1">
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="font-medium text-gray-800">{product.description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="font-medium text-gray-800">{product.deadline}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Manager ID</p>
                    <p className="font-medium text-gray-800">{product.managerId}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-purple-200 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-300 text-purple-900 hover:bg-purple-200"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog Form */}
      <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) setEditingProduct(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val) => handleChange("status", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in_development">In Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(val) => handleChange("priority", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="bg-[#8A2BE2] text-white">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
