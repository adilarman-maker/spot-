const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4100;

// Mount the same handler files Vercel runs as serverless functions.
// Vercel's (req, res) signature and Express's are compatible, so these
// files work unmodified in both places — one backend, two hosting targets.
const API_ROUTES = ["clubs", "events", "faculty", "attendance", "timetable", "approvals", "messages"];
API_ROUTES.forEach((name) => {
  app.get(`/api/${name}`, require(`./api/${name}.js`));
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`\n  Spot Dashboard is running: http://localhost:${PORT}\n`);
  console.log(`  API: http://localhost:${PORT}/api/clubs  (and /events, /faculty, ...)\n`);
});
