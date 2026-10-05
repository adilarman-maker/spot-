// GET /api/messages
// STUB — not yet wired to the frontend. See api/attendance.js for why.
// Real messaging also needs Realtime (Supabase Realtime / Socket.IO per the
// tech stack plan) which a plain request/response API can't provide on its
// own — that's Level 5.

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  res.status(200).json({ note: 'STUB endpoint — not yet wired to the frontend. See api/messages.js.' });
};
