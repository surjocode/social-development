
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HeartHandshake,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const inputClasses =
    "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10";

  const handleLoginIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      console.log("Login Error:", error);
      return;
    }

    if (data) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7f9] px-4 py-10">
      {/* Login Card */}
      <div className="w-full max-w-[380px] rounded-2xl border border-gray-100 bg-white px-6 py-7 shadow-xl shadow-gray-200/70 sm:px-8">

        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b99f] to-[#078b80] text-white shadow-md">
            <HeartHandshake size={23} />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-xs text-gray-500">
            Sign in to organize and join community drives
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginIn} className="space-y-4">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold text-gray-800"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="w-full rounded-xl border border-gray-200 bg-[#f8fafb] py-3 pl-10 pr-4 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#11998e] focus:ring-2 focus:ring-[#11998e]/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-bold text-gray-800"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-[11px] font-semibold text-[#11998e] hover:text-[#087f75]"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-gray-200 bg-[#f8fafb] py-3 pl-10 pr-11 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#11998e] focus:ring-2 focus:ring-[#11998e]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#11998e] py-3 text-sm font-bold text-white shadow-md shadow-teal-100 transition hover:bg-[#087f75]"
          >
            Sign In
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-[10px] font-medium text-gray-500">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-50"
        >
          <svg
            viewBox="0 0 48 48"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1 1 32 15.2l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.3-.4-3.5Z"
            />
            <path
              fill="#FF3D00"
              d="m6.3 14.7 6.6 4.8A12 12 0 0 1 32 15.2l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
            />
            <path
              fill="#4CAF50"
              d="M24 44a20 20 0 0 0 13.5-5.2l-6.2-5.2A12 12 0 0 1 12.9 28l-6.6 5A20 20 0 0 0 24 44Z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4 5.6l6.2 5.2A20 20 0 0 0 44 24c0-1.2-.1-2.3-.4-3.5Z"
            />
          </svg>

          Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-[#11998e] transition hover:text-[#087f75]"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
