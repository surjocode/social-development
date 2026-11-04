
"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Sparkles,
} from "lucide-react";

export default function ImpactSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-slate-50 p-4 py-16 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:py-24">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-emerald-300/30 to-teal-300/30 blur-[120px] dark:from-emerald-500/20 dark:to-teal-500/20" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#64748b18_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)]" />

      <div className="relative mx-auto w-full max-w-3xl">
        {/* Main Glassmorphism Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-emerald-900/5 backdrop-blur-2xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-emerald-950/20 sm:p-12 md:p-16">
          {/* Subtle Ambient Glow Border */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-xl space-y-6 text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Stay Connected</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Subscribe to <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
                Local Cause Alerts
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Get notified when new winter drives, blanket distributions, or
              emergency cleanups are organized in your neighborhood.
            </p>

            {/* Form / Success Message */}
            {status === "success" ? (
              <div className="flex animate-in items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 font-medium text-emerald-700 duration-300 fade-in zoom-in-95 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>
                  You&apos;re on the list! We&apos;ll keep you updated on local
                  causes.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2">
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100/80 p-2 transition-all duration-300 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-950/80 sm:flex-row">
                  {/* Email Input */}
                  <div className="relative flex w-full items-center">
                    <Mail className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent py-3 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder-slate-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-700 hover:shadow-emerald-500/30 active:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 dark:active:bg-emerald-600 sm:w-auto"
                  >
                    {status === "loading" ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-slate-950 dark:border-t-transparent" />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer Trust Text */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600/80 dark:text-emerald-500/70" />
              <span>No spam guaranteed. Unsubscribe at any time.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
