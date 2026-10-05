/* ---------------- Data ---------------- */
const CATEGORIES = ['All Clubs', 'Technical', 'Cultural', 'Sports', 'Social', 'Academic', 'Others'];

// Was a hardcoded array; now loaded from /api/clubs at startup (see loadClubsFromApi
// below). Kept as `let` so the fetched data can replace it in place — every
// render function below reads this variable and doesn't care where it came from.
let CLUBS = [];

const MY_CLUB_IDS = [1, 2, 3, 4]; // matches dashboard's "My Clubs"

const RECOMMENDED = [
  { name: 'Hackathon Club', members: 128, blurb: 'Build innovative solutions in 24 hours.', icon: 'code', bg: 'var(--purple-bg)', fg: 'var(--purple)' },
  { name: 'Film Club', members: 54, blurb: 'Lights. Camera. Action!', icon: 'compass', bg: 'var(--pink-bg)', fg: 'var(--pink)' },
  { name: 'Finance & Investment Club', members: 67, blurb: 'Learn. Invest. Grow.', icon: 'fileText', bg: 'var(--teal-bg)', fg: 'var(--teal)' },
  { name: 'Travel Club', members: 41, blurb: 'Explore. Discover. Repeat.', icon: 'mapPin', bg: 'var(--blue-bg)', fg: 'var(--blue)' },
];

const RAIL_EVENTS = [
  { mon: 'Apr', day: 26, title: 'TechTalk: Future of AI', meta: 'CSE Club · Seminar Hall · 10:00 AM', bg: 'linear-gradient(135deg,#3557C7,#5B7EE8)' },
  { mon: 'Apr', day: 28, title: 'Hackathon 2026', meta: 'Code Craft · Innovation Lab · 9:00 AM', bg: 'linear-gradient(135deg,#0F172A,#334155)' },
  { mon: 'May', day: 3, title: 'Cultural Fest', meta: 'Cultural Club · Main Ground · 5:00 PM', bg: 'linear-gradient(135deg,#831843,#EC4899)' },
];

const TOP_PICK_TAGS = ['AI & ML', 'Tech Events', 'Hackathons', 'Robotics'];

/* ---------------- State ---------------- */
let activeCategory = 'All Clubs';
let searchTerm = '';
let sortKey = 'popular';
let viewMode = 'grid';
const savedClubs = new Set();
const joinedClubs = new Set(MY_CLUB_IDS);
const joinedRecommended = new Set();

/* ---------------- Renderers ---------------- */
function renderExploreBanner() {
  return `
    <div class="explore-banner">
      <div class="explore-tag"><span>Explore</span><span class="dot"></span><span>Connect</span><span class="dot"></span><span>Be Part</span></div>
      <h2>Discover Clubs That Match Your Interests</h2>
      <div class="sub">Join clubs, meet like-minded people, build skills and create memories!</div>
      <div class="explore-script">More Hobbies\nMore Friends\nMore Opportunities</div>
    </div>
  `;
}

