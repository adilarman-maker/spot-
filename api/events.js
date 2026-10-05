// GET /api/events          -> list all events
// GET /api/events?id=1     -> single event
//
// Mirrors public/js/events.js's EVENTS array. Registration state (who has
// registered for what) is NOT stored here yet — that needs real auth and a
// database, which is Level 4 of the upgrade plan. For now the frontend keeps
// registration state in memory, same as before.

const EVENTS = [
  { id: 1, title: 'Hackathon 2026', tagline: 'Build. Innovate. Solve.', cat: 'Technical', date: '2026-09-26', mon: 'SEP', day: 26, time: '10:00 AM – 6:00 PM', place: 'Seminar Hall', org: 'CSE Dept & Tech Club', gradient: 'linear-gradient(135deg,#0F172A,#334155)', desc: 'A 24-hour build sprint where teams ship a working prototype from scratch. Mentors on-site, prizes for the top three teams.' },
  { id: 2, title: 'Cultural Fest – Aarohan', tagline: 'Music · Dance · Drama · Art', cat: 'Cultural', date: '2026-09-28', mon: 'SEP', day: 28, time: '4:00 PM – 9:00 PM', place: 'Main Ground', org: 'Cultural Club', gradient: 'linear-gradient(135deg,#581C87,#EC4899)', desc: 'The college\u2019s biggest cultural night — live performances, dance battles, and an open stage for anyone who wants to perform.', featured: true },
  { id: 3, title: 'Inter-Branch Football', tagline: 'Play. Compete. Unite.', cat: 'Sports', date: '2026-10-02', mon: 'OCT', day: 2, time: '3:30 PM – 6:30 PM', place: 'Sports Ground', org: 'Sports Council', gradient: 'linear-gradient(135deg,#14532D,#4ADE80)', desc: 'Round-robin football tournament between all branches, finals followed by a prize ceremony.' },
  { id: 4, title: 'Web Development Workshop', tagline: 'HTML · CSS · JavaScript', cat: 'Technical', date: '2026-10-05', mon: 'OCT', day: 5, time: '10:00 AM – 1:00 PM', place: 'Lab 3', org: 'Tech Club', gradient: 'linear-gradient(135deg,#1E3A8A,#3B82F6)', desc: 'A hands-on beginner workshop covering the fundamentals of building and deploying a website.' },
  { id: 5, title: 'Poetry & Open Mic', tagline: 'Speak. Share. Be Heard.', cat: 'Literary', date: '2026-10-08', mon: 'OCT', day: 8, time: '5:00 PM – 8:00 PM', place: 'Library', org: 'Literary Club', gradient: 'linear-gradient(135deg,#78350F,#F59E0B)', desc: 'An open floor for poetry, spoken word, and short readings. All languages welcome.' },
  { id: 6, title: 'Guest Lecture – AI & Future', tagline: 'Industry Insights & Career Guidance', cat: 'Academic', date: '2026-10-10', mon: 'OCT', day: 10, time: '11:00 AM – 12:30 PM', place: 'Seminar Hall', org: 'AI & ML Club', gradient: 'linear-gradient(135deg,#1E1B4B,#7C3AED)', desc: 'A senior industry researcher shares where AI is heading and what skills matter most for students today.' },
  { id: 7, title: 'Tree Plantation Drive', tagline: 'Green Campus, Greener Tomorrow.', cat: 'Social', date: '2026-09-17', mon: 'SEP', day: 17, time: '9:00 AM – 12:00 PM', place: 'College Campus', org: 'NSS Club', gradient: 'linear-gradient(135deg,#14532D,#22C55E)', desc: 'Join fellow students in planting saplings across campus as part of our sustainability pledge.' },
  { id: 8, title: 'Ideathon 2026', tagline: 'Ideas to Impact.', cat: 'Innovation', date: '2026-10-15', mon: 'OCT', day: 15, time: '10:00 AM – 5:00 PM', place: 'Innovation Lab', org: 'Innovation & Entrepreneurship', gradient: 'linear-gradient(135deg,#312E81,#6366F1)', desc: 'Pitch your idea to a panel of mentors and investors for a chance at seed funding and incubation support.' },
];

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  if (id) {
    const event = EVENTS.find((e) => String(e.id) === String(id));
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.status(200).json(event);
    return;
  }

  res.status(200).json(EVENTS);
};
