// src/pages/EmployeeRegistration.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Role {
  roleId: number;
  name: string;
}

interface Department {
  departmentId: number;
  name: string;
}

interface Designation {
  designationId: number;
  title: string;
}

interface DecodedToken {
  role: string;
  [key: string]: any;
}

const EmployeeRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    roleId: "",
    departmentId: "",
    designationId: "",
    doj: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [rolesRes, deptRes, desgRes] = await Promise.all([
          axios.get("http://localhost:3000/roles/get_Roles", getAuthHeaders()),
          axios.get("http://localhost:3000/department/get_dept", getAuthHeaders()),
          axios.get("http://localhost:3000/designation/getDesg", getAuthHeaders()),
        ]);
        setRoles(rolesRes.data);
        setDepartments(deptRes.data);
        setDesignations(desgRes.data);
      } catch (err: any) {
        console.error("Dropdown fetch error:", err.response?.data || err.message);
        setError("Failed to load dropdowns. Check your token or server.");
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/employees/createEmp", formData, getAuthHeaders());
      setSuccess("Employee registered successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        roleId: "",
        departmentId: "",
        designationId: "",
        doj: "",
      });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-pink-800 mb-6">
          Register New Employee
        </h2>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}
        {success && <p className="text-center text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />

          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleId}>
                {role.name}
              </option>
            ))}
          </select>

          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            name="designationId"
            value={formData.designationId}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Designation</option>
            {designations.map((desig) => (
              <option key={desig.designationId} value={desig.designationId}>
                {desig.title}
              </option>
            ))}
          </select>

          <input
            name="doj"
            type="date"
            value={formData.doj}
            onChange={handleChange}
            className="input-field"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-xl transition-all duration-300"
          >
            Register Employee
          </button>
        </form>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #f0a6a6;
          border-radius: 0.5rem;
          outline: none;
          font-size: 0.95rem;
          background-color: #fff0f0;
          color: #2b0c0e;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #f56b6b;
          box-shadow: 0 0 0 3px rgba(245, 107, 107, 0.2);
          background-color: #fff;
        }
        .input-field::placeholder {
          color: #ac8c8c;
        }
      `}</style>
    </div>
  );
};

export default EmployeeRegistration;
