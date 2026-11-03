import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Leaf,
  Sprout,
  Users,
} from "lucide-react";

const stats = [
  { icon: Users, value: "1,200+", label: "Volunteers Joined" },
  { icon: CalendarDays, value: "80+", label: "Events Organized" },
  { icon: Leaf, value: "50+", label: "Communities Helped" },
];

const HeroSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative grid items-center lg:grid-cols-2">
          {/* Hero Content */}
          <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-20 lg:py-24 lg:pl-14">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold tracking-wide text-green-800 sm:text-sm">
                Community Driven Initiative
              </span>
            </div>

            {/* Decorative Icons */}
            <div className="mb-5 flex items-center gap-2">
              <Sprout className="h-9 w-9 -scale-x-100 text-green-700" />
              <Leaf className="h-5 w-5 -translate-y-3 text-green-500" />
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.15] tracking-tight text-green-950 sm:text-5xl lg:text-6xl">
              Small Actions.
              <br />
              <span className="text-green-600">Big Changes.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-base leading-8 text-gray-600 sm:text-lg">
              Together, we can make a difference. Join our community events,
              support those in need, and help build a greener and more
              compassionate tomorrow.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/upcoming-events"
                className="group inline-flex items-center gap-3 rounded-full bg-green-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/15 transition-all duration-300 hover:-translate-y-1 hover:bg-green-900 hover:shadow-xl"
              >
                Explore Events
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 rounded-full border border-green-700 px-7 py-3.5 text-sm font-bold text-green-800 transition hover:bg-green-50"
              >
                Create Event
                <ArrowRight size={16} />
              </Link>

              <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
                <HeartHandshake className="h-5 w-5" />
                Make a Difference
              </div>
            </div>

            {/* Trust Indicator */}
            <div className="mt-10 flex items-center gap-3 border-t border-green-200/70 pt-6">
              <div className="flex -space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green-200">
                  <Users className="h-4 w-4 text-green-800" />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-300">
                  <HeartHandshake className="h-4 w-4 text-green-900" />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-lime-200">
                  <Leaf className="h-4 w-4 text-green-800" />
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-green-950">
                  Together We Grow
                </p>
                <p className="text-xs text-gray-500">
                  Every small effort matters.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative min-h-[360px] px-5 pb-8 sm:min-h-[460px] sm:px-8 lg:min-h-[600px] lg:px-6 lg:py-8 lg:pr-8">
            <div className="relative h-[340px] overflow-hidden rounded-[1.7rem] shadow-2xl shadow-green-950/15 sm:h-[440px] lg:h-full lg:min-h-[540px]">
              <Image
                src="/images/Greens%20of%20Hope%20Food%20Distribution.png"
                alt="Helping Hands volunteers distributing food and essential supplies"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[72%_30%] transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-green-950/35 via-transparent to-transparent" />
            </div>

            {/* Floating Information Card */}
            <div className="absolute bottom-12 left-8 flex max-w-[270px] items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:bottom-16 sm:left-12 lg:bottom-16 lg:left-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-700" />
              </div>

              <div>
                <p className="text-sm font-bold text-green-950">
                  Every Act Counts
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Creating positive change together.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="relative border-t border-green-100 bg-white/75 px-6 py-8 backdrop-blur-sm sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex items-center justify-center gap-4 sm:justify-start"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-green-950">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-gray-500 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
