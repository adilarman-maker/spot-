/* ---------------- Request types ---------------- */
const REQ_TYPES = {
  event: { label: 'Event Registration', icon: 'events', color: '#3B82F6', bg: 'var(--blue-bg)' },
  club: { label: 'Club Join Request', icon: 'clubs', color: '#7C3AED', bg: 'var(--purple-bg)' },
  permission: { label: 'Outing / Permission', icon: 'approvals', color: '#F59E0B', bg: 'var(--orange-bg)' },
  proposal: { label: 'Event Proposal', icon: 'bulb', color: '#16A34A', bg: 'var(--green-bg)' },
};

/* ---------------- Seed data ---------------- */
let seq = 100;
const REQUESTS = [
  { id: 1, type: 'event', title: 'Hackathon 2026', meta: 'Registration for the 24-hour build sprint', status: 'pending', submitted: 'Sep 27, 2026',
    timeline: [{ l: 'Submitted', t: 'Sep 27, 10:12 AM', done: true }, { l: 'Under Review', t: 'Coordinator reviewing', done: true }, { l: 'Decision', t: 'Awaiting approval', done: false }] },
  { id: 2, type: 'permission', title: 'Weekend Outing — Delhi', meta: 'Family function, Apr 25 \u2013 27', status: 'pending', submitted: 'Sep 26, 2026',
    timeline: [{ l: 'Submitted', t: 'Sep 26, 4:40 PM', done: true }, { l: 'Under Review', t: 'Warden reviewing', done: true }, { l: 'Decision', t: 'Awaiting approval', done: false }] },
  { id: 3, type: 'club', title: 'Code Craft Club', meta: 'Request to join as a member', status: 'approved', submitted: 'Sep 20, 2026', approvedBy: 'Dr. Ananya Rao',
    timeline: [{ l: 'Submitted', t: 'Sep 20, 9:05 AM', done: true }, { l: 'Under Review', t: 'Sep 21, 11:00 AM', done: true }, { l: 'Approved', t: 'Sep 21, 3:20 PM', done: true }] },
  { id: 4, type: 'event', title: 'Web Development Workshop', meta: 'Registration for Oct 5 workshop', status: 'approved', submitted: 'Sep 18, 2026', approvedBy: 'Tech Club',
    timeline: [{ l: 'Submitted', t: 'Sep 18, 2:00 PM', done: true }, { l: 'Under Review', t: 'Sep 18, 2:40 PM', done: true }, { l: 'Approved', t: 'Sep 18, 5:00 PM', done: true }] },
  { id: 5, type: 'permission', title: 'Late Return — Hostel', meta: 'Cultural club rehearsal, returning 10 PM', status: 'rejected', submitted: 'Sep 15, 2026', note: 'Submitted after the 6 PM cutoff \u2014 please resubmit earlier next time.',
    timeline: [{ l: 'Submitted', t: 'Sep 15, 5:55 PM', done: true }, { l: 'Under Review', t: 'Sep 15, 6:10 PM', done: true }, { l: 'Rejected', t: 'Sep 15, 6:15 PM', done: true }] },
  { id: 6, type: 'proposal', title: 'Photography Walk Proposal', meta: 'Proposed campus photography walk for the Photography Club', status: 'approved', submitted: 'Sep 10, 2026', approvedBy: 'Student Activities Office',
    timeline: [{ l: 'Submitted', t: 'Sep 10, 1:00 PM', done: true }, { l: 'Under Review', t: 'Sep 11, 10:00 AM', done: true }, { l: 'Approved', t: 'Sep 12, 9:00 AM', done: true }] },
];

/* ---------------- State ---------------- */
const S = { filter: 'all' };
const FILTERS = [['all', 'All'], ['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']];
const STATUS_ICON = { pending: 'clock3', approved: 'checkCheck', rejected: 'close' };

/* ---------------- Helpers ---------------- */
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function counts() {
  return { pending: REQUESTS.filter((r) => r.status === 'pending').length, approved: REQUESTS.filter((r) => r.status === 'approved').length, rejected: REQUESTS.filter((r) => r.status === 'rejected').length, total: REQUESTS.length };
}

/* ---------------- Renderers ---------------- */
function renderBanner() {
  return `
    <div class="ap-banner">
      <div class="ap-banner-icon">${icon('approvals', 24)}</div>
      <div><h2>Approvals</h2><p>Track the status of your event registrations, club requests and permissions.</p></div>
    </div>`;
}

