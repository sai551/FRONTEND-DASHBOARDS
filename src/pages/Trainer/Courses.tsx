import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Users, 
  Clock, 
  FileText,
  Video,
  Download,
  Edit,
  Trash2
} from "lucide-react";

export default function TrainerCourseManagement() {
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the basics of React including components, state, and props",
      modules: 8,
      duration: "40 hours",
      enrolledStudents: 24,
      completion: 85,
      materials: ["Videos", "PDFs", "Code Examples"],
      prerequisites: "JavaScript Basics"
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      description: "Deep dive into advanced JavaScript concepts and ES6+ features",
      modules: 12,
      duration: "60 hours",
      enrolledStudents: 18,
      completion: 60,
      materials: ["Videos", "Assignments", "Projects"],
      prerequisites: "JavaScript Fundamentals"
    },
    {
      id: 3,
      title: "Node.js Basics",
      description: "Server-side JavaScript with Node.js and Express framework",
      modules: 10,
      duration: "50 hours",
      enrolledStudents: 15,
      completion: 30,
      materials: ["Videos", "Code Labs", "Documentation"],
      prerequisites: "JavaScript Advanced"
    }
  ];

  const modules = [
    {
      id: 1,
      title: "Introduction to React",
      duration: "2 hours",
      materials: ["Video Lecture", "Reading Material", "Quiz"],
      completed: true
    },
    {
      id: 2,
      title: "Components and JSX",
      duration: "3 hours",
      materials: ["Video Lecture", "Code Examples", "Exercise"],
      completed: true
    },
    {
      id: 3,
      title: "State and Props",
      duration: "4 hours",
      materials: ["Video Lecture", "Hands-on Lab", "Assignment"],
      completed: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course & Curriculum Management</h1>
          <p className="text-gray-600">Create and manage training courses and learning paths</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">12</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">57</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">150</div>
            <p className="text-xs text-muted-foreground">Of content delivered</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">78%</div>
            <p className="text-xs text-muted-foreground">Average across courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search courses by title, topic, or level..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter by Level</Button>
              <Button variant="outline">Sort by Progress</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.modules} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.enrolledStudents} students
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-gray-600">{course.completion}%</span>
                  </div>
                  <Progress value={course.completion} className="h-2" />
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Materials</h4>
                    <div className="flex gap-2">
                      {course.materials.map((material, index) => (
                        <Badge key={index} variant="secondary">{material}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Prerequisites</h4>
                    <Badge variant="outline">{course.prerequisites}</Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-1" />
                      Add Module
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Upload Resources
                    </Button>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Modules Detail */}
      <Card>
        <CardHeader>
          <CardTitle>React Fundamentals - Course Modules</CardTitle>
          <CardDescription>Manage course modules and learning resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    module.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {module.id}
                  </div>
                  <div>
                    <h4 className="font-medium">{module.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                      </span>
                      <span>{module.materials.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Resources
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Module
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}