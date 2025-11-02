const API_BASE = "http://localhost:5000/api/events";

export async function fetchEvents() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function createEvent(event: {
  title: string;
  date: string;
  description?: string;
}) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return res.json();
}

export async function deleteEvent(id: string) {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
}
