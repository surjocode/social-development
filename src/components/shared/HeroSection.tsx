      import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
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
    <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-green-100/70 via-green-50 to-white sm:mx-4 lg:mx-auto">
      <div className="relative lg:grid lg:grid-cols-2">
        {/* City skyline decoration */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 h-28 w-full max-w-2xl text-white/70 sm:w-2/3"
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 60 H0 V38 h7 v-10 h5 v10 h8 V26 h4 v-6 h3 v6 h6 v12 h8 V34 h7 V22 h4 v12 h6 v24 h6 V30 h5 v-8 h6 v8 h7 V18 h5 v12 h8 V40 h7 v20 h5 V32 h6 V24 h4 v8 h6 v28 h8 V42 h6 v18 h7 V34 h5 v26 h9 V46 h6 v14 h8 V36 h5 v24 h9 V48 h7 v12 H0 Z" />
        </svg>

        {/* Copy */}
        <div className="relative z-10 flex max-w-xl flex-col justify-center px-6 py-14 sm:px-10 lg:py-24 lg:pl-14">
          <div className="mb-4 flex items-center gap-1" aria-hidden="true">
            <Sprout className="h-9 w-9 -scale-x-100 text-green-700" />
            <Leaf className="h-5 w-5 -translate-y-3 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-green-950 sm:text-5xl lg:text-6xl">
            Small Actions.
            <br />
            <span className="text-green-600">Big Changes.</span>
          </h1>

          <p className="mt-5 max-w-sm text-base text-foreground/70">
            Join our community events to support the needy and build a
            greener tomorrow.
          </p>

          <Link
            href="/upcoming-events"
            className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-900"
          >
            Explore Events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Photo */}
        <div className="relative mt-4 h-64 sm:h-80 lg:mt-0 lg:h-auto lg:min-h-[520px]">
          <Image
            src="/images/Greens%20of%20Hope%20Food%20Distribution.png"
            alt="Helping Hands volunteers handing out food and essential supplies to community members"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[72%_30%]"
          />

          {/* Blend the photo into the light background */}
          <div
            className="absolute inset-y-0 left-0 hidden w-36 bg-gradient-to-r from-green-50 to-transparent lg:block"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Stats pill */}
      <div className="relative z-10 mx-auto -mt-12 mb-6 w-fit max-w-[calc(100%-3rem)] rounded-2xl border border-border/60 bg-white/95 px-6 py-4 shadow-lg backdrop-blur sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex items-center gap-3 ${
                  index > 0
                    ? "sm:ml-8 sm:border-l sm:border-border sm:pl-8"
                    : ""
                }`}
              >
                <Icon
                  className="h-7 w-7 shrink-0 text-green-800"
                  aria-hidden="true"
                />

                <div>
                  <p className="text-lg font-bold leading-tight text-green-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
