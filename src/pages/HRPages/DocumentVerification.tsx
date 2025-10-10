


import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import countryList from "react-select-country-list";
import Select from "react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {
  CheckCircle,
  Circle,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  CreditCard,
  Heart,
  Building,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface FormData {
  fullName: string;
  dob: string;
  gender: string;
  nationality: string;
  contact: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
  aadhaar: string;
  pan: string;
  passport: string;
  drivingLicense: string;
  voterId: string;
  identityDocs: FileList | null;
  highestQualification: string;
  university: string;
  graduationYear: string;
  cgpa: string;
  eduDocs: FileList | null;
  lastCompany: string;
  designation: string;
  experienceYears: string;
  lastSalary: string;
  expDocs: FileList | null;
  accountNumber: string;
  confirmAccount: string;
  ifsc: string;
  bankName: string;
  branch: string;
  bankDocs: FileList | null;
  bloodGroup: string;
  emergencyContact: string;
  medicalHistory: string;
  healthDocs: FileList | null;
  offerLetter: FileList | null;
  ndaDocs: FileList | null;
  joiningDate: string;
  department: string;
  additionalDocs: FileList | null;
}

const steps = [
  { id: 1, title: "Profile Info", icon: User },
  { id: 2, title: "Identity", icon: FileText },
  { id: 3, title: "Education", icon: GraduationCap },
  { id: 4, title: "Experience", icon: Briefcase },
  { id: 5, title: "Bank Details", icon: CreditCard },
  { id: 6, title: "Medical", icon: Heart },
  { id: 7, title: "Documents", icon: Building },
];

