import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // comes from OTP flow
  const token = new URLSearchParams(window.location.search).get("token"); // comes from email link

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
    await axios.post("http://localhost:3000/auth/reset-password", {
        email,
        token,
        newPassword: password,
      });

      alert("Password reset successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      console.error("Reset error:", err);
      alert(
        err.response?.data?.message || "Failed to reset password. Try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f7fb] px-4">
      <form
        onSubmit={handleReset}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md text-center"
      >
        <h2 className="text-3xl font-bold text-[#0a2b5c] mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a2b5c]"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a2b5c]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#0a2b5c] text-white py-2 rounded-lg hover:bg-[#08397a] transition font-semibold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
