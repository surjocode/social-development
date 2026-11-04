
export type Event = {
  _id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  date: string;
  startDate?: string;
  eventDate?: string;
  description: string;
  organizer: string;
  email: string;
  joined: number;
  setMounted: boolean;
  status: "upcoming" | "completed" | "cancelled";
};
