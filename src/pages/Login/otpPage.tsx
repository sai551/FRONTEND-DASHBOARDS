import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_EndPoints } from "@/Config/Api_Endpoints";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) setDisabled(false);
  }, [timer]);

  if (!email) {
    alert("Email not found. Please go back and enter your email.");
    navigate("/forgot-password");
    return null;
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) return alert("Please enter OTP and new password");

    setDisabled(true);
    setTimer(30);

    try {
      const res = await axios.post(Api_EndPoints.RESET_PASSWORD_OTP, {
        email,
        otp,
        newPassword,
      });

      alert(res.data.message || "Password reset successful!");
      navigate("/login");
    } catch (err: any) {
      setDisabled(false);
      setMessage(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f7fb] px-4">
      <form
        onSubmit={handleResetPassword}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md text-center"
      >
        <h2 className="text-3xl font-bold text-[#0a2b5c] mb-4">Verify OTP & Reset Password</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter the OTP sent to <span className="font-semibold">{email}</span> and set your new password.
        </p>

        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a2b5c]"
          required
        />

        {/* New Password Input */}
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a2b5c]"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0a2b5c] hover:bg-[#08397a] text-white"
          }`}
        >
          {disabled ? `Wait ${timer}s` : "Reset Password"}
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
}
