import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Award, 
  Star, 
  Download,
  CheckCircle,
  User,
  Calendar
} from "lucide-react";

export default function InternTraining() {
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the basics of React including components, props, state, and lifecycle methods.",
      progress: 80,
      duration: "6 hours",
      instructor: "Vijay B",
      category: "Frontend",
      difficulty: "Beginner",
      status: "In Progress",
      modules: 8,
      completedModules: 6,
      certificateAvailable: false
    },
    {
      id: 2,
      title: "JavaScript ES6+",
      description: "Master modern JavaScript features including arrow functions, promises, async/await, and modules.",
      progress: 100,
      duration: "4 hours",
      instructor: "Mike Chen",
      category: "Programming",
      difficulty: "Intermediate",
      status: "Completed",
      modules: 6,
      completedModules: 6,
      certificateAvailable: true
    },
    {
      id: 3,
      title: "Git & Version Control",
      description: "Learn Git basics, branching strategies, and collaborative workflows using GitHub.",
      progress: 60,
      duration: "3 hours",
      instructor: "Alex Rodriguez",
      category: "Tools",
      difficulty: "Beginner",
      status: "In Progress",
      modules: 5,
      completedModules: 3,
      certificateAvailable: false
    },
    {
      id: 4,
      title: "Advanced React Patterns",
      description: "Deep dive into advanced React concepts like hooks, context, and performance optimization.",
      progress: 0,
      duration: "8 hours",
      instructor: "Vijay B",
      category: "Frontend",
      difficulty: "Advanced",
      status: "Not Started",
      modules: 10,
      completedModules: 0,
      certificateAvailable: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Not Started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Learning & Training</h1>
        <p className="text-muted-foreground">Enhance your skills with our comprehensive training programs</p>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Play className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Course Progress */}
                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                      <p className="text-xs text-muted-foreground">
                        {course.completedModules}/{course.modules} modules completed
                      </p>
                    </div>
                  )}

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{course.instructor}</span>
                    </div>
                  </div>

                  {/* Course Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    {course.certificateAvailable && (
                      <Badge variant="secondary">
                        <Award className="mr-1 h-3 w-3" />
                        Certificate
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    {course.status === "Not Started" && (
                      <Button className="flex-1">
                        <Play className="mr-2 h-4 w-4" />
                        Start Course
                      </Button>
                    )}
                    {course.status === "In Progress" && (
                      <Button className="flex-1">
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                    )}
                    {course.status === "Completed" && course.certificateAvailable && (
                      <Button className="flex-1" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Certificate
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {courses.filter(course => course.status === "In Progress").map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {courses.filter(course => course.status === "Completed").map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {course.title}
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completed on Jan 10, 2024</span>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  {course.certificateAvailable && (
                    <Button className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Certificates</CardTitle>
              <CardDescription>Download and share your achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.filter(course => course.certificateAvailable).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-muted-foreground">Completed on Jan 10, 2024</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your current progress and interests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-dashed rounded-lg">
              <h4 className="font-medium">Node.js Fundamentals</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Learn backend development with Node.js and Express
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline">Backend</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>
              </div>
            </div>
            <div className="p-4 border border-dashed rounded-lg">
              <h4 className="font-medium">TypeScript Essentials</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Add type safety to your JavaScript applications
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline">Programming</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}