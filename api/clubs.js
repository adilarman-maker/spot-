// GET /api/clubs            -> list all clubs
// GET /api/clubs?id=1       -> single club
//
// This data currently mirrors public/js/clubs.js's CLUBS array exactly.
// Level 3 of the upgrade plan replaces this array with a Supabase query —
// the shape returned here is the contract the frontend already expects,
// so that swap won't require any frontend changes.

const CLUBS = [
  { id: 1, name: 'Code Craft', tagline: 'Build. Code. Create.', desc: 'A club for developers, problem solvers and tech enthusiasts.', category: 'Technical', members: 142, location: 'Lab 2', schedule: 'Weekly Meetups', gradient: 'linear-gradient(135deg,#312E81,#7C3AED)', accent: 'var(--purple)', icon: 'code' },
  { id: 2, name: 'Robotics Club', tagline: 'Design. Build. Innovate.', desc: 'Explore robotics, automation and cutting-edge tech.', category: 'Technical', members: 96, location: 'Lab 2', schedule: 'Tue & Thu · 5:00 PM', gradient: 'linear-gradient(135deg,#334155,#64748B)', accent: 'var(--blue)', icon: 'robot' },
  { id: 3, name: 'Sports Council', tagline: 'Play. Compete. Grow.', desc: 'Organize and participate in sports events and tournaments.', category: 'Sports', members: 76, location: 'Ground', schedule: 'Daily · 4:00 PM', gradient: 'linear-gradient(135deg,#166534,#22C55E)', accent: 'var(--green)', icon: 'trophy' },
  { id: 4, name: 'Cultural Club', tagline: 'Celebrate Diversity.', desc: 'Music, dance, drama and more. Express your creativity.', category: 'Cultural', members: 64, location: 'Main Ground', schedule: 'Weekly Practice', gradient: 'linear-gradient(135deg,#831843,#EC4899)', accent: 'var(--pink)', icon: 'drama' },
  { id: 5, name: 'Photography Club', tagline: 'Capture. Create. Share.', desc: 'Explore the world through your lens.', category: 'Cultural', members: 88, location: 'Library', schedule: 'Weekend Outings', gradient: 'linear-gradient(135deg,#581C87,#A855F7)', accent: 'var(--purple)', icon: 'compass' },
  { id: 6, name: 'AI & ML Club', tagline: 'Learn. Build. Grow.', desc: 'Explore AI, ML and real-world applications.', category: 'Technical', members: 60, location: 'Lab 1', schedule: 'Fri · 4:00 PM', gradient: 'linear-gradient(135deg,#1E3A8A,#3B82F6)', accent: 'var(--blue)', icon: 'robot' },
  { id: 7, name: 'Literary Club', tagline: 'Read. Write. Express.', desc: 'For book lovers, writers and storytellers.', category: 'Others', members: 52, location: 'Library', schedule: 'Weekly Meetups', gradient: 'linear-gradient(135deg,#134E4A,#14B8A6)', accent: 'var(--teal)', icon: 'fileText' },
  { id: 8, name: 'Environmental Club', tagline: 'Go Green. Make a Difference.', desc: 'Work towards a cleaner and greener campus.', category: 'Social', members: 48, location: 'Campus', schedule: 'Monthly Drives', gradient: 'linear-gradient(135deg,#14532D,#4ADE80)', accent: 'var(--green)', icon: 'compass' },
  { id: 9, name: 'Music Club', tagline: 'Play. Perform. Feel.', desc: 'For all music lovers and artists.', category: 'Cultural', members: 58, location: 'Auditorium', schedule: 'Weekly Jam', gradient: 'linear-gradient(135deg,#701A75,#C026D3)', accent: 'var(--pink)', icon: 'drama' },
  { id: 10, name: 'Debate Club', tagline: 'Think. Speak. Lead.', desc: 'Sharpen your mind with meaningful discussions.', category: 'Academic', members: 44, location: 'Seminar Hall', schedule: 'Fri · 3:00 PM', gradient: 'linear-gradient(135deg,#1E3A8A,#60A5FA)', accent: 'var(--blue)', icon: 'megaphone' },
  { id: 11, name: 'NSS Club', tagline: 'Serve. Support. Create Change.', desc: 'Community service for a better tomorrow.', category: 'Social', members: 90, location: 'Campus', schedule: 'Weekend Drives', gradient: 'linear-gradient(135deg,#134E4A,#2DD4BF)', accent: 'var(--teal)', icon: 'users' },
  { id: 12, name: 'Innovation & Entrepreneurship', tagline: 'Ideas. Teams. Impact.', desc: 'Turn your ideas into real solutions.', category: 'Academic', members: 70, location: 'Innovation Lab', schedule: 'Bi-weekly', gradient: 'linear-gradient(135deg,#581C87,#C084FC)', accent: 'var(--purple)', icon: 'plusCircle' },
];

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  if (id) {
    const club = CLUBS.find((c) => String(c.id) === String(id));
    if (!club) {
      res.status(404).json({ error: 'Club not found' });
      return;
    }
    res.status(200).json(club);
    return;
  }

  res.status(200).json(CLUBS);
};
