/* ---------------- Data ---------------- */
const PALETTE = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#14B8A6', '#6366F1', '#EF4444'];
const FILE_COLORS = { PPTX: '#EF6C3C', PDF: '#EF4444', DOC: '#3B82F6', XLS: '#10B981', LINK: '#3B82F6' };

const F_PPT = { type: 'file', name: 'AI_Tools_Overview.pptx', meta: '2.4 MB · PPTX', ext: 'PPTX' };
const F_NOTES = { type: 'file', name: 'Meeting_Notes.pdf', meta: '1.2 MB · PDF', ext: 'PDF' };
const F_HACK = { type: 'file', name: 'Hackathon_Guide.pdf', meta: '3.8 MB · PDF', ext: 'PDF' };

const CONVS = [
  {
    id: 1, name: 'Code Craft Club', kind: 'club', types: ['clubs', 'groups'], icon: 'code', color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#1e1b4b,#4c1d95 55%,#7C3AED)', tag: 'Technical Club', members: 142, unread: 5, lastTime: '10:24 AM',
    desc: 'Build. Code. Create. A club for developers, problem solvers and tech enthusiasts.',
    people: ['Riya Sharma', 'Karan Singh', 'Meera Iyer', 'Ananya Rao', 'Rohit Verma', 'Divya Rangan'],
    files: [F_PPT, F_NOTES, F_HACK],
    messages: [
      { from: 'Riya Sharma', text: 'Hey everyone! Just a quick reminder that our next club meeting is today at 4 PM in Seminar Hall.', time: '10:24 AM' },
      { from: 'You', out: true, text: "Got it! I'll be there.", time: '10:25 AM' },
      { from: 'Karan Singh', text: "Can someone share the slides from the last session? I couldn't attend it.", time: '10:27 AM' },
      { from: 'Riya Sharma', text: '', att: F_PPT, time: '10:28 AM' },
      { from: 'Meera Iyer', text: 'Also, the hackathon registration link is now live. Please register if you\u2019re interested!', att: { type: 'link', name: 'Hackathon 2026 - Registration', meta: 'www.college.edu/hackathon', ext: 'LINK' }, time: '10:31 AM' },
      { from: 'You', out: true, text: "Thanks Meera! I'll register now.", time: '10:32 AM' },
    ],
  },
  {
    id: 2, name: 'Dr. Ramesh Kumar (Faculty)', short: 'Dr. Ramesh Kumar', kind: 'person', types: ['direct', 'faculty'], initials: 'RK', color: '#3B82F6',
    gradient: 'linear-gradient(135deg,#1e3a8a,#3B82F6)', tag: 'HOD · Computer Science', unread: 1, lastTime: '9:12 AM',
    desc: 'Head of the Computer Science department. Available for academic guidance and mentorship.',
    files: [F_NOTES],
    messages: [
      { from: 'You', out: true, text: 'Good morning sir, could you share the notes from yesterday\u2019s lecture?', time: '9:05 AM' },
      { from: 'Dr. Ramesh Kumar', text: 'Sure, no problem. I\u2019ll share the notes.', time: '9:12 AM' },
    ],
  },
  {
    id: 3, name: 'Sports Council', kind: 'club', types: ['clubs', 'groups'], icon: 'trophy', color: '#16A34A',
    gradient: 'linear-gradient(135deg,#14532d,#22C55E)', tag: 'Sports Club', members: 76, unread: 2, lastTime: '8:45 AM',
    desc: 'Play. Compete. Grow. Organizing sports events and tournaments across campus.',
    people: ['Arjun Nair', 'Rohit Verma', 'Karan Singh', 'Sneha Reddy'], files: [],
    messages: [
      { from: 'Arjun Nair', text: 'Practice session is postponed to 5 PM today because of the rain.', time: '8:45 AM' },
    ],
  },
  {
    id: 4, name: 'Cultural Club', kind: 'club', types: ['clubs', 'groups'], icon: 'drama', color: '#EC4899',
    gradient: 'linear-gradient(135deg,#831843,#EC4899)', tag: 'Cultural Club', members: 64, unread: 0, lastTime: 'Yesterday',
    desc: 'Celebrate Diversity. Music, dance, drama and more.',
    people: ['Meera Iyer', 'Divya Rangan', 'Ananya Rao'], files: [],
    messages: [
      { from: 'Meera Iyer', text: 'Event registrations are open now! Sign up before Friday.', time: 'Yesterday' },
    ],
  },
  {
    id: 5, name: 'Robotics Club', kind: 'club', types: ['clubs', 'groups'], icon: 'robot', color: '#2563EB',
    gradient: 'linear-gradient(135deg,#334155,#2563EB)', tag: 'Technical Club', members: 96, unread: 0, lastTime: 'Yesterday',
    desc: 'Design. Build. Innovate. Robotics, automation and cutting-edge tech.',
    people: ['Karan Singh', 'Rohit Verma', 'Riya Sharma'], files: [F_HACK],
    messages: [
      { from: 'Karan Singh', text: 'Lab 2 is booked for Tuesday and Thursday this week.', time: 'Yesterday' },
      { from: 'You', out: true, text: "I'll be there. Thanks!", time: 'Yesterday' },
    ],
  },
  {
    id: 6, name: 'Ananya Rao', kind: 'person', types: ['direct'], initials: 'AR', color: '#EC4899',
    gradient: 'linear-gradient(135deg,#831843,#EC4899)', tag: 'B.Tech CSE · 2nd Year', unread: 0, lastTime: 'Yesterday',
    desc: 'Classmate and Code Craft member.', files: [],
    messages: [
      { from: 'Ananya Rao', text: 'Did you get the assignment sheet?', time: 'Yesterday' },
      { from: 'You', out: true, text: 'Yes, sending it over now.', time: 'Yesterday' },
      { from: 'Ananya Rao', text: 'Thanks for the help!', time: 'Yesterday' },
    ],
  },
  {
    id: 7, name: 'Faculty Group', kind: 'group', types: ['groups', 'faculty'], icon: 'faculty', color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#4c1d95,#8B5CF6)', tag: 'Faculty Group', members: 28, unread: 3, lastTime: 'Sep 20',
    desc: 'Announcements and coordination between faculty and student representatives.',
    people: ['Dr. Vijay Patel', 'Prof. Anita Sharma', 'Dr. Ramesh Kumar'], files: [F_NOTES],
    messages: [
      { from: 'Dr. Vijay Patel', text: 'Please check the updated exam schedule before Friday.', time: 'Sep 20' },
    ],
  },
  {
    id: 8, name: 'TechFest 2026', kind: 'group', types: ['groups'], icon: 'events', color: '#3B82F6',
    gradient: 'linear-gradient(135deg,#1e3a8a,#3B82F6)', tag: 'Event Group', members: 210, unread: 0, lastTime: 'Sep 19',
    desc: 'Coordination group for the annual TechFest volunteers and organisers.',
    people: ['Admin Office', 'Riya Sharma', 'Rohit Verma'], files: [F_PPT],
    messages: [
      { from: 'Admin Office', text: 'Event details have been updated.', time: 'Sep 19' },
    ],
  },
  {
    id: 9, name: 'Placement Cell', kind: 'group', types: ['groups', 'staff'], icon: 'fileText', color: '#F59E0B',
    gradient: 'linear-gradient(135deg,#b45309,#F59E0B)', tag: 'Placement Group', members: 640, unread: 0, lastTime: 'Sep 18',
    desc: 'Placement drives, pre-placement talks and company updates.',
    people: ['Placement Officer', 'Aarav Sharma'], files: [],
    messages: [
      { from: 'You', out: true, text: 'Can you share the drive link?', time: 'Sep 18' },
    ],
  },
  {
    id: 10, name: 'Sneha Reddy', kind: 'person', types: ['direct', 'faculty'], initials: 'SR', color: '#10B981',
    gradient: 'linear-gradient(135deg,#065f46,#10B981)', tag: 'Asst. Professor · Physics', unread: 0, lastTime: 'Sep 17',
    desc: 'Assistant Professor, Physics. Available for academic support.', files: [],
    messages: [
      { from: 'You', out: true, text: 'Ma\u2019am, submitted the lab record.', time: 'Sep 17' },
      { from: 'Sneha Reddy', text: 'Okay, got it!', time: 'Sep 17' },
    ],
  },
];

