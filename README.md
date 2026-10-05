# Spot — Dashboard (Web)

A responsive, light/dark web dashboard for Spot, matching the reference layout you shared. This build covers the **Dashboard page only** — the sidebar already lists all 7 upcoming modules (Faculty, Clubs, Events, Attendance, Messages, Approvals, Timetable) so navigation is visually complete, but those pages themselves come in the next build. Clicking any of them for now shows a "coming soon" toast instead of a dead link.

This is a separate project from `spot-app` (the earlier dark mobile-shell prototype) and `spot-mobile` (the React Native app) — this one is a **desktop-first, fully responsive admin-style dashboard** with its own light/dark theme, matching the ClubHub-style reference image.

## Backend & deployment

This project now has a real backend (`/api`) and is ready to deploy to Vercel. See **`BACKEND_AND_DEPLOYMENT.md`** for the full picture — what was added, how the Clubs page now fetches live data, deploy commands, and the step-by-step plan for upgrading everything else.

## Run it

```bash
cd spot-dashboard
npm install
npm start
```

Then open **http://localhost:4100**.

## What's built

**Dashboard (`index.html`)**
- Greeting banner, 4 stat cards, horizontally-scrollable Upcoming Events, My Clubs row, Announcements + Quick Actions, and a right rail with Faculty, an animated Attendance donut chart, Approvals (working Approve/Reject buttons), and Messages

**Clubs (`clubs.html`)** — new this round
- Explore banner matching the reference (tag row, heading, decorative script text)
- Category filter pills (All Clubs / Technical / Cultural / Sports / Social / Academic / Others) — fully functional
- 4 compact stat cards (Total Clubs, My Clubs, New This Week, Popular Clubs) — My Clubs count updates live as you join/leave
- Search (by name/description/tagline), sort (Most Popular / Name / Newest), and a working grid ↔ list view toggle
- 12 club cards with bookmark toggle and a working **Join Club** button (updates the card, the stat count, and shows a toast)
- Right rail: Recommended for You (with working Join buttons), Upcoming Events, a "Try Club Finder" CTA, and Today's Top Picks tags

**Faculty (`faculty.html`)** — new this round
- Staff & Faculty Directory banner, 6 filter pills (All / Faculty / Staff / HODs / Coordinators / Mentors)
- Search (name, department, designation, expertise) plus Department, Designation and Sort dropdowns, all combinable
- 56 directory members in a 4-column card grid with online status, HOD badges, contact details, working pagination (12 per page, "Showing 1–12 of 56")
- **View Profile** opens a modal (Esc / click outside to close, Copy email); **Message** shows a toast until the Messages page exists
- Right rail: Quick Stats, Departments (click one to filter the grid), Recent Activity, and a contact CTA
- Rail numbers are computed from the directory data, so they always agree with the cards

**Messages (`messages.html`)** — new this round
- Conversation list with 10 sample threads (clubs, groups, faculty, direct), filterable by All/Direct/Clubs/Groups/Faculty/Staff and searchable by name or last message
- Full chat thread: text bubbles, file/link attachments with download buttons, in-chat search with highlighted matches, mute toggle, and a working composer (Enter or the send button)
- Sending a direct message to a person triggers a realistic auto-reply after ~1.3s; sending to a club/group just posts your message, like a real group chat
- Context rail changes based on what's open: a person shows View Profile/Call, a club shows View Club/Join (synced with the Clubs page's join state), a group shows Group Info/Mute — plus shared files and quick actions (Share File and Schedule Meeting actually post messages into the thread)
- **New Message** button opens a compose dialog — pick a recipient, write a message, and it opens that conversation with your message sent
- On mobile, the list and chat panel are two separate screens with a back button, instead of a cramped side-by-side layout

**Events (`events.html`)** — new this round
- Banner, 4 stat cards (Total/My Registrations/Upcoming/Featured — all computed live from the event data, not hardcoded), and an 8-event catalog
- The "Upcoming Events" grid only shows events from today onward by default; a 14-day calendar strip (with prev/next paging) lets you jump to any specific day, past or future, to see what's on
- Event Categories in the rail filter the grid; **View Details** opens a modal with the full description and its own Register button; **Register** works from the grid card, the modal, or the Featured Events card — all three stay in sync
- My Registrations list and the "My Registrations" stat count update immediately when you register or unregister
- "Create Event Proposal" shows a toast, since event creation isn't built yet

