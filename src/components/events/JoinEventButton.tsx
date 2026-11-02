
"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type JoinEventButtonProps = {
  eventId: string;
  creatorEmail: string;
  status: string;
};

const API_URL = "http://localhost:8000";

const JoinEventButton = ({
  eventId,
  creatorEmail,
  status,
}: JoinEventButtonProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const isCreator =
    !!user?.email &&
    user.email.toLowerCase() === creatorEmail?.toLowerCase();

  // Check whether the user has already joined
  useEffect(() => {
    const checkJoinedStatus = async () => {
      if (isPending) return;

      if (!user?.email || isCreator) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/my-joined-events/${encodeURIComponent(user.email)}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Failed to check joined status");
        }

        const events = await response.json();

        setIsJoined(
          events.some(
            (event: { _id: string }) => event._id === eventId
          )
        );
      } catch (error) {
        console.error(error);
        setMessage("Could not check your join status.");
      } finally {
        setIsLoading(false);
      }
    };

    checkJoinedStatus();
  }, [eventId, user?.email, isPending, isCreator]);

  const handleJoinToggle = async () => {
    if (!user?.email) {
      setMessage("Please login first to join this event.");
      return;
    }

    if (isCreator) {
      setMessage("You cannot join your own event.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/${isJoined ? "leave-event" : "join-event"}`,
        {
          method: isJoined ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            userEmail: user.email,
            userName: user.name || "",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setIsJoined(!isJoined);

      setMessage(
        isJoined
          ? "You have left this event."
          : "Successfully joined this event!"
      );

      // Refresh server component to update volunteer count
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show Completed button for completed events
  if (status?.toLowerCase() === "completed") {
    return (
      <button
        type="button"
        disabled
        className="flex items-center justify-center gap-2 rounded-xl bg-gray-200 px-6 py-3 text-sm font-bold text-gray-500 cursor-not-allowed"
      >
        <CheckCircle2 size={19} />
        Completed
      </button>
    );
  }

  if (isPending || isLoading) {
    return (
      <button
        type="button"
        disabled
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0ca58e] to-[#11998e] px-6 py-3 text-sm font-bold text-white opacity-60"
      >
        Please wait...
      </button>
    );
  }

  if (isCreator) {
    return (
      <div className="text-sm font-semibold text-teal-700">
        You created this event
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleJoinToggle}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0ca58e] to-[#11998e] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#087f75] hover:to-[#087f75] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isJoined ? (
          <CheckCircle2 size={19} />
        ) : (
          <HeartHandshake size={19} />
        )}

        {isJoined
          ? "Joined (Click to Leave)"
          : "Join Event"}
      </button>

      {message && (
        <p className="text-xs text-gray-500" role="status">
          {message}
        </p>
      )}
    </div>
  );
};

export default JoinEventButton;
