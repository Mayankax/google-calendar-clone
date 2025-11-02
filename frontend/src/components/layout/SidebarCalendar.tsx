import React from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface SidebarCalendarProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const SidebarCalendar: React.FC<SidebarCalendarProps> = ({
  selectedDate,
  onChange,
}) => {
  // Handle single or range selection safely
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      onChange(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      onChange(value[0]);
    }
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow-sm">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="rounded-lg"
        tileClassName={({ date }) => {
          const today = new Date();
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return "bg-blue-100 rounded-full text-blue-600 font-semibold";
          }
          return "";
        }}
      />
    </div>
  );
};

export default SidebarCalendar;
