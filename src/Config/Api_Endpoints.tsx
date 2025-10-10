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
  PROFILE_API: getApiUrl('employees/getMyProfile')
 
};

export const FrontendRoutes = {
  PROFILE: '/ceo/profile',
};
export default API_BASE_URL;


