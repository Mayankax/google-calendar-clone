import { useState } from "react";
import EventModal from "../modals/EventModal";
import SidebarCalendar from "./SidebarCalendar"; // ⬅️ import the mini calendar

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <aside className="w-72 border-r bg-gray-50 p-4 flex flex-col gap-6">
      {/* Create Button */}
      <div>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition"
        >
          + Create
        </button>
      </div>

      {/* Mini Calendar */}
      <div>
        <SidebarCalendar
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </div>

      {/* My Calendars Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">
          My Calendars
        </h2>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>📘 Work</li>
          <li>📗 Personal</li>
          <li>📕 Reminders</li>
        </ul>
      </div>

      {/* Modal for Creating Events */}
      <EventModal open={open} onClose={() => setOpen(false)} />
    </aside>
  );
}
