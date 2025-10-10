import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Search, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Calendar,
  Send,
  ChevronDown
} from "lucide-react";

export default function TrainerFeedbackEvaluation() {
  const feedbackData = [
    {
      id: 1,
      trainee: "Sandeep K",
      course: "React Fundamentals",
      rating: 5,
      comment: "Excellent explanation of complex concepts! The hands-on exercises really helped me understand React hooks better.",
      date: "2024-01-15",
      session: "Session 3: React Hooks"
    },
    {
      id: 2,
      trainee: "Vijay B",
      course: "JavaScript Advanced",
      rating: 5,
      comment: "Best trainer I've had. Very patient and helpful. The real-world examples made everything clear.",
      date: "2024-01-14",
      session: "Session 2: Async JavaScript"
    },
    {
      id: 3,
      trainee: "Bhuvan P",
      course: "Node.js Basics",
      rating: 4,
      comment: "Good pace and practical examples. Would like more time for Q&A sessions.",
      date: "2024-01-13",
      session: "Session 1: Introduction to Node.js"
    }
  ];

  const evaluationData = [
    {
      trainee: "Sandeep K",
      course: "React Fundamentals",
      engagement: 5,
      participation: 4,
      understanding: 5,
      improvement: "Strong grasp of concepts, encourage to take advanced course"
    },
    {
      trainee: "Vijay B",
      course: "JavaScript Advanced",
      engagement: 4,
      participation: 5,
      understanding: 4,
      improvement: "Excellent participation, needs more practice with complex async patterns"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback & Evaluation</h1>
          <p className="text-gray-600">Collect feedback and evaluate trainee performance</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Send className="h-4 w-4 mr-2" />
          Send Feedback Request
        </Button>
      </div>

      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">4.8</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">156</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">12</div>
            <p className="text-xs text-muted-foreground">Awaiting feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Tabs */}
      <Tabs defaultValue="received" className="space-y-4">
        <TabsList>
          <TabsTrigger value="received">Received Feedback</TabsTrigger>
          <TabsTrigger value="evaluations">Trainee Evaluations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search feedback by trainee, course, or content..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Feedback List */}
          {feedbackData.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {feedback.trainee.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{feedback.trainee}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span>{feedback.course}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {feedback.date}
                        </span>
                        <span>{feedback.session}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - feedback.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{feedback.comment}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    Mark as Addressed
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4">
          {/* Evaluation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Trainee Evaluation</CardTitle>
              <CardDescription>Evaluate trainee engagement and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Trainee</label>
                  <div className="relative">
                    <Button variant="outline" className="w-full justify-between">
                      Select Trainee
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Course</label>
                  <div className="relative">
                    <Button variant="outline" className="w-full justify-between">
                      Select Course
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Engagement (1-5)</label>
                  <Input type="number" min="1" max="5" placeholder="5" />
                </div>
                <div>
                  <label className="text-sm font-medium">Participation (1-5)</label>
                  <Input type="number" min="1" max="5" placeholder="4" />
                </div>
                <div>
                  <label className="text-sm font-medium">Understanding (1-5)</label>
                  <Input type="number" min="1" max="5" placeholder="5" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Improvement Suggestions</label>
                <Textarea placeholder="Provide suggestions for improvement..." />
              </div>

              <Button className="bg-green-600 hover:bg-green-700">
                Submit Evaluation
              </Button>
            </CardContent>
          </Card>

          {/* Previous Evaluations */}
          <div className="space-y-4">
            {evaluationData.map((evaluation, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{evaluation.trainee}</CardTitle>
                  <CardDescription>{evaluation.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{evaluation.engagement}/5</div>
                      <p className="text-sm text-gray-600">Engagement</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{evaluation.participation}/5</div>
                      <p className="text-sm text-gray-600">Participation</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{evaluation.understanding}/5</div>
                      <p className="text-sm text-gray-600">Understanding</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Improvement Notes:</p>
                    <p className="text-gray-700">{evaluation.improvement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Analytics</CardTitle>
              <CardDescription>Session effectiveness and improvement trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Rating Distribution</h4>
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex">
                        {[...Array(stars)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {stars === 5 ? 70 : stars === 4 ? 20 : 10}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Course Performance</h4>
                  {[
                    { name: "React Fundamentals", rating: 4.9 },
                    { name: "JavaScript Advanced", rating: 4.8 },
                    { name: "Node.js Basics", rating: 4.6 },
                    { name: "Python Basics", rating: 4.5 }
                  ].map((course, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{course.name}</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}