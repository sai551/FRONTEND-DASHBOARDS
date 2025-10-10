import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Target,
  Users,
  Zap,
  Award,
  Clock,
  DollarSign
} from "lucide-react";

export default function ProjectPerformance() {
  const kpiMetrics = [
    {
      title: "Team Velocity",
      value: "127",
      unit: "tasks/sprint",
      change: "+15%",
      trend: "up",
      description: "Average tasks completed per 2-week sprint"
    },
    {
      title: "Burn Rate",
      value: "3.2",
      unit: "days ahead",
      change: "+0.8",
      trend: "up",
      description: "Project completion vs timeline"
    },
    {
      title: "Resource Utilization",
      value: "87%",
      unit: "capacity",
      change: "+3%",
      trend: "up",
      description: "Team workload efficiency"
    },
    {
      title: "Quality Score",
      value: "94%",
      unit: "success rate",
      change: "-2%",
      trend: "down",
      description: "First-time pass rate for deliverables"
    }
  ];

  const velocityData = [
    { sprint: "Sprint 1", planned: 45, completed: 42 },
    { sprint: "Sprint 2", planned: 50, completed: 48 },
    { sprint: "Sprint 3", planned: 48, completed: 52 },
    { sprint: "Sprint 4", planned: 55, completed: 53 },
    { sprint: "Sprint 5", planned: 52, completed: 58 },
    { sprint: "Sprint 6", planned: 60, completed: 57 },
  ];

  const resourceAllocation = [
    { name: "Frontend Development", allocated: 35, utilized: 32, efficiency: 91 },
    { name: "Backend Development", allocated: 28, utilized: 26, efficiency: 93 },
    { name: "UI/UX Design", allocated: 20, utilized: 18, efficiency: 90 },
    { name: "QA Testing", allocated: 25, utilized: 23, efficiency: 92 },
    { name: "DevOps", allocated: 15, utilized: 13, efficiency: 87 },
    { name: "Project Management", allocated: 12, utilized: 11, efficiency: 92 },
  ];

  const topPerformers = [
    {
      name: "Alex Johnson",
      role: "Senior Developer",
      avatar: "AJ",
      score: 98,
      achievements: ["Code Quality Champion", "Sprint Hero"],
      tasksCompleted: 28,
      onTimeDelivery: 100
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "SC",
      score: 95,
      achievements: ["Design Excellence", "User Advocate"],
      tasksCompleted: 22,
      onTimeDelivery: 95
    },
    {
      name: "Mike Rodriguez",
      role: "QA Engineer",
      avatar: "MR",
      score: 92,
      achievements: ["Bug Hunter", "Quality Guardian"],
      tasksCompleted: 35,
      onTimeDelivery: 97
    },
    {
      name: "Emily Davis",
      role: "Frontend Developer",
      avatar: "ED",
      score: 89,
      achievements: ["Innovation Award"],
      tasksCompleted: 19,
      onTimeDelivery: 89
    }
  ];

  const burndownData = [
    { day: "Day 1", remaining: 100, ideal: 100 },
    { day: "Day 3", remaining: 85, ideal: 86 },
    { day: "Day 5", remaining: 72, ideal: 71 },
    { day: "Day 7", remaining: 58, ideal: 57 },
    { day: "Day 9", remaining: 45, ideal: 43 },
    { day: "Day 11", remaining: 32, ideal: 29 },
    { day: "Day 13", remaining: 18, ideal: 14 },
    { day: "Day 14", remaining: 8, ideal: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance & KPIs</h1>
          <p className="text-muted-foreground">
            Monitor team performance, track key metrics, and analyze productivity trends
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <Activity className="mr-2 h-4 w-4" />
            Real-time Dashboard
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value}
                <span className="text-lg text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="flex items-center mt-2">
                <span className={`text-xs ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {metric.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="velocity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="velocity">Velocity Analysis</TabsTrigger>
          <TabsTrigger value="burndown">Burn-down Charts</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          <TabsTrigger value="performers">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="velocity" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sprint Velocity Trend</CardTitle>
                <CardDescription>Tasks planned vs completed over last 6 sprints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {velocityData.map((sprint, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{sprint.sprint}</span>
                        <span>{sprint.completed}/{sprint.planned} tasks</span>
                      </div>
                      <div className="relative">
                        <Progress value={(sprint.completed / sprint.planned) * 100} className="h-2" />
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-full -z-10" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sprint.completed > sprint.planned ? (
                          <span className="text-green-600">+{sprint.completed - sprint.planned} tasks over target</span>
                        ) : sprint.completed < sprint.planned ? (
                          <span className="text-red-600">{sprint.planned - sprint.completed} tasks under target</span>
                        ) : (
                          <span className="text-green-600">Target achieved</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Velocity Insights</CardTitle>
                <CardDescription>Key metrics and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Improving Trend</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Team velocity has increased by 15% over the last 3 sprints
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Consistency</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Team consistently delivers 95%+ of planned tasks
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Recommendation</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Consider increasing sprint capacity by 5-10 tasks
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="burndown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Sprint Burn-down</CardTitle>
              <CardDescription>Progress vs ideal burn-down for active sprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Tasks Remaining</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">Days Left</div>
                  </div>
                </div>
                
                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Burn-down Chart</h3>
                  <p className="text-gray-500 mb-4">
                    Interactive burn-down chart visualization would be displayed here
                  </p>
                  <Button variant="outline">Configure Chart</Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold text-green-600">96%</div>
                    <div className="text-sm text-muted-foreground">On Track</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold text-blue-600">4.2</div>
                    <div className="text-sm text-muted-foreground">Avg Daily Burn</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold text-purple-600">Mar 15</div>
                    <div className="text-sm text-muted-foreground">Projected End</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation Analysis</CardTitle>
              <CardDescription>Team capacity utilization across different areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceAllocation.map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{resource.name}</span>
                      <Badge variant={resource.efficiency >= 90 ? "default" : "secondary"}>
                        {resource.efficiency}% efficient
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Allocated: {resource.allocated}h</span>
                        <span>Utilized: {resource.utilized}h</span>
                      </div>
                      <Progress value={(resource.utilized / resource.allocated) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Capacity Overview</CardTitle>
                <CardDescription>Current team workload distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <PieChart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-muted-foreground">Average Utilization</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-bold text-green-600">13%</div>
                      <div className="text-muted-foreground">Available Capacity</div>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-bold text-blue-600">135h</div>
                      <div className="text-muted-foreground">Total Allocated</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
                <CardDescription>Suggestions to improve resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">High Performance</span>
                  </div>
                  <p className="text-sm text-green-700">Backend team exceeding efficiency targets</p>
                </div>
                <div className="p-3 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Opportunity</span>
                  </div>
                  <p className="text-sm text-yellow-700">DevOps team has 13% available capacity</p>
                </div>
                <div className="p-3 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Rebalancing</span>
                  </div>
                  <p className="text-sm text-blue-700">Consider cross-training for flexibility</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers Recognition</CardTitle>
              <CardDescription>Outstanding team members and their achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {topPerformers.map((performer, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{performer.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{performer.name}</h4>
                            <p className="text-sm text-muted-foreground">{performer.role}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{performer.score}</div>
                            <div className="text-xs text-muted-foreground">Performance Score</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            {performer.achievements.map((achievement, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Tasks Completed</div>
                              <div className="font-medium">{performer.tasksCompleted}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">On-time Delivery</div>
                              <div className="font-medium">{performer.onTimeDelivery}%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Team Awards</CardTitle>
                <CardDescription>Monthly recognition program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-4 border rounded-lg bg-yellow-50">
                  <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-medium">Employee of the Month</div>
                  <div className="text-sm text-muted-foreground">Alex Johnson</div>
                </div>
                <div className="text-center p-4 border rounded-lg bg-blue-50">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-medium">Best Team Collaboration</div>
                  <div className="text-sm text-muted-foreground">Frontend Team</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Month-over-month improvements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm">Average Score</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-medium">91.5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm">Task Completion</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm">Quality Rating</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-medium">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recognition Actions</CardTitle>
                <CardDescription>Reward and motivate your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <Award className="mr-2 h-4 w-4" />
                  Give Recognition
                </Button>
                <Button variant="outline" className="w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Bonus Recommendation
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Performance Review
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}