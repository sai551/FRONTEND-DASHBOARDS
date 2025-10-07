import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role_id: string;
  departmentId: string;
  designationId: string;
  doj: string;
  status: string;
  profilePhoto: string;
}

interface DecodedToken {
  role: string;
  [key: string]: any;
}

export default function RegisterEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role_id: '',
    departmentId: '',
    designationId: '',
    doj: '',
    status: 'active',
    profilePhoto: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return ;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role !== 'CEO') {
        alert('Only CEO can register employees!');
        navigate('/login');
      }
    } catch (err) {
      console.error('Invalid token');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:3000/employees/createEmp',
        formData,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Employee registered successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role_id: '',
        departmentId: '',
        designationId: '',
        doj: '',
        status: 'active',
        profilePhoto: '',
      });
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        'Registration failed. Please ensure you are logged in as CEO.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f8] px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#2b0c0e] mb-6">
          Register New Employee
        </h2>

        {error && <p className="text-center text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-center text-green-600 text-sm mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input-field"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Role</option>
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
              <option value="product_manager">Product Manager</option>
              <option value="intern">Intern</option>
              <option value="team_lead">Team Lead</option>
            </select>
            <input
              name="departmentId"
              placeholder="Department ID"
              value={formData.departmentId}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              name="designationId"
              placeholder="Designation ID"
              value={formData.designationId}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              name="doj"
              type="date"
              placeholder="Date of Joining"
              value={formData.doj}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <input
            name="profilePhoto"
            placeholder="Profile Photo URL"
            value={formData.profilePhoto}
            onChange={handleChange}
            className="input-field"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#7a2d35] hover:bg-[#c46565] text-white font-semibold rounded-md transition-all duration-300"
          >
            Register Employee
          </button>
        </form>
      </div>

      {/* Input Styles */}
      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 1rem;
          background-color: #fdf0f0;
          color: #2b0c0e;
          border: 1px solid #d2b1b1;
          border-radius: 0.375rem;
          outline: none;
          font-size: 0.95rem;
        }
        .input-field::placeholder {
          color: #ac8c8c;
        }
        .input-field:focus {
          border-color: #7a2d35;
          background-color: #fff;
        }
      `}</style>
    </div>
  );
}
