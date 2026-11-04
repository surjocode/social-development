
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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-[#f8fafb] py-3 pl-10 pr-4 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#11998e] focus:ring-2 focus:ring-[#11998e]/10 dark:border-gray-700 dark:bg-[#101C16] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/10";

  const handleLoginIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        console.log("Login Error:", error);
        setErrorMessage(error.message || "Login failed. Please try again.");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Login Error:", error);
      setErrorMessage("Google login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7f9] px-4 py-10 transition-colors duration-300 dark:bg-[#101C16]">
      {/* Login Card */}
      <div className="w-full max-w-[380px] rounded-2xl border border-gray-100 bg-white px-6 py-7 shadow-xl shadow-gray-200/70 transition-colors duration-300 sm:px-8 dark:border-gray-800 dark:bg-[#14251B] dark:shadow-black/20">

        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b99f] to-[#078b80] text-white shadow-md dark:from-emerald-600 dark:to-emerald-800">
            <HeartHandshake size={23} />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Sign in to organize and join community drives
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginIn} className="space-y-4">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold text-gray-800 dark:text-gray-200"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-bold text-gray-800 dark:text-gray-200"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-[11px] font-semibold text-[#11998e] hover:text-[#087f75] dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className={`${inputClasses} pr-11`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:text-gray-500 dark:hover:text-emerald-400"
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:border dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#11998e] py-3 text-sm font-bold text-white shadow-md shadow-teal-100 transition hover:bg-[#087f75] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-700 dark:shadow-emerald-900/20 dark:hover:bg-emerald-600"
          >
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-[#182820] dark:text-gray-200 dark:hover:bg-[#20382A]"
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
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-[#11998e] transition hover:text-[#087f75] dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
