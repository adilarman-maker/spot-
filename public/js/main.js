/* ---------------- Mock data ---------------- */
const STATS = [
  { icon: 'clubs', bg: 'var(--blue-bg)', fg: 'var(--blue)', value: 4, label: 'My Clubs', sub: 'Active memberships' },
  { icon: 'events', bg: 'var(--green-bg)', fg: 'var(--green)', value: 6, label: 'Upcoming Events', sub: 'Next: TechTalk (Tomorrow)' },
  { icon: 'fileText', bg: 'var(--orange-bg)', fg: 'var(--orange)', value: 2, label: 'Pending Approvals', sub: 'Awaiting your action' },
  { icon: 'bell', bg: 'var(--purple-bg)', fg: 'var(--purple)', value: 5, label: 'Unread Messages', sub: '3 new messages' },
];

const EVENTS = [
  { mon: 'Apr', day: 26, title: 'TechTalk: Future of AI', club: 'CSE Club', location: 'Seminar Hall', time: '10:00 AM – 12:00 PM', tag: 'Workshop', tagFg: 'var(--blue)', tagBg: 'var(--blue-bg)', gradient: 'linear-gradient(135deg,#3557C7,#5B7EE8)', action: 'View Event', actionStyle: 'outline' },
  { mon: 'Apr', day: 28, title: 'Hackathon 2026', club: 'Code Craft', location: 'Innovation Lab', time: '9:00 AM – 5:00 PM', tag: 'Competition', tagFg: 'var(--orange)', tagBg: 'var(--orange-bg)', gradient: 'linear-gradient(135deg,#6D28D9,#9B5CF7)', action: 'Register', actionStyle: 'solid-blue' },
  { mon: 'Apr', day: 30, title: 'Robotics Workshop', club: 'Robotics Club', location: 'Lab 2', time: '2:00 PM – 5:00 PM', tag: 'Workshop', tagFg: 'var(--green)', tagBg: 'var(--green-bg)', gradient: 'linear-gradient(135deg,#0F9B6E,#1FC98C)', action: 'View Event', actionStyle: 'outline' },
  { mon: 'May', day: 3, title: 'Cultural Fest', club: 'Cultural Club', location: 'Main Ground', time: '5:00 PM – 10:00 PM', tag: 'Cultural', tagFg: 'var(--pink)', tagBg: 'var(--pink-bg)', gradient: 'linear-gradient(135deg,#BE185D,#EC4899)', action: 'Register', actionStyle: 'solid-pink' },
];

const MY_CLUBS = [
  { icon: 'code', name: 'Code Craft', cat: 'Technical Club', members: 142, bg: 'var(--purple-bg)', fg: 'var(--purple)' },
  { icon: 'robot', name: 'Robotics Club', cat: 'Technical Club', members: 96, bg: 'var(--blue-bg)', fg: 'var(--blue)' },
  { icon: 'trophy', name: 'Sports Council', cat: 'Sports Club', members: 210, bg: 'var(--green-bg)', fg: 'var(--green)' },
  { icon: 'drama', name: 'Cultural Club', cat: 'Cultural Club', members: 76, bg: 'var(--pink-bg)', fg: 'var(--pink)' },
];

const ANNOUNCEMENTS = [
  { icon: 'megaphone', bg: 'var(--blue-bg)', fg: 'var(--blue)', title: 'Club Registration Open', meta: 'Registration for all technical clubs is now open. Don\u2019t miss out!', time: 'Today, 10:24 AM' },
  { icon: 'plusCircle', bg: 'var(--orange-bg)', fg: 'var(--orange)', title: 'Hackathon Registration', meta: 'Register before September 28. Limited seats!', time: 'Yesterday, 5:12 PM' },
  { icon: 'award', bg: 'var(--green-bg)', fg: 'var(--green)', title: 'Event Results', meta: 'Winners of TechTalk 2026 announced. Check your email for details.', time: '2 days ago' },
  { icon: 'giftBox', bg: 'var(--purple-bg)', fg: 'var(--purple)', title: 'New Club Formed', meta: 'Join the Photography Club! Registration open now.', time: '3 days ago' },
];

const QUICK_ACTIONS = [
  { icon: 'compass', bg: 'var(--blue-bg)', fg: 'var(--blue)', title: 'Browse Clubs', desc: 'Discover new clubs', soon: 'Clubs' },
  { icon: 'events', bg: 'var(--green-bg)', fg: 'var(--green)', title: 'Browse Events', desc: 'Find upcoming events', soon: 'Events' },
  { icon: 'clubs', bg: 'var(--purple-bg)', fg: 'var(--purple)', title: 'My Clubs', desc: 'View your club memberships', soon: 'Clubs' },
  { icon: 'fileText', bg: 'var(--orange-bg)', fg: 'var(--orange)', title: 'My Requests', desc: 'Check your pending requests', soon: 'Approvals' },
];

