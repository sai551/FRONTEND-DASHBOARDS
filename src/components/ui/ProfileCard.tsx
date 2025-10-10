

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Key } from "lucide-react"; // Use Key icon for password
import EditProfile from "@/pages/ceo/EditProfile";


type BankDetails = {
  bank_name: string;
  accountNumber: string;
  ifsc_code: string;
  branch_name: string;
};

type PfDetails = {
  uan_number: string;
  pf_number: string;
  esi_number: string;
  nominee_name: string;
  nominee_relation: string;
};

type PersonalDetails = {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_number: string;
  aadhaarNumber?: string;
  panNumber?: string;
  licenseNumber?: string;
  passportNumber?: string;
  marrital_status?: string;
  bloodGroup?: string;
  dob?: string;
  gender?: string;
  nationality?: string;
};

type EmployeeDetails = {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: string;
  department?: string;
  designation?: string;
  branch?: string;
  doj?: string;
  status?: string;
  employmentType?: string;
  profilePhoto?: string;
  work_shift?: string;
};

type ProfileCardProps = {
  profileImage?: string;
  employee: EmployeeDetails;
  personal?: PersonalDetails;
  bank?: BankDetails;
  pf?: PfDetails;
  stats?: {
    projects: number | string;
    hires: number | string;
    rating: string;
    years: number | string;
  };
  onChangePhoto?: () => void;
};

export default function ProfileCard({
  profileImage,
  employee,
  personal,
  bank,
  pf,
  stats,
  onChangePhoto,
}: ProfileCardProps) {
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);

  const renderField = (label: string, value?: string) => (
    <div className="flex gap-2">
      <span className="font-semibold text-muted-foreground">{label}:</span>
      <span className="text-foreground">{value || "—"}</span>
    </div>
  );

  const fullAddress = [
    personal?.address,
    personal?.city,
    personal?.state,
    personal?.country,
    personal?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-foreground mb-4">My Profile</h1>

      {/* Profile Info */}
      <Card className="shadow-md">
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <Avatar className="h-28 w-28">
              {profileImage || employee.profilePhoto ? (
                <AvatarImage src={profileImage || employee.profilePhoto} alt="Profile" />
              ) : (
                <AvatarFallback>
                  {employee.firstName?.[0]}
                  {employee.lastName?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={onChangePhoto}
            >
              Change Photo
            </Button>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="text-muted-foreground">{employee.designation}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" /> {employee.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> {employee.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {employee.branch || "Not Assigned"}
            </div>
          </div>

          {/* Edit Password Button */}
          <div className="self-center md:self-start">
            
          {/* Edit Password Dialog */}
          {<EditProfile employeeId={employee.employeeId} />}
          </div>
        </CardContent>
      </Card>

      {/* Personal & Employment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {renderField("DOB", personal?.dob)}
            {renderField("Gender", personal?.gender)}
            {renderField("Blood Group", personal?.bloodGroup)}
            {renderField("Nationality", personal?.nationality)}
            {renderField("Marital Status", personal?.marrital_status)}
            {renderField("Address", fullAddress)}

            {/* Emergency Contact Dropdown */}
            <details className="border rounded p-2 mt-2">
              <summary className="font-semibold cursor-pointer">Emergency Contact</summary>
              <div className="mt-2 space-y-1">
                {renderField("Name", personal?.emergency_contact_name)}
                {renderField("Relation", personal?.emergency_contact_relation)}
                {renderField("Number", personal?.emergency_contact_number)}
              </div>
            </details>

            {/* ID Proofs Dropdown */}
            <details className="border rounded p-2 mt-2">
              <summary className="font-semibold cursor-pointer">ID Proofs</summary>
              <div className="mt-2 space-y-1">
                {renderField("Aadhaar Number", personal?.aadhaarNumber)}
                {renderField("PAN Number", personal?.panNumber)}
                {renderField("License Number", personal?.licenseNumber)}
                {renderField("Passport Number", personal?.passportNumber)}
              </div>
            </details>
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {renderField("Employee ID", employee.employeeId)}
            {renderField("Department", employee.department)}
            {renderField("Designation", employee.designation)}
            {renderField("Joining Date", employee.doj)}
            {renderField("Status", employee.status)}
            {renderField("Employment Type", employee.employmentType)}
            {renderField("Work Shift", employee.work_shift)}
          </CardContent>
        </Card>
      </div>

      {/* Bank & PF Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bank && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderField("Bank Name", bank.bank_name)}
              {renderField("Account Number", bank.accountNumber)}
              {renderField("IFSC Code", bank.ifsc_code)}
              {renderField("Branch Name", bank.branch_name)}
            </CardContent>
          </Card>
        )}

        {pf && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>PF / ESIC Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderField("UAN Number", pf.uan_number)}
              {renderField("PF Number", pf.pf_number)}
              {renderField("ESI Number", pf.esi_number)}
              {renderField("Nominee Name", pf.nominee_name)}
              {renderField("Nominee Relation", pf.nominee_relation)}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Stats */}
      {stats && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xl font-bold text-foreground">{stats.projects}</p>
              <p className="text-muted-foreground text-sm">Projects Managed</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stats.hires}</p>
              <p className="text-muted-foreground text-sm">Candidates Hired</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stats.rating}</p>
              <p className="text-muted-foreground text-sm">Performance Rating</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stats.years}</p>
              <p className="text-muted-foreground text-sm">Years in Company</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