const REPLIES = ['Thanks! I\u2019ll get back to you shortly.', 'Sure, sounds good.', 'Noted \u{1F44D}', 'Let\u2019s discuss this tomorrow.', 'Great, thank you for letting me know!'];
const FILTERS = [['all', 'All'], ['direct', 'Direct'], ['clubs', 'Clubs'], ['groups', 'Groups'], ['faculty', 'Faculty'], ['staff', 'Staff']];

/* ---------------- State ---------------- */
const S = { active: 1, filter: 'all', query: '', chatQuery: '', searchOpen: false, showChat: false };
const saved = new Set();
const joined = new Set([1, 3, 4, 5]);
const muted = new Set();

/* ---------------- Helpers ---------------- */
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const getConv = (id) => CONVS.find((c) => c.id === id);
const nowTime = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
const colorFor = (name) => PALETTE[[...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % PALETTE.length];
const bareName = (n) => n.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '');

function convAvatar(c) {
  if (c.kind === 'person') return `<div class="conv-avatar" style="background:${c.color};">${c.initials}</div>`;
  return `<div class="conv-avatar" style="background:${c.color};">${icon(c.icon, 19)}</div>`;
}

function previewOf(c) {
  const m = c.messages[c.messages.length - 1];
  const body = m.text || (m.att ? m.att.name : '');
  if (m.out) return `You: ${body}`;
  if (c.kind !== 'person') return `${bareName(m.from).split(' ')[0]}: ${body}`;
  return body;
}

