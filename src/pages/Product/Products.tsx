import { useState } from "react";
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const initialProducts = [
  {
    id: 1,
    name: "Mobile App v2.0",
    status: "In Development",
    priority: "High",
    progress: 75,
    team: "Mobile Team",
    dueDate: "2024-03-15",
  },
  {
    id: 2,
    name: "Web Platform",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    team: "Web Team",
    dueDate: "2024-04-01",
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    name: "",
    status: "Planning",
    priority: "Medium",
    progress: 0,
    team: "",
    dueDate: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { id: products.length + 1, ...formData };
    setProducts([...products, newProduct]);
    setOpen(false);
    setFormData({
      name: "",
      status: "Planning",
      priority: "Medium",
      progress: 0,
      team: "",
      dueDate: "",
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Products</h1>
          <p className="text-base text-gray-600">Manage your product portfolio</p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-[#8A2BE2] hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Button
          variant="outline"
          className="flex items-center justify-center space-x-2 w-full sm:w-auto border-purple-300 text-purple-900 hover:bg-purple-200"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      {/* Product Cards */}
      <div className="space-y-4 ">
        {products.map((product) => (
          <Card
            key={product.id}
            className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01] shadow-md border border-purple-200 hover:bg-[#E6E6FA]"
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-lg font-semibold text-purple-900">
                  {product.name}
                </CardTitle>
                <div className="flex items-center space-x-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-xs text-purple-900 border-purple-300"
                  >
                    {product.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs text-purple-900 border-purple-300"
                  >
                    {product.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Progress */}
                <div className="col-span-full sm:col-span-1">
                  <p className="text-sm text-gray-600 mb-2">Progress</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#8A2BE2] h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${product.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold min-w-[3rem] text-right text-gray-700">
                      {product.progress}%
                    </span>
                  </div>
                </div>

                {/* Team */}
                <div>
                  <p className="text-sm text-gray-600">Team</p>
                  <p className="font-medium text-gray-800">{product.team}</p>
                </div>

                {/* Due Date */}
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium text-gray-800">{product.dueDate}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto border-purple-300 text-purple-900 hover:bg-purple-200"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => handleChange("status", val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                  <SelectItem value="Live">Live</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div>
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(val) => handleChange("priority", val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Team */}
            <div>
              <Label>Team</Label>
              <Input
                value={formData.team}
                onChange={(e) => handleChange("team", e.target.value)}
              />
            </div>

            {/* Due Date */}
            <div>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </div>

            {/* Progress */}
            <div>
              <Label>Progress (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => handleChange("progress", e.target.value)}
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
