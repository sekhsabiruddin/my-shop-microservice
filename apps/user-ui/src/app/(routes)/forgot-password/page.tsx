"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordFormInputs>({
    mode: "onChange", // validates on change
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
    console.log("Reset link sent to:", data.email);
    // Example: call your API
    // fetch("/api/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <h2 className="text-xl font-medium mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email below and we’ll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-6 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full px-3 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors mb-6 
              ${
                isValid
                  ? "bg-[#773d4c] text-white "
                  : "bg-[#d6c5ca] text-white cursor-not-allowed"
              }`}
          >
            {isSubmitting ? "Sending..." : "SEND RESET LINK"}
          </button>
        </form>

        {/* Back to Login */}
        <Link href="/login" className="text-sm text-[#773d4c] hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
