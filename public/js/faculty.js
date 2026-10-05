/* ---------------- Departments ---------------- */
const DEPTS = [
  { code: 'CSE', name: 'Computer Science & Engineering', short: 'CS', color: '#7C3AED', block: 'CSE Block', floor: 1 },
  { code: 'ECE', name: 'Electronics & Communication', short: 'EC', color: '#2563EB', block: 'ECE Block', floor: 3 },
  { code: 'MECH', name: 'Mechanical Engineering', short: 'MG', color: '#16A34A', block: 'Mech Block', floor: 1 },
  { code: 'CIVIL', name: 'Civil Engineering', short: 'CV', color: '#F97316', block: 'Civil Block', floor: 4 },
  { code: 'MATH', name: 'Mathematics', short: 'MA', color: '#DC2626', block: 'Maths Block', floor: 3 },
  { code: 'PHY', name: 'Physics', short: 'PH', color: '#A16207', block: 'Physics Block', floor: 2 },
  { code: 'HSS', name: 'Humanities & Social Sciences', short: 'HS', color: '#0D9488', block: 'Admin Block', floor: 2 },
  { code: 'IT', name: 'Information Technology', short: 'IT', color: '#0EA5E9', block: 'IT Block', floor: 2 },
];
const DEPT_BY_CODE = Object.fromEntries(DEPTS.map((d) => [d.code, d]));

const DESIGNATIONS = ['HOD', 'Professor', 'Associate Professor', 'Assistant Professor', 'Lab Assistant', 'Administrative Staff'];
const AVATAR_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#14B8A6', '#6366F1', '#EF4444'];

/* ---------------- Directory data (56 members) ---------------- */
// Hand-written first page (matches the reference), then a deterministic generated remainder.
const HAND = [
  ['Dr. Ramesh Kumar', 'HOD', 'CSE', 1], ['Prof. Anita Sharma', 'Assistant Professor', 'CSE', 1],
  ['Dr. Vijay Patel', 'Associate Professor', 'MATH', 1], ['Prof. Sneha Reddy', 'Assistant Professor', 'PHY', 1],
  ['Dr. Karan Singh', 'Assistant Professor', 'MECH', 1], ['Prof. Pooja Verma', 'Associate Professor', 'ECE', 1],
  ['Dr. Arjun Nair', 'Professor', 'CIVIL', 1], ['Prof. Meera Iyer', 'Assistant Professor', 'HSS', 1],
  ['Dr. Suresh Babu', 'Professor', 'CSE', 1], ['Prof. Lakshmi Rao', 'Associate Professor', 'HSS', 1],
  ['Dr. Faizan Ahmed', 'Assistant Professor', 'IT', 1], ['Prof. Divya Rangan', 'Assistant Professor', 'CSE', 1],
];
const TARGET = { CSE: 14, ECE: 9, MECH: 7, CIVIL: 5, MATH: 5, PHY: 4, HSS: 6, IT: 6 };
const FIRST = ['Rajesh', 'Sunita', 'Amit', 'Neha', 'Rohit', 'Kavita', 'Sanjay', 'Pallavi', 'Manoj', 'Deepa', 'Naveen', 'Swati', 'Harish', 'Rekha', 'Vivek', 'Anjali', 'Prakash', 'Shalini', 'Gopal', 'Nisha', 'Ashok', 'Madhavi', 'Tarun', 'Bhavna', 'Srinivas', 'Usha', 'Mohan', 'Padma', 'Kiran', 'Jyothi', 'Ravi', 'Sudha', 'Anil', 'Farah', 'Dinesh', 'Latha', 'Nikhil', 'Ritu', 'Sameer', 'Tanvi', 'Venkat', 'Zoya', 'Girish', 'Hema'];
const LAST = ['Menon', 'Chatterjee', 'Kulkarni', 'Bose', 'Joshi', 'Pillai', 'Desai', 'Malhotra', 'Gupta', 'Naidu', 'Shetty', 'Kapoor', 'Mishra', 'Banerjee', 'Hegde', 'Thakur', 'Rastogi', 'Bhat', 'Saxena', 'Chopra', 'Varma', 'Ghosh', 'Reddy', 'Khan', 'Yadav', 'Nambiar', 'Sinha', 'Agarwal', 'Rao', 'Das', 'Iyengar', 'Mukherjee', 'Pandey', 'Kaur', 'Trivedi', 'Solanki', 'Goel', 'Patil', 'Lal', 'Sethi', 'Dutta', 'Bhatia', 'Mehra', 'Jain'];
const FEMALE = new Set(['Sunita', 'Neha', 'Kavita', 'Pallavi', 'Deepa', 'Swati', 'Rekha', 'Anjali', 'Shalini', 'Nisha', 'Madhavi', 'Bhavna', 'Usha', 'Padma', 'Jyothi', 'Sudha', 'Farah', 'Latha', 'Ritu', 'Tanvi', 'Zoya', 'Hema']);

