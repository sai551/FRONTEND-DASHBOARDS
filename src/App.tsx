import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/login";
import Register from "./pages/ceo/register";
import ForgotPassword from "./pages/Login/forgotPassword";
import NotFound from "./pages/Login/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import { Roles } from "./pages/Login/login";

// CEO Dashboard
import { DashboardLayout } from "./components/ceoDashboard/dashboard/DashboardLayout";
import { DashboardMain } from "./components/ceoDashboard/dashboard/DashboardMain";
import Departments from "./pages/ceo/departments";
import Performance from "./pages/ceo/Performance";
import FinancialOverview from "./pages/ceo/financialOverview";

// Branch Manager Dashboard
import { Layout } from "./components/BmDashboard/Layout";
import Dashboard from "./pages/BmPages/Dashboard";
import TeamManagement from "./pages/BmPages/TeamManagement";
import SalesReports from "./pages/BmPages/SalesReports";
import TasksTargets from "./pages/BmPages/TasksTargets";
import CustomerFeedback from "./pages/BmPages/CustomerFeedback";
import BranchFinancials from "./pages/BmPages/BranchFinancials";
import Settings from "./pages/BmPages/Settings";

// Director Dashboard
import DashboardLayoutDirector from "./components/Director/layout/DashboardLayout";
import Overview from "./pages/DirectorPages/Overview";
import DirectorDepartments from "./pages/DirectorPages/Departments";
import Employees from "./pages/DirectorPages/Employees";
import Projects from "./pages/DirectorPages/Projects";
import FinancialReports from "./pages/DirectorPages/FinancialReports";
import HRPayroll from "./pages/DirectorPages/HRPayroll";
import AttendanceLeave from "./pages/DirectorPages/AttendanceLeave";
import AssetManagement from "./pages/DirectorPages/AssetManagement";
import NoticesPolicies from "./pages/DirectorPages/NoticesPolicies";
import DirectorSettings from "./pages/DirectorPages/Settings";

// Product Manager Dashboard
import Products from "./pages/Product/Products";
import Features from "./pages/Product/Features";
import Roadmap from "./pages/Product/Roadmap";
import Bugs from "./pages/Product/Bugs";
import ProductTeam from "./pages/Product/Team";
import Documents from "./pages/Product/Documents";
import Schedule from "./pages/Product/Schedule";
import ProfilePage from "./pages/Product/profile";
import SettingsPage from "./pages/Product/settings";
import { DashboardLayoutProduct } from "./components/product/components/Dashboard/Layout";

// Employee dashboard
import Payroll from "./pages/Employee/Payroll";
import Attendance from "./pages/Employee/Attendance";
import Leave from "./pages/Employee/Leave";
import EmpDocuments from "./pages/Employee/Documents";
import Tasks from "./pages/Employee/Tasks";
import EmployeePerformance from "./pages/Employee/Performance";
import EmpProjects from "./pages/Employee/Projects";
import ExportData from "./pages/Employee/ExportData";
import Profile from "./pages/Employee/Profile";
import Reports from "./pages/Employee/Reports";
import Feedback from "./pages/Employee/Feedback";
import EmpSettings from "./pages/Employee/Settings";
import { EmployeeDashboardLayout } from "./components/EmployeeDashboard/Layout/Layout";
import EmployeeDashboard from "./components/EmployeeDashboard/Layout/Dashboard";

//Intern Dashboard
import InternDashboard from "./components/InternDashboard/Layout/Dashboard";
import { InternDashboardLayout } from "./components/InternDashboard/Layout/Layout";
import InternTraining from "./pages/Intern/InternTraining";
import InternDepartments from "./pages/Intern/Departments";
import InternProjectStatus from "./pages/Intern/ProjectStatus";
import InternPayroll from "./pages/Intern/Payroll";
import InternLeave from "./pages/Intern/Leave";
import InternExportData from "./pages/Intern/ExportData";
import InternProfile from "./pages/Intern/Profile";
import InternReports from "./pages/Intern/Reports";
import InternFeedback from "./pages/Intern/Feedback";
import InternSettings from "./pages/Intern/Settings";
import InternMessages from "./pages/Intern/Messages";
import InternAttendance from "./pages/Intern/Attendance";
import InternTasks from "./pages/Intern/Tasks";

