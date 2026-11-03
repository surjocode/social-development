
"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareEventButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied successfully!");
    } catch (error) {
      console.error("Failed to copy event link:", error);
      toast.error("Could not copy the event link.");
    }
  };

  return (
    <button
      type="button"
      aria-label="Share event"
      onClick={handleShare}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-teal-500 hover:text-teal-600"
    >
      <Share2 size={19} />
    </button>
  );
}
