import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  Calendar,
  FileText,
  Mail
} from "lucide-react";

export default function ReportsInsights() {
  const reportData = {
    sessions: 42,
    totalHours: 168,
    averageRating: 4.8,
    completionRate: 87,
    activeTrainees: 24,
    coursesCompleted: 15
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Insights</h1>
          <p className="text-gray-600">Analyze training performance and generate reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Schedule Reports
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Delivered</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{reportData.sessions}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{reportData.totalHours}</div>
            <p className="text-xs text-muted-foreground">Total delivered</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{reportData.averageRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{reportData.completionRate}%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trainees</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700">{reportData.activeTrainees}</div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{reportData.coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Session Performance Report
            </CardTitle>
            <CardDescription>Detailed analysis of training session effectiveness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engagement Score</span>
                <span className="font-medium">4.7/5</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Content Quality</span>
                <span className="font-medium">4.9/5</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Delivery Effectiveness</span>
                <span className="font-medium">4.6/5</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Trainee Progress Report
            </CardTitle>
            <CardDescription>Individual and group progress tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">85%</div>
                <p className="text-xs text-gray-600">On Track</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">12%</div>
                <p className="text-xs text-gray-600">At Risk</p>
              </div>
            </div>
            <div className="space-y-2">
              {["React Fundamentals", "JavaScript Advanced", "Node.js Basics"].map((course, index) => (
                <div key={course} className="flex justify-between items-center text-sm">
                  <span>{course}</span>
                  <Badge variant="outline">{85 + index * 3}%</Badge>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Resource Utilization Report
            </CardTitle>
            <CardDescription>Training hours and resource allocation analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weekly Hours</span>
                <span className="font-medium">42 hrs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Utilization Rate</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg. Session Size</span>
                <span className="font-medium">8 trainees</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Top Courses by Hours</h4>
              {[
                { name: "React Fundamentals", hours: 32 },
                { name: "JavaScript Advanced", hours: 28 },
                { name: "Node.js Basics", hours: 24 }
              ].map((course, index) => (
                <div key={course.name} className="flex justify-between items-center text-sm">
                  <span>{course.name}</span>
                  <span className="font-medium">{course.hours}h</span>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Trends</CardTitle>
          <CardDescription>Track your training performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Session Delivery Trends</h4>
              <div className="space-y-3">
                {["January", "February", "March", "April"].map((month, index) => (
                  <div key={month} className="flex items-center justify-between">
                    <span className="text-sm">{month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${70 + index * 8}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12">{70 + index * 8}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Feedback Ratings</h4>
              <div className="space-y-3">
                {[
                  { category: "Content Quality", rating: 4.9 },
                  { category: "Delivery Style", rating: 4.7 },
                  { category: "Engagement", rating: 4.8 },
                  { category: "Overall Experience", rating: 4.8 }
                ].map((item, index) => (
                  <div key={item.category} className="flex justify-between items-center">
                    <span className="text-sm">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automated Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Report Scheduling</CardTitle>
          <CardDescription>Set up automated delivery of reports via email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Weekly Performance Summary", frequency: "Every Monday", status: "Active" },
              { name: "Monthly Progress Report", frequency: "1st of each month", status: "Active" },
              { name: "Quarterly Training Analytics", frequency: "End of quarter", status: "Scheduled" }
            ].map((report, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{report.name}</h4>
                  <Badge variant={report.status === "Active" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{report.frequency}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-3 w-3 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button className="bg-green-600 hover:bg-green-700">
              <Calendar className="h-4 w-4 mr-2" />
              Add New Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}