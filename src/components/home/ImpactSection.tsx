"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Mail, Sparkles } from "lucide-react";

export default function ImpactSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
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
    <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950 text-slate-100 min-h-[500px] flex items-center justify-center p-4">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative w-full max-w-3xl mx-auto">
        {/* Main Glassmorphism Card */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-2xl p-8 sm:p-12 md:p-16 shadow-2xl shadow-emerald-950/20 overflow-hidden">
          {/* Subtle Ambient Glow Border */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="text-center max-w-xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Stay Connected</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Subscribe to <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Local Cause Alerts
              </span>
            </h2>

            {/* Description */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Get notified when new winter drives, blanket distributions, or
              emergency cleanups are organized in your neighborhood.
            </p>

            {/* Form / Success Message */}
            {status === "success" ? (
              <div className="py-4 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center gap-3 text-emerald-400 font-medium animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  You&apos;re on the list! We&apos;ll keep you updated on local
                  causes.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-300">
                  {/* Email Input */}
                  <div className="relative w-full flex items-center">
                    <Mail className="absolute left-4 w-5 h-5 text-slate-500 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-70 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer Trust Text */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
              <span>No spam guaranteed. Unsubscribe at any time.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