const FACULTY = [
  { name: 'Dr. Ramesh Kumar', role: 'HOD · Computer Science' },
  { name: 'Prof. Anita Sharma', role: 'Assistant Professor · CSE' },
  { name: 'Dr. Vijay Patel', role: 'Associate Professor · Mathematics' },
  { name: 'Prof. Sneha Reddy', role: 'Assistant Professor · Physics' },
];

const ATTENDANCE = { percent: 92, present: 46, absent: 3, total: 49 };

const APPROVALS = [
  { title: 'Event Registration', meta: 'Hackathon 2026 · Apr 28, 2026' },
  { title: 'New Member Request', meta: 'Code Craft · Apr 22, 2026' },
  { title: 'Club Registration', meta: 'Robotics Club · Apr 20, 2026' },
];

const MESSAGES = [
  { name: 'Code Craft', preview: 'Hey! Meeting tomorrow at 10 AM in Seminar Hall.', time: '10:24 AM', unread: 2 },
  { name: 'Ananya Rao', preview: 'Thanks for joining the event!', time: '9:12 AM', unread: 1 },
  { name: 'Sports Council', preview: 'Practice session is on this Saturday.', time: 'Yesterday' },
  { name: 'Faculty Group', preview: 'Exam schedule has been updated.', time: 'Yesterday' },
];

