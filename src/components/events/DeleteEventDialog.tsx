"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

type DeleteEventDialogProps = {
  event: {
    _id: string;
    title: string;
  };
  onDeleted?: () => void;
};

const DeleteEventDialog = ({
  event,
  onDeleted,
}: DeleteEventDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
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

      // API URL
      const API_URL = (
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      ).replace(/\/$/, "");

      // Send DELETE request with JWT
      const response = await fetch(
        `${API_URL}/dashboard/delete-event/${event._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Safely parse API response
      const data: { message?: string } = await response
        .json()
        .catch(() => ({} as { message?: string }));

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event.");
      }

      // Show success toast
      toast.success("Event deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        toastId: `delete-success-${event._id}`,
      });

      setOpen(false);

      // Refresh event list without reloading the page
      onDeleted?.();
    } catch (error) {
      console.error("Delete event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          toastId: `delete-error-${event._id}`,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Delete Trigger */}
      <DialogTrigger className="flex h-9 items-center justify-center gap-1 rounded-lg bg-rose-50 px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/60">
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </DialogTrigger>

      {/* Confirmation Dialog */}
      <DialogContent className="w-[95vw] max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-[#14251B] dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Delete Event?
          </DialogTitle>

          <DialogDescription className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            Are you sure you want to delete "{event.title}"? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-[#182820] dark:text-gray-300 dark:hover:bg-[#20382B]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;