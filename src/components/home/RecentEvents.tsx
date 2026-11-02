"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

type Event = {
  _id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  eventDate: string;
  description: string;
  organizer?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function RecentEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/recent-events`);

        if (!response.ok) {
          throw new Error("Failed to fetch recent events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Recent events error:", err);
        setError("Unable to load recent events.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  const formatDate = (date: string) => {
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

  return (
    <section className="bg-slate-50 px-5 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col items-center justify-center gap-5 text-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
              <span>🔥</span>
              Upcoming Initiatives
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Recent <span className="text-emerald-600">Events</span>
            </h2>

            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Discover the latest community events and get involved today.
            </p>
          </div>
        </div>
        <div className="mb-10 flex flex-col items-end justify-end gap-5">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-lg"
          >
            View All Events
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="py-10 text-center text-red-500">{error}</p>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-slate-400" />

            <h3 className="text-lg font-bold text-slate-800">
              No Events Available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              New community events will appear here.
            </p>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Event Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-emerald-50 text-emerald-600">
                      <CalendarDays size={40} />
                    </div>
                  )}

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur">
                    {event.category}
                  </span>

                  {/* Date */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-slate-900/80 px-3 py-2 text-xs font-medium text-white backdrop-blur">
                    <CalendarDays size={14} className="text-emerald-400" />
                    {formatDate(event.eventDate)}
                  </div>
                </div>

                {/* Event Information */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                    {event.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="shrink-0 text-emerald-600" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500">
                    {event.description}
                  </p>

                  {/* Organizer & View Event */}
                  <div className="mt-auto border-t border-slate-100 pt-4">
                    <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
                      <Users size={15} className="text-emerald-600" />

                      <span className="line-clamp-1">
                        {event.organizer || "Community Organizer"}
                      </span>
                    </div>

                    <Link
                      href={`/events/${event._id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-800 hover:shadow-lg"
                    >
                      View Event
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
