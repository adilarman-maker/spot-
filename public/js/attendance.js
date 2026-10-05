/* ---------------- Data ---------------- */
const SUBJECTS = [
  { id: 'ds', name: 'Data Structures', icon: 'code', color: '#3B82F6', bg: 'var(--blue-bg)', present: 37, total: 40 },
  { id: 'dbms', name: 'DBMS', icon: 'fileText', color: '#7C3AED', bg: 'var(--purple-bg)', present: 36, total: 40 },
  { id: 'os', name: 'Operating Systems', icon: 'compass', color: '#16A34A', bg: 'var(--green-bg)', present: 33, total: 38 },
  { id: 'cn', name: 'Computer Networks', icon: 'link', color: '#0D9488', bg: 'var(--teal-bg)', present: 33, total: 36 },
  { id: 'math', name: 'Mathematics', icon: 'graduationCap', color: '#DC2626', bg: 'var(--red-bg)', present: 34, total: 34 },
  { id: 'web', name: 'Web Technologies', icon: 'grid', color: '#F59E0B', bg: 'var(--orange-bg)', present: 24, total: 36 },
];
const SUBJ_BY_ID = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));
const pctOf = (s) => Math.round((s.present / s.total) * 100);

const TOTALS = SUBJECTS.reduce((a, s) => ({ present: a.present + s.present, total: a.total + s.total }), { present: 0, total: 0 });
const OVERALL_PCT = Math.round((TOTALS.present / TOTALS.total) * 100);
const BELOW_75 = SUBJECTS.filter((s) => pctOf(s) < 75);

