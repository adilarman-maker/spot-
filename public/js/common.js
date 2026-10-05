/* ---------------- Icon hydration ---------------- */
function hydrateIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon');
    const size = el.getAttribute('data-icon-size') || 18;
    el.innerHTML = icon(name, size);
  });
}

/* ---------------- Theme toggle ---------------- */
function applyThemeIcon() {
  const theme = document.documentElement.getAttribute('data-theme');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon', 18);
}

function initTheme() {
  applyThemeIcon();
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('spot_theme', next);
    applyThemeIcon();
  });
}

/* ---------------- Mobile sidebar ---------------- */
function initMobileNav() {
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('sidebar-scrim');
  const btn = document.getElementById('hamburger-btn');
  if (!sidebar || !scrim || !btn) return;

  function open() { sidebar.classList.add('open'); scrim.classList.add('show'); }
  function close() { sidebar.classList.remove('open'); scrim.classList.remove('show'); }

  btn.addEventListener('click', open);
  scrim.addEventListener('click', close);
  document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', close));
}

/* ---------------- "Coming soon" placeholders ---------------- */
// Maps a module name (as used in data-soon="...") to its real page, once built.
// Any data-soon link/button not listed here still shows the "coming soon" toast.
const BUILT_PAGES = {
  Clubs: 'clubs.html',
  Faculty: 'faculty.html',
  Messages: 'messages.html',
  Events: 'events.html',
  Attendance: 'attendance.html',
  Timetable: 'timetable.html',
  Approvals: 'approvals.html',
  Profile: 'profile.html',
  Settings: 'settings.html',
};

function initSoonLinks() {
  document.querySelectorAll('[data-soon]').forEach((el) => {
    if (el.dataset.soonBound) return;
    el.dataset.soonBound = '1';
    const target = el.getAttribute('data-soon');
    const realHref = BUILT_PAGES[target];

    if (realHref) {
      if (el.tagName === 'A') {
        el.setAttribute('href', realHref);
      } else {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => { window.location.href = realHref; });
      }
      return;
    }

    el.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(`${target} — coming in the next build`);
    });
  });
}

function showToast(text) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px);
      background: var(--text); color: var(--bg); padding: 11px 20px; border-radius: 999px;
      font-size: 13px; font-weight: 600; z-index: 999; opacity: 0; transition: opacity .2s ease, transform .2s ease;
      box-shadow: var(--shadow-lg); max-width: 86vw; text-align: center;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2200);
}

/* ---------------- Helpers ---------------- */
function initialsOf(name) {
  return name.split(' ').map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

/* ---------------- Shell init (call after page content is rendered) ---------------- */
function initShell() {
  hydrateIcons(document);
  initTheme();
  initMobileNav();
  initSoonLinks();
}
