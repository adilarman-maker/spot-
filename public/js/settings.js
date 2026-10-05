/* ---------------- Defaults ---------------- */
const DEFAULT_SETTINGS = {
  notif: { email: true, push: true, eventReminders: true, clubAnnouncements: true, approvalUpdates: false },
  privacy: { showProfile: true, attendanceFacultyOnly: true, allowDMs: true },
};

function loadSettings() {
  try {
    const raw = localStorage.getItem('spot_settings');
    if (raw) return JSON.parse(raw);
  } catch (e) { /* fall through to defaults */ }
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

let saved = loadSettings();
let draft = JSON.parse(JSON.stringify(saved));
let dirty = false;

/* ---------------- Config for rendering ---------------- */
const NOTIF_ITEMS = [
  ['email', 'Email Notifications', 'Receive important updates by email', 'mail', '#3B82F6', 'var(--blue-bg)'],
  ['push', 'Push Notifications', 'Get notified instantly in your browser', 'bell', '#7C3AED', 'var(--purple-bg)'],
  ['eventReminders', 'Event Reminders', 'A reminder before events you\u2019ve registered for', 'events', '#16A34A', 'var(--green-bg)'],
  ['clubAnnouncements', 'Club Announcements', 'Updates from clubs you\u2019ve joined', 'clubs', '#EC4899', 'var(--pink-bg)'],
  ['approvalUpdates', 'Approval Updates', 'When a request you submitted is reviewed', 'approvals', '#F59E0B', 'var(--orange-bg)'],
];
const PRIVACY_ITEMS = [
  ['showProfile', 'Show Profile to Other Students', 'Let classmates view your profile and club memberships', 'profile', '#3B82F6', 'var(--blue-bg)'],
  ['attendanceFacultyOnly', 'Attendance Visible to Faculty Only', 'Hide your attendance record from other students', 'shield2', '#16A34A', 'var(--green-bg)'],
  ['allowDMs', 'Allow Direct Messages', 'Let faculty and club members message you directly', 'messages', '#7C3AED', 'var(--purple-bg)'],
];

/* ---------------- Renderers ---------------- */
function renderBanner() {
  return `
    <div class="settings-banner">
      <div class="settings-banner-icon">${icon('settings', 24)}</div>
      <div><h2>Settings</h2><p>Manage your account preferences, notifications and privacy.</p></div>
    </div>`;
}

function renderAppearance() {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const opts = [['light', 'sun', 'Light'], ['dark', 'moon', 'Dark']];
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Appearance</h3></div>
      <div class="theme-opt-row" id="theme-opts">
        ${opts.map(([k, i, l]) => `
          <div class="theme-opt ${theme === k ? 'active' : ''}" data-theme-opt="${k}">
            <div class="to-icon">${icon(i, 15)}</div><div class="to-label">${l}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

function toggleRow([key, label, desc, iconName, color, bg], group) {
  const on = draft[group][key];
  return `
    <div class="set-row">
      <div class="si" style="background:${bg}; color:${color};">${icon(iconName, 17)}</div>
      <div><div class="set-label">${label}</div><div class="set-desc">${desc}</div></div>
      <div class="set-action"><button class="toggle-switch ${on ? 'on' : ''}" data-toggle="${group}.${key}" aria-label="${label}"></button></div>
    </div>`;
}

function renderNotifications() {
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Notifications</h3></div>
      <div id="notif-rows">${NOTIF_ITEMS.map((i) => toggleRow(i, 'notif')).join('')}</div>
    </div>`;
}

function renderPrivacy() {
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Privacy</h3></div>
      <div id="privacy-rows">${PRIVACY_ITEMS.map((i) => toggleRow(i, 'privacy')).join('')}</div>
    </div>`;
}

function renderAccount() {
  return `
    <div class="panel">
      <div class="panel-head"><h3 style="font-size:14px;">Account</h3></div>
      <div class="set-row">
        <div class="si" style="background:var(--blue-bg); color:var(--blue);">${icon('mail', 17)}</div>
        <div><div class="set-label">Email Address</div><div class="set-desc">aarav.sharma@college.edu</div></div>
      </div>
      <div class="set-row">
        <div class="si" style="background:var(--purple-bg); color:var(--purple);">${icon('key', 17)}</div>
        <div><div class="set-label">Password</div><div class="set-desc">Last changed 3 months ago</div></div>
        <div class="set-action"><button class="btn-text-action" id="change-pwd-btn">Change Password</button></div>
      </div>
      <div class="set-row">
        <div class="si" style="background:var(--green-bg); color:var(--green);">${icon('lock', 17)}</div>
        <div><div class="set-label">Two-Factor Authentication</div><div class="set-desc">Add an extra layer of security to your account</div></div>
        <div class="set-action"><button class="toggle-switch" id="tfa-toggle" aria-label="Two-factor authentication"></button></div>
      </div>
    </div>`;
}

function renderDanger() {
  return `
    <div class="panel danger-zone">
      <div class="panel-head"><h3 style="font-size:14px; color:var(--danger);">Danger Zone</h3></div>
      <div class="set-row">
        <div class="si" style="background:var(--red-bg); color:var(--danger);">${icon('logOut', 17)}</div>
        <div><div class="set-label">Log Out</div><div class="set-desc">Sign out of Spot on this device</div></div>
        <div class="set-action"><button class="btn-danger-outline" id="logout-btn">Log Out</button></div>
      </div>
    </div>`;
}

function renderSaveBar() {
  return `
    <div class="save-bar" id="save-bar" style="${dirty ? '' : 'display:none;'}">
      <button class="btn-soft" id="reset-btn">Discard Changes</button>
      <button class="btn-solid" id="save-btn">Save Changes</button>
    </div>`;
}

/* ---------------- Wiring ---------------- */
function markDirty() {
  dirty = true;
  const bar = document.getElementById('save-bar');
  if (bar) bar.style.display = 'flex';
}

function refreshSections() {
  document.getElementById('notif-rows').innerHTML = NOTIF_ITEMS.map((i) => toggleRow(i, 'notif')).join('');
  document.getElementById('privacy-rows').innerHTML = PRIVACY_ITEMS.map((i) => toggleRow(i, 'privacy')).join('');
  hydrateIcons(document.getElementById('content-main'));
  wireToggles();
}

function wireToggles() {
  document.querySelectorAll('#content-main [data-toggle]').forEach((btn) => btn.addEventListener('click', () => {
    const [group, key] = btn.dataset.toggle.split('.');
    draft[group][key] = !draft[group][key];
    markDirty();
    refreshSections();
  }));
}

function wireThemeOpts() {
  document.querySelectorAll('#theme-opts [data-theme-opt]').forEach((opt) => opt.addEventListener('click', () => {
    const val = opt.dataset.themeOpt;
    document.documentElement.setAttribute('data-theme', val);
    localStorage.setItem('spot_theme', val);
    applyThemeIcon();
    document.getElementById('appearance-box').innerHTML = renderAppearance();
    hydrateIcons(document.getElementById('appearance-box'));
    wireThemeOpts();
  }));
}

function openChangePassword() {
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <h3 style="font-size:17px; margin-bottom:2px;">Change Password</h3>
      <div class="modal-sub">Choose a new password for your account.</div>
      <label class="form-label" for="pw-current">Current Password</label>
      <input class="sort-select" id="pw-current" type="password" style="width:100%;" />
      <label class="form-label" for="pw-new">New Password</label>
      <input class="sort-select" id="pw-new" type="password" style="width:100%;" />
      <label class="form-label" for="pw-confirm">Confirm New Password</label>
      <input class="sort-select" id="pw-confirm" type="password" style="width:100%;" />
      <div class="modal-actions"><button class="btn-soft" id="pw-cancel">Cancel</button><button class="btn-solid" id="pw-submit">Update Password</button></div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('pw-cancel').addEventListener('click', closeModal);
  document.getElementById('pw-submit').addEventListener('click', () => {
    const cur = document.getElementById('pw-current').value;
    const nw = document.getElementById('pw-new').value;
    const cf = document.getElementById('pw-confirm').value;
    if (!cur || !nw) { showToast('Fill in all fields'); return; }
    if (nw !== cf) { showToast('New passwords don\u2019t match'); return; }
    if (nw.length < 8) { showToast('Password must be at least 8 characters'); return; }
    closeModal();
    showToast('Password updated');
  });
}

function openLogoutConfirm() {
  const scrim = document.getElementById('modal-scrim');
  scrim.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Close">${icon('close', 15)}</button>
      <div class="modal-head">
        <div class="fac-avatar" style="background:var(--danger);">${icon('logOut', 20)}</div>
        <div><h3>Log out of Spot?</h3><div class="modal-sub">You\u2019ll need to sign in again to access your account.</div></div>
      </div>
      <div class="modal-actions"><button class="btn-soft" id="logout-cancel">Cancel</button><button class="btn-solid" style="background:var(--danger);" id="logout-confirm">Log Out</button></div>
    </div>`;
  scrim.classList.add('show');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('logout-cancel').addEventListener('click', closeModal);
  document.getElementById('logout-confirm').addEventListener('click', () => {
    closeModal();
    showToast('Logged out successfully');
    setTimeout(() => { window.location.href = 'index.html'; }, 900);
  });
}

function closeModal() { const s = document.getElementById('modal-scrim'); s.classList.remove('show'); s.innerHTML = ''; }

function wireAccountAndDanger() {
  document.getElementById('change-pwd-btn').addEventListener('click', openChangePassword);
  document.getElementById('logout-btn').addEventListener('click', openLogoutConfirm);
  document.getElementById('tfa-toggle').addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('on');
    showToast(e.currentTarget.classList.contains('on') ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled');
  });
}

function wireSaveBar() {
  document.getElementById('save-btn').addEventListener('click', () => {
    saved = JSON.parse(JSON.stringify(draft));
    localStorage.setItem('spot_settings', JSON.stringify(saved));
    dirty = false;
    document.getElementById('save-bar').style.display = 'none';
    showToast('Settings saved');
  });
  document.getElementById('reset-btn').addEventListener('click', () => {
    draft = JSON.parse(JSON.stringify(saved));
    dirty = false;
    document.getElementById('save-bar').style.display = 'none';
    refreshSections();
    showToast('Changes discarded');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('content-main').innerHTML =
    renderBanner() +
    `<div id="appearance-box">${renderAppearance()}</div>` +
    renderNotifications() + renderPrivacy() + renderAccount() + renderDanger() +
    renderSaveBar();

  document.getElementById('content-rail').innerHTML = `
    <div class="contact-cta">
      <h4>Need help?</h4>
      <p>Reach out to the student support desk for anything settings can\u2019t fix.</p>
      <button class="btn-solid" id="rail-contact">Contact Support ${icon('arrowRight', 13)}</button>
    </div>`;

  const scrim = document.createElement('div');
  scrim.id = 'modal-scrim'; scrim.className = 'modal-scrim';
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeModal(); });
  document.body.appendChild(scrim);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  wireThemeOpts(); wireToggles(); wireAccountAndDanger(); wireSaveBar();
  document.getElementById('rail-contact').addEventListener('click', () => showToast('Support chat is coming in a later build'));
  hydrateIcons(document.getElementById('content-rail'));

  initShell();
});
