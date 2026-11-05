"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HeartHandshake,
  User,
  Mail,
  Image as ImageIcon,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const inputClasses =
    "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 dark:border-gray-700 dark:bg-[#101C16] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-emerald-500 dark:focus:bg-[#14251B] dark:focus:ring-emerald-500/10";

  const requirements = [
    { label: "At least one uppercase letter (A-Z)", valid: hasUppercase },
    { label: "At least one lowercase letter (a-z)", valid: hasLowercase },
    { label: "Minimum 6 characters length", valid: hasMinLength },
  ];

  // Register Handler
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      toast.error("Please fulfill all password requirements.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const user = Object.fromEntries(formData.entries()) as {
        name: string;
        email: string;
        password: string;
        photoURL: string;
      };

      const { data, error } = await authClient.signUp.email({
        name: user.name.trim(),
        email: user.email.trim(),
        password: user.password,
        image: user.photoURL.trim() || undefined,
      });

      if (error) {
        console.error("Register Error:", error);

        toast.error(
          error.message || "Registration failed. Please try again."
        );

        return;
      }

      if (data) {
        toast.success("Account created successfully! Welcome to Helping Hands.");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Registration Failed:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7f9] px-4 py-10 transition-colors duration-300 dark:bg-[#101C16]">
      <div className="w-full max-w-[420px] rounded-[22px] border border-gray-100 bg-white px-6 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-colors duration-300 sm:px-9 dark:border-gray-800 dark:bg-[#14251B] dark:shadow-black/20">

        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20 dark:bg-emerald-700 dark:shadow-emerald-900/30">
            <HeartHandshake size={23} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Create Account
          </h1>

          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Join the community and start driving social change
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-semibold text-gray-800 dark:text-gray-200"
            >
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Tanvir Ahmed"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-gray-800 dark:text-gray-200"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label
              htmlFor="photoURL"
              className="mb-1.5 block text-xs font-semibold text-gray-800 dark:text-gray-200"
            >
              Profile Photo URL
            </label>

            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

              <input
                id="photoURL"
                type="url"
                name="photoURL"
                placeholder="https://images.unsplash.com/..."
                className={inputClasses}
              />
            </div>

            <p className="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500">
              Optional: Leave empty for default avatar
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold text-gray-800 dark:text-gray-200"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
                required
                minLength={6}
                className={`${inputClasses} pr-11`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-teal-600 dark:text-gray-500 dark:hover:text-emerald-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-3 space-y-1.5">
              {requirements.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400"
                >
                  {item.valid ? (
                    <Check
                      size={12}
                      className="text-teal-600 dark:text-emerald-400"
                    />
                  ) : (
                    <X
                      size={12}
                      className="text-gray-400 dark:text-gray-600"
                    />
                  )}

                  <span
                    className={
                      item.valid
                        ? "text-teal-600 dark:text-emerald-400"
                        : "dark:text-gray-400"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={
              !hasUppercase ||
              !hasLowercase ||
              !hasMinLength ||
              loading
            }
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-700 dark:shadow-emerald-900/20 dark:hover:bg-emerald-600"
          >
            {loading ? "Creating Account..." : "Register"}

            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-teal-600 transition hover:text-teal-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}