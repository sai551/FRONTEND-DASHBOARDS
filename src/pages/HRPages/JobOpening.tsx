import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, Calendar, Users, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatsCard from "@/components/HRDashboard/Dashboard/StatsCard";


// -------------------- Add Job Opening Form --------------------
function AddJobOpeningForm({ onSubmit }: { onSubmit: () => void }) {
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
  const [designations, setDesignations] = useState<
    { id: number; title: string }[]
  >([]);
  const [employmentTypes, setEmploymentTypes] = useState<
    { id: number; name: string }[]
  >([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [formData, setFormData] = useState({
    title: "",
    jobDescription: "",
    jobRequirement: "",
    employmentType: "",
    branchId: "",
    departmentId: "",
    designationId: "",
    status: "",
  });

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get("http://localhost:3000/department/get_dept", { headers })
      .then((res) =>
        setDepartments(
          res.data.map((d: any) => ({ id: d.departmentId, name: d.name }))
        )
      )
      .catch(() => setDepartments([{ id: 1, name: "Default Dept" }]));

    axios
      .get("http://localhost:3000/branches/getAllBranches", { headers })
      .then((res) =>
        setBranches(
          res.data.map((b: any) => ({ id: b.branchId, name: b.name }))
        )
      )
      .catch(() => setBranches([{ id: 1, name: "Main Branch" }]));

    axios
      .get("http://localhost:3000/designation/getDesg", { headers })
      .then((res) =>
        setDesignations(
          res.data.map((desg: any) => ({
            id: desg.designationId,
            title: desg.title,
          }))
        )
      )
      .catch(() => setDesignations([{ id: 1, title: "Employee" }]));

    axios
      .get("http://localhost:3000/enums/employment-types", { headers })
      .then((res) => setEmploymentTypes(res.data))
      .catch(() => setEmploymentTypes([{ id: 1, name: "Full-Time" }]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/job-openings",
        {
          ...formData,
          branchId: Number(formData.branchId),
          departmentId: Number(formData.departmentId),
          designationId: Number(formData.designationId),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSubmit();
    } catch (error) {
      console.error("Error adding job opening:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Job Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Software Engineer"
        />
      </div>
      <div>
        <Label>Branch</Label>
        <Select
          onValueChange={(val) => handleSelectChange("branchId", val)}
          value={formData.branchId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b.id} value={String(b.id)}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Department</Label>
        <Select
          onValueChange={(val) => handleSelectChange("departmentId", val)}
          value={formData.departmentId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d.id} value={String(d.id)}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Designation</Label>
        <Select
          onValueChange={(val) => handleSelectChange("designationId", val)}
          value={formData.designationId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Designation" />
          </SelectTrigger>
          <SelectContent>
            {designations.map((d) => (
              <SelectItem key={d.id} value={String(d.id)}>
                {d.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Employment Type</Label>
        <Select
          onValueChange={(val) => handleSelectChange("employmentType", val)}
          value={formData.employmentType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {employmentTypes.map((e) => (
              <SelectItem key={e.id} value={e.name}>
                {e.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Job Description</Label>
        <Textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div>
        <Label>Requirements</Label>
        <Textarea
          name="jobRequirement"
          value={formData.jobRequirement}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-orange-500 text-black">Submit Job</Button>
      </div>
    </form>
  );
}

// -------------------- Job Openings Page --------------------
interface JobOpening {
  id: number;
  title: string;
  jobDescription: string;
  jobRequirement: string;
  employmentType: string;
  branchId: number;
  departmentId: number;
  designationId: number;
  branchName?: string;
  departmentName?: string;
  designationName?: string;
  status: string;
}

interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function JobOpeningsPage() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/job-openings/getAll?page=${page}&limit=6`,
        getAuthHeaders()
      );
      const jobs = res.data.data.data;
      const metaData = res.data.data.meta;

      const [branches, departments, designations] = await Promise.all([
        axios.get(
          "http://localhost:3000/branches/getAllBranches",
          getAuthHeaders()
        ),
        axios.get(
          "http://localhost:3000/department/get_dept",
          getAuthHeaders()
        ),
        axios.get(
          "http://localhost:3000/designation/getDesg",
          getAuthHeaders()
        ),
      ]);

      const branchMap = new Map(
        branches.data.map((b: any) => [b.branchId, b.name])
      );
      const deptMap = new Map(
        departments.data.map((d: any) => [d.departmentId, d.name])
      );
      const desgMap = new Map(
        designations.data.map((d: any) => [d.designationId, d.title])
      );

      const updatedJobs = jobs.map((job: JobOpening) => ({
        ...job,
        branchName: branchMap.get(job.branchId) || `Branch ${job.branchId}`,
        departmentName:
          deptMap.get(job.departmentId) || `Dept ${job.departmentId}`,
        designationName:
          desgMap.get(job.designationId) || `Desg ${job.designationId}`,
      }));

      setJobOpenings(updatedJobs);
      setMeta(metaData);
    } catch (err) {
      console.error("Error fetching job openings:", err);
      setJobOpenings([]);
      setMeta(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobOpenings.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const totalJobOpenings = meta?.total || 0;
  const currentJobOpenings = jobOpenings.filter(
    (j) => j.status === "active"
  ).length;
  const expiredJobOpenings = jobOpenings.filter(
    (j) => j.status === "expired"
  ).length;
  const requestJobOpenings = jobOpenings.filter(
    (j) => j.status === "requested"
  ).length;

  const deleteJob = async (id: number) => {
    try {
      // await axios.delete(`http://localhost:3000/job-openings/${id}`, getAuthHeaders());
      setJobOpenings(jobOpenings.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Openings</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here’s what’s happening with job openings today.
          </p>
        </div>
         <div className="flex space-x-3">
          <Button className="bg-orange-600/20 text-black" onClick={() => setOpenAddDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Job Opening
          </Button>
        </div> 

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => setStatusFilter(statusFilter === null ? null : null)}
        >
          <StatsCard
            title="Total Job Openings"
            value={totalJobOpenings}
            change={`+${jobOpenings.length}`}
            changeType="positive"
            icon={Briefcase}
            gradient="bg-gradient-to-r from-indigo-500 to-blue-500"
            description="Overall postings"
          />
        </div>
        <div
          onClick={() =>
            setStatusFilter(statusFilter === "active" ? null : "active")
          }
        >
          <StatsCard
            title="Current Openings"
            value={currentJobOpenings}
            change="+Active"
            changeType="positive"
            icon={Clock}
            gradient="bg-gradient-to-r from-green-500 to-emerald-500"
            description="Active jobs"
          />
        </div>
        <div
          onClick={() =>
            setStatusFilter(statusFilter === "expired" ? null : "expired")
          }
        >
          <StatsCard
            title="Expired Openings"
            value={expiredJobOpenings}
            change="-Closed"
            changeType="negative"
            icon={Calendar}
            gradient="bg-gradient-to-r from-red-500 to-pink-500"
            description="Closed jobs"
          />
        </div>
        <div
          onClick={() =>
            setStatusFilter(statusFilter === "requested" ? null : "requested")
          }
        >
          <StatsCard
            title="Requested Openings"
            value={requestJobOpenings}
            change="Pending"
            changeType="neutral"
            icon={Users}
            gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
            description="Awaiting approval"
          />
        </div>
      </div>

      {/* Search */}
      <Input
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3"
      />

      {/* Job Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 && (
              <p className="col-span-full text-center text-gray-500 mt-10">
                No jobs found
              </p>
            )}

            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 rounded-2xl border border-gray-100 bg-white"
              >
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    <strong>Department:</strong> {job.departmentName}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Branch:</strong> {job.branchName}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Designation:</strong> {job.designationName}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Employment:</strong> {job.employmentType}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                      job.status === "active"
                        ? "bg-green-100 text-green-800"
                        : job.status === "expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {job.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedJob(job)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                disabled={meta.page === 1}
                onClick={() => fetchJobs(meta.page - 1)}
              >
                Previous
              </Button>
              {[...Array(meta.totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={meta.page === i + 1 ? "default" : "outline"}
                  onClick={() => fetchJobs(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                disabled={meta.page === meta.totalPages}
                onClick={() => fetchJobs(meta.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>Job details</DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-2">
              <p>
                <strong>Department:</strong> {selectedJob.departmentName}
              </p>
              <p>
                <strong>Branch:</strong> {selectedJob.branchName}
              </p>
              <p>
                <strong>Designation:</strong> {selectedJob.designationName}
              </p>
              <p>
                <strong>Employment:</strong> {selectedJob.employmentType}
              </p>
              <p>
                <strong>Status:</strong> {selectedJob.status}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.jobDescription}
              </p>
              <p>
                <strong>Requirements:</strong> {selectedJob.jobRequirement}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Job Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle>Add Job Opening</DialogTitle>
            <DialogDescription>Fill details below</DialogDescription>
          </DialogHeader>
          <AddJobOpeningForm
            onSubmit={() => {
              setOpenAddDialog(false);
              fetchJobs();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
