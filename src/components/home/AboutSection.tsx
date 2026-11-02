
import {
  HeartHandshake,
  Target,
  Eye,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section id="about" className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 dark:bg-green-950 dark:text-green-400">
            About Helping Hands
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Together, We Can Make a
            <span className="text-green-700 dark:text-green-400">
              {" "}Difference
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Helping Hands is a platform that connects passionate volunteers
            with meaningful social initiatives. We believe that even small
            acts of kindness can create a big impact on society.
          </p>
        </div>

        {/* About Content */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">
              <HeartHandshake size={30} />
            </div>

            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              Making Kindness
              <br />
              a Community Movement
            </h3>

            <p className="mt-5 leading-8 text-muted-foreground">
              Our platform makes it easier for people to discover upcoming
              events, join community activities, and contribute to causes
              that matter. Whether it is helping people in need, protecting
              the environment, or supporting local communities, everyone
              has the power to make a difference.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">
                <Target size={25} />
              </div>

              <h3 className="text-xl font-bold text-foreground">
                Our Mission
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To connect volunteers with meaningful opportunities and
                encourage people to work together for a better society.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:mt-12">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">
                <Eye size={25} />
              </div>

              <h3 className="text-xl font-bold text-foreground">
                Our Vision
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To build a compassionate community where everyone has the
                opportunity to contribute and create positive change.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3 rounded-2xl bg-green-800 px-6 py-8 text-center text-white sm:flex-row sm:gap-5 sm:py-10">
          <Users size={35} />
          <div>
            <h3 className="text-xl font-bold">
              Every Helping Hand Matters
            </h3>
            <p className="mt-1 text-sm text-green-100">
              Join us and become a part of positive change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
