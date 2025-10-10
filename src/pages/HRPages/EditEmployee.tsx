import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type SectionKey =
  | "basic"
  | "personal"
  | "bank"
  | "pf"
  | "experience"
  | "qualification"
  | "documents";

const API_BASE = "http://localhost:3000"; // 🔹 replace with your NestJS backend URL

export default function EditEmployee() {
  const { id } = useParams(); // employeeId from route
  const token = localStorage.getItem("token");

  const [employeeData, setEmployeeData] = useState<any>({});
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);

  // Fetch employee details
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API_BASE}/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployeeData(res.data))
      .catch((err) => console.error(err));
  }, [id, token]);

  const handleChange = (section: string, field: string, value: any) => {
    setEmployeeData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = (section: SectionKey) => {
    axios
      .put(
        `${API_BASE}/employees/${id}/${section}`,
        employeeData[section],
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => alert(`${section} updated successfully!`))
      .catch((err) => console.error(err));
  };

  const sections = [
    { key: "basic", title: "Basic Info" },
    { key: "personal", title: "Personal Details" },
    { key: "bank", title: "Bank Details" },
    { key: "pf", title: "PF Details" },
    { key: "experience", title: "Experience" },
    { key: "qualification", title: "Qualification" },
    { key: "documents", title: "Documents" },
  ] as { key: SectionKey; title: string }[];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Edit Employee</h1>

      {sections.map((section) => (
        <Card key={section.key} className="mb-4 shadow-lg rounded-2xl">
          <CardHeader
            className="cursor-pointer bg-gray-100 p-4 rounded-t-2xl"
            onClick={() =>
              setOpenSection(openSection === section.key ? null : section.key)
            }
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
          </CardHeader>

          <AnimatePresence>
            {openSection === section.key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="p-6 space-y-4">
                  {section.key === "basic" && (
                    <>
                      <div>
                        <Label>First Name</Label>
                        <Input
                          value={employeeData.basic?.firstName || ""}
                          onChange={(e) =>
                            handleChange("basic", "firstName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          value={employeeData.basic?.lastName || ""}
                          onChange={(e) =>
                            handleChange("basic", "lastName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={employeeData.basic?.email || ""}
                          onChange={(e) =>
                            handleChange("basic", "email", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {section.key === "personal" && (
                    <>
                      <div>
                        <Label>Address</Label>
                        <Input
                          value={employeeData.personal?.address || ""}
                          onChange={(e) =>
                            handleChange("personal", "address", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Emergency Contact</Label>
                        <Input
                          value={employeeData.personal?.emergency_contact_name || ""}
                          onChange={(e) =>
                            handleChange("personal", "emergency_contact_name", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {section.key === "bank" && (
                    <>
                      <div>
                        <Label>Bank Name</Label>
                        <Input
                          value={employeeData.bank?.bank_name || ""}
                          onChange={(e) =>
                            handleChange("bank", "bank_name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Account Number</Label>
                        <Input
                          value={employeeData.bank?.accountNumber || ""}
                          onChange={(e) =>
                            handleChange("bank", "accountNumber", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {section.key === "pf" && (
                    <>
                      <div>
                        <Label>PF Number</Label>
                        <Input
                          value={employeeData.pf?.pf_number || ""}
                          onChange={(e) =>
                            handleChange("pf", "pf_number", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>UAN Number</Label>
                        <Input
                          value={employeeData.pf?.uan_number || ""}
                          onChange={(e) =>
                            handleChange("pf", "uan_number", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {section.key === "experience" && (
                    <>
                      <div>
                        <Label>Company Name</Label>
                        <Input
                          value={employeeData.experience?.previouscompanyName || ""}
                          onChange={(e) =>
                            handleChange("experience", "previouscompanyName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Designation</Label>
                        <Input
                          value={employeeData.experience?.previousdesignation || ""}
                          onChange={(e) =>
                            handleChange("experience", "previousdesignation", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {section.key === "qualification" && (
                    <>
                      <div>
                        <Label>Specification</Label>
                        <Input
                          value={employeeData.qualification?.Specification || ""}
                          onChange={(e) =>
                            handleChange("qualification", "Specification", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={employeeData.qualification?.institution || ""}
                          onChange={(e) =>
                            handleChange("qualification", "institution", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {section.key === "documents" && (
                    <>
                      <div>
                        <Label>Document Type</Label>
                        <Input
                          value={employeeData.documents?.documentType || ""}
                          onChange={(e) =>
                            handleChange("documents", "documentType", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Document Number</Label>
                        <Input
                          value={employeeData.documents?.documentNumber || ""}
                          onChange={(e) =>
                            handleChange("documents", "documentNumber", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  <Button
                    onClick={() => handleSave(section.key)}
                    className="bg-primary text-white"
                  >
                    Save {section.title}
                  </Button>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}