function renderStats() {
  const c = counts();
  const cards = [
    { icon: 'clock3', color: '#F59E0B', bg: 'var(--orange-bg)', label: 'Pending', value: c.pending },
    { icon: 'checkCheck', color: '#16A34A', bg: 'var(--green-bg)', label: 'Approved', value: c.approved },
    { icon: 'close', color: '#DC2626', bg: 'var(--red-bg)', label: 'Rejected', value: c.rejected },
    { icon: 'fileText', color: '#3B82F6', bg: 'var(--blue-bg)', label: 'Total Requests', value: c.total },
  ];
  return `<div class="ev-stat-grid" id="ap-stats">${cards.map((s) => `
    <div class="ev-stat-card" style="background:${s.bg};">
      <div class="ev-stat-top">
        <div class="ev-stat-icon" style="background:${s.color};">${icon(s.icon, 19)}</div>
        <div><div class="ev-stat-label">${s.label}</div><div class="ev-stat-row"><span class="ev-stat-value">${s.value}</span></div></div>
      </div>
    </div>`).join('')}</div>`;
}

function renderFilters() {
  return `<div class="pill-row" id="ap-pills">${FILTERS.map(([k, l]) => `<button class="pill ${S.filter === k ? 'active' : ''}" data-f="${k}">${l}</button>`).join('')}</div>`;
}

function reqCardHtml(r) {
  const t = REQ_TYPES[r.type];
  return `
    <div class="req-card" data-req="${r.id}">
      <div class="req-top">
        <div class="req-icon" style="background:${t.bg}; color:${t.color};">${icon(t.icon, 18)}</div>
        <div style="flex:1; min-width:0;"><div class="req-title">${esc(r.title)}</div><div class="req-meta">${esc(r.meta)}</div></div>
        <span class="req-status ${r.status}">${icon(STATUS_ICON[r.status], 11)}${r.status[0].toUpperCase() + r.status.slice(1)}</span>
      </div>
      <div class="req-foot">
        <span>${t.label} · Submitted ${r.submitted}</span>
        ${r.status === 'pending' ? `<button class="cancel-btn" data-cancel="${r.id}">Cancel Request</button>` : ''}
      </div>
    </div>`;
}

function renderList() {
  const list = S.filter === 'all' ? REQUESTS : REQUESTS.filter((r) => r.status === S.filter);
  return list.length ? list.map(reqCardHtml).join('') : `<div class="panel"><div class="panel-body" style="text-align:center; color:var(--muted); padding:40px 20px;">No ${S.filter === 'all' ? '' : S.filter + ' '}requests.</div></div>`;
}

