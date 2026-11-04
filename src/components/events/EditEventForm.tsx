
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";

type Event = {
  _id: string;
  title: string;
  category: string;
  eventDate: string;
  location: string;
  image: string;
  description: string;
};

type EditEventFormProps = {
  event: Event;
  onUpdated?: () => void;
};

const EditEventForm = ({ event, onUpdated }: EditEventFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: event.title || "",
    category: event.category || "",
    eventDate: event.eventDate?.slice(0, 10) || "",
    location: event.location || "",
    image: event.image || "",
    description: event.description || "",
  });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      // Get JWT token from Better Auth
      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      // Send PATCH request with JWT
      const API_URL = (
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      ).replace(/\/$/, "");

      const response = await fetch(
        `${API_URL}/dashboard/update-event/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update event"
        );
      }

      alert("Event updated successfully!");

      setOpen(false);
      onUpdated?.();
    } catch (error) {
      console.error("Update event error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:bg-white dark:border-gray-700 dark:bg-[#101C16] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-emerald-500 dark:focus:bg-[#14251B]";

  const labelClasses =
    "mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex h-9 items-center justify-center gap-1 rounded-lg bg-indigo-50 px-3 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/60">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit
      </DialogTrigger>

      <DialogContent className="!h-[90vh] !w-[90vw] !max-w-[900px] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-[#14251B] dark:text-gray-100 sm:!w-[45vw] sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Update Event
          </DialogTitle>

          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Modify the details for your social service initiative.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className={labelClasses}>
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          {/* Category and Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>
                Event Type
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={inputClasses}
              >
                <option value="">Select category</option>
                <option value="Plantation">Plantation</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Donation">Donation</option>
                <option value="Winter Clothes">Winter Clothes</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>
                Event Date
              </label>

              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={labelClasses}>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClasses}>
              Thumbnail Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClasses}>
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className={`${inputClasses} resize-y p-4`}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-[#182820] dark:text-gray-300 dark:hover:bg-[#20382B]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventForm;
