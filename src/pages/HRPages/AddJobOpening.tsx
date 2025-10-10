

// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Textarea } from "@/components/ui/textarea";

// // export default function JobOpenings() {
// //   const [formData, setFormData] = useState({
// //     id: null as number | null,
// //     title: "",
// //     department: "",
// //     employmentType: "",
// //     description: "",
// //     requirements: "",
// //   });

// //   const [jobs, setJobs] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   // Fetch jobs on load
// //   useEffect(() => {
// //     fetchJobs();
// //   }, []);

// //   const fetchJobs = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get("/api/jobs");
// //       setJobs(res.data);
// //     } catch (err) {
// //       console.error("Error fetching jobs:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     try {
// //       if (formData.id) {
// //         // Update existing job
// //         await axios.put(`/api/jobs/${formData.id}`, formData);
// //         console.log("Job updated:", formData);
// //       } else {
// //         // Create new job
// //         await axios.post("/api/jobs", formData);
// //         console.log("Job created:", formData);
// //       }
// //       fetchJobs();
// //       resetForm();
// //     } catch (err) {
// //       console.error("Error submitting job:", err);
// //     }
// //   };

// //   const handleEdit = (job: any) => {
// //     setFormData(job); // load job data into form
// //   };

// //   const handleDelete = async (id: number) => {
// //     try {
// //       await axios.delete(`/api/jobs/${id}`);
// //       console.log("Job deleted:", id);
// //       fetchJobs();
// //     } catch (err) {
// //       console.error("Error deleting job:", err);
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       id: null,
// //       title: "",
// //       department: "",
// //       employmentType: "",
// //       description: "",
// //       requirements: "",
// //     });
// //   };

// //   return (
// //     <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 space-x-6">
// //       {/* Form */}
// //       <Card className="w-full max-w-md h-[600px] shadow-lg rounded-2xl flex flex-col">
// //         <CardHeader>
// //           <CardTitle className="text-xl font-bold text-center">
// //             {formData.id ? "Edit Job Opening" : "Add Job Opening"}
// //           </CardTitle>
// //         </CardHeader>

// //         <CardContent className="flex-1 overflow-y-auto">
// //           <form onSubmit={handleSubmit} className="space-y-3 pr-2">
// //             <Input
// //               name="title"
// //               placeholder="Job Title"
// //               value={formData.title}
// //               onChange={handleChange}
// //               required
// //             />
// //             <Input
// //               name="department"
// //               placeholder="Department"
// //               value={formData.department}
// //               onChange={handleChange}
// //               required
// //             />
// //             <Input
// //               name="employmentType"
// //               placeholder="Employment Type (Full-time, Part-time, etc.)"
// //               value={formData.employmentType}
// //               onChange={handleChange}
// //               required
// //             />
// //             <Textarea
// //               name="description"
// //               placeholder="Job Description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               required
// //             />
// //             <Textarea
// //               name="requirements"
// //               placeholder="Job Requirements"
// //               value={formData.requirements}
// //               onChange={handleChange}
// //             />
// //           </form>
// //         </CardContent>

// //         <div className="p-4 border-t space-y-2">
// //           <Button type="submit" onClick={handleSubmit} className="w-full">
// //             {formData.id ? "Update Job" : "Submit"}
// //           </Button>
// //           {formData.id && (
// //             <Button
// //               type="button"
// //               variant="secondary"
// //               onClick={resetForm}
// //               className="w-full"
// //             >
// //               Cancel Edit
// //             </Button>
// //           )}
// //         </div>
// //       </Card>

