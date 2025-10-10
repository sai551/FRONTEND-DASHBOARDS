import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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

const Recruitment = () => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
  const navigate = useNavigate();

  // ================= Dummy Data =================
  const [jobPostingData, setJobPostingData] = useState([
    { month: 'Jan', openings: 5 },
    { month: 'Feb', openings: 8 },
    { month: 'Mar', openings: 4 },
    { month: 'Apr', openings: 10 },
    { month: 'May', openings: 7 },
    { month: 'Jun', openings: 6 },
  ]);

  const [candidateStatus, setCandidateStatus] = useState([
    { name: 'Interviewed', value: 35 },
    { name: 'Hired', value: 15 },
    { name: 'In Process', value: 25 },
    { name: 'Rejected', value: 25 },
  ]);

  const [interviewSchedulingData, setInterviewSchedulingData] = useState([
    { month: 'Jan', scheduled: 10, completed: 8 },
    { month: 'Feb', scheduled: 14, completed: 12 },
    { month: 'Mar', scheduled: 12, completed: 9 },
    { month: 'Apr', scheduled: 16, completed: 14 },
    { month: 'May', scheduled: 18, completed: 16 },
    { month: 'Jun', scheduled: 15, completed: 13 },
  ]);

  const [onboardingData, setOnboardingData] = useState([
    { department: 'IT', tasks: 45 },
    { department: 'HR', tasks: 25 },
    { department: 'Sales', tasks: 30 },
    { department: 'Finance', tasks: 20 },
  ]);

  const [hiringTrendData, setHiringTrendData] = useState([
    { month: 'Jan', hires: 8, offers: 12 },
    { month: 'Feb', hires: 10, offers: 14 },
    { month: 'Mar', hires: 12, offers: 15 },
    { month: 'Apr', hires: 9, offers: 13 },
    { month: 'May', hires: 14, offers: 18 },
    { month: 'Jun', hires: 11, offers: 16 },
  ]);

  // ================= API Setup =================
  // const API_BASE = 'http://localhost:3000/api/recruitment';

  // const fetchRecruitmentData = async () => {
  //   try {
  //     const res = await axios.get(`${API_BASE}/all`);
  //     const { jobPostings, candidates, interviews, onboarding, hiringTrends } = res.data;
  //     setJobPostingData(jobPostings);
  //     setCandidateStatus(candidates);
  //     setInterviewSchedulingData(interviews);
  //     setOnboardingData(onboarding);
  //     setHiringTrendData(hiringTrends);
  //   } catch (err) {
  //     console.warn('Backend not reachable, using dummy data.');
  //   }
  // };

  // CRUD Examples (enable once backend is ready)
  // const createJobPosting = async (newPosting) => {
  //   const res = await axios.post(`${API_BASE}/job-postings`, newPosting);
  //   setJobPostingData((prev) => [...prev, res.data]);
  // };

  // const updateJobPosting = async (id, updatedPosting) => {
  //   const res = await axios.put(`${API_BASE}/job-postings/${id}`, updatedPosting);
  //   setJobPostingData((prev) =>
  //     prev.map((item) => (item.id === id ? res.data : item))
  //   );
  // };

  // const deleteJobPosting = async (id) => {
  //   await axios.delete(`${API_BASE}/job-postings/${id}`);
  //   setJobPostingData((prev) => prev.filter((item) => item.id !== id));
  // };

  // useEffect(() => {
  //   fetchRecruitmentData();
  // }, []);

  const handleExport = () => {
    navigate('/exportdata');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recruitment & Onboarding</h1>
          <p className="text-muted-foreground mt-1">
            Manage job postings, candidates, interviews and new hire onboarding
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="hover:bg-orange-600/20 hover:text-black"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className='bg-orange-600/20 text-black'>
            <FileText className="h-4 w-4 mr-2 " />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards (Smaller & Consistent Height) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Active Job Postings',
            value: jobPostingData.length,
            icon: <Briefcase className="h-5 w-5 text-white" />,
            badge: '+3 this month',
            bg: 'bg-gradient-primary',
          },
          {
            title: 'Candidates in Database',
            value: candidateStatus.reduce((sum, c) => sum + c.value, 0),
            icon: <Users className="h-5 w-5 text-white" />,
            badge: '+15 added',
            bg: 'bg-gradient-success',
          },
          {
            title: 'Interviews Scheduled',
            value: interviewSchedulingData.reduce((sum, i) => sum + i.scheduled, 0),
            icon: <Calendar className="h-5 w-5 text-white" />,
            badge: '10 pending',
            bg: 'bg-gradient-warning',
          },
          {
            title: 'Onboarding Tasks',
            value: onboardingData.reduce((sum, o) => sum + o.tasks, 0),
            icon: <ClipboardList className="h-5 w-5 text-white" />,
            badge: '80% completed',
            bg: 'bg-gradient-info',
          },
        ].map((card, index) => (
          <Card
            key={index}
            className="shadow-sm rounded-xl transition-all hover:shadow-md"
          >
            <CardContent className="p-4 h-32 flex items-center">
              <div className="flex items-center space-x-3 w-full">
                <div className={`p-2.5 ${card.bg} rounded-xl flex items-center justify-center`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-lg font-bold text-foreground">{card.value}</p>
                  <Badge variant="secondary" className="mt-1 text-[11px] px-2 py-0.5">
                    {card.badge}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Job Posting Trends</CardTitle>
            <CardDescription>Monthly job openings created</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
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

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Candidate Status Distribution</CardTitle>
            <CardDescription>Pipeline of all candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={candidateStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
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
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Interview Scheduling & Status</CardTitle>
            <CardDescription>Scheduled vs Completed Interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
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

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Onboarding Checklist</CardTitle>
            <CardDescription>Tasks completed by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
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

      {/* Hiring Trend */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Hiring Trend Over Time</CardTitle>
          <CardDescription>Offers vs Hires each month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={hiringTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="offers"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Offers Made"
              />
              <Line
                type="monotone"
                dataKey="hires"
                stroke="#10B981"
                strokeWidth={2}
                name="Hires"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recruitment;
