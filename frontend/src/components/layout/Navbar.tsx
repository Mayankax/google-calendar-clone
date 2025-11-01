import { Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">Google Calendar Clone</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-700 hover:text-blue-600">Today</button>
        <button className="text-sm text-gray-700 hover:text-blue-600">Month</button>
        <button className="text-sm text-gray-700 hover:text-blue-600">Week</button>
        <button className="text-sm text-gray-700 hover:text-blue-600">Day</button>
        <img
          src="https://www.gravatar.com/avatar/?d=mp"
          alt="Profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </nav>
  );
}
