/* ---------------- Data ---------------- */
const PROFILE = {
  name: 'Aarav Sharma', roll: '21CS045', dept: 'Computer Science & Engineering', sem: '5th Semester',
  email: 'aarav.sharma@college.edu', phone: '+91 98765 43210', dob: 'Mar 14, 2006', blood: 'O+',
  address: 'Hostel Block C, Room 214', cgpa: '8.7',
  bio: "B.Tech CSE student, 2nd year. Active in Code Craft and Robotics Club. Interested in machine learning and competitive programming.",
};

const STATS = { clubs: 4, events: 6, attendance: 88, pending: 1 };

const ACTIVITY = [
  { icon: 'clubs', color: '#7C3AED', bg: 'var(--purple-bg)', text: 'Joined Code Craft Club', time: '2 hours ago' },
  { icon: 'events', color: '#3B82F6', bg: 'var(--blue-bg)', text: 'Registered for Hackathon 2026', time: 'Yesterday' },
  { icon: 'approvals', color: '#F59E0B', bg: 'var(--orange-bg)', text: 'Submitted an outing request', time: 'Sep 26, 2026' },
  { icon: 'attendance', color: '#16A34A', bg: 'var(--green-bg)', text: 'Attended Data Structures lab', time: 'Sep 26, 2026' },
  { icon: 'clubs', color: '#16A34A', bg: 'var(--green-bg)', text: 'Joined Sports Council', time: 'Sep 20, 2026' },
  { icon: 'events', color: '#EC4899', bg: 'var(--pink-bg)', text: 'Registered for Web Development Workshop', time: 'Sep 18, 2026' },
];

const MY_CLUBS_P = [
  { name: 'Code Craft', icon: 'code', color: '#7C3AED', bg: 'var(--purple-bg)', role: 'Member' },
  { name: 'Robotics Club', icon: 'robot', color: '#2563EB', bg: 'var(--blue-bg)', role: 'Member' },
  { name: 'Sports Council', icon: 'trophy', color: '#16A34A', bg: 'var(--green-bg)', role: 'Member' },
  { name: 'Cultural Club', icon: 'drama', color: '#EC4899', bg: 'var(--pink-bg)', role: 'Member' },
];

const MY_EVENTS_P = [
  { name: 'Hackathon 2026', date: 'Sep 26, 2026', status: 'confirmed' },
  { name: 'Web Development Workshop', date: 'Oct 5, 2026', status: 'confirmed' },
  { name: 'Poetry & Open Mic', date: 'Oct 8, 2026', status: 'pending' },
];

const BADGES = [
  { label: 'Early Bird', icon: 'clock', color: '#3B82F6', unlocked: true },
  { label: 'Club Enthusiast', icon: 'clubs', color: '#7C3AED', unlocked: true },
  { label: 'Event Regular', icon: 'events', color: '#EC4899', unlocked: true },
  { label: 'Perfect Attendance', icon: 'attendance', color: '#16A34A', unlocked: false },
  { label: 'Top Contributor', icon: 'star', color: '#F59E0B', unlocked: false },
  { label: 'Mentor', icon: 'graduationCap', color: '#0D9488', unlocked: false },
];

/* ---------------- State ---------------- */
const S = { tab: 'overview' };
const TABS = [['overview', 'Overview'], ['activity', 'Activity']];
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- Renderers ---------------- */
function renderHeader() {
  return `
    <div class="profile-header-card" id="ph-card">
      <div class="ph-cover"></div>
      <div class="ph-body">
        <div class="ph-avatar-row">
          <div class="ph-avatar">${initialsOf(PROFILE.name)}<button class="ph-cam" id="ph-cam-btn" aria-label="Change photo">${icon('camera', 13)}</button></div>
          <div class="ph-info">
            <div class="ph-name" id="ph-name">${esc(PROFILE.name)}</div>
            <div class="ph-sub">${esc(PROFILE.dept)} · ${esc(PROFILE.sem)}</div>
            <span class="ph-roll">${icon('badge', 11)} ${esc(PROFILE.roll)}</span>
          </div>
          <button class="ph-edit-btn" id="edit-profile-btn">${icon('edit', 14)} Edit Profile</button>
        </div>
      </div>
    </div>`;
}