// //       {/* Job List */}
// //       <Card className="flex-1 shadow-lg rounded-2xl">
// //         <CardHeader>
// //           <CardTitle className="text-xl font-bold text-center">
// //             Job Openings
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent className="overflow-y-auto max-h-[600px] space-y-4">
// //           {loading ? (
// //             <p>Loading jobs...</p>
// //           ) : jobs.length === 0 ? (
// //             <p>No jobs found</p>
// //           ) : (
// //             jobs.map((job) => (
// //               <div
// //                 key={job.id}
// //                 className="p-4 border rounded-lg bg-white shadow-sm"
// //               >
// //                 <h2 className="font-semibold text-lg">{job.title}</h2>
// //                 <p className="text-sm text-gray-500">
// //                   {job.department} | {job.employmentType}
// //                 </p>
// //                 <p className="mt-2 text-gray-700 text-sm">
// //                   {job.description}
// //                 </p>
// //                 <div className="mt-3 flex gap-2">
// //                   <Button size="sm" onClick={() => handleEdit(job)}>
// //                     Edit
// //                   </Button>
// //                   <Button
// //                     size="sm"
// //                     variant="destructive"
// //                     onClick={() => handleDelete(job.id)}
// //                   >
// //                     Delete
// //                   </Button>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// export default function JobOpenings() {
//   const [formData, setFormData] = useState({
//     id: null,
//     title: "",
//     department: "",
//     employmentType: "",
//     description: "",
//     requirements: "",
//   });

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch jobs on load
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/jobs");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formData.id) {
//         // Update existing job
//         const res = await axios.put(`/api/jobs/${formData.id}`, formData);
//         const updatedJob = res.data ? res.data : formData;
//         setJobs((prevJobs) =>
//           prevJobs.map((job) =>
//             job.id === formData.id ? updatedJob : job
//           )
//         );
//       } else {
//         // Create new job
//         const res = await axios.post("/api/jobs", formData);
//         const newJob =
//           res.data && res.data.id
//             ? res.data
//             : { ...formData, id: Date.now() }; // fallback ID
//         setJobs((prevJobs) => [newJob, ...prevJobs]); // Add to top of list
//       }
//       resetForm();
//     } catch (err) {
//       console.error("Error submitting job:", err);
//     }
//   };

//   const handleEdit = (job) => {
//     setFormData(job);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/jobs/${id}`);
//       setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
//     } catch (err) {
//       console.error("Error deleting job:", err);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       id: null,
//       title: "",
//       department: "",
//       employmentType: "",
//       description: "",
//       requirements: "",
//     });
//   };

//   return (
//     <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 space-x-6">
//       {/* Form */}
//       <Card className="w-full max-w-md h-[600px] shadow-lg rounded-2xl flex flex-col">
//         <CardHeader>
//           <CardTitle className="text-xl font-bold text-center">
//             {formData.id ? "Edit Job Opening" : "Add Job Opening"}
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="flex-1 overflow-y-auto">
//           <form onSubmit={handleSubmit} className="space-y-3 pr-2">
//             <Input
//               name="title"
//               placeholder="Job Title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               name="department"
//               placeholder="Department"
//               value={formData.department}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               name="employmentType"
//               placeholder="Employment Type (Full-time, Part-time, etc.)"
//               value={formData.employmentType}
//               onChange={handleChange}
//               required
//             />
//             <Textarea
//               name="description"
//               placeholder="Job Description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//             <Textarea
//               name="requirements"
//               placeholder="Job Requirements"
//               value={formData.requirements}
//               onChange={handleChange}
//             />
//             <Button type="submit" className="w-full mt-2">
//               {formData.id ? "Update Job" : "Submit"}
//             </Button>
//             {formData.id && (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={resetForm}
//                 className="w-full"
//               >
//                 Cancel Edit
//               </Button>
//             )}
//           </form>
//         </CardContent>
//       </Card>

//       {/* Job List */}
//       <Card className="flex-1 shadow-lg rounded-2xl">
//         <CardHeader>
//           <CardTitle className="text-xl font-bold text-center">
//             Job Openings
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-y-auto max-h-[600px] space-y-4">
//           {loading ? (
//             <p>Loading jobs...</p>
//           ) : jobs.length === 0 ? (
//             <p>No jobs found</p>
//           ) : (
//             jobs.map((job) => (
//               <div
//                 key={job.id}
//                 className="p-4 border rounded-lg bg-white shadow-sm"
//               >
//                 <h2 className="font-semibold text-lg">{job.title}</h2>
//                 <p className="text-sm text-gray-500">
//                   {job.department} | {job.employmentType}
//                 </p>
//                 <p className="mt-2 text-gray-700 text-sm">
//                   {job.description}
//                 </p>
//                 <div className="mt-3 flex gap-2">
//                   <Button size="sm" onClick={() => handleEdit(job)}>
//                     Edit
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => handleDelete(job.id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             ))
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
