import { useState } from "react";
import EventModal from "../modals/EventModal";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-64 border-r bg-gray-50 p-4">
      <div className="mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
        >
          + Create
        </button>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">My Calendars</h2>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>📘 Work</li>
          <li>📗 Personal</li>
          <li>📕 Reminders</li>
        </ul>
      </div>

      <EventModal open={open} onClose={() => setOpen(false)} />
    </aside>
  );
}