function subtitle(c) {
  if (c.kind === 'person') return c.tag;
  return `${c.members} members${c.tag ? ' · ' + c.tag : ''}`;
}

/* ---------------- Conversation list ---------------- */
function visibleConvs() {
  const q = S.query.trim().toLowerCase();
  return CONVS.filter((c) => (S.filter === 'all' || c.types.includes(S.filter)) &&
    (!q || c.name.toLowerCase().includes(q) || previewOf(c).toLowerCase().includes(q)));
}

function renderList() {
  const list = visibleConvs();
  document.getElementById('conv-scroll').innerHTML = list.length ? list.map((c) => {
    const last = c.messages[c.messages.length - 1];
    const side = c.unread > 0
      ? `<span class="conv-badge ${c.kind === 'person' ? 'blue' : ''}">${c.unread}</span>`
      : (last.out ? `<span class="conv-tick">${icon('checkCheck', 14)}</span>` : '');
    return `
      <div class="conv-item ${c.id === S.active ? 'active' : ''}" data-conv="${c.id}">
        ${convAvatar(c)}
        <div class="conv-main"><div class="conv-name">${esc(c.name)}</div><div class="conv-prev">${esc(previewOf(c))}</div></div>
        <div class="conv-side"><span class="conv-time">${c.lastTime}</span>${side}</div>
      </div>`;
  }).join('') : `<div class="conv-empty">No conversations found.</div>`;

  document.querySelectorAll('[data-conv]').forEach((el) => el.addEventListener('click', () => openConv(Number(el.dataset.conv))));
}

/* ---------------- Chat ---------------- */
function attachHtml(a) {
  const color = FILE_COLORS[a.ext] || '#3B82F6';
  const ico = a.type === 'link' ? 'link' : 'fileText';
  return `
    <div class="attach">
      <div class="attach-ico" style="background:${color}22; color:${color};">${icon(ico, 16)}</div>
      <div style="min-width:0;"><div class="attach-name">${esc(a.name)}</div><div class="attach-meta">${esc(a.meta)}</div></div>
      <button class="attach-dl" data-download="${esc(a.name)}" aria-label="Download">${icon('download', 15)}</button>
    </div>`;
}

function highlight(text) {
  const safe = esc(text);
  const q = S.chatQuery.trim();
  if (!q) return safe;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return safe.replace(re, '<mark class="hl">$1</mark>');
}

function renderMessages() {
  const c = getConv(S.active);
  const q = S.chatQuery.trim().toLowerCase();
  const msgs = c.messages.filter((m) => !q || (m.text || '').toLowerCase().includes(q) || (m.att && m.att.name.toLowerCase().includes(q)));
  const body = document.getElementById('chat-body');
  if (!msgs.length) {
    body.innerHTML = `<div class="chat-empty">${q ? 'No messages match your search.' : 'No messages yet. Say hello!'}</div>`;
    return;
  }
  body.innerHTML = `<div class="day-chip">Today, ${c.messages[0].time.includes(':') ? c.messages[0].time : '10:24 AM'}</div>` + msgs.map((m) => {
    const out = !!m.out;
    const avatar = out ? '' : `<div class="b-avatar" style="background:${colorFor(m.from)};">${initialsOf(bareName(m.from))}</div>`;
    const showSender = !out && c.kind !== 'person';
    return `
      <div class="b-row ${out ? 'out' : ''}">
        ${avatar}
        <div class="b-col">
          ${showSender ? `<div class="b-sender">${esc(m.from)}</div>` : ''}
          <div class="bubble">
            ${m.text ? `<div>${highlight(m.text)}</div>` : ''}
            ${m.att ? attachHtml(m.att) : ''}
          </div>
          <div class="b-time">${m.time}${out ? icon('checkCheck', 13) : ''}</div>
        </div>
      </div>`;
  }).join('');
  body.scrollTop = body.scrollHeight;
  body.querySelectorAll('[data-download]').forEach((b) => b.addEventListener('click', () => showToast(`Downloading ${b.dataset.download} (demo)`)));
}

