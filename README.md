# Google Calendar Clone

[![Repo stars](https://img.shields.io/github/stars/Mayankax/google-calendar-clone?style=for-the-badge)](https://github.com/Mayankax/google-calendar-clone/stargazers)
[![Open issues](https://img.shields.io/github/issues/Mayankax/google-calendar-clone?style=for-the-badge)](https://github.com/Mayankax/google-calendar-clone/issues)

A lightweight, developer-focused Google Calendar clone built with a TypeScript Express backend and a React + Vite TypeScript frontend. It demonstrates a small full-stack app with event CRUD, a calendar UI, and simple state management.

## What the project does

- Stores calendar events (title, date, optional time and description) in MongoDB.
- Exposes a minimal REST API at `/api/events` (list, create, delete).
- Provides a React + Vite frontend with a calendar view, sidebar, and modal UI for creating events.

## Why this is useful

- Learning: small, real-world example of TypeScript across backend and frontend.
- Starter kit: clone and extend — integrate authentication, recurring events, or syncing.
- Portable: uses familiar libraries (Express, Mongoose, React, Vite) and simple APIs for quick experimentation.

## Repo layout

- `backend/` — Express + TypeScript server, Mongoose models and event routes.
- `frontend/` — React + Vite TypeScript app, calendar UI and Event context/provider.

## Quick start (developer)

Prerequisites

- Node.js 18+ (or current LTS)
- MongoDB (local or cloud URI)

Start the backend

1. Open a terminal and start the API server:

```powershell
cd backend
npm install
# Create a .env file in backend/ with the following keys (example):
# MONGO_URI=mongodb://localhost:27017/google-calendar-clone
# PORT=5000

npm run dev
```

By default the backend listens on port `5000` and exposes `/api/events`.

Start the frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend uses Vite and will open at `http://localhost:5173` (or similar). It fetches events from `http://localhost:5000/api/events` by default.

Notes

- Backend scripts (see `backend/package.json`): `dev` (nodemon + ts-node), `build`, `start`.
- Frontend scripts (see `frontend/package.json`): `dev` (vite), `build`, `preview`.

## Example usage

Create an event (JS fetch example)

```js
// frontend/src/lib/api.ts demonstrates the same calls
await fetch('http://localhost:5000/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Team sync', date: '2025-11-03', description: 'Weekly sync' })
});
```

List events (curl)

```bash
curl http://localhost:5000/api/events
```

Delete an event (curl)

```bash
curl -X DELETE http://localhost:5000/api/events/<eventId>
```

## Development notes & internals

- Backend
  - Entry: `backend/src/server.ts`
  - DB connection: `backend/src/config/db.ts` (Mongoose)
  - Model: `backend/src/models/Events.ts` (title, date, time, description)
  - Controller: `backend/src/controllers/eventController.ts` (get/create/delete)

- Frontend
  - Entry: `frontend/src/main.tsx`
  - App shell: `frontend/src/App.tsx`
  - Event context/provider: `frontend/src/context/EventContext.tsx`
  - API helpers: `frontend/src/lib/api.ts` (points to `http://localhost:5000/api/events`)

## Where to get help

- File an issue: https://github.com/Mayankax/google-calendar-clone/issues
- For quick questions, add a concise issue with steps to reproduce or a screenshot.

## Who maintains and how to contribute

Maintainer: Mayankax — https://github.com/Mayankax

Contributions are welcome. For small changes, open a PR against `main`. Keep changes focused (feature, bugfix, docs). If you plan a large feature, open an issue first to discuss scope.

## Related files and references

- Frontend README: `frontend/README.md`
- Backend package.json: `backend/package.json`
- Frontend package.json: `frontend/package.json`

## Quick checklist for PRs

- [ ] New behavior has unit or integration tests where applicable
- [ ] Linting passes (`npm run lint` in `frontend` when applicable)
- [ ] README updated if public behavior or commands change

---

Enjoy exploring and extending this mini calendar app!
