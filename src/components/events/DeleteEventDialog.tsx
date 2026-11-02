
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
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8000/dashboard/delete-event/${event._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
      }

      alert("Event deleted successfully!");

      setOpen(false);
      onDeleted?.();
    } catch (error) {
      console.error("Delete event error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex h-9 items-center justify-center gap-1 rounded-lg bg-rose-50 px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-100">
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

      <DialogContent className="w-[95vw] max-w-md rounded-2xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Delete Event?
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete &quot;{event.title}&quot;? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;
