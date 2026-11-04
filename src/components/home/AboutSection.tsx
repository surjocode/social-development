
import Image from "next/image";
import Link from "next/link";

import {
  HeartHandshake,
  Target,
  Eye,
  Users,
  ArrowRight,
  HandHeart,
  Leaf,
  Globe,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  Heart,
  CheckCircle2,
} from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Kindness First",
      description:
        "We believe every small act of kindness can create meaningful change.",
    },
    {
      icon: Users,
      title: "Community Together",
      description:
        "We bring passionate people together to build stronger communities.",
    },
    {
      icon: Leaf,
      title: "Positive Impact",
      description:
        "We encourage actions that support people, nature, and society.",
    },
  ];

  const activities = [
    "Discover meaningful community events",
    "Connect with passionate volunteers",
    "Participate in social initiatives",
    "Support people and local communities",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background px-4 py-20 transition-colors duration-300 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/20" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-300">
            <Sparkles size={16} />
            About Helping Hands
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Small Acts,{" "}
            <span className="text-green-700 dark:text-green-400">
              Big Changes
            </span>
            <br className="hidden sm:block" />
            Together We Make a Difference
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Helping Hands connects passionate volunteers with meaningful
            social initiatives. Together, we can spread kindness, support
            communities, protect our environment, and create a better
            tomorrow.
          </p>
        </div>

        {/* Main About Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Side - Brand Showcase */}
          <div className="relative">

            <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-100 p-7 shadow-xl shadow-green-900/5 dark:border-green-900/60 dark:from-[#14251B] dark:via-[#182820] dark:to-[#1C3527] sm:p-10">

              {/* Decorative Circles */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[25px] border-green-200/40 dark:border-green-800/20" />

              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full border-[25px] border-emerald-200/40 dark:border-emerald-800/20" />

              {/* Logo */}
              <div className="relative z-10 flex flex-col items-center py-8 text-center">

                <div className="mb-7 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-white p-3 shadow-xl shadow-green-900/10 ring-1 ring-green-100 transition-transform duration-500 hover:scale-105 dark:bg-white dark:ring-green-200 sm:h-36 sm:w-36">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/Logo.png"
                      alt="Helping Hands Logo"
                      fill
                      sizes="144px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-3xl font-extrabold tracking-tight text-green-900 dark:text-green-400 sm:text-4xl">
                  Helping Hands
                </h3>

                <p className="mt-2 text-sm font-medium tracking-widest text-green-700 dark:text-green-300">
                  MAKE GOOD HAPPEN
                </p>

                <p className="mt-6 max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                  A community built on compassion, teamwork, and the
                  belief that everyone can make a difference.
                </p>

                {/* Brand Highlight */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-xs font-semibold text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-300">
                    <HeartHandshake size={15} />
                    Kindness
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-xs font-semibold text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-300">
                    <Users size={15} />
                    Community
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-xs font-semibold text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-300">
                    <Globe size={15} />
                    Impact
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Highlight Card */}
            <div className="relative mx-auto -mt-7 flex max-w-sm items-center gap-4 rounded-2xl border border-green-100 bg-background p-5 shadow-lg dark:border-green-900/60 sm:mx-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">
                <HandHeart size={25} />
              </div>

              <div>
                <h4 className="font-bold text-foreground">
                  Every Helping Hand Matters
                </h4>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Your kindness can inspire a better tomorrow.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - About Information */}
          <div className="space-y-8">

            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
                <span className="h-0.5 w-8 bg-green-600 dark:bg-green-400" />
                Who We Are
              </span>

              <h3 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                Making Kindness a{" "}
                <span className="text-green-700 dark:text-green-400">
                  Community Movement
                </span>
              </h3>

              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Helping Hands is a community-driven platform designed to
                make volunteering easier and more meaningful. We connect
                people with opportunities where they can contribute their
                time, skills, and compassion.
              </p>

              <p className="mt-4 text-base leading-8 text-muted-foreground">
                From helping people in need to protecting the environment
                and supporting local communities, our goal is to make
                positive social action accessible to everyone.
              </p>
            </div>

            {/* Activities List */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <h4 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                <ShieldCheck className="text-green-700 dark:text-green-400" size={22} />
                What We Encourage
              </h4>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
                    />

                    <p className="text-sm leading-6 text-muted-foreground">
                      {activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Button */}
            <Link
              href="/upcoming-events"
              className="group inline-flex items-center gap-3 rounded-full bg-green-800 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/15 transition-all duration-300 hover:-translate-y-1 hover:bg-green-900 hover:shadow-xl dark:bg-green-700 dark:hover:bg-green-600"
            >
              Explore Our Events

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">

          {/* Mission Card */}
          <div className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl dark:hover:border-green-800 sm:p-9">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition-transform duration-300 group-hover:scale-110 dark:bg-green-950 dark:text-green-400">
              <Target size={29} />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
              Our Purpose
            </span>

            <h3 className="mt-3 text-2xl font-extrabold text-foreground">
              Our Mission
            </h3>

            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              To connect volunteers with meaningful opportunities,
              encourage collective action, and make it easier for people
              to contribute to a better and more compassionate society.
            </p>
          </div>

          {/* Vision Card */}
          <div className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl dark:hover:border-green-800 sm:p-9">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition-transform duration-300 group-hover:scale-110 dark:bg-green-950 dark:text-green-400">
              <Eye size={29} />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
              Our Future
            </span>

            <h3 className="mt-3 text-2xl font-extrabold text-foreground">
              Our Vision
            </h3>

            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              To build a compassionate and connected community where
              everyone has the opportunity to participate, support one
              another, and create lasting positive change.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
              What We Believe In
            </span>

            <h3 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
              Our Core Values
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              The principles that guide our community and inspire
              everything we do.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-border bg-card p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl dark:hover:border-green-800"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition-transform duration-300 group-hover:scale-110 dark:bg-green-950 dark:text-green-400">
                    <Icon size={27} />
                  </div>

                  <h4 className="text-lg font-bold text-foreground">
                    {value.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Call To Action */}
        <div className="relative mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 px-6 py-12 text-center text-white shadow-xl shadow-green-900/10 dark:from-green-950 dark:via-green-900 dark:to-emerald-950 sm:px-10 sm:py-16">

          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="relative z-10 mx-auto max-w-2xl">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
              <HeartHandshake size={34} />
            </div>

            <h3 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Be the Reason Someone Smiles
            </h3>

            <p className="mt-5 text-sm leading-7 text-green-50 sm:text-base">
              Every contribution matters. Join our community, discover
              meaningful events, and become a part of something positive.
            </p>

            <Link
              href="/upcoming-events"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-green-900 transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-lg"
            >
              Become a Volunteer

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