/* ---------------- Renderers ---------------- */
function renderStatGrid() {
  return `
    <div class="stat-grid">
      ${STATS.map((s) => `
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-icon" style="background:${s.bg}; color:${s.fg};">${icon(s.icon, 19)}</div>
            <span class="stat-arrow">${icon('arrowRight', 15)}</span>
          </div>
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
          <div class="stat-sub">${s.sub}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderEvents() {
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('events', 15)}</div>
          <h3>Upcoming Events</h3>
        </div>
        <a href="#" class="view-all" data-soon="Events">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div class="events-scroller">
        ${EVENTS.map((e) => `
          <div class="event-card">
            <div class="event-banner" style="background:${e.gradient};">
              <div class="event-date-badge">
                <div class="mon">${e.mon}</div>
                <div class="day">${e.day}</div>
              </div>
            </div>
            <div class="event-info">
              <div class="event-title">${e.title}</div>
              <div class="event-club">${e.club}</div>
              <div class="event-meta-line">${icon('mapPin', 12)}${e.location}</div>
              <div class="event-meta-line">${icon('clock', 12)}${e.time}</div>
              <span class="event-tag" style="background:${e.tagBg}; color:${e.tagFg};">${e.tag}</span>
              <button class="event-action" data-soon="Events" style="${eventActionStyle(e.actionStyle)}">${e.action}</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function eventActionStyle(kind) {
  if (kind === 'outline') return 'background:transparent; border:1px solid var(--blue) !important; color:var(--blue);';
  if (kind === 'solid-pink') return 'background:var(--pink); color:#fff;';
  return 'background:var(--blue); color:#fff;';
}

function renderMyClubsPanel() {
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--purple-bg); color:var(--purple);">${icon('clubs', 15)}</div>
          <h3>My Clubs</h3>
        </div>
        <a href="#" class="view-all" data-soon="Clubs">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div class="clubs-row">
        ${MY_CLUBS.map((c) => `
          <div class="club-mini">
            <div class="club-mini-icon" style="background:${c.bg}; color:${c.fg};">${icon(c.icon, 17)}</div>
            <div>
              <div class="club-mini-name">${c.name}</div>
              <div class="club-mini-cat">${c.cat}</div>
              <div class="club-mini-members">${icon('users', 10)} ${c.members} members</div>
            </div>
            <span class="club-mini-arrow">${icon('arrowRight', 14)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTwoCol() {
  return `
    <div class="two-col">
      <div class="panel">
        <div class="panel-head">
          <div class="panel-head-title">
            <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('megaphone', 15)}</div>
            <h3>Announcements</h3>
          </div>
          <a href="#" class="view-all" data-soon="Announcements">View All ${icon('arrowRight', 13)}</a>
        </div>
        <div>
          ${ANNOUNCEMENTS.map((a) => `
            <div class="announce-row">
              <div class="announce-dot" style="background:${a.bg}; color:${a.fg};">${icon(a.icon, 14)}</div>
              <div style="flex:1; min-width:0;">
                <div class="announce-title">${a.title}</div>
                <div class="announce-meta">${a.meta}</div>
              </div>
              <div class="announce-time">${a.time}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div class="panel-head-title">
            <div class="phi" style="background:var(--orange-bg); color:var(--orange);">${icon('plusCircle', 15)}</div>
            <h3>Quick Actions</h3>
          </div>
        </div>
        <div class="qa-grid">
          ${QUICK_ACTIONS.map((q) => `
            <div class="qa-card" data-soon="${q.soon}" style="cursor:pointer;">
              <div class="qa-icon" style="background:${q.bg}; color:${q.fg};">${icon(q.icon, 16)}</div>
              <div class="qa-title">${q.title}</div>
              <div class="qa-desc">${q.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderFacultyRail() {
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('faculty', 15)}</div>
          <h3>Faculty</h3>
        </div>
        <a href="#" class="view-all" data-soon="Faculty">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div>
        ${FACULTY.map((f) => `
          <div class="rail-list-row">
            <div class="rail-avatar">${initialsOf(f.name)}</div>
            <div style="min-width:0;">
              <div class="rail-name">${f.name}</div>
              <div class="rail-sub">${f.role}</div>
            </div>
            <span class="rail-chat-icon" data-soon="Messages">${icon('chat', 14)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAttendanceRail() {
  const size = 96, sw = 10;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (ATTENDANCE.percent / 100) * c;
  const center = size / 2;
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--green-bg); color:var(--green);">${icon('attendance', 15)}</div>
          <h3>Attendance</h3>
        </div>
        <a href="#" class="view-all" data-soon="Attendance">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div class="donut-wrap">
        <div class="donut">
          <svg width="${size}" height="${size}">
            <circle cx="${center}" cy="${center}" r="${r}" stroke="var(--border)" stroke-width="${sw}" fill="none"/>
            <circle cx="${center}" cy="${center}" r="${r}" stroke="var(--green)" stroke-width="${sw}" fill="none"
              stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/>
          </svg>
          <div class="donut-center">
            <div class="donut-pct">${ATTENDANCE.percent}%</div>
            <div class="donut-label">You are on track!</div>
          </div>
        </div>
        <div class="donut-stats">
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--green);"></span>Present</span><span class="v">${ATTENDANCE.present}</span></div>
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--red);"></span>Absent</span><span class="v">${ATTENDANCE.absent}</span></div>
          <div class="donut-stat-row"><span class="k"><span class="dot" style="background:var(--muted-2);"></span>Total Classes</span><span class="v">${ATTENDANCE.total}</span></div>
        </div>
      </div>
    </div>
  `;
}

function renderApprovalsRail() {
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--pink-bg); color:var(--pink);">${icon('approvals', 15)}</div>
          <h3>Approvals</h3>
        </div>
        <a href="#" class="view-all" data-soon="Approvals">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div>
        ${APPROVALS.map((a, i) => `
          <div class="approval-row" data-idx="${i}">
            <div class="approval-top">
              <div class="approval-icon">${icon('fileText', 14)}</div>
              <div>
                <div class="approval-title">${a.title}</div>
                <div class="approval-meta">${a.meta}</div>
              </div>
            </div>
            <div class="approval-actions">
              <button class="btn-approve" data-action="approve">Approve</button>
              <button class="btn-reject" data-action="reject">Reject</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMessagesRail() {
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--purple-bg); color:var(--purple);">${icon('messages', 15)}</div>
          <h3>Messages</h3>
        </div>
        <a href="#" class="view-all" data-soon="Messages">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div>
        ${MESSAGES.map((m) => `
          <div class="rail-list-row" data-soon="Messages" style="cursor:pointer;">
            <div class="rail-avatar">${initialsOf(m.name)}</div>
            <div style="min-width:0; flex:1;">
              <div class="rail-name">${m.name}</div>
              <div class="rail-sub" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:150px;">${m.preview}</div>
            </div>
            ${m.unread ? `<span class="rail-unread">${m.unread}</span>` : `<span class="rail-time">${m.time}</span>`}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderGreeting() {
  return `
    <div class="greeting-banner">
      <div class="greet-avatar">AS</div>
      <div class="greet-text">
        <h2>Good Morning, Aarav 👋</h2>
        <div class="welcome">Welcome back to Spot!</div>
        <div class="meta">B.Tech CSE &nbsp;·&nbsp; 2nd Year &nbsp;·&nbsp; Sem 4 &nbsp;·&nbsp; Roll No: 21CS045</div>
      </div>
    </div>
  `;
}

/* ---------------- Approve/Reject interactions ---------------- */
function initApprovalActions() {
  document.querySelectorAll('.approval-row').forEach((row) => {
    row.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const title = row.querySelector('.approval-title').textContent;
        row.style.opacity = '0.45';
        row.style.pointerEvents = 'none';
        showToast(`${title} ${action === 'approve' ? 'approved' : 'rejected'}`);
      });
    });
  });
}

/* ---------------- Init ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('content-main').innerHTML =
    renderGreeting() + renderStatGrid() + renderEvents() + renderMyClubsPanel() + renderTwoCol();

  document.getElementById('content-rail').innerHTML =
    renderFacultyRail() + renderAttendanceRail() + renderApprovalsRail() + renderMessagesRail();

  initShell();
  initApprovalActions();
});
