import { useState } from "react";
import {
  getMonthDays,
  getNextMonth,
  getPrevMonth,
  format,
  isSameMonth,
  isSameDay,
} from "../../lib/calendarUtils";
import EventModal from "../modals/EventModal";
import { useEvents } from "../../context/EventContext";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const { events, deleteEvent } = useEvents();

  const days = getMonthDays(currentDate);

  const handleNextMonth = () => setCurrentDate(getNextMonth(currentDate));
  const handlePrevMonth = () => setCurrentDate(getPrevMonth(currentDate));

  const openModalForDate = (date: Date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
    setOpen(true);
  };

  return (
    <main className="flex-1 p-4 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="px-2 py-1 text-gray-600 hover:text-blue-600"
          >
            ←
          </button>
          <button
            onClick={handleNextMonth}
            className="px-2 py-1 text-gray-600 hover:text-blue-600"
          >
            →
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
        </div>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border border-gray-200">
        {days.map((day) => {
          const isToday = isSameDay(day, new Date());
          const inCurrentMonth = isSameMonth(day, currentDate);

          const dayEvents = events.filter(
            (e) => e.date === format(day, "yyyy-MM-dd")
          );

          return (
            <div
              key={day.toString()}
              onClick={() => openModalForDate(day)}
              className={`h-28 border border-gray-100 p-1 text-sm cursor-pointer transition-all ${
                !inCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"
              } ${isToday ? "border-blue-500" : ""} hover:bg-blue-50`}
            >
              <div className="text-right text-xs pr-1 mb-1">
                {format(day, "d")}
              </div>

              {/* Events */}
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-blue-100 text-blue-700 rounded px-1 text-xs truncate mb-1 flex justify-between items-center"
                >
                  <span>{event.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal opening
                      deleteEvent(event.id);
                    }}
                    className="text-red-500 font-bold ml-1 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <EventModal
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={selectedDate}
      />
    </main>
  );
}
