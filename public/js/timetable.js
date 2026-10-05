/* ---------------- Data ---------------- */
const TT_SUBJ = {
  ds: { name: 'Data Structures', color: '#3B82F6', faculty: 'Dr. Ramesh Kumar', email: 'ramesh.kumar@college.edu' },
  dbms: { name: 'DBMS', color: '#7C3AED', faculty: 'Prof. Anita Sharma', email: 'anita.sharma@college.edu' },
  os: { name: 'Operating Systems', color: '#16A34A', faculty: 'Dr. Vijay Patel', email: 'vijay.patel@college.edu' },
  cn: { name: 'Computer Networks', color: '#0D9488', faculty: 'Prof. Sneha Reddy', email: 'sneha.reddy@college.edu' },
  math: { name: 'Mathematics', color: '#DC2626', faculty: 'Dr. Karan Singh', email: 'karan.singh@college.edu' },
  web: { name: 'Web Technologies', color: '#F59E0B', faculty: 'Prof. Pooja Verma', email: 'pooja.verma@college.edu' },
  elective: { name: 'Open Elective', color: '#EC4899', faculty: 'Dr. Arjun Nair', email: 'arjun.nair@college.edu' },
  club: { name: 'Club Hour', color: '#6B7280', faculty: '\u2014', email: '' },
};

const DAYS = [
  { key: 'mon', label: 'Monday', short: 'Mon', slots: [
    { t: '9:00 – 9:50 AM', subj: 'ds', room: 'CS-101', type: 'Lecture' },
    { t: '9:50 – 10:40 AM', subj: 'os', room: 'CS-105', type: 'Lecture' },
    { t: '11:00 – 11:50 AM', subj: 'dbms', room: 'CS-101', type: 'Lecture' },
    { t: '11:50 – 12:40 PM', subj: 'cn', room: 'CS-110', type: 'Lecture' },
    { t: '1:30 – 3:10 PM', subj: 'ds', room: 'CS-Lab 2', type: 'Lab' },
  ] },
  { key: 'tue', label: 'Tuesday', short: 'Tue', slots: [
    { t: '9:00 – 9:50 AM', subj: 'math', room: 'MATH-201', type: 'Lecture' },
    { t: '9:50 – 10:40 AM', subj: 'ds', room: 'CS-101', type: 'Lecture' },
    { t: '11:00 – 11:50 AM', subj: 'os', room: 'CS-105', type: 'Lecture' },
    { t: '11:50 – 12:40 PM', subj: 'dbms', room: 'CS-101', type: 'Lecture' },
    { t: '1:30 – 3:10 PM', subj: 'os', room: 'CS-Lab 1', type: 'Lab' },
  ] },
  { key: 'wed', label: 'Wednesday', short: 'Wed', slots: [
    { t: '9:00 – 9:50 AM', subj: 'cn', room: 'CS-110', type: 'Lecture' },
    { t: '9:50 – 10:40 AM', subj: 'math', room: 'MATH-201', type: 'Lecture' },
    { t: '11:00 – 12:40 PM', subj: 'elective', room: 'CS-301', type: 'Lecture' },
    { t: '1:30 – 2:20 PM', subj: 'ds', room: 'CS-101', type: 'Tutorial' },
    { t: '2:30 – 4:00 PM', subj: 'club', room: 'CS-Lab 2', type: 'Club' },
  ] },
  { key: 'thu', label: 'Thursday', short: 'Thu', slots: [
    { t: '9:00 – 9:50 AM', subj: 'dbms', room: 'CS-101', type: 'Lecture' },
    { t: '9:50 – 10:40 AM', subj: 'cn', room: 'CS-110', type: 'Lecture' },
    { t: '11:00 – 11:50 AM', subj: 'os', room: 'CS-105', type: 'Lecture' },
    { t: '11:50 – 1:30 PM', subj: 'dbms', room: 'CS-Lab 3', type: 'Lab' },
    { t: '2:30 – 3:20 PM', subj: 'web', room: 'CS-201', type: 'Lecture' },
  ] },
  { key: 'fri', label: 'Friday', short: 'Fri', slots: [
    { t: '9:00 – 9:50 AM', subj: 'math', room: 'MATH-201', type: 'Lecture' },
    { t: '9:50 – 10:40 AM', subj: 'ds', room: 'CS-101', type: 'Lecture' },
    { t: '11:00 – 12:40 PM', subj: 'web', room: 'CS-201', type: 'Lab' },
    { t: '1:30 – 2:20 PM', subj: 'web', room: 'CS-201', type: 'Lecture' },
  ] },
  { key: 'sat', label: 'Saturday', short: 'Sat', slots: [
    { t: '9:00 – 10:30 AM', subj: 'elective', room: 'CS-301', type: 'Lecture' },
    { t: '10:30 – 12:00 PM', subj: 'club', room: 'Open Campus', type: 'Club' },
  ] },
];
const DAY_BY_KEY = Object.fromEntries(DAYS.map((d) => [d.key, d]));
const TODAY_KEY = 'wed'; // Spot's reference date (Sep 30, 2026) falls on a Wednesday

