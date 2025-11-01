import type { Request, Response } from "express";
import Event from "../models/Events.js";

// ✅ GET all events
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// ✅ POST new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

// ✅ DELETE event by id
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};
