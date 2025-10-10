import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  User, 
  FileText,
  TrendingUp,
  Award,
  MessageSquare,
  ThumbsUp
} from "lucide-react";

export default function Evaluation() {
  const evaluations = [
    {
      id: 1,
      course: "JavaScript Fundamentals",
      trainer: "Hari K",
      date: "2024-01-20",
      overallRating: 4.5,
      technicalSkills: 85,
      participation: 90,
      assignments: 80,
      feedback: "Excellent understanding of JavaScript concepts. Shows great potential in problem-solving.",
      areas: ["Problem Solving", "Code Quality", "Debugging"],
      improvements: ["Focus on more complex algorithms", "Practice more hands-on projects"]
    },
    {
      id: 2,
      course: "React Components",
      trainer: "Mike Chen", 
      date: "2024-01-15",
      overallRating: 4.2,
      technicalSkills: 82,
      participation: 88,
      assignments: 85,
      feedback: "Good grasp of React fundamentals. Component architecture understanding is developing well.",
      areas: ["Component Design", "State Management", "Props Usage"],
      improvements: ["Work on optimization techniques", "Learn advanced hooks"]
    },
    {
      id: 3,
      course: "Git & Version Control",
      trainer: "Alex Rodriguez",
      date: "2024-01-10", 
      overallRating: 4.8,
      technicalSkills: 95,
      participation: 92,
      assignments: 90,
      feedback: "Outstanding performance in version control concepts. Shows excellent collaboration skills.",
      areas: ["Branching Strategies", "Merge Conflicts", "Collaboration"],
      improvements: ["Explore advanced Git workflows"]
    }
  ];

  const overallStats = {
    averageRating: 4.5,
    technicalAverage: 87,
    participationAverage: 90,
    assignmentAverage: 85,
    totalEvaluations: 3
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Evaluation & Feedback</h1>
        <p className="text-muted-foreground">Track your performance and receive feedback from trainers</p>
      </div>

      {/* Overall Performance Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Rating</p>
                <p className="text-2xl font-bold">{overallStats.averageRating}</p>
                <p className="text-xs text-muted-foreground">out of 5.0</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Technical Skills</p>
                <p className="text-2xl font-bold">{overallStats.technicalAverage}%</p>
                <p className="text-xs text-muted-foreground">average score</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Participation</p>
                <p className="text-2xl font-bold">{overallStats.participationAverage}%</p>
                <p className="text-xs text-muted-foreground">average score</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                <p className="text-2xl font-bold">{overallStats.assignmentAverage}%</p>
                <p className="text-xs text-muted-foreground">average score</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evaluation Tabs */}
      <Tabs defaultValue="received" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="received">Received Feedback</TabsTrigger>
          <TabsTrigger value="self">Self Evaluation</TabsTrigger>
          <TabsTrigger value="progress">Progress Report</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          <div className="grid gap-6">
            {evaluations.map((evaluation) => (
              <Card key={evaluation.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{evaluation.course}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Evaluated by {evaluation.trainer} on {evaluation.date}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      Overall: {evaluation.overallRating}/5.0
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Rating Breakdown */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Technical Skills</p>
                      <Progress value={evaluation.technicalSkills} />
                      <p className="text-xs text-muted-foreground">{evaluation.technicalSkills}%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Participation</p>
                      <Progress value={evaluation.participation} />
                      <p className="text-xs text-muted-foreground">{evaluation.participation}%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Assignments</p>
                      <Progress value={evaluation.assignments} />
                      <p className="text-xs text-muted-foreground">{evaluation.assignments}%</p>
                    </div>
                  </div>

                  {/* Overall Rating */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Overall Rating</p>
                    {renderStars(evaluation.overallRating)}
                  </div>

                  {/* Feedback */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Trainer Feedback</p>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">{evaluation.feedback}</p>
                    </div>
                  </div>

                  {/* Strong Areas */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Strong Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {evaluation.areas.map((area, index) => (
                        <Badge key={index} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Areas for Improvement</p>
                    <ul className="text-sm space-y-1">
                      {evaluation.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="self" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Self Evaluation Form</CardTitle>
              <CardDescription>Reflect on your learning experience and rate your own progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course/Module</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Select a course...</option>
                    <option>JavaScript Fundamentals</option>
                    <option>React Components</option>
                    <option>Git & Version Control</option>
                  </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Understanding Level (1-5)</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="p-2 border rounded hover:bg-muted transition-colors"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confidence Level (1-5)</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="p-2 border rounded hover:bg-muted transition-colors"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">What did you find most challenging?</label>
                  <Textarea placeholder="Describe the most challenging aspects..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">What did you learn best?</label>
                  <Textarea placeholder="Describe what you learned well..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Areas you want to improve</label>
                  <Textarea placeholder="What would you like to work on next..." />
                </div>

                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Self Evaluation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Report</CardTitle>
              <CardDescription>Track your improvement over time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Trends</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Technical Skills</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">+5% this month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Participation</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">+3% this month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Assignment Quality</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">+8% this month</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Achievement Highlights</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Completed 3 courses this month</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Maintained 90%+ attendance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Excellent feedback from trainers</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Download Progress Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}