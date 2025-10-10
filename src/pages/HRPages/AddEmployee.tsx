

import api from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";

function AddEmployee() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passwordHash: "",
    role: "",
    department: "",
    designation: "",
    branch: "",
    dob: "",
    doj: "",
    employmentType: "",
    workshift: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    aadhaarNumber: "",
    panNumber: "",
    licenseNumber: "",
    passportNumber: "",
    marrital_status: "",
    bloodGroup: "",
    gender: "",
    bank_name: "",
    accountNumber: "",
    ifsc_code: "",
    branch_name: "",
    emergency_contact_name: "",
    emergency_contact_relation: "",
    emergency_contact_number: "",
    Specification: "",
    stream: "",
    institution: "",
    yearOfPassing: "",
    CGPA: "",
    previouscompanyName: "",
    previousdesignation: "",
    startDate: "",
    endDate: "",
    experienceYears: "",
    responsibilities: "",
    skillsUsed: "",
  };

  const [employees, setEmployees] = useState<any[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [viewEmployee, setViewEmployee] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [designations, setDesignations] = useState<{ id: number; title: string }[]>([]);
  const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<{ id: number; name: string }[]>([]);
  const [marritalStatus, setmarritalStatus] = useState<{ id: number; name: string }[]>([]);
  const [genders, setgenders] = useState<{ id: number; name: string }[]>([]);
  const [bloodGroups, setbloodGroups] = useState<{ id: number; name: string }[]>([]);
  const [workshifts, setWorkshifts] = useState<{ id: number; name: string }[]>([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || "";
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees", getAuthHeaders());
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();

    axios
      .get("http://localhost:3000/roles/get_Roles", getAuthHeaders())
      .then((res) => setRoles(res.data.map((r: any) => ({ id: r.roleId, name: r.name }))))
      .catch(() => setRoles([{ id: 1, name: "Default Role" }]));

    axios
      .get("http://localhost:3000/department/get_dept", getAuthHeaders())
      .then((res) => setDepartments(res.data.map((d: any) => ({ id: d.departmentId, name: d.name }))))
      .catch(() => setDepartments([{ id: 1, name: "Default Dept" }]));

    axios
      .get("http://localhost:3000/designation/getDesg", getAuthHeaders())
      .then((res) => setDesignations(res.data.map((desg: any) => ({ id: desg.designationId, title: desg.title }))))
      .catch(() => setDesignations([{ id: 1, title: "Employee" }]));

    axios
      .get("http://localhost:3000/branches/getAllBranches", getAuthHeaders())
      .then((res) => setBranches(res.data.map((b: any) => ({ id: b.branchId, name: b.name }))))
      .catch(() => setBranches([{ id: 1, name: "Main Branch" }]));

    axios
      .get("http://localhost:3000/enums/employment_type", getAuthHeaders())
      .then((res) => setEmploymentTypes(res.data))
      .catch(() => setEmploymentTypes([{ id: 1, name: "Full-time" }]));

    axios
      .get("http://localhost:3000/enums/work_shift", getAuthHeaders())
      .then((res) => setWorkshifts(res.data))
      .catch(() => setWorkshifts([{ id: 1, name: "Morning" }]));

    axios
      .get("http://localhost:3000/enums/marriageStatus", getAuthHeaders())
      .then((res) => setmarritalStatus(res.data))
      .catch(() => setmarritalStatus([{ id: 1, name: "Unmarried" }]));

    axios
      .get("http://localhost:3000/enums/blood_group", getAuthHeaders())
      .then((res) => setbloodGroups(res.data))
      .catch(() => setbloodGroups([{ id: 1, name: "O+" }]));

    axios
      .get("http://localhost:3000/enums/gender", getAuthHeaders())
      .then((res) => setgenders(res.data))
      .catch(() => setgenders([{ id: 1, name: "Male" }]));
  }, []);

  const handleAddEmployee = async (e: any) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.role) {
      return alert("Please fill all required fields!");
    }
    try {
      await api.post("/employees/createEmp", form, getAuthHeaders());
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateEmployee = async (e: any) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    try {
      await api.put(`/employees/${selectedEmployee.id}`, form, getAuthHeaders());
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`, getAuthHeaders());
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (emp: any) => {
    setSelectedEmployee(emp);
    setForm(emp);
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleView = (emp: any) => setViewEmployee(emp);

  const resetForm = () => {
    setForm(initialFormState);
    setSelectedEmployee(null);
    setIsEditMode(false);
  };

  const fieldPlaceholders: Record<string, string> = {
    firstName: "e.g., Mahesh",
    lastName: "e.g., Erukulla",
    email: "e.g., camelq@gmail.com",
    phone: "e.g., 9876543210",
    passwordHash: "e.g., ********",
    address: "e.g., 123 Street Name",
    city: "e.g., Hyderabad",
    state: "e.g., Telangana",
    country: "e.g., India",
    pincode: "e.g., 500081",
    aadhaarNumber: "e.g., 1234 5678 9012",
    panNumber: "e.g., ABCDE1234F",
    licenseNumber: "e.g., TS14 20201234567",
    passportNumber: "e.g., N1234567",
    bank_name: "e.g., SBI",
    accountNumber: "e.g., 123456789012",
    ifsc_code: "e.g., SBIN0000123",
    branch_name: "e.g., Main Branch",
    emergency_contact_name: "e.g., Ramesh Kumar",
    emergency_contact_relation: "e.g., Father",
    emergency_contact_number: "e.g., 9876543210",
    Specification: "e.g., Computer Science",
    stream: "e.g., Engineering",
    institution: "e.g., IIIT DELHI",
    yearOfPassing: "e.g., 2022",
    CGPA: "e.g., 8.5",
    previouscompanyName: "e.g., CamelQ Software Solutions Pvt Ltd.",
    previousdesignation: "e.g., Software Engineer",
    experienceYears: "e.g., 2",
    responsibilities: "e.g., API Development",
    skillsUsed: "e.g., React, NestJS, PostgreSQL",
  };

  const fieldLabels: Record<string, string> = {
    ...Object.keys(initialFormState).reduce((acc, key) => ({ ...acc, [key]: key }), {}),
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone Number",
    passwordHash: "Password",
    role: "Role",
    department: "Department",
    designation: "Designation",
    branch: "Branch",
    dob: "Date of Birth",
    doj: "Date of Joining",
    employmentType: "Employment Type",
    workshift: "Work Shift",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "Pincode",
    aadhaarNumber: "Aadhaar Number",
    panNumber: "PAN Number",
    licenseNumber: "License Number",
    passportNumber: "Passport Number",
    marrital_status: "Marital Status",
    bloodGroup: "Blood Group",
    gender: "Gender",
    bank_name: "Bank Name",
    accountNumber: "Account Number",
    ifsc_code: "IFSC Code",
    branch_name: "Branch Name",
    emergency_contact_name: "Emergency Contact Name",
    emergency_contact_relation: "Emergency Contact Relation",
    emergency_contact_number: "Emergency Contact Number",
    Specification: "Specification",
    stream: "Stream",
    institution: "Institution",
    yearOfPassing: "Year of Passing",
    CGPA: "CGPA",
    previouscompanyName: "Previous Company Name",
    previousdesignation: "Previous Designation",
    startDate: "Start Date",
    endDate: "End Date",
    experienceYears: "Years of Experience",
    responsibilities: "Responsibilities",
    skillsUsed: "Skills Used",
  };

  const renderInputField = (key: string) => {
    const placeholder = fieldPlaceholders[key] || `Enter ${fieldLabels[key] || key}`;
    if (["dob", "doj", "startDate", "endDate"].includes(key)) {
      return (
        <input
          type="date"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );
    }
    if (
      ["role", "department", "designation", "branch", "employmentType", "workshift", "marrital_status", "bloodGroup", "gender"].includes(
        key
      )
    )
      return (
        <select
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {fieldLabels[key]}</option>
          {(key === "role" ? roles :
            key === "department" ? departments :
            key === "designation" ? designations :
            key === "branch" ? branches :
            key === "employmentType" ? employmentTypes :
            key === "workshift" ? workshifts :
            key === "marrital_status" ? marritalStatus :
            key === "bloodGroup" ? bloodGroups :
            genders
          ).map((item: any) => (
            <option key={item.id} value={item.name || item.title}>
              {item.name || item.title}
            </option>
          ))}
        </select>
      );

    return (
      <input
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-3 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Employees</h1>

      {/* Form */}
      <form
        onSubmit={isEditMode ? handleUpdateEmployee : handleAddEmployee}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-100 rounded-lg border border-gray-300 mb-10"
      >
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">{fieldLabels[key] || key}</label>
            {renderInputField(key)}
          </div>
        ))}
        <div className="col-span-1 md:col-span-3 flex gap-2 mt-2">
          <button
            type="submit"
            className={`flex-1 ${isEditMode ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded transition`}
          >
            {isEditMode ? "Update Employee" : "Add Employee"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="mb-2">
              <strong className="text-lg">
                {emp.firstName} {emp.lastName}
              </strong>
              <span className="text-sm text-gray-600 ml-2">({emp.roleName})</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">Email: {emp.email}</div>
            <div className="text-sm text-gray-600 mb-1">
              Phone: {emp.phone} | Branch: {emp.branchName} | Dept: {emp.departmentName} | Desig:{" "}
              {emp.designationName}
            </div>
            <div className="text-sm text-gray-600 mb-2">Skills: {emp.skillsUsed}</div>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleView(emp)}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
              >
                👁 View
              </button>
              <button
                onClick={() => handleEdit(emp)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(emp.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">
              {viewEmployee.firstName} {viewEmployee.lastName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(fieldLabels).map((key) => (
                <div key={key}>
                  <strong>{fieldLabels[key]}:</strong>{" "}
                  <span className="text-gray-700">{viewEmployee[key] || "N/A"}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewEmployee(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEmployee;
