
import UpcomingEventsList from "@/components/events/UpcomingEventsList";

const UpcomingEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch upcoming events");
  }

  const data = await res.json();

  return <UpcomingEventsList events={data} />;
};

export default UpcomingEvents;