function renderCategoryPills() {
  return `
    <div class="pill-row" id="category-pills">
      ${CATEGORIES.map((c) => `<button class="pill ${c === activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}
    </div>
  `;
}

function renderStatCards() {
  const cards = [
    { icon: 'clubs', bg: 'var(--blue-bg)', fg: 'var(--blue)', value: CLUBS.length, label: 'Total Clubs', sub: 'Explore all clubs →' },
    { icon: 'attendance', bg: 'var(--green-bg)', fg: 'var(--green)', value: joinedClubs.size, label: 'My Clubs', sub: 'View my clubs →' },
    { icon: 'award', bg: 'var(--purple-bg)', fg: 'var(--purple)', value: 3, label: 'New This Week', sub: 'Check them out →' },
    { icon: 'fileText', bg: 'var(--orange-bg)', fg: 'var(--orange)', value: 6, label: 'Popular Clubs', sub: 'See top clubs →' },
  ];
  return `
    <div class="stat-grid-compact" id="stat-cards">
      ${cards.map((c) => `
        <div class="stat-card-compact">
          <div class="sci" style="background:${c.bg}; color:${c.fg};">${icon(c.icon, 19)}</div>
          <div>
            <div class="scv">${c.value}</div>
            <div class="scl">${c.label}</div>
            <div class="scs">${c.sub}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderToolbar() {
  return `
    <div class="clubs-toolbar">
      <div class="clubs-search">
        ${icon('search', 15)}
        <input type="text" id="club-search" placeholder="Search clubs by name, description or tags…" />
      </div>
      <select class="sort-select" id="sort-select">
        <option value="popular">Sort by: Most Popular</option>
        <option value="name">Sort by: Name (A–Z)</option>
        <option value="new">Sort by: Newest</option>
      </select>
      <div class="view-toggle">
        <button data-view="grid" class="${viewMode === 'grid' ? 'active' : ''}">${icon('grid', 15)}</button>
        <button data-view="list" class="${viewMode === 'list' ? 'active' : ''}">${icon('list', 15)}</button>
      </div>
    </div>
  `;
}

function getFilteredClubs() {
  let list = CLUBS.filter((c) => activeCategory === 'All Clubs' || c.category === activeCategory);
  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    list = list.filter((c) => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q));
  }
  if (sortKey === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else if (sortKey === 'popular') list = [...list].sort((a, b) => b.members - a.members);
  return list;
}

function renderClubGrid() {
  const list = getFilteredClubs();
  if (list.length === 0) {
    return `<div class="panel"><div class="panel-body" style="text-align:center; color:var(--muted); padding:50px 20px;">No clubs match your search.</div></div>`;
  }
  return `
    <div class="clubs-grid ${viewMode === 'list' ? 'list-view' : ''}" id="clubs-grid">
      ${list.map((c) => `
        <div class="club-card" data-id="${c.id}">
          <div class="cc-banner" style="background:${c.gradient};">
            <span class="cc-cat-tag">${c.category}</span>
            <button class="cc-bookmark ${savedClubs.has(c.id) ? 'saved' : ''}" data-bookmark="${c.id}">${icon('bookmark', 13)}</button>
          </div>
          <div class="cc-body">
            <div class="cc-name">${c.name}</div>
            <div class="cc-tagline" style="color:${c.accent};">${c.tagline}</div>
            <div class="cc-desc">${c.desc}</div>
            <div class="cc-meta">${icon('users', 12)}${c.members} members</div>
            <div class="cc-meta">${icon('mapPin', 12)}${c.location}</div>
            <div class="cc-meta">${icon('clock', 12)}${c.schedule}</div>
            <button class="cc-join" data-join="${c.id}" style="background:${joinedClubs.has(c.id) ? 'var(--muted-2)' : c.accent};">
              ${joinedClubs.has(c.id) ? 'Joined ✓' : 'Join Club'}
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderRecommended() {
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--purple-bg); color:var(--purple);">${icon('award', 15)}</div>
          <h3>Recommended for You</h3>
        </div>
        <a href="#" class="view-all" data-soon="Recommendations">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div id="reco-list">
        ${RECOMMENDED.map((r, i) => `
          <div class="reco-row">
            <div class="reco-icon" style="background:${r.bg}; color:${r.fg};">${icon(r.icon, 16)}</div>
            <div style="flex:1; min-width:0;">
              <div class="reco-name">${r.name}</div>
              <div class="reco-members">${icon('users', 10)} ${r.members} members</div>
              <div class="reco-blurb">${r.blurb}</div>
            </div>
            <button class="reco-join-btn ${joinedRecommended.has(i) ? 'joined' : ''}" data-reco-join="${i}">${joinedRecommended.has(i) ? 'Joined' : 'Join'}</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderRailEvents() {
  return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-title">
          <div class="phi" style="background:var(--blue-bg); color:var(--blue);">${icon('events', 15)}</div>
          <h3>Upcoming Events</h3>
        </div>
        <a href="#" class="view-all" data-soon="Events">View All ${icon('arrowRight', 13)}</a>
      </div>
      <div>
        ${RAIL_EVENTS.map((e) => `
          <div class="mini-event-row">
            <div class="mini-date" style="background:${e.bg};">
              <div class="mon">${e.mon}</div>
              <div class="day">${e.day}</div>
            </div>
            <div style="flex:1; min-width:0;">
              <div class="mini-event-title">${e.title}</div>
              <div class="mini-event-meta">${e.meta}</div>
            </div>
            <button class="mini-register-btn" data-soon="Events">Register</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderFinderCta() {
  return `
    <div class="finder-cta">
      <div class="finder-icon">${icon('robot', 20)}</div>
      <div>
        <div class="finder-text">Need help finding the right club?</div>
        <div class="finder-desc">Answer a few questions and get personalized recommendations.</div>
        <button class="finder-btn" data-soon="Club Finder">Try Club Finder ${icon('arrowRight', 13)}</button>
      </div>
    </div>
  `;
}

function renderTopPicks() {
  return `
    <div class="panel">
      <div class="panel-body">
        <div class="top-picks-head">
          <span style="color:var(--orange);">${icon('flame', 17)}</span>
          <h3 style="font-size:13.6px;">Today's Top Picks</h3>
        </div>
        <div class="top-picks-desc">Based on your interests and activity.</div>
        <div class="chip-row">
          ${TOP_PICK_TAGS.map((t) => `<span class="chip">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ---------------- Interaction wiring ---------------- */
function renderMainContent() {
  document.getElementById('content-main').innerHTML =
    renderExploreBanner() + renderCategoryPills() + renderStatCards() + renderToolbar() +
    `<div id="grid-container">${renderClubGrid()}</div>`;
  hydrateIcons(document.getElementById('content-main'));
  wireMainInteractions();
}

function wireMainInteractions() {
  document.querySelectorAll('#category-pills .pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat');
      renderMainContent();
    });
  });

  const searchInput = document.getElementById('club-search');
  searchInput.value = searchTerm;
  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    document.getElementById('grid-container').innerHTML = renderClubGrid();
    hydrateIcons(document.getElementById('grid-container'));
    wireGridInteractions();
  });

  document.getElementById('sort-select').value = sortKey;
  document.getElementById('sort-select').addEventListener('change', (e) => {
    sortKey = e.target.value;
    renderMainContent();
  });

  document.querySelectorAll('.view-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      viewMode = btn.getAttribute('data-view');
      renderMainContent();
    });
  });

  wireGridInteractions();
}

function wireGridInteractions() {
  document.querySelectorAll('[data-bookmark]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-bookmark'));
      if (savedClubs.has(id)) savedClubs.delete(id); else savedClubs.add(id);
      btn.classList.toggle('saved');
    });
  });

  document.querySelectorAll('[data-join]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-join'));
      const club = CLUBS.find((c) => c.id === id);
      if (joinedClubs.has(id)) {
        joinedClubs.delete(id);
        showToast(`Left ${club.name}`);
      } else {
        joinedClubs.add(id);
        showToast(`Joined ${club.name} 🎉`);
      }
      renderMainContent();
    });
  });
}

function wireRailInteractions() {
  document.querySelectorAll('[data-reco-join]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.getAttribute('data-reco-join'));
      if (joinedRecommended.has(i)) joinedRecommended.delete(i); else joinedRecommended.add(i);
      renderRailContent();
    });
  });
}

function renderRailContent() {
  document.getElementById('content-rail').innerHTML =
    renderRecommended() + renderRailEvents() + renderFinderCta() + renderTopPicks();
  hydrateIcons(document.getElementById('content-rail'));
  initSoonLinks();
  wireRailInteractions();
}

/* ---------------- Init ---------------- */
async function loadClubsFromApi() {
  const res = await fetch('/api/clubs');
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  return res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  // Loading state shown immediately, replaced once the fetch resolves —
  // this is the real network round-trip, not an instant client-side render.
  document.getElementById('content-main').innerHTML = `
    <div class="panel"><div class="panel-body" style="text-align:center; color:var(--muted); padding:60px 20px;">Loading clubs…</div></div>`;

  try {
    CLUBS = await loadClubsFromApi();
    renderMainContent();
    renderRailContent();
  } catch (err) {
    document.getElementById('content-main').innerHTML = `
      <div class="panel"><div class="panel-body" style="text-align:center; padding:60px 20px;">
        <div style="color:var(--danger); font-weight:700; margin-bottom:6px;">Couldn't load clubs</div>
        <div style="color:var(--muted); font-size:12.6px;">${err.message}. Check that the server is running and try refreshing.</div>
      </div></div>`;
  }
  initShell();
});
