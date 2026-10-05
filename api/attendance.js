// GET /api/attendance
// STUB — not yet wired to the frontend (public/js/attendance.js still uses
// its own in-page mock data). Shape matches what that page will eventually
// expect. Level 3+4 of the upgrade plan: real attendance needs a logged-in
// user and a database table, so this is here as a placeholder contract.

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  res.status(200).json({
    note: 'STUB endpoint — not yet wired to the frontend. See api/attendance.js.',
    overall: 88,
    classesAttended: 197,
    classesMissed: 27,
  });
};
