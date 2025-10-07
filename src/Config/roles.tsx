// // src/config/roles.ts

// // All roles in your system
// export const roles = [
//   "CEO",
//   "Director",
//   "General Manager",
//   "Branch Manager",
//   "HR Manager",
//   "Ops Manager",
//   "Project Manager",
//   "Product Manager",
//   "Team Lead",
//   "Trainer",
//   "Employee",
//   "Intern",
//   "Trainee",
// ] as const;

// export type Role = (typeof roles)[number];

// // ✅ Role → Dashboard route mapping
// export const roleRoutes: Record<Role, string> = {
//   CEO: "/dashboard",
//   Director: "/overview",
//   "General Manager": "/gm-dashboard",
//   "Branch Manager": "/branch-dashboard",
//   "HR Manager": "/hr-dashboard",
//   "Ops Manager": "/ops-dashboard",
//   "Project Manager": "/project-dashboard",
//   "Product Manager": "/product-dashboard",
//   "Team Lead": "/teamlead-dashboard",
//   Trainer: "/trainer-dashboard",
//   Employee: "/employee-dashboard",
//   Intern: "/intern-dashboard",
//   Trainee: "/trainee-dashboard",
// };
