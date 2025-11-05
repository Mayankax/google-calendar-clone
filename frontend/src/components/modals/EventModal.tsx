import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEvents } from "../../context/EventContext";

export default function EventModal({ open, onClose, defaultDate, event, refresh }: {
  open: boolean;
  onClose: () => void;
  defaultDate?: string;
  event?: any;
  refresh?: () => void;
}) {
  const { addEvent, editEvent, removeEvent } = useEvents();
  const isEditing = !!event;

  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || defaultDate || "");
  const [time, setTime] = useState(event?.time || "");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time || "");
    } else if (defaultDate) {
      setDate(defaultDate);
    }
  }, [event, defaultDate]);

  const handleSave = async () => {
    if (!title.trim()) return;
    if (isEditing) {
      await editEvent(event._id, { title, date, description: time ? `Time: ${time}` : "" });
    } else {
      await addEvent({ title, date, description: time ? `Time: ${time}` : "" });
    }
    refresh && refresh();
    onClose();
  };

  const handleDelete = async () => {
    if (event?._id) {
      await removeEvent(event._id);
      refresh && refresh();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <DialogFooter>
          {isEditing && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{isEditing ? "Update" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
