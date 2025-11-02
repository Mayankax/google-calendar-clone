import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEvents } from "../../context/EventContext";

export default function EventModal({
  open,
  onClose,
  defaultDate,
  refresh,
}: {
  open: boolean;
  onClose: () => void;
  defaultDate?: string;
  refresh?: () => void;
}) {
  const { addEvent } = useEvents();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate || "");
  const [time, setTime] = useState("");

  // ✅ Update date state whenever defaultDate changes
  useEffect(() => {
    if (defaultDate) {
      setDate(defaultDate);
    }
  }, [defaultDate]);

  const handleSave = async () => {
    if (!title.trim()) return;

    await addEvent({
      title,
      date: date || new Date().toISOString().split("T")[0],
      description: time ? `Time: ${time}` : "",
    });

    setTitle("");
    setDate("");
    setTime("");
    onClose();
    refresh && refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Show date input only when not clicking a grid block */}
          {!defaultDate && (
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          )}

          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
