# Spot Dashboard — PRD for Attendance, Timetable, Approvals, Profile, Settings

**Status: All 5 pages built, verified, and shipped.** Every page was syntax-checked, cross-checked for icon/scoping issues, and run through a jsdom harness exercising its real interactions before being counted as done. Two real bugs were caught and fixed during this build (see notes at the bottom of each section below where relevant) — most notably, `closeModal()` across all pages now clears the modal's content on close, not just hides it, after a stale-DOM issue was traced to that pattern.

Written to keep all 5 remaining pages consistent with the 5 already built (Dashboard, Clubs, Faculty, Messages, Events) — same shell, same data-driven rendering pattern, same verification bar (icon cross-check + jsdom runtime test before packaging).

## Build order
1. Attendance
2. Timetable
3. Approvals
4. Profile
5. Settings

(Profile/Settings last since they depend on nothing else and are lower-risk; Attendance/Timetable/Approvals are the "real" module pages matching the sidebar's numbered badges.)

## 1. Attendance
**Purpose:** student's personal attendance record.
- Banner + 4 stat cards: Overall %, Classes Attended, Classes Missed, Subjects Below 75%
- Tabs: Overview (donut chart + recent activity) / Subjects (per-subject bars, click → detail modal) / History (full log, filterable by month)
- Rail: today's classes mini-schedule, a low-attendance warning if any subject <75%, monthly trend sparkline

## 2. Timetable
**Purpose:** weekly class schedule.
- Banner + day pills (Mon–Sat) + "Today" indicator
- Main: time-ordered slot list for the selected day, color-coded by subject, click a slot → modal with faculty/room/contact
- Rail: Next Class card, weekly summary (total classes, free periods), upcoming exams list

## 3. Approvals
**Purpose:** the student's own outgoing requests (event registration, club join, permission requests) — matches the sidebar's "2" badge.
- Banner + 4 stat cards: Pending, Approved, Rejected, Total
- Filter pills by status; request cards with a timeline; **+ New Request** opens a form modal (type, reason, dates) and posts a new Pending card
- Pending requests can be cancelled

## 4. Profile
**Purpose:** the logged-in student's own profile.
- Header card: avatar, name, roll no., edit toggle
- Tabs: Overview (bio, academic info) / Activity (joined clubs, registered events, recent actions)
- Rail: quick stats (clubs, events, attendance), achievement badges
- **Edit Profile** opens a form modal; changes reflect immediately in the header (session-only, no backend)

## 5. Settings
**Purpose:** account preferences.
- Sectioned single-column layout: Appearance (theme — synced with the existing toggle), Notifications (toggles), Privacy (toggles), Account (change password → toast), Danger Zone (Log Out → confirm dialog)
- Rail: a help/support card

## Shared rules (carried over from the first 5 pages)
- Every new icon gets cross-checked against `icons.js` before use (`comm -23` against defined keys) — this caught 2 real bugs already.
- Any `document.querySelectorAll` that could match elements outside its own function's intended scope gets scoped with a container `id` — this caused a real double-click bug on Events and must not repeat.
- Every page gets a `BUILT_PAGES` entry in `common.js` and its nav link updated on *all* existing pages, not just the new one.
- Every page gets syntax-checked, then run through the jsdom harness exercising its real interactions (not just "does it load"), before packaging.
