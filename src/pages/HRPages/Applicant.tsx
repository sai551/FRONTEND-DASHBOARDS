


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Users,
//   UserCheck,
//   UserX,
//   CalendarClock,
//   Briefcase,
// } from "lucide-react";
// import axios from "axios";

// interface StatsCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
//   gradient: string;
// }

// function StatsCard({ title, value, icon: Icon, gradient }: StatsCardProps) {
//   return (
//     <Card className="rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
//       <div className="p-4 flex items-center justify-between">
//         <div>
//           <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div
//           className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${gradient}`}
//         >
//           <Icon className="w-6 h-6" />
//         </div>
//       </div>
//     </Card>
//   );
// }

// interface ApplicantType {
//   id: number;
//   name: string;
//   role: string;
//   department: string;
//   status: string;
// }

// const Applicant = () => {
//   const navigate = useNavigate();



//   const [applicants, setApplicants] = useState<ApplicantType[]>([
//       { id: 1, name: "Sunil B", role: "Frontend Developer", department: "IT", status: "Shortlisted" },
//       { id: 2, name: "Kotha Sandeep K", role: "Backend Developer", department: "IT", status: "Interview Scheduled" },
//       { id: 3, name: "V Sai", role: "HR Executive", department: "HR", status: "Rejected" },
//       { id: 4, name: "B Vijay", role: "Product Manager", department: "Product", status: "Hired" },
//       { id: 5, name: "Hari Krishna", role: "UI/UX Designer", department: "Design", status: "Applied" },
//     ]);


//   const [search, setSearch] = useState("");
//   const [filterDept, setFilterDept] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");

//   // ✅ Fetch Applicants (GET)
//   useEffect(() => {
//     fetchApplicants();
//   }, []);

//   const fetchApplicants = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/applicants");
//       setApplicants(res.data);
//     } catch (err) {
//       console.error("Error fetching applicants:", err);
//     }
//   };

//   // ✅ Add Applicant (POST)
//   const addApplicant = async (newApplicant: Omit<ApplicantType, "id">) => {
//     try {
//       const res = await axios.post("http://localhost:3000/applicants", newApplicant);
//       setApplicants([...applicants, res.data]);
//     } catch (err) {
//       console.error("Error adding applicant:", err);
//     }
//   };

//   // ✅ Update Applicant (PUT)
//   const updateApplicant = async (id: number, updatedData: Partial<ApplicantType>) => {
//     try {
//       const res = await axios.put(`http://localhost:3000/applicants/${id}`, updatedData);
//       setApplicants(applicants.map((app) => (app.id === id ? res.data : app)));
//     } catch (err) {
//       console.error("Error updating applicant:", err);
//     }
//   };

//   // ✅ Delete Applicant (DELETE)
//   const deleteApplicant = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:3000/applicants/${id}`);
//       setApplicants(applicants.filter((app) => app.id !== id));
//     } catch (err) {
//       console.error("Error deleting applicant:", err);
//     }
//   };

//   const filteredApplicants = applicants.filter(
//     (app) =>
//       app.name.toLowerCase().includes(search.toLowerCase()) &&
//       (filterDept === "all" || app.department === filterDept) &&
//       (filterStatus === "all" || app.status === filterStatus)
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Applicants</h1>
//           <p className="text-muted-foreground">Manage all job applicants here.</p>
//         </div>
//         <Button
//           className="rounded-2xl"
//           onClick={() => navigate("/recruitment/addapplicant")}
//         >
//           + Add Applicant
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <StatsCard title="Total Applicants" value={applicants.length} icon={Users} gradient="bg-gradient-to-r from-indigo-500 to-blue-500" />
//         <StatsCard title="Shortlisted" value={applicants.filter((a) => a.status === "Shortlisted").length} icon={UserCheck} gradient="bg-gradient-to-r from-green-500 to-emerald-500" />
//         <StatsCard title="Interview Scheduled" value={applicants.filter((a) => a.status === "Interview Scheduled").length} icon={CalendarClock} gradient="bg-gradient-to-r from-yellow-500 to-orange-500" />
//         <StatsCard title="Hired" value={applicants.filter((a) => a.status === "Hired").length} icon={Briefcase} gradient="bg-gradient-to-r from-purple-500 to-pink-500" />
//         <StatsCard title="Rejected" value={applicants.filter((a) => a.status === "Rejected").length} icon={UserX} gradient="bg-gradient-to-r from-red-500 to-pink-500" />
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row md:items-center gap-4">
//         <Input
//           placeholder="Search applicants..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-xs"
//         />

