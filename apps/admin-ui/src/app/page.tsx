"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex h-screen items-center justify-center bg-[#0f1113] text-white">
      <div className="w-full max-w-md rounded-2xl bg-[#1a1d21] shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <div className="flex items-center gap-2 rounded-lg bg-[#2a2d31] px-3 py-2">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <div className="flex items-center gap-2 rounded-lg bg-[#2a2d31] px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
