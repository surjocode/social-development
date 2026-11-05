"use client";

import { useCallback, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import EditEventForm from "@/components/events/EditEventForm";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";

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

type ApiResponse = {
  message?: string;
  error?: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

// Format event date
const formatEventDate = (date: string) => {
  const eventDate = new Date(date);

  if (isNaN(eventDate.getTime())) {
    return "Date not available";
  }

  return eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const userEmail = user?.email;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events without reloading the entire page
  const fetchMyEvents = useCallback(
    async (showLoading = false) => {
      if (!userEmail) {
        setEvents([]);
        setLoading(false);
        return;
      }

      try {
        if (showLoading) {
          setLoading(true);
        }

        setError("");

        // Get JWT token
        const tokenData = await authClient.token();
        const token = tokenData.data?.token;

        if (!token) {
          throw new Error(
            "Authentication token not found. Please login again."
          );
        }

        // Fetch created events
        const response = await fetch(
          `${API_URL}/my-created-events/${encodeURIComponent(userEmail)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const data: Event[] | ApiResponse = await response
          .json()
          .catch(() => []);

        if (!response.ok) {
          const errorData = data as ApiResponse;

          throw new Error(
            errorData.message || "Failed to fetch events."
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid event data received from server.");
        }

        setEvents(data);
      } catch (error) {
        console.error("Error fetching my events:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load your events."
        );
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [userEmail]
  );

  // Initial fetch
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setEvents([]);
      setLoading(false);
      return;
    }

    fetchMyEvents(true);
  }, [userEmail, isPending, fetchMyEvents]);

  // Loading State
  if (isPending || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#f5f7f9] p-6 transition-colors duration-300 dark:bg-[#101C16]">
        <p className="font-medium text-teal-700 dark:text-emerald-400">
          Loading events...
        </p>
      </div>
    );
  }

  // Login State
  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#f5f7f9] p-6 text-gray-700 transition-colors duration-300 dark:bg-[#101C16] dark:text-gray-300">
        Please login to manage your events.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f9] px-4 py-8 transition-colors duration-300 dark:bg-[#101C16] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
            Organizer Dashboard
          </span>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Manage My Events
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                View, edit, and manage the social drives you have published.
                Only you have permission to edit or delete your created
                initiatives.
              </p>
            </div>

            <Link
              href="/dashboard/create-event"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              + Create New Event
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Events */}
        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center transition-colors dark:border-gray-700 dark:bg-[#14251B]">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              No Events Found
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              You have not created any events yet.
            </p>

            <Link
              href="/dashboard/create-event"
              className="mt-5 inline-flex rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-[#14251B]"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-teal-700 to-emerald-950">
                  {event.image &&
                    event.image.trim() !== "" &&
                    /^https?:\/\//i.test(event.image) && (
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
                  <span className="absolute left-4 top-4 rounded-full bg-green-100/95 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-emerald-950/90 dark:text-emerald-300">
                    {event.category}
                  </span>

                  {/* Date Badge */}
                  <span className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    📅 {formatEventDate(event.eventDate)}
                  </span>
                </div>

                {/* Event Content */}
                <div className="space-y-3 p-4">
                  <h2 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-teal-700 dark:text-gray-100 dark:group-hover:text-emerald-400">
                    {event.title}
                  </h2>

                  <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin
                      size={15}
                      className="shrink-0 text-[#11998e] dark:text-emerald-400"
                    />

                    <span>{event.location}</span>
                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>

                  {/* Organizer */}
                  <div className="flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    👤 {event.organizer}
                  </div>

                  {/* Status Badge */}
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                    {event.status}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="flex h-9 flex-1 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-[#20372A] dark:text-gray-200 dark:hover:bg-[#294535]"
                    >
                      View
                    </Link>

                    <EditEventForm
                      event={event}
                      onUpdated={fetchMyEvents}
                    />

                    <DeleteEventDialog
                      event={event}
                      onDeleted={fetchMyEvents}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}