
import UpcomingEventsList from "@/components/events/UpcomingEventsList";

const UpcomingEvents = async () => {
  const res = await fetch("http://localhost:8000/upcoming-events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch upcoming events");
  }

  const data = await res.json();

  return <UpcomingEventsList events={data} />;
};

export default UpcomingEvents;
