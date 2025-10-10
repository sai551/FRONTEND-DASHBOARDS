import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  Award,
  Timer
} from "lucide-react";

export default function ProjectTasks() {
  const taskOverview = [
    { title: "Total Tasks", value: 1137, icon: Target, change: "+23" },
    { title: "Completed", value: 892, icon: CheckCircle, change: "+67" },
    { title: "In Progress", value: 178, icon: Clock, change: "-12" },
    { title: "Overdue", value: 67, icon: AlertTriangle, change: "-8" },
  ];

  const teamPerformance = [
    {
      name: "Alex Johnson",
      role: "Senior Developer",
      avatar: "AJ",
      hoursLogged: 168,
      tasksCompleted: 28,
      productivity: 95,
      attendance: 98,
      projects: ["E-commerce Platform", "Mobile Banking App"]
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "SC",
      hoursLogged: 156,
      tasksCompleted: 22,
      productivity: 90,
      attendance: 100,
      projects: ["Healthcare Portal", "Learning Management"]
    },
    {
      name: "Mike Rodriguez",
      role: "QA Engineer",
      avatar: "MR",
      hoursLogged: 172,
      tasksCompleted: 35,
      productivity: 88,
      attendance: 95,
      projects: ["E-commerce Platform", "Inventory Management"]
    },
    {
      name: "Emily Davis",
      role: "Frontend Developer",
      avatar: "ED",
      hoursLogged: 164,
      tasksCompleted: 19,
      productivity: 85,
      attendance: 92,
      projects: ["Mobile Banking App", "Healthcare Portal"]
    },
    {
      name: "John Smith",
      role: "Backend Developer",
      avatar: "JS",
      hoursLogged: 180,
      tasksCompleted: 24,
      productivity: 82,
      attendance: 89,
      projects: ["Learning Management", "Inventory Management"]
    },
  ];

  const projectMilestones = [
    {
      project: "E-commerce Platform",
      milestones: [
        { name: "Database Design", status: "completed", date: "2024-01-20", progress: 100 },
        { name: "API Development", status: "completed", date: "2024-02-15", progress: 100 },
        { name: "Frontend Integration", status: "in-progress", date: "2024-03-01", progress: 75 },
        { name: "Testing & QA", status: "pending", date: "2024-03-10", progress: 0 },
        { name: "Deployment", status: "pending", date: "2024-03-15", progress: 0 },
      ]
    },
    {
      project: "Mobile Banking App",
      milestones: [
        { name: "Architecture Planning", status: "completed", date: "2024-02-05", progress: 100 },
        { name: "Security Implementation", status: "in-progress", date: "2024-02-28", progress: 60 },
        { name: "UI Development", status: "in-progress", date: "2024-03-15", progress: 40 },
        { name: "Integration Testing", status: "pending", date: "2024-04-01", progress: 0 },
        { name: "Beta Release", status: "pending", date: "2024-04-20", progress: 0 },
      ]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return "text-green-600";
    if (productivity >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task & Team Tracking</h1>
          <p className="text-muted-foreground">
            Monitor team performance, track task progress, and manage project milestones
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Review
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Task Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {taskOverview.map((task, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
              <task.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{task.value}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">{task.change} this week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="timeline">Project Timeline</TabsTrigger>
          <TabsTrigger value="gantt">Gantt View</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Overview</CardTitle>
              <CardDescription>
                Individual team member statistics and productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{member.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <div className="flex gap-2 mt-1">
                          {member.projects.map((project, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Timer className="h-3 w-3" />
                          Hours
                        </div>
                        <div className="font-semibold">{member.hoursLogged}h</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3" />
                          Tasks
                        </div>
                        <div className="font-semibold">{member.tasksCompleted}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          Productivity
                        </div>
                        <div className={`font-semibold ${getProductivityColor(member.productivity)}`}>
                          {member.productivity}%
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          Attendance
                        </div>
                        <div className="font-semibold">{member.attendance}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers This Month</CardTitle>
              <CardDescription>Recognition and awards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Most Productive</h4>
                  <p className="text-sm text-muted-foreground">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">95% productivity rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Best Attendance</h4>
                  <p className="text-sm text-muted-foreground">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">100% attendance</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Most Tasks Completed</h4>
                  <p className="text-sm text-muted-foreground">Mike Rodriguez</p>
                  <p className="text-xs text-muted-foreground">35 tasks this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones Timeline</CardTitle>
              <CardDescription>Track major milestones across all active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectMilestones.map((project, projectIndex) => (
                  <div key={projectIndex} className="space-y-3">
                    <h3 className="font-semibold text-lg">{project.project}</h3>
                    <div className="space-y-2">
                      {project.milestones.map((milestone, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              milestone.status === 'completed' ? 'bg-green-500' :
                              milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                            }`} />
                            <div>
                              <h4 className="font-medium">{milestone.name}</h4>
                              <p className="text-sm text-muted-foreground">Due: {milestone.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status.replace('-', ' ')}
                            </Badge>
                            <div className="text-right min-w-[100px]">
                              <div className="text-sm font-medium">{milestone.progress}%</div>
                              <Progress value={milestone.progress} className="w-20 h-2" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gantt Chart View</CardTitle>
              <CardDescription>Visual timeline of all project milestones and dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Gantt Chart Integration</h3>
                <p className="text-gray-500 mb-4">
                  Interactive Gantt chart would be integrated here with a specialized library like dhtmlx-gantt or @dhx/trial
                </p>
                <Button>Configure Gantt Chart</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}