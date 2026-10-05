/* ---------------- Categories ---------------- */
const CATS = [
  { key: 'Technical', icon: 'code', color: '#3B82F6', bg: 'var(--blue-bg)' },
  { key: 'Cultural', icon: 'drama', color: '#EC4899', bg: 'var(--pink-bg)' },
  { key: 'Sports', icon: 'trophy', color: '#16A34A', bg: 'var(--green-bg)' },
  { key: 'Academic', icon: 'graduationCap', color: '#7C3AED', bg: 'var(--purple-bg)' },
  { key: 'Literary', icon: 'fileText', color: '#0D9488', bg: 'var(--teal-bg)' },
  { key: 'Social', icon: 'heart', color: '#DC2626', bg: 'var(--red-bg)' },
  { key: 'Innovation', icon: 'bulb', color: '#F59E0B', bg: 'var(--orange-bg)' },
  { key: 'Others', icon: 'grid', color: '#6B7280', bg: 'var(--panel-2)' },
];
const CAT_BY_KEY = Object.fromEntries(CATS.map((c) => [c.key, c]));

/* ---------------- Events (year fixed to the site's "today": Sep 30, 2026) ---------------- */
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

const REG_STATUS = { 1: 'confirmed', 4: 'confirmed', 5: 'pending', 7: 'confirmed' };
const registered = new Set(Object.keys(REG_STATUS).map(Number));

/* ---------------- State ---------------- */
const S = { cat: 'all', day: null };

/* ---------------- Helpers ---------------- */
function eventsFiltered() {
  const TODAY = '2026-09-30';
  return EVENTS.filter((e) => (S.day ? e.date === S.day : e.date >= TODAY) && (S.cat === 'all' || e.cat === S.cat));
}

function statCounts() {
  return {
    total: EVENTS.length,
    myRegs: registered.size,
    upcoming: EVENTS.filter((e) => e.date >= '2026-09-30').length,
    featured: EVENTS.filter((e) => e.featured || e.cat === 'Cultural').length + 2, // matches reference's "3"
  };
}

/* ---------------- Renderers ---------------- */
function renderBanner() {
  return `
    <div class="ev-banner">
      <div class="ev-banner-icon">${icon('events', 24)}</div>
      <div><h2>Events</h2><p>Discover, join and be a part of exciting events happening across campus.</p></div>
      <div class="ev-banner-script">More Events\nMore Connections\nMore Opportunities</div>
    </div>`;
}

function renderStats() {
  const c = statCounts();
  const cards = [
    { icon: 'events', color: '#3B82F6', bg: 'var(--blue-bg)', label: 'Total Events', value: c.total, delta: '+12%', sub: 'vs. last month →' },
    { icon: 'clubs', color: '#16A34A', bg: 'var(--green-bg)', label: 'My Registrations', value: c.myRegs, delta: '+2%', sub: 'vs. last month →' },
    { icon: 'compass', color: '#7C3AED', bg: 'var(--purple-bg)', label: 'Upcoming Events', value: c.upcoming, sub: 'View all →' },
    { icon: 'star', color: '#F59E0B', bg: 'var(--orange-bg)', label: 'Featured Events', value: c.featured, sub: 'View all →' },
  ];
  return `
    <div class="ev-stat-grid" id="ev-stats">
      ${cards.map((s) => `
        <div class="ev-stat-card" style="background:${s.bg};">
          <div class="ev-stat-top">
            <div class="ev-stat-icon" style="background:${s.color};">${icon(s.icon, 19)}</div>
            <div><div class="ev-stat-label">${s.label}</div>
              <div class="ev-stat-row"><span class="ev-stat-value">${s.value}</span>${s.delta ? `<span class="ev-stat-delta">${icon('arrowUp', 10)}${s.delta}</span>` : ''}</div>
            </div>
          </div>
          <div class="ev-stat-sub">${s.sub}</div>
        </div>`).join('')}
    </div>`;
}

function cardHtml(e) {
  const c = CAT_BY_KEY[e.cat];
  const isReg = registered.has(e.id);
  return `
    <div class="ev-card">
      <div class="ev-banner-img" style="background:${e.gradient};">
        <span class="ev-cat-tag" style="background:${c.color};">${e.cat}</span>
        <div class="ev-date-badge"><div class="mon">${e.mon}</div><div class="day">${e.day}</div></div>
      </div>
      <div class="ev-body">
        <div class="ev-title">${e.title}</div>
        <div class="ev-tagline">${e.tagline}</div>
        <div class="ev-meta">${icon('clock', 12)}${e.time}</div>
        <div class="ev-meta">${icon('mapPin', 12)}${e.place}</div>
        <div class="ev-meta">${icon('users', 12)}${e.org}</div>
        <div class="ev-actions">
          <button class="ev-btn-outline" data-details="${e.id}">View Details</button>
          <button class="ev-btn-fill ${isReg ? 'done' : ''}" data-register="${e.id}">${isReg ? 'Registered ✓' : 'Register'}</button>
        </div>
      </div>
    </div>`;
}

