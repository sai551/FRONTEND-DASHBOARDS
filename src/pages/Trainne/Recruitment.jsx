// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
// } from 'recharts';
// import {
//   Download,
//   FileText,
//   Users,
//   Calendar,
//   CheckCircle,
//   ClipboardList,
//   Briefcase
// } from 'lucide-react';

// // Mock Data
// const jobPostingData = [
//   { month: 'Jan', openings: 5 },
//   { month: 'Feb', openings: 8 },
//   { month: 'Mar', openings: 4 },
//   { month: 'Apr', openings: 10 },
//   { month: 'May', openings: 7 },
//   { month: 'Jun', openings: 6 },
// ];

// const candidateStatus = [
//   { name: 'Interviewed', value: 35 },
//   { name: 'Hired', value: 15 },
//   { name: 'In Process', value: 25 },
//   { name: 'Rejected', value: 25 },
// ];

// const interviewSchedulingData = [
//   { month: 'Jan', scheduled: 10, completed: 8 },
//   { month: 'Feb', scheduled: 14, completed: 12 },
//   { month: 'Mar', scheduled: 12, completed: 9 },
//   { month: 'Apr', scheduled: 16, completed: 14 },
//   { month: 'May', scheduled: 18, completed: 16 },
//   { month: 'Jun', scheduled: 15, completed: 13 },
// ];

// const onboardingData = [
//   { department: 'Marketing', tasks: 45 },
//   { department: 'HR', tasks: 25 },
//   { department: 'Sales', tasks: 30 },
//   { department: 'Finance', tasks: 20 },
// ];

// const Recruitment = () => {
//   const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Recruitment & Onboarding</h1>
//           <p className="text-muted-foreground mt-1">
//             Manage job postings, candidates, interviews and new hire onboarding
//           </p>
//         </div>
//         <div className="flex space-x-3">
//           <Button variant="outline">
//             <Download className="h-4 w-4 mr-2" />
//             Export Data
//           </Button>
//           <Button>
//             <FileText className="h-4 w-4 mr-2" />
//             Generate Report
//           </Button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card className="shadow-custom-md">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 bg-gradient-primary rounded-2xl">
//                 <Briefcase className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Active Job Postings</p>
//                 <p className="text-2xl font-bold text-foreground">12</p>
//                 <Badge variant="secondary" className="mt-1">+3 this month</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-custom-md">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 bg-gradient-success rounded-2xl">
//                 <Users className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Candidates in Database</p>
//                 <p className="text-2xl font-bold text-foreground">250</p>
//                 <Badge variant="secondary" className="mt-1">+15 added</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-custom-md">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 bg-gradient-warning rounded-2xl">
//                 <Calendar className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Interviews Scheduled</p>
//                 <p className="text-2xl font-bold text-foreground">35</p>
//                 <Badge variant="secondary" className="mt-1">10 pending</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-custom-md">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 bg-gradient-info rounded-2xl">
//                 <ClipboardList className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Onboarding Tasks</p>
//                 <p className="text-2xl font-bold text-foreground">120</p>
//                 <Badge variant="secondary" className="mt-1">80% completed</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="shadow-custom-md">
//           <CardHeader>
//             <CardTitle>Job Posting Trends</CardTitle>
//             <CardDescription>Monthly job openings created</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={jobPostingData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="openings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="shadow-custom-md">
//           <CardHeader>
//             <CardTitle>Candidate Status Distribution</CardTitle>
//             <CardDescription>Pipeline of all candidates</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={candidateStatus}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={90}
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   dataKey="value"
//                 >
//                   {candidateStatus.map((entry, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="shadow-custom-md">
//           <CardHeader>
//             <CardTitle>Interview Scheduling & Status</CardTitle>
//             <CardDescription>Scheduled vs Completed Interviews</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={interviewSchedulingData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="scheduled" stroke="#F59E0B" strokeWidth={2} />
//                 <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="shadow-custom-md">
//           <CardHeader>
//             <CardTitle>Onboarding Checklist</CardTitle>
//             <CardDescription>Tasks completed by department</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={onboardingData} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="department" type="category" />
//                 <Tooltip />
//                 <Bar dataKey="tasks" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Recruitment;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  Download,
  FileText,
  Users,
  Calendar,
  ClipboardList,
  Briefcase
} from 'lucide-react';

