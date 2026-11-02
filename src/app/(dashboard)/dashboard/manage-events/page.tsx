"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

type Event = {
  _id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  eventDate: string;
  description: string;
  email: string;
  organizer: string;
  status: string;
};

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8000/my-created-events/${encodeURIComponent(user.email)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: Event[] = await response.json();

        setEvents(data);
      } catch (error) {
        console.error("Error fetching my events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [user?.email, isPending]);

  if (isPending || loading) {
    return <div className="p-6">Loading events...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login to manage your events.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7f9] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Organizer Dashboard
          </span>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Manage My Events
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                View, edit, and manage the social drives you have published.
                Only you have permission to edit or delete your created
                initiatives.
              </p>
            </div>

            <a
              href="/dashboard/create-event"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-700"
            >
              + Create New Event
            </a>
          </div>
        </div>

        {/* Events */}
        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No Events Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You have not created any events yet.
            </p>

            <a
              href="/dashboard/create-event"
              className="mt-5 inline-flex rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Create Your First Event
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  {event.image && event.image.trim() !== "" && (
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={500}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-green-100/95 px-3 py-1 text-xs font-semibold text-green-700">
                    {event.category}
                  </span>

                  {/* Date Badge */}
                  <span className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    📅 {event.eventDate}
                  </span>
                </div>

                {/* Event Content */}
                <div className="space-y-3 p-4">
                  <h2 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-teal-700">
                    {event.title}
                  </h2>

                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    📍 {event.location}
                  </p>

                  <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    👤 {event.organizer}
                  </div>

                  {/* Status */}
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {event.status}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href={`/events/${event._id}`}
                      className="flex h-9 flex-1 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                      View
                    </a>

                    <a
                      href={`/dashboard/manage-events/edit/${event._id}`}
                      className="flex h-9 items-center justify-center gap-1 rounded-lg bg-indigo-50 px-3 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                    >
                      ✏️ Edit
                    </a>

                    <button
                      type="button"
                      className="flex h-9 items-center justify-center gap-1 rounded-lg bg-rose-50 px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
