import { createContext, useContext, useEffect, useState } from "react";
import { fetchEvents, createEvent, deleteEvent, updateEvent } from "../lib/api";

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
  editEvent: (id: string, updates: Partial<Event>) => Promise<void>;
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

  const editEvent = async (id: string, updates: Partial<Event>) => {
    const updated = await updateEvent(id, updates);
    setEvents((prev) => prev.map((e) => (e._id === id ? updated : e)));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent, editEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvents must be used within EventProvider");
  return ctx;
};
