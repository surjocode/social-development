
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";

import type { Event } from "@/types/event";
import JoinEventButton from "@/components/events/JoinEventButton";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const data: { result: Event | null } = await res.json();
  const event = data.result;

  if (!event) {
    notFound();
  }

  // Format event date with weekday name
  const eventDate = new Date(event.startDate || event.eventDate);

  const formattedDate = !isNaN(eventDate.getTime())
    ? eventDate
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .replace(",", ",")
    : "Date not available";

  const joinedCount =
    "joined" in event && typeof event.joined === "number" ? event.joined : 0;

  const validImage = event.image && /^https?:\/\//i.test(event.image);

  return (
    <main className="min-h-screen bg-[#f5f7f9] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/upcoming-events"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-teal-600"
        >
          <ArrowLeft size={16} />
          Back to Upcoming Events
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/60">
          {/* Event Banner */}
          <div className="relative h-[280px] sm:h-[340px] lg:h-[390px]">
            {validImage ? (
              <Image
                src={event.image}
                alt={event.title || "Event image"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-700 to-emerald-950">
                <HeartHandshake className="h-24 w-24 text-white/40" />
              </div>
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* Category Badge */}
            <div className="absolute left-5 top-5 sm:left-8 sm:top-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-md">
                <HeartHandshake size={15} className="text-teal-600" />
                {event.category}
              </span>
            </div>

            {/* Banner Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
              <h1 className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                {event.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/90 sm:text-sm">
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-teal-400" />
                  {event.location}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-teal-400" />
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-5 sm:p-7 lg:p-8">
            {/* Join Event Section */}
            <div className="mb-9 flex flex-col justify-between gap-4 rounded-2xl border border-[#dce9ec] bg-[#fbfefe] p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f6f2] text-teal-600">
                  <Users size={25} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {joinedCount} Volunteers Joined
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Sign up to join hands for this drive
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Share event"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-teal-500 hover:text-teal-600"
                >
                  <Share2 size={19} />
                </button>

                <JoinEventButton
                  eventId={event._id.toString()}
                  creatorEmail={event.email}
                  status={event.status}
                />
              </div>
            </div>

            {/* About and Organizer Grid */}
            <div className="grid gap-8 md:grid-cols-3">
              {/* Left Content */}
              <div className="space-y-6 md:col-span-2">
                {/* About Event */}
                <section className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    About this Social Initiative
                  </h2>

                  <p className="text-sm leading-7 text-gray-600">
                    {event.description}
                  </p>
                </section>

                {/* Volunteer Guidelines */}
                <section className="border-t border-gray-200 pt-6">
                  <h3 className="mb-4 text-base font-bold tracking-wide text-gray-600">
                    VOLUNTEER GUIDELINES
                  </h3>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-teal-500"
                      />
                      Please arrive 15 minutes before the scheduled time at the
                      designated location.
                    </li>

                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-teal-500"
                      />
                      Wear comfortable clothing suitable for physical work and
                      distribution.
                    </li>

                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-teal-500"
                      />
                      Bring any pre-coordinated relief packages or distribution
                      items if requested.
                    </li>
                  </ul>
                </section>
              </div>

              {/* Organizer Card */}
              <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-5 text-sm font-bold tracking-wide text-gray-500">
                  INITIATIVE ORGANIZER
                </h3>

                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e0f6f2] text-teal-600">
                    <Users size={27} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-base font-bold text-gray-900">
                      {event.organizer}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      Event Organizer
                    </p>
                  </div>
                </div>

                <div className="my-5 border-t border-gray-200" />

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck
                    size={18}
                    className="shrink-0 text-teal-500"
                  />
                  Verified Platform Member
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
