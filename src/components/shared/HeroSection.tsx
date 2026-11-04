
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Leaf,
  Users,
  Radio,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1,200+",
    label: "Volunteers Joined",
  },
  {
    icon: CalendarDays,
    value: "150+",
    label: "Events Organized",
  },
  {
    icon: Leaf,
    value: "100+",
    label: "Communities Helped",
  },
  {
    icon: Radio,
    value: "120",
    label: "Live Events",
  },
];

const HeroSection = () => {
  return (
    <section className="mx-auto mb-12 max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">

      {/* Main Hero Container */}
      <div className="relative rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-6 transition-colors duration-300 dark:border-green-900/60 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950 lg:pb-32">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-green-200/30 blur-3xl dark:bg-green-500/10" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

        {/* Hero Grid */}
        <div className="relative grid items-center lg:grid-cols-2">

          {/* Left Content */}
          <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:py-20 lg:pl-14">

            {/* Brand Badge with Your Logo */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-green-200 bg-white/90 py-2 pl-2 pr-5 shadow-sm dark:border-green-800 dark:bg-gray-900/90">

              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-green-100 bg-white shadow-sm dark:border-green-800">
                <Image
                  src="/images/Logo.png"
                  alt="Helping Hands Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-1"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-green-900 dark:text-green-300">
                  Community Driven Initiative
                </p>
                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  Together We Make a Difference
                </p>
              </div>
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-green-950 dark:text-green-100 sm:text-5xl lg:text-6xl">
              Small Actions.
              <br />
              <span className="text-green-600 dark:text-green-400">
                Big Changes.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg">
              Together, we can make a difference. Join our community events,
              support those in need, and help build a greener and more
              compassionate tomorrow.
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">

              <Link
                href="/upcoming-events"
                className="group inline-flex items-center gap-3 rounded-full bg-green-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-900 hover:shadow-xl dark:bg-green-700 dark:hover:bg-green-600"
              >
                Explore Events

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/dashboard/create-event"
                className="group inline-flex items-center gap-2 rounded-full border border-green-700 bg-white/70 px-7 py-3.5 text-sm font-bold text-green-800 transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 dark:border-green-500 dark:bg-transparent dark:text-green-300 dark:hover:bg-green-950"
              >
                Create Event

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>

            {/* Trust Indicator */}
            <div className="mt-10 flex items-center gap-4 border-t border-green-200/70 pt-6 dark:border-green-800/70 lg:mb-8">

              {/* Community Icons */}
              <div className="flex -space-x-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-green-200 dark:border-gray-900 dark:bg-green-900">
                  <Users className="h-4 w-4 text-green-800 dark:text-green-200" />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-300 dark:border-gray-900 dark:bg-emerald-900">
                  <HeartHandshake className="h-4 w-4 text-green-900 dark:text-emerald-200" />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-lime-200 dark:border-gray-900 dark:bg-lime-900">
                  <Leaf className="h-4 w-4 text-green-800 dark:text-lime-200" />
                </div>

              </div>

              <div className="border-l border-green-300 pl-4 dark:border-green-800">
                <p className="text-sm font-bold text-green-950 dark:text-green-100">
                  Together We Grow
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Every small effort matters.
                </p>
              </div>

            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative min-h-[380px] px-5 pb-8 sm:min-h-[480px] sm:px-8 lg:min-h-[600px] lg:px-6 lg:py-8 lg:pr-8">

            <div className="relative h-[360px] overflow-hidden rounded-[1.8rem] border-4 border-white shadow-2xl shadow-green-950/15 dark:border-green-900 sm:h-[460px] lg:h-[550px]">

              <Image
                src="/images/Greens%20of%20Hope%20Food%20Distribution.png"
                alt="Helping Hands volunteers distributing food and essential supplies"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[72%_30%] transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 via-transparent to-transparent" />

            </div>

            {/* Floating Information Card */}
            <div className="absolute bottom-12 left-8 flex max-w-[270px] items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95 sm:bottom-16 sm:left-12 lg:bottom-16 lg:left-0">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950">
                <CheckCircle2 className="h-6 w-6 text-green-700 dark:text-green-400" />
              </div>

              <div>
                <p className="text-sm font-bold text-green-950 dark:text-green-100">
                  Every Act Counts
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Creating positive change together.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Floating Statistics Card */}
        <div className="relative z-20 mx-5 mt-2 sm:mx-8 lg:absolute lg:bottom-7 lg:right-6 lg:mt-0 lg:w-[68%]">

          <div className="rounded-[2rem] border border-green-100 bg-white/95 p-5 shadow-[0_20px_60px_-15px_rgba(22,101,52,0.25)] backdrop-blur-xl transition-all duration-300 dark:border-green-900 dark:bg-gray-900/95 sm:p-7 lg:p-8">

            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-3">

              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`group flex items-center gap-3 ${
                      index !== 0
                        ? "lg:border-l lg:border-green-200 lg:pl-4 dark:lg:border-green-800"
                        : ""
                    }`}
                  >

                    {/* Stat Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-green-700 group-hover:text-white dark:bg-green-950 dark:text-green-400 dark:group-hover:bg-green-700 dark:group-hover:text-white sm:h-14 sm:w-14">

                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />

                    </div>

                    {/* Stat Details */}
                    <div className="min-w-0">

                      <p className="text-xl font-extrabold tracking-tight text-green-800 dark:text-green-300 sm:text-2xl">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-gray-600 dark:text-gray-400 sm:text-sm">
                        {stat.label}
                      </p>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