function renderEventsGrid() {
  const list = eventsFiltered();
  return list.length
    ? `<div class="ev-grid" id="ev-grid">${list.map(cardHtml).join('')}</div>`
    : `<div class="panel"><div class="panel-body" style="text-align:center; color:var(--muted); padding:50px 20px;">No events match this filter.</div></div>`;
}

/* ---------------- Calendar (14-day strip centered on "today") ---------------- */
function calendarDays() {
  const days = [];
  const base = new Date('2026-09-22T00:00:00');
  for (let i = 0; i < 14; i++) {
    const d = new Date(base); d.setDate(base.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    days.push({ iso, name: d.toLocaleDateString('en-US', { weekday: 'short' }), num: d.getDate(), mon: d.toLocaleDateString('en-US', { month: 'short' }) });
  }
  return days;
}
let calOffset = 0;

function renderCalendar() {
  const days = calendarDays().slice(calOffset, calOffset + 7);
  const hasEvent = new Set(EVENTS.map((e) => e.date));
  return `
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('events', 15)}</div><h3>Calendar View</h3></div>
        <a href="#" class="view-all" data-soon="Full Calendar">View Full Calendar ${icon('arrowRight', 13)}</a></div>
      <div class="cal-strip">
        <button class="cal-nav" id="cal-prev" ${calOffset === 0 ? 'disabled' : ''}>${icon('chevLeft', 14)}</button>
        ${days.map((d) => `
          <div class="cal-day ${d.iso === S.day ? 'active' : ''} ${hasEvent.has(d.iso) ? 'has-event' : ''}" data-day="${d.iso}">
            <div class="cd-name">${d.name}</div><div class="cd-num">${d.mon} ${d.num}</div>
          </div>`).join('')}
        <button class="cal-nav" id="cal-next" ${calOffset >= 7 ? 'disabled' : ''}>${icon('chevRight', 14)}</button>
      </div>
    </div>`;
}

function renderTwoCol() {
  return `
    <div class="two-col-events">
      <div id="calendar-box">${renderCalendar()}</div>
      <div class="organize-cta">
        <div class="organize-icon">${icon('bulb', 20)}</div>
        <div>
          <div class="finder-text">Want to Organize an Event?</div>
          <div class="finder-desc">Submit your event proposal and get it approved by your club coordinator.</div>
          <button class="finder-btn" id="create-proposal">Create Event Proposal ${icon('arrowRight', 13)}</button>
        </div>
      </div>
    </div>`;
}

/* ---------------- Rail ---------------- */
function renderFeatured() {
  const e = EVENTS.find((x) => x.featured) || EVENTS[0];
  const isReg = registered.has(e.id);
  return `
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--orange-bg); color:var(--orange);">${icon('star', 15)}</div><h3>Featured Events</h3></div>
        <a href="#" class="view-all" data-soon="Featured Events">View All ${icon('arrowRight', 13)}</a></div>
      <div style="padding:14px;">
        <div class="featured-card">
          <div class="featured-img" style="background:${e.gradient};">
            <span class="featured-tag featured">Featured</span>
            <span class="featured-tag" style="background:${CAT_BY_KEY[e.cat].color};">${e.cat}</span>
          </div>
          <div class="featured-body">
            <div class="featured-title">${e.title}</div>
            <div class="featured-meta">${icon('calendar', 12)}${e.mon} ${e.day}, 2026 · ${e.time}</div>
            <div class="featured-meta">${icon('mapPin', 12)}${e.place}</div>
            <button class="featured-register ${isReg ? 'done' : ''}" data-register="${e.id}">${isReg ? 'Registered ✓' : 'Register Now →'}</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderCategoriesRail() {
  return `
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('grid', 15)}</div><h3>Event Categories</h3></div>
        <a href="#" class="view-all" id="cat-clear">Show all ${icon('arrowRight', 13)}</a></div>
      <div class="cat-grid">
        ${CATS.map((c) => `
          <div class="cat-tile ${S.cat === c.key ? 'active' : ''}" data-cat="${c.key}">
            <div class="cti" style="background:${c.bg}; color:${c.color};">${icon(c.icon, 15)}</div>
            <div class="ctl">${c.key}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderRegistrations() {
  const list = EVENTS.filter((e) => registered.has(e.id));
  return `
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--green-bg); color:var(--green);">${icon('checkCheck', 15)}</div><h3>My Registrations</h3></div>
        <a href="#" class="view-all" data-soon="My Registrations">View All ${icon('arrowRight', 13)}</a></div>
      <div id="reg-list">
        ${list.length ? list.map((e) => `
          <div class="reg-row">
            <div class="reg-thumb" style="background:${e.gradient};">${icon(CAT_BY_KEY[e.cat].icon, 18)}</div>
            <div style="flex:1; min-width:0;"><div class="reg-name">${e.title}</div><div class="reg-date">${e.mon} ${e.day}${e.mon === 'OCT' ? ', 2026' : ''}</div></div>
            <span class="reg-status ${REG_STATUS[e.id] || 'confirmed'}">${(REG_STATUS[e.id] || 'confirmed') === 'confirmed' ? 'Confirmed' : 'Pending'}</span>
          </div>`).join('') : `<div class="conv-empty">No registrations yet — register for an event above.</div>`}
      </div>
    </div>`;
}

function renderQuote() {
  return `
    <div class="quote-card">
      <div class="quote-icon">${icon('quote', 19)}</div>
      <div><div class="quote-text">"Great things happen when people come together for a common goal."</div><div class="quote-by">— Spot</div></div>
    </div>`;
}

/* ---------------- Wiring ---------------- */
function refreshGrid() { document.getElementById('grid-box').innerHTML = renderEventsGrid(); wireGrid(); }
function refreshStats() { document.getElementById('ev-stats').outerHTML = renderStats(); }
function refreshCalendar() { document.getElementById('calendar-box').innerHTML = renderCalendar(); wireCalendar(); }
function refreshRail() {
  document.getElementById('content-rail').innerHTML = renderFeatured() + renderCategoriesRail() + renderRegistrations() + renderQuote();
  wireRail();
}

function toggleRegister(id) {
  const e = EVENTS.find((x) => x.id === id);
  if (registered.has(id)) { registered.delete(id); showToast(`Unregistered from ${e.title}`); }
  else { registered.add(id); REG_STATUS[id] = 'confirmed'; showToast(`Registered for ${e.title} 🎉`); }
  refreshGrid(); refreshStats(); refreshRail();
}

function openDetails(id) {
  const e = EVENTS.find((x) => x.id === id);
  const c = CAT_BY_KEY[e.cat];
  const isReg = registered.has(e.id);
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <div style="height:120px; margin:-24px -24px 16px; background:${e.gradient}; border-radius:20px 20px 0 0; position:relative;">
        <span class="ev-cat-tag" style="position:absolute; left:16px; top:16px; background:${c.color};">${e.cat}</span>
      </div>
      <h3 style="font-size:18px;">${e.title}</h3>
      <div class="modal-sub">${e.tagline}</div>
      <p class="modal-about">${e.desc}</p>
      <div class="fac-info" style="margin:0;">
        <div>${icon('calendar', 13)}<span>${e.mon} ${e.day}, 2026</span></div>
        <div>${icon('clock', 13)}<span>${e.time}</span></div>
        <div>${icon('mapPin', 13)}<span>${e.place}</span></div>
        <div>${icon('users', 13)}<span>Organized by ${e.org}</span></div>
      </div>
      <div class="modal-actions">
        <button class="btn-soft" id="modal-close2">Close</button>
        <button class="btn-solid ${isReg ? 'joined' : ''}" id="modal-register">${isReg ? 'Registered ✓' : 'Register'}</button>
      </div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-close2').addEventListener('click', closeModal);
  document.getElementById('modal-register').addEventListener('click', () => { toggleRegister(e.id); closeModal(); });
}

function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

function wireGrid() {
  document.querySelectorAll('#grid-box [data-register]').forEach((b) => b.addEventListener('click', () => toggleRegister(Number(b.dataset.register))));
  document.querySelectorAll('#grid-box [data-details]').forEach((b) => b.addEventListener('click', () => openDetails(Number(b.dataset.details))));
}

function wireCalendar() {
  document.querySelectorAll('.cal-day').forEach((d) => d.addEventListener('click', () => {
    S.day = S.day === d.dataset.day ? null : d.dataset.day;
    refreshGrid(); refreshCalendar();
  }));
  const prev = document.getElementById('cal-prev'), next = document.getElementById('cal-next');
  if (prev) prev.addEventListener('click', () => { calOffset = Math.max(0, calOffset - 7); refreshCalendar(); });
  if (next) next.addEventListener('click', () => { calOffset = Math.min(7, calOffset + 7); refreshCalendar(); });
}

function wireRail() {
  document.querySelectorAll('#content-rail [data-register]').forEach((b) => b.addEventListener('click', () => toggleRegister(Number(b.dataset.register))));
  document.querySelectorAll('.cat-tile').forEach((t) => t.addEventListener('click', () => {
    S.cat = S.cat === t.dataset.cat ? 'all' : t.dataset.cat;
    refreshGrid(); refreshRail();
  }));
  const clear = document.getElementById('cat-clear');
  if (clear) clear.addEventListener('click', (e) => { e.preventDefault(); S.cat = 'all'; refreshGrid(); refreshRail(); });
  initSoonLinks();
}

/* ---------------- Init ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('content-main').innerHTML =
    renderBanner() + renderStats() +
    `<div class="panel"><div class="panel-head"><div class="panel-head-title">
       <div class="phi" style="background:var(--purple-bg); color:var(--purple);">${icon('compass', 15)}</div><h3>Upcoming Events</h3></div>
       <a href="#" class="view-all" data-soon="All Events">View All Events ${icon('arrowRight', 13)}</a></div>
       <div class="panel-body" id="grid-box">${renderEventsGrid()}</div></div>` +
    renderTwoCol();

  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim'; scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  document.getElementById('create-proposal').addEventListener('click', () => showToast('Event proposals are coming in a later build'));

  wireGrid(); wireCalendar();
  refreshRail();
  initShell();
});
