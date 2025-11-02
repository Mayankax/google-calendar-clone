# 🗓️ SmartPlanner – Interactive Calendar Application

SmartPlanner is a modern calendar application built with **React + TypeScript**, featuring a clean UI, intuitive event management, and smooth interactions. It allows users to create, view, and manage events effortlessly, with highlighted current dates and animated interactions for a seamless experience.

---

## 🚀 Features

- 📅 **Interactive Calendar** — Click on any date to view or add events.  
- ✍️ **Add, Edit & Delete Events** — Simple event management with instant updates.  
- 🕒 **Highlight Today’s Date** — Automatically highlights the current date for better visibility.  
- ⚙️ **No Overlapping Events** — Smart checks to prevent event time conflicts.  
- 🔁 **Optional Recurring Events** — Support for repeated tasks (if enabled).  
- 🎨 **Modern UI & Animations** — Built using TailwindCSS and Framer Motion for smooth transitions.

---

## 🧱 Project Architecture

src/
│
├── components/
│ ├── Calendar.tsx # Displays monthly view and highlights today’s date
│ ├── Sidebar.tsx # Sidebar with "Create" button and calendar categories
│ └── modals/
│ └── EventModal.tsx # Handles event creation and editing
│
├── context/
│ └── EventContext.tsx # Global state management for all events
│
├── lib/
│ └── api.ts # API layer for event CRUD operations (mock/local)
│
├── App.tsx # Main app component combining sidebar & calendar
└── index.tsx # Entry point

yaml
Copy code

### 🧩 Technology Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript |
| Styling | TailwindCSS |
| Animations | Framer Motion |
| State Management | React Context API |
| UI Components | Shadcn/UI |
| Build Tool | Vite / CRA (depending on setup) |

---

## ⚙️ Setup & Run Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/smartplanner.git
cd smartplanner
2. Install dependencies
bash
Copy code
npm install
3. Start the development server
bash
Copy code
npm run dev
4. Build for production
bash
Copy code
npm run build
🧠 Business Logic Overview
🗓️ Event Management
Add Event: Opens a modal where users can specify title, date, and description.

Edit/Delete Event: Context API ensures changes reflect instantly across all components.

Prevent Overlap: Before saving an event, checks ensure there’s no time clash on the same date.

🌟 Highlighting Today
The calendar dynamically compares each date with new Date() and applies a unique Tailwind class (bg-blue-100 border-blue-600) to the block for today.

🔁 Recurring Events
Designed for easy extension — recurrence rules can be stored with events (daily, weekly, monthly).

✨ Animations & Interactions
Framer Motion adds transitions when opening modals and hovering over dates.

Smooth Hover Effects using Tailwind utility classes (hover:bg-gray-200, transition-all).

Modal Transitions fade in/out with subtle scaling to improve UX.

🧩 Edge Cases Handled
Case	Handling
Adding overlapping event	Prevented with validation in event creation
Selecting past/future dates	Fully supported
Empty event title	Validation blocks submission
Deleting event	Immediate update in global state
Highlighting current date	Automatically adjusts at midnight (based on system date)

💡 Future Enhancements
🔔 Notifications & Reminders for upcoming events

☁️ Google Calendar / Outlook Sync

🌓 Dark Mode Toggle

🖱️ Drag & Drop for Rescheduling Events

📱 Mobile-Responsive View with Swipe Gestures

🔄 Recurring Event Editor (advanced rule-based scheduling)

🧑‍💻 Author
Mayank Bansal
💼 B.Tech CSE (Data Science) – Bennett University
🌐 Passionate about Web Development, AI, and User Experience Design
🔗 LinkedIn · GitHub

🛡️ License
This project is licensed under the MIT License – feel free to use, modify, and distribute.