function renderTabs() {
  return `<div class="pill-row" id="pf-tabs">${TABS.map(([k, l]) => `<button class="pill ${S.tab === k ? 'active' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>`;
}

function renderOverview() {
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">About</h3></div>
      <div class="panel-body" style="padding-top:12px;">
        <p id="ph-bio" style="font-size:12.6px; color:var(--muted); line-height:1.65; margin:0;">${esc(PROFILE.bio)}</p>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Academic Information</h3></div>
      <div class="panel-body" style="padding-top:4px;"><div class="info-grid-2">
        <div class="info-field"><div class="ifk">Roll Number</div><div class="ifv">${esc(PROFILE.roll)}</div></div>
        <div class="info-field"><div class="ifk">CGPA</div><div class="ifv">${esc(PROFILE.cgpa)}</div></div>
        <div class="info-field"><div class="ifk">Department</div><div class="ifv">${esc(PROFILE.dept)}</div></div>
        <div class="info-field"><div class="ifk">Semester</div><div class="ifv">${esc(PROFILE.sem)}</div></div>
      </div></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Contact &amp; Personal</h3></div>
      <div class="panel-body" style="padding-top:4px;"><div class="info-grid-2">
        <div class="info-field"><div class="ifk">Email</div><div class="ifv">${esc(PROFILE.email)}</div></div>
        <div class="info-field"><div class="ifk">Phone</div><div class="ifv" id="ph-phone">${esc(PROFILE.phone)}</div></div>
        <div class="info-field"><div class="ifk">Date of Birth</div><div class="ifv">${esc(PROFILE.dob)}</div></div>
        <div class="info-field"><div class="ifk">Blood Group</div><div class="ifv">${esc(PROFILE.blood)}</div></div>
        <div class="info-field" style="grid-column:1/-1;"><div class="ifk">Address</div><div class="ifv">${esc(PROFILE.address)}</div></div>
      </div></div>
    </div>`;
}

function renderActivity() {
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">My Clubs</h3><a href="clubs.html" class="view-all">View All ${icon('arrowRight', 13)}</a></div>
      <div class="clubs-row" style="grid-template-columns:repeat(2,1fr);">
        ${MY_CLUBS_P.map((c) => `
          <div class="club-mini">
            <div class="club-mini-icon" style="background:${c.bg}; color:${c.color};">${icon(c.icon, 16)}</div>
            <div><div class="club-mini-name">${esc(c.name)}</div><div class="club-mini-cat">${c.role}</div></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">My Events</h3><a href="events.html" class="view-all">View All ${icon('arrowRight', 13)}</a></div>
      <div>${MY_EVENTS_P.map((e) => `
        <div class="reg-row" style="padding:11px 18px;">
          <div class="reg-thumb" style="background:linear-gradient(135deg,#3B82F6,#8B5CF6);">${icon('events', 16)}</div>
          <div style="flex:1; min-width:0;"><div class="reg-name">${esc(e.name)}</div><div class="reg-date">${e.date}</div></div>
          <span class="reg-status ${e.status}">${e.status === 'confirmed' ? 'Confirmed' : 'Pending'}</span>
        </div>`).join('')}</div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Recent Activity</h3></div>
      <div>${ACTIVITY.map((a) => `
        <div class="act-item">
          <div class="ai-icon" style="background:${a.bg}; color:${a.color};">${icon(a.icon, 16)}</div>
          <div><div class="ai-text">${esc(a.text)}</div><div class="ai-time">${a.time}</div></div>
        </div>`).join('')}</div>
    </div>`;
}

function renderBody() { return S.tab === 'overview' ? renderOverview() : renderActivity(); }

/* ---------------- Rail ---------------- */
function renderRail() {
  const tiles = [
    { l: 'Clubs Joined', v: STATS.clubs, c: '#7C3AED', bg: 'var(--purple-bg)', icon: 'clubs' },
    { l: 'Events Attended', v: STATS.events, c: '#3B82F6', bg: 'var(--blue-bg)', icon: 'events' },
    { l: 'Attendance', v: STATS.attendance + '%', c: '#16A34A', bg: 'var(--green-bg)', icon: 'attendance' },
    { l: 'Pending Requests', v: STATS.pending, c: '#F59E0B', bg: 'var(--orange-bg)', icon: 'approvals' },
  ];
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Quick Stats</h3></div>
      <div class="qs-grid">${tiles.map((t) => `<div class="qs-tile" style="background:${t.bg};"><div class="qi" style="background:${t.c};">${icon(t.icon, 16)}</div><div><div class="ql">${t.l}</div><div class="qv">${t.v}</div></div></div>`).join('')}</div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Achievements</h3></div>
      <div class="badge-grid">
        ${BADGES.map((b) => `
          <div class="badge-tile ${b.unlocked ? '' : 'locked'}">
            <div class="bi" style="background:${b.unlocked ? b.color : 'var(--muted-2)'};">${icon(b.unlocked ? b.icon : 'bookmark', 16)}</div>
            <div class="bl">${b.label}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="contact-cta">
      <h4>Account Preferences</h4>
      <p>Manage notifications, theme and privacy settings for your account.</p>
      <button class="btn-solid" id="goto-settings">Go to Settings ${icon('arrowRight', 13)}</button>
    </div>`;
}

/* ---------------- Edit Profile modal ---------------- */
function openEdit() {
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <h3 style="font-size:17px; margin-bottom:2px;">Edit Profile</h3>
      <div class="modal-sub">Update your personal details.</div>
      <label class="form-label" for="ed-name">Full Name</label>
      <input class="sort-select" id="ed-name" style="width:100%;" value="${esc(PROFILE.name)}" />
      <label class="form-label" for="ed-phone">Phone</label>
      <input class="sort-select" id="ed-phone" style="width:100%;" value="${esc(PROFILE.phone)}" />
      <label class="form-label" for="ed-bio">Bio</label>
      <textarea class="msg-textarea" id="ed-bio">${esc(PROFILE.bio)}</textarea>
      <div class="modal-actions"><button class="btn-soft" id="ed-cancel">Cancel</button><button class="btn-solid" id="ed-save">Save Changes</button></div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('ed-cancel').addEventListener('click', closeModal);
  document.getElementById('ed-save').addEventListener('click', () => {
    const name = document.getElementById('ed-name').value.trim();
    if (!name) { showToast('Name can\u2019t be empty'); return; }
    PROFILE.name = name;
    PROFILE.phone = document.getElementById('ed-phone').value.trim() || PROFILE.phone;
    PROFILE.bio = document.getElementById('ed-bio').value.trim() || PROFILE.bio;
    closeModal();
    refreshHeader();
    if (S.tab === 'overview') refreshBody();
    showToast('Profile updated');
  });
}
function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

/* ---------------- Wiring ---------------- */
function refreshHeader() {
  document.getElementById('ph-card').outerHTML = renderHeader();
  hydrateIcons(document.getElementById('content-main'));
  wireHeader();
}
function refreshBody() {
  document.getElementById('pf-body').innerHTML = renderBody();
  hydrateIcons(document.getElementById('content-main'));
}

function wireHeader() {
  document.getElementById('edit-profile-btn').addEventListener('click', openEdit);
  document.getElementById('ph-cam-btn').addEventListener('click', () => showToast('Photo upload is coming in a later build'));
}

function wireTabs() {
  document.querySelectorAll('#pf-tabs [data-tab]').forEach((b) => b.addEventListener('click', () => {
    S.tab = b.dataset.tab;
    document.getElementById('pf-tabs-box').innerHTML = renderTabs();
    wireTabs();
    refreshBody();
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('content-main').innerHTML =
    renderHeader() + `<div id="pf-tabs-box">${renderTabs()}</div>` + `<div id="pf-body">${renderBody()}</div>`;
  wireHeader();
  wireTabs();

  document.getElementById('content-rail').innerHTML = renderRail();
  document.getElementById('goto-settings').addEventListener('click', () => { window.location.href = 'settings.html'; });

  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim'; scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  initShell();
});
