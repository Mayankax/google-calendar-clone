import { createContext, useContext, useState, useEffect} from "react";
import type {ReactNode} from "react";

type EventType = {
  id: string;
  title: string;
  date: string;
};

type EventContextType = {
  events: EventType[];
  addEvent: (event: EventType) => void;
  deleteEvent: (id: string) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  // ✅ Initialize from localStorage synchronously
  const [events, setEvents] = useState<EventType[]>(() => {
    try {
      const stored = localStorage.getItem("calendar-events");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 💾 Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event: EventType) => {
    setEvents((prev) => [...prev, event]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}