// ================= Mock Data =================
const jobPostingData = [
  { month: 'Jan', openings: 5 },
  { month: 'Feb', openings: 8 },
  { month: 'Mar', openings: 4 },
  { month: 'Apr', openings: 10 },
  { month: 'May', openings: 7 },
  { month: 'Jun', openings: 6 },
];

const candidateStatus = [
  { name: 'Interviewed', value: 35 },
  { name: 'Hired', value: 15 },
  { name: 'In Process', value: 25 },
  { name: 'Rejected', value: 25 },
];

const interviewSchedulingData = [
  { month: 'Jan', scheduled: 10, completed: 8 },
  { month: 'Feb', scheduled: 14, completed: 12 },
  { month: 'Mar', scheduled: 12, completed: 9 },
  { month: 'Apr', scheduled: 16, completed: 14 },
  { month: 'May', scheduled: 18, completed: 16 },
  { month: 'Jun', scheduled: 15, completed: 13 },
];

const onboardingData = [
  { department: 'IT', tasks: 45 },
  { department: 'HR', tasks: 25 },
  { department: 'Sales', tasks: 30 },
  { department: 'Finance', tasks: 20 },
];

// New Data for Line Chart
const hiringTrendData = [
  { month: 'Jan', hires: 8, offers: 12 },
  { month: 'Feb', hires: 10, offers: 14 },
  { month: 'Mar', hires: 12, offers: 15 },
  { month: 'Apr', hires: 9, offers: 13 },
  { month: 'May', hires: 14, offers: 18 },
  { month: 'Jun', hires: 11, offers: 16 },
];

const Recruitment = () => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  const navigate = useNavigate();

  const handleExport = ()=>{
    navigate('/exportdata');
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recruitment & Onboarding</h1>
          <p className="text-muted-foreground mt-1">
            Manage job postings, candidates, interviews and new hire onboarding
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline"
          className='hover:bg-violet-700'
          onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Job Postings</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <Badge variant="secondary" className="mt-1">+3 this month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Candidates in Database</p>
                <p className="text-2xl font-bold text-foreground">250</p>
                <Badge variant="secondary" className="mt-1">+15 added</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-warning rounded-2xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Interviews Scheduled</p>
                <p className="text-2xl font-bold text-foreground">35</p>
                <Badge variant="secondary" className="mt-1">10 pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-info rounded-2xl">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Onboarding Tasks</p>
                <p className="text-2xl font-bold text-foreground">120</p>
                <Badge variant="secondary" className="mt-1">80% completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Job Posting Trends</CardTitle>
            <CardDescription>Monthly job openings created</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobPostingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="openings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Candidate Status Distribution</CardTitle>
            <CardDescription>Pipeline of all candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={candidateStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {candidateStatus.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Interview Scheduling & Status</CardTitle>
            <CardDescription>Scheduled vs Completed Interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interviewSchedulingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="scheduled" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Onboarding Checklist</CardTitle>
            <CardDescription>Tasks completed by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={onboardingData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" />
                <Tooltip />
                <Bar dataKey="tasks" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* New Line Chart for Hiring Trend */}
      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle>Hiring Trend Over Time</CardTitle>
          <CardDescription>Offers vs Hires each month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hiringTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="offers" stroke="#3B82F6" strokeWidth={2} name="Offers Made" />
              <Line type="monotone" dataKey="hires" stroke="#10B981" strokeWidth={2} name="Hires" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recruitment;
