// GET /api/faculty          -> list all 56 staff/faculty members
// GET /api/faculty?id=3     -> single person
// GET /api/faculty?dept=CSE -> filter by department code
//
// This generates the exact same 56-person directory as public/js/faculty.js's
// buildDirectory(), so swapping the frontend over to this endpoint later
// produces identical data. Level 3 replaces this generator with a real
// Supabase table.

const DEPTS = [
  { code: 'CSE', name: 'Computer Science & Engineering', block: 'CSE Block', floor: 1 },
  { code: 'ECE', name: 'Electronics & Communication', block: 'ECE Block', floor: 3 },
  { code: 'MECH', name: 'Mechanical Engineering', block: 'Mech Block', floor: 1 },
  { code: 'CIVIL', name: 'Civil Engineering', block: 'Civil Block', floor: 4 },
  { code: 'MATH', name: 'Mathematics', block: 'Maths Block', floor: 3 },
  { code: 'PHY', name: 'Physics', block: 'Physics Block', floor: 2 },
  { code: 'HSS', name: 'Humanities & Social Sciences', block: 'Admin Block', floor: 2 },
  { code: 'IT', name: 'Information Technology', block: 'IT Block', floor: 2 },
];
const DEPT_BY_CODE = Object.fromEntries(DEPTS.map((d) => [d.code, d]));

const HAND = [
  ['Dr. Ramesh Kumar', 'HOD', 'CSE'], ['Prof. Anita Sharma', 'Assistant Professor', 'CSE'],
  ['Dr. Vijay Patel', 'Associate Professor', 'MATH'], ['Prof. Sneha Reddy', 'Assistant Professor', 'PHY'],
  ['Dr. Karan Singh', 'Assistant Professor', 'MECH'], ['Prof. Pooja Verma', 'Associate Professor', 'ECE'],
  ['Dr. Arjun Nair', 'Professor', 'CIVIL'], ['Prof. Meera Iyer', 'Assistant Professor', 'HSS'],
  ['Dr. Suresh Babu', 'Professor', 'CSE'], ['Prof. Lakshmi Rao', 'Associate Professor', 'HSS'],
  ['Dr. Faizan Ahmed', 'Assistant Professor', 'IT'], ['Prof. Divya Rangan', 'Assistant Professor', 'CSE'],
];
const TARGET = { CSE: 14, ECE: 9, MECH: 7, CIVIL: 5, MATH: 5, PHY: 4, HSS: 6, IT: 6 };
const FIRST = ['Rajesh', 'Sunita', 'Amit', 'Neha', 'Rohit', 'Kavita', 'Sanjay', 'Pallavi', 'Manoj', 'Deepa', 'Naveen', 'Swati', 'Harish', 'Rekha', 'Vivek', 'Anjali', 'Prakash', 'Shalini', 'Gopal', 'Nisha', 'Ashok', 'Madhavi', 'Tarun', 'Bhavna', 'Srinivas', 'Usha', 'Mohan', 'Padma', 'Kiran', 'Jyothi', 'Ravi', 'Sudha', 'Anil', 'Farah', 'Dinesh', 'Latha', 'Nikhil', 'Ritu', 'Sameer', 'Tanvi', 'Venkat', 'Zoya', 'Girish', 'Hema'];
const LAST = ['Menon', 'Chatterjee', 'Kulkarni', 'Bose', 'Joshi', 'Pillai', 'Desai', 'Malhotra', 'Gupta', 'Naidu', 'Shetty', 'Kapoor', 'Mishra', 'Banerjee', 'Hegde', 'Thakur', 'Rastogi', 'Bhat', 'Saxena', 'Chopra', 'Varma', 'Ghosh', 'Reddy', 'Khan', 'Yadav', 'Nambiar', 'Sinha', 'Agarwal', 'Rao', 'Das', 'Iyengar', 'Mukherjee', 'Pandey', 'Kaur', 'Trivedi', 'Solanki', 'Goel', 'Patil', 'Lal', 'Sethi', 'Dutta', 'Bhatia', 'Mehra', 'Jain'];
const FEMALE = new Set(['Sunita', 'Neha', 'Kavita', 'Pallavi', 'Deepa', 'Swati', 'Rekha', 'Anjali', 'Shalini', 'Nisha', 'Madhavi', 'Bhavna', 'Usha', 'Padma', 'Jyothi', 'Sudha', 'Farah', 'Latha', 'Ritu', 'Tanvi', 'Zoya', 'Hema']);

function buildDirectory() {
  const people = [];
  const count = {};
  const make = (name, designation, dept, isStaff, i) => {
    const d = DEPT_BY_CODE[dept];
    count[dept] = (count[dept] || 0) + 1;
    const slug = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '').toLowerCase().replace(/\s+/g, '.');
    const room = d.floor * 100 + ((i * 7) % 20) + 1;
    people.push({
      id: i + 1, name, designation, dept, isStaff,
      email: `${slug}@college.edu`,
      phone: `+91 ${90000 + ((i * 7919) % 9999)} ${10000 + ((i * 3571) % 89999)}`,
      room: `${d.block}, Room ${room}`,
      online: i % 3 !== 2,
    });
  };

  HAND.forEach(([name, des, dept], i) => make(name, des, dept, false, i));

  let gi = 0;
  const hodGiven = new Set(['CSE']);
  Object.keys(TARGET).forEach((dept) => {
    const remaining = TARGET[dept] - (count[dept] || 0);
    for (let k = 0; k < remaining; k++) {
      const first = FIRST[gi % FIRST.length];
      const last = LAST[(gi * 7 + 3) % LAST.length];
      const staff = gi % 3 === 2;
      let des;
      if (!staff && !hodGiven.has(dept) && ['ECE', 'MECH', 'CIVIL', 'MATH'].includes(dept)) {
        des = 'HOD'; hodGiven.add(dept);
      } else if (staff) {
        des = gi % 2 === 0 ? 'Lab Assistant' : 'Administrative Staff';
      } else {
        des = ['Assistant Professor', 'Associate Professor', 'Professor', 'Assistant Professor'][gi % 4];
      }
      const title = staff ? (FEMALE.has(first) ? 'Ms.' : 'Mr.') : (des === 'Assistant Professor' ? 'Prof.' : 'Dr.');
      make(`${title} ${first} ${last}`, des, dept, staff, people.length);
      gi++;
    }
  });

  let coord = 0;
  people.forEach((p, i) => {
    p.coordinator = false; p.mentor = false;
    if (!p.isStaff && p.designation !== 'HOD' && i % 5 === 1 && coord < 8) { p.coordinator = true; coord++; }
    if (!p.isStaff && i % 4 === 0 && p.designation !== 'HOD') p.mentor = true;
  });
  return people;
}

const PEOPLE = buildDirectory();

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id, dept } = req.query;
  if (id) {
    const person = PEOPLE.find((p) => String(p.id) === String(id));
    if (!person) {
      res.status(404).json({ error: 'Person not found' });
      return;
    }
    res.status(200).json(person);
    return;
  }

  const list = dept ? PEOPLE.filter((p) => p.dept === dept) : PEOPLE;
  res.status(200).json(list);
};