function renderChat() {
  const c = getConv(S.active);
  document.getElementById('chat-panel').innerHTML = `
    <div class="chat-head">
      <button class="chat-back" id="chat-back" aria-label="Back">${icon('chevLeft', 16)}</button>
      ${convAvatar(c)}
      <div style="min-width:0;"><div class="chat-title">${esc(c.short || c.name)}</div><div class="chat-sub">${esc(subtitle(c))}</div></div>
      <div class="chat-actions">
        <button id="act-search" class="${S.searchOpen ? 'on' : ''}" aria-label="Search in chat">${icon('search', 17)}</button>
        <button data-toast="Voice calls" aria-label="Call">${icon('phone', 17)}</button>
        <button data-toast="Video calls" aria-label="Video">${icon('video', 17)}</button>
        <button id="act-mute" aria-label="More">${icon('dotsV', 17)}</button>
      </div>
    </div>
    <div class="chat-search ${S.searchOpen ? 'show' : ''}" id="chat-search"><input id="chat-search-input" placeholder="Search in this conversation…" value="${esc(S.chatQuery)}" /></div>
    <div class="chat-body" id="chat-body"></div>
    <form class="composer" id="composer" autocomplete="off">
      <div class="composer-box">
        <button type="button" id="btn-emoji" aria-label="Emoji">${icon('smile', 17)}</button>
        <input id="msg-input" placeholder="Type a message…" />
        <button type="button" data-toast="Attachments" aria-label="Attach">${icon('paperclip', 17)}</button>
        <button type="button" data-toast="Image sharing" aria-label="Image">${icon('image', 17)}</button>
      </div>
      <button class="send-btn" type="submit" aria-label="Send">${icon('send', 17)}</button>
    </form>`;

  renderMessages();

  document.getElementById('chat-back').addEventListener('click', () => { S.showChat = false; syncLayout(); });
  document.getElementById('act-search').addEventListener('click', () => {
    S.searchOpen = !S.searchOpen;
    if (!S.searchOpen) S.chatQuery = '';
    renderChat();
    if (S.searchOpen) document.getElementById('chat-search-input').focus();
  });
  document.getElementById('chat-search-input').addEventListener('input', (e) => { S.chatQuery = e.target.value; renderMessages(); });
  document.getElementById('act-mute').addEventListener('click', () => {
    if (muted.has(c.id)) { muted.delete(c.id); showToast('Notifications on'); } else { muted.add(c.id); showToast(`Muted ${c.short || c.name}`); }
  });
  document.querySelectorAll('#chat-panel [data-toast]').forEach((b) => b.addEventListener('click', () => showToast(`${b.dataset.toast} aren\u2019t available in this prototype`)));
  document.getElementById('btn-emoji').addEventListener('click', () => {
    const i = document.getElementById('msg-input');
    i.value += ['\u{1F60A}', '\u{1F44D}', '\u{1F389}', '\u{1F64C}'][Math.floor(Math.random() * 4)];
    i.focus();
  });
  document.getElementById('composer').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('msg-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendMessage(c.id, { from: 'You', out: true, text });
  });
}

function sendMessage(id, msg) {
  const c = getConv(id);
  msg.time = nowTime();
  c.messages.push(msg);
  c.lastTime = 'Now';
  CONVS.splice(CONVS.indexOf(c), 1);
  CONVS.unshift(c);
  renderList();
  if (S.active === id) renderMessages();

  if (c.kind === 'person' && msg.out) {
    setTimeout(() => {
      c.messages.push({ from: c.short || c.name, text: REPLIES[Math.floor(Math.random() * REPLIES.length)], time: nowTime() });
      c.lastTime = 'Now';
      if (S.active === id) renderMessages(); else c.unread++;
      renderList();
    }, 1300);
  }
}

