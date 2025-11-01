import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: string;     // YYYY-MM-DD format
  time?: string;    // optional
  description?: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  description: { type: String },
});

export default mongoose.model<IEvent>("Event", EventSchema);
