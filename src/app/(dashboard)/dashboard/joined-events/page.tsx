"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CheckCircle2, MapPin, ArrowRight } from "lucide-react";

import { authClient } from "@/lib/auth-client";

type Event = {
  _id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  eventDate?: string;
  startDate?: string;
  joinedAt?: string | Date | null;
  description: string;
};

const API_URL = "http://localhost:8000";

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "Date not available";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Date not available";
  }

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const JoinedEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      if (isPending) return;

      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/my-joined-events/${encodeURIComponent(user.email)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Failed to load joined events");
        }

        const data: Event[] = await response.json();

        setEvents(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your joined events.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user?.email, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="font-medium text-teal-700">Loading joined events...</p>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Please Login First</h2>
        <Link
          href="/login"
          className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f9] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-7 border-b border-gray-200 pb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e5f5f1] px-3 py-1 text-xs font-bold text-teal-700">
            <CheckCircle2 size={14} />
            My Volunteer Commitments
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Joined Events
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Here are all the social development and community service drives you
            have signed up for, sorted by event date.
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!error && events.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No Joined Events Yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You have not joined any events yet.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white"
            >
              Explore Events <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Event Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-gradient-to-br from-teal-700 to-emerald-950">
                {event.image && /^https?:\/\//i.test(event.image) ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : null}

                {/* Category */}
                <span className="absolute left-3 top-3 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-600">
                  {event.category}
                </span>

                {/* Event Date */}
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
                  <CalendarDays size={13} />
                  {formatDate(event.startDate || event.eventDate)}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-teal-700">
                  {event.title}
                </h2>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={15} className="shrink-0 text-teal-600" />
                  {event.location}
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                  {event.description}
                </p>

                {/* Joined Date */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-sm font-semibold text-teal-700">
                    Joined {formatDate(event.joinedAt)}
                  </p>
                </div>

                {/* View Event */}
                <Link
                  href={`/events/${event._id}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0ca58e] to-[#11998e] px-5 py-3 text-sm font-bold text-white transition hover:from-[#087f75] hover:to-[#087f75]"
                >
                  View Event
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default JoinedEventsPage;
