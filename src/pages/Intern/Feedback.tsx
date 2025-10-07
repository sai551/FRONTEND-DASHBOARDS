import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  User,
  Target,
  Award,
  ThumbsUp,
  AlertCircle,
  Download
} from "lucide-react";

export default function InternFeedback() {
  const evaluations = [
    {
      id: 1,
      evaluator: "Vijay B",
      role: "Mentor",
      date: "2024-01-15",
      period: "Week 3",
      overall: 4.2,
      skills: {
        technical: 4.5,
        communication: 4.0,
        teamwork: 4.0,
        problemSolving: 4.3,
        timeManagement: 3.8
      },
      feedback: "John has shown excellent progress in React development. His code quality has improved significantly, and he's becoming more independent in solving problems.",
      goals: "Focus on improving time estimation for tasks and continue building confidence in code reviews."
    },
    {
      id: 2,
      evaluator: "Mike Chen",
      role: "Tech Lead",
      date: "2024-01-08",
      period: "Week 2",
      overall: 3.8,
      skills: {
        technical: 4.0,
        communication: 3.5,
        teamwork: 4.0,
        problemSolving: 4.0,
        timeManagement: 3.5
      },
      feedback: "Good improvement in technical skills. John is asking the right questions and showing initiative in learning new concepts.",
      goals: "Work on communication during team meetings and practice explaining technical concepts to non-technical stakeholders."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : i < rating 
            ? "fill-yellow-200 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Feedback & Evaluation</h1>
        <p className="text-muted-foreground">Track your performance and receive valuable feedback</p>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Rating</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">4.2</span>
                  <div className="flex space-x-1">
                    {renderStars(4.2)}
                  </div>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Evaluations</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Improvement</p>
                <p className="text-2xl font-bold text-green-600">+0.4</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Goals Met</p>
                <p className="text-2xl font-bold">8/10</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evaluations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="request">Request Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluations" className="space-y-4">
          {evaluations.map((evaluation) => (
            <Card key={evaluation.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {evaluation.evaluator.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{evaluation.period} Evaluation</CardTitle>
                      <CardDescription>
                        By {evaluation.evaluator} • {evaluation.role} • {new Date(evaluation.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderStars(evaluation.overall)}
                    </div>
                    <span className="font-bold text-lg">{evaluation.overall}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skills Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-medium">Skills Assessment</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {Object.entries(evaluation.skills).map(([skill, rating]) => (
                      <div key={skill} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span>{rating}/5</span>
                        </div>
                        <Progress value={rating * 20} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div className="space-y-3">
                  <h4 className="font-medium">Detailed Feedback</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{evaluation.feedback}</p>
                  </div>
                </div>

                {/* Goals */}
                <div className="space-y-3">
                  <h4 className="font-medium">Areas for Improvement</h4>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">{evaluation.goals}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Discuss
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Progress Over Time</CardTitle>
              <CardDescription>Track your skill development throughout the internship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Technical Skills</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>React Development</span>
                        <span>4.5/5</span>
                      </div>
                      <Progress value={90} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>JavaScript</span>
                        <span>4.2/5</span>
                      </div>
                      <Progress value={84} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Git & Version Control</span>
                        <span>4.0/5</span>
                      </div>
                      <Progress value={80} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Soft Skills</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Communication</span>
                        <span>4.0/5</span>
                      </div>
                      <Progress value={80} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Teamwork</span>
                        <span>4.1/5</span>
                      </div>
                      <Progress value={82} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Problem Solving</span>
                        <span>4.3/5</span>
                      </div>
                      <Progress value={86} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <ThumbsUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Strengths</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Strong technical foundation, quick learner, excellent problem-solving abilities, 
                      and good collaboration skills.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900">Growth Areas</h4>
                    <p className="text-sm text-orange-800 mt-1">
                      Time management, confidence in presenting ideas, and experience with testing frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goals & Targets</CardTitle>
              <CardDescription>Your objectives and progress tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Complete React Fundamentals Course</h4>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Master React components, hooks, and state management
                  </p>
                  <Progress value={100} />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Build a Full-Stack Project</h4>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create a complete application with React frontend and Node.js backend
                  </p>
                  <Progress value={65} />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Improve Communication Skills</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Practice presenting ideas and participating in team discussions
                  </p>
                  <Progress value={40} />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Learn Testing Best Practices</h4>
                    <Badge variant="outline">Planned</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Understand unit testing, integration testing, and TDD principles
                  </p>
                  <Progress value={0} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Feedback</CardTitle>
              <CardDescription>Ask for specific feedback from your mentors or team leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Evaluator</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Vijay B (Mentor)</option>
                      <option>Mike Chen (Tech Lead)</option>
                      <option>Alex Rodriguez (Senior Developer)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Feedback Type</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>General Performance</option>
                      <option>Specific Project</option>
                      <option>Skill Assessment</option>
                      <option>Career Guidance</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred Response Time</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Within a week</option>
                      <option>Within 3 days</option>
                      <option>Within 24 hours</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Specific Questions or Areas</label>
                <Textarea 
                  className="mt-1" 
                  placeholder="What specific aspects would you like feedback on? (e.g., code quality, communication skills, project approach...)"
                  rows={4}
                />
              </div>

              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Feedback Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}