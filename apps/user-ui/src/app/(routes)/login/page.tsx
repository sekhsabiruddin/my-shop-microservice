"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface LoginFormInputs {
  email: string;
  password: string;
  agreed: boolean;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // 🔑 Axios login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInputs) =>
      axios.post("http://localhost:8080/api/login", data, {
        withCredentials: true,
      }),
    onSuccess: (res) => {
      const { accessToken, user } = res.data;
      // console.log("Login success ✅:", user);
      // sessionStorage.setItem("accessToken", accessToken);
      router.push("/");
      toast.success("Welcome back, " + user.name);
    },
    onError: (err: unknown) => {
      const axiosError = err as AxiosError<any>;
      const message =
        axiosError?.response?.data?.error?.message || "Something went wrong";

      toast.error(message);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    if (!agreed) {
      alert("Please agree to terms and privacy policy.");
      return;
    }
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Login</h1>
          <p className="text-sm text-gray-600">
            To access account and build your profile
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-3 py-3 border rounded-md text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className={`w-full px-3 py-3 border rounded-md text-sm pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <Link href="/forgot-password" className="text-sm">
              Forgot password?
            </Link>
          </div>

          {/* Terms */}
          <div className="mb-6">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <span>
                By continuing, you agree to our{" "}
                <a href="#" className="text-purple-700 hover:underline">
                  Terms of use
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-700 hover:underline">
                  Privacy policy
                </a>
                .
              </span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-[#773d4c] text-white py-3 px-4 rounded-md font-medium hover:bg-purple-800 transition-colors mb-6"
          >
            {loginMutation.isPending ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