export default function DocumentVerification() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [docId, setDocId] = useState<number | null>(null);
  const { toast } = useToast();
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const totalSteps = steps.length;
  const options = useMemo(() => countryList().getData(), []);


  const token = localStorage.getItem("token");
  const apiUrl = "http://localhost:3000/document-verification";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.length > 0) {
          setFormData(res.data[0]);
          setDocId(res.data[0].id);
        }
      } catch (err) {
        console.error("Error fetching document verification:", err);
      }
    };
    fetchData();
  }, []);

  // Sync current address changes to permanent if sameAsCurrent is checked
  useEffect(() => {
    if (sameAsCurrent) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: prev.currentAddress,
      }));
    }
  }, [formData.currentAddress, sameAsCurrent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(sameAsCurrent && name === "currentAddress"
          ? { permanentAddress: value }
          : {}),
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setSameAsCurrent(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: prev.currentAddress,
      }));
    }
  };

  const handleSelectChange = (selectedOption: { value: string; label: string }) => {
    setFormData({ ...formData, nationality: selectedOption.value });
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    switch (stepNum) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.dob) newErrors.dob = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.nationality)
          newErrors.nationality = "Nationality is required";
        if (!formData.contact) newErrors.contact = "Contact is required";
        else if (!/^\d{10,15}$/.test(formData.contact.replace(/\D/g, '')))
          newErrors.contact = "Contact must be exactly 10 digits";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.currentAddress)
          newErrors.currentAddress = "Current address is required";
        if (!formData.permanentAddress)
          newErrors.permanentAddress = "Permanent address is required";
        break;
      case 2:
        if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar is required";
        if (!formData.pan) newErrors.pan = "PAN is required";
        if (!formData.passport) newErrors.passport = "Passport is required";
        if (!formData.drivingLicense) newErrors.drivingLicense = "Driving License is required";
        if (!formData.voterId) newErrors.voterId = "VoterId is required";
        if (!formData.identityDocs || formData.identityDocs.length === 0)
          newErrors.identityDocs = "Upload identity documents";
        break;
      case 3:
        if (!formData.highestQualification)
          newErrors.highestQualification = "Qualification required";
        if (!formData.university) newErrors.university = "University required";
        if (!formData.graduationYear)
          newErrors.graduationYear = "Graduation year required";
        if (!formData.cgpa) newErrors.cgpa = "CGPA required";
        if (!formData.eduDocs || formData.eduDocs.length === 0)
          newErrors.eduDocs = "Upload education documents";
        break;
      case 4:
        if (!formData.lastCompany)
          newErrors.lastCompany = "Last company required";
        if (!formData.designation)
          newErrors.designation = "Designation required";
        if (!formData.experienceYears)
          newErrors.experienceYears = "Experience required";
        if (!formData.lastSalary)
          newErrors.lastSalary = "Last Salary required";
        if (!formData.expDocs || formData.expDocs.length === 0)
          newErrors.expDocs = "Upload experience documents";
        break;
      case 5:
        if (!formData.accountNumber)
          newErrors.accountNumber = "Account number required";
        if (formData.accountNumber !== formData.confirmAccount)
          newErrors.confirmAccount = "Account numbers do not match";
        if (!formData.ifsc) newErrors.ifsc = "IFSC required";
        if (!formData.bankName) newErrors.bankName = "Bank name required";
        if (!formData.branch) newErrors.branch = "Branch required";
        if (!formData.bankDocs || formData.bankDocs.length === 0)
          newErrors.bankDocs = "Upload bank documents";
        break;
      case 6:
        if (!formData.bloodGroup)
          newErrors.bloodGroup = "Blood group required";
        if (!formData.emergencyContact)
          newErrors.emergencyContact = "Emergency contact required";
        if (!formData.medicalHistory)
          newErrors.medicalHistory = "Medical History required";
        if (!formData.healthDocs || formData.healthDocs.length === 0)
          newErrors.healthDocs = "Upload bank documents";
        break;
      case 7:
        if (!formData.offerLetter || formData.offerLetter.length === 0)
          newErrors.offerLetter = "Offer Letter documents";
        if (!formData.ndaDocs || formData.ndaDocs.length === 0)
          newErrors.ndaDocs = "NDA documents";
        if (!formData.joiningDate)
          newErrors.joiningDate = "Joining date required";
        if (!formData.department) newErrors.department = "Department required";
        if (!formData.additionalDocs || formData.additionalDocs.length === 0)
          newErrors.additionalDocs = "Additional documents";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => formPayload.append(key, file));
        } else if (value) {
          formPayload.append(key, value as string);
        }
      });

      if (docId) {
        await axios.put(`${apiUrl}/${docId}`, formPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast({ title: "Updated", description: "Document verification updated successfully!" });
      } else {
        const res = await axios.post(apiUrl, formPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setDocId(res.data.id);
        toast({ title: "Submitted", description: "Document verification submitted successfully!" });
      }
    } catch (err) {
      console.error("Error saving document verification:", err);
      toast({ title: "Error", description: "Failed to save document verification", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    try {
      if (!docId) return;
      await axios.delete(`${apiUrl}/${docId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({} as FormData);
      setDocId(null);
      toast({ title: "Deleted", description: "Document verification deleted successfully!" });
    } catch (err) {
      console.error("Error deleting document verification:", err);
    }
  };

  const getStepIcon = (stepNumber: number) => {
    if (stepNumber < step) return CheckCircle;
    if (stepNumber === step) return steps[stepNumber - 1].icon;
    return Circle;
  };

  const getStepColor = (stepNumber: number) => {
    if (stepNumber < step) return "text-green-600";
    if (stepNumber === step) return "text-blue-600";
    return "text-gray-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Verification</h1>
          <p className="text-muted-foreground">Fill all the details for submitting the application.</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => {
              const StepIcon = getStepIcon(stepItem.id);
              const isCompleted = stepItem.id < step;
              const isActive = stepItem.id === step;
              return (
                <div key={stepItem.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                        ${isCompleted
                          ? "bg-green-600 border-green-600 text-white"
                          : isActive
                            ? "bg-[#670D2F] border-[#670D2F] text-white"
                            : "bg-white border-gray-400 text-gray-400"
                        }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-xs font-medium ${getStepColor(stepItem.id)}`}>{stepItem.id}</p>
                      <p className={`text-xs mt-1 ${getStepColor(stepItem.id)}`}>{stepItem.title}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 mt-[-20px] transition-colors duration-200 ${stepItem.id < step ? "bg-green-600" : "bg-gray-300"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="shadow-lg">
          <CardHeader className="pb-4 text-center">
            <h2 className="text-lg font-semibold text-[#670D2F]">Step {step} of {totalSteps}</h2>
            <p className="text-sm text-muted-foreground mt-1">Please fill in all required information accurately</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 relative overflow-hidden min-h-96">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="profile" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="ml-1">
                        <Label>Full Name</Label>
                        <Input name="fullName" value={formData.fullName || ""} onChange={handleChange} />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Date of Birth</Label>
                        <Input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} />
                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Gender</Label>
                        <Input name="gender" value={formData.gender || ""} onChange={handleChange} />
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Nationality</Label>
                        <Select
                          name="nationality"
                          options={options}
                          value={options.find(option => option.value === formData.nationality)}
                          onChange={handleSelectChange}
                        />
                        {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Contact</Label>
                        <PhoneInput
                          country={"in"}
                          value={formData.contact}
                          onChange={(phone) => setFormData({ ...formData, contact: phone })}
                          inputProps={{ name: "contact", required: true }}
                        />
                        {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Email</Label>
                        <Input type="email" name="email" value={formData.email || ""} onChange={handleChange} />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div className="md:col-span-1 ml-1">
                        <Label>Current Address</Label>
                        <Textarea name="currentAddress" value={formData.currentAddress || ""} onChange={handleChange} />
                        {errors.currentAddress && <p className="text-red-500 text-sm mt-1">{errors.currentAddress}</p>}
                      </div>
                      <div className="md:col-span-1 mr-1">
                        <Label>Permanent Address</Label>
                        <Textarea name="permanentAddress" value={formData.permanentAddress || ""} onChange={handleChange} />
                        {errors.permanentAddress && <p className="text-red-500 text-sm mt-1">{errors.permanentAddress}</p>}
                        <div className="flex items-center space-x-2 mt-2">
                          <Checkbox id="sameAsCurrent" checked={sameAsCurrent} onCheckedChange={handleCheckboxChange} />
                          <label htmlFor="sameAsCurrent" className="text-sm">Same as Current</label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="identity" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="ml-1">
                        <Label>Aadhaar</Label>
                        <Input name="aadhaar" value={formData.aadhaar || ""} onChange={handleChange} />
                        {errors.aadhaar && <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>PAN</Label>
                        <Input name="pan" value={formData.pan || ""} onChange={handleChange} />
                        {errors.pan && <p className="text-red-500 text-sm mt-1">{errors.pan}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Passport</Label>
                        <Input name="passport" value={formData.passport || ""} onChange={handleChange} />
                        {errors.passport && <p className="text-red-500 text-sm mt-1">{errors.passport}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Driving License</Label>
                        <Input name="drivingLicense" value={formData.drivingLicense || ""} onChange={handleChange} />
                        {errors.drivingLicense && <p className="text-red-500 text-sm mt-1">{errors.drivingLicense}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Voter ID</Label>
                        <Input name="voterId" value={formData.voterId || ""} onChange={handleChange} />
                        {errors.voterId && <p className="text-red-500 text-sm mt-1">{errors.voterId}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Identity Docs</Label>
                        <Input type="file" name="identityDocs" multiple onChange={handleChange} />
                        {errors.identityDocs && <p className="text-red-500 text-sm mt-1">{errors.identityDocs}</p>}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="education" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="ml-1">
                        <Label>Highest Qualification</Label>
                        <Input name="highestQualification" value={formData.highestQualification || ""} onChange={handleChange} />
                        {errors.highestQualification && <p className="text-red-500 text-sm mt-1">{errors.highestQualification}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>University</Label>
                        <Input name="university" value={formData.university || ""} onChange={handleChange} />
                        {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Graduation Year</Label>
                        <Input name="graduationYear" value={formData.graduationYear || ""} onChange={handleChange} />
                        {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>CGPA</Label>
                        <Input name="cgpa" value={formData.cgpa || ""} onChange={handleChange} />
                        {errors.cgpa && <p className="text-red-500 text-sm mt-1">{errors.cgpa}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Education Docs</Label>
                        <Input type="file" name="eduDocs" multiple onChange={handleChange} />
                        {errors.eduDocs && <p className="text-red-500 text-sm mt-1">{errors.eduDocs}</p>}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="experience" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="ml-1">
                        <Label>Last Company</Label>
                        <Input name="lastCompany" value={formData.lastCompany || ""} onChange={handleChange} />
                        {errors.lastCompany && <p className="text-red-500 text-sm mt-1">{errors.lastCompany}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Designation</Label>
                        <Input name="designation" value={formData.designation || ""} onChange={handleChange} />
                        {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Years of Experience</Label>
                        <Input name="experienceYears" value={formData.experienceYears || ""} onChange={handleChange} />
                        {errors.experienceYears && <p className="text-red-500 text-sm mt-1">{errors.experienceYears}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Last Salary</Label>
                        <Input name="lastSalary" value={formData.lastSalary || ""} onChange={handleChange} />
                        {errors.lastSalary && <p className="text-red-500 text-sm mt-1">{errors.lastSalary}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Experience Docs</Label>
                        <Input type="file" name="expDocs" multiple onChange={handleChange} />
                        {errors.expDocs && <p className="text-red-500 text-sm mt-1">{errors.expDocs}</p>}
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div key="bank" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="ml-1">
                        <Label>Account Number</Label>
                        <Input name="accountNumber" value={formData.accountNumber || ""} onChange={handleChange} />
                        {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Confirm Account</Label>
                        <Input name="confirmAccount" value={formData.confirmAccount || ""} onChange={handleChange} />
                        {errors.confirmAccount && <p className="text-red-500 text-sm mt-1">{errors.confirmAccount}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>IFSC</Label>
                        <Input name="ifsc" value={formData.ifsc || ""} onChange={handleChange} />
                        {errors.ifsc && <p className="text-red-500 text-sm mt-1">{errors.ifsc}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Bank Name</Label>
                        <Input name="bankName" value={formData.bankName || ""} onChange={handleChange} />
                        {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Branch</Label>
                        <Input name="branch" value={formData.branch || ""} onChange={handleChange} />
                        {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Bank Docs</Label>
                        <Input type="file" name="bankDocs" multiple onChange={handleChange} />
                        {errors.bankDocs && <p className="text-red-500 text-sm mt-1">{errors.bankDocs}</p>}
                      </div>
                    </motion.div>
                  )}

                  {step === 6 && (
                    <motion.div key="medical" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="ml-1">
                        <Label>Blood Group</Label>
                        <Input name="bloodGroup" value={formData.bloodGroup || ""} onChange={handleChange} />
                        {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Emergency Contact</Label>
                        <Input name="emergencyContact" value={formData.emergencyContact || ""} onChange={handleChange} />
                        {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Medical History</Label>
                        <Textarea name="medicalHistory" value={formData.medicalHistory || ""} onChange={handleChange} />
                        {errors.medicalHistory && <p className="text-red-500 text-sm mt-1">{errors.medicalHistory}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Health Docs</Label>
                        <Input type="file" name="healthDocs" multiple onChange={handleChange} />
                        {errors.healthDocs && <p className="text-red-500 text-sm mt-1">{errors.healthDocs}</p>}
                      </div>
                    </motion.div>
                  )}

                  {step === 7 && (
                    <motion.div key="documents" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="ml-1">
                        <Label>Offer Letter</Label>
                        <Input type="file" name="offerLetter" multiple onChange={handleChange} />
                        {errors.offerLetter && <p className="text-red-500 text-sm mt-1">{errors.offerLetter}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>NDA Docs</Label>
                        <Input type="file" name="ndaDocs" multiple onChange={handleChange} />
                        {errors.ndaDocs && <p className="text-red-500 text-sm mt-1">{errors.ndaDocs}</p>}
                      </div>
                      <div className="ml-1">
                        <Label>Joining Date</Label>
                        <Input type="date" name="joiningDate" value={formData.joiningDate || ""} onChange={handleChange} />
                        {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
                      </div>
                      <div className="mr-1">
                        <Label>Department</Label>
                        <Input name="department" value={formData.department || ""} onChange={handleChange} />
                        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Additional Docs</Label>
                        <Input type="file" name="additionalDocs" multiple onChange={handleChange} />
                        {errors.additionalDocs && <p className="text-red-500 text-sm mt-1">{errors.additionalDocs}</p>}
                      </div>
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6 pt-4 border-t border-border">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="min-w-20 h-9">Back</Button>
                )}
                <div className="ml-auto space-x-2">
                  {step < totalSteps ? (
                    <Button type="button" onClick={handleNext} className="min-w-28 h-9 bg-orange-500 text-black hover:text-black">Save & Next</Button>
                  ) : (
                    <>
                      <Button type="submit" className="min-w-28 h-9 bg-emerald-600 hover:bg-emerald-700 text-white">
                        {docId ? "Update Application" : "Submit Application"}
                      </Button>
                      {docId && (
                        <Button type="button" variant="destructive" className="min-w-28 h-9" onClick={handleDelete}>Delete</Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
