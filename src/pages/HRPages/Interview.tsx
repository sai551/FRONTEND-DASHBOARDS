


// import { useState, useEffect } from "react";
// import axios from "axios"; // ✅ Added axios
// import { Card, CardContent } from "@/components/ui/card";
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// interface StatsCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
//   gradient: string;
// }

// function StatsCard({ title, value, icon: Icon, gradient }: StatsCardProps) {
//   return (
//     <Card className="rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
//       <CardContent className="p-4 flex items-center justify-between">
//         <div>
//           <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div
//           className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${gradient}`}
//         >
//           <Icon className="w-6 h-6" />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// interface Applicant {
//   id: number;
//   name: string;
//   role: string;
//   department: string;
//   status: string;
// }

// const Interview = () => {
//   const [applicants, setApplicants] = useState<Applicant[]>([]);
//   const [search, setSearch] = useState("");
//   const [filterDept, setFilterDept] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

//   // ✅ READ - Fetch applicants from backend
//   useEffect(() => {
//     fetchApplicants();
//   }, []);

//   const fetchApplicants = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/applicants");
//       setApplicants(res.data);
//     } catch (err) {
//       console.error("Error fetching applicants", err);
//     }
//   };

//   // ✅ CREATE - Add new applicant
//   const addApplicant = async (newApplicant: Omit<Applicant, "id">) => {
//     try {
//       const res = await axios.post("http://localhost:3000/applicants", newApplicant);
//       setApplicants((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Error adding applicant", err);
//     }
//   };

//   // ✅ UPDATE - Update applicant status/fields
//   const updateApplicant = async (id: number, updatedData: Partial<Applicant>) => {
//     try {
//       const res = await axios.put(`http://localhost:3000/applicants/${id}`, updatedData);
//       setApplicants((prev) =>
//         prev.map((a) => (a.id === id ? { ...a, ...res.data } : a))
//       );
//     } catch (err) {
//       console.error("Error updating applicant", err);
//     }
//   };

//   // ✅ DELETE - Remove applicant
//   const deleteApplicant = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:3000/applicants/${id}`);
//       setApplicants((prev) => prev.filter((a) => a.id !== id));
//     } catch (err) {
//       console.error("Error deleting applicant", err);
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
//           <h1 className="text-3xl font-bold text-foreground">Interview</h1>
//           <p className="text-muted-foreground">Welcome back!</p>
//         </div>
//       </div>

//       {/* Applicant Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <StatsCard
//           title="Total Applicants"
//           value={applicants.length}
//           icon={Users}
//           gradient="bg-gradient-to-r from-indigo-500 to-blue-500"
//         />
//         <StatsCard
//           title="Shortlisted"
//           value={applicants.filter((a) => a.status === "Shortlisted").length}
//           icon={UserCheck}
//           gradient="bg-gradient-to-r from-green-500 to-emerald-500"
//         />
//         <StatsCard
//           title="Interview Scheduled"
//           value={applicants.filter((a) => a.status === "Interview Scheduled").length}
//           icon={CalendarClock}
//           gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
//         />
//         <StatsCard
//           title="Hired"
//           value={applicants.filter((a) => a.status === "Hired").length}
//           icon={Briefcase}
//           gradient="bg-gradient-to-r from-purple-500 to-pink-500"
//         />
//         <StatsCard
//           title="Rejected"
//           value={applicants.filter((a) => a.status === "Rejected").length}
//           icon={UserX}
//           gradient="bg-gradient-to-r from-red-500 to-pink-500"
//         />
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
//             <SelectItem value="Interview Scheduled">
//               Interview Scheduled
//             </SelectItem>
//             <SelectItem value="Hired">Hired</SelectItem>
//             <SelectItem value="Rejected">Rejected</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Applicants List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredApplicants.map((app) => (
//           <Card
//             key={app.id}
//             className="shadow-md rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer p-4"
//           >
//             <h3 className="text-lg font-semibold">{app.name}</h3>
//             <p className="text-sm text-gray-600">{app.role}</p>
//             <p className="text-xs text-gray-400">{app.department} Department</p>
//             <p
//               className={`mt-2 text-sm font-semibold ${
//                 app.status === "Hired"
//                   ? "text-purple-600"
//                   : app.status === "Rejected"
//                   ? "text-red-600"
//                   : app.status === "Shortlisted"
//                   ? "text-green-600"
//                   : app.status === "Interview Scheduled"
//                   ? "text-yellow-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Status: {app.status}
//             </p>
//             <div className="flex gap-2 mt-4">
//               <Button size="sm" variant="outline" onClick={() => updateApplicant(app.id, { status: "Shortlisted" })}>
//                 Update
//               </Button>
//               <Button size="sm" onClick={() => deleteApplicant(app.id)}>
//                 Delete
//               </Button>
//             </div>
//           </Card>
//         ))}

//         {filteredApplicants.length === 0 && (
//           <p className="text-gray-500 italic">No applicants found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Interview;



import { useState, useEffect } from "react";
import axios from "axios"; // ✅ Added axios
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  gradient: string;
}

function StatsCard({ title, value, icon: Icon, gradient }: StatsCardProps) {
  return (
    <Card className="rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${gradient}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}

interface Applicant {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
}

const Interview = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // ✅ READ - Fetch applicants from backend
  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/applicants");
      setApplicants(res.data);
    } catch (err) {
      console.error("Error fetching applicants", err);
    }
  };

  // ✅ CREATE - Add new applicant
  const addApplicant = async (newApplicant: Omit<Applicant, "id">) => {
    try {
      const res = await axios.post("http://localhost:3000/applicants", newApplicant);
      setApplicants((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding applicant", err);
    }
  };

  // ✅ UPDATE - Update applicant status/fields
  const updateApplicant = async (id: number, updatedData: Partial<Applicant>) => {
    try {
      const res = await axios.put(`http://localhost:3000/applicants/${id}`, updatedData);
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...res.data } : a))
      );
    } catch (err) {
      console.error("Error updating applicant", err);
    }
  };

  // ✅ DELETE - Remove applicant
  const deleteApplicant = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/applicants/${id}`);
      setApplicants((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting applicant", err);
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
          <h1 className="text-3xl font-bold text-foreground">Interview</h1>
          <p className="text-muted-foreground">Welcome back!</p>
        </div>
      </div>

      {/* Applicant Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Shortlisted"
          value={applicants.filter((a) => a.status === "Shortlisted").length}
          icon={UserCheck}
          gradient="bg-gradient-to-r from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Interview Scheduled"
          value={applicants.filter((a) => a.status === "Interview Scheduled").length}
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

        <Select onValueChange={(val) => setFilterDept(val)} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setFilterStatus(val)} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Shortlisted">Shortlisted</SelectItem>
            <SelectItem value="Interview Scheduled">
              Interview Scheduled
            </SelectItem>
            <SelectItem value="Hired">Hired</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applicants List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplicants.map((app) => (
          <Card
            key={app.id}
            className="shadow-md rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer p-4"
          >
            <h3 className="text-lg font-semibold">{app.name}</h3>
            <p className="text-sm text-gray-600">{app.role}</p>
            <p className="text-xs text-gray-400">{app.department} Department</p>
            <p
              className={`mt-2 text-sm font-semibold ${
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
              Status: {app.status}
            </p>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateApplicant(app.id, { status: "Shortlisted" })}
              >
                Update
              </Button>
              <Button size="sm" onClick={() => deleteApplicant(app.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}

        {filteredApplicants.length === 0 && (
          <p className="text-gray-500 italic">No applicants found.</p>
        )}
      </div>
    </div>
  );
};

export default Interview;
