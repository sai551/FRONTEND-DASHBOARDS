import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Interfaces
interface HRPolicy {
  id: number;
  title: string;
  content: string;
  category: string;
  effectiveDate: string;
  lastUpdated: string;
  status: 'active' | 'inactive' | 'draft';
  createdBy: string;
  updatedBy?: string;
}

interface CreatePolicyDto {
  title: string;
  content: string;
  category: string;
  effectiveDate: string;
  status: 'active' | 'inactive' | 'draft';
}

const HRPolicies = () => {
  const { toast } = useToast();
  
  const [policies, setPolicies] = useState<HRPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<HRPolicy | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CreatePolicyDto>({
    title: "",
    content: "",
    category: "",
    effectiveDate: "",
    status: "draft",
  });

  const policyCategories = [
    "Leave Policy",
    "Attendance Policy",
    "Code of Conduct",
    "Anti-Harassment Policy",
    "IT Security Policy",
    "Remote Work Policy",
    "Performance Policy",
    "Other",
  ];

  // Auth header helper
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch policies
  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/hr-policies",
        getAuthHeaders()
      );
      
      setPolicies(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching policies:", error);
      toast({
        title: "Error",
        description: "Failed to load HR policies",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create policy
  const createPolicy = async () => {
    try {
      await axios.post(
        "http://localhost:3000/hr-policies",
        formData,
        getAuthHeaders()
      );
      
      toast({
        title: "Success",
        description: "HR policy created successfully",
      });
      
      setIsCreateDialogOpen(false);
      resetForm();
      fetchPolicies();
    } catch (error) {
      console.error("Error creating policy:", error);
      toast({
        title: "Error",
        description: "Failed to create HR policy",
      });
    }
  };

  // Update policy
  const updatePolicy = async () => {
    if (!selectedPolicy) return;
    
    try {
      await axios.put(
        `http://localhost:3000/hr-policies/${selectedPolicy.id}`,
        formData,
        getAuthHeaders()
      );
      
      toast({
        title: "Success",
        description: "HR policy updated successfully",
      });
      
      setIsEditDialogOpen(false);
      setSelectedPolicy(null);
      resetForm();
      fetchPolicies();
    } catch (error) {
      console.error("Error updating policy:", error);
      toast({
        title: "Error",
        description: "Failed to update HR policy",
      });
    }
  };

  // Delete policy
  const deletePolicy = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:3000/hr-policies/${id}`,
        getAuthHeaders()
      );
      
      toast({
        title: "Success",
        description: "HR policy deleted successfully",
      });
      
      fetchPolicies();
    } catch (error) {
      console.error("Error deleting policy:", error);
      toast({
        title: "Error",
        description: "Failed to delete HR policy",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      effectiveDate: "",
      status: "draft",
    });
  };

  const openEditDialog = (policy: HRPolicy) => {
    setSelectedPolicy(policy);
    setFormData({
      title: policy.title,
      content: policy.content,
      category: policy.category,
      effectiveDate: policy.effectiveDate,
      status: policy.status,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (policy: HRPolicy) => {
    setSelectedPolicy(policy);
    setIsViewDialogOpen(true);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Filter policies
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || policy.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Stats
  const totalPolicies = policies.length;
  const activePolicies = policies.filter(p => p.status === 'active').length;
  const draftPolicies = policies.filter(p => p.status === 'draft').length;
  const inactivePolicies = policies.filter(p => p.status === 'inactive').length;

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading HR policies...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">HR Policies</h1>
          <p className="text-muted-foreground mt-1">
            Manage company HR policies and procedures
          </p>
        </div>

        <Button
          className="bg-orange-600/20 text-black"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Policy
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Total Policies
              </h3>
              <p className="mt-1 text-2xl font-bold">{totalPolicies}</p>
            </div>
            <FileText className="h-5 w-5 text-blue-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Active
              </h3>
              <p className="mt-1 text-2xl font-bold text-green-600">
                {activePolicies}
              </p>
            </div>
            <FileText className="h-5 w-5 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Draft
              </h3>
              <p className="mt-1 text-2xl font-bold text-yellow-600">
                {draftPolicies}
              </p>
            </div>
            <FileText className="h-5 w-5 text-yellow-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase">
                Inactive
              </h3>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {inactivePolicies}
              </p>
            </div>
            <FileText className="h-5 w-5 text-red-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {policyCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="lg:w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>HR Policies ({filteredPolicies.length})</CardTitle>
          <CardDescription>Manage company policies and procedures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-semibold text-gray-900">
                            {policy.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {policy.content.substring(0, 100)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{policy.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            policy.status === "active"
                              ? "default"
                              : policy.status === "draft"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {policy.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(policy.effectiveDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(policy.lastUpdated).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{policy.createdBy}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openViewDialog(policy)}>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(policy)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deletePolicy(policy.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-6 text-gray-500"
                    >
                      No HR policies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Policy Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Create HR Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Policy title"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {policyCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Effective Date</label>
              <Input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive' | 'draft') => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Policy content..."
                rows={8}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createPolicy}>Create Policy</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Policy Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit HR Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Policy title"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {policyCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Effective Date</label>
              <Input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive' | 'draft') => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Policy content..."
                rows={8}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={updatePolicy}>Update Policy</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Policy Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>{selectedPolicy?.title}</DialogTitle>
          </DialogHeader>
          {selectedPolicy && (
            <div className="space-y-4">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Effective: {new Date(selectedPolicy.effectiveDate).toLocaleDateString()}</span>
                </div>
                <Badge variant={selectedPolicy.status === "active" ? "default" : "secondary"}>
                  {selectedPolicy.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Created by: {selectedPolicy.createdBy}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Category: {selectedPolicy.category}</h4>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{selectedPolicy.content}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRPolicies;