// Teamlead Dashboard
import { TeamleadDashboardLayout } from "./components/TeamleadDashboard/layout";

import TeamTasks from "./pages/Teamlead/Tasks";
import TeamProjects from "./pages/Teamlead/Projects";
import TeamLeaveRequests from "./pages/Teamlead/LeaveRequests";
import TeamReports from "./pages/Teamlead/Reports";
import TeamSettings from "./pages/Teamlead/Settings";
import Teamleads from "./pages/Teamlead/Teamlead";
// import Teamleads from "./pages/Teamlead/Teamlead";
import TeamLeadDashboard from "./pages/Teamlead/Dashboard";

// General Manager Dashboard
import { GmDashboardLayout } from "./components/GmDashboard/Layout";
import GmDashboard from "./pages/Gm/Dashboard";
import GmEmployees from "./pages/Gm/Employees";
import GmDepartments from "./pages/Gm/Departments";
import GmProjects from "./pages/Gm/Projects";
import GmTasks from "./pages/Gm/Tasks";
import GmAttendanceLeave from "./pages/Gm/AttendanceLeave";
import GmAssets from "./pages/Gm/Assets";
import GmReports from "./pages/Gm/Reports";
import GmAnnouncements from "./pages/Gm/Announcements";
import GmSettings from "./pages/Gm/Settings";
import OmAssets from "./pages/OperationalManager/Assets";

// Operations Manager Dashboard
import OmDashboard from "./pages/OperationalManager/Dashboard";
import OmAssetRequests from "./pages/OperationalManager/AssetRequests";
import OmExpenses from "./pages/OperationalManager/Expenses";
import OmProjectResources from "./pages/OperationalManager/ProjectResources";
import OmVendors from "./pages/OperationalManager/Vendors";
import OmMaintenanceLogs from "./pages/OperationalManager/MaintenanceLogs";
import OmApprovals from "./pages/OperationalManager/Approvals";
import OmTaskOperations from "./pages/OperationalManager/TaskOperations";
import OmEmployeeMovements from "./pages/OperationalManager/EmployeeMovements";
import OmFacilityBooking from "./pages/OperationalManager/FacilityBooking";
import OmTransportSchedules from "./pages/OperationalManager/TransportSchedules";
import OtpVerification from "./pages/Login/otpPage";
import ResetPassword from "./pages/Login/resetPassword";
import EditProfile from "./pages/ceo/EditProfile";
import MyProfilePage from "./pages/ceo/MyProfilePage";
import Employee from "./pages/ceo/Employee";
// Trainee Dashboard
import TraineeDashboard from "./components/Trainne/Layout/Dashboard";
import TraineeAssignments from "./pages/Trainne/Assignments";
import Evaluation from "./pages/Trainne/Evaluation";
import TraineeDocuments from "./pages/Trainne/Documents";
import ProjectStatus from "./pages/Trainne/ProjectStatus";
import TraineeAttendance from "./pages/Trainne/Attendance";
import TraineeMessages from "./pages/Trainne/Messages";
import { TraineeDashboardLayout } from "./components/Trainne/Layout/Layout";
import TraineeProfile from "./pages/Trainne/Profile";
import TraineeSettings from "./pages/Trainne/Settings";

// Trainer routes
import { TrainerLayout } from "./components/Trainer/Layout/Layout";
import TrainerDashboard from "./components/Trainer/Layout/Dashboard";
import TrainingSessions from "./pages/Trainer/Sessions";
import TraineeManagement from "./pages/Trainer/Trainees";
import AttendanceTracking from "./pages/Trainer/Attendance";
import FeedbackEvaluation from "./pages/Trainer/Feedback";
import CourseManagement from "./pages/Trainer/Courses";
import CalendarScheduling from "./pages/Trainer/Calendar";
import ReportsInsights from "./pages/Trainer/Reports";
import Communications from "./pages/Trainer/Communications";
import TrainerProfile from "./pages/Trainer/Profile";
import TrainerSettings from "./pages/Trainer/Settings";


