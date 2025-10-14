import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, Package } from "lucide-react";
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
import { Api_EndPoints } from "@/Config/Api_Endpoints";

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
      const res = await axios.get(Api_EndPoints.PRODUCTS_API, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
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
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
      
      if (editingProduct) {
        const id = Number(editingProduct.id);
        const res = await axios.patch(`${Api_EndPoints.PRODUCTS_API}/${id}`, formData, { headers });
        setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      } else {
        const res = await axios.post(Api_EndPoints.PRODUCTS_API, formData, { headers });
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
      await axios.delete(`${Api_EndPoints.PRODUCTS_API}/${product.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ✅ Compact Header */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-3 mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-purple-600 rounded-md">
                <Package className="h-4 w-4 text-white" />
              </div>
        <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Products
                </h1>
                <p className="text-xs text-gray-500">
                  Manage your product portfolio
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>{products.length} Products</span>
        </div>
        <Button
          onClick={() => {
            setOpen(true);
            setEditingProduct(null);
            setFormData(initialForm);
          }}
                className="flex items-center justify-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 h-7"
        >
                <Plus className="h-3 w-3" />
                <span>Add</span>
        </Button>
            </div>
          </div>
      </div>

        {/* ✅ Compact Search & Filters */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-3 mb-3">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search Bar */}
        <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <Input
            placeholder="Search products..."
                className="pl-8 h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 rounded-md text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <Select value={filterStatus || "none"} onValueChange={(val) => setFilterStatus(val)}>
              <SelectTrigger className="w-full sm:w-32 h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-xs">
                <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
                <SelectItem value="none">All Status</SelectItem>
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
              <SelectTrigger className="w-full sm:w-28 h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-xs">
                <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
                <SelectItem value="none">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
          </div>
      </div>

        {/* ✅ Compact Product Cards */}
        <div className="space-y-2">
        {loading ? (
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-2 text-xs font-medium text-gray-600">Loading...</p>
              </div>
            </div>
        ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-1.5 bg-gray-100 rounded-full mb-2">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">No products found</h3>
                <p className="text-xs text-gray-500 mb-3">
                  {searchTerm || filterStatus || filterPriority ? "No products match your search criteria." : "Get started by adding your first product."}
                </p>
                {!searchTerm && !filterStatus && !filterPriority && (
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setEditingProduct(null);
                      setFormData(initialForm);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 h-6"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                )}
              </div>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const progress = calculateProgress(product.status);
              const statusColors = {
                planning: "from-gray-500 to-gray-600",
                in_development: "from-blue-500 to-blue-600",
                testing: "from-yellow-500 to-yellow-600",
                live: "from-green-500 to-green-600",
                completed: "from-purple-500 to-purple-600",
                on_hold: "from-orange-500 to-orange-600",
                inactive: "from-red-500 to-red-600",
                active: "from-indigo-500 to-indigo-600"
              };
              
              return (
            <Card
              key={product.id}
                  className="group transition-all duration-200 hover:shadow-md hover:scale-[1.005] shadow-sm border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="relative">
                    {/* Status Indicator */}
                    <div className={`absolute left-0 top-0 w-1 h-full ${
                      product.status === 'planning' ? 'bg-gray-500' :
                      product.status === 'in_development' ? 'bg-blue-500' :
                      product.status === 'testing' ? 'bg-yellow-500' :
                      product.status === 'live' ? 'bg-green-500' :
                      product.status === 'completed' ? 'bg-purple-500' :
                      product.status === 'on_hold' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    
                    <CardHeader className="pb-1 pl-3 pt-3">
                      <div className="flex items-start gap-2">
                        <div className={`p-1 rounded bg-${
                          product.status === 'planning' ? 'gray-500' :
                          product.status === 'in_development' ? 'blue-500' :
                          product.status === 'testing' ? 'yellow-500' :
                          product.status === 'live' ? 'green-500' :
                          product.status === 'completed' ? 'purple-500' :
                          product.status === 'on_hold' ? 'orange-500' :
                          'red-500'
                        }`}>
                          <Package className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                            {product.name}
                          </CardTitle>
                          <p className="text-xs text-gray-600 line-clamp-1">{product.description}</p>
                          
                          {/* Status & Priority Badges */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`px-1.5 py-0.5 text-xs ${
                                product.status === 'planning' ? 'border-gray-300 text-gray-700 bg-gray-50' :
                                product.status === 'in_development' ? 'border-blue-300 text-blue-700 bg-blue-50' :
                                product.status === 'testing' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                                product.status === 'live' ? 'border-green-300 text-green-700 bg-green-50' :
                                product.status === 'completed' ? 'border-purple-300 text-purple-700 bg-purple-50' :
                                product.status === 'on_hold' ? 'border-orange-300 text-orange-700 bg-orange-50' :
                                'border-red-300 text-red-700 bg-red-50'
                              }`}
                            >
                              {product.status.replace('_', ' ')}
                    </Badge>
                            <Badge 
                              variant="outline" 
                              className={`px-1.5 py-0.5 text-xs ${
                                product.priority === 'high' ? 'border-red-300 text-red-700 bg-red-50' :
                                product.priority === 'medium' ? 'border-orange-300 text-orange-700 bg-orange-50' :
                                'border-gray-300 text-gray-700 bg-gray-50'
                              }`}
                            >
                      {product.priority}
                    </Badge>
                          </div>
                  </div>
                </div>
              </CardHeader>

                    <CardContent className="pl-3 pt-0 pb-2">
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-gray-700">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-purple-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                  </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                          <p className="text-gray-500">Due Date</p>
                          <p className="text-gray-900 truncate">{product.deadline || 'Not set'}</p>
                  </div>
                  <div>
                          <p className="text-gray-500">Manager</p>
                          <p className="text-gray-900 truncate">{product.managerId || 'Unassigned'}</p>
                  </div>
                </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                          className="flex-1 h-6 text-xs border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                          variant="outline"
                    size="sm"
                          className="flex-1 h-6 text-xs border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
                  </div>
            </Card>
              );
            })
        )}
      </div>

      {/* ✅ Compact Dialog Form - Custom Background */}
      <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) setEditingProduct(null); }}>
        <DialogContent className="sm:max-w-md bg-gray-50 border-gray-300">
          <DialogHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-purple-600 rounded">
                <Package className="h-3 w-3 text-white" />
              </div>
              <DialogTitle className="text-base font-medium text-gray-900">
                {editingProduct ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </div>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-700">Product Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-700">Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-700">Status</Label>
              <Select value={formData.status} onValueChange={(val) => handleChange("status", val)}>
                  <SelectTrigger className="h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm">
                    <SelectValue placeholder="Status" />
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

              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-700">Priority</Label>
              <Select value={formData.priority} onValueChange={(val) => handleChange("priority", val)}>
                  <SelectTrigger className="h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-700">Due Date</Label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
                className="h-7 border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-gray-200">
              <div className="flex gap-2 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 h-7 border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 h-7 bg-purple-600 hover:bg-purple-700 text-white text-xs"
                >
                  {editingProduct ? "Update" : "Create"}
              </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
