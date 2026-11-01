"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  PlusCircle,
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
  startDate: string;
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
        event.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, search]);

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-[#f6f8fa] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e3f5f1] px-3 py-1 text-xs font-semibold text-[#168879]">
              <CalendarDays size={14} />
              Future Community Drives
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Upcoming Events
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Discover verified volunteer initiatives scheduled for upcoming
              dates. Past events are automatically excluded so you can focus on
              active drives that need support.
            </p>
          </div>

          <Link
            href="/dashboard/create-event"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#11998e] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087f75]"
          >
            <PlusCircle size={17} />
            Create Event
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="my-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "border-[#11998e] bg-[#11998e] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#11998e] hover:text-[#11998e]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-[300px]">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search events or areas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#11998e] focus:ring-2 focus:ring-[#11998e]/10"
            />
          </div>
        </div>

        {/* Event Cards */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#11998e] shadow">
                    <Tag size={12} />
                    {event.category}
                  </div>

                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-gray-900/85 px-2 py-1 text-xs font-medium text-white">
                    <CalendarDays size={13} />
                    {formatDate(event.startDate)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={15} className="shrink-0 text-[#11998e]" />
                    <span>{event.location}</span>
                  </div>

                  <p className="mb-4 line-clamp-2 min-h-10 text-xs leading-5 text-gray-500">
                    {event.description}
                  </p>

                  <div className="mb-4 flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <UserRound size={14} className="text-[#11998e]" />
                    <span>{event.organizer}</span>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#11998e] py-3 text-sm font-semibold text-white transition hover:bg-[#087f75]"
                  >
                    View Event
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <CalendarDays className="mx-auto mb-3 text-gray-400" size={35} />

            <h3 className="text-lg font-bold text-gray-800">No Events Found</h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another category or search keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
