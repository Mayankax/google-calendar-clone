import { useState, useEffect } from "react";
import {
  getMonthDays,
  getNextMonth,
  getPrevMonth,
  format,
  isSameMonth,
  isSameDay,
} from "@/lib/calendarUtils";
import EventModal from "../modals/EventModal";
import {
  startOfWeek,
  addDays,
  eachDayOfInterval,
  startOfYear,
  addMonths,
} from "date-fns";
import { useEvents } from "@/context/EventContext"; // ✅ use global context

export default function CalendarView({
  viewMode,
}: {
  viewMode: "day" | "week" | "month" | "year";
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // ✅ Use global context instead of local fetching
  const { events } = useEvents();

  // Generate visible days when view/date changes
  useEffect(() => {
    updateDays();
  }, [currentDate, viewMode]);

  const updateDays = () => {
    if (viewMode === "month") {
      setDays(getMonthDays(currentDate));
    } else if (viewMode === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 });
      setDays(eachDayOfInterval({ start, end: addDays(start, 6) }));
    } else if (viewMode === "day") {
      setDays([currentDate]);
    } else if (viewMode === "year") {
      setDays([]);
    }
  };

  // ✅ Navigation handlers
  const handlePrev = () => {
    if (viewMode === "month") setCurrentDate(getPrevMonth(currentDate));
    else if (viewMode === "week") setCurrentDate(addDays(currentDate, -7));
    else if (viewMode === "day") setCurrentDate(addDays(currentDate, -1));
    else if (viewMode === "year") setCurrentDate(addMonths(currentDate, -12));
  };

  const handleNext = () => {
    if (viewMode === "month") setCurrentDate(getNextMonth(currentDate));
    else if (viewMode === "week") setCurrentDate(addDays(currentDate, 7));
    else if (viewMode === "day") setCurrentDate(addDays(currentDate, 1));
    else if (viewMode === "year") setCurrentDate(addMonths(currentDate, 12));
  };

  // ✅ Click handlers
  const handleDayClick = (day: Date) => {
    setSelectedEvent(null);
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrev}
          className="px-3 py-2 bg-gray-200 rounded-md"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h1>
        <button
          onClick={handleNext}
          className="px-3 py-2 bg-gray-200 rounded-md"
        >
          →
        </button>
      </div>

      {/* Year Mode */}
      {viewMode === "year" ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => {
            const monthDate = addMonths(startOfYear(currentDate), i);
            return (
              <div key={i} className="border rounded-lg p-2 bg-white">
                <h2 className="text-center font-medium text-sm mb-2">
                  {format(monthDate, "MMMM")}
                </h2>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {getMonthDays(monthDate).slice(0, 35).map((day, idx) => (
                    <div
                      key={idx}
                      className={`p-1 rounded ${
                        isSameMonth(day, monthDate)
                          ? "bg-gray-100"
                          : "text-gray-300"
                      }`}
                    >
                      {format(day, "d")}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {/* Weekday Headers */}
          {viewMode !== "day" && (
            <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
          )}

          {/* Main Calendar Grid */}
          <div
            className={`grid gap-2 ${
              viewMode === "week"
                ? "grid-cols-7"
                : viewMode === "day"
                ? "grid-cols-1"
                : "grid-cols-7"
            }`}
          >
            {days.map((day) => (
              <div
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                className={`p-2 min-h-[100px] border rounded-md cursor-pointer
                  ${
                    isSameDay(day, new Date())
                      ? "border-2 border-blue-600 bg-blue-50"
                      : ""
                  }
                  ${
                    isSameMonth(day, currentDate)
                      ? "bg-white hover:bg-blue-50"
                      : "bg-gray-100 text-gray-400"
                  }`}
              >
                <div className="text-sm font-semibold">{format(day, "d")}</div>
                <div className="mt-1 space-y-1">
                  {events
                    .filter((e) => e.date === format(day, "yyyy-MM-dd"))
                    .map((e) => (
                      <div
                        key={e._id}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          handleEventClick(e);
                        }}
                        className="bg-blue-100 text-xs p-1 rounded cursor-pointer hover:bg-blue-200 transition"
                      >
                        {e.title}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unified Modal for Create / Edit */}
      <EventModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        defaultDate={
          selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined
        }
        event={selectedEvent}
      />
    </div>
  );
}