/* ---------------- Context rail ---------------- */
function renderRail() {
  const c = getConv(S.active);
  const isPerson = c.kind === 'person';
  const isSaved = saved.has(c.id);
  const isJoined = joined.has(c.id);

  const icon_ = isPerson ? c.initials : icon(c.icon, 24);
  const buttons = isPerson
    ? `<button class="btn-outline" data-act="profile">View Profile</button><button class="btn-fill" data-act="call">Call</button>`
    : c.kind === 'club'
      ? `<button class="btn-outline" data-act="club">View Club</button><button class="btn-fill ${isJoined ? 'joined' : ''}" data-act="join">${isJoined ? 'Joined \u2713' : 'Join'}</button>`
      : `<button class="btn-outline" data-act="info">Group Info</button><button class="btn-fill" data-act="mute">${muted.has(c.id) ? 'Unmute' : 'Mute'}</button>`;

  const members = !isPerson && c.people ? `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:13.6px;">Group Members (${c.members})</h3><a href="#" class="view-all" data-soon="Members">View All ${icon('arrowRight', 13)}</a></div>
      <div class="avatar-stack" style="padding-top:14px;">
        ${c.people.slice(0, 6).map((p) => `<div class="b-avatar" style="background:${colorFor(p)};" title="${esc(p)}">${initialsOf(bareName(p))}</div>`).join('')}
        ${c.members > 6 ? `<div class="avatar-more">+${c.members - Math.min(6, c.people.length)}</div>` : ''}
      </div>
    </div>` : '';

  const files = c.files.length ? c.files.map((f) => `
      <div class="file-row">
        <div class="attach-ico" style="background:${FILE_COLORS[f.ext]}22; color:${FILE_COLORS[f.ext]};">${icon('fileText', 16)}</div>
        <div style="min-width:0; flex:1;"><div class="file-name">${esc(f.name)}</div><div class="file-meta">${esc(f.meta)}</div></div>
        <button class="attach-dl" data-download="${esc(f.name)}" aria-label="Download">${icon('download', 15)}</button>
      </div>`).join('') : `<div class="conv-empty" style="padding:22px;">No shared files yet.</div>`;

  const qa = [
    ['users', 'Create Group Chat', 'group'],
    ['fileText', 'Share File', 'share'],
    ['events', 'Schedule Meeting', 'meeting'],
    ['settings', isPerson ? 'Chat Settings' : 'Club Settings', 'settings'],
  ];

  document.getElementById('content-rail').innerHTML = `
    <div class="ctx-card">
      <div class="ctx-banner" style="background:${c.gradient};">
        <button class="ctx-save ${isSaved ? 'on' : ''}" data-act="save" aria-label="Save">${icon('bookmark', 15)}</button>
        <div class="ctx-icon" style="background:${c.color};">${icon_}</div>
      </div>
      <div class="ctx-body">
        <div class="ctx-name">${esc(c.short || c.name)}</div>
        <div class="ctx-meta">${isPerson ? `<span>${esc(c.tag)}</span>` : `<span>${icon('users', 12)}${c.members} members</span><span>${esc(c.tag || 'Group')}</span>`}</div>
        <div class="ctx-desc">${esc(c.desc)}</div>
        <div class="ctx-btns">${buttons}</div>
      </div>
    </div>
    ${members}
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:13.6px;">Shared Files</h3><a href="#" class="view-all" data-soon="Files">View All ${icon('arrowRight', 13)}</a></div>
      <div style="padding:6px 0;">${files}</div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:13.6px;">Quick Actions</h3></div>
      <div style="padding:4px 0 6px;">
        ${qa.map(([i, l, a]) => `<button class="qa-row" data-qa="${a}">${icon(i, 17)}${l}<span class="qa-chev">${icon('chevRight', 14)}</span></button>`).join('')}
      </div>
    </div>`;

  wireRail(c);
}

