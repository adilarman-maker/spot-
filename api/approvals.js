// GET /api/approvals
// STUB — not yet wired to the frontend. See api/attendance.js for why.

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  res.status(200).json({ note: 'STUB endpoint — not yet wired to the frontend. See api/approvals.js.' });
};
