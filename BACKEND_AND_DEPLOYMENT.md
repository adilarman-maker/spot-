# Spot Dashboard — Backend & Deployment

## What just got added

```
spot-dashboard/
├── vercel.json              Tells Vercel: serve public/ as static, run api/ as serverless functions
├── api/
│   ├── clubs.js              REAL — full 12-club dataset, GET /api/clubs and /api/clubs?id=N
│   ├── events.js             REAL — full 8-event dataset, GET /api/events and /api/events?id=N
│   ├── faculty.js            REAL — generates the same 56-person directory as the frontend did,
│   │                           GET /api/faculty, ?id=N, or ?dept=CSE
│   ├── attendance.js         STUB — returns a placeholder shape, not wired to the frontend yet
│   ├── timetable.js          STUB — same
│   ├── approvals.js          STUB — same
│   └── messages.js           STUB — same (also needs Realtime eventually, not just REST)
└── server.js                 Updated: mounts the same api/*.js files as local Express routes
```

The key design choice: **every file in `api/` exports a plain `(req, res) => {...}` function.** That signature is exactly what Vercel expects from a serverless function, and it's *also* exactly what Express route handlers look like. `server.js` now does:

```js
app.get('/api/clubs', require('./api/clubs.js'));
```

So the same code runs identically whether you're testing locally with `npm start` or it's live on Vercel — one backend, no duplication, no "works locally but not in prod" surprises.

## Only Clubs is wired to fetch from the API so far

`public/js/clubs.js` used to have a hardcoded `const CLUBS = [...]` array. It's now:

```js
let CLUBS = [];
// ...
document.addEventListener('DOMContentLoaded', async () => {
  // shows a loading state, then:
  CLUBS = await loadClubsFromApi(); // fetch('/api/clubs')
  renderMainContent();
  // ...
});
```

This is the **reference pattern** — Events and Faculty have real API endpoints ready and waiting, but their frontend files still use their original inline arrays. Swapping them over is the exact same three-step change as Clubs:
1. Change `const X = [...]` to `let X = [];`
2. Wrap the `DOMContentLoaded` body in `async`, add a `fetch('/api/x')` with a loading state and try/catch
3. Nothing else changes — every render function already reads from the variable, not from where it came from

I verified this end-to-end with real HTTP requests against a running server (not just "the code looks right") — the Clubs page genuinely round-trips through the network now.

## Deploying to Vercel

```bash
npm install -g vercel     # one-time
cd spot-dashboard
vercel                    # first deploy — follow the prompts, link or create a project
vercel --prod             # subsequent production deploys
```

Or, without the CLI: push this folder to a GitHub repo and import it at vercel.com — it auto-detects `vercel.json` and the `api/` folder with zero extra config.

**No environment variables are needed yet** — everything here is self-contained mock data. That changes at Level 3 below.

## The step-by-step upgrade plan

Each level is a self-contained unit of work for a future chat — don't feel like you need to do them all at once, or in a single sitting.

### Level 1 — Static deploy ✅ *(ready now)*
Push to Vercel as-is. The whole site works, including the 3 live API endpoints, with zero config.

### Level 2 — Finish wiring the frontend to the API *(next)*
Repeat the Clubs pattern for Events and Faculty (endpoints already exist, just need the 3-step frontend swap above). Then build real endpoints + wire-ups for Attendance, Timetable, Approvals, and Messages (currently stubs).

### Level 3 — Real database (Supabase)
Replace the hardcoded arrays inside each `api/*.js` file with Supabase queries. Because every endpoint already returns the same JSON shape the frontend expects, this is a backend-only change — no frontend code needs to touch once Level 2 is done. This is also where `college_id` gets added to every table, so the same codebase can support more than one college later.

### Level 4 — Authentication
Add Supabase Auth. Replace the hardcoded "Aarav Sharma" user with a real logged-in session. This unlocks per-user data: real attendance records, real registrations, real approval requests tied to a real account instead of in-memory state that resets on reload.

### Level 5 — Realtime messaging
Messages currently simulates replies with a `setTimeout`. Swap that for Supabase Realtime (or Socket.IO) so messages actually sync between two people's browsers.

### Level 6 — Mobile app parity
Point the React Native app (`spot-mobile`) at the same API. Once Level 3 is done, both the web dashboard and the mobile app read from one shared backend instead of having separate mock data.

### Level 7 — Production hardening
Rate limiting, input validation (Zod, per the original stack plan), error tracking (Sentry), and basic analytics (PostHog) once there's real traffic to monitor.

## A note on this session

Partway through this build, the sandboxed environment I was working in reset and wiped my scratch files — everything in `/home/claude` disappeared mid-task. I was able to recover completely because the *previous* zip I'd delivered to you was still sitting in the outputs folder, so nothing you have was lost — but it's worth knowing that this kind of reset can happen, which is exactly why "redeliver the full zip after every real milestone" (like you asked for this round) is a good habit, not just a convenience.
