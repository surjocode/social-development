
"use client";

import React, { useEffect, useState } from "react";
import {
  Tag,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Type,
  CirclePlus,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const imagePresets = [
  {
    name: "Winter Clothes",
    url: "/images/events/winter-clothes.jpg",
  },
  {
    name: "Blanket Relief",
    url: "/images/events/winter-clothes.jpg",
  },
  {
    name: "Cleanup",
    url: "/images/events/community-cleanup.jpg",
  },
  {
    name: "Tree Plantation",
    url: "/images/events/tree-plantation.jpg",
  },
];

const CreateEventForm = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [imageUrl, setImageUrl] = useState("");
  const [minDate, setMinDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    const today = new Date();

    const formattedDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    setMinDate(formattedDate);
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (isSubmitting) return;

    if (isPending || !user?.email) {
      toast.error("Please login first!");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const eventData = {
      title: String(formData.get("title") || "").trim(),
      category: String(formData.get("category") || ""),
      eventDate: String(formData.get("eventDate") || ""),
      location: String(formData.get("location") || "").trim(),
      image: imageUrl.trim(),
      description: String(
        formData.get("description") || ""
      ).trim(),
      organizer: user.name,
      status: "upcoming",
    };

    if (!eventData.image) {
      setMessage("Please select or enter an event image.");
      setMessageType("error");
      return;
    }

    try {
      setIsSubmitting(true);

      // Get JWT token from Better Auth
      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      // API URL
      const API_URL = (
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      ).replace(/\/$/, "");

      // Send event data with JWT token
      const res = await fetch(
        `${API_URL}/dashboard/create-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to publish event."
        );
      }

      toast.success("Event published successfully!");

      form.reset();
      setImageUrl("");
      setMessage("Event published successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Event submission error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(errorMessage);

      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Light and Dark mode input styles
  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-[#F8FAFB] px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#159B8D] focus:ring-2 focus:ring-[#159B8D]/10 dark:border-gray-700 dark:bg-[#101C16] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-emerald-500 dark:focus:bg-[#14251B]";

  const labelStyle =
    "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen bg-[#F5F8FA] px-4 py-8 transition-colors duration-300 dark:bg-[#101C16]">
      <div className="mx-auto max-w-2xl">
        {/* Back Link */}
        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#159B8D] dark:text-gray-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={16} />
          Back to Upcoming Events
        </Link>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-[#14251B] sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EAF7F5] px-3 py-1 text-xs font-semibold text-[#159B8D] dark:bg-emerald-950/60 dark:text-emerald-300">
              <CirclePlus size={14} />
              Social Service Drive
            </span>

            <h1 className="text-2xl font-extrabold text-[#172033] dark:text-white sm:text-3xl">
              Create a Community Event
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Organize a local relief effort, environmental cleanup, or
              community support drive.
            </p>
          </div>

          {/* Success / Error Message */}
          {message && (
            <div
              className={`mb-5 rounded-xl px-4 py-3 text-sm font-medium ${
                messageType === "success"
                  ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300"
                  : "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Title */}
            <div>
              <label className={labelStyle}>
                Event Title <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Type
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />

                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Winter Clothes Distribution - Mirpur 10, Dhaka"
                  className={`${inputStyle} pl-11`}
                />
              </div>
            </div>

            {/* Category and Date */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Category */}
              <div>
                <label className={labelStyle}>
                  Event Type <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Tag
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />

                  <select
                    name="category"
                    required
                    defaultValue=""
                    className={`${inputStyle} appearance-none pl-11`}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option value="Donation">Donation</option>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Community Service">
                      Community Service
                    </option>
                    <option value="Disaster Relief">
                      Disaster Relief
                    </option>
                  </select>
                </div>
              </div>

              {/* Event Date */}
              <div>
                <label className={labelStyle}>
                  Event Date <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />

                  <input
                    type="date"
                    name="eventDate"
                    required
                    min={minDate}
                    className={`${inputStyle} pl-11`}
                  />
                </div>

                <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
                  Dates must be today or later.
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className={labelStyle}>
                Location / Venue <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />

                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                  className={`${inputStyle} pl-11`}
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className={labelStyle}>
                Thumbnail Image URL{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <ImageIcon
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />

                <input
                  type="text"
                  name="image"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL or select a preset"
                  className={`${inputStyle} pl-11`}
                />
              </div>

              {/* Image Presets */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-gray-400 dark:text-gray-500">
                  Quick photo presets:
                </span>

                {imagePresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="font-medium text-[#159B8D] transition hover:text-[#116F66] hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelStyle}>
                Event Description{" "}
                <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                required
                rows={5}
                placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                className={`${inputStyle} resize-none`}
              />
            </div>

            {/* Organizer Email */}
            <div className="flex flex-col justify-between gap-2 rounded-xl border border-gray-100 bg-[#F8FAFB] px-4 py-3 transition-colors dark:border-gray-700 dark:bg-[#101C16] sm:flex-row sm:items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Organizer Email
              </span>

              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                {user?.email || "Login required"}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#159B8D] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#117D73] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              <CirclePlus size={17} />
              {isSubmitting ? "Publishing..." : "Publish Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
