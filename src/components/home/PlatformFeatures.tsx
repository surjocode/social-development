
"use client";

import {
  Users,
  CalendarCheck,
  ShieldCheck,
  Compass,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community-Led Drives",
    description:
      "Every citizen can organize cleanups, winter drives, and food distributions in their local area in minutes.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    icon: CalendarCheck,
    title: "One-Click Participation",
    description:
      "Join verified social initiatives with a single click and coordinate directly with local volunteer leaders.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/50",
  },
  {
    icon: ShieldCheck,
    title: "Creator Controls",
    description:
      "Manage, update, and track participation for your own initiatives with built-in creator authorization.",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/50",
  },
  {
    icon: Compass,
    title: "Upcoming Only Discovery",
    description:
      "Discover upcoming community activities and find meaningful opportunities where your help matters most.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/50",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-5 py-20 transition-colors duration-300 dark:bg-[#101C16] md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-900/20" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl dark:bg-teal-900/20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
            Platform Features
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Built for{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Grassroots
            </span>{" "}
            Action
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            A frictionless platform connecting compassionate citizens with
            direct local community initiatives.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 dark:border-slate-700 dark:bg-[#182820] dark:hover:border-emerald-800 dark:hover:shadow-black/20"
              >
                {/* Icon & Number */}
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>

                  <span className="text-sm font-semibold text-slate-300 dark:text-slate-600">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>

                {/* Bottom Text */}
                <div className="mt-6 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Make an impact</span>

                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