/* ---------------- Rail ---------------- */
function renderRail() {
  const c = counts();
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Request Types</h3></div>
      <div style="padding:6px 0 10px;">
        ${Object.entries(REQ_TYPES).map(([k, t]) => {
          const n = REQUESTS.filter((r) => r.type === k).length;
          return `<div class="dept-row" data-type-filter="${k}"><span class="dept-dot" style="background:${t.color};">${icon(t.icon, 12)}</span>${t.label}<span class="dept-count">${n}</span></div>`;
        }).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Need Something Approved?</h3></div>
      <div class="panel-body" style="padding-top:4px;">
        <p style="font-size:11.6px; color:var(--muted); line-height:1.6; margin:0 0 12px;">Submit a new request for an event, club membership, or permission — your club coordinator or warden will review it.</p>
        <button class="btn-solid" id="rail-new-req" style="width:100%;">New Request ${icon('plus', 13)}</button>
      </div>
    </div>
    <div class="quote-card">
      <div class="quote-icon">${icon('rotateCcw', 17)}</div>
      <div><div class="quote-text" style="font-style:normal; font-size:11.8px;">Approved requests stay on record here so you always have a copy of the decision and who approved it.</div></div>
    </div>`;
}

/* ---------------- Detail modal ---------------- */
function openDetail(id) {
  const r = REQUESTS.find((x) => x.id === id);
  const t = REQ_TYPES[r.type];
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <div class="modal-head">
        <div class="fac-avatar" style="background:${t.color};">${icon(t.icon, 22)}</div>
        <div><h3>${esc(r.title)}</h3><div class="modal-sub">${t.label}</div></div>
      </div>
      <p class="modal-about">${esc(r.meta)}</p>
      ${r.note ? `<div class="warn-banner" style="background:var(--danger-bg); border-color:transparent;">${icon('alertTriangle', 16)}<div><div class="wt" style="color:var(--danger);">Note from reviewer</div><div class="wd">${esc(r.note)}</div></div></div>` : ''}
      ${r.approvedBy ? `<div class="fac-info" style="margin:0 0 10px;"><div>${icon('checkCheck', 13)}<span>Approved by ${esc(r.approvedBy)}</span></div></div>` : ''}
      <div class="modal-section-label">Timeline</div>
      <div class="timeline">
        ${r.timeline.map((step, i) => `
          <div class="tl-row">
            <div class="tl-dot-wrap">
              <div class="tl-dot" style="background:${step.done ? (r.status === 'rejected' && i === r.timeline.length - 1 ? 'var(--danger)' : 'var(--green)') : 'var(--border)'}; color:#fff;">${step.done ? icon('checkCheck', 11) : ''}</div>
              ${i < r.timeline.length - 1 ? '<div class="tl-line"></div>' : ''}
            </div>
            <div><div class="tl-title">${esc(step.l)}</div><div class="tl-time">${esc(step.t)}</div></div>
          </div>`).join('')}
      </div>
      <div class="modal-actions">
        <button class="btn-soft" id="modal-close2">Close</button>
        ${r.status === 'pending' ? `<button class="btn-solid" style="background:var(--danger);" id="modal-cancel" data-cancel="${r.id}">Cancel Request</button>` : ''}
      </div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-close2').addEventListener('click', closeModal);
  const cancelBtn = document.getElementById('modal-cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', () => { cancelRequest(r.id); closeModal(); });
}
function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

/* ---------------- New request form ---------------- */
function openNewRequest() {
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <h3 style="font-size:17px; margin-bottom:2px;">New Request</h3>
      <div class="modal-sub">Submit a request for approval.</div>
      <label class="form-label" for="nr-type">Type</label>
      <select class="sort-select" id="nr-type">${Object.entries(REQ_TYPES).map(([k, t]) => `<option value="${k}">${t.label}</option>`).join('')}</select>
      <label class="form-label" for="nr-title">Title</label>
      <input class="sort-select" id="nr-title" style="width:100%;" placeholder="e.g. Hackathon 2026" />
      <label class="form-label" for="nr-reason">Reason / Details</label>
      <textarea class="msg-textarea" id="nr-reason" placeholder="Add any details the reviewer should know\u2026"></textarea>
      <div class="modal-actions"><button class="btn-soft" id="nr-cancel">Cancel</button><button class="btn-solid" id="nr-submit">Submit Request</button></div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('nr-cancel').addEventListener('click', closeModal);
  document.getElementById('nr-submit').addEventListener('click', () => {
    const type = document.getElementById('nr-type').value;
    const title = document.getElementById('nr-title').value.trim();
    const reason = document.getElementById('nr-reason').value.trim();
    if (!title) { showToast('Give your request a title'); return; }
    seq++;
    REQUESTS.unshift({
      id: seq, type, title, meta: reason || 'No additional details provided.', status: 'pending', submitted: 'Today',
      timeline: [{ l: 'Submitted', t: 'Just now', done: true }, { l: 'Under Review', t: 'Pending review', done: false }, { l: 'Decision', t: 'Awaiting approval', done: false }],
    });
    closeModal();
    S.filter = 'all';
    refreshAll();
    showToast('Request submitted');
  });
}

function cancelRequest(id) {
  const idx = REQUESTS.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const title = REQUESTS[idx].title;
  REQUESTS.splice(idx, 1);
  refreshAll();
  showToast(`Cancelled "${title}"`);
}

/* ---------------- Wiring ---------------- */
function refreshAll() {
  document.getElementById('ap-stats').outerHTML = renderStats();
  document.getElementById('req-list').innerHTML = renderList();
  document.getElementById('content-rail').innerHTML = renderRail();
  hydrateIcons(document.getElementById('content-main'));
  hydrateIcons(document.getElementById('content-rail'));
  wireList(); wireRail();
}

function wireList() {
  document.querySelectorAll('#req-list [data-req]').forEach((card) => card.addEventListener('click', (e) => {
    if (e.target.closest('[data-cancel]')) return;
    openDetail(Number(card.dataset.req));
  }));
  document.querySelectorAll('#req-list [data-cancel]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); cancelRequest(Number(b.dataset.cancel)); }));
}

function wireRail() {
  document.getElementById('rail-new-req').addEventListener('click', openNewRequest);
  document.querySelectorAll('#content-rail [data-type-filter]').forEach((row) => row.addEventListener('click', () => {
    S.filter = 'all';
    document.getElementById('ap-pills').outerHTML = renderFilters();
    wirePills();
    document.getElementById('req-list').innerHTML = REQUESTS.filter((r) => r.type === row.dataset.typeFilter).map(reqCardHtml).join('') || `<div class="panel"><div class="panel-body" style="text-align:center; color:var(--muted); padding:40px 20px;">No requests of this type.</div></div>`;
    hydrateIcons(document.getElementById('content-main'));
    wireList();
  }));
}

function wirePills() {
  document.querySelectorAll('#ap-pills [data-f]').forEach((b) => b.addEventListener('click', () => {
    S.filter = b.dataset.f;
    document.getElementById('ap-pills').outerHTML = renderFilters();
    wirePills();
    document.getElementById('req-list').innerHTML = renderList();
    hydrateIcons(document.getElementById('content-main'));
    wireList();
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('content-main').innerHTML = `
    ${renderBanner()}
    ${renderStats()}
    <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:4px;">
      ${renderFilters()}
      <button class="new-req-btn" id="main-new-req">${icon('plus', 15)} New Request</button>
    </div>
    <div id="req-list">${renderList()}</div>`;

  document.getElementById('content-rail').innerHTML = renderRail();

  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim'; scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  document.getElementById('main-new-req').addEventListener('click', openNewRequest);
  wirePills(); wireList(); wireRail();
  initShell();
});
