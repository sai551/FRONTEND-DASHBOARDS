import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Roles & Role → Dashboard mapping
export const Roles = {
  CEO: "CEO",
  BranchManager: "Branch Manager",
  Director: "Director",
  GeneralManager: "General Manager",
  ProductManager: "Product Manager",
  OperationsManager: "Operations Manager",
  Employee: "Employee",
  TeamLead: "Team Lead",
  Intern: "Intern"

};

export const roleRoutes: Record<string, string> = {
  [Roles.CEO]: "/dashboard",
  [Roles.BranchManager]: "/dashboardBR",
  [Roles.GeneralManager]: "/gm/dashboard",
  [Roles.Director]: "/overview",
  [Roles.ProductManager]: "/products",
  [Roles.OperationsManager]: "/",
  [Roles.TeamLead]: "/teamleaddashboard",
  [Roles.Employee]: "/emp/dashboard",
  [Roles.Intern]: "/InternDashboard"
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        navigate(roleRoutes[decoded.role] || "/login", { replace: true });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const role = decoded.role;
      console.log("User role:", role);

      navigate(roleRoutes[role] || "/login", { replace: true });
      setSuccess("Login successful!");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0e3cf] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <img src="/logo.jpeg" alt="CamelQ Logo" className="w-24 mx-auto" />
        <h2 className="text-center text-2xl font-bold text-[#be2350]">
          Login to Your Account
        </h2>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#be2350]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#be2350]"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#be2350] text-white rounded-md font-semibold hover:bg-[#a01e43] transition-colors duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-700">
          <a href="/forgot-password" className="hover:underline text-[#be2350]">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