//         <Select onValueChange={(val) => setFilterDept(val)} defaultValue="all">
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Filter by Department" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Departments</SelectItem>
//             <SelectItem value="IT">IT</SelectItem>
//             <SelectItem value="HR">HR</SelectItem>
//             <SelectItem value="Product">Product</SelectItem>
//             <SelectItem value="Design">Design</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select onValueChange={(val) => setFilterStatus(val)} defaultValue="all">
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Filter by Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="Applied">Applied</SelectItem>
//             <SelectItem value="Shortlisted">Shortlisted</SelectItem>
//             <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
//             <SelectItem value="Hired">Hired</SelectItem>
//             <SelectItem value="Rejected">Rejected</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Applicants Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <thead className="bg-gray-100 text-gray-700 text-sm">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Department</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredApplicants.length > 0 ? (
//               filteredApplicants.map((app) => (
//                 <tr key={app.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{app.name}</td>
//                   <td className="px-4 py-2">{app.role}</td>
//                   <td className="px-4 py-2">{app.department}</td>
//                   <td
//                     className={`px-4 py-2 font-semibold ${app.status === "Hired"
//                         ? "text-purple-600"
//                         : app.status === "Rejected"
//                           ? "text-red-600"
//                           : app.status === "Shortlisted"
//                             ? "text-green-600"
//                             : app.status === "Interview Scheduled"
//                               ? "text-yellow-600"
//                               : "text-gray-600"
//                       }`}
//                   >
//                     {app.status}
//                   </td>
//                   <td className="px-4 py-2 flex gap-2 justify-center">
//                     <Button size="sm" variant="outline" onClick={() => console.log("View", app.id)}>View Profile</Button>
//                     <Button size="sm" variant="outline" onClick={() => updateApplicant(app.id, { status: "Hired" })}>Edit</Button>
      
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center text-gray-500 py-4 italic">
//                   No applicants found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Applicant;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  UserCheck,
  UserX,
  CalendarClock,
  Briefcase,
} from "lucide-react";
import axios from "axios";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  gradient: string;
}

function StatsCard({ title, value, icon: Icon, gradient }: StatsCardProps) {
  return (
    <Card className="rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${gradient}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}

interface ApplicantType {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
}

interface DepartmentType {
  id: number;
  name: string;
}

interface StatusType {
  id: number;
  name: string;
}

// ✅ Axios instance with interceptor for Bearer token
const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Applicant = () => {
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState<ApplicantType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [statuses, setStatuses] = useState<StatusType[]>([]);

  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // ✅ Fetch data on load
  useEffect(() => {
    fetchApplicants();
    fetchDepartments();
    fetchStatuses();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await api.get("/applicants");
      setApplicants(res.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await api.get("/statuses");
      setStatuses(res.data);
    } catch (err) {
      console.error("Error fetching statuses:", err);
    }
  };

  // ✅ Add Applicant (POST)
  const addApplicant = async (newApplicant: Omit<ApplicantType, "id">) => {
    try {
      const res = await api.post("/applicants", newApplicant);
      setApplicants([...applicants, res.data]);
    } catch (err) {
      console.error("Error adding applicant:", err);
    }
  };

  // ✅ Update Applicant (PUT)
  const updateApplicant = async (
    id: number,
    updatedData: Partial<ApplicantType>
  ) => {
    try {
      const res = await api.put(`/applicants/${id}`, updatedData);
      setApplicants(applicants.map((app) => (app.id === id ? res.data : app)));
    } catch (err) {
      console.error("Error updating applicant:", err);
    }
  };

  // ✅ Delete Applicant (DELETE)
  const deleteApplicant = async (id: number) => {
    try {
      await api.delete(`/applicants/${id}`);
      setApplicants(applicants.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error deleting applicant:", err);
    }
  };

  const filteredApplicants = applicants.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterDept === "all" || app.department === filterDept) &&
      (filterStatus === "all" || app.status === filterStatus)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applicants</h1>
          <p className="text-muted-foreground">
            Manage all job applicants here.
          </p>
        </div>
        <Button
          className="rounded-2xl bg-orange-600/20 text-black"
          onClick={() => navigate("/recruitment/addapplicant")}
        >
          + Add Applicant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Applicants"
          value={applicants.length}
          icon={Users}
          gradient="bg-gradient-to-r from-indigo-500 to-blue-500"
        />
        <StatsCard
          title="Shortlisted"
          value={applicants.filter((a) => a.status === "Shortlisted").length}
          icon={UserCheck}
          gradient="bg-gradient-to-r from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Interview Scheduled"
          value={
            applicants.filter((a) => a.status === "Interview Scheduled").length
          }
          icon={CalendarClock}
          gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
        />
        <StatsCard
          title="Hired"
          value={applicants.filter((a) => a.status === "Hired").length}
          icon={Briefcase}
          gradient="bg-gradient-to-r from-purple-500 to-pink-500"
        />
        <StatsCard
          title="Rejected"
          value={applicants.filter((a) => a.status === "Rejected").length}
          icon={UserX}
          gradient="bg-gradient-to-r from-red-500 to-pink-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Input
          placeholder="Search applicants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />

        {/* Department filter from backend */}
        <Select onValueChange={(val) => setFilterDept(val)} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.name}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status filter from backend */}
        <Select onValueChange={(val) => setFilterStatus(val)} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((st) => (
              <SelectItem key={st.id} value={st.name}>
                {st.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Applicants Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{app.name}</td>
                  <td className="px-4 py-2">{app.role}</td>
                  <td className="px-4 py-2">{app.department}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      app.status === "Hired"
                        ? "text-purple-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : app.status === "Shortlisted"
                        ? "text-green-600"
                        : app.status === "Interview Scheduled"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log("View", app.id)}
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateApplicant(app.id, { status: "Hired" })}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteApplicant(app.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-4 italic"
                >
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicant;
