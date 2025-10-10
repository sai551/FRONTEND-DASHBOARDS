// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD 
    ? 'http://localhost:3000' 
    : 'http://localhost:3000'); // Always use backend URL

// Helper function to get full API URL
export const getApiUrl = (path) => {
  if (path.startsWith('http')) return path; // Already full URL
  return `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
};

export const Api_EndPoints = {
  LOGIN: getApiUrl('/auth/login'),
  PROFILE_API: getApiUrl('employees/getMyProfile'),
  CREATEEMPLOYEE_API: getApiUrl('/employees/createEmp'),
  UPDATEEMPLOYEE_API: getApiUrl('/employees'),
  DELETEEMPLOYEE_API: getApiUrl('/employees'),
  EMPLOYEES_API: getApiUrl('/employees/getAll'),
  EMPLOYEMENTTYPES_API: getApiUrl('/enums/employment_type'),
  DEPARTMENTS_API: getApiUrl('/department/get_dept'),
  DESIGNATION_API: getApiUrl('/designation/getDesg'),
  ROLES_API: getApiUrl('/roles/get_Roles'),
  BRANCHES_API: getApiUrl('/branches/getAllBranches'),
  WORKSHIFT_API: getApiUrl('/enums/work_shift'),
  MARRIAGESTATUS_API: getApiUrl('/enums/marriageStatus'),
  BLOODGROUP_API: getApiUrl('/enums/blood_group'),
  GENDER_API: getApiUrl('/enums/gender')
 
};

export const FrontendRoutes = {
  PROFILE: '/ceo/profile',
};
export default API_BASE_URL;