const EXAMS = [
  { subj: 'ds', mon: 'OCT', day: 14, meta: 'Mid-Sem · 10:00 AM · Hall A' },
  { subj: 'dbms', mon: 'OCT', day: 16, meta: 'Mid-Sem · 10:00 AM · Hall A' },
  { subj: 'os', mon: 'OCT', day: 18, meta: 'Mid-Sem · 2:00 PM · Hall B' },
];

const TYPE_BG = { Lecture: 'rgba(59,130,246,.14)', Lab: 'rgba(16,185,129,.14)', Tutorial: 'rgba(245,158,11,.14)', Club: 'rgba(139,92,246,.14)' };
const TYPE_FG = { Lecture: '#3B82F6', Lab: '#16A34A', Tutorial: '#F59E0B', Club: '#8B5CF6' };

/* ---------------- State ---------------- */
let activeDay = TODAY_KEY;

/* ---------------- Helpers ---------------- */
function parseStart(timeRange) {
  // "9:00 – 9:50 AM" or "11:50 – 1:30 PM" -> minutes from midnight for the START time,
  // inferring AM/PM for the start from the end label when the start itself has none.
  const [startRaw, endRaw] = timeRange.split('–').map((s) => s.trim());
  const endMeridiem = /AM|PM/.exec(endRaw)[0];
  const startMeridiem = /AM|PM/.exec(startRaw) ? /AM|PM/.exec(startRaw)[0] : endMeridiem;
  const [h, m] = startRaw.replace(/AM|PM/, '').trim().split(':').map(Number);
  let hour = h % 12;
  if (startMeridiem === 'PM') hour += 12;
  return hour * 60 + m;
}

function nextClassToday() {
  const nowMinutes = 9 * 60 + 30; // fixed demo "current time": 9:30 AM, so there's always something upcoming to show
  const slots = DAY_BY_KEY[TODAY_KEY].slots;
  return slots.find((s) => parseStart(s.t) >= nowMinutes) || null;
}

/* ---------------- Renderers ---------------- */
function renderBanner() {
  return `
    <div class="tt-banner">
      <div class="tt-banner-icon">${icon('timetable', 24)}</div>
      <div><h2>Timetable</h2><p>Your weekly class schedule, organized by day.</p></div>
    </div>`;
}

function renderDayPills() {
  return `
    <div class="day-pill-row" id="day-pills">
      ${DAYS.map((d) => `
        <div class="day-pill ${d.key === activeDay ? 'active' : ''} ${d.key === TODAY_KEY ? 'today' : ''}" data-day="${d.key}">
          <div class="dp-name">${d.short}</div><div class="dp-count">${d.slots.length} classes</div>
        </div>`).join('')}
    </div>`;
}

