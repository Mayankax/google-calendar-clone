import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import CalendarView from "./components/layout/CalendarView";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <CalendarView />
      </div>
    </div>
  );
}