// Project Manager routes
import {ProjectManagerLayout} from "./components/ProjectManager/Layout/Layout";
import ProjectManagerDashboard from "./components/ProjectManager/Layout/Dashboard";
import ProjectsM from "./pages/ProjectManager/Projects";
import NewProject from "./pages/ProjectManager/NewProject";
import ProjeectTasks from "./pages/ProjectManager/Tasks";
import ProjectPerformance from "./pages/ProjectManager/Performance";
import BudgetFinance from "./pages/ProjectManager/BudgetFinance";
import ProjectReports from "./pages/ProjectManager/Reports";
import EventsMeetings from "./pages/ProjectManager/EventsMeeting";
import Risk from "./pages/ProjectManager/Risk";
import ProjectProfile from "./pages/ProjectManager/Profile";
import ProjectSettings from "./pages/ProjectManager/Settings";

// HR Manager Dashboard
import { HRDashboardLayout } from "./components/HRDashboard/Layout/Layout";
import HRDashboard from "./components/HRDashboard/Layout/Dashboard";
import CompanyPerformance from "./pages/HRPages/CompanyPerformance";
import DocumentVerification from "./pages/HRPages/DocumentVerification";
import EmployeeTransitions from "./pages/HRPages/EmployeeTransitions";
import OperationsAssetRequests from "./pages/HRPages/OperationsAssetRequests";
import EmployeeAssetRequests from "./pages/HRPages/EmployeeAssetRequests";
import AddEmployee from "./pages/HRPages/AddEmployee";
import JobOpeningsPage from "./pages/HRPages/JobOpening";
import Applicant from "./pages/HRPages/Applicant";
import AddApplicant from "./pages/HRPages/AddApplicant";
import Interview from "./pages/HRPages/Interview";
import Employeess from "./pages/HRPages/Employees";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>


                    {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />



                           {/* CEO Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.CEO]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardMain />} />
              <Route path="/department" element={<Departments />} />
              <Route path="/performances" element={<Performance />} />
              <Route path="/employee" element={<Employee />} />

              <Route path="/ceo/profile" element={<MyProfilePage />} />
              <Route path="/ceo/editprofile" element={<EditProfile employeeId={""} />} />
              <Route path="/performances" element={<Performance />} />
              <Route
                path="/financial-overview"
                element={<FinancialOverview />}
              />
            </Route>


             


            {/* Branch Manager Routes */} 
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.BranchManager]}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboardBR" element={<Dashboard />} />
              <Route path="/team" element={<TeamManagement />} />
              <Route path="/sales" element={<SalesReports />} />
              <Route path="/tasks" element={<TasksTargets />} />
              <Route path="/feedback" element={<CustomerFeedback />} />
              <Route path="/financials" element={<BranchFinancials />} />
              <Route path="/settings" element={<Settings />} />
            </Route>


                       {/* Director Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.Director]}>
                  <DashboardLayoutDirector />
                </ProtectedRoute>
              }
            >
              <Route path="/overview" element={<Overview />} />
              <Route path="/departments" element={<DirectorDepartments />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/financial-reports" element={<FinancialReports />} />
              <Route path="/hr-payroll" element={<HRPayroll />} />
              <Route path="/attendance-leave" element={<AttendanceLeave />} />
              <Route path="/asset-management" element={<AssetManagement />} />
              <Route path="/notices-policies" element={<NoticesPolicies />} />
              <Route path="/director-settings" element={<DirectorSettings />} />
            </Route>



           
            {/* HRManager Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.HRManager]}>
                  <HRDashboardLayout />
                </ProtectedRoute>
              }
            >
                <Route path="/HRdashboard" element={<HRDashboard />} />
                <Route path="/companyperformance" element={<CompanyPerformance />} />
            
            <Route path="/recruitment/document-verification" element={<DocumentVerification />} />
            <Route path="/emp-performance" element={<EmployeePerformance />} />
            <Route path="/employees/transitions" element={<EmployeeTransitions />} />
            <Route path="/employees/operation/asset-request" element={<OperationsAssetRequests />} />
            <Route path="/employees/asset-requests" element={<EmployeeAssetRequests />} />
            <Route path="/employeess" element={<Employeess />} />
            <Route path="/employees/add" element={<AddEmployee />} />

            {/* <Route path="/projectstatus" element={<ProjectStatus />} /> */}
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/recruitment/jobs" element={<JobOpeningsPage />} />
            <Route path="/recruitment/applicants" element={<Applicant />} />
            <Route path="/recruitment/addapplicant" element={<AddApplicant />} />
            <Route path="/recruitment/interview" element={<Interview />} />

            <Route path="/tasks" element={<Tasks />} />

            <Route path="/exportdata" element={<ExportData />} />
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/emp/editprofile" element={<EditProfile employeeId={""} />} />
            
            <Route path="/reports" element={<Reports />} />

            <Route path="/assetmanagement" element={<AssetManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />

            </Route>



            {/* Product routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.ProductManager]}>
                  <DashboardLayoutProduct />
                </ProtectedRoute>
              }
            >
              <Route path="/products" element={<Products />} />
              <Route path="/features" element={<Features />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/bugs" element={<Bugs />} />
              <Route path="/Team" element={<ProductTeam />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/profilePage" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>


                       {/* employee routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.Employee]}>
                  <EmployeeDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/emp/dashboard" element={<EmployeeDashboard />} />
              <Route path="/emp/payroll" element={<Payroll />} />
              <Route path="/emp/attendance" element={<Attendance />} />
              <Route path="/emp/leave" element={<Leave />} />
              <Route path="/emp/documents" element={<EmpDocuments />} />
              <Route path="/emp/tasks" element={<Tasks />} />
              <Route
                path="/emp/performance"
                element={<EmployeePerformance />}
              />
              <Route path="/emp/projects" element={<EmpProjects />} />
              {/* <Route path="/emp/messages" element={<Messages />} /> */}
              <Route path="/emp/exportdata" element={<ExportData />} />
              {/* <Route path="/emp/team" element={<TeamChat />} /> */}
              <Route path="/emp/profile" element={<Profile />} />
              <Route path="/emp/reports" element={<Reports />} />
              <Route path="/emp/feedback" element={<Feedback />} />
              <Route path="/emp/settings" element={<EmpSettings />} />
            </Route>

                   {/* InternDashboard routes with layout */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.Intern]}>
                  <InternDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/interndashboard" element={<InternDashboard />} />
              <Route path="/intern/training" element={<InternTraining />} />

              <Route
                path="/intern/departments"
                element={<InternDepartments />}
              />
              <Route
                path="/intern/projectstatus"
                element={<InternProjectStatus />}
              />
              <Route path="/intern/payroll" element={<InternPayroll />} />
              <Route path="/intern/attendance" element={<InternAttendance />} />
              <Route path="/intern/leave" element={<InternLeave />} />
              <Route path="/intern/tasks" element={<InternTasks />} />
              <Route path="/exportdata" element={<InternExportData />} />
              <Route path="/intern/profile" element={<InternProfile />} />
              <Route path="/intern/reports" element={<InternReports />} />
              <Route path="/intern/feedback" element={<InternFeedback />} />
              <Route path="/intern/settings" element={<InternSettings />} />
              <Route path="/intern/messages" element={<InternMessages />} />
            </Route>
            {/* TeamLead routes with layout */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.TeamLead]}>
                  <TeamleadDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/teamleaddashboard"
                element={<TeamLeadDashboard />}
              />
              <Route path="/teamlead/team" element={<Teamleads />} />
              <Route path="/teamlead/tasks" element={<TeamTasks />} />
              <Route path="/teamlead/projects" element={<TeamProjects />} />
              <Route
                path="/teamlead/leave-requests"
                element={<TeamLeaveRequests />}
              />
              <Route path="/teamlead/reports" element={<TeamReports />} />
              <Route path="/teamlead/settings" element={<TeamSettings />} />
            </Route>


                        {/* General Manager Dashboard */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.GeneralManager]}>
                  <GmDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/gm/dashboard" element={<GmDashboard />} />
              <Route path="/gm/employees" element={<GmEmployees />} />
              <Route path="/gm/departments" element={<GmDepartments />} />
              <Route path="/gm/projects" element={<GmProjects />} />
              <Route path="/gm/tasks" element={<GmTasks />} />
              <Route path="/gm/attendance-leave" element={<GmAttendanceLeave />} />
              <Route path="/gm/reports" element={<GmReports />} />
              <Route path="/gm/assets" element={<GmAssets />} />
              <Route path="/gm/announcements" element={<GmAnnouncements />} />
              <Route path="/gm/settings" element={<GmSettings />} />
            </Route>
              
              
                  {/* Operations Manager Dashboard */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.OperationsManager]}>
                  <OmDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="/operations/dashboard" element={<OmDashboard />} />
              <Route path="/operations/assets" element={<OmAssets />} />
              <Route path="/operations/asset-requests" element={<OmAssetRequests />} />
              <Route path="/operations/expenses" element={<OmExpenses />} />
              <Route
                path="/operations/project-resources"
                element={<OmProjectResources />}
              />
              <Route path="/operations/vendors" element={<OmVendors />} />
              <Route path="/operations/maintenance-logs" element={<OmMaintenanceLogs />} />
              <Route path="/operations/approvals" element={<OmApprovals />} />
              <Route path="/operations/task-operations" element={<OmTaskOperations />} />
              <Route
                path="/operations/employee-movements"
                element={<OmEmployeeMovements />}
              />
              <Route path="/operations/facility-booking" element={<OmFacilityBooking />} />
              <Route
                path="/operations/transport-schedules"
                element={<OmTransportSchedules />}
              />
            </Route>



                          {/* Trainee Dashboard */}   
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.Trainee]}>
                  <TraineeDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/traineedashboard" element={<TraineeDashboard />} />
              <Route
                path="/trainee/assignments"
                element={<TraineeAssignments />}
              />
              <Route path="/trainee/evaluation" element={<Evaluation />} />
              <Route path="/trainee/documents" element={<TraineeDocuments />} />
              <Route
                path="/trainee/projectstatus"
                element={<ProjectStatus />}
              />
              <Route
                path="/trainee/attendance"
                element={<TraineeAttendance />}
              />
              <Route path="/trainee/leave" element={<Leave />} />
              <Route path="/trainee/exportdata" element={<ExportData />} />
              <Route path="/trainee/profile" element={<TraineeProfile />} />
              <Route path="/trainee/reports" element={<Reports />} />
              <Route path="/trainee/messages" element={<TraineeMessages />} />
              <Route path="/trainee/settings" element={<TraineeSettings />} />
            </Route>



                                {/* Trainer routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.Trainer]}>
                  <TrainerLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
              <Route path="/trainer/sessions" element={<TrainingSessions />} />
              <Route path="/trainer/trainees" element={<TraineeManagement />} />
              <Route
                path="/trainer/attendance"
                element={<AttendanceTracking />}
              />
              <Route
                path="/trainer/feedback"
                element={<FeedbackEvaluation />}
              />
              <Route path="/trainer/courses" element={<CourseManagement />} />
              <Route
                path="/trainer/calendar"
                element={<CalendarScheduling />}
              />
              <Route path="/trainer/reports" element={<ReportsInsights />} />
              <Route
                path="/trainer/communications"
                element={<Communications />}
              />
              <Route path="/trainer/profile" element={<TrainerProfile />} />
              <Route path="/trainer/settings" element={<TrainerSettings />} />
            </Route>

              {/* Project Manager Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[Roles.ProjectManager]}>
                  <ProjectManagerLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/projectmanager/dashboard" element={<ProjectManagerDashboard />} />
              <Route path="/projectmanager/projects" element={<ProjectsM />} />
              <Route path="/projectmanager/projects/new" element={<NewProject />} />
              <Route path="/projectmanager/tasks-tracking" element={<ProjeectTasks />} />
              <Route path="/projectmanager/performance" element={<ProjectPerformance />} />
              <Route path="/projectmanager/budget" element={<BudgetFinance />} />
              <Route path="/projectmanager/reports" element={<ProjectReports />} />
              <Route path="/projectmanager/events" element={<EventsMeetings />} />
              <Route path="/projectmanager/risk" element={<Risk />} />
              <Route path="/projectmanager/profile" element={<ProjectProfile />} />
              <Route path="/projectmanager/settings" element={<ProjectSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
