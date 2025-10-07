import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [method, setMethod] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    if (method === "email") {
      try {
        const res = await fetch("http://localhost:3000/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Reset link sent. Check your email.");
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (err) {
        alert("Error sending reset link");
      }
    } else {
      // Navigate to OTP screen with email
      navigate("/otp-verification", { state: { email } });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f7fb] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md text-center"
      >
        <h2 className="text-3xl font-bold text-[#0a2b5c] mb-4">Forgot Password</h2>

        <p className="text-gray-600 text-sm mb-6">
          Choose how you'd like to reset your password
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`px-4 py-2 rounded-lg border ${
              method === "email"
                ? "bg-[#0a2b5c] text-white border-[#0a2b5c]"
                : "bg-white text-[#0a2b5c] border-[#0a2b5c]"
            } transition`}
          >
            Via Email Link
          </button>
          <button
            type="button"
            onClick={() => setMethod("otp")}
            className={`px-4 py-2 rounded-lg border ${
              method === "otp"
                ? "bg-[#0a2b5c] text-white border-[#0a2b5c]"
                : "bg-white text-[#0a2b5c] border-[#0a2b5c]"
            } transition`}
          >
            Via OTP
          </button>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a2b5c]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#0a2b5c] text-white py-2 rounded-lg hover:bg-[#08397a] transition font-semibold"
        >
          {method === "email" ? "Send Reset Link" : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
