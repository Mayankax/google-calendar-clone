import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import CalendarView from "./components/layout/CalendarView";

export default function App() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">("month");

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar viewMode={viewMode} setViewMode={setViewMode} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Calendar View */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <CalendarView viewMode={viewMode} />
        </main>
      </div>
    </div>
  );
}
