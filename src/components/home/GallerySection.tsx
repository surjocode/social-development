
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { MapPin, ImageIcon } from "lucide-react";

type CompletedEvent = {
  _id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  status: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

export default function GallerySection() {
  const [events, setEvents] = useState<CompletedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/events`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: CompletedEvent[] = await response.json();

        const completedEvents = data
          .filter(
            (event) =>
              event.status?.toLowerCase() === "completed"
          )
          .slice(0, 6);

        setEvents(completedEvents);
      } catch (err) {
        console.error("Gallery error:", err);
        setError("Unable to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedEvents();
  }, []);

  return (
    <section
      id="gallery"
      className="scroll-mt-[110px] bg-white px-5 py-16 transition-colors duration-300 dark:bg-[#101C16] md:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Our Memories
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Our Community{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Gallery
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              Moments of kindness, teamwork, and positive change
              from our completed community events.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid min-h-[600px] grid-cols-1 content-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-center text-red-500 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="w-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center transition-colors dark:border-slate-700 dark:bg-[#182820]">
              <ImageIcon className="mx-auto mb-4 h-10 w-10 text-slate-400 dark:text-slate-500" />

              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                No Completed Events Yet
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Completed event photos will appear here.
              </p>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event._id}`}
                className="group relative block h-72 overflow-hidden rounded-3xl bg-slate-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[#182820] dark:shadow-black/20"
              >
                {/* Event Image */}
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                  </div>
                )}

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

                {/* Event Details */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 text-white">

                  {/* Category Badge */}
                  <div className="mb-2">
                    <span className="inline-block rounded-full bg-emerald-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      {event.category}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-emerald-300">
                    {event.title}
                  </h3>

                  {/* Event Location */}
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-white/80">
                    <MapPin
                      size={14}
                      className="shrink-0 text-emerald-400"
                    />

                    <span className="line-clamp-1">
                      {event.location}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