**Attendance (`attendance.html`)** — new this round
- 4 live stat cards (Overall %, Attended, Missed, Subjects Below 75%) computed from real subject data, not hardcoded
- Overview tab (donut chart + recent activity), Subjects tab (per-subject bars, click → modal with that subject's own mini donut and history), History tab (filterable by month)
- Rail: Today's Classes, a low-attendance warning banner (only appears when a subject is actually below 75%), Best/Lowest subject callouts

**Timetable (`timetable.html`)** — new this round
- Day pills for the full week, with "Today" marked automatically; each day shows its own class count
- Color-coded slot list — click any class for a detail modal (faculty, room, a Message Faculty button that jumps to Messages)
- Rail: a live "Next Class" card, a weekly summary, and upcoming exams

**Approvals (`approvals.html`)** — new this round
- Your own outgoing requests (event registrations, club join requests, permission/outing requests) — not a staff-side approval queue
- 4 stat cards, status filter pills, and request cards that open a full timeline modal (Submitted → Under Review → Decision)
- **New Request** opens a form that actually posts a new Pending card; pending requests can be cancelled from the card or the modal
- Rail's Request Types list filters by type with one click

**Profile (`profile.html`)** — new this round
- Header card with avatar, roll number badge, and an **Edit Profile** modal that updates the header and bio immediately (session-only)
- Overview tab (bio, academic info, contact details) and Activity tab (your clubs, your events, a recent-activity feed)
- Rail: quick stats and an achievement badge grid (locked vs. unlocked)

**Settings (`settings.html`)** — new this round
- Appearance section is synced with the same theme system as the topbar toggle — switching here or there updates both
- Notification and Privacy toggles live in a draft state with a **Save Changes / Discard Changes** bar that only appears once you've actually changed something, and settings persist to `localStorage` across reloads
- Account section includes a working Change Password dialog (validates match + minimum length) and a two-factor toggle
- Danger Zone's Log Out asks for confirmation before actually doing anything

**Shared across all pages**
- Light/dark mode toggle, persisted via `localStorage`
- Fully responsive: laptop → smaller desktop (right rail wraps below) → tablet (icon-only sidebar) → mobile (off-canvas drawer)
- Sidebar nav with all 7 modules (Faculty, Clubs, Events, Attendance, Messages, Approvals, Timetable) — **All 9 modules are now real, linked pages** — the sidebar nav is fully wired end-to-end, the rest still show a "coming soon" toast until built
- A `BUILT_PAGES` map in `js/common.js` is the single place that turns a "coming soon" module into a real link once its page exists — add an entry there when building the next page, no need to touch every button/link individually

## Project structure

```
spot-dashboard/
├── server.js              Static file server
├── package.json
└── public/
    ├── index.html          Dashboard page
    ├── clubs.html          Clubs page
    ├── faculty.html        Faculty page
    ├── messages.html       Messages page
    ├── events.html         Events page
    ├── attendance.html     Attendance page
    ├── timetable.html      Timetable page
    ├── approvals.html      Approvals page
    ├── profile.html        Profile page
    ├── settings.html       Settings page
    ├── css/style.css       Full design system — light/dark tokens + responsive rules (shared by both pages)
    └── js/
        ├── icons.js         Shared SVG icon set
        ├── common.js        Shared utilities: theme toggle, mobile nav, icon hydration, toast, BUILT_PAGES map
        ├── main.js          Dashboard-specific data + rendering
        ├── clubs.js         Clubs-specific data + rendering + filtering/sorting/join logic
        ├── faculty.js       Faculty directory data, filters, pagination, profile modal
        ├── messages.js      Messages data, chat logic, context rail, New Message dialog
        ├── events.js        Events data, calendar, category/day filtering, registration state
        ├── attendance.js    Attendance tabs, donut charts, subject/history filtering
        ├── timetable.js     Weekly schedule, day switching, next-class logic
        ├── approvals.js     Request tracking, timeline modal, new-request form
        ├── profile.js       Profile header, tabs, edit-profile modal
        └── settings.js      Appearance/notifications/privacy, draft+save state, account actions
```

## Notes

- All content is mock data (no backend yet, matching what you asked for this round).
- **All 9 sidebar modules are now built.** The full Dashboard, Clubs, Faculty, Messages, Events, Attendance, Timetable, Approvals, Profile and Settings pages are complete, cross-linked, and verified.
