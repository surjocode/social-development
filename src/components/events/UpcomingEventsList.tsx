
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Search,
  UserRound,
  ArrowRight,
  Tag,
} from "lucide-react";
import Image from "next/image";

type Event = {
  _id: string;
  title: string;
  category: string;
  location: string;
  startDate?: string;
  eventDate?: string;
  endDate?: string;
  time?: string;
  description: string;
  image: string;
  organizer: string;
  capacity?: number;
  joined?: number;
  status?: string;
};

type Props = {
  events: Event[];
};

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

export default function UpcomingEventsList({ events }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" ||
        event.category?.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        event.title?.toLowerCase().includes(search.toLowerCase()) ||
        event.location?.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, search]);

  // Format event date
  const formatDate = (date?: string) => {
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
    <section className="min-h-screen bg-[#f6f8fa] px-4 py-8 transition-colors duration-300 dark:bg-[#101C16] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 border-b border-gray-200 pb-6 transition-colors dark:border-gray-700 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e3f5f1] px-3 py-1 text-xs font-semibold text-[#168879] dark:bg-emerald-950/60 dark:text-emerald-300">
              <CalendarDays size={14} />
              Future Community Drives
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 transition-colors dark:text-white sm:text-4xl">
              Upcoming Events
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Discover verified volunteer initiatives scheduled for upcoming
              dates. Past events are automatically excluded so you can focus on
              active drives that need support.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="my-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "border-[#11998e] bg-[#11998e] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#11998e] hover:text-[#11998e] dark:border-gray-700 dark:bg-[#182820] dark:text-gray-300 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:max-w-[300px]">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />

            <input
              type="text"
              placeholder="Search events or areas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#11998e] focus:ring-2 focus:ring-[#11998e]/10 dark:border-gray-700 dark:bg-[#182820] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Event Cards */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-[#182820] dark:hover:border-emerald-900"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {event.image &&
                  (event.image.startsWith("/") ||
                    /^https?:\/\/\S+$/i.test(event.image)) ? (
                    <Image
                      src={event.image}
                      alt={event.title || "Event image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                      No Image Available
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#11998e] shadow dark:bg-[#14251B]/95 dark:text-emerald-300">
                    <Tag size={12} />
                    {event.category}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-gray-900/85 px-2 py-1 text-xs font-medium text-white">
                    <CalendarDays size={13} />
                    {formatDate(event.startDate || event.eventDate)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition-colors dark:text-white">
                    {event.title}
                  </h2>

                  <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin
                      size={15}
                      className="shrink-0 text-[#11998e] dark:text-emerald-400"
                    />
                    <span>{event.location}</span>
                  </div>

                  <p className="mb-4 line-clamp-2 min-h-10 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>

                  <div className="mb-4 flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    <UserRound
                      size={14}
                      className="text-[#11998e] dark:text-emerald-400"
                    />
                    <span>{event.organizer}</span>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#11998e] py-3 text-sm font-semibold text-white transition hover:bg-[#087f75] dark:bg-emerald-700 dark:hover:bg-emerald-600"
                  >
                    View Event
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center transition-colors dark:border-gray-700 dark:bg-[#182820]">
            <CalendarDays
              className="mx-auto mb-3 text-gray-400 dark:text-gray-500"
              size={35}
            />

            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              No Events Found
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try another category or search keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
