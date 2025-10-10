// Mock data for Office Management System

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  phone: string;
  avatar?: string;
  salary: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  createdDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'Annual' | 'Sick' | 'Personal' | 'Emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
  description: string;
}

// Mock Employees Data
export const employees: Employee[] = [
  {
    id: '1',
    name: 'Sunil B',
    email: 'Sunil B.smith@company.com',
    role: 'Software Engineer',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-01-15',
    phone: '+1-555-0101',
    salary: 85000
  },
  {
    id: '2',
    name: 'Hari K',
    email: 'sarah.Sunil Bson@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
    joinDate: '2022-08-20',
    phone: '+1-555-0102',
    salary: 95000
  },
  {
    id: '3',
    name: 'Vijay B',
    email: 'michael.chen@company.com',
    role: 'Designer',
    department: 'Design',
    status: 'Active',
    joinDate: '2023-03-10',
    phone: '+1-555-0103',
    salary: 75000
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2021-11-05',
    phone: '+1-555-0104',
    salary: 88000
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    role: 'DevOps Engineer',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2022-12-01',
    phone: '+1-555-0105',
    salary: 92000
  }
];

// Mock Tasks Data
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Implement User Authentication',
    description: 'Build login and registration system with JWT tokens',
    assigneeId: '1',
    assigneeName: 'Sunil B',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-02-15',
    createdDate: '2024-01-20'
  },
  {
    id: '2',
    title: 'Design Dashboard UI',
    description: 'Create mockups and prototypes for admin dashboard',
    assigneeId: '3',
    assigneeName: 'Vijay B',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2024-02-10',
    createdDate: '2024-01-18'
  },
  {
    id: '3',
    title: 'Database Migration',
    description: 'Migrate user data to new database schema',
    assigneeId: '5',
    assigneeName: 'David Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: '2024-02-20',
    createdDate: '2024-01-22'
  },
  {
    id: '4',
    title: 'Product Requirements Review',
    description: 'Review and update product requirements documentation',
    assigneeId: '2',
    assigneeName: 'Hari K',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2024-02-12',
    createdDate: '2024-01-19'
  }
];

// Mock Attendance Data
export const attendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Sunil B',
    date: '2024-01-24',
    checkIn: '09:00',
    checkOut: '18:00',
    totalHours: 9,
    status: 'Present'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Hari K',
    date: '2024-01-24',
    checkIn: '08:45',
    checkOut: '17:30',
    totalHours: 8.75,
    status: 'Present'
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Vijay B',
    date: '2024-01-24',
    checkIn: '09:15',
    checkOut: '18:15',
    totalHours: 9,
    status: 'Late'
  },
  {
    id: '4',
    employeeId: '4',
    employeeName: 'Emily Davis',
    date: '2024-01-24',
    checkIn: '08:30',
    checkOut: '17:00',
    totalHours: 8.5,
    status: 'Present'
  }
];

// Mock Leave Requests Data
export const leaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Sunil B',
    leaveType: 'Annual',
    startDate: '2024-02-05',
    endDate: '2024-02-09',
    reason: 'Family vacation',
    status: 'Pending',
    appliedDate: '2024-01-20'
  },
  {
    id: '2',
    employeeId: '3',
    employeeName: 'Vijay B',
    leaveType: 'Sick',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    reason: 'Medical appointment',
    status: 'Approved',
    appliedDate: '2024-01-22'
  },
  {
    id: '3',
    employeeId: '2',
    employeeName: 'Hari K',
    leaveType: 'Personal',
    startDate: '2024-02-15',
    endDate: '2024-02-16',
    reason: 'Personal matters',
    status: 'Pending',
    appliedDate: '2024-01-23'
  }
];

// Mock Departments Data
export const departments: Department[] = [
  {
    id: '1',
    name: 'Marketing',
    manager: 'Sunil B',
    employeeCount: 12,
    description: 'Software development and technical operations'
  },
  {
    id: '2',
    name: 'Product',
    manager: 'Hari K',
    employeeCount: 6,
    description: 'Product management and strategy'
  },
  {
    id: '3',
    name: 'Design',
    manager: 'Vijay B',
    employeeCount: 4,
    description: 'UI/UX design and creative services'
  },
  {
    id: '4',
    name: 'Human Resources',
    manager: 'Emily Davis',
    employeeCount: 3,
    description: 'Human resources and people operations'
  },
  {
    id: '5',
    name: 'IT',
    manager: 'Alex Turner',
    employeeCount: 5,
    description: 'IT and communications'
  }
];

// Analytics Data for Charts
export const attendanceAnalytics = [
  { month: 'Jan', present: 85, absent: 10, late: 5 },
  { month: 'Feb', present: 88, absent: 8, late: 4 },
  { month: 'Mar', present: 92, absent: 5, late: 3 },
  { month: 'Apr', present: 90, absent: 6, late: 4 },
  { month: 'May', present: 87, absent: 9, late: 4 },
  { month: 'Jun', present: 91, absent: 6, late: 3 }
];

export const taskAnalytics = [
  { month: 'Jan', completed: 45, inProgress: 12, toDo: 8 },
  { month: 'Feb', completed: 52, inProgress: 15, toDo: 6 },
  { month: 'Mar', completed: 48, inProgress: 18, toDo: 9 },
  { month: 'Apr', completed: 55, inProgress: 14, toDo: 7 },
  { month: 'May', completed: 60, inProgress: 16, toDo: 5 },
  { month: 'Jun', completed: 58, inProgress: 20, toDo: 8 }
];

export const leaveAnalytics = [
  { type: 'Annual', count: 35, color: '#3B82F6' },
  { type: 'Sick', count: 15, color: '#EF4444' },
  { type: 'Personal', count: 8, color: '#F59E0B' },
  { type: 'Emergency', count: 3, color: '#8B5CF6' }
];

export const departmentPerformance = [
  { department: 'Marketing', efficiency: 92, satisfaction: 88 },
  { department: 'Product', efficiency: 89, satisfaction: 91 },
  { department: 'Design', efficiency: 95, satisfaction: 93 },
  { department: 'HR', efficiency: 87, satisfaction: 89 },
  { department: 'IT', efficiency: 90, satisfaction: 87 }
];