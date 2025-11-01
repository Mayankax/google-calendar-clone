import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";

export function getMonthDays(date: Date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 }); // Sunday
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

  return eachDayOfInterval({ start, end });
}

export function getNextMonth(date: Date) {
  return addMonths(date, 1);
}

export function getPrevMonth(date: Date) {
  return subMonths(date, 1);
}

export { format, isSameMonth, isSameDay };
