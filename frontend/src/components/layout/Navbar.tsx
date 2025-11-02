import { Calendar } from "lucide-react";

export default function Navbar({
  viewMode,
  setViewMode,
}: {
  viewMode: "day" | "week" | "month" | "year";
  setViewMode: (v: "day" | "week" | "month" | "year") => void;
}) {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">
          Google Calendar Clone
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {["day", "week", "month", "year"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as any)}
            className={`text-sm capitalize px-2 py-1 rounded-md ${
              viewMode === mode
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {mode}
          </button>
        ))}
        <img
          src="https://www.gravatar.com/avatar/?d=mp"
          alt="Profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </nav>
  );
}