/* ---------------- History (generated, deterministic) ---------------- */
function buildHistory() {
  const rows = [];
  const months = [
    { key: '2026-09', label: 'September 2026', days: 29, dow0: 2 }, // Sep 1 2026 = Tuesday
    { key: '2026-08', label: 'August 2026', days: 10, dow0: 6 },     // small sample set
  ];
  let si = 0;
  months.forEach((m) => {
    for (let d = m.days; d >= 1; d--) {
      const dow = (m.dow0 + d - 1) % 7; // 0=Sun..6=Sat
      if (dow === 0 || dow === 6) continue; // skip weekends
      const subj = SUBJECTS[si % SUBJECTS.length]; si++;
      const absentPick = (d * 7 + si) % 11 === 0; // sparse absences
      rows.push({ date: `${m.key}-${String(d).padStart(2, '0')}`, month: m.key, monLabel: m.label, day: d, mon: m.key === '2026-09' ? 'SEP' : 'AUG', subjId: subj.id, status: absentPick ? 'absent' : 'present', time: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'][si % 5] });
    }
  });
  return rows.sort((a, b) => (a.date < b.date ? 1 : -1));
}
const HISTORY = buildHistory();
const MONTHS = [...new Set(HISTORY.map((h) => h.month))].map((key) => ({ key, label: HISTORY.find((h) => h.month === key).monLabel }));

const TODAY_CLASSES = [
  { time: '9:00 AM', subjId: 'ds', room: 'CS-101' },
  { time: '11:00 AM', subjId: 'dbms', room: 'CS-102' },
  { time: '1:00 PM', subjId: 'math', room: 'MATH-201' },
  { time: '3:00 PM', subjId: 'web', room: 'CS-201' },
];

/* ---------------- State ---------------- */
const S = { tab: 'overview', month: MONTHS[0].key };
const TABS = [['overview', 'Overview'], ['subjects', 'Subjects'], ['history', 'History']];

/* ---------------- Ring helper (reuses the dashboard's ring markup) ---------------- */
function ring(percent, color, size, sw) {
  const r = (size - sw) / 2, c = 2 * Math.PI * r, offset = c - (Math.min(percent, 100) / 100) * c, ctr = size / 2;
  return `<svg width="${size}" height="${size}" style="transform:rotate(-90deg);">
    <circle cx="${ctr}" cy="${ctr}" r="${r}" stroke="var(--border)" stroke-width="${sw}" fill="none"/>
    <circle cx="${ctr}" cy="${ctr}" r="${r}" stroke="${color}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/>
  </svg>`;
}

/* ---------------- Renderers ---------------- */
function renderBanner() {
  return `
    <div class="att-banner">
      <div class="att-banner-icon">${icon('attendance', 24)}</div>
      <div><h2>Attendance</h2><p>Track your class attendance and stay above the minimum requirement.</p></div>
    </div>`;
}

function renderStats() {
  const cards = [
    { icon: 'attendance', color: '#16A34A', bg: 'var(--green-bg)', label: 'Overall Attendance', value: `${OVERALL_PCT}%` },
    { icon: 'checkCheck', color: '#3B82F6', bg: 'var(--blue-bg)', label: 'Classes Attended', value: TOTALS.present },
    { icon: 'close', color: '#DC2626', bg: 'var(--red-bg)', label: 'Classes Missed', value: TOTALS.total - TOTALS.present },
    { icon: 'alertTriangle', color: '#F59E0B', bg: 'var(--orange-bg)', label: 'Below 75% Requirement', value: BELOW_75.length },
  ];
  return `<div class="ev-stat-grid">${cards.map((c) => `
    <div class="ev-stat-card" style="background:${c.bg};">
      <div class="ev-stat-top">
        <div class="ev-stat-icon" style="background:${c.color};">${icon(c.icon, 19)}</div>
        <div><div class="ev-stat-label">${c.label}</div><div class="ev-stat-row"><span class="ev-stat-value">${c.value}</span></div></div>
      </div>
    </div>`).join('')}</div>`;
}

function renderTabs() {
  return `<div class="pill-row" id="att-tabs">${TABS.map(([k, l]) => `<button class="pill ${S.tab === k ? 'active' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>`;
}

function renderOverview() {
  const recent = HISTORY.slice(0, 6);
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Overall Attendance</h3></div>
      <div class="donut-wrap">
        <div class="donut">${ring(OVERALL_PCT, OVERALL_PCT < 75 ? 'var(--danger)' : 'var(--green)', 96, 10)}
          <div class="donut-center"><div class="donut-pct">${OVERALL_PCT}%</div><div class="donut-label">${OVERALL_PCT >= 75 ? 'On track' : 'Below requirement'}</div></div>
        </div>
        <div class="donut-stats">
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--green);"></span>Present</span><span class="v">${TOTALS.present}</span></div>
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--red);"></span>Absent</span><span class="v">${TOTALS.total - TOTALS.present}</span></div>
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--muted-2);"></span>Total Classes</span><span class="v">${TOTALS.total}</span></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Recent Activity</h3><a href="#" class="view-all" id="goto-history">See all ${icon('arrowRight', 13)}</a></div>
      <div>${recent.map(histRowHtml).join('')}</div>
    </div>`;
}

function renderSubjects() {
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Subject-wise Attendance</h3><span class="count-tag" style="font-size:11px; color:var(--muted);">${SUBJECTS.length} subjects</span></div>
      <div>${SUBJECTS.map((s) => {
        const p = pctOf(s); const low = p < 75;
        return `
        <div class="subj-row" data-subj="${s.id}">
          <div class="subj-ico" style="background:${s.bg}; color:${s.color};">${icon(s.icon, 17)}</div>
          <div style="flex:1; min-width:0;"><div class="subj-name">${s.name}</div><div class="subj-count">${s.present} / ${s.total} classes</div></div>
          <div class="subj-pct-wrap">
            <span class="subj-pct" style="color:${low ? 'var(--danger)' : 'var(--text)'};">${p}%</span>
            <div class="subj-bar"><div class="subj-bar-fill" style="width:${p}%; background:${low ? 'var(--danger)' : s.color};"></div></div>
          </div>
          <span class="subj-chev">${icon('chevRight', 15)}</span>
        </div>`;
      }).join('')}</div>
    </div>`;
}

function histRowHtml(h) {
  const s = SUBJ_BY_ID[h.subjId];
  return `
    <div class="hist-row">
      <div class="hist-date-chip"><div class="hd-day">${h.day}</div><div class="hd-mon">${h.mon}</div></div>
      <div style="flex:1; min-width:0;"><div class="hist-subj">${s.name}</div><div class="hist-time">${h.time}</div></div>
      <span class="hist-status ${h.status}">${h.status === 'present' ? 'Present' : 'Absent'}</span>
    </div>`;
}