function wireRail(c) {
  const rail = document.getElementById('content-rail');
  rail.querySelectorAll('[data-download]').forEach((b) => b.addEventListener('click', () => showToast(`Downloading ${b.dataset.download} (demo)`)));
  rail.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => {
    const a = b.dataset.act;
    if (a === 'save') { saved.has(c.id) ? saved.delete(c.id) : saved.add(c.id); showToast(saved.has(c.id) ? 'Saved' : 'Removed from saved'); renderRail(); }
    else if (a === 'join') { joined.has(c.id) ? joined.delete(c.id) : joined.add(c.id); showToast(joined.has(c.id) ? `Joined ${c.name} \u{1F389}` : `Left ${c.name}`); renderRail(); }
    else if (a === 'club') window.location.href = 'clubs.html';
    else if (a === 'profile') window.location.href = 'faculty.html';
    else if (a === 'call') showToast('Voice calls aren\u2019t available in this prototype');
    else if (a === 'info') showToast(`${c.name}: ${c.members} members`);
    else if (a === 'mute') { muted.has(c.id) ? muted.delete(c.id) : muted.add(c.id); showToast(muted.has(c.id) ? 'Muted' : 'Notifications on'); renderRail(); }
  }));
  rail.querySelectorAll('[data-qa]').forEach((b) => b.addEventListener('click', () => {
    const a = b.dataset.qa;
    if (a === 'share') {
      sendMessage(c.id, { from: 'You', out: true, text: '', att: { type: 'file', name: `Shared_Notes_${c.messages.length}.pdf`, meta: '0.8 MB · PDF', ext: 'PDF' } });
      c.files.unshift({ name: `Shared_Notes_${c.messages.length - 1}.pdf`, meta: '0.8 MB · PDF', ext: 'PDF' });
      renderRail(); showToast('File shared');
    } else if (a === 'meeting') {
      sendMessage(c.id, { from: 'You', out: true, text: '\u{1F4C5} Meeting scheduled for tomorrow at 4:00 PM.' });
      showToast('Meeting invite sent');
    } else if (a === 'group') showToast('Group creation is coming in a later build');
    else showToast('Settings are coming in a later build');
  }));
  initSoonLinks();
}

/* ---------------- Layout + navigation ---------------- */
function syncLayout() { document.getElementById('msg-layout').classList.toggle('show-chat', S.showChat); }

function openConv(id) {
  S.active = id;
  S.chatQuery = ''; S.searchOpen = false; S.showChat = true;
  getConv(id).unread = 0;
  renderList(); renderChat(); renderRail(); syncLayout();
}

/* ---------------- New message dialog ---------------- */
function openNewMessage() {
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <h3 style="font-size:17px; margin-bottom:2px;">New Message</h3>
      <div class="modal-sub">Send a message to a club, group or person.</div>
      <label class="form-label" for="nm-to">To</label>
      <select class="sort-select" id="nm-to">${CONVS.map((c) => `<option value="${c.id}" ${c.id === S.active ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>
      <label class="form-label" for="nm-text">Message</label>
      <textarea class="msg-textarea" id="nm-text" placeholder="Write your message…"></textarea>
      <div class="modal-actions"><button class="btn-soft" id="nm-cancel">Cancel</button><button class="btn-solid" id="nm-send">Send</button></div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('nm-text').focus();
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('nm-cancel').addEventListener('click', closeModal);
  document.getElementById('nm-send').addEventListener('click', () => {
    const text = document.getElementById('nm-text').value.trim();
    if (!text) { showToast('Write a message first'); return; }
    const id = Number(document.getElementById('nm-to').value);
    closeModal();
    openConv(id);
    sendMessage(id, { from: 'You', out: true, text });
  });
}

function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

/* ---------------- Init ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('content-main').innerHTML = `
    <div class="msg-page-head">
      <div><h2>Messages</h2><p>Stay connected with your clubs, friends and faculty.</p></div>
      <button class="btn-primary-lg" id="new-msg">${icon('plus', 15)} New Message</button>
    </div>
    <div class="pill-row" id="filter-pills"></div>
    <div class="msg-layout" id="msg-layout">
      <div class="msg-list">
        <div class="clubs-search">${icon('search', 15)}<input id="conv-search" placeholder="Search conversations…" /></div>
        <div class="conv-scroll" id="conv-scroll"></div>
      </div>
      <div class="msg-chat" id="chat-panel"></div>
    </div>`;

  const drawPills = () => {
    const box = document.getElementById('filter-pills');
    box.innerHTML = FILTERS.map(([k, l]) => `<button class="pill ${S.filter === k ? 'active' : ''}" data-f="${k}">${l}</button>`).join('');
    box.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => { S.filter = b.dataset.f; drawPills(); renderList(); }));
  };
  drawPills();

  document.getElementById('conv-search').addEventListener('input', (e) => { S.query = e.target.value; renderList(); });
  document.getElementById('new-msg').addEventListener('click', openNewMessage);

  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim';
  scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  renderList(); renderChat(); renderRail();
  initShell();
});