function slotHtml(s) {
  const sub = TT_SUBJ[s.subj];
  return `
    <div class="tt-slot" data-subj="${s.subj}" data-time="${esc(s.t)}" data-room="${esc(s.room)}" data-type="${s.type}">
      <div class="tt-bar" style="background:${sub.color};"></div>
      <div class="tt-time">${s.t}</div>
      <div style="flex:1; min-width:0;"><div class="tt-name">${sub.name}</div><div class="tt-fac">${sub.faculty}</div></div>
      <div class="tt-room">${s.room}<span class="tt-type" style="background:${TYPE_BG[s.type]}; color:${TYPE_FG[s.type]};">${s.type}</span></div>
    </div>`;
}
function esc(t) { return String(t).replace(/"/g, '&quot;'); }

function renderSchedule() {
  const d = DAY_BY_KEY[activeDay];
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14.5px;">${d.label}${d.key === TODAY_KEY ? ' · Today' : ''}</h3><span class="count-tag" style="font-size:11px; color:var(--muted);">${d.slots.length} classes</span></div>
      <div id="slot-list">${d.slots.length ? d.slots.map(slotHtml).join('') : `<div class="conv-empty">No classes scheduled.</div>`}</div>
    </div>`;
}

function openSlotDetail(subjKey, time, room, type) {
  const sub = TT_SUBJ[subjKey];
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <div class="modal-head">
        <div class="fac-avatar" style="background:${sub.color};">${icon('timetable', 22)}</div>
        <div><h3>${sub.name}</h3><div class="modal-sub">${type} · ${time}</div></div>
      </div>
      <div class="fac-info" style="margin:0 0 14px;">
        <div>${icon('mapPin', 13)}<span>${room}</span></div>
        <div>${icon('faculty', 13)}<span>${sub.faculty}</span></div>
        ${sub.email ? `<div>${icon('mail', 13)}<span>${sub.email}</span></div>` : ''}
      </div>
      <div class="modal-actions">
        <button class="btn-soft" id="modal-close2">Close</button>
        ${sub.faculty !== '\u2014' ? `<button class="btn-solid" id="modal-contact">Message Faculty</button>` : ''}
      </div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-close2').addEventListener('click', closeModal);
  const contactBtn = document.getElementById('modal-contact');
  if (contactBtn) contactBtn.addEventListener('click', () => { window.location.href = 'messages.html'; });
}
function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

/* ---------------- Rail ---------------- */
function renderNextClass() {
  const slot = nextClassToday();
  if (!slot) {
    return `<div class="next-class-card"><div class="ncl">Next Class</div><div class="ncn">No more classes today</div><div class="ncm">${icon('checkCheck', 13)}You're done for the day</div></div>`;
  }
  const sub = TT_SUBJ[slot.subj];
  return `
    <div class="next-class-card">
      <div class="ncl">Next Class · Today</div>
      <div class="ncn">${sub.name}</div>
      <div class="ncm">${icon('clock', 13)}${slot.t}</div>
      <div class="ncm">${icon('mapPin', 13)}${slot.room}</div>
      <span class="nc-countdown">Starts soon</span>
    </div>`;
}

function renderWeeklySummary() {
  const total = DAYS.reduce((a, d) => a + d.slots.length, 0);
  const labCount = DAYS.reduce((a, d) => a + d.slots.filter((s) => s.type === 'Lab').length, 0);
  const freeDays = DAYS.filter((d) => d.slots.length <= 2).length;
  const tiles = [
    { l: 'Classes / Week', v: total, c: '#7C3AED', bg: 'var(--purple-bg)' },
    { l: 'Lab Sessions', v: labCount, c: '#16A34A', bg: 'var(--green-bg)' },
    { l: 'Lightest Day', v: [...DAYS].sort((a, b) => a.slots.length - b.slots.length)[0].short, c: '#3B82F6', bg: 'var(--blue-bg)' },
    { l: 'Busiest Day', v: [...DAYS].sort((a, b) => b.slots.length - a.slots.length)[0].short, c: '#F59E0B', bg: 'var(--orange-bg)' },
  ];
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Weekly Summary</h3></div>
      <div class="qs-grid">
        ${tiles.map((t) => `<div class="qs-tile" style="background:${t.bg};"><div class="qi" style="background:${t.c};">${icon('calendar', 16)}</div><div><div class="ql">${t.l}</div><div class="qv">${t.v}</div></div></div>`).join('')}
      </div>
    </div>`;
}

function renderExams() {
  return `
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title"><div class="phi" style="background:var(--red-bg); color:var(--red);">${icon('alertTriangle', 15)}</div><h3>Upcoming Exams</h3></div>
        <a href="#" class="view-all" data-soon="Exam Schedule">View All ${icon('arrowRight', 13)}</a></div>
      <div>${EXAMS.map((e) => `
        <div class="exam-row">
          <div class="exam-date"><div class="ed-day">${e.day}</div><div class="ed-mon">${e.mon}</div></div>
          <div><div class="exam-name">${TT_SUBJ[e.subj].name}</div><div class="exam-meta">${e.meta}</div></div>
        </div>`).join('')}</div>
    </div>`;
}

function renderDownloadCta() {
  return `
    <div class="contact-cta">
      <h4>Need a copy of your timetable?</h4>
      <p>Download a PDF to keep offline or print for your desk.</p>
      <button class="btn-solid" id="download-tt">Download PDF ${icon('arrowRight', 13)}</button>
    </div>`;
}

/* ---------------- Wiring ---------------- */
function refreshMain() {
  document.getElementById('day-pills-box').innerHTML = renderDayPills();
  document.getElementById('schedule-box').innerHTML = renderSchedule();
  hydrateIcons(document.getElementById('content-main'));
  wireMain();
}

function wireMain() {
  document.querySelectorAll('#day-pills [data-day]').forEach((p) => p.addEventListener('click', () => { activeDay = p.dataset.day; refreshMain(); }));
  document.querySelectorAll('#slot-list [data-subj]').forEach((row) => row.addEventListener('click', () =>
    openSlotDetail(row.dataset.subj, row.dataset.time, row.dataset.room, row.dataset.type)));
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('content-main').innerHTML =
    renderBanner() + `<div id="day-pills-box">${renderDayPills()}</div>` + `<div id="schedule-box">${renderSchedule()}</div>`;
  wireMain();

  document.getElementById('content-rail').innerHTML = renderNextClass() + renderWeeklySummary() + renderExams() + renderDownloadCta();
  hydrateIcons(document.getElementById('content-rail'));
  document.getElementById('download-tt').addEventListener('click', () => showToast('PDF export is coming in a later build'));

  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim'; scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  initShell();
});
