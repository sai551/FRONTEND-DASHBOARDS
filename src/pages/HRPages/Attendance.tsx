
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  UserX,
  CalendarClock,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";

interface Applicant {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  appliedOn: string;
}

export default function Attendance() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [newApplicant, setNewApplicant] = useState({
    name: "",
    email: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // ✅ Fetch applicants on load
  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/applicants");
      setApplicants(res.data);
    } catch (err) {
      console.error("Error fetching applicants", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add applicant
  const handleAddApplicant = async () => {
    if (!newApplicant.name || !newApplicant.email) return;
    try {
      await axios.post("http://localhost:3000/applicants", {
        ...newApplicant,
        status: "pending",
        appliedOn: new Date().toISOString(),
      });
      setNewApplicant({ name: "", email: "" });
      fetchApplicants();
    } catch (err) {
      console.error("Error adding applicant", err);
    }
  };

  // ✅ Update applicant
  const handleUpdateApplicant = async (id: number, updated: Partial<Applicant>) => {
    try {
      await axios.put(`http://localhost:3000/applicants/${id}`, updated);
      setEditingId(null);
      fetchApplicants();
    } catch (err) {
      console.error("Error updating applicant", err);
    }
  };

  // ✅ Delete applicant
  const handleDeleteApplicant = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/applicants/${id}`);
      fetchApplicants();
    } catch (err) {
      console.error("Error deleting applicant", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Total Applicants</CardTitle>
            <Users className="w-5 h-5 text-gray-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {applicants.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Approved</CardTitle>
            <UserCheck className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {applicants.filter((a) => a.status === "approved").length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Rejected</CardTitle>
            <UserX className="w-5 h-5 text-red-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {applicants.filter((a) => a.status === "rejected").length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Pending</CardTitle>
            <CalendarClock className="w-5 h-5 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {applicants.filter((a) => a.status === "pending").length}
          </CardContent>
        </Card>
      </div>

      {/* ✅ Add Applicant */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Applicant</CardTitle>
          <CardDescription>Enter details to register a new applicant.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Name"
            value={newApplicant.name}
            onChange={(e) =>
              setNewApplicant({ ...newApplicant, name: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            value={newApplicant.email}
            onChange={(e) =>
              setNewApplicant({ ...newApplicant, email: e.target.value })
            }
          />
          <Button onClick={handleAddApplicant} className="bg-orange-600/20 text-black">
            <UserPlus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </CardContent>
      </Card>

      {/* ✅ Applicants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applicants List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>{applicant.id}</TableCell>
                    <TableCell>
                      {editingId === applicant.id ? (
                        <Input
                          defaultValue={applicant.name}
                          onBlur={(e) =>
                            handleUpdateApplicant(applicant.id, {
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        applicant.name
                      )}
                    </TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          applicant.status === "approved"
                            ? "bg-green-500"
                            : applicant.status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }
                      >
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(applicant.appliedOn).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(applicant.id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteApplicant(applicant.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
