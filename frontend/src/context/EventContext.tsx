import { createContext, useContext, useEffect, useState } from "react";
import { fetchEvents, createEvent, deleteEvent } from "../lib/api";

type Event = {
  _id?: string;
  id?: string;
  title: string;
  date: string;
  description?: string;
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  // Load from backend
  useEffect(() => {
    (async () => {
      const data = await fetchEvents();
      setEvents(data);
    })();
  }, []);

  const addEvent = async (event: Omit<Event, "id">) => {
    const newEvent = await createEvent(event);
    setEvents((prev) => [...prev, newEvent]);
  };

  const removeEvent = async (id: string) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e._id !== id && e.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvents must be used within EventProvider");
  return ctx;
};
