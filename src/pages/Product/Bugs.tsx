import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, AlertTriangle, Bug as BugIcon, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Api_EndPoints } from "@/Config/Api_Endpoints";

// ✅ API endpoints
const API_ENDPOINTS = {
  BUGS: Api_EndPoints.BUGS_API,
  PRODUCTS: Api_EndPoints.PRODUCTS_API,
  EMPLOYEES: Api_EndPoints.EMPLOYEES_API,
};

// ✅ Bug interface matching backend schema
interface Bug {
  id: number;
  productId: number;
  reportedBy: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  reportedOn: string;
}

// ✅ Product interface matching backend schema
interface Product {
  id: number;
  name: string;
  description?: string;
  managerId?: string;
  status?: 'planning' | 'in_development' | 'testing' | 'live' | 'completed' | 'on_hold' | 'inactive' | 'active';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Employee interface
interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
}

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
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Form state matching backend schema
  const [newBug, setNewBug] = useState({
    productId: 0,
    reportedBy: "", // Will be auto-filled with current user
    title: "",
    description: "",
    severity: "Low" as 'Low' | 'Medium' | 'High' | 'Critical',
    status: "Open" as 'Open' | 'In Progress' | 'Resolved' | 'Closed',
  });

  // ✅ Current user state
  const [currentUser, setCurrentUser] = useState<any>(null);

  // ✅ Fetch current user profile
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // First check if user data is in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData);
          console.log('Using stored user data:', userData);
          return;
        }

        // If not in localStorage, fetch from API
        const response = await axios.get(Api_EndPoints.PROFILE_API, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Profile API response:', response.data);
        
        // The getMyProfile API returns data directly, not wrapped in 'data' property
        // and it has nested structure: { employee: {...}, personal: {...}, bank: {...}, pf: {...} }
        const userData = response.data.employee || response.data;
        setCurrentUser(userData);
        console.log('Current user data:', userData);
        
        // Store in localStorage for future use
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching current user:', error);
        console.error('Error details:', error.response?.data);
        
        // Try to get user info from JWT token as fallback
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const fallbackUser = {
              employeeId: payload.id || payload.sub,
              firstName: payload.firstName || payload.name || 'User',
              lastName: payload.lastName || ''
            };
            setCurrentUser(fallbackUser);
            console.log('Using fallback user data from token:', fallbackUser);
          } catch (tokenError) {
            console.error('Error parsing token:', tokenError);
            
            // Final fallback - create a temporary user for testing
            const tempUser = {
              employeeId: 'TEMP001',
              firstName: 'Test',
              lastName: 'User'
            };
            setCurrentUser(tempUser);
            console.log('Using temporary user for testing:', tempUser);
          }
        }
      }
    };
    fetchCurrentUser();
  }, []);

  // ✅ Fetch bugs, products, and employees
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch bugs
        const bugsResponse = await axios.get(API_ENDPOINTS.BUGS, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Bugs response:', bugsResponse.data);
        setBugs(bugsResponse.data.data || []);

        // Fetch products
        const productsResponse = await axios.get(API_ENDPOINTS.PRODUCTS, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Products response:', productsResponse.data);
        // Products API returns data directly, not wrapped in a 'data' property
        setProducts(productsResponse.data || []);

        // Fetch employees (optional - may fail due to role restrictions)
        try {
          const employeesResponse = await axios.get(API_ENDPOINTS.EMPLOYEES, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Employees response:', employeesResponse.data);
          setEmployees(employeesResponse.data.data || []);
        } catch (employeeError) {
          console.warn('Could not fetch employees (role restriction):', employeeError.response?.status);
          // If employees fetch fails, we'll use current user as the only option
          if (currentUser) {
            setEmployees([currentUser]);
          }
        }

      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Add new bug
  const handleAddBug = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newBug.productId === 0) {
      alert("Please select a product");
      return;
    }
    if (!currentUser?.employeeId) {
      alert("Unable to identify current user");
      return;
    }

    // Auto-fill the reporter with current user
    const bugData = {
        ...newBug,
      reportedBy: currentUser.employeeId
    };

    setLoading(true);
    try {
      const response = await axios.post(API_ENDPOINTS.BUGS, bugData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Refresh bugs list
      const bugsResponse = await axios.get(API_ENDPOINTS.BUGS, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBugs(bugsResponse.data.data || []);
      
      setShowForm(false);

      // Reset form
      setNewBug({
        productId: 0,
        reportedBy: "", // Will be auto-filled when submitting
        title: "",
        description: "",
        severity: "Low",
        status: "Open",
      });
    } catch (error) {
      console.error("❌ Error adding bug:", error);
      alert("Failed to add bug. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBugs = bugs.filter(
    (bug) =>
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.description.toLowerCase().includes(search.toLowerCase()) ||
      bug.id.toString().includes(search.toLowerCase())
  );

  // Helper function to get product name
  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  // Helper function to get employee name
  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.employeeId === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ✅ Compact Header */}
        <div className="bg-white rounded-lg shadow-md border border-purple-100 p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md">
                <BugIcon className="h-5 w-5 text-white" />
              </div>
        <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Bug Tracker
                </h1>
                <p className="text-sm text-gray-600">
            Track and manage bug reports
          </p>
        </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{bugs.length} Bugs</span>
        </div>
        <Button
          onClick={() => setShowForm(true)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          <span>Report Bug</span>
        </Button>
            </div>
          </div>
      </div>

        {/* ✅ Compact Search & Filters */}
        <div className="bg-white rounded-lg shadow-md border border-purple-100 p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
          <Input
            placeholder="Search bugs..."
                className="pl-10 h-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500 rounded-md text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-1 px-2 py-1 bg-red-50 rounded-md border border-red-200">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <span className="text-xs font-medium text-red-700">
                  {bugs.filter(b => b.severity === 'Critical').length} Critical
                </span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-orange-50 rounded-md border border-orange-200">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span className="text-xs font-medium text-orange-700">
                  {bugs.filter(b => b.severity === 'High').length} High
                </span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-50 rounded-md border border-yellow-200">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <span className="text-xs font-medium text-yellow-700">
                  {bugs.filter(b => b.status === 'Open').length} Open
                </span>
              </div>
            </div>
        </div>
      </div>

        {/* ✅ Compact Bug Cards */}
        <div className="space-y-3">
          {loading ? (
            <div className="bg-white rounded-lg shadow-md border border-purple-100 p-8">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-8 h-8 border-2 border-purple-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-3 text-sm font-medium text-purple-600">Loading bugs...</p>
              </div>
            </div>
          ) : filteredBugs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md border border-purple-100 p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-2 bg-gray-100 rounded-full mb-3">
                  <BugIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bugs found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {search ? "No bugs match your search criteria." : "Get started by reporting your first bug."}
                </p>
                {!search && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm px-4 py-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Report Bug
                  </Button>
                )}
              </div>
            </div>
          ) : (
            filteredBugs.map((bug) => {
          const SeverityIcon = getSeverityIcon(bug.severity);
              const severityColors = {
                Critical: "from-red-500 to-red-600",
                High: "from-orange-500 to-orange-600", 
                Medium: "from-purple-500 to-purple-600",
                Low: "from-gray-500 to-gray-600"
              };
              
          return (
            <Card
              key={bug.id}
                  className="group transition-all duration-300 hover:shadow-lg hover:scale-[1.01] shadow-md border-0 bg-white overflow-hidden"
                >
                  <div className="relative">
                    {/* Severity Indicator */}
                    <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${severityColors[bug.severity as keyof typeof severityColors]}`}></div>
                    
                    <CardHeader className="pb-2 pl-4">
                      <div className="flex items-start gap-2">
                        <div className={`p-1.5 rounded-md bg-gradient-to-r ${severityColors[bug.severity as keyof typeof severityColors]} shadow-sm`}>
                          <SeverityIcon className="h-4 w-4 text-white" />
                        </div>
                  <div className="flex-1">
                          <CardTitle className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                          {bug.title}
                        </CardTitle>
                          <p className="text-sm text-gray-600 line-clamp-2">{bug.description}</p>
                          
                          {/* Status Badges */}
                          <div className="flex flex-wrap gap-1 mt-2">
                        <Badge
                          variant="outline"
                              className={`px-2 py-0.5 text-xs font-medium ${
                                bug.status === 'Open' ? 'border-red-300 text-red-700 bg-red-50' :
                                bug.status === 'In Progress' ? 'border-blue-300 text-blue-700 bg-blue-50' :
                                bug.status === 'Resolved' ? 'border-green-300 text-green-700 bg-green-50' :
                                'border-gray-300 text-gray-700 bg-gray-50'
                              }`}
                        >
                          {bug.status}
                        </Badge>
                        <Badge
                          variant="outline"
                              className={`px-2 py-0.5 text-xs font-medium ${
                                bug.severity === 'Critical' ? 'border-red-300 text-red-700 bg-red-50' :
                                bug.severity === 'High' ? 'border-orange-300 text-orange-700 bg-orange-50' :
                                bug.severity === 'Medium' ? 'border-purple-300 text-purple-700 bg-purple-50' :
                                'border-gray-300 text-gray-700 bg-gray-50'
                              }`}
                        >
                          {bug.severity}
                        </Badge>
                      </div>
                  </div>
                </div>
              </CardHeader>
                    
                    <CardContent className="pl-4 pt-0 pb-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div>
                          <p className="text-gray-500 font-medium">Product</p>
                          <p className="text-gray-900 truncate">{getProductName(bug.productId)}</p>
                    </div>
                    <div>
                          <p className="text-gray-500 font-medium">Reported By</p>
                          <p className="text-gray-900 truncate">{getEmployeeName(bug.reportedBy)}</p>
                    </div>
                    <div>
                          <p className="text-gray-500 font-medium">Date</p>
                          <p className="text-gray-900">{new Date(bug.reportedOn).toLocaleDateString()}</p>
                    </div>
                        <div>
                          <p className="text-gray-500 font-medium">ID</p>
                          <p className="text-gray-900 font-mono">#{bug.id}</p>
                  </div>
                </div>
              </CardContent>
                  </div>
            </Card>
          );
            })
          )}
      </div>

      </div>

      {/* ✅ Compact Add Bug Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-white bg-opacity-20 rounded-md">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Report Bug
            </h2>
                    <p className="text-purple-100 text-sm">
                      Report an issue you've encountered
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
            <form onSubmit={handleAddBug} className="space-y-4">
                  {/* Product Selection */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Product *
                    </label>
                    {products.length === 0 && (
                      <div className="p-2 bg-orange-50 border border-orange-200 rounded-md">
                        <p className="text-xs text-orange-700">
                          No products available. Please create a product first.
                        </p>
                      </div>
                    )}
                    <Select
                      value={newBug.productId.toString()}
                      onValueChange={(value) =>
                        setNewBug({ ...newBug, productId: parseInt(value) })
                      }
                    >
                      <SelectTrigger className="h-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.length === 0 ? (
                          <SelectItem value="no-products" disabled>
                            No products available
                          </SelectItem>
                        ) : (
                          products.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Current Reporter Display */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Reporter
                    </label>
                    <div className="w-full border border-purple-200 rounded-md p-3 bg-gradient-to-r from-purple-50 to-indigo-50">
                      {currentUser ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-900 text-sm font-medium">
                              {currentUser.firstName} {currentUser.lastName}
                            </span>
                            <p className="text-xs text-gray-500">({currentUser.employeeId})</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto mb-1 animate-pulse"></div>
                          <div className="text-gray-500 text-xs">
                            Loading user info...
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Bug will be reported by you automatically
                    </p>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Title *
                    </label>
              <Input
                      placeholder="Enter bug title"
                value={newBug.title}
                onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                required
                      className="h-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description *
                    </label>
                    <textarea
                      placeholder="Describe the bug in detail..."
                value={newBug.description}
                onChange={(e) =>
                  setNewBug({ ...newBug, description: e.target.value })
                }
                required
                      className="w-full border border-purple-200 rounded-md p-3 min-h-[80px] resize-vertical focus:ring-purple-500 focus:border-purple-500 text-sm"
                    />
                  </div>

                  {/* Severity & Status */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Severity */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Severity *
                      </label>
                      <Select
                value={newBug.severity}
                        onValueChange={(value) =>
                          setNewBug({ ...newBug, severity: value as 'Low' | 'Medium' | 'High' | 'Critical' })
                        }
                      >
                        <SelectTrigger className="h-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500">
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                              <span className="text-sm">Low</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Medium">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              <span className="text-sm">Medium</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="High">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              <span className="text-sm">High</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Critical">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              <span className="text-sm">Critical</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <Select
                        value={newBug.status}
                        onValueChange={(value) =>
                          setNewBug({ ...newBug, status: value as 'Open' | 'In Progress' | 'Resolved' | 'Closed' })
                        }
                      >
                        <SelectTrigger className="h-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              <span className="text-sm">Open</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="In Progress">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-sm">In Progress</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Resolved">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="text-sm">Resolved</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Closed">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                              <span className="text-sm">Closed</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                      disabled={loading}
                      className="h-9 px-4 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                      className="h-9 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                      disabled={loading || products.length === 0 || !currentUser}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : products.length === 0 ? (
                        "No Products Available"
                      ) : !currentUser ? (
                        "Loading User Info..."
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Plus className="h-3 w-3" />
                          <span>Report Bug</span>
                        </div>
                      )}
                </Button>
              </div>
            </form>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
