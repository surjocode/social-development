
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

type JoinedEvent = {
  _id: string;
};

type JoinedEventsResponse = {
  result?: JoinedEvent[];
  events?: JoinedEvent[];
  message?: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

// Safely parse backend response
const getResponseData = async (response: Response) => {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    console.error("Invalid API response:", {
      status: response.status,
      url: response.url,
      body: text.slice(0, 500),
    });

    throw new Error(
      `Backend returned HTML or invalid JSON. Status: ${response.status}. Check the API route.`
    );
  }
};

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
        const tokenData = await authClient.token();
        const token = tokenData.data?.token;

        if (!token) {
          throw new Error(
            "Authentication token not found. Please login again."
          );
        }

        const response = await fetch(
          `${API_URL}/my-joined-events/${encodeURIComponent(user.email)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        const data = await getResponseData(response);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to check joined status"
          );
        }

        // Support both array and object responses
        const joinedEvents: JoinedEvent[] = Array.isArray(data)
          ? data
          : data.result || data.events || [];

        setIsJoined(
          joinedEvents.some(
            (event) => event._id?.toString() === eventId
          )
        );
      } catch (error) {
        console.error("Check joined status error:", error);

        setMessage(
          error instanceof Error
            ? error.message
            : "Could not check your join status."
        );
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

    if (isLoading) return;

    setIsLoading(true);
    setMessage("");

    try {
      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const endpoint = isJoined ? "leave-event" : "join-event";
      const method = isJoined ? "DELETE" : "POST";

      const response = await fetch(`${API_URL}/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          eventId,
          userName: user.name || "",
        }),
      });

      const result = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong"
        );
      }

      setIsJoined(!isJoined);

      setMessage(
        isJoined
          ? "You have left this event."
          : "Successfully joined this event!"
      );

      router.refresh();
    } catch (error) {
      console.error("Join/Leave event error:", error);

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
        className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-200 px-6 py-3 text-sm font-bold text-gray-500"
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

        {isJoined ? "Joined (Click to Leave)" : "Join Event"}
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
