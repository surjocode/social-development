
export type Event = {
  _id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  date: string;
  description: string;
  organizer: string;
  joined: number;
  status: "upcoming" | "completed" | "cancelled";
};