function renderHistory() {
  const rows = HISTORY.filter((h) => h.month === S.month);
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Full History</h3><span class="count-tag" style="font-size:11px; color:var(--muted);">${rows.length} records</span></div>
      <div class="month-select-row">
        <select id="month-select">${MONTHS.map((m) => `<option value="${m.key}" ${m.key === S.month ? 'selected' : ''}>${m.label}</option>`).join('')}</select>
      </div>
      <div id="hist-rows">${rows.length ? rows.map(histRowHtml).join('') : `<div class="conv-empty">No records for this month.</div>`}</div>
    </div>`;
}

function renderBody() {
  if (S.tab === 'overview') return renderOverview();
  if (S.tab === 'subjects') return renderSubjects();
  return renderHistory();
}

/* ---------------- Rail ---------------- */
function renderRail() {
  const warn = BELOW_75.length ? `
    <div class="warn-banner">
      ${icon('alertTriangle', 18)}
      <div><div class="wt">Attendance warning</div>
        <div class="wd">${BELOW_75.map((s) => `${s.name} is at ${pctOf(s)}%`).join(', ')} — below the 75% requirement. Attend upcoming classes to recover.</div></div>
    </div>` : '';

  return `
    ${warn}
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('clock', 15)}</div><h3>Today's Classes</h3></div></div>
      <div>${TODAY_CLASSES.map((c) => {
        const s = SUBJ_BY_ID[c.subjId];
        return `<div class="today-mini"><div class="tm-time">${c.time}</div><div><div class="tm-name">${s.name}</div><div class="tm-room">${c.room}</div></div></div>`;
      }).join('')}</div>
    </div>
    <div class="panel">
      <div class="panel-head"><div class="panel-head-title">
        <div class="phi" style="background:var(--purple-bg); color:var(--purple);">${icon('trendUp', 15)}</div><h3>Best &amp; Lowest</h3></div></div>
      <div style="padding:6px 0;">
        ${[...SUBJECTS].sort((a, b) => pctOf(b) - pctOf(a)).slice(0, 1).map((s) => subjMini(s, 'Highest')).join('')}
        ${[...SUBJECTS].sort((a, b) => pctOf(a) - pctOf(b)).slice(0, 1).map((s) => subjMini(s, 'Lowest')).join('')}
      </div>
    </div>
    <div class="contact-cta">
      <h4>Need to recover attendance?</h4>
      <p>Contact your faculty coordinator about make-up classes or condonation for medical leave.</p>
      <button class="btn-solid" id="contact-faculty">Contact Faculty ${icon('arrowRight', 13)}</button>
    </div>`;
}

function subjMini(s, label) {
  const p = pctOf(s);
  return `<div class="today-mini"><div class="tm-time" style="color:${p < 75 ? 'var(--danger)' : 'var(--green)'};">${p}%</div><div><div class="tm-name">${s.name}</div><div class="tm-room">${label} this term</div></div></div>`;
}

/* ---------------- Subject detail modal ---------------- */
function openSubject(id) {
  const s = SUBJ_BY_ID[id];
  const p = pctOf(s);
  const rows = HISTORY.filter((h) => h.subjId === id).slice(0, 6);
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <div class="modal-head">
        <div class="fac-avatar" style="background:${s.color};">${icon(s.icon, 22)}</div>
        <div><h3>${s.name}</h3><div class="modal-sub">${s.present} / ${s.total} classes attended</div></div>
      </div>
      <div class="donut-wrap" style="padding:0 0 14px;">
        <div class="donut">${ring(p, p < 75 ? 'var(--danger)' : 'var(--green)', 84, 9)}<div class="donut-center"><div class="donut-pct" style="font-size:16px;">${p}%</div></div></div>
        <div class="donut-stats">
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--green);"></span>Present</span><span class="v">${s.present}</span></div>
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--red);"></span>Absent</span><span class="v">${s.total - s.present}</span></div>
        </div>
      </div>
      <div class="modal-section-label">Recent classes</div>
      <div>${rows.map(histRowHtml).join('') || '<div class="conv-empty">No recent records.</div>'}</div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
}
function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

/* ---------------- Wiring ---------------- */
function refreshBody() {
  document.getElementById('att-body').innerHTML = renderBody();
  wireBody();
}

function wireBody() {
  if (S.tab === 'subjects') {
    document.querySelectorAll('#att-body [data-subj]').forEach((el) => el.addEventListener('click', () => openSubject(el.dataset.subj)));
  }
  if (S.tab === 'history') {
    document.getElementById('month-select').addEventListener('change', (e) => { S.month = e.target.value; refreshBody(); });
  }
  if (S.tab === 'overview') {
    document.getElementById('goto-history').addEventListener('click', (e) => { e.preventDefault(); S.tab = 'history'; renderMain(); });
  }
}

function renderMain() {
  document.getElementById('content-main').innerHTML =
    renderBanner() + renderStats() + renderTabs() + `<div id="att-body">${renderBody()}</div>`;
  document.querySelectorAll('#att-tabs [data-tab]').forEach((b) => b.addEventListener('click', () => { S.tab = b.dataset.tab; renderMain(); }));
  hydrateIcons(document.getElementById('content-main'));
  wireBody();
}

document.addEventListener('DOMContentLoaded', () => {
  renderMain();
  document.getElementById('content-rail').innerHTML = renderRail();
  hydrateIcons(document.getElementById('content-rail'));
  document.getElementById('contact-faculty').addEventListener('click', () => { window.location.href = 'faculty.html'; });

  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim'; scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  initShell();
});