function pad(n) { return String(n).padStart(5, '0'); }

function buildDirectory() {
  const people = [];
  const count = {};
  const make = (name, designation, dept, isStaff, i) => {
    const d = DEPT_BY_CODE[dept];
    count[dept] = (count[dept] || 0) + 1;
    const slug = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '').toLowerCase().replace(/\s+/g, '.');
    const room = d.floor * 100 + (i * 7) % 20 + 1;
    people.push({
      id: i + 1, name, designation, dept, isStaff,
      email: `${slug}@college.edu`,
      phone: `+91 ${90000 + ((i * 7919) % 9999)} ${10000 + ((i * 3571) % 89999)}`,
      room: `${d.block}, Room ${room}`,
      online: i % 3 !== 2,
      color: AVATAR_COLORS[i % AVATAR_COLORS.length],
      coordinator: false, mentor: false,
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

  // Flags derived after the list is fixed
  let coord = 0, ment = 0;
  people.forEach((p, i) => {
    if (!p.isStaff && p.designation !== 'HOD' && i % 5 === 1 && coord < 8) { p.coordinator = true; coord++; }
    if (!p.isStaff && i % 4 === 0 && p.designation !== 'HOD') { p.mentor = true; ment++; }
  });
  return people;
}

const PEOPLE = buildDirectory();

const EXPERTISE = {
  CSE: ['Algorithms', 'Machine Learning', 'Databases'], ECE: ['VLSI', 'Signal Processing', 'Embedded'],
  MECH: ['Thermodynamics', 'CAD/CAM', 'Robotics'], CIVIL: ['Structures', 'Surveying', 'Geotechnics'],
  MATH: ['Linear Algebra', 'Probability', 'Numerical Methods'], PHY: ['Optics', 'Quantum Mechanics', 'Materials'],
  HSS: ['Communication', 'Ethics', 'Economics'], IT: ['Web Systems', 'Cloud', 'Cybersecurity'],
};

const RECENT = [
  { who: 'Dr. Ramesh Kumar', what: 'Joined the Tech Club', when: '2 hours ago' },
  { who: 'Prof. Anita Sharma', what: 'Approved event request', when: '5 hours ago' },
  { who: 'Dr. Vijay Patel', what: 'Updated profile information', when: '1 day ago' },
  { who: 'Prof. Meera Iyer', what: 'Joined the Cultural Club', when: '1 day ago' },
];

/* ---------------- State ---------------- */
const PAGE_SIZE = 12;
const FILTER_PILLS = ['All', 'Faculty', 'Staff', 'HODs', 'Coordinators', 'Mentors'];
const state = { pill: 'All', search: '', dept: 'all', desig: 'all', sort: 'default', page: 1 };

/* ---------------- Helpers ---------------- */
function headline(p) {
  return p.designation === 'HOD' ? `HOD - ${DEPT_BY_CODE[p.dept].name.split(' &')[0]}` : p.designation;
}

function filtered() {
  let list = PEOPLE.filter((p) => {
    if (state.pill === 'Faculty' && p.isStaff) return false;
    if (state.pill === 'Staff' && !p.isStaff) return false;
    if (state.pill === 'HODs' && p.designation !== 'HOD') return false;
    if (state.pill === 'Coordinators' && !p.coordinator) return false;
    if (state.pill === 'Mentors' && !p.mentor) return false;
    if (state.dept !== 'all' && p.dept !== state.dept) return false;
    if (state.desig !== 'all' && p.designation !== state.desig) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${p.name} ${p.designation} ${DEPT_BY_CODE[p.dept].name} ${(EXPERTISE[p.dept] || []).join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  if (state.sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (state.sort === 'za') list = [...list].sort((a, b) => b.name.localeCompare(a.name));
  if (state.sort === 'dept') list = [...list].sort((a, b) => DEPT_BY_CODE[a.dept].name.localeCompare(DEPT_BY_CODE[b.dept].name));
  return list;
}

/* ---------------- Renderers ---------------- */
function renderBanner() {
  return `
    <div class="dir-banner">
      <div class="dir-banner-icon">${icon('users', 24)}</div>
      <div>
        <h2>Staff &amp; Faculty Directory</h2>
        <p>Connect with faculty members and staff for guidance, mentorship and support.</p>
      </div>
    </div>`;
}

function renderPills() {
  return `<div class="pill-row">${FILTER_PILLS.map((p) => `<button class="pill ${p === state.pill ? 'active' : ''}" data-pill="${p}">${p}</button>`).join('')}</div>`;
}

function renderFilters() {
  return `
    <div class="filter-row">
      <div class="clubs-search">
        ${icon('search', 15)}
        <input type="text" id="dir-search" placeholder="Search by name, department, designation, or expertise…" />
      </div>
      <div class="filter-group"><label>Department</label>
        <select class="sort-select" id="dept-select">
          <option value="all">All Departments</option>
          ${DEPTS.map((d) => `<option value="${d.code}">${d.name}</option>`).join('')}
        </select></div>
      <div class="filter-group"><label>Designation</label>
        <select class="sort-select" id="desig-select">
          <option value="all">All Designations</option>
          ${DESIGNATIONS.map((d) => `<option value="${d}">${d}</option>`).join('')}
        </select></div>
      <div class="filter-group"><label>Sort by</label>
        <select class="sort-select" id="sort-select">
          <option value="default">Featured</option>
          <option value="az">Name (A–Z)</option>
          <option value="za">Name (Z–A)</option>
          <option value="dept">Department</option>
        </select></div>
    </div>`;
}

function cardHtml(p) {
  const d = DEPT_BY_CODE[p.dept];
  return `
    <div class="fac-card">
      <div class="fac-top">
        <div class="fac-avatar" style="background:${p.color};">${initialsOf(p.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, ''))}${p.online ? '<span class="online-dot"></span>' : ''}</div>
        <div style="min-width:0;">
          <div class="fac-name-row"><span class="fac-name">${p.name}</span>${p.designation === 'HOD' ? '<span class="hod-badge">HOD</span>' : ''}</div>
          <div class="fac-desig">${headline(p)}</div>
          <div class="fac-dept">${d.name}</div>
        </div>
      </div>
      <div class="fac-info">
        <div>${icon('mail', 13)}<span>${p.email}</span></div>
        <div>${icon('phone', 13)}<span>${p.phone}</span></div>
        <div>${icon('mapPin', 13)}<span>${p.room}</span></div>
      </div>
      <div class="fac-actions">
        <button class="btn-soft" data-profile="${p.id}">View Profile</button>
        <button class="btn-solid" data-message="${p.id}">Message</button>
      </div>
    </div>`;
}

function renderResults() {
  const list = filtered();
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  if (state.page > pages) state.page = pages;
  const start = (state.page - 1) * PAGE_SIZE;
  const slice = list.slice(start, start + PAGE_SIZE);

  const grid = slice.length
    ? `<div class="faculty-grid">${slice.map(cardHtml).join('')}</div>`
    : `<div class="panel"><div class="panel-body" style="text-align:center; color:var(--muted); padding:50px 20px;">No one matches your filters.</div></div>`;

  const nums = [];
  for (let i = 1; i <= pages; i++) nums.push(`<button class="${i === state.page ? 'active' : ''}" data-page="${i}">${i}</button>`);

  const from = list.length ? start + 1 : 0;
  const to = Math.min(start + PAGE_SIZE, list.length);
  return `
    ${grid}
    <div class="pager-row">
      <div class="pager-info">Showing ${from}–${to} of ${list.length} staff members</div>
      <div class="pager">
        <button data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}>${icon('chevLeft', 13)}</button>
        ${nums.join('')}
        <button data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''}>${icon('chevRight', 13)}</button>
      </div>
    </div>`;
}

/* ---------------- Rail ---------------- */
function renderRail() {
  const faculty = PEOPLE.filter((p) => !p.isStaff).length;
  const staff = PEOPLE.filter((p) => p.isStaff).length;
  const hods = PEOPLE.filter((p) => p.designation === 'HOD').length;
  const coords = PEOPLE.filter((p) => p.coordinator).length;
  const tiles = [
    { l: 'Total Faculty', v: faculty, c: '#7C3AED', bg: 'var(--purple-bg)' },
    { l: 'Total Staff', v: staff, c: '#16A34A', bg: 'var(--green-bg)' },
    { l: 'HODs', v: hods, c: '#2563EB', bg: 'var(--blue-bg)' },
    { l: 'Coordinators', v: coords, c: '#F97316', bg: 'var(--orange-bg)' },
  ];
  const counts = {};
  PEOPLE.forEach((p) => { counts[p.dept] = (counts[p.dept] || 0) + 1; });
  const deptRows = [...DEPTS].sort((a, b) => counts[b.code] - counts[a.code]);

  return `
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--orange-bg); color:var(--orange);">${icon('award', 15)}</div><h3>Quick Stats</h3></div></div>
      <div class="qs-grid">
        ${tiles.map((t) => `<div class="qs-tile" style="background:${t.bg};"><div class="qi" style="background:${t.c};">${icon('users', 16)}</div><div><div class="ql">${t.l}</div><div class="qv">${t.v}</div></div></div>`).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('building', 15)}</div><h3>Departments</h3></div>
        <a href="#" class="view-all" id="dept-clear">Show all ${icon('arrowRight', 13)}</a></div>
      <div style="padding:6px 0 10px;">
        ${deptRows.map((d) => `
          <div class="dept-row ${state.dept === d.code ? 'active' : ''}" data-dept="${d.code}">
            <span class="dept-dot" style="background:${d.color};">${d.short}</span>${d.name}<span class="dept-count">${counts[d.code]}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--green-bg); color:var(--green);">${icon('clock', 15)}</div><h3>Recent Activity</h3></div>
        <a href="#" class="view-all" data-soon="Activity">View All ${icon('arrowRight', 13)}</a></div>
      <div style="padding:4px 0 8px;">
        ${RECENT.map((r, i) => `
          <div class="act-row">
            <div class="fac-avatar" style="background:${AVATAR_COLORS[(i * 3) % AVATAR_COLORS.length]};">${initialsOf(r.who.replace(/^(Dr\.|Prof\.)\s*/, ''))}</div>
            <div><div class="act-name">${r.who}</div><div class="act-what">${r.what}</div></div>
            <div class="act-time">${r.when}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="contact-cta">
      <h4>Need to contact a faculty member?</h4>
      <p>Use the directory to reach out for guidance, mentorship or academic support.</p>
      <button class="btn-solid" id="explore-more">Explore More ${icon('arrowRight', 13)}</button>
    </div>`;
}

/* ---------------- Modal ---------------- */
function openProfile(id) {
  const p = PEOPLE.find((x) => x.id === id);
  const d = DEPT_BY_CODE[p.dept];
  const bare = p.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '');
  const tags = [...(EXPERTISE[p.dept] || [])];
  if (p.coordinator) tags.push('Coordinator');
  if (p.mentor) tags.push('Mentor');
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <div class="modal-head">
        <div class="fac-avatar" style="background:${p.color};">${initialsOf(bare)}${p.online ? '<span class="online-dot"></span>' : ''}</div>
        <div><h3>${p.name}</h3><div class="modal-sub">${headline(p)} · ${d.name}</div>
        <div class="modal-sub" style="color:${p.online ? 'var(--green)' : 'var(--muted-2)'};">${p.online ? '● Available now' : '● Away'}</div></div>
      </div>
      <p class="modal-about">${bare} is part of the ${d.name} department${p.designation === 'HOD' ? ' and leads it as Head of Department' : ''}, and is available for academic guidance and student mentorship.</p>
      <div class="fac-info" style="margin:0;">
        <div>${icon('mail', 13)}<span>${p.email}</span></div>
        <div>${icon('phone', 13)}<span>${p.phone}</span></div>
        <div>${icon('mapPin', 13)}<span>${p.room}</span></div>
      </div>
      <div class="modal-section-label">Expertise &amp; roles</div>
      <div class="chip-row">${tags.map((t) => `<span class="chip">${t}</span>`).join('')}</div>
      <div class="modal-actions">
        <button class="btn-soft" id="modal-copy">Copy email</button>
        <button class="btn-solid" data-message="${p.id}">Message</button>
      </div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-copy').addEventListener('click', () => {
    if (navigator.clipboard) navigator.clipboard.writeText(p.email).catch(() => {});
    showToast('Email copied');
  });
  scrim.querySelector('[data-message]').addEventListener('click', () => messageTo(p.id));
}

function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

function messageTo(id) {
  const p = PEOPLE.find((x) => x.id === id);
  showToast(`Messaging ${p.name} — Messages page coming in the next build`);
}

/* ---------------- Wiring ---------------- */
function refreshResults() {
  const box = document.getElementById('results');
  box.innerHTML = renderResults();
  wireResults();
}

function refreshRail() {
  document.getElementById('content-rail').innerHTML = renderRail();
  wireRail();
}

function wireResults() {
  document.querySelectorAll('#results [data-profile]').forEach((b) => b.addEventListener('click', () => openProfile(Number(b.dataset.profile))));
  document.querySelectorAll('#results [data-message]').forEach((b) => b.addEventListener('click', () => messageTo(Number(b.dataset.message))));
  document.querySelectorAll('#results [data-page]').forEach((b) => b.addEventListener('click', () => {
    state.page = Number(b.dataset.page);
    refreshResults();
    document.querySelector('.main-area').scrollIntoView({ behavior: 'smooth' });
  }));
}

function wireRail() {
  document.querySelectorAll('.dept-row').forEach((row) => row.addEventListener('click', () => {
    state.dept = state.dept === row.dataset.dept ? 'all' : row.dataset.dept;
    state.page = 1;
    document.getElementById('dept-select').value = state.dept;
    refreshResults(); refreshRail();
  }));
  document.getElementById('dept-clear').addEventListener('click', (e) => {
    e.preventDefault();
    state.dept = 'all'; state.page = 1;
    document.getElementById('dept-select').value = 'all';
    refreshResults(); refreshRail();
  });
  document.getElementById('explore-more').addEventListener('click', () => {
    document.getElementById('dir-search').focus();
    showToast('Search by name, department or expertise');
  });
  initSoonLinks();
}

function renderMain() {
  document.getElementById('content-main').innerHTML =
    renderBanner() + `<div id="pill-box">${renderPills()}</div>` + renderFilters() + `<div id="results">${renderResults()}</div>`;

  const wirePills = () => document.querySelectorAll('#pill-box [data-pill]').forEach((b) => b.addEventListener('click', () => {
    state.pill = b.dataset.pill; state.page = 1;
    document.getElementById('pill-box').innerHTML = renderPills(); wirePills();
    refreshResults();
  }));
  wirePills();

  document.getElementById('dir-search').addEventListener('input', (e) => { state.search = e.target.value; state.page = 1; refreshResults(); });
  document.getElementById('dept-select').addEventListener('change', (e) => { state.dept = e.target.value; state.page = 1; refreshResults(); refreshRail(); });
  document.getElementById('desig-select').addEventListener('change', (e) => { state.desig = e.target.value; state.page = 1; refreshResults(); });
  document.getElementById('sort-select').addEventListener('change', (e) => { state.sort = e.target.value; state.page = 1; refreshResults(); });

  wireResults();
}

document.addEventListener('DOMContentLoaded', () => {
  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim';
  scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  renderMain();
  refreshRail();
  initShell();
});
